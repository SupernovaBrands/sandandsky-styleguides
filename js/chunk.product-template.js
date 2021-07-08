/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["product-template"],{

/***/ "./src/js/modules/product-template.js":
/*!********************************************!*\
  !*** ./src/js/modules/product-template.js ***!
  \********************************************/
/***/ (() => {

eval("var screenLG = 991;\n$('.yotpo').on('click', '.text-m', function () {\n  $('html, body').animate({\n    scrollTop: $('.yotpo__product').offset().top\n  }, 500);\n});\nvar mobileSwatch = $('.product-swatch-mobile');\nvar mobileSwatchTrigger = document.querySelector('.product-swatch-mobile__trigger');\n\nif (mobileSwatchTrigger && mobileSwatch.length > 0) {\n  var observerCallback = function observerCallback(entries) {\n    if (window.innerWidth < screenLG) {\n      entries.forEach(function (entry) {\n        if (entry.isIntersecting) {\n          mobileSwatch.removeClass('show');\n        } else {\n          mobileSwatch.addClass('show');\n        }\n      });\n    }\n  };\n\n  var observer = new IntersectionObserver(observerCallback);\n  observer.observe(mobileSwatchTrigger);\n}\n\n$('.product-form .sni__minus').on('click', function () {\n  var inputElem = $(this).parent().find('input[name=\"quantity\"]');\n  var num = inputElem.val();\n\n  if (num > 1) {\n    inputElem.val(Number(num) - 1);\n  }\n\n  return false;\n});\n$('.product-form .sni__plus').on('click', function () {\n  var inputElem = $(this).parent().find('input[name=\"quantity\"]');\n  var num = inputElem.val();\n\n  if (num > 0 && num < 99) {\n    inputElem.val(Number(num) + 1);\n  }\n\n  return false;\n});\n$('.product-form [name=product-variant]').on('change', function () {\n  $('.product-form').find('.product-variant').removeClass('product-variant__active');\n  $(this).closest('.product-variant').addClass('product-variant__active');\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/product-template.js?");

/***/ })

}]);