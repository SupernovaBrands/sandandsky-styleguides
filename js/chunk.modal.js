/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["modal"],{

/***/ "./src/js/modules/modal-sweepstakes.js":
/*!*********************************************!*\
  !*** ./src/js/modules/modal-sweepstakes.js ***!
  \*********************************************/
/***/ (() => {

eval("$('.modal--newsletter').on('show.bs.modal', function () {\n  $('body').addClass('modal--newsletter-open');\n});\n$('.modal--newsletter').on('hidden.bs.modal', function () {\n  $('body').removeClass('modal--newsletter-open');\n  $('#newsletter-form').removeClass('d-none');\n  $('#account-form').addClass('d-none');\n  $('#completed-form').addClass('d-none');\n});\n$('#newsletter-form form').on('submit', function (e) {\n  e.preventDefault();\n  $('#newsletter-form').addClass('d-none');\n  $('#account-form').removeClass('d-none');\n});\n$('#account-form form').on('submit', function (e) {\n  e.preventDefault();\n  $('#account-form').addClass('d-none');\n  $('#completed-form').removeClass('d-none');\n});\n$('.countries-options__select').on('change', function () {\n  var val = $(this).val();\n  var maskingEl = $('.countries-options__label');\n  var phoneCode = $(this).find(\"option[value='\".concat(val, \"']\")).data('code');\n  maskingEl.text(\"+\".concat(phoneCode)).addClass('selected');\n  $(this).trigger('mouseleave');\n}); // $('.modal--sweepstakes-cta').modal('show');\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/modal-sweepstakes.js?");

/***/ }),

/***/ "./src/js/modules/product-waitlist.js":
/*!********************************************!*\
  !*** ./src/js/modules/product-waitlist.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\n\nvar phoneSubmitted = function phoneSubmitted(el) {\n  $(el).find('.modal--waitlist__phone').addClass('d-none');\n  $(el).find('.modal--waitlist__phone-submitted').removeClass('d-none').addClass('d-flex');\n};\n\nvar emailSubmitted = function emailSubmitted(el) {\n  $(el).find('.modal--waitlist__email').addClass('d-none');\n  $(el).find('.modal--waitlist__email-submitted').removeClass('d-none').addClass('d-flex');\n};\n\nvar formListener = function formListener() {\n  $('.modal--waitlist form, .product__waitlist-form').on('submit', function (e) {\n    e.preventDefault();\n    var el = e.target;\n    var email = $(el).find('input[name=\"email\"]').val();\n    var phone = $(el).find('input[name=\"phone\"]').val() || '';\n    var phoneValid = phone !== '' && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.validatePhone)(phone);\n    var emailValid = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateEmail)(email);\n\n    if (emailValid || phoneValid) {\n      if (emailValid) {\n        emailSubmitted(el);\n      }\n\n      if (phoneValid) {\n        phoneSubmitted(el);\n      }\n    }\n  });\n  $('.product__launch-waitlist form').on('submit', function (e) {\n    e.preventDefault();\n    console.log('submitted');\n    var el = e.target;\n    var email = $(el).find('input[name=\"email\"]').val();\n    var phone = $(el).find('input[name=\"phone\"]').val() || '';\n    var phoneValid = phone !== '' && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.validatePhone)(phone);\n    var emailValid = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateEmail)(email);\n    var test = true;\n\n    if (emailValid || phoneValid || test) {\n      $(el).addClass('d-none');\n      $('.launch-waitlist__submitted').addClass('d-flex');\n    }\n  });\n};\n\nconsole.log('js');\nformListener();\n$('.modal--waitlist').modal('show');\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/product-waitlist.js?");

/***/ })

}]);