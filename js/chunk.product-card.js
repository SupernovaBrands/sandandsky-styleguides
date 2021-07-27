/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["product-card"],{

/***/ "./src/js/modules/product-card.js":
/*!****************************************!*\
  !*** ./src/js/modules/product-card.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n/* global theme */\n\n\nif ($('.product-card-form').length > 0) {\n  $('.product-card-form').each(function (index, el) {\n    var productCardForm = new theme.AjaxProduct($(el)); // eslint-disable-line no-unused-vars\n  });\n}\n\nif ($('.product-card .yotpo.bottomLine').length > 0) {\n  $('.product-card .yotpo.bottomLine').each(function (i, el) {\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.waitFor)(function () {\n      return $(el).find('.yotpo-display-wrapper').length > 0;\n    }, function () {\n      var stars = $(el).find('.yotpo-stars');\n\n      if (stars.length > 0) {\n        var rating = stars.find('.sr-only').text().split(' ')[0].replace('/5.0', '');\n        stars.after(\"<span class=\\\"product-card__text-sm pr-1\\\">\".concat(rating, \"/5.0 &nbsp;-</span>\"));\n        $(el).find('.text-m').removeClass('text-m').addClass('product-card__text-sm').removeAttr('href');\n        $(el).before('<div class=\"yotpo\"><span class=\"d-block yotpo-icon yotpo-icon-star text-secondary mr-1\"></span></div>');\n      }\n    });\n  });\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/product-card.js?");

/***/ })

}]);