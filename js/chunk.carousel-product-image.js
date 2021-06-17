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

eval("var screenLG = 991;\n$('.product-image-carousel__indicator__item').on('click', function () {\n  var carousel = $(this).parent().data('target');\n  var selectedIndex = $(this).data('slide-to');\n\n  if (window.innerWidth > screenLG) {\n    selectedIndex = $(this).data('index');\n  }\n\n  $(carousel).carousel(selectedIndex);\n  $('.product-image-carousel__indicator__item span').removeClass('border-secondary').addClass('border-white');\n  $(this).find('span').addClass('border-secondary').removeClass('border-white');\n  var parent = $(this).closest('.carousel');\n  var index = $(this).index();\n  var active = parent.find('.active').index();\n  var total = parent.find('.carousel-item').length;\n\n  if (total > 5) {\n    if (index - active === 4 && index < total - 1) {\n      $(parent).carousel(active + 1);\n    }\n\n    if (index === active && active !== 0) {\n      $(parent).carousel(active - 1);\n    }\n  }\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/carousel-product-image.js?");

/***/ })

}]);