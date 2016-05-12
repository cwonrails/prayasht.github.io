$(document).ready(function() {
  init();

  // * User Agent Detection
  if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/ig)) {
    $('#behance').click(function() {
      openNewTab("http://behance.com/effulgence");
    });

    $('#blog').click(function() {
      openNewTab("http://medium.com/effulgence");
    });

    $('#facebook').click(function() {
      openNewTab("http://facebook.com/iameffulgence");
    });

    $('#soundcloud').click(function() {
      openNewTab("http://soundcloud.com/effulgence");
    });

    $('#twitter').click(function() {
      openNewTab("http://twitter.com/iameffulgence");
    });

    $('#youtube').click(function() {
      openNewTab("http://youtube.com/iameffulgence");
    });
  }
});

// var $document = $(document);
// $document.scroll(function() {
//   if ($document.scrollTop() >= 85) {
//     // user scrolled 50 pixels or more;
//     // do stuff
//     $("header#header").addClass("notOnTop");
//     $("#container").addClass("margin-top");
//     $(".description-container").addClass("margin-top");
//   } else {
//     $("header#header").removeClass("notOnTop");
//   }
// });

// var lastScrollTop = 0;
// $(window).scroll(function(event) {
//   var st = $(this).scrollTop();
//   if (st > lastScrollTop) {
//     $("header#header").removeClass("scrollup");
//   } else {
//     $("header#header").addClass("scrollup");
//     $("header#header").addClass("opacity");
//     $("header#header").removeClass("scrolldown");
//   }
//
//   if (st < 55) {
//     $("header#header").removeClass("scrollup");
//     $("header#header").removeClass("opacity");
//     $("#container").removeClass("margin-top");
//     $(".description-container").removeClass("margin-top");
//   }
//   lastScrollTop = st;
// });


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

function openNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function init() {
  if (!$('.home').is(':hidden')) $('body.index').addClass('disable-scroll');

  // Instantiate FastClick to remedy touch delays
  window.addEventListener('load', function() {
    new FastClick(document.body);
  }, false);

  // Home Button
  $('.logo').on('click', 'a', function() {
    $('body.index').addClass('disable-scroll');
    var section = $(this).data('section');
    var elem = $('#container .' + section);

    if (elem.is(':hidden')) {
      $('#container div:visible').fadeOut('fast', function() {
        elem.fadeIn('slow');
      });
    }
  });

  // Navigation
  $('.home').on('click', 'a', function() {
    var section = $(this).data('section');
    var elem = $('#container .' + section);

    if (elem.is(':hidden')) {
      $('#container div:visible').fadeOut('fast', function() {
        elem.fadeIn('slow');
        $('body.index').removeClass('disable-scroll');
      });
    }
  });
}
