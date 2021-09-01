/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["stockist"],{

/***/ "./src/js/modules/stockist.js":
/*!************************************!*\
  !*** ./src/js/modules/stockist.js ***!
  \************************************/
/***/ (() => {

eval("// stockist\nif ($('.stockist').length > 0) {\n  var stockistPlace = $('.stockist__select').val();\n  $(\".stockist figure[data-toggle*=\\\"\".concat(stockistPlace, \"\\\"]\")).removeClass('d-none');\n  $('.stockist__select').on('change', function () {\n    var selectedPlace = $(this).find('option:selected').text();\n    $('.stockist__location').html(selectedPlace);\n    $('.stockist figure').addClass('d-none');\n    $(\".stockist figure[data-toggle*=\\\"\".concat($(this).val(), \"\\\"]\")).removeClass('d-none');\n  });\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/stockist.js?");

/***/ })

}]);