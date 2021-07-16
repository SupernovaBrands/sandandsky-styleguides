/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["hero-carousel"],{

/***/ "./src/js/modules/header.js":
/*!**********************************!*\
  !*** ./src/js/modules/header.js ***!
  \**********************************/
/***/ (() => {

eval("$(document).ready(function () {\n  // mobile menu toggle\n  function mobileMenuToggler() {\n    $('body').toggleClass('offcanvas-active mobile-nav-show');\n  }\n\n  $('.navbar-toggler').on('click', function () {\n    mobileMenuToggler();\n  });\n  $('.mobile-nav').click(function (e) {\n    if (e.target !== e.currentTarget) return;\n    mobileMenuToggler();\n  }); // header navbar detect scroll top or down\n\n  var lastScrollTop;\n  var scrollTop = 0;\n  var screenLG = 992;\n  var navbarEl = $('.main-header');\n  var announceBar = $('.announcement-bar');\n  var navbarHeight = navbarEl.height();\n  var cookiesBanner = $('.cookies-banner');\n  var productSwatchMobile = $('.product-swatch-mobile');\n  var productSwatchTrigger = $('.product-swatch-mobile__trigger');\n  $(window).on('scroll', function () {\n    scrollTop = $(this).scrollTop();\n\n    if ($('.cookies-banner:not(.d-none)').length > 0) {\n      if (cookiesBanner.find('.collapse:not(.show)').length > 0) {\n        $('body').addClass('cookies-banner-show');\n      } else if (cookiesBanner.find('.collapse.show').length > 0) {\n        $('body').addClass('cookies-banner-show--expanded');\n      }\n\n      navbarEl.removeClass('position-fixed').removeClass('scrolled-up').removeClass('scrolled-down');\n      announceBar.removeClass('d-none');\n    } else {\n      navbarEl.addClass('position-fixed');\n\n      if (scrollTop < lastScrollTop) {\n        navbarEl.removeClass('scrolled-down').addClass('scrolled-up');\n\n        if (scrollTop <= 0) {\n          // remove scrolled up for mobile menu show properly\n          navbarEl.removeClass('position-fixed').removeClass('scrolled-up');\n\n          if (announceBar.length > 0) {\n            announceBar.removeClass('d-none');\n          }\n        }\n      } else if (scrollTop <= 0) {\n        // safari fix bounce effect\n        navbarEl.removeClass('position-fixed').removeClass('scrolled-up');\n      } else {\n        navbarEl.removeClass('scrolled-up').addClass('scrolled-down');\n\n        if (announceBar.length > 0 && scrollTop > navbarHeight) {\n          announceBar.addClass('d-none');\n        }\n      }\n    }\n\n    lastScrollTop = scrollTop;\n\n    if (window.innerWidth < screenLG && productSwatchTrigger.length > 0) {\n      var overSwatch = scrollTop > productSwatchTrigger.offset().top;\n\n      if (overSwatch && !productSwatchMobile.hasClass('show')) {\n        productSwatchMobile.addClass('show');\n      } else if (!overSwatch && productSwatchMobile.hasClass('show')) {\n        productSwatchMobile.removeClass('show');\n      }\n    }\n  }); // tooltip\n\n  $('#tooltip__close').on('click', function () {\n    $(this).parent().removeClass('show');\n    setTimeout(function () {\n      $('.navbar > .container').removeClass('position-relative');\n    }, 300);\n  });\n  $('#tooltip__show').on('click', function () {\n    $('.navbar > .container').addClass('position-relative');\n    $('.tooltip').addClass('show');\n  });\n  var announcementBar = $('#announcementBar');\n\n  if (announcementBar.length) {\n    var announcement_items = announcementBar.find('.carousel-item');\n    var barHeight = 0;\n    announcement_items.each(function () {\n      barHeight = $(this).outerHeight() > barHeight ? $(this).outerHeight() : barHeight;\n    });\n    announcementBar.find('a').css({\n      'height': barHeight + 'px'\n    });\n  }\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/header.js?");

/***/ }),

/***/ "./src/js/modules/hero-carousel.js":
/*!*****************************************!*\
  !*** ./src/js/modules/hero-carousel.js ***!
  \*****************************************/
/***/ (() => {

eval("if ($('.hero-carousel').length > 0) {\n  setTimeout(function () {\n    $('.hero-carousel').carousel('cycle');\n    $('.hero-carousel .carousel-indicators--timer').addClass('carousel-indicators--timer--start');\n  }, 5000);\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/hero-carousel.js?");

/***/ })

}]);