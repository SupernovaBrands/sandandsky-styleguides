/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["carousel-scroll"],{

/***/ "./src/js/modules/carousel-scroll.js":
/*!*******************************************!*\
  !*** ./src/js/modules/carousel-scroll.js ***!
  \*******************************************/
/***/ (() => {

eval("var carousels = [];\n\nvar adjustScrollThumb = function adjustScrollThumb(thumb, inner, scrollParent) {\n  var innerOuterWidth;\n\n  if ($(inner).closest('.instagram-carousel').length > 0) {\n    // instagram scroll bugfix: out of container\n    // round to 1 decimal of item width\n    var itemWidth = Math.round($(inner).find('.carousel-item').outerWidth() * 10) / 10; // instagram total images from instagram.js\n\n    innerOuterWidth = itemWidth * 15;\n  } else {\n    innerOuterWidth = inner.scrollWidth;\n  } // eslint-disable-next-line no-param-reassign\n\n\n  thumb.style.width = \"\".concat(inner.clientWidth / innerOuterWidth * 100, \"%\"); // eslint-disable-next-line no-param-reassign\n\n  thumb.style.left = \"\".concat(inner.scrollLeft / inner.scrollWidth * 100, \"%\");\n\n  if (inner.clientWidth === inner.scrollWidth) {\n    inner.classList.add('justify-content-center');\n    scrollParent.classList.add('d-none');\n  } else {\n    inner.classList.remove('justify-content-center');\n    scrollParent.classList.remove('d-none');\n  }\n};\n\n$('.carousel--scroll').each(function (index, carousel) {\n  var inner = carousel.querySelector('.carousel-inner');\n  var scrollbar = carousel.querySelector('.scrollbar');\n  var scrollThumb = carousel.querySelector('.scrollbar--thumb');\n  var prevButton = carousel.querySelector('.carousel-control-prev');\n  var nextButton = carousel.querySelector('.carousel-control-next');\n\n  if (scrollbar) {\n    carousel.addEventListener('adjustThumb', function () {\n      adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);\n    });\n    if (scrollThumb) adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);\n  }\n\n  carousels.push(carousel);\n  var x = 0;\n  var left = 0;\n  var itemIndex = 0;\n\n  var checkIGDots = function checkIGDots(el, leftPos) {\n    var pageIndex = 1;\n\n    if (leftPos < 50) {\n      pageIndex = 1;\n    } else if (leftPos < 280) {\n      pageIndex = 2;\n    } else if (leftPos < 580) {\n      pageIndex = 3;\n    } else {\n      pageIndex = 4;\n    }\n\n    el.find('.rounded-circle').removeClass('active');\n    el.find(\"[data-slide-to=\\\"\".concat(pageIndex, \"\\\"]\")).addClass('active');\n  };\n\n  var checkButton = function checkButton() {\n    if (inner.scrollLeft === 0) {\n      if (!$(prevButton).hasClass('carousel-control-prev--always-show')) {\n        $(prevButton).addClass('d-none');\n      } else {\n        $(prevButton).addClass('disabled');\n      }\n    } else if (!$(prevButton).hasClass('carousel-control-prev--always-show')) {\n      $(prevButton).removeClass('d-none');\n    } else {\n      $(prevButton).removeClass('disabled');\n    }\n\n    if (inner.scrollLeft + inner.clientWidth >= inner.scrollWidth - 15) {\n      if (!$(nextButton).hasClass('carousel-control-prev--always-show')) {\n        $(nextButton).addClass('d-none');\n      } else {\n        $(nextButton).addClass('disabled');\n      }\n    } else if (!$(nextButton).hasClass('carousel-control-prev--always-show')) {\n      $(nextButton).removeClass('d-none');\n    } else {\n      $(nextButton).removeClass('disabled');\n    }\n\n    if ($('#ig-reels-carousel').length > 0) {\n      checkIGDots($('#ig-reels-carousel'), inner.scrollLeft);\n    }\n  };\n\n  if (scrollThumb) {\n    checkButton();\n  }\n\n  var innerDrag = function innerDrag(e) {\n    inner.scrollLeft = left - (e.pageX || e.touches[0].pageX) + x;\n    if (scrollThumb) scrollThumb.style.left = \"\".concat(inner.scrollLeft / inner.scrollWidth * 100, \"%\");\n    checkButton();\n  };\n\n  var scrollDrag = function scrollDrag(e) {\n    inner.scrollLeft = left + ((e.pageX || e.touches[0].pageX) - x) * (inner.scrollWidth / scrollbar.clientWidth);\n    if (scrollThumb) scrollThumb.style.left = \"\".concat(inner.scrollLeft / inner.scrollWidth * 100, \"%\");\n    checkButton();\n  };\n\n  inner.addEventListener('scroll', function () {\n    if (scrollThumb) scrollThumb.style.left = \"\".concat(inner.scrollLeft / inner.scrollWidth * 100, \"%\");\n    checkButton();\n  });\n\n  var eventStart = function eventStart(e) {\n    e.preventDefault();\n    x = e.pageX || e.touches[0].pageX;\n    left = inner.scrollLeft;\n    document.addEventListener(e.type === 'mousedown' ? 'mousemove' : 'touchmove', e.target === scrollThumb ? scrollDrag : innerDrag);\n  };\n\n  inner.addEventListener('mousedown', eventStart, true);\n\n  if (scrollThumb) {\n    scrollThumb.addEventListener('mousedown', eventStart, true);\n    scrollThumb.addEventListener('touchstart', eventStart, true);\n    scrollThumb.addEventListener('mousedown', eventStart, true);\n    scrollThumb.addEventListener('touchstart', eventStart, true);\n  }\n\n  document.addEventListener('mouseup', function () {\n    document.removeEventListener('mousemove', innerDrag);\n    document.removeEventListener('mousemove', scrollDrag);\n  });\n  document.addEventListener('touchend', function () {\n    document.removeEventListener('touchmove', innerDrag);\n    document.removeEventListener('touchmove', scrollDrag);\n  });\n\n  var scrollItem = function scrollItem(direction) {\n    return function (e) {\n      e.preventDefault();\n      var item = carousel.querySelector('.carousel-item');\n      var itemToScroll = $(carousel).parent().hasClass('review-carousel') || $(carousel).parent().hasClass('instagram-carousel') ? 1 : 2;\n      itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -itemToScroll : itemToScroll);\n      left = itemIndex * item.clientWidth;\n      if (left < 0) left = 0;else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;\n      $(inner).animate({\n        scrollLeft: left\n      }, 300);\n      $(scrollThumb).animate({\n        left: \"\".concat(left / inner.scrollWidth * 100, \"%\")\n      }, 300);\n      console.log('scrollItem'); // checkDots(left);\n    };\n  };\n\n  if (prevButton) {\n    prevButton.addEventListener('mousedown', scrollItem('left'));\n  }\n\n  if (nextButton) {\n    nextButton.addEventListener('mousedown', scrollItem('right'));\n  }\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/carousel-scroll.js?");

/***/ }),

/***/ "./src/js/modules/featured-products-tab.js":
/*!*************************************************!*\
  !*** ./src/js/modules/featured-products-tab.js ***!
  \*************************************************/
/***/ (() => {

eval("$('#tabFeaturedProductContentFeatured .carousel--scroll').each(function (index, carousel) {\n  carousel.classList.remove('d-none');\n  carousel.dispatchEvent(new CustomEvent('adjustThumb'));\n});\n$('#tabFeaturedProductHead a[data-toggle=\"tab\"]').on('shown.bs.tab', function () {\n  $('.carousel--scroll').each(function (index, carousel) {\n    carousel.classList.remove('d-none');\n    carousel.dispatchEvent(new CustomEvent('adjustThumb'));\n  });\n});\n$('.collection-section__ranges-products .carousel--scroll').each(function (index, carousel) {\n  carousel.classList.remove('d-none');\n  carousel.dispatchEvent(new CustomEvent('adjustThumb'));\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/featured-products-tab.js?");

/***/ })

}]);