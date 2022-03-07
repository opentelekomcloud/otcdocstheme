var id = 0;

async function searchRequest(val) {
    const requestjson = {
        "from" : 0, "size" : 10,
        "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url"],
        "query": {
          "match": {
            "body": val
          }
        },
        "highlight": {
            "number_of_fragments": 1,
            "fragment_size":100,
            "fields":{
               "body":{ "pre_tags": [""], "post_tags": [""]}
            }
        }
    };
    let response = await axios.post('https://search.dev.schreiber-ling.de/test-index/_search', requestjson);
    return response;
};

function createResultList(response) {
    let ul = document.getElementById('searchDropdown');
    ul.textContent = "";
    if (response.data.hits.hits.length > 0) {
        ul.classList.add('show');
        for (index in response.data.hits.hits) {
            let hit = response.data.hits.hits[index];
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href', hit._source.base_url + hit._source.doc_url + hit._source.current_page_name + '.html');
            a.classList.add("dropdown-item");
            let div_1 = document.createElement('div');
            let div_2 = document.createElement('div');
            div_1.classList.add("fw-bolder");
            div_1.innerHTML = hit._source.title;
            div_2.innerHTML = hit.highlight.body[0];
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

function timer(el) {
    id = setTimeout(async () => {
        if (el.value) {
            console.log(el.value);
            let response = await searchRequest(el.value);
            console.log(response);
            createResultList(response);
        } else {
            document.getElementById('searchDropdown').classList.remove('show');
        };    
    }, 500);
};

function returnValue() {
    clearTimeout(id);
    el = document.getElementById('txtbox');
    timer(el);
};
