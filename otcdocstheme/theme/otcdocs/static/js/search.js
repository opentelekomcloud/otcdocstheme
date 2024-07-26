var id = 0;
let active_service_search_filters = []
let active_doc_search_filters = []
let available_doc_types = []
let currentDocTitle = ''
let currentServiceTitle = ''
let currentDocType = ''
let currentServiceType = ''

// Remove special characters and HTML from code blocks
const cleanupString = (text) => {
    text = text.replace(/¶/, " ");
    text = text.replace(/¶/, " ");
    if (containsHTML(text)) {
        text = removeHTMLTags(text)
        text = `<code class="search-result-code">${text}</code>`
    }
    return text;
}

// Check if a string contains any HTML except <span>
const containsHTML = (text) => {
    var htmlPattern = /<(?!\/?span\b)[^>]*>/;
    return htmlPattern.test(text);
}

// Remove any HTML from a string
const removeHTMLTags = (text) => {
    var doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
}

// Send a POST request
async function postRequest(url, body) {
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body, null, 0)
    })

    response = await response.json()
    return response
}

// Build the request for searching
async function searchRequest(val, request_size, highlight_size) {
    let search_filter_exact_match = false
    let service_type_query = []
    let service_doc_type_query = []

    function isFirstAndLastCharQuote(str) {
        if (str.length < 2) {
            // If the string is less than 2 characters long, it can't have matching first and last characters
            return false;
        }
        // Check if the first and last characters are both double quotes
        return str[0] === '"' && str[str.length - 1] === '"';
    }

    function removeFirstAndLastChar(str) {
        if (str.length <= 2) {
            // If the string is 2 characters or less, return an empty string
            return '';
        }
        // Use slice to remove the first and last character
        return str.slice(1, -1);
    }

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

    if (isFirstAndLastCharQuote(val)) {
        search_filter_exact_match = true
        val = removeFirstAndLastChar(val)
    }

    // Check for exact match
    if (search_filter_exact_match == true) {
        // Check if filters exist and what exactly is being filtered
        if (active_service_search_filters.length == 0 && active_doc_search_filters.length == 0) {
            // Exact match on either title or body or both
            opensearch_query_settings = {
                "bool": {
                    "should": [
                        {
                            "match_phrase": {
                                "title": {
                                    "query": val,
                                    "boost": 2
                                }
                            }
                        },
                        {
                            "match_phrase": {
                                "body": {
                                    "query": val,
                                    "boost": 1
                                }
                            }
                        }
                    ],
                    "minimum_should_match": 1
                }
            }
        } else if (active_service_search_filters != 0) {
            // Exact match on either title or body or both with filtered by service_type and doc_type
            opensearch_query_settings = {
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
                        }
                    ],
                    "should": [
                        {
                            "match_phrase": {
                                "title": {
                                    "query": val,
                                    "boost": 2
                                }
                            }
                        },
                        {
                            "match_phrase": {
                                "body": {
                                    "query": val,
                                    "boost": 1
                                }
                            }
                        }
                    ],
                    "minimum_should_match": 1
                }
            }
        } else if (active_doc_search_filters != 0) {
            // Exact match on either title or body or both with filtered by doc_type
            opensearch_query_settings = {
                "bool": {
                    "must": [
                        {
                            "terms": {
                                "doc_type.keyword": docs_type_query
                            }
                        }
                    ],
                    "should": [
                        {
                            "match_phrase": {
                                "title": {
                                    "query": val,
                                    "boost": 2
                                }
                            }
                        },
                        {
                            "match_phrase": {
                                "body": {
                                    "query": val,
                                    "boost": 1
                                }
                            }
                        }
                    ],
                    "minimum_should_match": 1
                }
            }
        }
    }

    // Not exact matched queries
    else {
        // Check if filters exist and what exactly is being filtered
        if (active_service_search_filters.length == 0 && active_doc_search_filters.length == 0) {
            // Standard search
            opensearch_query_settings = {
                "multi_match": {
                "query": val,
                "type": "bool_prefix",
                "operator": "and",
                "fields": [ "body", "title^2" ]
                }
            }
        } else if (active_service_search_filters != 0) {
            // Filtered by service and docs
            opensearch_query_settings = {
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
                            "type": "bool_prefix",
                            "operator": "and",
                            "fields": ["body", "title^2"]
                        }
                        }
                    ]
                }
            }
        } else if (active_doc_search_filters != 0) {
            // Filtered by docs
            opensearch_query_settings = {
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
                            "type": "bool_prefix",
                            "operator": "and",
                            "fields": ["body", "title^2"]
                        }
                        }
                    ]
                }
            }
        }
    }

    const final_query = {
        "from" : 0, "size" : request_size,
        "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url", "doc_type", "doc_title", "service_title"],
        "query": opensearch_query_settings,
        "highlight": {
            "number_of_fragments": 1,
            "fragment_size":highlight_size,
            "pre_tags": [
                "<span style='color: var(--telekom-color-text-and-icon-primary-standard)'>"
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


    // Get the value search_environment out of this script's html description of the footer section
    let this_js_script = $('script[src*=search]');

    // search_environment => hc_de | hc_swiss
    let search_environment = this_js_script.attr('search_environment');

    // Set the URL for the OpenSearch search correctly
    let search_url = this_js_script.attr('search_url')
    if (search_url.slice(-1) !== '/') {
        search_url = search_url + '/'
    }
    let url = `${search_url}${search_environment}-*/_search`

    let response = await postRequest(url, final_query)

    return response
};

const shortenString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }

    return str.slice(0, maxLength - 3) + "...";
};

