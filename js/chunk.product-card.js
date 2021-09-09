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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_icons_star_full_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../images/icons/star-full.svg */ \"./images/icons/star-full.svg\");\n/* harmony import */ var _images_icons_star_full_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_icons_star_full_svg__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\n\n\nif ($('.product-card__rating').length > 0) {\n  $('.product-card__rating').each(function (i, el) {\n    var appKey = $(el).data('app-key');\n    var productId = $(el).data('product-id');\n    $.get(\"https://api-cdn.yotpo.com/products/\".concat(appKey, \"/\").concat(productId, \"/bottomline\")).done(function (data) {\n      console.log(data, 'testing');\n      var avg = Math.round(data.response.bottomline.average_score * 10) / 10;\n      var totalReviewsText = data.response.bottomline.total_reviews > 1 ? 'Reviews' : 'Review';\n      $(el).find('.product-card__review-text').html(\"\".concat(avg, \"/5.0 - <span class=\\\"text-underline\\\">\").concat(data.response.bottomline.total_reviews, \" \").concat(totalReviewsText, \"</span>\"));\n      $(el).prepend(\"<div class=\\\"yotpo\\\"><span class=\\\"d-flex text-secondary mr-1\\\">\".concat((0,_utils__WEBPACK_IMPORTED_MODULE_1__.injectSvgClass)((_images_icons_star_full_svg__WEBPACK_IMPORTED_MODULE_0___default())), \"</span></div>\"));\n      $(el).removeClass('d-none').addClass('d-flex');\n    });\n  });\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/product-card.js?");

/***/ })

}]);