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
    return response.data.hits.hits;
};

function createResultList(hits) {
    if (hits.length > 0) {
        let ul = document.getElementById('searchDropdown');
        ul.classList.add('show');
        for (let el in hits) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            // ul.appendChild
        };
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
        };    
    }, 1000);
};

function returnvalue() {
    clearTimeout(id);
    el = document.getElementById('txtbox');
    timer(el);
};
