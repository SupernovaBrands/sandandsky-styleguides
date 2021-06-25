window.validateEmail = function (t) {
	// eslint-disable-next-line no-useless-escape
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase());
};

const yotpoProduct = $('.yotpo__product');
const appKey = yotpoProduct.data('key');
const productId = yotpoProduct.data('product');
const productTitle = yotpoProduct.data('product-title');
const productUrl = yotpoProduct.data('product-url');
const devKey = yotpoProduct.data('dev-key');
const devId = yotpoProduct.data('dev-id');
const productDesc = yotpoProduct.data('desc');
const store = 'dev';

const checkFilterParams = () => {
	const params = {
		domain_key: productId,
	};
	const crfs = [];
	if ($('#yotpo__free-text').val() !== '') {
		params.free_text_search = $('#yotpo__free-text').val();
	}
	if ($('.yotpo__tags').find('.active').length > 0) {
		params.topic_names = [$('.yotpo__tags').find('.active').data('name')];
	}
	if ($('.yotpo__filter-rating').val() !== '') {
		params.scores = [$('.yotpo__filter-rating').val()];
	}
	if ($('.yotpo__filter-picture').val() !== '') {
		params.pictured = true;
	}
	if ($('.yotpo__filter-type').val() !== '') {
		crfs.push({
			question_id: Number($('.yotpo__filter-type').data('qid')),
			answers: [$('.yotpo__filter-type').val()],
		});
	}
	if ($('.yotpo__filter-age').val() !== '') {
		crfs.push({
			question_id: Number($('.yotpo__filter-age').data('qid')),
			answers: [$('.yotpo__filter-age').val()],
		});
	}
	if ($('.yotpo__filter-concern').val() !== '') {
		crfs.push({
			question_id: Number($('.yotpo__filter-concern').data('qid')),
			answers: [$('.yotpo__filter-concern').val()],
		});
	}
	if (crfs.length > 0) {
		params.crfs = crfs;
	}
	return params;
};

const buildStars = (score) => {
	const fullStars = score;
	const hollowStars = 5 - fullStars;
	let stars = '';
	for (let s = 1; s <= fullStars; s += 1) {
		stars += '<i class="sni sni__star-full"></i>';
	}
	for (let t = 1; t <= hollowStars; t += 1) {
		stars += '<i class="sni sni__star-hollow"></i>';
	}
	return stars;
};

const formatDate = (serverDate) => {
	const d = new Date(serverDate);
	let month = (d.getMonth() + 1);
	let day = d.getDate();
	const year = d.getFullYear();
	if (month.length < 2) {
		month = `0${month}`;
	}
	if (day.length < 2) {
		day = `0${day}`;
	}
	return [day, month, year].join('/');
};

