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
from docutils.nodes import Element
import dulwich.repo
import glob
import os
from pbr import packaging
import sphinx
from sphinx.ext import extlinks
from sphinx.util import logging
from sphinx.writers.html5 import HTML5Translator
import subprocess
import textwrap

from . import version
from otcdocstheme import paths

import otc_metadata.services
METADATA = otc_metadata.services.Services()

_series = None
_project = None
_giturl_source = {
    'github': 'https://{git_fqdn}/{repo_name}/blob/{branch_name}/{doc_path}',
    'gitea': 'https://{git_fqdn}/{repo_name}/src/{branch_name}/{doc_path}',
}
_giturl_edit = {
    'github': 'https://{git_fqdn}/{repo_name}/edit/{branch_name}/{doc_path}',
    'gitea': 'https://{git_fqdn}/{repo_name}/_edit/{branch_name}/{doc_path}',
}
_giturl_bug_report = {
    'github': 'https://{git_fqdn}/{repo_name}/issues/new',
    'gitea': 'https://{git_fqdn}/{repo_name}/issues/new',
}
_git_branch = 'main'
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


def _get_doc_path(app):
    # Handle 'doc/{docType}/source' paths
    doc_parts = os.path.abspath(app.srcdir).split(os.sep)[-3:]
    if doc_parts[0] == 'doc' and doc_parts[2] == 'source':
        return '/'.join(doc_parts)

    # Handle '{docType}/source' paths
    doc_parts = os.path.abspath(app.srcdir).split(os.sep)[-2:]
    if doc_parts[1] == 'source':
        return '/'.join(doc_parts)

    logger.info(
        "[otcdocstheme] cannot identify project's root directory."
    )
    return


