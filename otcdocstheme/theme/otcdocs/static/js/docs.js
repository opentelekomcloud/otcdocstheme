/*
 * otcdocstheme provides three types of admonitions, important, note
 * and warning. We decorate their title paragraphs with Font Awesome icons
 * by adding the appropriate FA classes.
 *
 * We also insert a space between the icon and the admonition title
 * ("Note", "Warning", "Important" or their i18n equivalents). This could be
 * done with a single clause - $('p.admonition-title').... - affecting all
 * types of admonitions. I play it safe here and explicitly work on the three
 * otcdocstheme admonitions.
 */
$('div.important > p.admonition-title').prepend('<div class="fa-solid fa-circle-exclamation">&nbsp;</div>');
$('div.note > p.admonition-title').prepend('<div class="fa-solid fa-book">&nbsp;</div>');
$('div.seealso > p.admonition-title').prepend('<div class="fa-solid fa-info-circle">&nbsp;</div>');
$('div.tip > p.admonition-title').prepend('<div class="fa-solid fa-info-circle">&nbsp;</div>');
$('div.warning > p.admonition-title').prepend('<div class="fa-solid fa-exclamation-triangle">&nbsp;</div>');
$('div.caution > p.admonition-title').prepend('<div class="fa-solid fa-exclamation-triangle">&nbsp;</div>');
$('div.versionadded > p').prepend('<div class="fa-solid fa-plus-circle">&nbsp;</div>');
$('div.versionchanged > p').prepend('<div class="fa-solid fa-info-circle">&nbsp;</div>');
$('div.deprecated > p').prepend('<div class="fa-solid fa-minus-circle">&nbsp;</div>');

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
//    document.getElementById("logABugLink1").href = bugLink;
//    document.getElementById("logABugLink2").href = bugLink;
//    document.getElementById("logABugLink3").href = bugLink;
}

function pdfLink(currentSourceFile, pdfFileName) {
    /* Create link to PDF file which is in top-level of document.  */

    /* We know the local path of the html page, so substitute that in
       the URL with the path to the PDF file. */
    /* We do not want any #subanchors, so do not use window.location.href. */
    var currentLink = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
    if (currentLink.endsWith("/")) {
        currentLink = currentLink + "index.html";
    }
    var file = currentSourceFile + ".html";
    var pdfLink = currentLink.replace(file, pdfFileName);
    document.getElementById("pdfLink1").href = pdfLink;
    //document.getElementById("pdfLink2").href = pdfLink;
}


// Add magenta color to headlines of right sidebar to show document position while scrolling
// Adding a scroll event listener to detect when page is beeing scrolled
window.addEventListener("scroll", () => {

    // Get right sidebar and check for existance
    let sidebar = document.getElementById("TableOfContents")
    if (sidebar !== null) {
        // Get all a elements except the one without a link of the right sidebar and iterate through them
        let all_a = sidebar.querySelectorAll("a:not([href='#'])")

        for (let j = 0; j < all_a.length; j++) {
            // Get the target headline element from the href from the all_a elements minus the # symbol
            let elementTarget = document.getElementById(all_a[j].getAttribute("href").slice(1));
            // If you scrolled past a headline...
            if (window.scrollY >= elementTarget.offsetTop) {

                // get the a element on the right sidebar with the headline and all the others
                let a = document.getElementById("TableOfContents").querySelector(`a[href='${all_a[j].getAttribute("href")}']`)
                let not_a = document.getElementById("TableOfContents").querySelectorAll(`a:not([href='${all_a[j].getAttribute("href")}'])`)

                // make the single a element magenta and all others back to grey
                a.classList.add("color-magenta")
                for (let i = 0; i < not_a.length; i++) {
                    not_a[i].classList.remove("color-magenta")
                }
            }
        }
    }
});

// Make external links open in new Tab
// There's currently no solution to do this by CSS
var all_a = document.getElementsByClassName("external")
for (var j = 0; j < all_a.length; j++) {
    all_a[j].setAttribute("target","_blank")
    all_a[j].setAttribute("rel","external noopener noreferrer")
}
