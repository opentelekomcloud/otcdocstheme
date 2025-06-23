// Display to_top-btn after scrolling 20px from top
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scroll_top.style.display = "block";
  } else {
    scroll_top.style.display = "none";
  }
}

// Scroll up after clicking to_top-btn
function to_top() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}


// Scroll-to-top implementation
scroll_top = document.getElementById("scroll-to-top");

window.onscroll = function () {
  scrollFunction()
  let footer = document.getElementById('footer');
  let scroll_height = $(window).scrollTop()
  let footer_offset = $('#footer').offset().top
  let window_height = window.innerHeight
  if ((scroll_height + window_height) > footer_offset) {
    scroll_top.classList.remove('to-top-fixed');
    scroll_top.classList.add('to-top-bottom');
  }
  else {
    scroll_top.classList.add('to-top-fixed');
    scroll_top.classList.remove('to-top-bottom');
  }

};

// COPY TO CLIPBOARD

// add copy button to code
function addCopyButtonToCode() {
  var allCodeBlocksElements = $("div.highlight pre");

  // For each code black element, do ...
  allCodeBlocksElements.each(function (ii) {
    // define a unique id for codeblock element
    var currentId = "codeblock" + (ii + 1);
    // Add id to codeblock
    $(this).attr('id', currentId);

    // Add button for clipboard copy and use the ID
    var clipButton = '<button class="btn copybtn" data-clipboard-target="#' + currentId + '"><i class="fa-solid fa-copy" title="Copy to Clipboard"></i></button>';
    $(this).after(clipButton);
  });

  // instantiate clipboardjs with class .btn
  new ClipboardJS('.btn');
}

// MAIN: Add copy buttons to code after DOM has been loaded
$(function () {
  addCopyButtonToCode();
});


document.addEventListener("DOMContentLoaded", function () {

  // Tracking code for PDF downloads
  const buttons = document.querySelectorAll('[data-umami-event="PDF Download"]');

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const pdfName = button.getAttribute("data-umami-event-pdfname");

      // Check whether umami has been loaded, else just don't do anything
      if (typeof umami === "object" && typeof umami.track === "function") {
        umami.track("PDF Download", {
          pdfname: pdfName
        });
      }
    });
  });

  // Tracking code for Search function
  const searchbuttons = document.querySelectorAll('[data-umami-event="Search opened"]');

  searchbuttons.forEach(button => {
    button.addEventListener("click", () => {
      const searchsite = window.location.pathname;

      // Check whether umami has been loaded, else just don't do anything
      if (typeof umami === "object" && typeof umami.track === "function") {
        umami.track("Search opened", {
          searchsite: searchsite
        });
      }
    });
  });

  // Tracking code for Search function when clicking on a result
  const searchresultbuttons = document.querySelectorAll('[data-umami-event="Searchresult clicked"]');

  searchresultbuttons.forEach(button => {
    button.addEventListener("click", () => {
      const searchresultpage = button.getAttribute("data-umami-event-resultpage");

      // Check whether umami has been loaded, else just don't do anything
      if (typeof umami === "object" && typeof umami.track === "function") {
        umami.track("Searchresult clicked", {
          searchresultpage: searchresultpage
        });
      }
    });
  });
});