def _html_page_context(app, pagename, templatename, context, doctree):
    global _html_context_data
    if _html_context_data is None:
        logger.debug('[otcdocstheme] building html context')

        _html_context_data = {}
        try:
            _html_context_data['gitsha'] = subprocess.check_output(
                ['git', 'rev-parse', 'HEAD'],
            ).decode('utf-8').strip()
        except Exception:
            logger.warning(
                '[otcdocstheme] cannot get gitsha from git repository'
            )
            _html_context_data['gitsha'] = 'unknown'
        try:
            gitbranch = subprocess.check_output(
                ['git', 'branch', '--show-current'],
            ).decode('utf-8').strip()
        except Exception:
            gitbranch = 'main'
            logger.warning(
                '[otcdocstheme] cannot get branch name from git repository. '
                f'Using {gitbranch}'
            )
        doc_path = _get_doc_path(app)
        repo_name = app.config.otcdocs_repo_name
        git_fqdn = app.config.otcdocs_git_fqdn
        edit_enabled = app.config.otcdocs_edit_enabled
        bug_report_enabled = app.config.otcdocs_bug_report_enabled
        doc_link = app.config.otcdocs_doc_link
        doc_title = app.config.otcdocs_doc_title
        doc_type = app.config.otcdocs_doc_type
        service_title = app.config.otcdocs_service_title
        service_type = app.config.otcdocs_service_type
        service_category = app.config.otcdocs_service_category
        otcdocs_search_environment = app.config.otcdocs_search_environment
        otcdocs_search_index = app.config.otcdocs_search_index
        otcdocs_search_url = app.config.otcdocs_search_url
        otcdocs_cloud_environment = app.config.otcdocs_cloud_environment
        otcdocs_service_environment = app.config.otcdocs_service_environment
        otcdocs_environment = app.config.otcdocs_doc_environment
        current_commit_hash = app.config.current_commit_hash
        current_commit_time = app.config.current_commit_time
        otcdocs_analytics_app = app.config.otcdocs_analytics_app
        _html_context_data['repository_name'] = repo_name
        _html_context_data['otcdocs_doc_environment'] = (
            app.config.otcdocs_doc_environment
        )
        _html_context_data['doc_link'] = doc_link
        _html_context_data['doc_title'] = doc_title
        _html_context_data['doc_type'] = doc_type
        _html_context_data['service_title'] = service_title
        _html_context_data['service_type'] = service_type
        _html_context_data['service_category'] = service_category
        _html_context_data['otcdocs_search_environment'] = (
            otcdocs_search_environment
        )
        _html_context_data['otcdoc_search_index'] = (
            otcdocs_search_index
        )
        _html_context_data['otcdocs_search_url'] = (
            otcdocs_search_url
        )
        _html_context_data['otcdocs_cloud_environment'] = (
            otcdocs_cloud_environment
        )
        _html_context_data['otcdocs_service_environment'] = (
            otcdocs_service_environment
        )
        _html_context_data['current_commit_hash'] = (
            current_commit_hash
        )
        _html_context_data['current_commit_time'] = (
            current_commit_time
        )
        _html_context_data['otcdocs_analytics_app'] = (
            otcdocs_analytics_app
        )

        # Header automation
        if otcdocs_environment == "internal":
            otcdocs_environment = ["public", "internal"]
        else:
            otcdocs_environment = ["public"]
        otcdocs_categories_with_services = (
            METADATA.all_services_by_categories(
                cloud_environment=otcdocs_cloud_environment,
                environments=otcdocs_environment
            )
        )
        otcdocs_large_categories = [
            {
                "name": "IaaS",
                "categories": [
                     {
                         "name": "compute",
                         "services": []
                     },
                     {
                         "name": "network",
                         "services": []
                     },
                     {
                         "name": "storage",
                         "services": []
                     }
                ]
            },
            {
                "name": "PaaS",
                "categories": [
                     {
                         "name": "application",
                         "services": []
                     },
                     {
                         "name": "big_data",
                         "services": []
                     },
                     {
                         "name": "container",
                         "services": []
                     },
                     {
                         "name": "database",
                         "services": []
                     }
                ]
            },
            {
                "name": "Management",
                "categories": [
                     {
                         "name": "md",
                         "services": []
                     }
                ]
            },
            {
                "name": "Security",
                "categories": [
                     {
                         "name": "security-services",
                         "services": []
                     }
                ]
            },
            {
                "name": "Other",
                "categories": [
                     {
                         "name": "other",
                         "services": []
                     }
                ]
            }
        ]
        for category in otcdocs_categories_with_services:
            for i, custom_category in enumerate(otcdocs_large_categories):
                for j, subcategory in enumerate(custom_category["categories"]):
                    if category["name"] == subcategory["name"]:
                        otcdocs_large_categories[i]["categories"][j]["services"] = category["services"]
                        otcdocs_large_categories[i]["categories"][j]["title"] = category["title"]

        _html_context_data['otcdocs_large_categories'] = (
            otcdocs_large_categories
        )

        logger.debug('[otcdocstheme] repository_name %r', repo_name)
        if repo_name and doc_path and git_fqdn:
            _source_url = app.config.otcdocs_source_url
            _edit_url = app.config.otcdocs_edit_url
            _bug_report_url = app.config.otcdocs_bug_report_url
            if app.config.otcdocs_git_type:
                git_type = app.config.otcdocs_git_type
                if not _source_url:
                    _source_url = _giturl_source[git_type]
                if not _edit_url:
                    _edit_url = _giturl_edit[git_type]
                if not _bug_report_url:
                    _bug_report_url = _giturl_bug_report[git_type]

            _html_context_data['url_source'] = _source_url.format(
                git_fqdn=git_fqdn, repo_name=repo_name,
                branch_name=gitbranch, doc_path=doc_path)
            _html_context_data['url_edit'] = _edit_url.format(
                git_fqdn=git_fqdn, repo_name=repo_name,
                branch_name=gitbranch, doc_path=doc_path)
            _html_context_data['url_bug_report'] = _bug_report_url.format(
                git_fqdn=git_fqdn, repo_name=repo_name)

            _html_context_data['edit_enabled'] = edit_enabled
            _html_context_data['bug_report_enabled'] = bug_report_enabled
            logger.debug(
                '[otcdocstheme] giturl %r', _html_context_data['url_source'],
            )

        _html_context_data['pdf_link'] = app.config.otcdocs_pdf_link
        logger.debug(
            '[otcdocstheme] pdf_link %r', _html_context_data['pdf_link'],
        )

        if app.config.otcdocs_pdf_filename:
            _html_context_data['pdf_filename'] = (
                app.config.otcdocs_pdf_filename)
        else:
            short_repo_name = repo_name.split('/')[-1]
            _html_context_data['pdf_filename'] = f'doc-{short_repo_name}.pdf'

        if _html_context_data['pdf_link']:
            logger.debug(
                '[otcdocstheme] pdf_filename %r',
                _html_context_data['pdf_filename'],
            )

        _html_context_data['series'] = _get_series_name()
        logger.debug(
            '[otcdocstheme] series %r', _html_context_data['series'],
        )

        # Do not show the badge in these cases:
        # - display_badge is false
        # - repo has no stable/ branches
        # - directory is named api-guide, api-ref, or releasenotes
        if not app.config.html_theme_options.get('display_badge', True):
            _html_context_data['display_badge'] = False
            logger.debug(
                '[otcdocstheme] display_badge False (configured by user)'
            )
        elif _has_stable_branches():
            doc_parts = os.path.abspath(app.srcdir).split(os.sep)[-2:]
            if doc_parts[0] in ('api-guide', 'api-ref', 'releasenotes'):
                _html_context_data['display_badge'] = False
                logger.debug(
                    '[otcdocstheme] display_badge False (doc name '
                    'contains %r)',
                    doc_parts[0],
                )
            else:
                _html_context_data['display_badge'] = True
                logger.debug(
                    '[otcdocstheme] display_badge True (stable branches)'
                )
        else:
            _html_context_data['display_badge'] = False
            logger.debug(
                '[otcdocstheme] display_badge False (no stable branches)'
            )

    context.update(_html_context_data)
    context['other_versions'] = _get_other_versions(app)
    logger.debug(
        '[otcdocstheme] other_versions %s', context['other_versions'],
    )


