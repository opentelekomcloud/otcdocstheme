Code Examples
=============

Python Example
--------------

A Python example.

.. code-block:: python

    # Copyright 2015 Rackspace US, Inc.
    #
    #    Licensed under the Apache License, Version 2.0 (the "License"); you may
    #    not use this file except in compliance with the License. You may obtain
    #    a copy of the License at
    #
    #         http://www.apache.org/licenses/LICENSE-2.0
    #
    #    Unless required by applicable law or agreed to in writing, software
    #    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    #    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    #    License for the specific language governing permissions and limitations
    #    under the License.

    import configparser
    import os
    import subprocess
    import textwrap

    import dulwich.repo
    from pbr import packaging
    import sphinx
    from sphinx.ext import extlinks
    from sphinx.util import logging

    from . import version
    from otcdocstheme import paths

    _series = None
    _project = None
    _giturl = 'https://github.com/{}/blob/{}/{}'
    _git_branch = 'main'
    _giturl_edit = 'https://github.com/{}/edit/{}/{}'
    _html_context_data = None

    logger = logging.getLogger(__name__)


    def _has_stable_branches():
        try:
            repo = dulwich.repo.Repo.discover()
        except dulwich.repo.NotGitRepository:
            return False

        refs = repo.get_refs()
        for ref in refs.keys():
            ref = ref.decode('utf-8')
            if ref.startswith('refs/remotes/origin/stable'):
                return True

        return False


    def _get_other_versions(app):
        if not app.config.html_theme_options.get('show_other_versions', False):
            return []

        all_series = []
        try:
            repo = dulwich.repo.Repo.discover()
        except dulwich.repo.NotGitRepository:
            return []

        refs = repo.get_refs()
        for ref in refs.keys():
            ref = ref.decode('utf-8')
            if ref.startswith('refs/remotes/origin/stable'):
                series = ref.rpartition('/')[-1]
                all_series.append(series)
            elif ref.startswith('refs/tags/') and ref.endswith('-eol'):
                series = ref.rpartition('/')[-1][:-4]
                all_series.append(series)
        all_series.sort()

        # NOTE(dhellmann): Given when this feature was implemented, we
        # assume that the earliest version we can link to is for
        # mitaka. Projects that have older docs online can set the option
        # to indicate another start point. Projects that come later should
        # automatically include everything they actually have available
        # because the start point is not present in the list.
        earliest_desired = app.config.html_theme_options.get(
            'earliest_published_series', 'mitaka')
        if earliest_desired and earliest_desired in all_series:
            interesting_series = all_series[all_series.index(earliest_desired):]
        else:
            interesting_series = all_series

        # Reverse the list because we want the most recent to appear at
        # the top of the dropdown. Add the "latest" release to the
        # front of the list.
        interesting_series.append("latest")
        interesting_series.reverse()
        return interesting_series

Javascript Example
------------------

A Javascript example.

.. code-block:: javascript
    
    async function searchRequest(val) {
        const requestjson = {
            "from" : 0, "size" : 100,
            "_source": ["highlight", "current_page_name", "title", "base_url", "doc_url"],
            "query": {
                "multi_match": {
                "query": val,
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
                "body":{}
                }
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
                div_1.innerHTML = hit._source.title;
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
            document.getElementById('left-sidebar').classList.add('not-visible')
            document.getElementById('right-sidebar').classList.add('not-visible')
            document.getElementById('breadcrumbs').classList.add('not-visible')
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
            div_1.innerHTML = hit._source.title;
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
