/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["carousel-product-image"],{

/***/ "./src/js/modules/carousel-product-image.js":
/*!**************************************************!*\
  !*** ./src/js/modules/carousel-product-image.js ***!
  \**************************************************/
/***/ (() => {

eval("var screenLG = 991;\nvar itemIndex = 0;\nvar left = 0;\n\nvar scrollThumb = function scrollThumb(direction) {\n  var inner = document.getElementById('product-image-carousel__indicator-scroll').querySelector('.carousel-inner');\n  var item = document.getElementById('product-image-carousel__indicator-scroll').querySelector('.carousel-item');\n  var itemToScroll = 1;\n  itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -itemToScroll : itemToScroll);\n  left = itemIndex * item.clientWidth;\n  if (left < 0) left = 0;else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;\n  $(inner).animate({\n    scrollLeft: left\n  }, 300);\n};\n\n$('.product-image-carousel__indicator__item').on('click', function () {\n  $('.product-image-carousel__indicator__item img').removeClass('border-secondary').addClass('border-white');\n  $(this).find('img').addClass('border-secondary').removeClass('border-white');\n  var parent = $(this).closest('.carousel');\n  var index = $(this).index();\n  var active = parent.find('.active').index();\n  var total = parent.find('.carousel-item').length;\n\n  if (total > 5 && window.innerWidth < screenLG) {\n    if (index - active === 4 && index < total - 1) {\n      $(parent).carousel(active + 1);\n\n      if (parent.hasClass('carousel--scroll')) {\n        scrollThumb('right');\n      }\n    }\n\n    if (index === active && active !== 0) {\n      $(parent).carousel(active - 1);\n\n      if (parent.hasClass('carousel--scroll')) {\n        scrollThumb('left');\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/carousel-product-image.js?");

/***/ })

}]);