/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["a-beauty-review"],{

/***/ "./src/js/modules/a-beauty-review.js":
/*!*******************************************!*\
  !*** ./src/js/modules/a-beauty-review.js ***!
  \*******************************************/
/***/ (() => {

eval("var beforeIndicator;\nvar before2Indicator;\nvar afterIndicator;\nvar after2Indicator;\n$('.a-beauty-review').on('slide.bs.carousel', function (e) {\n  if (e.from === 3 && e.to === 0 || e.to === 3 && e.from === 0) {\n    $(this).addClass('reverse-direction');\n  }\n\n  beforeIndicator = e.to > 0 ? $(this).find('.carousel-indicators li').get(e.to - 1) : null;\n  before2Indicator = beforeIndicator ? $(beforeIndicator).prevAll() : null;\n  afterIndicator = e.to + 1 < $(this).find('.carousel-item').length ? $(this).find('.carousel-indicators li').get(e.to + 1) : null;\n  after2Indicator = afterIndicator ? $(afterIndicator).nextAll() : null;\n  $(this).find('.carousel-indicators li').removeClass('carousel-indicator--prev carousel-indicator--prev-out carousel-indicator--next carousel-indicator--next-out');\n  if (beforeIndicator) $(beforeIndicator).addClass('carousel-indicator--prev');\n  if (before2Indicator) $(before2Indicator).addClass('carousel-indicator--prev-out');\n  if (afterIndicator) $(afterIndicator).addClass('carousel-indicator--next');\n  if (after2Indicator) $(after2Indicator).addClass('carousel-indicator--next-out');\n});\n$('.a-beauty-review').on('slid.bs.carousel', function () {\n  $(this).removeClass('reverse-direction');\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/a-beauty-review.js?");

/***/ })

}]);