// CREATES THE SEARCH RESULT LIST IN THE MAIN SECTION OF THE PAGE INSTEAD OF A DROP DOWN FIELD
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
        a.classList.add("search-a")
        li.classList.add("nobullets")
        li.classList.add("border-bottom")
        li.classList.add("search-result-padding")
        div_1.classList.add("search-title");
        div_url.classList.add("search-meta")
        div_2.classList.add("search-result-text")
        if (typeof hit.highlight.title == 'undefined') {
            div_1.innerHTML = hit._source.title;
        } else {
            div_1.innerHTML = hit.highlight.title[0];
        }

        // Add Icons based on DocType
        if (hit._source.doc_type === "umn") {
            div_1.insertAdjacentHTML("afterbegin", `<i class="fa-regular fa-file-lines fa-fw icon-doc-type"></i>`)
        } else if (hit._source.doc_type === "api-ref") {
            div_1.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-code fa-fw icon-doc-type"></i>`)
        } else if (hit._source.doc_type === "dev") {
            div_1.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-terminal fa-fw icon-doc-type"></i>`)
        } else {
            div_1.insertAdjacentHTML("afterbegin", `<i class="fa-regular fa-file fa-fw icon-doc-type"></i>`)
        }
        // Shorten the URL string so that it isn't too long
        hit_doc_url = shortenString(`${hit._source.doc_url}${hit._source.current_page_name}`, 80)
        // Create meta string and add it
        meta_string = `<bold class="service-doc-title">${hit._source.service_title} - ${hit._source.doc_title}</bold> | <path class=path-accent>${hit_doc_url}</path>`
        div_url.innerHTML = meta_string
        div_2.innerHTML = cleanupString(hit.highlight.body[0])

        // Append as childs to structure ul > li > a > div/div/div
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

// UPDATES SEARCH RESULTS COUNT
const updateSearchResultsCount = (resultsCount) => {
    h1 = document.getElementById("searchResultsCount")
    h1.textContent = ""
    h1.insertAdjacentHTML("afterbegin", `
        Search Results: ${resultsCount}
        <scale-icon-action-close class="closeSearchIcon" accessibility-title="Close Search Results" size="35" onclick="deleteEnterResults()"></scale-icon-action-close>
    `)
}


// DELETES SEARCH AS YOU TYPE RESULTS AND HIDES SIDEBARS AND CONTENT
const createMainResult = async (response) => {
    // Function to generate result list on main content
    let div = document.getElementById('searchResultsEnter')
    // Remove old search results
    div.textContent = ""

    // Create Main Result List
    createMainResultList(response, div)
    updateSearchResultsCount(response.hits.hits.length)

    // Create Filter List
    // Check whether the serviceAccordion div already exists
    let div_service_accordion = document.getElementById('searchAccordions')
    if (div_service_accordion === null) {
        let filters = await addFilters()
        createSearchFilter()
        addFiltersToAccordion(filters)
    }

}