const renderReviews = (reviews) => {
	$('.yotpo__review').html('');
	const voteSession = window.localStorage.getItem('vote_session') ? JSON.parse(window.localStorage.getItem('vote_session')) : [];
	$.each(reviews, function (k, review) {
		const verifiedBuyer = review.verified_buyer ? 'sni__verified' : '';
		const verifiedBuyerLabel = '<p class="font-size-sm mb-0">Verified buyer</p>';

		// custom fields
		let customFields = '';
		if (review.custom_fields) {
			$.each(review.custom_fields, function (key, field) {
				customFields += `<p class="font-size-sm"><strong>${field.title}:</strong><span class="ml-1">${field.value}</span></p>`;
			});
		}

		// media image
		let mediaImages = '';
		if (review.images_data && review.images_data.length > 0) {
			mediaImages += `<div class="yotpo__images d-flex flex-nowrap row w-auto overflow-auto px-lg-2" data-review-id="${review.id}">`;
			$.each(review.images_data, function (k2, image) {
				mediaImages += `<a href="#" class="d-inline-block mx-1 mb-g" data-toggle="modal" data-target="#yotpoImageModal"><img data-original="${image.original_url.replace('https:', '')}" src="${image.thumb_url.replace('https:', '')}" alt="Image Review of ${review.user.display_name}"></a>`;
			});
			mediaImages += '</div>';
		}

		const filteredVoteUp = voteSession.filter(function (obj) {
			return obj.id === review.id && obj.store === store && obj.type === 'up';
		});
		const filteredVoteDown = voteSession.filter(function (obj) {
			return obj.id === review.id && obj.store === store && obj.type === 'down';
		});
		const voteupDisabled = filteredVoteUp.length > 0 ? 'yotpo__likes-disabled' : '';
		const votedownDisabled = filteredVoteDown.length > 0 ? 'yotpo__likes-disabled' : '';

		// build stars
		const stars = buildStars(review.score);
		const yotpoReviewTemplate = `<div class="yotpo__review-content border-bottom py-3 row">
		<div class="col-lg-3">
			<h4 class="mb-0 sni-after align-items-center yotpo__review-author ${verifiedBuyer} ">${review.user.display_name}</h4>
			${verifiedBuyerLabel}
			<p class="font-size-sm mb-3">${formatDate(review.created_at)}</p>
			${customFields}
		</div>
		<div class="col-lg-9">
			<div class="d-flex text-secondary mt-3 mt-lg-0">${stars}</div>
			<h4 class="mb-3 mt-2">${review.title}</h4>
			<p class="mb-3">${review.content}</p>
			${mediaImages}
			<div class="d-flex justify-content-end align-items-center mt-3 yotpo__likes" data-id="${review.id}" data-vote="review">
				<p class="font-size-sm mr-1 mb-0">Was this review helpful?</p>
				<span data-type="up" class="font-size-sm sni sni__thumbs-up align-items-center mx-1 ${voteupDisabled}">${review.votes_up}</span>
				<span data-type="down" class="font-size-sm sni sni__thumbs-down align-items-center ml-1 ${votedownDisabled}">${review.votes_down}</span>
			</div>
		</div></div>`;
		$('.yotpo__review').append(yotpoReviewTemplate);
	});
	$('.yotpo__filter-form').removeClass('d-none');
};

const renderPagination = (pagination) => {
	$('.yotpo__pagination').addClass('d-flex').removeClass('d-none').html('');
	$('.yotpo__offset').removeClass('d-none');
	const currPage = pagination.page;
	const totalPage = Math.ceil(pagination.total / pagination.per_page);

	const pageStart = (currPage - 4 < 1) ? 1 : currPage - 4;
	let pageEnd = (currPage + 4 > 9) ? currPage + 4 : 9;
	pageEnd = (totalPage < 9) ? totalPage : pageEnd;
	pageEnd = (pageEnd > totalPage) ? totalPage : pageEnd;

	if (pageEnd <= 1) {
		$('.yotpo__offset strong').html(`${(pagination.per_page * (currPage - 1)) + 1} - ${pagination.total}`);
		return;
	}

	$('.yotpo__total-reviews').html(`${pagination.total} ${(pagination.total > 1) ? 'Reviews' : 'Review'}`);
	let active;
	let paginationHtml = '';
	if (currPage > 1) {
		paginationHtml += `<li><a href="#" data-page="${currPage - 1}" class="px-1 text-body sni sni__chevron-prev"></a></li>`;
	}
	for (let i = pageStart; i <= pageEnd; i += 1) {
		active = i === currPage ? 'font-weight-bold text-secondary' : 'text-body';
		paginationHtml += `<li><a href="#" data-page="${i}" class="px-1 ${active}">${i}</a></li>`;
	}
	if (currPage < totalPage) {
		paginationHtml += `<li><a href="#" data-page="${currPage + 1}" class="px-1 pr-lg-0 text-body sni sni__chevron-next"></a></li>`;
	}

	const offsetMax = pagination.per_page * currPage;
	const offsetEnd = (offsetMax > pagination.total) ? pagination.total : offsetMax;

	$('.yotpo__pagination').html(paginationHtml);
	$('.yotpo__offset strong').html(`${(pagination.per_page * (currPage - 1)) + 1} - ${offsetEnd}`);
};

const showLoader = () => {
	$('.yotpo__review').html('');
	$('.yotpo__review').append('<div class="text-center"><div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div></div>');
};