def _get_series_name():
    "Return string name of release series, or 'latest'"
    global _series
    if _series is None:
        try:
            git_root_dir = subprocess.check_output(
                ['git', 'rev-parse', '--show-toplevel'],
            ).decode('utf-8').strip()
        except Exception:
            logger.info(
                '[otcdocstheme] cannot find git top directory, '
                'assuming "."'
            )
            git_root_dir = '.'

        parser = configparser.ConfigParser()
        in_file = os.path.join(git_root_dir, '.gitreview')
        parsed = parser.read(in_file)
        if not parsed:
            logger.info('[otcdocstheme] no %s found', in_file)

        try:
            branch = parser.get('gerrit', 'defaultbranch')
        except configparser.Error:
            _series = 'latest'
        else:
            _series = branch.rpartition('/')[-1]

    return _series


def _setup_link_roles(app):
    series = _get_series_name()
    for project_name in app.config.otcdocs_projects:
        url = 'https://docs.otc-service.com/{}/{}/%s'.format(
            project_name, series)
        role_name = '{}-doc'.format(project_name)
        logger.debug(
            '[otcdocstheme] adding role %s to link to %s',
            role_name,
            url,
        )

        if sphinx.version_info >= (4, 0, 0):
            role = extlinks.make_link_role(project_name, url, project_name)
        else:
            role = extlinks.make_link_role(url, project_name)

        app.add_role(role_name, role)


def _find_setup_cfg(srcdir):
    """Find the 'setup.cfg' file, if it exists.

    This assumes we're using 'doc/source' for documentation, but also allows
    for single level 'doc' paths.
    """
    # TODO(stephenfin): Are we sure that this will always exist, e.g. for
    # an sdist or wheel? Perhaps we should check for 'PKG-INFO' or
    # 'METADATA' files, a la 'pbr.packaging._get_version_from_pkg_metadata'
    for path in [
            os.path.join(srcdir, os.pardir, 'setup.cfg'),
            os.path.join(srcdir, os.pardir, os.pardir, 'setup.cfg')]:
        if os.path.exists(path):
            return path

    return None


