function Search() {
    const [Results, setResults] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const handleSearchChange = event => {
        setSearch(event.target.value)
    };

    React.useEffect(() => {

        if (search !== "") {
            setResults([])
            const requestjson = {
                "from" : 0, "size" : 3,
                "_source": ["highlight", "current_page_name", "base_url", "doc_url"],
                "query": {
                  "match": {
                    "body": `${search}`
                  }
                },
                "highlight": {
                    "number_of_fragments": 1,
                    "fragment_size":100,
                    "fields":{
                       "body":{ "pre_tags": [""], "post_tags": [""]}
                    }
                }
            }
            axios.post('https://search.schreiber-ling.de/test-index/_search', requestjson)
            .then((response) => {
                const responsedata = response.data.hits.hits
                console.log(response)
                if (responsedata.length !== 0) {
                    document.getElementById('searchDropdown').classList.add('show');
                }
                else {
                    document.getElementById('searchDropdown').classList.remove('show');
                }
                const res = response.data.hits.hits.map((hit) => (
                    setResults((prevEntry) => [
                        ...prevEntry,
                        [
                            React.createElement('li', null,
                                React.createElement('a', {className: "dropdown-item", href: (hit._source.base_url + hit._source.doc_url + hit._source.current_page_name + '.html')},
                                    React.createElement('div', {className: "fw-bolder"}, hit._source.current_page_name),
                                    React.createElement('div', null, hit.highlight.body[0])
                                )
                            )
                        ]
                    ])
                ));
            })
            .catch((reason) => {
                alert("Search request fails: " + reason)
            })

        }
        else {
            document.getElementById('searchDropdown').classList.remove('show');
        }
    }, [search])

    return (
        React.createElement('div', null,
            React.createElement('input', {type: 'text', className: 'form-control', placeholder: 'Type here to search', onChange: handleSearchChange}),
            React.createElement('ul', {className: "dropdown-menu", id: 'searchDropdown'},
                    Results
            )
        )
    );
}

ReactDOM.render(
    React.createElement(Search),
    document.getElementById('searchInput')
)