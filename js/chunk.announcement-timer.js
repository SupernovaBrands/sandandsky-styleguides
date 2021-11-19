/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["announcement-timer"],{

/***/ "./src/js/modules/announcement-timer.js":
/*!**********************************************!*\
  !*** ./src/js/modules/announcement-timer.js ***!
  \**********************************************/
/***/ (() => {

eval("var utcTimeStamp = function utcTimeStamp(now) {\n  var timeStamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());\n  return timeStamp;\n};\n\nvar getUtcTime = function getUtcTime(date) {\n  return utcTimeStamp(new Date(date)) - 8 * 60 * 60 * 1000;\n};\n\nvar nowUtcTime = function nowUtcTime() {\n  return utcTimeStamp(new Date()) - 8 * 60 * 60 * 1000;\n};\n\nvar startCount = function startCount(endAt) {\n  var end = new Date(getUtcTime(endAt));\n  var second = 1000;\n  var minute = second * 60;\n  var hour = minute * 60;\n  var day = hour * 24;\n  var timer;\n\n  var showRemaining = function showRemaining() {\n    var now = new Date();\n    var distance = end - now;\n\n    if (distance < 0) {\n      clearInterval(timer);\n      $('.announcement-bar__timer').addClass('d-none');\n      return;\n    }\n\n    var days = Math.floor(distance / day);\n    var hours = Math.floor(distance % day / hour);\n    var minutes = Math.floor(distance % hour / minute);\n    var seconds = Math.floor(distance % minute / second);\n    $('#timerDays').html(\"\".concat(days, \" \").concat(days > 1 ? 'DAYS' : 'DAY'));\n    $('#timerHrs').html(\"\".concat(String(hours).padStart(2, '0'), \" \").concat(hours > 1 ? 'HRS' : 'HR'));\n    $('#timerMin').html(\"\".concat(String(minutes).padStart(2, '0'), \" MIN\"));\n    $('#timerSec').html(\"\".concat(String(seconds).padStart(2, '0'), \" SEC\"));\n  };\n\n  timer = setInterval(showRemaining, 1000);\n};\n\n$(document).ready(function () {\n  // start & end from settings\n  var startDate = '2021-11-15 00:00:00';\n  var endDate = '2021-12-02 23:59:00';\n  var startAt = getUtcTime(\"\".concat(startDate.replace(' ', 'T'), \"Z\"));\n  var endAt = getUtcTime(\"\".concat(endDate.replace(' ', 'T'), \"Z\"));\n  var now = nowUtcTime();\n\n  if (now > startAt && now < endAt) {\n    startCount(\"\".concat(endDate.replace(' ', 'T'), \"Z\"));\n  } else {\n    $('.announcement-bar__timer').addClass('d-none');\n  }\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/announcement-timer.js?");

/***/ })

}]);