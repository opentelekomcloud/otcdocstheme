===============================
Open Telekom Cloud Sphinx theme
===============================

*otcdocstheme* is a theme and extension support for Sphinx documentation
that is published to readthemanuals.org.

It is intended for use by OpenTelekomCloud projects.

Using the theme
---------------

.. note::

   Prior to using this theme, ensure your project can use the OpenTelekomCloud brand
   by referring to the brand guidelines at https://cloud.telekom.de/en/imprint/.

.. note::

   Some of the settings below are included in the file generated by Sphinx when
   you initialize a project, so they may already have values that need to be
   changed.

#. Update the requirements list for your project to include
   ``otcdocstheme`` (usually in ``test-requirements.txt`` or ``doc/requirements.txt``).

#. Once done, you should add ``'otcdocstheme'`` to the list of extensions
   Sphinx needs to initialize and configure the theme::

     extensions = [
         # ...
         'otcdocstheme',
         # ...
     ]

     html_theme = 'otcdocs'

#. Set the options to link to the git repository and bug tracker.

   ``otcdocs_git_fqdn``
     FQDN of the used git hosting. It is used to construct page
     edit/source/bug links. `github.com` is a default value.

   ``otcdocs_repo_name``
     The prefix and repo name. For example,
     ``'opentelekomcloud/python-otcextensions'``.

   ``otcdocs_git_type``
     Git hosting type. Can be one of `github`, `gitea` and also used for
     calculating links. `github` is a default value.

#. Configure "edit", "report bug" behaviour.

   ``otcdocs_edit_enabled``
     Whether page "Edit" functionality shoud be enabled or not. `True` is a default.

   ``otcdocs_edit_url``
     Optional URL to be used for "Edit". Default value based on `git_type` and
     `git_fqdn` is used if not set.

   ``otcdocs_bug_reported_enabled``
     Whether "Report Issue" functionality shoud be enabled or not. `True` is a default.

   ``otcdocs_bug_report_url``
     Optional URL to be used for "Report Issue". Default value based on `git_type` and
     `git_fqdn` is used if not set.

#. Remove the options that will be automatically configured by the theme.

   - ``project``
   - ``html_last_updated_fmt``
   - ``latex_engine``
   - ``latex_elements``

   In addition, if your documentation is versioned, you should remove the
   options related to versioning.

   - ``version``
   - ``release``


Additional Configuration
------------------------

If you are using this theme for API reference documentation, set the sidebar
navigation in the ``html_theme_options`` in the ``conf.py`` file::

    # To use the API Reference sidebar dropdown menu,
    # uncomment the html_theme_options parameter.  The theme
    # variable, sidebar_dropdown, should be set to `api_ref`.
    # Otherwise, the list of links for the User and Ops docs
    # appear in the sidebar dropdown menu.
    html_theme_options = {
        # ...
        "sidebar_dropdown": "api_ref",
        "sidebar_mode": "toc",
        # ...
    }

If you are using this theme for documentation you want to release based on git
tags on your repository, set the release dropdown menu option in the
``html_theme_options`` in the ``conf.py`` file. By default it is set to
``False``::

    html_theme_options = {
        # ...
        "show_other_versions": "True",
        # ...
    }

.. warning::

    Do not use this for release-notes as they are always published as one
    document with internal versioning.

Following additional options are supported by the theme:

- display_whats_next: Show "Whats next" footer under the main content

- display_last_updated: Show "Last updated" footer

- disable_search: Disable search box

- disable_global_nav: Disable global navigation on the top header row


Demonstration example
---------------------

The demo documentation provides example output to ensure it matches what's
expected. The link below points to the example output when using the theme
for all documentation that is not API reference.

.. toctree::
   :maxdepth: 1

   demo/index
   examples/index
