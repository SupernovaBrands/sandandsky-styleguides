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

/***/ }),

/***/ "./src/js/modules/utils.js":
/*!*********************************!*\
  !*** ./src/js/modules/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setCookie\": () => (/* binding */ setCookie),\n/* harmony export */   \"getCookie\": () => (/* binding */ getCookie),\n/* harmony export */   \"removeCookie\": () => (/* binding */ removeCookie),\n/* harmony export */   \"daysToTime\": () => (/* binding */ daysToTime),\n/* harmony export */   \"setLSWithExpiry\": () => (/* binding */ setLSWithExpiry),\n/* harmony export */   \"getLSWithExpiry\": () => (/* binding */ getLSWithExpiry),\n/* harmony export */   \"removeLS\": () => (/* binding */ removeLS),\n/* harmony export */   \"waitFor\": () => (/* binding */ waitFor)\n/* harmony export */ });\nvar setCookie = function setCookie(name, value) {\n  var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;\n  var expires = '';\n\n  if (days) {\n    var date = new Date();\n    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);\n    expires = \"; expires=\".concat(date.toUTCString());\n  }\n\n  document.cookie = \"\".concat(name, \"=\").concat(value || '').concat(expires, \"; path=/\");\n};\nvar getCookie = function getCookie(name) {\n  var nameEQ = \"\".concat(name, \"=\");\n  var ca = document.cookie.split(';');\n\n  for (var i = 0; i < ca.length; i += 1) {\n    var c = ca[i];\n\n    while (c.charAt(0) === ' ') {\n      c = c.substring(1, c.length);\n    }\n\n    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);\n  }\n\n  return null;\n};\nvar removeCookie = function removeCookie(name) {\n  setCookie(name, null);\n};\nvar daysToTime = function daysToTime() {\n  var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;\n  return days * 24 * 60 * 60 * 1000;\n};\nvar setLSWithExpiry = function setLSWithExpiry(key, value) {\n  var ttl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60 * 60 * 1000;\n  var now = new Date();\n  var item = {\n    value: value,\n    expiry: now.getTime() + ttl\n  };\n  localStorage.setItem(key, JSON.stringify(item));\n};\nvar getLSWithExpiry = function getLSWithExpiry(key) {\n  var itemStr = localStorage.getItem(key);\n\n  if (!itemStr) {\n    return null;\n  }\n\n  var item = JSON.parse(itemStr);\n  var now = new Date();\n\n  if (now.getTime() > item.expiry) {\n    localStorage.removeItem(key);\n    return null;\n  }\n\n  return item.value;\n};\nvar removeLS = function removeLS(key) {\n  localStorage.removeItem(key);\n};\nvar waitFor = function waitFor(condition, cb) {\n  if (typeof condition === 'function' && typeof cb === 'function') {\n    setTimeout(function () {\n      if (condition()) {\n        cb();\n      } else {\n        waitFor(condition, cb);\n      }\n    }, 200);\n  }\n};\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/utils.js?");

/***/ })

}]);