const ajaxPost = (page = null) => {
	showLoader();
	const filterParams = checkFilterParams();
	if (page !== null) {
		filterParams.page = page;
	}
	$.ajax({
		crossDomain: true,
		contentType: 'application/json',
		url: `https://api.yotpo.com/v1/reviews/${appKey}/filter.json`,
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'cache-control': 'no-cache',
		},
		processData: false,
		data: JSON.stringify(filterParams),
	}).done(function (response) {
		$('.yotpo__total-reviews').html(`${response.response.pagination.total} ${(response.response.pagination.total > 1) ? 'Reviews' : 'Review'}`);
		if (response.response.reviews.length > 0) {
			renderPagination(response.response.pagination);
			renderReviews(response.response.reviews);
		} else {
			$('.yotpo__offset').addClass('d-none');
			$('.yotpo__pagination').removeClass('d-flex').addClass('d-none');
			$('.yotpo__review').html('');
			$('.yotpo__review').html('<p class="text-center">Sorry, no reviews match your criteria. Clear or modify your filters and try again.<p>');
		}
	});
};

// Build topics tag
$.post(`https://api.yotpo.com/v1/topic/${appKey}/topics.json`, { domain_key: productId }, function (data) {
	const tagLength = data.response.top_topics.top_mention_topics.length;
	const maxTags = tagLength < 24 ? tagLength : 24;
	for (let i = 0; i <= maxTags - 1; i += 1) {
		const hideTag = (i > 5) ? 'd-none' : '';
		const tagname = data.response.top_topics.top_mention_topics[i].name;
		const tag = `<a href="#" class="badge badge-gray font-size-sm mr-2 mb-2 text-capitalize ${hideTag}" data-name="${tagname}">${tagname}</a>`;
		$('.yotpo__tags').append(tag);
	}
	// append ellipsis
	$('.yotpo__tags').append('<a href="#" class="badge badge-gray font-size-sm mr-2 mb-2 yotpo__tags-expand" data-name="">...</a>');
});

// Initial build
$.get(`https://api.yotpo.com/v1/widget/${appKey}/products/${productId}/reviews.json`, { page: 1 }, function (data) {
	const avg = Math.round(data.response.bottomline.average_score * 10) / 10;
	$('.yotpo__avg-score').text(avg);
	$('.yotpo__avg-score-label').text('Average rating');
	$('.yotpo__total-reviews').text(`${data.response.bottomline.total_review} ${(data.response.bottomline.total_review > 1) ? 'Reviews' : 'Review'}`);
	$('.yotpo__stars').removeClass('d-none').addClass('d-flex');
	if (data.response.reviews.length > 0) {
		renderPagination(data.response.pagination);
		renderReviews(data.response.reviews);
	}
});

// Pagination handle
$('.yotpo__pagination').on('click', 'a', function (e) {
	e.preventDefault();
	const filterParams = checkFilterParams();
	if (Object.keys(filterParams).length > 0) {
		ajaxPost($(this).data('page'));
	} else {
		$.get(`https://api.yotpo.com/v1/widget/${appKey}/products/${productId}/reviews.json`, { page: $(this).attr('data-page') }, function (data) {
			if (data.response.reviews.length > 0) {
				renderPagination(data.response.pagination);
				renderReviews(data.response.reviews);
			}
		});
	}
});

$('.yotpo__tags').on('click', '.yotpo__tags-expand', function (e) {
	e.preventDefault();
	$(this).closest('.yotpo__tags').find('.badge-gray.d-none').removeClass('d-none');
	$(this).addClass('d-none');
});

