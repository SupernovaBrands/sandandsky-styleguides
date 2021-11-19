/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["predictive-search"],{

/***/ "./src/js/modules/predictive-search.js":
/*!*********************************************!*\
  !*** ./src/js/modules/predictive-search.js ***!
  \*********************************************/
/***/ (() => {

eval("/* global Handlebars */\nvar searchNode = $('input[name=q]');\nvar searchClear = $('.search-box__clear');\nvar searchNoResult = $('.search-box__no-result');\nvar searchHome = $('.search-box__home');\nvar searchResult = $('.search-box__result');\nvar searchTag = $('.search-box__tag');\nvar SearchBox = {\n  init: function init() {\n    this.inputEventListener();\n  },\n  inputEventListener: function inputEventListener() {\n    var input = searchNode;\n    input.on('keyup', SearchBox.debounce(function (evt) {\n      if (evt.target.value === '') {\n        searchClear.addClass('disabled');\n        searchNoResult.hide();\n      } else {\n        searchClear.removeClass('disabled');\n      }\n\n      SearchBox.search(evt.target.value);\n    }, 500));\n    SearchBox.keywordListener(input);\n    searchClear.on('click', function () {\n      SearchBox.clear();\n    });\n    $('.search-box__open, .search-box__close').on('click', function (e) {\n      e.preventDefault();\n      SearchBox.searchBoxToggle();\n    });\n    $('.nav-item--mega-menu').hover(function () {\n      if (SearchBox.isSearchOpen()) {\n        SearchBox.searchBoxToggle();\n      }\n    });\n  },\n  isSearchOpen: function isSearchOpen() {\n    return $('.search-box').hasClass('show');\n  },\n  searchBoxToggle: function searchBoxToggle() {\n    $('.search-box').toggleClass('show');\n    $('body').toggleClass('search-box-active');\n\n    if (SearchBox.isSearchOpen()) {\n      $('.search-box input[name=\"q\"]').focus();\n    }\n  },\n  keywordListener: function keywordListener(input) {\n    searchTag.on('click', function (evt) {\n      input.val(evt.target.textContent);\n      SearchBox.search(evt.target.textContent);\n      searchClear.removeClass('disabled');\n    });\n  },\n  search: function search(keyword) {\n    SearchBox.loading(true);\n    searchNoResult.hide();\n    searchHome.hide();\n    searchResult.hide();\n\n    if (keyword === '') {\n      SearchBox.loading(false);\n      searchResult.hide();\n      searchHome.show();\n      return;\n    }\n\n    searchResult.show();\n    SearchBox.loading(false);\n    /*\n    jQuery.getJSON('/search/suggest.json', {\n    \tq: keyword,\n    \tresources: {\n    \t\ttype: 'product',\n    \t\toptions: {\n    \t\t\tunavailable_products: 'last',\n    \t\t\tfields: 'tag,title',\n    \t\t},\n    \t},\n    }).done(function (response) {\n    \tconst productSuggestions = response.resources.results.products;\n    \tif (productSuggestions.length > 0) {\n    \t\tSearchBox.buildResult(productSuggestions);\n    \t\tsearchResult.show();\n    \t\tSearchBox.loading(false);\n    \t\t// ga('send', 'event', 'ProductSearch', 'SearchKeyword', keyword);\n    \t\t// if (dataLayer) {\n    \t\t// \tdataLayer.push({event: 'ProductSearch', search_term: keyword});\n    \t\t// }\n    \t} else {\n    \t\tsearchNoResult.show();\n    \t\tsearchHome.show();\n    \t\tSearchBox.loading(false);\n    \t}\n    });\n    */\n  },\n  buildResult: function buildResult(results) {\n    var $searchContainer = $('#search-products .carousel-inner');\n    $searchContainer.empty();\n    var items = [];\n    var source = $('#searchRowTemplate').html();\n    var template = Handlebars.compile(source);\n    var resultsFiltered = results.filter(function (i) {\n      return i.type === 'HERO' || i.type === 'BUNDLE';\n    });\n    $.each(resultsFiltered, function (index, item) {\n      var range = 'Aussie Skincare Essentials';\n\n      if (item.title.includes('Tasmanian Spring Water')) {\n        range = 'Tasmanian Spring Water';\n      } else if (item.title.includes('Australian Pink Clay')) {\n        range = 'Australian Pink Clay';\n      } else if (item.title.includes('Australian Emu Apple')) {\n        range = 'Australian Emu Apple';\n      }\n\n      var itemRow = {\n        product_id: item.id,\n        img: item.image,\n        title: item.title.replace(range, ''),\n        handle: item.handle,\n        price: item.price,\n        url: item.url,\n        range: range\n      };\n      items.push(itemRow);\n    });\n    var info = 0;\n    var resultHeading = $searchContainer.attr('data-heading');\n\n    if (resultsFiltered.length > 0) {\n      info = resultHeading.replace('_total_', results.length);\n    }\n\n    var data = {\n      items: items\n    };\n    SearchBox.loading(false);\n    $searchContainer.append(template(data));\n    $('#search-result-heading').html(info);\n  },\n  debounce: function debounce(func, wait, immediate) {\n    var timeout;\n    return function () {\n      var context = this; // eslint-disable-next-line prefer-rest-params\n\n      var args = arguments;\n      clearTimeout(timeout);\n      timeout = setTimeout(function () {\n        timeout = null;\n        if (!immediate) func.apply(context, args);\n      }, wait);\n      if (immediate && !timeout) func.apply(context, args);\n    };\n  },\n  loading: function loading(state) {\n    if (state) {\n      $('.lds-ring').addClass('active');\n      $('.search-nav__footer').hide();\n    } else {\n      $('.lds-ring').removeClass('active');\n      $('.search-nav__footer').show();\n    }\n  },\n  clear: function clear() {\n    searchNode.val('');\n    searchResult.hide();\n    searchHome.show();\n    searchClear.addClass('disabled');\n    searchNoResult.hide();\n  },\n  panelToggle: function panelToggle() {\n    $('.mega-search-wrapper').toggleClass('active');\n    $('body').toggleClass('body-search-open');\n\n    if ($('.mega-search-wrapper').hasClass('active')) {\n      document.getElementById('searchq').focus();\n    }\n  }\n};\n$(document).ready(function () {\n  SearchBox.init();\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/predictive-search.js?");

/***/ })

}]);