/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["featured-carousel-tabs"],{

/***/ "./src/js/modules/featured-carousel-tabs.js":
/*!**************************************************!*\
  !*** ./src/js/modules/featured-carousel-tabs.js ***!
  \**************************************************/
/***/ (() => {

eval("$('.tab--scroll-carousel a[data-toggle=\"tab\"]').on('shown.bs.tab', function (e) {\n  var target = e.target.getAttribute('href');\n  document.querySelectorAll(\"\".concat(target, \" .carousel--scroll\")).forEach(function (carousel) {\n    carousel.classList.remove('d-none');\n    carousel.dispatchEvent(new CustomEvent('adjustThumb'));\n    carousel.querySelector('.carousel-control-next').classList.remove('d-none');\n  });\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/featured-carousel-tabs.js?");

/***/ })

}]);