// QA tabs, call QA api
$('.yotpo__tab-question').on('click', function () {
	const voteSession = window.localStorage.getItem('vote_session') ? JSON.parse(window.localStorage.getItem('vote_session')) : [];
	$.get(`https://api.yotpo.com/products/${appKey}/${productId}/questions.json`, function (data) {
		if (data.response.questions.length > 0) {
			$('.yotpo__tab-qna').html('');
			$.each(data.response.questions, function (k, question) {
				const isLastElement = k === data.response.questions.length - 1 ? '' : 'border-bottom';
				let answerTemplate = '';
				if (question.sorted_public_answers.length > 0) {
					$.each(question.sorted_public_answers, function (l, answers) {
						const filteredVoteUp = voteSession.filter(function (obj) {
							return obj.id === answers.id && obj.store === store && obj.type === 'up';
						});
						const filteredVoteDown = voteSession.filter(function (obj) {
							return obj.id === answers.id && obj.store === store && obj.type === 'down';
						});
						const voteupDisabled = filteredVoteUp.length > 0 ? 'yotpo__likes-disabled' : '';
						const votedownDisabled = filteredVoteDown.length > 0 ? 'yotpo__likes-disabled' : '';

						answerTemplate += `<p class="font-size-sm">Answer (${question.sorted_public_answers.length})</p><div class="yotpo__review-answer ml-4 mt-3 border-left pl-3">
							<h4 class="mb-0">Store Owner</h4>
							<p class="font-size-sm">${formatDate(answers.created_at)}</p>
							<p class="mt-2">A: ${answers.content}</p>
							<div class="d-flex justify-content-end align-items-center mt-3 yotpo__likes" data-id="${answers.id}" data-vote="answer">
								<p class="font-size-sm mr-1 mb-0">Was This Answer Helpful?</p>
								<span data-type="up" class="font-size-sm sni sni__thumbs-up align-items-center mx-1 ${voteupDisabled}">${answers.votes_up}</span>
								<span data-type="down" class="font-size-sm sni sni__thumbs-down align-items-center ml-1 ${votedownDisabled}">${answers.votes_down}</span>
							</div>
						</div>`;
					});
				}
				const qnaTemplate = `<div class="yotpo__review-qna pt-2 pb-4 ${isLastElement}">
					<h4 class="mb-0">${question.asker.display_name}</h4>
					<p class="font-size-sm mb-0">Verified Reviewer</p>
					<p class="font-size-sm ml-auto">${formatDate(question.created_at)}</p>
					<p class="font-weight-bold">Q: ${question.content}</p>
					${answerTemplate}
				</div>`;
				$('.yotpo__tab-qna').append(qnaTemplate);
			});
		}
	});
});

// topics filter
$('.yotpo__tags').on('click', '.badge', function (e) {
	e.preventDefault();
	if ($(this).data('name') !== '') {
		$('.yotpo__tags').find('.badge').removeClass('active');
		$(this).addClass('active');
		ajaxPost();
	}
});

$('.yotpo__filter').on('change', function () {
	ajaxPost();
});

$('.yotpo__filter-form').on('submit', function (e) {
	e.preventDefault();
	ajaxPost();
});

$('.yotpo__filter-form .input-group-append').on('click', function () {
	if ($('#yotpo__free-text').val() === '') {
		return false;
	}
	ajaxPost();
	return true;
});

// lightbox
$('#yotpoImageModal').on('shown.bs.modal', function (event) {
	const triggerBtn = $(event.relatedTarget);
	const imgElem = triggerBtn.closest('.yotpo__images');
	const yotpoReviewID = imgElem.attr('data-review-id');
	const imgs = [];
	let imgsTag = '';
	imgElem.find('img').each(function (i, obj) {
		imgs[i] = $(obj).attr('data-original');
		imgsTag += `<img src="${imgs[i]}" alt="Slide ${i}" class="d-block w-100" >`;
	});

	$('.yotpo__modal-carousel').html('');
	if (imgs.length === 1) {
		$('.yotpo__modal-carousel').append(imgsTag);
	} else {
		// build carousel
		let carouselSlide = '';
		for (let i = 0; i <= imgs.length - 1; i += 1) {
			carouselSlide += `<div class="carousel-item ${(i === 0) ? 'active' : ''}"><img src="${imgs[i]}" alt="Slide ${i + 1}" class="d-block w-100"></div>`;
		}
		const carouselHtml = `<div id="carouselYotpoImage" class="carousel slide" data-ride="carousel">
		<div class="carousel-inner">
		${carouselSlide}
		</div></div>
		<a class="carousel-control-prev text-secondary sni sni__chevron-prev" href="#carouselYotpoImage" role="button" data-slide="prev">
			<span class="sr-only">Previous</span>
		</a>
		<a class="carousel-control-next text-secondary sni sni__chevron-next" href="#carouselYotpoImage" role="button" data-slide="next">
			<span class="sr-only">Next</span>
		</a>`;
		$('.yotpo__modal-carousel').append(carouselHtml);
	}

	$.get(`https://api.yotpo.com/reviews/${yotpoReviewID}`, function (data) {
		if (data.status.code === 200) {
			const stars = buildStars(data.response.review.score);
			$('.yotpo__modal-name').html(data.response.review.user.display_name);
			if (data.response.review.verified_buyer) {
				$('.yotpo__modal-verified').removeClass('d-none');
			}
			$('.yotpo__modal-created').html(formatDate(data.response.review.created_at));
			$('.yotpo__modal-title').html(data.response.review.title);
			$('.yotpo__modal-content').html(data.response.review.content);
			$('.yotpo__likes .sni__thumbs-up').html(data.response.review.votes_up);
			$('.yotpo__likes .sni__thumbs-down').html(data.response.review.votes_down);
			$('.yotpo__modal-score').html(stars);
			$('.yotpo__likes').attr('data-id', yotpoReviewID);
		}
	});
});

