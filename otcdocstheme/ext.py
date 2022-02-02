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
                ['git', 'symbolic-ref', '--short', 'HEAD'],
            ).decode('utf-8').strip('')
        except Exception:
            gitbranch = 'main'
            logger.warning(
                '[otcdocstheme] cannot get branch name from git repository. '
                f'Using {gitbranch}'
            )

        doc_path = _get_doc_path(app)
        repo_name = app.config.otcdocs_repo_name
        _html_context_data['repository_name'] = repo_name
        logger.debug('[otcdocstheme] repository_name %r', repo_name)
        if repo_name and doc_path:
            _html_context_data['giturl'] = _giturl.format(
                repo_name, gitbranch, doc_path)
            _html_context_data['giturl_edit'] = _giturl_edit.format(
                repo_name, gitbranch, doc_path)
            logger.debug(
                '[otcdocstheme] giturl %r', _html_context_data['giturl'],
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
    latex_elements = {
        'papersize': 'a4paper',
        'pointsize': '11pt',
        'figure_align': 'H',
        'classoptions': ',openany',
    }

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

    app.config.latex_elements = latex_elements
    app.config.latex_additional_files = [f'{pdf_theme_path}.sty']

    # This hook is invoked when latex builder is already initialized. We loose
    # preamble if we only set it to the config
    if hasattr(app.builder, 'context') and 'preamble' in app.builder.context:
        app.builder.context['preamble'] = preamble


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
    app.add_config_value('otcdocs_repo_name', '', 'env')
    app.add_config_value('otcdocs_projects', [], 'env')
    app.add_config_value('otcdocs_auto_version', None, 'env')
    app.add_config_value('otcdocs_auto_name', True, 'env')
    app.add_config_value('otcdocs_pdf_link', False, 'env')
    app.add_config_value('otcdocs_pdf_filename', None, 'env')

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
