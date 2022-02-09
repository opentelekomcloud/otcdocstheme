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
            fetch('https://search.schreiber-ling.de/test-index/_search', {
                method: 'post',
                body: requestjson
            }).then((response) => {
                const responsedata = response.data.hits.hits
                console.log(response)
                const res = response.data.hits.hits.map((hit) => (
                    setResults((prevEntry) => [
                        ...prevEntry,
                        [   
                            <a href={"https://python-otcextensions.readthedocs.io/en/latest/" + hit._source.current_page_name + ".html"} className="side-nav-result-item">
                                <div className="side-nav-result-heading">
                                    {hit._source.current_page_name}
                                </div>
                                <div className="side-nav-result-detail">
                                    {hit.highlight.body[0]}
                                </div>
                            </a>
                            
                        ]
                    ])
                ));
            })
            .catch((reason) => {
                alert("mist")
            })
        }
    }, [search])

    return (
        <div className="side-nav-header-wrapper">
            <input type="text" className="form-control" placeholder="Type here to search" onChange={handleSearchChange}></input>
            <section className="side-nav-results-wrapper">
                <div className="side-nav-results">
                    {Results}
                </div>
            </section>
        </div>
    );
}

ReactDOM.render(
    <Search />,
    document.getElementById('searchInput')
)