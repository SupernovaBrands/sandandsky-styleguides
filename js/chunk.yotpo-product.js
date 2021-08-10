/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandandsky_styleguides"] = self["webpackChunksandandsky_styleguides"] || []).push([["yotpo-product"],{

/***/ "./src/js/modules/yotpo-product.js":
/*!*****************************************!*\
  !*** ./src/js/modules/yotpo-product.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\nvar yotpoProduct = $('.yotpo__product');\nvar appKey = yotpoProduct.data('key');\nvar productId = yotpoProduct.data('product');\nvar productTitle = yotpoProduct.data('product-title');\nvar productUrl = yotpoProduct.data('product-url');\nvar devKey = yotpoProduct.data('dev-key');\nvar devId = yotpoProduct.data('dev-id');\nvar productDesc = yotpoProduct.data('desc');\nvar store = 'dev';\n\nvar checkFilterParams = function checkFilterParams() {\n  var params = {\n    domain_key: productId\n  };\n  var crfs = [];\n\n  if ($('#yotpo__free-text').val() !== '') {\n    params.free_text_search = $('#yotpo__free-text').val();\n  }\n\n  if ($('.yotpo__tags').find('.active').length > 0) {\n    params.topic_names = [$('.yotpo__tags').find('.active').data('name')];\n  }\n\n  if ($('.yotpo__filter-rating').val() !== '') {\n    params.scores = [$('.yotpo__filter-rating').val()];\n  }\n\n  if ($('.yotpo__filter-picture').val() !== '') {\n    params.pictured = true;\n  }\n\n  if ($('.yotpo__filter-type').val() !== '') {\n    crfs.push({\n      question_id: Number($('.yotpo__filter-type').data('qid')),\n      answers: [$('.yotpo__filter-type').val()]\n    });\n  }\n\n  if ($('.yotpo__filter-age').val() !== '') {\n    crfs.push({\n      question_id: Number($('.yotpo__filter-age').data('qid')),\n      answers: [$('.yotpo__filter-age').val()]\n    });\n  }\n\n  if ($('.yotpo__filter-concern').val() !== '') {\n    crfs.push({\n      question_id: Number($('.yotpo__filter-concern').data('qid')),\n      answers: [$('.yotpo__filter-concern').val()]\n    });\n  }\n\n  if (crfs.length > 0) {\n    params.crfs = crfs;\n  }\n\n  return params;\n};\n\nvar filterLikes = function filterLikes(id) {\n  var sessionData = window.localStorage.getItem('vote_session') ? JSON.parse(window.localStorage.getItem('vote_session')) : [];\n  var filteredVoteUp = sessionData.filter(function (obj) {\n    return obj.id === id && obj.store === store && obj.type === 'up';\n  });\n  var filteredVoteDown = sessionData.filter(function (obj) {\n    return obj.id === id && obj.store === store && obj.type === 'down';\n  });\n  var voteupDisabled = filteredVoteUp.length > 0 ? 'yotpo__likes-disabled' : '';\n  var votedownDisabled = filteredVoteDown.length > 0 ? 'yotpo__likes-disabled' : '';\n  return {\n    vote_up: voteupDisabled,\n    vote_down: votedownDisabled\n  };\n};\n\nvar formatDate = function formatDate(serverDate) {\n  var d = new Date(serverDate);\n  var month = d.getMonth() + 1;\n  var day = d.getDate();\n  var year = d.getFullYear();\n\n  if (month.length < 2) {\n    month = \"0\".concat(month);\n  }\n\n  if (day.length < 2) {\n    day = \"0\".concat(day);\n  }\n\n  return [day, month, year].join('/');\n};\n\nvar renderReviews = function renderReviews(reviews) {\n  $('.yotpo__review').html('');\n  $.each(reviews, function (k, review) {\n    var verifiedBuyer = review.verified_buyer ? 'sni__verified' : '';\n    var verifiedBuyerLabel = '<p class=\"font-size-sm mb-0\">Verified buyer</p>'; // custom fields\n\n    var customFields = '';\n\n    if (review.custom_fields) {\n      $.each(review.custom_fields, function (key, field) {\n        customFields += \"<p class=\\\"font-size-sm\\\"><strong>\".concat(field.title, \":</strong><span class=\\\"ml-1\\\">\").concat(field.value, \"</span></p>\");\n      });\n    } // media image\n\n\n    var mediaImages = '';\n\n    if (review.images_data && review.images_data.length > 0) {\n      mediaImages += \"<div class=\\\"yotpo__images d-flex flex-nowrap row w-auto overflow-auto px-lg-2\\\" data-review-id=\\\"\".concat(review.id, \"\\\">\");\n      $.each(review.images_data, function (k2, image) {\n        mediaImages += \"<a href=\\\"#\\\" class=\\\"d-inline-block mx-1 mb-g\\\" data-toggle=\\\"modal\\\" data-target=\\\"#yotpoImageModal\\\"><img data-original=\\\"\".concat(image.original_url.replace('https:', ''), \"\\\" src=\\\"\").concat(image.thumb_url.replace('https:', ''), \"\\\" alt=\\\"Image Review of \").concat(review.user.display_name, \"\\\"></a>\");\n      });\n      mediaImages += '</div>';\n    }\n\n    var voteFilter = filterLikes(review.id); // build stars\n\n    var stars = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.buildStars)(review.score);\n    var yotpoReviewTemplate = \"<div class=\\\"yotpo__review-content border-bottom py-3 row\\\">\\n\\t\\t<div class=\\\"col-lg-3\\\">\\n\\t\\t\\t<h4 class=\\\"mb-0 sni-after align-items-center yotpo__review-author \".concat(verifiedBuyer, \" \\\">\").concat(review.user.display_name, \"</h4>\\n\\t\\t\\t\").concat(verifiedBuyerLabel, \"\\n\\t\\t\\t<p class=\\\"font-size-sm mb-3\\\">\").concat(formatDate(review.created_at), \"</p>\\n\\t\\t\\t\").concat(customFields, \"\\n\\t\\t</div>\\n\\t\\t<div class=\\\"col-lg-9\\\">\\n\\t\\t\\t<div class=\\\"d-flex text-secondary mt-3 mt-lg-0\\\">\").concat(stars, \"</div>\\n\\t\\t\\t<h4 class=\\\"mb-3 mt-2\\\">\").concat(review.title, \"</h4>\\n\\t\\t\\t<p class=\\\"mb-3\\\">\").concat(review.content, \"</p>\\n\\t\\t\\t\").concat(mediaImages, \"\\n\\t\\t\\t<div class=\\\"d-flex justify-content-end align-items-center mt-3 yotpo__likes\\\" data-id=\\\"\").concat(review.id, \"\\\" data-vote=\\\"review\\\">\\n\\t\\t\\t\\t<p class=\\\"font-size-sm mr-1 mb-0\\\">Was this review helpful?</p>\\n\\t\\t\\t\\t<span data-type=\\\"up\\\" class=\\\"font-size-sm sni sni__thumbs-up align-items-center mx-1 \").concat(voteFilter.vote_up, \"\\\">\").concat(review.votes_up, \"</span>\\n\\t\\t\\t\\t<span data-type=\\\"down\\\" class=\\\"font-size-sm sni sni__thumbs-down align-items-center ml-1 \").concat(voteFilter.vote_down, \"\\\">\").concat(review.votes_down, \"</span>\\n\\t\\t\\t</div>\\n\\t\\t</div></div>\");\n    $('.yotpo__review').append(yotpoReviewTemplate);\n  });\n  $('.yotpo__filter-form').removeClass('d-none');\n};\n\nvar renderPagination = function renderPagination(pagination) {\n  $('.yotpo__pagination').addClass('d-flex').removeClass('d-none').html('');\n  $('.yotpo__offset').removeClass('d-none');\n  var currPage = pagination.page;\n  var totalPage = Math.ceil(pagination.total / pagination.per_page);\n  var pageStart = currPage - 4 < 1 ? 1 : currPage - 4;\n  var pageEnd = currPage + 4 > 9 ? currPage + 4 : 9;\n  pageEnd = totalPage < 9 ? totalPage : pageEnd;\n  pageEnd = pageEnd > totalPage ? totalPage : pageEnd;\n\n  if (pageEnd <= 1) {\n    $('.yotpo__offset strong').html(\"\".concat(pagination.per_page * (currPage - 1) + 1, \" - \").concat(pagination.total));\n    return;\n  }\n\n  $('.yotpo__total-reviews').html(\"\".concat(pagination.total, \" \").concat(pagination.total > 1 ? 'Reviews' : 'Review'));\n  var active;\n  var paginationHtml = '';\n\n  if (currPage > 1) {\n    paginationHtml += \"<li><a href=\\\"#\\\" data-page=\\\"\".concat(currPage - 1, \"\\\" class=\\\"px-1 text-body sni sni__chevron-prev\\\"></a></li>\");\n  }\n\n  for (var i = pageStart; i <= pageEnd; i += 1) {\n    active = i === currPage ? 'font-weight-bold text-secondary' : 'text-body';\n    paginationHtml += \"<li><a href=\\\"#\\\" data-page=\\\"\".concat(i, \"\\\" class=\\\"px-1 \").concat(active, \"\\\">\").concat(i, \"</a></li>\");\n  }\n\n  if (currPage < totalPage) {\n    paginationHtml += \"<li><a href=\\\"#\\\" data-page=\\\"\".concat(currPage + 1, \"\\\" class=\\\"px-1 pr-lg-0 text-body sni sni__chevron-next\\\"></a></li>\");\n  }\n\n  var offsetMax = pagination.per_page * currPage;\n  var offsetEnd = offsetMax > pagination.total ? pagination.total : offsetMax;\n  $('.yotpo__pagination').html(paginationHtml);\n  $('.yotpo__offset strong').html(\"\".concat(pagination.per_page * (currPage - 1) + 1, \" - \").concat(offsetEnd));\n};\n\nvar showLoader = function showLoader() {\n  $('.yotpo__review').html('');\n  $('.yotpo__review').append('<div class=\"text-center\"><div class=\"spinner-border text-secondary\" role=\"status\"><span class=\"sr-only\">Loading...</span></div></div>');\n};\n\nvar ajaxPost = function ajaxPost() {\n  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  showLoader();\n  var filterParams = checkFilterParams();\n\n  if (page !== null) {\n    filterParams.page = page;\n  }\n\n  $.ajax({\n    crossDomain: true,\n    contentType: 'application/json',\n    url: \"https://api.yotpo.com/v1/reviews/\".concat(appKey, \"/filter.json\"),\n    method: 'POST',\n    headers: {\n      'content-type': 'application/json',\n      'cache-control': 'no-cache'\n    },\n    processData: false,\n    data: JSON.stringify(filterParams)\n  }).done(function (response) {\n    $('.yotpo__total-reviews').html(\"\".concat(response.response.pagination.total, \" \").concat(response.response.pagination.total > 1 ? 'Reviews' : 'Review'));\n\n    if (response.response.reviews.length > 0) {\n      renderPagination(response.response.pagination);\n      renderReviews(response.response.reviews);\n    } else {\n      $('.yotpo__offset').addClass('d-none');\n      $('.yotpo__pagination').removeClass('d-flex').addClass('d-none');\n      $('.yotpo__review').html('');\n      $('.yotpo__review').html('<p class=\"text-center\">Sorry, no reviews match your criteria. Clear or modify your filters and try again.<p>');\n    }\n  });\n}; // Build topics tag\n\n\n$.post(\"https://api.yotpo.com/v1/topic/\".concat(appKey, \"/topics.json\"), {\n  domain_key: productId\n}, function (data) {\n  var tagLength = data.response.top_topics.top_mention_topics.length;\n  var maxTags = tagLength < 24 ? tagLength : 24;\n\n  for (var i = 0; i <= maxTags - 1; i += 1) {\n    var hideTag = i > 5 ? 'd-none' : '';\n    var tagname = data.response.top_topics.top_mention_topics[i].name;\n    var tag = \"<a href=\\\"#\\\" class=\\\"badge badge-gray font-size-sm mr-2 mb-2 text-capitalize \".concat(hideTag, \"\\\" data-name=\\\"\").concat(tagname, \"\\\">\").concat(tagname, \"</a>\");\n    $('.yotpo__tags').append(tag);\n  }\n\n  if (tagLength > 5) {\n    // append ellipsis\n    $('.yotpo__tags').append('<a href=\"#\" class=\"badge badge-gray font-size-sm mr-2 mb-2 yotpo__tags-expand\" data-name=\"\">...</a>');\n  }\n}); // Initial build\n\n$.get(\"https://api.yotpo.com/v1/widget/\".concat(appKey, \"/products/\").concat(productId, \"/reviews.json\"), {\n  page: 1\n}, function (data) {\n  var avg = Math.round(data.response.bottomline.average_score * 10) / 10;\n  var stars = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.buildStars)(avg);\n  var totalReviewsText = \"\".concat(data.response.bottomline.total_review, \" \").concat(data.response.bottomline.total_review > 1 ? 'Reviews' : 'Review');\n  var starsAndTotalReview = \"\".concat(stars, \"<a href=\\\"javascript:void(0)\\\" class=\\\"text-m\\\" aria-label=\\\"\").concat(totalReviewsText, \"\\\"><span class=\\\"ml-1 text-dark text-underline\\\">\").concat(totalReviewsText, \"</span></a>\");\n  $('.yotpo__stars').html(starsAndTotalReview);\n  $('.yotpo__avg-score').text(avg);\n  $('.yotpo__avg-score-label').text('Average rating');\n  $('.yotpo__total-reviews').text(\"\".concat(data.response.bottomline.total_review, \" \").concat(data.response.bottomline.total_review > 1 ? 'Reviews' : 'Review'));\n  $('.yotpo__stars').removeClass('d-none').addClass('d-flex');\n\n  if (data.response.reviews.length > 0) {\n    renderPagination(data.response.pagination);\n    renderReviews(data.response.reviews);\n  } else {\n    $('.yotpo__avg-score').parent().removeClass('d-flex').addClass('d-none');\n    $('.yotpo__total-reviews').addClass('d-none');\n  }\n}); // Pagination handle\n\n$('.yotpo__pagination').on('click', 'a', function (e) {\n  e.preventDefault();\n  $('html, body').animate({\n    scrollTop: $('.yotpo__review').offset().top\n  }, 500);\n  var filterParams = checkFilterParams();\n\n  if (Object.keys(filterParams).length > 0) {\n    ajaxPost($(this).data('page'));\n  } else {\n    $.get(\"https://api.yotpo.com/v1/widget/\".concat(appKey, \"/products/\").concat(productId, \"/reviews.json\"), {\n      page: $(this).attr('data-page')\n    }, function (data) {\n      if (data.response.reviews.length > 0) {\n        renderPagination(data.response.pagination);\n        renderReviews(data.response.reviews);\n      }\n    });\n  }\n});\n$('.yotpo__tags').on('click', '.yotpo__tags-expand', function (e) {\n  e.preventDefault();\n  $(this).closest('.yotpo__tags').find('.badge-gray.d-none').removeClass('d-none');\n  $(this).addClass('d-none');\n}); // QA tabs, call QA api\n\n$('.yotpo__tab-question').on('click', function () {\n  $.get(\"https://api.yotpo.com/products/\".concat(appKey, \"/\").concat(productId, \"/questions.json\"), function (data) {\n    if (data.response.questions.length > 0) {\n      $('.yotpo__tab-qna').html('');\n      $.each(data.response.questions, function (k, question) {\n        var isLastElement = k === data.response.questions.length - 1 ? '' : 'border-bottom';\n        var answerTemplate = '';\n\n        if (question.sorted_public_answers.length > 0) {\n          $.each(question.sorted_public_answers, function (l, answers) {\n            var voteFilter = filterLikes(answers.id);\n            answerTemplate += \"<p class=\\\"font-size-sm\\\">Answer (\".concat(question.sorted_public_answers.length, \")</p><div class=\\\"yotpo__review-answer ml-4 mt-3 border-left pl-3\\\">\\n\\t\\t\\t\\t\\t\\t\\t<h4 class=\\\"mb-0\\\">Store Owner</h4>\\n\\t\\t\\t\\t\\t\\t\\t<p class=\\\"font-size-sm\\\">\").concat(formatDate(answers.created_at), \"</p>\\n\\t\\t\\t\\t\\t\\t\\t<p class=\\\"mt-2\\\">A: \").concat(answers.content, \"</p>\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\\"d-flex justify-content-end align-items-center mt-3 yotpo__likes\\\" data-id=\\\"\").concat(answers.id, \"\\\" data-vote=\\\"answer\\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\\"font-size-sm mr-1 mb-0\\\">Was This Answer Helpful?</p>\\n\\t\\t\\t\\t\\t\\t\\t\\t<span data-type=\\\"up\\\" class=\\\"font-size-sm sni sni__thumbs-up align-items-center mx-1 \").concat(voteFilter.vote_up, \"\\\">\").concat(answers.votes_up, \"</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t<span data-type=\\\"down\\\" class=\\\"font-size-sm sni sni__thumbs-down align-items-center ml-1 \").concat(voteFilter.vote_down, \"\\\">\").concat(answers.votes_down, \"</span>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</div>\");\n          });\n        }\n\n        var qnaTemplate = \"<div class=\\\"yotpo__review-qna pt-2 pb-4 \".concat(isLastElement, \"\\\">\\n\\t\\t\\t\\t\\t<h4 class=\\\"mb-0\\\">\").concat(question.asker.display_name, \"</h4>\\n\\t\\t\\t\\t\\t<p class=\\\"font-size-sm mb-0\\\">Verified Reviewer</p>\\n\\t\\t\\t\\t\\t<p class=\\\"font-size-sm ml-auto\\\">\").concat(formatDate(question.created_at), \"</p>\\n\\t\\t\\t\\t\\t<p class=\\\"font-weight-bold\\\">Q: \").concat(question.content, \"</p>\\n\\t\\t\\t\\t\\t\").concat(answerTemplate, \"\\n\\t\\t\\t\\t</div>\");\n        $('.yotpo__tab-qna').append(qnaTemplate);\n      });\n    }\n  });\n}); // topics filter\n\n$('.yotpo__tags').on('click', '.badge', function (e) {\n  e.preventDefault();\n\n  if ($(this).data('name') !== '') {\n    $('.yotpo__tags').find('.badge').removeClass('active');\n    $(this).addClass('active');\n    ajaxPost();\n  }\n});\n$('.yotpo__filter').on('change', function () {\n  ajaxPost();\n});\n$('.yotpo__filter-form').on('submit', function (e) {\n  e.preventDefault();\n  ajaxPost();\n});\n$('.yotpo__filter-form .input-group-append').on('click', function () {\n  if ($('#yotpo__free-text').val() === '') {\n    return false;\n  }\n\n  ajaxPost();\n  return true;\n}); // lightbox\n\n$('#yotpoImageModal').on('shown.bs.modal', function (event) {\n  var triggerBtn = $(event.relatedTarget);\n  var imgElem = triggerBtn.closest('.yotpo__images');\n  var yotpoReviewID = imgElem.attr('data-review-id');\n  var imgs = [];\n  var imgsTag = '';\n  imgElem.find('img').each(function (i, obj) {\n    imgs[i] = $(obj).attr('data-original');\n    imgsTag += \"<img src=\\\"\".concat(imgs[i], \"\\\" alt=\\\"Slide \").concat(i, \"\\\" class=\\\"d-block w-100\\\" >\");\n  });\n  $('.yotpo__modal-carousel').html('');\n\n  if (imgs.length === 1) {\n    $('.yotpo__modal-carousel').append(imgsTag);\n  } else {\n    // build carousel\n    var carouselSlide = '';\n\n    for (var i = 0; i <= imgs.length - 1; i += 1) {\n      carouselSlide += \"<div class=\\\"carousel-item \".concat(i === 0 ? 'active' : '', \"\\\"><img src=\\\"\").concat(imgs[i], \"\\\" alt=\\\"Slide \").concat(i + 1, \"\\\" class=\\\"d-block w-100\\\"></div>\");\n    }\n\n    var carouselHtml = \"<div id=\\\"carouselYotpoImage\\\" class=\\\"carousel slide\\\" data-ride=\\\"carousel\\\">\\n\\t\\t<div class=\\\"carousel-inner\\\">\\n\\t\\t\".concat(carouselSlide, \"\\n\\t\\t</div></div>\\n\\t\\t<a class=\\\"carousel-control-prev text-secondary sni sni__chevron-prev\\\" href=\\\"#carouselYotpoImage\\\" role=\\\"button\\\" data-slide=\\\"prev\\\">\\n\\t\\t\\t<span class=\\\"sr-only\\\">Previous</span>\\n\\t\\t</a>\\n\\t\\t<a class=\\\"carousel-control-next text-secondary sni sni__chevron-next\\\" href=\\\"#carouselYotpoImage\\\" role=\\\"button\\\" data-slide=\\\"next\\\">\\n\\t\\t\\t<span class=\\\"sr-only\\\">Next</span>\\n\\t\\t</a>\");\n    $('.yotpo__modal-carousel').append(carouselHtml);\n  }\n\n  $.get(\"https://api.yotpo.com/reviews/\".concat(yotpoReviewID), function (data) {\n    if (data.status.code === 200) {\n      var stars = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.buildStars)(data.response.review.score);\n      $('.yotpo__modal-name').html(data.response.review.user.display_name);\n\n      if (data.response.review.verified_buyer) {\n        $('.yotpo__modal-verified').removeClass('d-none');\n      }\n\n      $('.yotpo__modal-created').html(formatDate(data.response.review.created_at));\n      $('.yotpo__modal-title').html(data.response.review.title);\n      $('.yotpo__modal-content').html(data.response.review.content);\n      $('.yotpo__likes .sni__thumbs-up').html(data.response.review.votes_up);\n      $('.yotpo__likes .sni__thumbs-down').html(data.response.review.votes_down);\n      $('.yotpo__modal-score').html(stars);\n      $('.yotpo__likes').attr('data-id', yotpoReviewID);\n    }\n  });\n}); // submit review\n\n$('#yotpo__review-submit').on('click', function () {\n  $(this).closest('.yotpo__review-fields').find('small').addClass('d-none');\n  var score = $('#yotpoFormScore').val();\n  var title = $('#yotpoFormTitle');\n  var review = $('#yotpoFormReview');\n  var custom24600 = $('input[name=\"--24600\"]:checked').val();\n  var custom24602 = $('input[name=\"--24602\"]:checked').val();\n  var custom24601 = $('.yotpo__review-fields input[name=\"--24601\"]');\n  var emailField = $('#yotpoReviewEmail');\n  var usernameField = $('#yotpoReviewName');\n  var valid = true;\n\n  if (title.val() === '') {\n    title.parent().find('small').text('Title Field Required');\n    title.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (review.val() === '') {\n    review.parent().find('small').text('Title Field Required');\n    review.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateEmail)(emailField.val())) {\n    emailField.parent().find('small').text('Invalid Email');\n    emailField.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (emailField.val() === '') {\n    emailField.parent().find('small').text('Email Field Required');\n    emailField.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (usernameField.val() === '') {\n    usernameField.parent().find('small').text('Username Field Required');\n    usernameField.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (!valid) {\n    return false;\n  } // submit to dev store\n\n\n  var formData = {\n    appkey: devKey,\n    sku: devId,\n    product_title: productTitle,\n    product_image_url: '//cdn.shopify.com/s/files/1/0093/6096/5717/products/SS_Web_APCPFM_Ecom_Carousel_900x1121_SB_290820_large.jpg%3Fv=1611892289',\n    product_url: productUrl,\n    product_description: productDesc,\n    display_name: usernameField.val(),\n    email: emailField.val(),\n    review_content: review.val(),\n    review_title: title.val(),\n    review_score: score\n  };\n\n  if (custom24601.length > 0) {\n    formData.custom_fields = {};\n    var val24601 = [];\n    custom24601.each(function (k, obj) {\n      if ($(obj).is(':checked')) {\n        val24601[k] = true;\n      } else {\n        val24601[k] = 'empty';\n      }\n    });\n    formData.custom_fields['--24601'] = val24601.join(' ');\n  }\n\n  if (custom24600 !== '' && typeof custom24600 !== 'undefined') {\n    formData.custom_fields['--24600'] = custom24600;\n  }\n\n  if (custom24602 !== '' && typeof custom24602 !== 'undefined') {\n    formData.custom_fields['--24602'] = custom24602;\n  }\n\n  $.ajax({\n    crossDomain: true,\n    dataType: 'json',\n    url: 'https://api.yotpo.com/v1/widget/reviews',\n    contentType: 'application/json',\n    type: 'POST',\n    headers: {\n      'content-type': 'application/json',\n      'cache-control': 'no-cache'\n    },\n    processData: false,\n    data: JSON.stringify(formData)\n  }).done(function () {\n    $('.yotpo__review-fields').addClass('d-none');\n    $('.yotpo__review-success').removeClass('d-none');\n  });\n  return false;\n}); // submit question\n\n$('#yotpo__question-submit').on('click', function () {\n  var valid = true;\n  var emailField = $('#yotpoQuestionEmail');\n  var usernameField = $('#yotpoQuestionName');\n  var questionField = $('#yotpoFormQuestion');\n  $(this).closest('.yotpo__question-fields').find('small').addClass('d-none');\n\n  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateEmail)(emailField.val())) {\n    emailField.parent().find('small').text('Invalid Email');\n    emailField.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (emailField.val() === '') {\n    emailField.parent().find('small').text('Email Field Required');\n    emailField.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (usernameField.val() === '') {\n    usernameField.parent().find('small').text('Username Field Required');\n    usernameField.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (questionField.val() === '') {\n    questionField.parent().find('small').text('Question field required');\n    questionField.parent().find('small').removeClass('d-none');\n    valid = false;\n  }\n\n  if (!valid) {\n    return false;\n  }\n\n  var questionData = {\n    review_content: questionField.val(),\n    display_name: usernameField.val(),\n    email: emailField.val(),\n    appkey: devKey,\n    sku: devId,\n    product_title: productTitle,\n    product_url: productUrl,\n    product_description: productDesc,\n    product_image_url: '//cdn.shopify.com/s/files/1/0093/6096/5717/products/SS_Web_APCPFM_Ecom_Carousel_900x1121_SB_290820_large.jpg%3Fv=1611892289',\n    prevent_duplicate_review: true\n  };\n  $.ajax({\n    crossDomain: true,\n    dataType: 'json',\n    url: '//api.yotpo.com/questions/send_confirmation_mail',\n    contentType: 'application/json',\n    type: 'POST',\n    headers: {\n      'content-type': 'application/json',\n      'cache-control': 'no-cache'\n    },\n    processData: false,\n    data: JSON.stringify(questionData),\n    complete: function complete() {\n      $('.yotpo__question-fields').addClass('d-none');\n      $('.yotpo__question-success').removeClass('d-none');\n    }\n  }).done(function () {\n    $('.yotpo__question-fields').addClass('d-none');\n    $('.yotpo__question-success').removeClass('d-none');\n  });\n  return false;\n});\nvar voteSession = window.localStorage.getItem('vote_session') ? JSON.parse(window.localStorage.getItem('vote_session')) : [];\n\nvar voteitem = function voteitem(elem) {\n  var type = elem.data('type');\n  var endPoint = elem.closest('.yotpo__likes').data('vote');\n  var id = elem.closest('.yotpo__likes').data('id');\n  var txtNum = Number(elem.text());\n\n  if (endPoint === 'review') {\n    // vote review\n    if (elem.hasClass('yotpo__likes-disabled')) {\n      // undo action\n      elem.text(txtNum - 1);\n      elem.removeClass('yotpo__likes-disabled');\n      $.post(\"https://api.yotpo.com/reviews/\".concat(id, \"/vote/\").concat(type, \"/true\"), function () {\n        elem.text(txtNum - 1);\n        return true;\n      });\n      var removeIndex = voteSession.map(function (item) {\n        return item.id;\n      }).indexOf(id);\n      voteSession.splice(removeIndex, 1);\n    } else {\n      // post action\n      $.post(\"https://api.yotpo.com/reviews/\".concat(id, \"/vote/\").concat(type), function () {\n        elem.text(txtNum + 1);\n        return true;\n      });\n      elem.text(txtNum + 1);\n      elem.addClass('yotpo__likes-disabled');\n      voteSession.push({\n        id: id,\n        type: type,\n        store: store\n      });\n    }\n  } else {\n    // vote answer\n    if (elem.hasClass('yotpo__likes-disabled')) {\n      return false;\n    }\n\n    elem.text(txtNum + 1);\n    elem.addClass('yotpo__likes-disabled');\n    $.post(\"https://api.yotpo.com/answers/\".concat(id, \"/vote/\").concat(type), function () {\n      elem.text(txtNum + 1);\n      return true;\n    });\n    voteSession.push({\n      id: id,\n      type: type,\n      store: store\n    });\n  }\n\n  window.localStorage.setItem('vote_session', JSON.stringify(voteSession));\n  return true;\n}; // vote handler\n\n\n$('.yotpo__product').on('click', '.yotpo__likes .sni', function () {\n  voteitem($(this));\n}); // scroll to review section\n\n$(document).on('click', '.yotpo__stars .text-m', function () {\n  $('html, body').animate({\n    scrollTop: $('.yotpo__review').offset().top\n  }, 500);\n});\n\n//# sourceURL=webpack://sandandsky-styleguides/./src/js/modules/yotpo-product.js?");

/***/ })

}]);