// submit review
$('#yotpo__review-submit').on('click', function () {
	$(this).closest('.yotpo__review-fields').find('small').addClass('d-none');
	const score = $('#yotpoFormScore').val();
	const title = $('#yotpoFormTitle');
	const review = $('#yotpoFormReview');
	const custom24600 = $('input[name="--24600"]:checked').val();
	const custom24602 = $('input[name="--24602"]:checked').val();
	const custom24601 = $('.yotpo__review-fields input[name="--24601"]');
	const emailField = $('#yotpoReviewEmail');
	const usernameField = $('#yotpoReviewName');

	let valid = true;

	if (title.val() === '') {
		title.parent().find('small').text('Title Field Required');
		title.parent().find('small').removeClass('d-none');
		valid = false;
	}
	if (review.val() === '') {
		review.parent().find('small').text('Title Field Required');
		review.parent().find('small').removeClass('d-none');
		valid = false;
	}
	if (!window.validateEmail(emailField.val())) {
		emailField.parent().find('small').text('Invalid Email');
		emailField.parent().find('small').removeClass('d-none');
		valid = false;
	}
	if (emailField.val() === '') {
		emailField.parent().find('small').text('Email Field Required');
		emailField.parent().find('small').removeClass('d-none');
		valid = false;
	}
	if (usernameField.val() === '') {
		usernameField.parent().find('small').text('Username Field Required');
		usernameField.parent().find('small').removeClass('d-none');
		valid = false;
	}

	if (!valid) {
		return false;
	}

	// submit to dev store
	const formData = {
		appkey: devKey,
		sku: devId,
		product_title: productTitle,
		product_image_url: '//cdn.shopify.com/s/files/1/0093/6096/5717/products/SS_Web_APCPFM_Ecom_Carousel_900x1121_SB_290820_large.jpg%3Fv=1611892289',
		product_url: productUrl,
		product_description: productDesc,
		display_name: usernameField.val(),
		email: emailField.val(),
		review_content: review.val(),
		review_title: title.val(),
		review_score: score,
	};

	if (custom24601.length > 0) {
		formData.custom_fields = {};
		const val24601 = [];
		custom24601.each(function (k, obj) {
			if ($(obj).is(':checked')) {
				val24601[k] = true;
			} else {
				val24601[k] = 'empty';
			}
		});
		formData.custom_fields['--24601'] = val24601.join(' ');
	}

	if (custom24600 !== '' && typeof custom24600 !== 'undefined') {
		formData.custom_fields['--24600'] = custom24600;
	}

	if (custom24602 !== '' && typeof custom24602 !== 'undefined') {
		formData.custom_fields['--24602'] = custom24602;
	}

	$.ajax({
		crossDomain: true,
		dataType: 'json',
		url: 'https://api.yotpo.com/v1/widget/reviews',
		contentType: 'application/json',
		type: 'POST',
		headers: {
			'content-type': 'application/json',
			'cache-control': 'no-cache',
		},
		processData: false,
		data: JSON.stringify(formData),
	}).done(function () {
		$('.yotpo__review-fields').addClass('d-none');
		$('.yotpo__review-success').removeClass('d-none');
	});

	return false;
});

