/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["carousel"],{

/***/ "./src/js/modules/carousel.js":
/*!************************************!*\
  !*** ./src/js/modules/carousel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/js/modules/constants.js\");\n\n\nif ($('.carousel--loop').length > 0) {\n  // moving element carousel item depending of items per slide\n  // triggered by bootstrap carousel slide event (when transition started)\n  $('.carousel--loop').on('slide.bs.carousel', function (e) {\n    var $e = $(e.relatedTarget);\n    var idx = $e.index();\n    var itemsPerSlide = $(this).data('slide-number') ? $(this).data('slide-number') : 3;\n    var totalItems = $(this).find('.carousel-item').length;\n\n    if (_constants__WEBPACK_IMPORTED_MODULE_0__.screenLG > window.innerWidth) {\n      // set 1 for mobile\n      itemsPerSlide = 2;\n    }\n\n    if ($(this).find('.carousel--centered').length > 0) {\n      // add 1 element for negative offset of carousel inner\n      idx += 1; // special case for carousel centered we would need plus 1, as we have negative offset x on carousle-inner\n\n      if (e.direction === 'right') {\n        $(this).find(\".carousel-item:nth-child(\".concat($(this).find('.carousel-item.active').index() + 1 + itemsPerSlide, \")\")).addClass('carousel-item--last');\n      }\n    }\n\n    if (idx >= totalItems - (itemsPerSlide - 1)) {\n      var it = itemsPerSlide - (totalItems - idx);\n\n      for (var i = 0; i < it; i += 1) {\n        if (e.direction === 'left') {\n          $(this).find('.carousel-item').eq(i).appendTo($(this).find('.carousel-inner'));\n        } else {\n          $(this).find('.carousel-item').eq(0).appendTo($(this).find('.carousel-inner'));\n        }\n      }\n    }\n  });\n  $('.carousel--loop').on('slid.bs.carousel', function () {\n    $(this).find('.carousel-item--last').removeClass('carousel-item--last');\n  });\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/carousel.js?");

/***/ }),

/***/ "./src/js/modules/constants.js":
/*!*************************************!*\
  !*** ./src/js/modules/constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"screenLG\": () => (/* binding */ screenLG)\n/* harmony export */ });\n// eslint-disable-next-line import/prefer-default-export\nvar screenLG = 992;\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/constants.js?");

/***/ })

}]);