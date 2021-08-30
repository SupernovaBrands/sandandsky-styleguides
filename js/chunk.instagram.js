/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["instagram"],{

/***/ "./src/js/modules/instagram.js":
/*!*************************************!*\
  !*** ./src/js/modules/instagram.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\nvar existingData = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCookie)('ig_media');\n\nvar carouselSlide = function carouselSlide(item) {\n  return \"<div class=\\\"carousel-item col-9 col-lg-1o5\\\"><a href=\\\"\".concat(item.link, \"\\\" target=\\\"_blank\\\" class=\\\"embed-responsive embed-responsive-1by1 bg-shimmer\\\"><noscript class=\\\"loading-lazy\\\"><img class=\\\"d-block w-100 embed-responsive-item fit--cover\\\" src=\\\"\").concat(item.image, \"\\\" loading=\\\"lazy\\\" /></noscript></a></div>\");\n};\n\nvar fillCarousel = function fillCarousel(items) {\n  $('.instagram-carousel .carousel-item').remove();\n  items.forEach(function (item) {\n    $('.instagram-carousel .carousel-inner').append(carouselSlide(item));\n  });\n  window.checkLazyImages();\n  $('.instagram-carousel .carousel--scroll').each(function (index, carousel) {\n    carousel.dispatchEvent(new CustomEvent('adjustThumb'));\n\n    if (items.length > 5) {\n      carousel.querySelector('.carousel-control-next').classList.remove('d-none');\n    }\n  });\n};\n\nif (existingData) {\n  fillCarousel(JSON.parse(existingData));\n} else {\n  $.get('https://cdn.sandandsky.com/instagram/sandandsky.json').then(function (data) {\n    var dataMedia = [];\n\n    for (var i = 0; i < 15; i += 1) {\n      var d = data[i];\n      var obj = {\n        link: d.permalink,\n        image: d.thumbnail_url\n      };\n      dataMedia.push(obj);\n    }\n\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setCookie)('ig_media', JSON.stringify(dataMedia));\n    fillCarousel(dataMedia);\n    $('.instagram-carousel .carousel-control-next').removeClass('d-none');\n  }).catch(function () {\n    fillCarousel([{\n      image: 'https://via.placeholder.com/255x255/?text=1'\n    }, {\n      image: 'https://via.placeholder.com/255x255/?text=2'\n    }, {\n      image: 'https://via.placeholder.com/255x255/?text=3'\n    }, {\n      image: 'https://via.placeholder.com/255x255/?text=4'\n    }, {\n      image: 'https://via.placeholder.com/255x255/?text=5'\n    }, {\n      image: 'https://via.placeholder.com/255x255/?text=6'\n    }, {\n      image: 'https://via.placeholder.com/255x255/?text=7'\n    }, {\n      image: 'https://via.placeholder.com/255x255/?text=8'\n    }]);\n  });\n}\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/instagram.js?");

/***/ })

}]);