// Obtain all the possible filter values
async function addFilters() {
    let request = {
        "query" : {
            "match_all" : {}
        }
    }

    // URL for querying the filter values
    let this_js_script = $('script[src*=search]');
    let search_url = this_js_script.attr('search_url')
    let search_index = this_js_script.attr('search_index');

    currentServiceTitle = this_js_script.attr('search_current_service_title')
    currentServiceType = this_js_script.attr('search_current_service_type')
    currentDocTitle = this_js_script.attr('search_current_doc_title')
    currentDocType = this_js_script.attr('search_current_doc_type')

    let url = `${search_url}${search_index}/_search`

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
    let searchbox = document.getElementById("searchbox");
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
                let docdivservice = document.getElementById(`filter-service-doc-div-${service["service_type"]}`)
                docdivservice.classList.remove("nodisplay")
                for (child of docdivservice.children) {
                    child.children[0].children[0].checked = true
                }
            } else {
                // Remove the element from the array
                active_service_search_filters = (
                    active_service_search_filters.filter((item) => item.service_type !== `${service["service_type"]}`)
                );
                // Remove the doc filter UI for that service
                document.getElementById(`filter-service-doc-div-${service["service_type"]}`).classList.add("nodisplay")
            }
            if (searchbox.value) {
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
                            // Filter by adding a doc type or removing it
                            if (remove) {
                                updatedDocTypes = item.doc_types.filter((docType) => docType !== element);
                            } else {
                                updatedDocTypes = [...item.doc_types, element];
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
                } else {
                    // Remove the element from the array
                    active_service_search_filters = updateDocTypes(active_service_search_filters, service["service_type"], doc["type"], true, doc_types)
                }
                if (searchbox.value) {
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
            if (searchbox.value) {
                searchMainResult()
            }
        })
    })

}

const deleteResults = () => {
    document.getElementById('ul_div').textContent = ""
    document.getElementById('searchResultsCount').childNodes[0].nodeValue = "Search Results: 0"
}

// REMOVES RESULTS ON MAIN CONTENT END REMOVES ALSO THE SEARCH FILTER
const deleteEnterResults = () => {
    document.getElementById('searchbox').value = ""
    let div = document.getElementById('searchResultsEnter')
    if (div) {
        div.parentNode.removeChild(div)
    }
    document.getElementById('docs-main').classList.remove('nodisplay');
    document.getElementById('left-sidebar').classList.remove('nodisplay')
    document.getElementById('subnavbar-togglebutton').classList.remove('nodisplay')
    document.getElementById('docs-content').classList.remove('nodisplay');

    // On docsportal starpage we don't have breadcrumbs or sidebar, so check for that
    if (document.getElementById('right-sidebar') == undefined) {
    } else {
        document.getElementById('right-sidebar').classList.remove('nodisplay')
        document.getElementById('right-sidebar').classList.add('d-xl-block')
        document.getElementById('breadcrumbs').classList.remove('nodisplay')
    }

    // Remove Search Filter
    active_service_search_filters = []
    removeSearchFilter()

    // Remove Search Input
    document.getElementById("searchbox").remove();

    // Remove SearchResultsCount
    document.getElementById("searchResultsCount").remove();
}

const filterCurrentDoc = (e) => {
    if (e.checked) {
        // Add element to the array
        if (currentDocTitle !== "") {
            active_service_search_filters.push({
                service_type: currentServiceType,
                doc_types: [currentDocType]
            })
        }
        else {
            active_service_search_filters.push({
                service_type: currentServiceType,
                doc_types: available_doc_types
            })
        }
        searchMainResult()
    } else {
        // Remove the element from the array
        active_service_search_filters = (
            active_service_search_filters.filter((item) => item.service_type !== `${currentServiceType}`)
        );
        searchMainResult()
    }
}

