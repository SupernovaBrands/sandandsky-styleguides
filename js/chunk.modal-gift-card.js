/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["modal-gift-card"],{

/***/ "./src/js/modules/modal-gift-card.js":
/*!*******************************************!*\
  !*** ./src/js/modules/modal-gift-card.js ***!
  \*******************************************/
/***/ (() => {

eval("$('.product-form').on('submit', function (e) {\n  var isSendAsGift = $('#asGift').prop('checked');\n\n  if (isSendAsGift) {\n    e.preventDefault();\n    $('#giftCardModal').modal({\n      show: true\n    });\n  }\n});\n$('.carousel-item__giftcard').on('click', function () {\n  $('.carousel-item__giftcard img').removeClass('border-secondary');\n  $(this).find('img').addClass('border-secondary');\n});\n$('#chooseDate').on('click', function () {\n  $(this).addClass('d-none');\n  $('#chooseDateInput').removeClass('d-none').click().focus();\n});\n$('#sendNow').on('click', function () {\n  $('#chooseDate').removeClass('d-none');\n  $('#chooseDateInput').addClass('d-none');\n});\n$('.btn__send').on('click', function () {\n  $('.btn__send').removeClass('btn-primary').addClass('btn-outline-primary');\n  $(this).removeClass('btn-outline-primary').addClass('btn-primary');\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/modal-gift-card.js?");

/***/ })

}]);