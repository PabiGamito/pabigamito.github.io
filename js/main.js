// Fun message
console.log("Hello fellow developer,\n" +
  "\nI see you are interesting in the source code of my personal website.\n" +
  "If you have a job for me don't hesitate to contact me!\n" +
  "\nWant to see more of my cool code? Check me out on GitHub: github.com/pabigamito\n"+
  "Enjoy the code :)"
);

$(document).ready(function(){
  $(".preloader").removeClass("loading");
  // Checks for last tile to finish animating (last animated tile is the first child)
  $(".preloader span:first-child").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
    $(".preloader-wrapper").addClass("loaded");
  });
});

// // On reload load page from top
$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

// Smooth Scroll to Anchor
$(document).on('click', 'nav a', function(event){
  event.preventDefault();
  // Add class active for mousewheel scrolling
  $( $.attr(this, 'href') ).addClass('active');
  $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 500);
});

// Learn more smooth scroll down
$(".learn-more").on("click", function(){
  mouseWheelScroll(-1);
});

// TYPE-WRITER TEXT ANIMATION //
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 150 - Math.random() * 50;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

// SCROLL TO NEXT SECTION ON MOUSE WHEEL //
// TODO: Only make this run on desktop not on mobile
//Set each section's height equals to the window height
// $('section').height($(window).height());
/*set the class 'active' to the first element
 this will serve as our indicator*/
$('section').first().addClass('active');
// defines scrolling variable to false, when true doesn't do anything on mouse wheel to prevent overload
var scrolling = false;

/* handle the mousewheel event together with
 DOMMouseScroll to work on cross browser */
var lastScrollEventTS = 0;
$(document).on('mousewheel DOMMouseScroll', function (e) {
  e.preventDefault(); //prevent the default mousewheel scrolling
  
  // Check to see it isn't a scroll directly after the last one = continous scrolling mouse or mouse pad = accidental down scrolling
  if (Date.now() - 100 < lastScrollEventTS) {
    //get the delta to determine the mousewheel scrol UP and DOWN
    var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
    mouseWheelScroll(delta);
  }
  
  lastScrollEventTS = Date.now();
  
});

function mouseWheelScroll(delta) {
  if (!scrolling) {
    scrolling = true;
    var active = $('section.active');

    //if the delta value is negative, the user is scrolling down
    if (delta < 0) {
      mouseWheelScrollDownHandler(active);
    } else {
      mouseWheelScrollUpHandler(active);
    }
  }
}

function mouseWheelScrollDownHandler(active) {
  //mousewheel down handler
  next = active.next();
  //check if the next section exist and animate the anchoring
  if (next.length) {
    /* animate the scrollTop by passing
    the elements offset top value */
    $('body, html').animate({
      scrollTop: next.offset().top
    }, 500, function(){
      // Animation complete
      scrolling = false;
    });

    // move the indicator 'active' class
    next.addClass('active')
      .siblings().removeClass('active');
  } else {
    scrolling = false;
  }
}

function mouseWheelScrollUpHandler(active) {
  //mousewheel up handler
  /*similar logic to the mousewheel down handler
  except that we are animate the anchoring
  to the previous sibling element*/
  prev = active.prev();

  if (prev.length) {
    $('body, html').animate({
      scrollTop: prev.offset().top
    }, 500, function(){
      // Animation complete
      scrolling = false;
    });

    prev.addClass('active')
        .siblings().removeClass('active');
  } else {
    scrolling = false;
  }
}
