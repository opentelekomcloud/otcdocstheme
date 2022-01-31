const fetchYaml = async path => {
    const response = await fetch(path);
    if (response.status !== 200) {
        console.error('Required YAML file for navigation could not be fetched. URL: ' + path)
    }
    else {
        return response.text();
    }
};

const generateServiceJson = (yamlfile, doc_type) => {

    const doc = jsyaml.load(yamlfile)
    level_1 = []
    level_0 = {}

    for (category in doc['service_categories']) {
        let valuescat = doc['service_categories'][category]

        children = []
        for (child in doc['service_categories'][category]['services']) {
            let valueschild = doc['service_categories'][category]['services'][child]

            if (!valueschild[doc_type] || valueschild[doc_type] === '' || valueschild[doc_type] === '#') {
                console.warn('Empty link found in id ' + child + '_' + doc_type)
            }
            children.push({
                "name": valueschild['title'],
                "id": (child + '_' + doc_type),
                "href": valueschild[doc_type]
            })
        }

        level_1.push({
            "name": valuescat['title'],
            "id": (category + '_' + doc_type),
            "children": children
        })
    }

    if (doc_type === 'umn') {
        level_0 = {
            "name": "Manuals",
            "id": "manuals",
            "children": level_1
        }
    }
    else if (doc_type === 'api') {
        level_0 = {
            "name": "API",
            "id": "api",
            "children": level_1
        }
    }
    else {
        console.exception('Wrong doc_type specified!')
        return {}
    }
    return level_0
}

const generateNavigationJson = (yamlfile) => {
    const doc = jsyaml.load(yamlfile)
    children_lvl1 = []
    for (child_lvl1 in doc['level_1']) {
        let value_child_lvl1 = doc['level_1'][child_lvl1]

        children_lvl2 = []
        for (child_lvl2 in doc['level_1'][child_lvl1]['level_2']) {
            let value_child_lvl2 = doc['level_1'][child_lvl1]['level_2'][child_lvl2]

            children_lvl3 = []
            for (child_lvl3 in doc['level_1'][child_lvl1]['level_2'][child_lvl2]['level_3']) {
                let value_child_lvl3 = doc['level_1'][child_lvl1]['level_2'][child_lvl2]['level_3'][child_lvl3]

                if (!value_child_lvl3['url'] || value_child_lvl3['url'] === '' || value_child_lvl3['url'] === '#') {
                    console.warn('Empty link found in id ' + child_lvl3)
                }

                children_lvl3.push({
                    'name': value_child_lvl3['title'],
                    'id': child_lvl3,
                    'href': value_child_lvl3['url']
                });

            }
            children_lvl2.push({
                'name': value_child_lvl2['title'],
                'id': child_lvl2,
                'children': children_lvl3
            })

        }
        if (children_lvl2.length == 0) {
            if (!value_child_lvl1['url'] || value_child_lvl1['url'] === '' || value_child_lvl1['url'] === '#') {
                console.warn('Empty link found in id ' + child_lvl1)
            }
    
            children_lvl1.push({
                'name': value_child_lvl1['title'],
                'id': child_lvl1,
                'href': value_child_lvl1['url']
            });
        } else {
            children_lvl1.push({
                'name': value_child_lvl1['title'],
                'id': child_lvl1,
                'children': children_lvl2
            })
        }
    }

    return children_lvl1;
}

const write_navigation = (nav_elements) => {
    const app_shell = document.getElementById('app-shell');
    app_shell.mainNavigation = nav_elements;
}



url_service = 'https://raw.githubusercontent.com/opentelekomcloud-docs/docsportal/main/doc/source/services.yaml';
path = '_static/navigation.yaml';
navbar_items_amount = 6

const main = async () => {
    var navigation_json = []
    const getNavigationJson = async () => {
        const data_all = await Promise.all([fetchYaml(url_service), fetchYaml(path)]);
        navigation_json.push(generateServiceJson(data_all[0], 'umn'));
        navigation_json.push(generateServiceJson(data_all[0], 'api'));
        navigation_json = navigation_json.concat(generateNavigationJson(data_all[1]));
        sessionStorage.setItem('navigation_json', JSON.stringify(navigation_json))
        write_navigation(JSON.stringify(navigation_json));
    }

    switch (sessionStorage.getItem('navigation_json')) {
        case null:
            getNavigationJson()
        
        default:
            // In case one YAML could not be fetched correctly retry on next page load
            if (JSON.parse(sessionStorage.getItem('navigation_json')).length !== navbar_items_amount) {
                navigation_json.length = 0
                sessionStorage.removeItem('navigation_json')
                getNavigationJson()
            }
            else {
                write_navigation(sessionStorage.getItem('navigation_json'));
            }
            
    }
}

main()