var id = 0;
const base_url = 'https://opensearch.eco.tsi-dev.otc-service.com/'
let active_service_search_filters = []
let active_doc_search_filters = []
let available_doc_types = []

const cleanupString = (text) => {
    text = text.replace(/¶/, " ");
    text = text.replace(/¶/, " ");
    return text;
}

async function postRequest(url, body) {
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    response = await response.json()
    return response
}

async function searchRequest(val) {

    let service_type_query = []
    let service_doc_type_query = []

    if (active_service_search_filters.length != 0) {
        active_service_search_filters.map(item => {
            service_type_query.push(item["service_type"])
            service_doc_type_query = item["doc_types"]
        })
    }

    let docs_type_query = []

    if (active_doc_search_filters.length != 0) {
        docs_type_query = active_doc_search_filters
    }

    const request_service_filtered = {
        "from" : 0, "size" : 100,
        "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url"],
        "query": {
            "bool": {
                "must": [
                    {
                        "terms": {
                          "service_type.keyword": service_type_query
                        }
                    },
                    {
                        "terms": {
                          "doc_type.keyword": service_doc_type_query
                        }
                    },
                    {
                    "multi_match": {
                        "query": val,
                        "type": "best_fields",
                        "operator": "and",
                        "fields": ["body", "title^2"]
                    }
                    }
                ]
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

    const request_docs_filtered = {
        "from" : 0, "size" : 100,
        "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url"],
        "query": {
            "bool": {
                "must": [
                    {
                        "terms": {
                          "doc_type.keyword": docs_type_query
                        }
                    },
                    {
                    "multi_match": {
                        "query": val,
                        "type": "best_fields",
                        "operator": "and",
                        "fields": ["body", "title^2"]
                    }
                    }
                ]
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

    const request = {
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

    let final_query = {}

    if (active_service_search_filters.length == 0 && active_doc_search_filters.length == 0) {
        final_query = request
    } else if (active_service_search_filters != 0) {
        final_query = request_service_filtered
    } else if (active_doc_search_filters != 0) {
        final_query = request_docs_filtered
    }

    console.log(final_query)

    // Get the value search_environment out of this script's html description of the footer section
    let this_js_script = $('script[src*=search]');

    // search_environment => hc_de | hc_swiss
    let search_environment = this_js_script.attr('search_environment');

    // Set the URL for the OpenSearch search correctly
    let url = `${base_url}${search_environment}-*/_search`

    let response = await postRequest(url, final_query)

    return response
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

const createMainResultList = (response, div) => {
    // Create Result-List
    let index = 0
    let ul_index = 0
    let hit_length = response.hits.hits.length
    let ul;
    if (document.getElementById('ul_div') === null) {
        let ul_div = document.createElement('div')
        ul_div.setAttribute('id', 'ul_div')
        div.appendChild(ul_div)
    } else {
        document.getElementById('ul_div').textContent = ""
    }

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
        ul_div.appendChild(ul)

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
        ul_div.appendChild(nav);
    }
}

const createMainResult = async (response) => {
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

    // Create Main Result List
    createMainResultList(response, div)

    // Create Filter List
    // Check whether the serviceAccordion div already exists
    let div_service_accordion = document.getElementById('searchAccordions')
    if (div_service_accordion === null) {
        let filters = await addFilters()
        createSearchFilter()
        addFiltersToAccordion(filters)
    }

}

async function addFilters() {
    let request = {
        "query" : {
            "match_all" : {}
        }
    }

    let url = `${base_url}search_index_test/_search`

    let response = await postRequest(url, request)
    response = response.hits.hits[0]._source
    response["docs"].map(doc => {
        available_doc_types.push(doc["type"])
    })
    return response
}

const addFiltersToAccordion = (filters) => {
    let serviceDiv = document.getElementById('serviceFilterBody')
    let docDiv = document.getElementById('docFilterBody')
    let services = filters['services']
    let doc_types = available_doc_types
    let all_docs = filters['docs']
    services.map(service => {
        // Create the filters on the left side
        serviceDiv.insertAdjacentHTML("beforeend", `
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="filter-service-${service["service_type"]}" />
                <label class="form-check-label" for="filter-service-${service["service_type"]}">${service["service_title"]}</label>
            </div>
        `)

        // Add the event listeners for clicking on a service-filter
        let serviceCheckbox = document.getElementById(`filter-service-${service["service_type"]}`)
        serviceCheckbox.addEventListener("change", (e) => {
            if (e["target"].checked) {
                // Add element to the array
                active_service_search_filters.push({
                    service_type: `${service["service_type"]}`,
                    doc_types: doc_types
                })
                // Add the doc filter UI for that service
                document.getElementById(`filter-service-doc-div-${service["service_type"]}`).classList.remove("nodisplay")
                searchMainResult()
            } else {
                // Remove the element from the array
                active_service_search_filters = (
                    active_service_search_filters.filter((item) => item.service_type !== `${service["service_type"]}`)
                );
                // Remove the doc filter UI for that service
                document.getElementById(`filter-service-doc-div-${service["service_type"]}`).classList.add("nodisplay")
                searchMainResult()
            }
        })

        // Add the doc filters to each service type
        serviceDiv.insertAdjacentHTML("beforeend", `
                <div class="nodisplay" id="filter-service-doc-div-${service["service_type"]}">`)
        service["docs"].map (doc => {
            document.getElementById(`filter-service-doc-div-${service["service_type"]}`).insertAdjacentHTML("beforeend", `
                <div id="filter-service-doc-div-${service["service_type"]}">
                    <div class="form-check form-switch form-check-doc">
                        <input class="form-check-input" type="checkbox" id="filter-service-${service["service_type"]}-doc-${doc["type"]}" />
                        <label class="form-check-label" for="filter-service-${service["service_type"]}-doc-${doc["type"]}">${doc["title"]}</label>
                    </div>
                </div>
            `)
            // Add Event Listeners for clicking on the doc filter
            let serviceDocCheckbox = document.getElementById(`filter-service-${service["service_type"]}-doc-${doc["type"]}`)
            serviceDocCheckbox.addEventListener("change", (e) => {
                // Function to update array
                function updateDocTypes(arr, serviceType, element, remove = false, docTypes) {
                    return arr.map((item) => {
                        if (item.service_type === serviceType) {
                            let updatedDocTypes;
                            // Remove all docTypes as we now want to filter
                            if (item.doc_types === docTypes) {
                                item.doc_types = []
                            }
                            // Filter by adding a doc type or removing it
                            if (remove) {
                                updatedDocTypes = item.doc_types.filter((docType) => docType !== element);
                            } else {
                                updatedDocTypes = [...item.doc_types, element];
                            }
                            // If no filter is selected add all doc types
                            if (updatedDocTypes.length == 0) {
                                updatedDocTypes = docTypes
                            }
                            return {
                                ...item,
                                doc_types: updatedDocTypes
                            };
                        }
                        return item;
                    });
                  }
                if (e["target"].checked) {
                    // Add element to the array
                    active_service_search_filters = updateDocTypes(active_service_search_filters, service["service_type"], doc["type"], false, doc_types)
                    searchMainResult()
                } else {
                    // Remove the element from the array
                    active_service_search_filters = updateDocTypes(active_service_search_filters, service["service_type"], doc["type"], true, doc_types)
                    searchMainResult()
                }
            })
        })
    })
    all_docs.map(doc => {
        docDiv.insertAdjacentHTML("beforeend", `
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="filter-doc-${doc['type']}" />
                <label class="form-check-label" for="filter-doc-${doc['type']}">${doc['title']}</label>
            </div>
        `)

        // Add the event listeners for clicking on a doc-filter
        let docCheckbox = document.getElementById(`filter-doc-${doc['type']}`)
        docCheckbox.addEventListener("change", (e) => {
            if (e["target"].checked) {
                // Add element to the array
                active_doc_search_filters.push(doc['type'])
            } else {
                // Remove the element from the array
                // Search the element first
                const doc_type_index = active_doc_search_filters.indexOf(doc['type'])
                // If found remove it using splice method
                if (doc_type_index > -1) {
                    active_doc_search_filters.splice(doc_type_index, 1)
                }
            }
            searchMainResult()
        })
    })

}

function timer(el) {
    id = setTimeout(async () => {
        if (el.value) {
            // Check whether main Result is opened
            if (document.getElementById("searchResultsEnter") === null) {
                let response = await searchRequest(el.value);
                createResultList(response);
            }
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

    // Remove Search Filter
    active_service_search_filters = []
    removeSearchFilter()
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

// Create the Accordions
const createSearchFilter = () => {
    let filter = document.createElement('div')
    filter.setAttribute('id', 'accordions')
    filter.classList.add('docs-sidebar')
    filter.classList.add('py-md-4')
    filter.insertAdjacentHTML("beforeend", `
        <div class="accordion" id="searchAccordions">
            <div class="accordion-item">
                <h2 class="accordion-header" id="serviceFilter">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseServiceFilter"
                    aria-expanded="true" aria-controls="collapseServiceFilter" onclick="removeDocFilters()">
                    Service Filter
                    </button>
                </h2>
                <div id="collapseServiceFilter" class="accordion-collapse collapse" aria-labelledby="serviceFilter"
                    data-bs-parent="#searchAccordions" style="">
                    <div class="accordion-body" id="serviceFilterBody">
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDocFilter"
                    aria-expanded="false" aria-controls="collapseDocFilter" onclick="removeServiceFilters()">
                    Document-Type Filter
                    </button>
                </h2>
                <div id="collapseDocFilter" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                    data-bs-parent="#searchAccordions">
                    <div class="accordion-body"  id="docFilterBody">
                    </div>
                </div>
            </div>
        </div>
    `);
    let sidebar = document.getElementById('left-sidebar')
    sidebar.after(filter)
}

const removeSearchFilter = () => {
    let filter = document.getElementById('accordions')
    filter.remove(filter)
}

// Remove Service Filters once user clicks on Doc-Filter accordion
const removeServiceFilters = () => {
    console.log(active_service_search_filters)
    active_service_search_filters.map(item => {
        document.getElementById(`filter-service-${item["service_type"]}`).checked = false
        document.getElementById(`filter-service-doc-div-${item["service_type"]}`).classList.add("nodisplay")
        if (item["doc_types"].length > 0 && item["doc_types"] !== available_doc_types) {
            item["doc_types"].map(type => {
                document.getElementById(`filter-service-${item["service_type"]}-doc-${type}`).checked = false
            })
        }
    })
    active_service_search_filters = []
    searchMainResult()
}

// Remove Doc Filters once user clicks on Service-Filter accordion
const removeDocFilters = () => {
    active_doc_search_filters.map(item => {
        document.getElementById(`filter-doc-${item}`).checked = false
    })
    active_doc_search_filters = []
    searchMainResult()
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
