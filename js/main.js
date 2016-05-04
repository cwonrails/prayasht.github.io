$(document).ready(function() {
  $("#toggle").click(function() {
    $("nav").toggleClass("visible");
    $("nav").toggleClass("transition-dismiss");
    $(".logo").toggleClass("hide");
    $("#container").toggleClass("scroll");
    $("#toggle").toggleClass("active");
    $("#footer").toggleClass("hide");
    $("body").toggleClass("transition-dismiss");
    $("body, html").toggleClass("overflow");
    if (navigator.userAgent.match('CriOS')) {
      $("html").toggleClass("fixed");
    }
  });

  $("#additional").click(function() {
    $(".additional").toggleClass("visible");
  });

  $("#toggle-text").click(function() {
    $("section.more").toggleClass("visible");
    $("article.studio header").toggleClass("margin");
  });

  $(".site-title").mouseover(function() {
    $("nav li").toggleClass("rollout");
  });
});

var $document = $(document);
$document.scroll(function() {
  if ($document.scrollTop() >= 85) {
    // user scrolled 50 pixels or more;
    // do stuff
    $("header#header").addClass("notOnTop");
    $("#container").addClass("margin-top");
    $(".description-container").addClass("margin-top");
  } else {
    $("header#header").removeClass("notOnTop");
  }
});

var lastScrollTop = 0;
$(window).scroll(function(event) {
  var st = $(this).scrollTop();
  if (st > lastScrollTop) {
    $("header#header").removeClass("scrollup");
  } else {
    $("header#header").addClass("scrollup");
    $("header#header").addClass("opacity");
    $("header#header").removeClass("scrolldown");
  }

  if (st < 55) {
    $("header#header").removeClass("scrollup");
    $("header#header").removeClass("opacity");
    $("#container").removeClass("margin-top");
    $(".description-container").removeClass("margin-top");
  }
  lastScrollTop = st;
});


$(document).ready(function() {
  var bodyWidth = $("body").width();
  var vwptWidth = $(window).width();
  var bpTwo = "400px"
  if (vwptWidth > bpTwo) {
    $("body").addClass("red");
  }
})

$(document).ready(function() {
  var bodyHeight = $("body").height();
  var vwptHeight = $(window).height();
  if (vwptHeight > bodyHeight) {
    $("footer#footer").addClass("stick");
    $(".toggle-nav").addClass("no-scroll");
  }
});