// Create the Accordions
const createSearchFilter = () => {
    let filter = document.createElement('div')
    filter.setAttribute('id', 'accordions')
    filter.classList.add('docs-sidebar')
    filter.insertAdjacentHTML("beforeend", `
        <div class="accordion" id="searchAccordions">
            <div class="accordion-item">
                <h2 class="accordion-header" id="serviceFilter">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseServiceFilter"
                    aria-expanded="true" aria-controls="collapseServiceFilter" onclick="removeAllFilters()">
                    Service Filters
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
                    aria-expanded="false" aria-controls="collapseDocFilter" onclick="removeAllFilters()">
                    Document Filters
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
    // Add suggested filters in case we have all the data
    if (currentServiceTitle !== "" && currentServiceType !== "") {
        const suggestedFilterHTML = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="suggestedFilter">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSuggestedFilter"
                    aria-expanded="true" aria-controls="collapseSuggestedFilter" onclick="removeAllFilters()">
                    Suggested Filters
                    </button>
                </h2>
                <div id="collapseSuggestedFilter" class="accordion-collapse collapse show" aria-labelledby="suggestedFilter"
                    data-bs-parent="#searchAccordions" style="">
                    <div class="accordion-body" id="suggestedFilterBody">
                        <div id="searchSelectCurrentValue">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" onClick="filterCurrentDoc(this)" id="searchSelectCurrentValueCheckbox" />
                                <label class="form-check-label" for="searchSelectCurrentValueCheckbox">${currentServiceTitle} ${(currentDocTitle !== "") ? ("- " + currentDocTitle) : ""}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        document.getElementById("searchAccordions").insertAdjacentHTML("afterbegin",suggestedFilterHTML)

        // Auto selected suggested filters
        document.getElementById("searchSelectCurrentValueCheckbox").checked = true
        filterCurrentDoc(document.getElementById("searchSelectCurrentValueCheckbox"))
    }
}

const removeSearchFilter = () => {
    let filter = document.getElementById('accordions')
    filter.remove(filter)
}

const removeAllFilters = () => {
    removeServiceFilters()
    removeDocFilters()
}

// Remove Service Filters once user clicks on Doc-Filter accordion
const removeServiceFilters = () => {
    active_service_search_filters.map(item => {
        document.getElementById(`filter-service-${item["service_type"]}`).checked = false
        document.getElementById(`filter-service-doc-div-${item["service_type"]}`).classList.add("nodisplay")
        if (item["doc_types"].length > 0 && item["doc_types"] !== available_doc_types) {
            item["doc_types"].map(type => {
                document.getElementById(`filter-service-${item["service_type"]}-doc-${type}`).checked = false
            })
        }
    })
    // Remove sugggested filters if we created them
    if (currentServiceTitle !== "" && currentServiceType !== "") {
        document.getElementById("searchSelectCurrentValueCheckbox").checked = false
    }
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

// REPRESENTATION OF SEARCH RESULT ON MAIN CONTENT PAGE INSTEAD OF DROPDOWN
const searchMainResult = async () => {
    let response = await searchRequest(document.getElementById('searchbox').value, 100, 300);
    createMainResult(response)
}

// TIMER WHICH STARTS THE SEARCH RESULT LIST AFTER TIMEOUT HAS BEEN REACHED
function timer(el) {
    id = setTimeout(async () => {
        if (el.value) {
            let response = await searchRequest(document.getElementById('searchbox').value, 100, 300);
            createMainResult(response)
        } else {
            deleteResults();
        };
    }, 250);
};

// FUNCTION WHICH STARTS THE TIMER EVENT AFTER THE KEY UP EVENT
const getSearchResults = async () => {
    clearTimeout(id);
    const el = document.getElementById('searchbox');
    timer(el);
};

const createSearchPage = async () => {
    let contentDiv = document.getElementById('docs-main')
    // Check if we are already on the Search Page if this is the case skip the Page Creation
    if (document.getElementById('searchResultsEnter') == undefined) {
        contentDiv.insertAdjacentHTML("afterend", "<div id='searchResultsEnter' class='overflow-hidden'></div>");
        contentDiv.classList.add('nodisplay')

        // On docsportal starpage we don't have breadcrumbs or sidebar, so check for that
        if (document.getElementById('right-sidebar') == undefined) {
            document.getElementById('left-sidebar').classList.add('nodisplay')
            document.getElementById('subnavbar-togglebutton').classList.add('nodisplay')
        } else {
            document.getElementById('left-sidebar').classList.add('nodisplay')
            document.getElementById('subnavbar-togglebutton').classList.add('nodisplay')
            document.getElementById('right-sidebar').classList.add('nodisplay')
            document.getElementById('right-sidebar').classList.remove('d-xl-block')
            document.getElementById('breadcrumbs').classList.add('nodisplay')
        }

        // Create Search Input Field
        let flexContent = document.getElementById('flex-content')
        flexContent.insertAdjacentHTML("beforebegin", `
            <scale-text-field id="searchbox" label="Type to Search"></scale-text-field>
        `)
        document.getElementById('searchbox').addEventListener('scale-input', (event) => {
            getSearchResults();
        });

        // Get Search Results div
        let div = document.getElementById('searchResultsEnter')

        // Create Results Headline
        div.insertAdjacentHTML("beforebegin", `
            <h1 id="searchResultsCount">
                Search Results: 0
                <scale-icon-action-close class="closeSearchIcon" accessibility-title="Close Search Results" size="35" onclick="deleteEnterResults()"></scale-icon-action-close>
            </h1>
        `)

        // Create Filter List
        // Check whether the serviceAccordion div already exists
        let div_service_accordion = document.getElementById('searchAccordions')
        if (div_service_accordion === null) {
            let filters = await addFilters()
            createSearchFilter()
            addFiltersToAccordion(filters)
        }

        // waites 100ms to set the focus on searchbox input field to avoid that the field isn't there
        setTimeout(function (){
            document.getElementById("searchbox").children[0].children[1].focus();
        }, 100)
    }
}