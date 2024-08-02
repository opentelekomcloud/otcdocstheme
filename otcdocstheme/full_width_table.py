from docutils import nodes
from docutils.parsers.rst import Directive
from sphinx.util.docutils import SphinxDirective

class table(nodes.General, nodes.Element):
    pass

class FullWidthTableDirective(SphinxDirective):
    has_content = True
    option_spec = {}

    def run(self):
        table_node = table()
        self.state.nested_parse(self.content, self.content_offset, table_node)
        return [table_node]

def visit_full_width_table_node_html(self, node):
    self.body.append(self.starttag(node, 'div', CLASS='full-width-table'))

def depart_full_width_table_node_html(self, node):
    self.body.append('</div>')

def visit_full_width_table_node_latex(self, node):
    # Define a valid column format for LaTeX
    self.body.append('\\begin{longtable}{|p{\\dimexpr\\textwidth-2\\tabcolsep}|}\n')
    self.body.append('\\hline\n')
    self.body.append('Table header \\\\ \\hline\n')
    self.body.append('\\endfirsthead\n')
    self.body.append('\\hline\n')
    self.body.append('Table header \\\\ \\hline\n')
    self.body.append('\\endhead\n')
    self.body.append('\\hline\n')
    self.body.append('\\endfoot\n')
    self.body.append('\\hline\n')
    self.body.append('\\endlastfoot\n')

def depart_full_width_table_node_latex(self, node):
    self.body.append('\\hline\n')
    self.body.append('\\end{longtable}\n')


def setup(app):
    app.add_node(table,
                 html=(visit_full_width_table_node_html, depart_full_width_table_node_html),
                 latex=(visit_full_width_table_node_latex, depart_full_width_table_node_latex))
    app.add_directive('table', FullWidthTableDirective)
