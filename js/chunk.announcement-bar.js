/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["announcement-bar"],{

/***/ "./src/js/modules/announcement-bar-abtest.js":
/*!***************************************************!*\
  !*** ./src/js/modules/announcement-bar-abtest.js ***!
  \***************************************************/
/***/ (() => {

eval("$('.modal--newsletter').on('show.bs.modal', function () {\n  $('body').addClass('modal--newsletter-open');\n});\n$('.modal--newsletter').on('hidden.bs.modal', function () {\n  $('body').removeClass('modal--newsletter-open');\n  $('#newsletter-form').removeClass('d-none');\n  $('#account-form').addClass('d-none');\n  $('#completed-form').addClass('d-none');\n});\n$('#newsletter-form form').on('submit', function (e) {\n  e.preventDefault();\n  $('#newsletter-form').addClass('d-none');\n  $('#account-form').removeClass('d-none');\n});\n$('#account-form form').on('submit', function (e) {\n  e.preventDefault();\n  $('#account-form').addClass('d-none');\n  $('#completed-form').removeClass('d-none');\n});\n$('.countries-options__select').on('change', function () {\n  var val = $(this).val();\n  var maskingEl = $('.countries-options__label');\n  var phoneCode = $(this).find(\"option[value='\".concat(val, \"']\")).data('code');\n  maskingEl.text(\"+\".concat(phoneCode)).addClass('selected');\n  $(this).trigger('mouseleave');\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/announcement-bar-abtest.js?");

/***/ })

}]);