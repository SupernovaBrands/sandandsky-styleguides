/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["article-progress-bar"],{

/***/ "./src/js/modules/article-progress-bar.js":
/*!************************************************!*\
  !*** ./src/js/modules/article-progress-bar.js ***!
  \************************************************/
/***/ (() => {

eval("var _document = document,\n    body = _document.body,\n    html = _document.documentElement;\nvar proggreeBar = $('.reading-proggress-bar');\nvar height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);\n\nvar setProgress = function setProgress() {\n  var scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;\n  var width = \"\".concat(scrollFromTop / height * 100, \"%\");\n  proggreeBar.find('.reading-proggress-bar__proggress').css('width', width);\n};\n\nwindow.addEventListener('scroll', setProgress);\nsetProgress();\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/article-progress-bar.js?");

/***/ })

}]);