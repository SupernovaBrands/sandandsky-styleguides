/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["ingredient-api"],{

/***/ "./src/js/modules/ingredient-api.js":
/*!******************************************!*\
  !*** ./src/js/modules/ingredient-api.js ***!
  \******************************************/
/***/ (() => {

eval("var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQzZGQ4MzdjMzAxMzM2OWM4ODJlYjQiLCJjbGllbnRuYW1lIjoic2FuZCBhbmQgc2t5IiwidXNlcm5hbWUiOiJzYW5kc2t5IiwicGFzc3dvcmQiOiIkMmEkMTAkWjNwRzNkUG8vUW16MjVLeTRFbUFUdVJDV1MzL0ZndHRUVHRwd2xxaFZmb1pMNmxBWThyL08iLCJlbWFpbCI6InJoaWFubmUuY2xpZmZvcmRAc3VwZXJub3ZhYnJhbmRzLmNvbSIsInBhY2thZ2UiOiJ1bHRhIGNvbnNjaW91cyBiZWF1dHkiLCJwZXJtaXNzaW9uIjoib3duZXIiLCJpYXQiOjE2MjQzODk4MjZ9.fxRhjKnsENhUOivqcDzzzzTZtBaeEy6l3Qp5j43d3Tg';\nvar cname = 'sand and sky';\n\nvar toCapitalize = function toCapitalize(text) {\n  var upperCase = text.toLowerCase().replace(/\\b[a-z]/g, function (letter) {\n    return letter.toUpperCase();\n  });\n  return upperCase;\n};\n\nvar listIngredients = function listIngredients(ingredientArray) {\n  var serialize = '';\n\n  if (ingredientArray.length > 0) {\n    for (var i = 0; i <= ingredientArray.length - 1; i += 1) {\n      var ingName = ingredientArray[i].ingredientName;\n      var note = ingredientArray[i].retailerNote;\n      var upperCase = toCapitalize(ingName);\n      var speciality = ingredientArray[i].specialty;\n      var isLast = ingredientArray.length - 1 === i;\n      serialize += \"<a href=\\\"#\\\" class=\\\"d-inline-block text-body text-capitalize mr-1\\\" data-toggle=\\\"modal\\\" data-target=\\\"#ingredientModal\\\" data-name=\\\"\".concat(ingName, \"\\\" data-note=\\\"\").concat(note, \"\\\" data-speciality=\\\"\").concat(speciality, \"\\\">\").concat(upperCase).concat(isLast ? '' : ',', \"</a>\");\n    }\n  }\n\n  return serialize;\n};\n\nvar parseIngredients = function parseIngredients(responseData) {\n  var html = '';\n\n  if (responseData.productIngredients.length > 0) {\n    $.each(responseData.productIngredients, function (k, obj) {\n      if (obj.functionGroup.length > 0) {\n        $.each(obj.functionGroup, function (l, obj2) {\n          html += listIngredients(obj2.ingredients);\n        });\n      }\n    });\n  }\n\n  return html;\n};\n\nvar requestCfm = function requestCfm(params, targetId) {\n  $.ajax(params).done(function (response) {\n    var ingredientHtml = parseIngredients(response);\n    $(\"#\".concat(targetId, \" .tab-ingredient__content\")).html(ingredientHtml);\n  });\n}; // test mode data\n\n\n$(document).ready(function () {\n  if ($('.collapse--ingredients').length > 0) {\n    $('.collapse--ingredients').each(function (k, obj) {\n      var sku = $(obj).data('sku');\n      var targetId = $(obj).attr('id');\n      var params = {\n        async: true,\n        crossDomain: true,\n        contentType: 'application/json',\n        url: \"https://server.clearforme.com/api/app/products/details?sku=\".concat(sku, \"&clientname=\").concat(cname),\n        method: 'GET',\n        beforeSend: function beforeSend(xhr) {\n          xhr.setRequestHeader('Authorization', \"Bearer \".concat(token));\n        },\n        processData: false,\n        error: function error() {\n          console.log(\"api cfm error - sku not found - \".concat(k));\n        }\n      };\n      requestCfm(params, targetId);\n    });\n  }\n});\n$('#ingredientModal').on('show.bs.modal', function (event) {\n  $('.tab-ingredient__modal-title').addClass('d-none');\n  $('.tab-ingredient__modal-definition').addClass('d-none');\n  $('.tab-ingredient__modal-note').addClass('d-none');\n  $('.tab-ingredient__modal-quality').addClass('d-none');\n  $('.tab-ingredient__modal-func').addClass('d-none');\n  var triggerBtn = $(event.relatedTarget).attr('data-name');\n  var dataNote = $(event.relatedTarget).attr('data-note');\n  var sku = $(event.relatedTarget).closest('.collapse--ingredients').data('sku');\n  var dataSp = $(event.relatedTarget).attr('data-speciality');\n  var params = {\n    async: true,\n    crossDomain: true,\n    contentType: 'application/json',\n    url: \"https://server.clearforme.com/api/app/ingredients/definition?sku=\".concat(sku, \"&ingredientName=\").concat(triggerBtn, \"&clientname=\").concat(cname),\n    method: 'GET',\n    beforeSend: function beforeSend(xhr) {\n      xhr.setRequestHeader('Authorization', \"Bearer \".concat(token));\n    },\n    processData: false\n  };\n  $.ajax(params).done(function (response) {\n    var cfmAttributes = response.cfmIngredientAttributes;\n    var cfmAttributesString = [];\n\n    if (cfmAttributes.length > 0) {\n      for (var i = 0; i <= cfmAttributes.length - 1; i += 1) {\n        cfmAttributesString[i] = cfmAttributes[i].attribute;\n      }\n    }\n\n    $('.tab-ingredient__modal-title').html(toCapitalize(triggerBtn)).removeClass('d-none');\n    $('.tab-ingredient__modal-definition').html(\"<strong>Definition: </strong>\".concat(response.definition)).removeClass('d-none');\n\n    if (dataNote !== '') {\n      $('.tab-ingredient__modal-note').html(\"<strong>Note:</strong> \".concat(dataNote)).removeClass('d-none');\n    }\n\n    if (cfmAttributesString.length > 0) {\n      $('.tab-ingredient__modal-func').html(\"<strong>Functions: </strong>\".concat(cfmAttributesString.join(', '), \".\")).removeClass('d-none');\n    }\n\n    if (dataSp !== '') {\n      $('.tab-ingredient__modal-quality').html(\"<strong>Qualities: </strong>\".concat(dataSp)).removeClass('d-none');\n    }\n  });\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/ingredient-api.js?");

/***/ })

}]);