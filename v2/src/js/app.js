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
    $('.home').removeClass('swoosh');
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
