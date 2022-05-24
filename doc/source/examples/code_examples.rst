Code Examples
=============

Python Example
--------------

.. code-block::

    def create_index(client, json_list, index, variant):
        try:
            if variant == 'opensearch':
                response = os_helpers.bulk(
                    client,
                    json_list,
                    index=index
                )
            if variant == 'elasticsearch':
                response = es_helpers.bulk(
                    client,
                    json_list,
                    index=index
                )
        except Exception as e:
            sys.exit("\nERROR:\n" + str(e))
        return response


    class Searchclient:

        def __init__(self, variant, username, password, hosts):
            self.variant = variant
            self.username = username
            self.password = password
            self.hosts = hosts

        def connect(self):
            if self.variant == 'opensearch':
                hosts = generate_os_host_list(self.hosts)
                client = OpenSearch(
                    hosts=hosts,
                    http_compress=True,
                    http_auth=(self.username, self.password),
                    use_ssl=True,
                    verify_certs=True,
                    ssl_assert_hostname=False,
                    ssl_show_warn=False
                )
                return client

            elif self.variant == 'elasticsearch':
                hosts, port = generate_es_host_list(self.hosts)
                client = Elasticsearch(
                    hosts=hosts,
                    http_auth=(self.username, self.password),
                    scheme='https',
                    port=port
                )
                return client

Python Example (expl. highlight)
--------------------------------

.. code-block:: python

    def create_index(client, json_list, index, variant):
        try:
            if variant == 'opensearch':
                response = os_helpers.bulk(
                    client,
                    json_list,
                    index=index
                )
            if variant == 'elasticsearch':
                response = es_helpers.bulk(
                    client,
                    json_list,
                    index=index
                )
        except Exception as e:
            sys.exit("\nERROR:\n" + str(e))
        return response


    class Searchclient:

        def __init__(self, variant, username, password, hosts):
            self.variant = variant
            self.username = username
            self.password = password
            self.hosts = hosts

        def connect(self):
            if self.variant == 'opensearch':
                hosts = generate_os_host_list(self.hosts)
                client = OpenSearch(
                    hosts=hosts,
                    http_compress=True,
                    http_auth=(self.username, self.password),
                    use_ssl=True,
                    verify_certs=True,
                    ssl_assert_hostname=False,
                    ssl_show_warn=False
                )
                return client

            elif self.variant == 'elasticsearch':
                hosts, port = generate_es_host_list(self.hosts)
                client = Elasticsearch(
                    hosts=hosts,
                    http_auth=(self.username, self.password),
                    scheme='https',
                    port=port
                )
                return client

Javascript Example
------------------

.. code-block::

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

Javascript Example (expl. highlight)
------------------------------------

.. code-block:: javascript

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

JSON Example
------------

.. code-block::

    {
        "kind": "Cluster",
        "apiVersion": "v3",
        "metadata": {
            "name": "mycluster",
            "labels": {
                "foo": "bar"
            }
        },
        "spec": {
            "type": "VirtualMachine",
            "flavor": "cce.s2.small",
            "version": "v1.19.8-r0",
            "description": "this is a demo cluster",
            "hostNetwork": {
                "vpc": "23d3725f-6ffe-400e-8fb6-b4f9a7b3e8c1",
                "subnet": "c90b3ce5-e1f1-4c87-a006-644d78846438"
            }
        }
    }

JSON Example (expl. highlight)
------------------------------

.. code-block:: json

    {
        "kind": "Cluster",
        "apiVersion": "v3",
        "metadata": {
            "name": "mycluster",
            "labels": {
                "foo": "bar"
            }
        },
        "spec": {
            "type": "VirtualMachine",
            "flavor": "cce.s2.small",
            "version": "v1.19.8-r0",
            "description": "this is a demo cluster",
            "hostNetwork": {
                "vpc": "23d3725f-6ffe-400e-8fb6-b4f9a7b3e8c1",
                "subnet": "c90b3ce5-e1f1-4c87-a006-644d78846438"
            }
        }
    }

BASH Example
------------

.. code-block::

    #!/bin/bash
    for (( counter=10; counter>0; counter-- ))
    do
    echo -n "$counter "
    done
    printf "\n"

BASH Example
------------

.. code-block:: bash

    #!/bin/bash
    for (( counter=10; counter>0; counter-- ))
    do
    echo -n "$counter "
    done
    printf "\n"


HTML Example
------------

.. code-block::

    <html>
    <head>
        <title>Div Align Attribbute</title>
    </head>
    <!-- Comment -->
    <body>
        <div align="left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
        <div align="right">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
        <div align="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
        <div align="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
    </body>
    </html>

HTML Example (expl. highlight)
------------------------------

.. code-block:: html

    <html>
    <head>
        <title>Div Align Attribbute</title>
    </head>
    <!-- Comment -->
    <body>
        <div align="left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
        <div align="right">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
        <div align="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
        <div align="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </div>
    </body>
    </html>

Config file (expl. highlight)
-----------------------------

.. code-block:: ini

    [testenv:functional]
    setenv =
        {[testenv]setenv}
        OS_TEST_TIMEOUT=60
    commands = stestr --test-path ./otcextensions/tests/functional run --serial --blacklist-file .stestr.blacklist.functional {posargs}
            stestr slowest

    [testenv:pep8]
    commands =
        flake8
        doc8 doc/source README.rst
