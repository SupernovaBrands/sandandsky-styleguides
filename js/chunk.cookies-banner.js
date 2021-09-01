/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["cookies-banner"],{

/***/ "./src/js/modules/cookies-banner.js":
/*!******************************************!*\
  !*** ./src/js/modules/cookies-banner.js ***!
  \******************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  $('.cookies-banner #collapseCookieBanner').on('show.bs.collapse', function () {\n    var parentEl = $('.cookies-banner');\n    parentEl.find('[data-toggle=\"collapse\"]').addClass('d-none');\n    parentEl.find('.use-default').removeClass('d-none');\n    $('body').addClass('cookies-banner-show--expanded');\n  });\n  $('.cookies-banner .use-default').click(function () {\n    var parentEl = $('.cookies-banner');\n\n    if (parentEl.find('#ads').prop('checked') && parentEl.find('#performance').prop('checked')) {\n      $('.cookies-banner .accept-cookie').click();\n    } else {\n      parentEl.find('#ads').prop('checked', true);\n      parentEl.find('#performance').prop('checked', true);\n    }\n  });\n  $('.cookies-banner .accept-cookie').click(function () {\n    $('.cookies-banner').addClass('d-none');\n    $('body').removeClass('cookies-banner-show cookies-banner-show--expanded');\n  });\n  setTimeout(function () {\n    $('.cookies-banner').removeClass('d-none');\n    $('body').addClass('cookies-banner-show');\n  }, 2000); // same with shopify theme showing banner after 2 seconds\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/cookies-banner.js?");

/***/ })

}]);