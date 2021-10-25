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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\nvar screenLG = 991;\n\nif (window.location.hash === '#write-a-review') {\n  setTimeout(function () {\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.scrollToElement)('#write-a-review', -130);\n  }, 500);\n}\n\nvar mobileSwatch = $('.product-swatch-mobile');\nvar mobileSwatchTrigger = document.querySelector('.product-swatch-mobile__trigger');\n\nif (mobileSwatchTrigger && mobileSwatch.length > 0) {\n  var observerCallback = function observerCallback(entries) {\n    if (window.innerWidth < screenLG) {\n      entries.forEach(function (entry) {\n        if (entry.isIntersecting) {\n          mobileSwatch.removeClass('show');\n        } else {\n          mobileSwatch.addClass('show');\n        }\n      });\n    }\n  };\n\n  var observer = new IntersectionObserver(observerCallback);\n  observer.observe(mobileSwatchTrigger);\n}\n\n$('.product-form .quantity--minus').on('click', function () {\n  var inputElem = $(this).parent().find('input[name=\"quantity\"]');\n  var num = inputElem.val();\n\n  if (num > 1) {\n    inputElem.val(Number(num) - 1);\n  }\n\n  return false;\n});\n$('.product-form .quantity--plus').on('click', function () {\n  var inputElem = $(this).parent().find('input[name=\"quantity\"]');\n  var num = inputElem.val();\n\n  if (num > 0 && num < 99) {\n    inputElem.val(Number(num) + 1);\n  }\n\n  return false;\n}); // open shipping table accordion\n\n$('.product-form__shipping a').on('click', function (e) {\n  e.preventDefault();\n  e.stopPropagation();\n  var dataTarget = $(this).parent().data('target');\n  $(\"[data-target=\\\"\".concat(dataTarget, \"\\\"]\")).removeClass('collapsed').attr('aria-expanded', true);\n  $(dataTarget).addClass('show');\n  $('html, body').animate({\n    scrollTop: $('.product-form__shipping-accordion').offset().top - 70\n  }, 500);\n});\nvar productWaitlistForm = $('.product__waitlist-form');\nvar productWaitlistSubmitted = $('.product__waitlist-submitted');\n\nif (productWaitlistForm.length > 0 && productWaitlistSubmitted.length > 0) {\n  productWaitlistForm.find('.btn').on('click', function () {\n    console.log('click');\n    $(this).closest('.product__waitlist-form').addClass('d-none');\n    productWaitlistSubmitted.removeClass('d-none');\n  });\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/product-template.js?");

/***/ })

}]);