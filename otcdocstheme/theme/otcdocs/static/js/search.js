function Search() {
    const [Results, setResults] = React.useState([])
    const [search, setSearch] = React.useState('');
    const handleSearchChange = event => {
        setSearch(event.target.value)
    };

    React.useEffect(() => {

        if (search !== "") {
            setResults([])
            const requestjson = {
                "from" : 0, "size" : 3,
                "_source": ["highlight", "current_page_name"],
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
                const res = response.data.hits.hits.map((hit) => (
                    setResults((prevEntry) => [
                        ...prevEntry,
                        [
                            React.createElement('a', {href: ('https://python-otcextensions.readthedocs.io/en/latest/' + hit._source.current_page_name + '.html')},
                                React.createElement('div', null, hit._source.current_page_name),
                                React.createElement('div', null, hit.highlight.body[0]),
                            )
                        ]
                    ])
                ));
            })
            .catch((reason) => {
                alert("Search request fails: " + reason)
            })
        }
    }, [search])

    return (
        React.createElement('input', {type: 'text', class: 'form-control', placeholder: 'Type here to search', onChange: handleSearchChange})
        // React.createElement('div', {class: }, Results)
    );
}

ReactDOM.render(
    React.createElement(Search),
    document.getElementById('searchInput')
)