/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["collection-template"],{

/***/ "./src/js/modules/collection-template.js":
/*!***********************************************!*\
  !*** ./src/js/modules/collection-template.js ***!
  \***********************************************/
/***/ (() => {

eval("$('.tab--scroll a[data-toggle=\"tab\"]').on('show.bs.tab', function () {\n  $('.tab-pane').addClass('fade').removeClass('active');\n  var targetId = $(this).attr('href');\n  var titleText = $(this).text();\n\n  if (targetId !== '#collection__all') {\n    $(\"\".concat(targetId)).addClass('active show');\n    $('.tab-pane h4.d-lg-none').addClass('d-none');\n    $('.tab-pane h4.h2').removeClass('d-lg-block');\n  } else {\n    $('.tab-pane').addClass('active show');\n    $('.tab-pane h4.d-lg-none').removeClass('d-none');\n    $('.tab-pane h4.h2').addClass('d-lg-block');\n  }\n\n  $('#collection__title').text(titleText);\n  $('html, body').animate({\n    scrollTop: 0\n  }, 500);\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/collection-template.js?");

/***/ })

}]);