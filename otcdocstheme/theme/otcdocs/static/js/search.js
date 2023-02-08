var id = 0;

const cleanupString = (text) => {
    text = text.replace(/¶/, " ");
    text = text.replace(/¶/, " ");
    return text;
}

async function searchRequest(val) {
    const requestjson = {
        "from" : 0, "size" : 100,
        "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url"],
        "query": {
            "multi_match": {
              "query": val,
              "type": "best_fields",
              "operator": "and",
              "fields": [ "body", "title^2" ]
            }
        },
        "highlight": {
            "number_of_fragments": 1,
            "fragment_size":100,
            "pre_tags": [
                "<span style='color: var(--dt-color-magenta)'>"
            ],
            "post_tags": [
                "</span>"
            ],
            "fields":{
                "body": {},
                "title": {}
            },
            "require_field_match" : false
        }
    };
    let response = await fetch('https://opensearch.eco.tsi-dev.otc-service.com/helpcenter-*/_search', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestjson)
    })
    const responsedata = await response.json()
    return responsedata;
};

function createResultList(response) {
    let ul = document.getElementById('searchDropdown');
    // Remove older search results
    ul.textContent = "";
    if (response.hits.hits.length > 0) {
        ul.classList.add('show');
        for (index in response.hits.hits) {
            // Only show top-5 search results
            if (index > 4) {
                break
            }
            let hit = response.hits.hits[index];

            // Create li, a, div elements
            let li = document.createElement('li');
            let a = document.createElement('a');
            let div_1 = document.createElement('div');
            let div_2 = document.createElement('div');

            // Add text and classes
            a.setAttribute('href', hit._source.base_url + hit._source.doc_url + hit._source.current_page_name + '.html');
            a.classList.add("dropdown-item");
            li.classList.add("border-bottom")
            div_1.classList.add("fw-bolder");
            if (typeof hit.highlight.title == 'undefined') {
                div_1.innerHTML = hit._source.title;
            } else {
                div_1.innerHTML = hit.highlight.title[0];
            }
            div_2.innerHTML = cleanupString(hit.highlight.body[0]);

            // Append as childs to structure ul > li > a > div/div
            a.appendChild(div_1);
            a.appendChild(div_2);
            li.appendChild(a);
            ul.appendChild(li);
        }
    }
    else {
        document.getElementById('searchDropdown').classList.remove('show');
    }
};

const createMainResult = (response) => {
    // Function to generate result list on main content
    // Remove search as you type results
    document.getElementById('searchDropdown').classList.remove('show');

    let div = document.getElementById('searchResultsEnter')
    // Check whether the searchResultsEnter div already exists
    if (typeof(div)!= 'undefined' && div != null) {
        div = document.getElementById('searchResultsEnter')

    }
    // If it does not exist create it
    else {
        // Search for content div, hide it and add search results
        let contentDiv = document.getElementById('docs-content')
        contentDiv.insertAdjacentHTML("afterend", "<div id='searchResultsEnter' class='overflow-hidden'></div>");
        contentDiv.classList.add('nodisplay')
        // On docsportal starpage we don't have breadcrumbs or sidebar, so check for that
        if (document.getElementById('right-sidebar') == undefined) {
            document.getElementById('left-sidebar').classList.add('not-visible')
        } else {
            document.getElementById('left-sidebar').classList.add('not-visible')
            document.getElementById('right-sidebar').classList.add('not-visible')
            document.getElementById('breadcrumbs').classList.add('d-none')
        }
        div = document.getElementById('searchResultsEnter')
    }

    // Remove old search results
    div.textContent = ""

    // Create Results Headline
    let h1 = document.createElement('h1')
    h1.innerHTML = "Search Results: " + response.hits.hits.length
    h1.setAttribute('style', 'font-size: 1.5rem')
    h1.classList.add('ps-3')
    h1.classList.add('d-flex')
    h1.classList.add('justify-content-between')

    // Search Results Close Button
    let i = document.createElement('i')
    i.classList.add('fa')
    i.classList.add('fa-close')
    i.setAttribute('onclick', 'deleteEnterResults()')
    h1.appendChild(i)
    div.appendChild(h1)

    // Create Result-List
    let index = 0
    let ul_index = 0
    let hit_length = response.hits.hits.length
    let ul;
    // number of results per page
    let pagination_size = 10;
    while (hit_length > 0) {
        // Create list pages

        if ((index % pagination_size) == 0) {
            ul_index = ul_index + 1;
            ul = document.createElement('ul');
        }
        if (ul_index > 1) {
            ul.classList.add('nodisplay')
        }
        ul.classList.add('p-0')
        ul.setAttribute('id', "ul_" + ul_index)
        div.appendChild(ul)

        let hit = response.hits.hits[index];

        // Create li, a, div elements
        let li = document.createElement('li');
        let a = document.createElement('a');
        let div_1 = document.createElement('div');
        let div_2 = document.createElement('div');
        let div_url = document.createElement('div');

        // Add text and classes
        a.setAttribute('href', hit._source.base_url + hit._source.doc_url + hit._source.current_page_name + '.html');
        a.classList.add("dropdown-item");
        li.classList.add("nobullets")
        li.classList.add("border-bottom")
        div_1.classList.add("search-title");
        div_url.classList.add("path-green");
        if (typeof hit.highlight.title == 'undefined') {
            div_1.innerHTML = hit._source.title;
        } else {
            div_1.innerHTML = hit.highlight.title[0];
        }
        div_url.innerHTML = hit._source.doc_url + hit._source.current_page_name;
        div_2.innerHTML = cleanupString(hit.highlight.body[0]);

        // Append as childs to structure ul > li > a > div/div
        a.appendChild(div_1);
        a.appendChild(div_url);
        a.appendChild(div_2);
        li.appendChild(a);
        ul.appendChild(li);

        index = index + 1
        hit_length = hit_length - 1
    }

    if (ul_index > 0) {
        // Create Pagination
        let nav = document.createElement('nav');
        let ul_pagination = document.createElement('ul');
        ul_pagination.setAttribute('id', 'ul-pagination');
        ul_pagination.classList.add("pagination", "pagination-sm", "justify-content-center");

        // Add pagination sites / li's
        for (let i = 0; i < ul_index; i++) {
            let li_pagination = document.createElement('li');
            li_pagination.setAttribute('onclick', 'pagination(this)');
            if (i == 0) {
                li_pagination.classList.add("page-item", "active");
            } else {
                li_pagination.classList.add("page-item");
            }
            let a_pagination = document.createElement("a");
            a_pagination.classList.add("page-link");
            a_pagination.setAttribute('href', '#');
            a_pagination.innerHTML = (i + 1).toString()
            li_pagination.appendChild(a_pagination);
            ul_pagination.appendChild(li_pagination);
        }
        nav.appendChild(ul_pagination);
        div.appendChild(nav);
    }
}

