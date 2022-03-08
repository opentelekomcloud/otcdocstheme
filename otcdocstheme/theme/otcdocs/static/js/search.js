var id = 0;

async function searchRequest(val) {
    const requestjson = {
        "from" : 0, "size" : 50,
        "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url"],
        "query": {
          "match": {
            "body": val
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
               "body":{}
            }
        }
    };
    let response = await fetch('https://search.dev.schreiber-ling.de/test-index/_search', {
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
            div_1.innerHTML = hit._source.title;
            div_2.innerHTML = hit.highlight.body[0];

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
        div = document.getElementById('searchResultsEnter')
    }

    // Remove old search results
    div.textContent = ""

    // Create Headline
    let h1 = document.createElement('h1')
    h1.innerHTML = "Search Results: " + response.hits.hits.length
    h1.setAttribute('style', 'font-size: 1.5rem')
    h1.classList.add('ps-3')
    h1.classList.add('d-flex')
    h1.classList.add('justify-content-between')

    let i = document.createElement('i')
    i.classList.add('fa')
    i.classList.add('fa-close')
    i.setAttribute('onclick', 'deleteEnterResults()')
    h1.appendChild(i)

    div.appendChild(h1)

    let ul = document.createElement('ul')
    ul.classList.add('p-0')
    div.appendChild(ul)

    if (response.hits.hits.length > 0) {
        for (index in response.hits.hits) {
            let hit = response.hits.hits[index];

            // Create li, a, div elements
            let li = document.createElement('li');
            let a = document.createElement('a');
            let div_1 = document.createElement('div');
            let div_2 = document.createElement('div');

            // Add text and classes
            a.setAttribute('href', hit._source.base_url + hit._source.doc_url + hit._source.current_page_name + '.html');
            a.classList.add("dropdown-item");
            li.classList.add("nobullets")
            li.classList.add("border-bottom")
            div_1.classList.add("fw-bolder");
            div_1.innerHTML = hit._source.title;
            div_2.innerHTML = hit.highlight.body[0];

            // Append as childs to structure ul > li > a > div/div
            a.appendChild(div_1);
            a.appendChild(div_2);
            li.appendChild(a);
            ul.appendChild(li);
        }
    }
}

function timer(el) {
    id = setTimeout(async () => {
        if (el.value) {
            let response = await searchRequest(el.value);
            console.log(response)
            createResultList(response);
        } else {
            deleteEnterResults()
        };
    }, 250);
};

const deleteEnterResults = () => {
    document.getElementById('txtbox').value = ""
    document.getElementById('searchDropdown').classList.remove('show');
    let div = document.getElementById('searchResultsEnter')
    div.parentNode.removeChild(div)
    document.getElementById('docs-content').classList.remove('nodisplay');
}

const returnValue = async (event) => {
    clearTimeout(id);
    const el = document.getElementById('txtbox');
    timer(el);
};

async function onEnter(event) {
    // keyCode 13 === Enter
    if (event.which == 13 || event.keyCode == 13) {
        searchMainResult()
    }
};

const searchMainResult = async () => {
    let response = await searchRequest(document.getElementById('txtbox').value);
    createMainResult(response)
}