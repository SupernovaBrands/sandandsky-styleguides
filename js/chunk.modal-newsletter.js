/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["modal-newsletter"],{

/***/ "./src/js/modules/modal-newsletter.js":
/*!********************************************!*\
  !*** ./src/js/modules/modal-newsletter.js ***!
  \********************************************/
/***/ (() => {

eval("$('.modal--newsletter').on('show.bs.modal', function () {\n  $('body').addClass('modal--newsletter-open');\n});\n$('.modal--newsletter').on('hidden.bs.modal', function () {\n  $('body').removeClass('modal--newsletter-open');\n  $('#newsletter-form').removeClass('d-none');\n  $('#account-form').addClass('d-none');\n  $('#completed-form').addClass('d-none');\n});\n$('#less-intrusive-newsletter-form--newsletter form').on('submit', function (e) {\n  e.preventDefault();\n  $('#less-intrusive-newsletter-form--newsletter').addClass('d-none');\n  $('#account-form--newsletter').removeClass('d-none');\n});\n$('#account-form--newsletter form').on('submit', function (e) {\n  e.preventDefault();\n  $('#account-form--newsletter').addClass('d-none');\n  $('#completed-form--newsletter').removeClass('d-none');\n  $('.modal--newsletter__bg').addClass('d-none');\n  $('.modal--newsletter__bg-completed').removeClass('d-none');\n  $('.modal--newsletter .modal-content').addClass('completed-bg');\n});\n$('.countries-options__select').on('change', function () {\n  var val = $(this).val();\n  var maskingEl = $('.countries-options__label');\n  var phoneCode = $(this).find(\"option[value='\".concat(val, \"']\")).data('code');\n  maskingEl.text(\"+\".concat(phoneCode)).addClass('selected');\n  $(this).trigger('mouseleave');\n});\n\nif ($('html').hasClass('newsletter-without-announcement-abtest')) {\n  $('.modal--newsletter').modal('show');\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/modal-newsletter.js?");

/***/ })

}]);