// submit question
$('#yotpo__question-submit').on('click', function () {
	let valid = true;
	const emailField = $('#yotpoQuestionEmail');
	const usernameField = $('#yotpoQuestionName');
	const questionField = $('#yotpoFormQuestion');

	$(this).closest('.yotpo__question-fields').find('small').addClass('d-none');

	if (!window.validateEmail(emailField.val())) {
		emailField.parent().find('small').text('Invalid Email');
		emailField.parent().find('small').removeClass('d-none');
		valid = false;
	}
	if (emailField.val() === '') {
		emailField.parent().find('small').text('Email Field Required');
		emailField.parent().find('small').removeClass('d-none');
		valid = false;
	}
	if (usernameField.val() === '') {
		usernameField.parent().find('small').text('Username Field Required');
		usernameField.parent().find('small').removeClass('d-none');
		valid = false;
	}
	if (questionField.val() === '') {
		questionField.parent().find('small').text('Question field required');
		questionField.parent().find('small').removeClass('d-none');
		valid = false;
	}

	if (!valid) {
		return false;
	}

	const questionData = {
		review_content: questionField.val(),
		display_name: usernameField.val(),
		email: emailField.val(),
		appkey: devKey,
		sku: devId,
		product_title: productTitle,
		product_url: productUrl,
		product_description: productDesc,
		product_image_url: '//cdn.shopify.com/s/files/1/0093/6096/5717/products/SS_Web_APCPFM_Ecom_Carousel_900x1121_SB_290820_large.jpg%3Fv=1611892289',
		prevent_duplicate_review: true,
	};

	$.ajax({
		crossDomain: true,
		dataType: 'json',
		url: '//api.yotpo.com/questions/send_confirmation_mail',
		contentType: 'application/json',
		type: 'POST',
		headers: {
			'content-type': 'application/json',
			'cache-control': 'no-cache',
		},
		processData: false,
		data: JSON.stringify(questionData),
		complete: () => {
			$('.yotpo__question-fields').addClass('d-none');
			$('.yotpo__question-success').removeClass('d-none');
		},
	}).done(function () {
		$('.yotpo__question-fields').addClass('d-none');
		$('.yotpo__question-success').removeClass('d-none');
	});

	return false;
});

const voteSession = (window.localStorage.getItem('vote_session')) ? JSON.parse(window.localStorage.getItem('vote_session')) : [];
const voteitem = (elem) => {
	const type = elem.data('type');
	const endPoint = elem.closest('.yotpo__likes').data('vote');
	const id = elem.closest('.yotpo__likes').data('id');
	const txtNum = Number(elem.text());

	if (endPoint === 'review') {
		// vote review
		if (elem.hasClass('yotpo__likes-disabled')) {
			// undo action
			elem.text(txtNum - 1);
			elem.removeClass('yotpo__likes-disabled');
			$.post(`https://api.yotpo.com/reviews/${id}/vote/${type}/true`, function () {
				elem.text(txtNum - 1);
				return true;
			});
			const removeIndex = voteSession.map((item) => item.id).indexOf(id);
			voteSession.splice(removeIndex, 1);
		} else {
			// post action
			$.post(`https://api.yotpo.com/reviews/${id}/vote/${type}`, function () {
				elem.text(txtNum + 1);
				return true;
			});
			elem.text(txtNum + 1);
			elem.addClass('yotpo__likes-disabled');
			voteSession.push({
				id,
				type,
				store,
			});
		}
	} else {
		// vote answer
		if (elem.hasClass('yotpo__likes-disabled')) {
			return false;
		}
		elem.text(txtNum + 1);
		elem.addClass('yotpo__likes-disabled');
		$.post(`https://api.yotpo.com/answers/${id}/vote/${type}`, function () {
			elem.text(txtNum + 1);
			return true;
		});
		voteSession.push({
			id,
			type,
			store,
		});
	}
	window.localStorage.setItem('vote_session', JSON.stringify(voteSession));
	return true;
};

// vote handler
$('.yotpo__product').on('click', '.yotpo__likes .sni', function () {
	voteitem($(this));
});
