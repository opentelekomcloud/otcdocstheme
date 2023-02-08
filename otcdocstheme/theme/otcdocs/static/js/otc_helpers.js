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

// ADD BOX SHADOW

function addBoxShadow(event) {
  document.getElementById('searchInputGroup').classList.add("add-box-shadow");
}

// REMOVE BOX SHADOW

function removeBoxShadow(event) {
  document.getElementById('searchInputGroup').classList.remove("add-box-shadow");
}

// MAIN: Add copy buttons to code after DOM has been loaded
$(function () {
  addCopyButtonToCode();
});
