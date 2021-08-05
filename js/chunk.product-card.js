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
/***/ (() => {

eval("if ($('.product-card__rating').length > 0) {\n  $('.product-card__rating').each(function (i, el) {\n    var appKey = $(el).data('app-key');\n    var productId = $(el).data('product-id');\n    $.get(\"https://api.yotpo.com/products/\".concat(appKey, \"/\").concat(productId, \"/bottomline\")).done(function (data) {\n      var avg = Math.round(data.response.bottomline.average_score * 10) / 10;\n      var totalReviewsText = data.response.bottomline.total_reviews > 1 ? 'Reviews' : 'Review';\n      $(el).find('.product-card__review-text').text(\"\".concat(avg, \"/5.0 - \").concat(data.response.bottomline.total_reviews, \" \").concat(totalReviewsText));\n      $(el).prepend('<div class=\"yotpo\"><span class=\"d-block yotpo-icon yotpo-icon-star text-secondary mr-1\"></span></div>');\n      $(el).removeClass('d-none').addClass('d-flex');\n    });\n  });\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/product-card.js?");

/***/ })

}]);