def _get_project_name(srcdir):
    """Return string name of project name, or None.

    This assumes every project is using 'pbr' and, therefore, the metadata can
    be extracted from 'setup.cfg'.

    We don't rely on distutils/setuptools as we don't want to actually install
    the package simply to build docs.
    """
    global _project
    if _project is None:
        parser = configparser.ConfigParser()

        path = _find_setup_cfg(srcdir)
        if not path or not parser.read(path):
            logger.info(
                '[otcdocstheme] could not find a setup.cfg to extract '
                'project name from'
            )
            return None

        try:
            # for project name we use the name in setup.cfg, but if the
            # length is longer then 32 we use summary. Otherwise the
            # menu rendering looks broken
            project = parser.get('metadata', 'name')
            if len(project.split()) == 1 and len(project) > 32:
                project = parser.get('metadata', 'summary')
        except configparser.Error:
            logger.info(
                '[otcdocstheme] could not extract project metadata from '
                'setup.cfg'
            )
            return None
        _project = project
    return _project


def _config_inited(app, config):

    # we only override configuration if the theme has been configured, meaning
    # users are using these features
    if config.html_theme not in ['otcdocs']:
        return

    if config.otcdocs_auto_name:
        project_name = _get_project_name(app.srcdir)

        if config.project and project_name:
            logger.info(
                "[otcdocstheme] "
                "overriding configured project name (%s) with name extracted "
                "from the package (%s); you can disable this behavior with "
                "the 'otcdocs_auto_name' option",
                config.project, project_name,
            )

        if project_name:
            config.project = project_name

    config.html_last_updated_fmt = '%Y-%m-%d %H:%M'

    if config.otcdocs_auto_version is False:
        logger.debug(
            '[otcdocstheme] auto-versioning disabled (configured by '
            'user)'
        )
        auto_version = False
    elif config.otcdocs_auto_version is True:
        logger.debug(
            '[otcdocstheme] auto-versioning enabled (configured by user)'
        )
        auto_version = True
    else:  # None
        doc_parts = os.path.abspath(app.srcdir).split(os.sep)[-2:]
        if doc_parts[0] in ('api-guide', 'api-ref', 'releasenotes'):
            logger.debug(
                f'[otcdocstheme] auto-versioning disabled (doc name '
                f'contains {doc_parts[0]}'
            )
            auto_version = False
        else:
            logger.debug(
                '[otcdocstheme] auto-versioning enabled (default)'
            )
            auto_version = True

    if auto_version:
        real_project_name = _get_project_name(app.srcdir)
        try:
            project_version = packaging.get_version(real_project_name)
        except Exception:
            project_version = ''

        if not project_version:
            logger.warning(
                '[otcdocstheme] could not extract version from '
                'project; defaulting to unversioned'
            )

        config.version = project_version
        config.release = project_version


def _builder_inited(app):

    theme_dir = paths.get_html_theme_path()
    logger.info('[otcdocstheme] using theme from %s', theme_dir)

    _setup_link_roles(app)

    # we only override configuration if the theme has been configured, meaning
    # users are using these features
    if app.config.html_theme not in ['otcdocs']:
        return

    # Override default setting
    app.config.latex_engine = 'xelatex'

    theme_logo = paths.get_theme_logo_path(app.config.html_theme)
    pdf_theme_path = paths.get_pdf_theme_path(app.config.html_theme)
    latex_elements = {}

    if app.config.latex_elements:
        latex_elements.update(app.config.latex_elements)

    preamble = textwrap.dedent(
        r"""
        \input{%s.sty}
        \newcommand{\otclogo}{%s}
        """
    ) % (pdf_theme_path, theme_logo)

    if 'preamble' in latex_elements:
        preamble += latex_elements['preamble']

    latex_elements['preamble'] = preamble

    u1_path = paths.get_pdf_blobs_u1_path(app.config.html_theme)
    u4_path = paths.get_pdf_blobs_u4_path(app.config.html_theme)
    latex_additional_files = [
        f'{pdf_theme_path}.sty', u1_path, u4_path
    ]

    fonts_path = paths.get_theme_fonts_path(app.config.html_theme)

    for file in glob.glob(fonts_path + "/*.ttf"):
        latex_additional_files.append(file)

    app.config.latex_elements = latex_elements
    app.config.latex_additional_files = latex_additional_files

    # This hook is invoked when latex builder is already initialized. We loose
    # preamble if we only set it to the config
    if hasattr(app.builder, 'context') and 'preamble' in app.builder.context:
        app.builder.context['preamble'] = preamble


