/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["video-card"],{

/***/ "./src/js/modules/video-card.js":
/*!**************************************!*\
  !*** ./src/js/modules/video-card.js ***!
  \**************************************/
/***/ (() => {

eval("// video modal\nvar $videoSrc;\n\nif ($('.video-card').length > 0) {\n  $('.video-card picture').on('click', function () {\n    $videoSrc = $(this).data('src');\n  });\n}\n\nvar toggleHTMLVideo = function toggleHTMLVideo(videoEl, show, source) {\n  if (show) {\n    videoEl.find('source').attr('src', source);\n    videoEl.get(0).load();\n    videoEl.get(0).play();\n    videoEl.removeClass('d-none');\n  } else {\n    videoEl.find('source').attr('src', '');\n    videoEl.get(0).load();\n    videoEl.get(0).pause();\n    videoEl.addClass('d-none');\n  }\n};\n\nvar toggleiFrameVideo = function toggleiFrameVideo(iframeEl, show, source) {\n  if (show) {\n    iframeEl.attr('src', source).removeClass('d-none');\n  } else {\n    iframeEl.attr('src', '').addClass('d-none');\n  }\n}; // set the video src to autoplay and not to show related video.\n\n\n$('#videoCardModal').on('shown.bs.modal', function () {\n  if ($videoSrc.includes('.mp4')) {\n    toggleiFrameVideo($(this).find('iframe'), false);\n    toggleHTMLVideo($(this).find('video'), true, $videoSrc);\n  } else {\n    toggleHTMLVideo($(this).find('video'), false);\n    toggleiFrameVideo($(this).find('iframe'), true, $videoSrc);\n  }\n});\n$('#videoCardModal').on('hide.bs.modal', function () {\n  toggleHTMLVideo($(this).find('video'), false);\n  toggleiFrameVideo($(this).find('iframe'), false);\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/video-card.js?");

/***/ })

}]);