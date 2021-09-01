/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["review-carousel"],{

/***/ "./src/js/modules/review-carousel.js":
/*!*******************************************!*\
  !*** ./src/js/modules/review-carousel.js ***!
  \*******************************************/
/***/ (() => {

eval("var toggleReview = function toggleReview(elem) {\n  var figCaption = elem.closest('figcaption');\n  var moreBtn = figCaption.find('.review-card__more-text');\n\n  if ($(elem).hasClass('review-card__more')) {\n    moreBtn.removeClass('d-none');\n  } else {\n    moreBtn.addClass('d-none');\n    figCaption.find('.review-card__more').removeClass('d-none');\n  }\n};\n\n$('.review-card__more').on('click', function (e) {\n  e.preventDefault();\n  $(this).addClass('d-none');\n  toggleReview($(this));\n});\n$('.review-card__less').on('click', function (e) {\n  e.preventDefault();\n  toggleReview($(this));\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/review-carousel.js?");

/***/ })

}]);