class OTCHTML5Translator(HTML5Translator):
    def visit_table(self, node: Element) -> None:
        # Wrap table into the table-responsive class
        self.body.append("<div class='table-responsive'>")
        super().visit_table(node)

    def depart_table(self, node) -> None:
        super().depart_table(node)
        self.body.append("</div>")


def setup(app):
    logger.info(
        '[otcdocstheme] version: %s',
        version.version_info.version_string(),
    )
    logger.debug('[otcdocstheme] connecting events')

    # extensions
    app.connect('config-inited', _config_inited)
    app.connect('builder-inited', _builder_inited)
    app.connect('html-page-context', _html_page_context)

    # config options
    app.add_config_value('otcdocs_git_fqdn', 'github.com', 'env')
    app.add_config_value('otcdocs_git_type', 'github', 'env')
    app.add_config_value('otcdocs_source_url', None, 'env')
    app.add_config_value('otcdocs_edit_enabled', True, 'env')
    app.add_config_value('otcdocs_edit_url', None, 'env')
    app.add_config_value('otcdocs_bug_report_enabled', True, 'env')
    app.add_config_value('otcdocs_bug_report_url', None, 'env')
    app.add_config_value('otcdocs_projects', [], 'env')
    app.add_config_value('otcdocs_auto_version', None, 'env')
    app.add_config_value('otcdocs_auto_name', True, 'env')
    app.add_config_value('otcdocs_pdf_link', False, 'env')
    app.add_config_value('otcdocs_pdf_filename', None, 'env')

    # metadata options
    app.add_config_value('otcdocs_repo_name', '', 'env')
    app.add_config_value('otcdocs_doc_environment', '', 'env')
    app.add_config_value('otcdocs_doc_link', '', 'env')
    app.add_config_value('otcdocs_doc_title', '', 'env')
    app.add_config_value('otcdocs_doc_type', '', 'env')
    app.add_config_value('otcdocs_service_title', '', 'env')
    app.add_config_value('otcdocs_service_type', '', 'env')
    app.add_config_value('otcdocs_service_category', '', 'env')
    app.add_config_value('otcdocs_service_environment', '', 'env')

    # search options
    app.add_config_value('otcdocs_search_environment', 'hc_de', 'env')
    app.add_config_value('otcdocs_search_index', 'search_index_de', 'env')
    app.add_config_value('otcdocs_search_url',
                         'https://opensearch.eco.tsi-dev.otc-service.com/',
                         'env')
    # Analytics options
    app.add_config_value('otcdocs_analytics_app', '', 'env')

    # autogenerated git values
    app.add_config_value('current_commit_hash', '', 'env')
    app.add_config_value('current_commit_time', '', 'env')

    # Header automation
    app.add_config_value('otcdocs_cloud_environment', 'eu_de', 'env')

    app.set_translator('html', OTCHTML5Translator)

    # themes
    app.add_html_theme(
        'otcdocs',
        os.path.abspath(os.path.dirname(__file__)) + '/theme/otcdocs',
    )

    return {
        'parallel_read_safe': True,
        'parallel_write_safe': True,
        'version': version.version_info.version_string(),
    }
