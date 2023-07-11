# -*- coding: utf-8 -*-
#
# openstackdocstheme documentation build configuration file

# -- General configuration ------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ['otcdocstheme']

# openstackdocstheme options
otcdocs_repo_name = 'opentelekomcloud/otcdocstheme'
otcdocs_edit_enabled = True
otcdocs_bug_report_enabled = True
otcdocs_pdf_link = True
otcdocs_pdf_filename = 'doc-otcdocstheme.pdf'
otcdocs_doc_environment = 'public'
otcdocs_doc_link = '/test/link/'
otcdocs_doc_title = 'otcdocstheme (umn type)'
otcdocs_doc_type = 'umn'
otcdocs_service_title = 'otcdocstheme (ecs Type)'
otcdocs_service_type = 'ecs'
otcdocs_service_category = 'theme'

otcdocs_search_environment = 'hc_de'
otcdocs_search_url = 'https://opensearch.eco.tsi-dev.otc-service.com/'

# The suffix of source filenames.
source_suffix = '.rst'

# The master toctree document.
master_doc = 'index'

# General information about the project.
copyright = u'2017-2021, OpenTelekomCloud Contributors'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
exclude_patterns = ['_build']

# The name of the Pygments (syntax highlighting) style to use.
# pygments_style = 'sphinx'


# -- Options for HTML output ----------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
html_theme = 'otcdocs'

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.

# To use the API Reference sidebar dropdown menu,
# uncomment the html_theme_options parameter.  The theme
# variable, sidebar_dropdown, should be set to `api_ref`.
# Otherwise, the list of links for the User and Ops docs
# appear in the sidebar dropdown menu.
html_theme_options = {
    'show_other_versions': True,
    'logo_url': 'https://docs-beta.otc.t-systems.com',
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static/css']


# -- Options for LaTeX output ---------------------------------------------

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title,
#  author, documentclass [howto, manual, or own class]).
latex_documents = [
  ('index', 'doc-otcdocstheme.tex', u'Open Telekom Cloud Theme  Documentation',
   u'OpenTelekomCloud Contributors', 'manual'),
]
