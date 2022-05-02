// Scroll-to-top implementation
scroll_top = document.getElementById("scroll-to-top");

window.onscroll = function() {
  scrollFunction()
  let footer = document.getElementById('footer');
  let scroll_height = $(window).scrollTop()
  let footer_offset = $('#footer').offset().top
  let window_height = window.innerHeight
  if ((scroll_height + window_height) > footer_offset){
    scroll_top.classList.remove('to-top-fixed');
    scroll_top.classList.add('to-top-bottom');
  }
  else {
    scroll_top.classList.add('to-top-fixed');
    scroll_top.classList.remove('to-top-bottom');
  }
  


};

function scrollFunction() {
  // Scroll after 20px from top
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scroll_top.style.display = "block";
  } else {
    scroll_top.style.display = "none";
  }
}

// Click on scroll-to-top button: scroll up
function to_top() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}