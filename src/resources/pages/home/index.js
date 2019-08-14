const $ = window.$ = window.jQuery = require('jquery')
const AOS = require('aos')
require('popper.js')
require('bootstrap')
require('jquery.easing')
require('owl.carousel')
require('magnific-popup')
// require('bootstrap-datepicker')
require('scrollax')

;
(function ($) {
  AOS.init({
    duration: 800,
    easing: 'slide'
  })

  const fullHeight = function () {
    $('.js-fullheight').css('height', $(window).height())

    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height())
    })
  }

  fullHeight()

  // loader
  const loader = function () {
    setTimeout(function () {
      if ($('#ftco-loader').length > 0) {
        $('#ftco-loader').removeClass('show')
      }
    }, 1)
  }

  loader()

  // Scrollax
  $.Scrollax()

  const carousel = function () {
    $('.home-slider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: true,
      autoplayHoverPause: false,
      items: 1,
      navText: ['<span class="ion-md-arrow-back"></span>', '<span class="ion-chevron-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    })
    $('.carousel-testimony').owlCarousel({
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: true,
      navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 3
        }
      }
    })

    $('.carousel-rooms').owlCarousel({
      center: true,
      autoplay: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: false,
      navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 3
        }
      }
    })
  }

  carousel()

  $('nav .dropdown').hover(function () {
    const $this = $(this)

    $this.addClass('show')
    $this.find('> a').attr('aria-expanded', true)
    $this.find('.dropdown-menu').addClass('show')
  }, function () {
    const $this = $(this)

    $this.removeClass('show')
    $this.find('> a').attr('aria-expanded', false)
    $this.find('.dropdown-menu').removeClass('show')
  });


  // $('#dropdown04').on('show.bs.dropdown', function () {
  //   console.log('show');
  // });

  // scroll
  const scrollWindow = function () {
    $(window).scroll(function () {
      const $w = $(this)
      const st = $w.scrollTop()
      const navbar = $('.ftco_navbar')
      const sd = $('.js-scroll-wrap')

      if (st > 150) {
        if (!navbar.hasClass('scrolled')) {
          navbar.addClass('scrolled')
        }
      }

      if (st < 150) {
        if (navbar.hasClass('scrolled')) {
          navbar.removeClass('scrolled sleep')
        }
      }

      if (st > 350) {
        if (!navbar.hasClass('awake')) {
          navbar.addClass('awake')
        }

        if (sd.length > 0) {
          sd.addClass('sleep')
        }
      }

      if (st < 350) {
        if (navbar.hasClass('awake')) {
          navbar.removeClass('awake')
          navbar.addClass('sleep')
        }

        if (sd.length > 0) {
          sd.removeClass('sleep')
        }
      }
    })
  }
  scrollWindow()

  // navigation
  const onePageNav = function () {
    $('.smoothscroll[href^="#"], #ftco-nav ul li a[href^="#"]').on('click', function (e) {
      e.preventDefault()

      const hash = this.hash
      const navToggler = $('.navbar-toggler')

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, 'easeInOutExpo', function () {
        window.location.hash = hash
      });


      if (navToggler.is(':visible')) {
        navToggler.click()
      }
    })
    // $('body').on('activate.bs.scrollspy', function () {
    //   console.log('nice');
    // })
  };
  onePageNav()


  // magnific popup
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  })

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  })


  $('.checkin_date, .checkout_date').datepicker({
    'format': 'm/d/yyyy',
    'autoclose': true
  })
})(jQuery);
