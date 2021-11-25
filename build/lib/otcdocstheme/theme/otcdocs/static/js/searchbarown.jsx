
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
            axios.post('https://opensearch.sphinxsearch.schreiber-ling.de/test-index/_search', requestjson, {
                auth: {
                    username: 'searchuser',
                    password: 'geheim321'
                }
            })
            .then((response) => {
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
            <section className="side-nav-header">
                <input type="text" className="side-nav-input" placeholder="Search" onChange={handleSearchChange}></input>
                <span className="side-nav-search-icon">
                    <i className="fa fa-search"></i>
                </span>
                <a className="side-nav-close-icon" onClick={() => { closeNav()} }>
                    <i className="fa fa-times"></i>
                </a>
            </section>
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
    document.getElementById('side-nav-header-wrapper-1')
)

