// Toggle main sections
$(".docs-sidebar-section-title").click(function () {
    $('.docs-sidebar-section').not(this).closest('.docs-sidebar-section').removeClass('active');
    $(this).closest('.docs-sidebar-section').toggleClass('active');
});

// Change the sidebar
changeSidebar()

// Bootstrap stuff
$('.docs-actions i').tooltip();
$('.docs-sidebar-home').tooltip();

// webui popover
$(document).ready(function() {
    function checkWidth() {
        var windowSize = $(window).width();

        if (windowSize <= 767) {
            $('.gloss').webuiPopover({placement:'auto',trigger:'click'});
        }
        else if (windowSize >= 768) {
            $('.gloss').webuiPopover({placement:'auto',trigger:'hover'});
        }
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});

/* BB 150310
 *
 * openstackdocstheme provides three types of admonitions, important, note
 * and warning. We decorate their title paragraphs with Font Awesome icons
 * by adding the appropriate FA classes.
 *
 * We also insert a space between the icon and the admonition title
 * ("Note", "Warning", "Important" or their i18n equivalents). This could be
 * done with a single clause - $('p.admonition-title').... - affecting all
 * types of admonitions. I play it safe here and explicitly work on the three
 * openstackdocstheme admonitions.
 */
$('div.important > p.admonition-title').prepend('<div class="fa fa-fw fa-check-circle">&nbsp;</div>');
$('div.note > p.admonition-title').prepend('<div class="fa fa-fw fa-check-circle">&nbsp;</div>');
$('div.seealso > p.admonition-title').prepend('<div class="fa fa-fw fa-info-circle">&nbsp;</div>');
$('div.warning > p.admonition-title').prepend('<div class="fa fa-fw fa-exclamation-triangle">&nbsp;</div>');
$('div.versionadded > p').prepend('<div class="fa fa-fw fa-plus-circle">&nbsp;</div>');
$('div.versionchanged > p').prepend('<div class="fa fa-fw fa-info-circle">&nbsp;</div>');
$('div.deprecated > p').prepend('<div class="fa fa-fw fa-minus-circle">&nbsp;</div>');

function logABug(bugTitle, bugProject, fieldComment, fieldTags, repositoryName) {
    /* Gives the log a bug icon the information it needs to generate the bug in
     * Launchpad with pre-filled information such as git SHA, opendev.org
     * source URL, published document URL and tag.
     */
    var lineFeed = "%0A";

    var bugChecklist = "This bug tracker is for errors with the documentation, " +
        "use the following as a template and remove or add fields as " +
        "you see fit. Convert [ ] into [x] to check boxes:" + lineFeed + lineFeed +
        "- [ ] This doc is inaccurate in this way: ______" + lineFeed +
        "- [ ] This is a doc addition request." + lineFeed +
        "- [ ] I have a fix to the document that I can paste below including example: " +
        "input and output. " + lineFeed + lineFeed;

    var urlBase = "https://github.com/" + bugProject + "/issues/new?title=";
    var currentURL = "URL: " + window.location.href;
    var bugLink = "";
    bugLink = urlBase  + encodeURIComponent(bugTitle) +
    "&body=" + lineFeed + lineFeed +  lineFeed +
    bugChecklist + lineFeed + "-----------------------------------" + lineFeed + fieldComment +
    lineFeed + currentURL;
    document.getElementById("logABugLink1").href = bugLink;
    document.getElementById("logABugLink2").href = bugLink;
    document.getElementById("logABugLink3").href = bugLink;
}

function pdfLink(currentSourceFile, pdfFileName) {
    /* Create link to PDF file which is in top-level of document.  */

    /* We know the local path of the html page, so substitute that in
       the URL with the path to the PDF file. */
    /* We do not want any #subanchors, so do not use window.location.href. */
    var currentLink = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname;
    if (currentLink.endsWith("/")) {
        currentLink = currentLink + "index.html";
    }
    var file = currentSourceFile + ".html";
    var pdfLink = currentLink.replace(file, pdfFileName);
    document.getElementById("pdfLink1").href = pdfLink;
    document.getElementById("pdfLink2").href = pdfLink;
}

function changeSidebar() {
    var toctree2 = document.querySelectorAll('div.docs-sidebar-section > ul > li.toctree-l1 > ul > li.toctree-l2')
    toctree2.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav-item')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
        newElement.setAttribute("nesting-level", "2")
    });

    var toctree1Ul = document.querySelectorAll('div.docs-sidebar-section > ul > li.toctree-l1 > ul')
    toctree1Ul.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
    });

    var toctree1 = document.querySelectorAll('div.docs-sidebar-section > ul > li.toctree-l1.current')
    toctree1.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav-collapsible')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
        var label = newElement.firstChild
        newElement.setAttribute("label", label.innerHTML)
        label.remove()
    });

    const deepSectionLength = document.querySelectorAll('div.docs-sidebar-section > ul > li > ul > li > ul > li').length

    var sectionsPage = document.querySelectorAll('div.docs-sidebar-section > ul > li > ul > li > ul > li')
    sectionsPage.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav-item')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
        if (deepSectionLength != 0) {
            newElement.setAttribute("nesting-level", "2")
        }
    });

    var sectionsPageUl = document.querySelectorAll('div.docs-sidebar-section > ul > li > ul > li > ul')
    sectionsPageUl.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
    });

    var sectionsPage = document.querySelectorAll('div.docs-sidebar-section > ul > li > ul > li')
    sectionsPage.forEach(element => {
        if (deepSectionLength === 0) {
            var newElement = document.createElement('scale-sidebar-nav-item')
            newElement.innerHTML = element.innerHTML
            element.parentNode.replaceChild(newElement, element)
        }
        else {
            var newElement = document.createElement('scale-sidebar-nav-collapsible')
            newElement.innerHTML = element.innerHTML
            element.parentNode.replaceChild(newElement, element)
            var label = newElement.firstChild
            newElement.setAttribute("label", label.innerHTML)
            label.remove()
        }
    });

    var sectionsPageUl = document.querySelectorAll('div.docs-sidebar-section > ul > li > ul')
    sectionsPageUl.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
    });

    var sections = document.querySelectorAll('div.docs-sidebar-section > ul > li')
    sections.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav-item')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
    });

    var oldUl = document.querySelectorAll('div.docs-sidebar-section > ul')
    oldUl.forEach(element => {
        var newElement = document.createElement('scale-sidebar-nav')
        newElement.innerHTML = element.innerHTML
        element.parentNode.replaceChild(newElement, element)
    })

    var docsSidebarSection = document.querySelectorAll('div.docs-sidebar-toc > div.docs-sidebar-section')
    docsSidebarSection.forEach(element => {
        element.classList.remove('docs-sidebar-section')
    });

    var docsSidebarToc = document.querySelectorAll('div.docs-sidebar-toc')
    docsSidebarToc.forEach(element => {
        element.classList.remove('docs-sidebar-toc')
    });
}