function timer(el) {
    id = setTimeout(async () => {
        if (el.value) {
            let response = await searchRequest(el.value);
            createResultList(response);
        } else {
            deleteEnterResults()
        };
    }, 250);
};

const deleteEnterResults = () => {
    document.getElementById('searchbox').value = ""
    document.getElementById('searchDropdown').classList.remove('show');
    let div = document.getElementById('searchResultsEnter')
    if (div) {
        div.parentNode.removeChild(div)
    }
    // On docsportal starpage we don't have breadcrumbs or sidebar, so check for that
    if (document.getElementById('right-sidebar') == undefined) {
        document.getElementById('docs-content').classList.remove('nodisplay');
        document.getElementById('left-sidebar').classList.remove('not-visible')
    } else {
        document.getElementById('docs-content').classList.remove('nodisplay');
        document.getElementById('left-sidebar').classList.remove('not-visible')
        document.getElementById('right-sidebar').classList.remove('not-visible')
        document.getElementById('breadcrumbs').classList.remove('d-none')
    }
    document.getElementById('DeleteSearchText').classList.add("d-none");
}

const returnValue = async (event) => {
    clearTimeout(id);
    const el = document.getElementById('searchbox');
    document.getElementById('DeleteSearchText').classList.remove("d-none");
    timer(el);
};

async function onEnter(event) {
    // keyCode 13 === Enter
    if (event.which == 13 || event.keyCode == 13) {
        searchMainResult()
    }
};

const searchMainResult = async () => {
    let response = await searchRequest(document.getElementById('searchbox').value);
    createMainResult(response)
}

const pagination = (element) => {
    // Get pagination ul element and it's children
    let ul = document.getElementById('ul-pagination');
    let children = ul.children;

    // el = clicked page
    let el = element;

    // Remove the active state from every pagination element
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('active');
    }
    // Add the active state to the clicked one
    el.classList.add('active');

    // Get clicked pagination number
    const page_number = el.firstChild.innerHTML

    // pages = number of pages
    let pages = children.length

    // Hide all pages
    for (let i = 0; i < pages; i++) {
        let ul = document.getElementById('ul_' + (i+1).toString())
        ul.classList.add('nodisplay')
    }
    // Unhide the selected page
    document.getElementById('ul_' + page_number.toString()).classList.remove('nodisplay')
}

// Remove Dropdown once the user clicks somewhere else on the page
document.getElementsByTagName('body')[0].onclick = function(e) {
    if(e.target != document.getElementById('searchInput')) {
        document.getElementById('searchDropdown').classList.remove('show');
    }
}