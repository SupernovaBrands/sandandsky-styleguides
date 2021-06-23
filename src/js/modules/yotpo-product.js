const yotpoProduct = $('.yotpo__product');
const appKey = yotpoProduct.data('key');
const productId = yotpoProduct.data('product');

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
			<div class="d-flex justify-content-end align-items-center mt-3 yotpo__likes" data-id="${review.id}">
				<p class="font-size-sm mr-1 mb-0">Was this review helpful?</p>
				<span class="font-size-sm sni sni__thumbs-up align-items-center mx-1">${review.votes_up}</span>
				<span class="font-size-sm sni sni__thumbs-down align-items-center ml-1">${review.votes_down}</span>
			</div>
		</div></div>`;
		$('.yotpo__review').append(yotpoReviewTemplate);
	});
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
		return;
	}

	$('.yotpo__total-reviews').html(pagination.total);
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

const ajaxPost = (page = null) => {
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
		$('.yotpo__total-reviews').html(response.response.pagination.total);
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
	$('.yotpo__total-reviews').text(data.response.bottomline.total_review);
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
	$.get(`https://api.yotpo.com/products/${appKey}/${productId}/questions.json`, function (data) {
		if (data.response.questions.length > 0) {
			$('.yotpo__tab-qna').html('');
			$.each(data.response.questions, function (k, question) {
				const isLastElement = k === data.response.questions.length - 1 ? '' : 'border-bottom';
				let answerTemplate = '';
				if (question.sorted_public_answers.length > 0) {
					$.each(question.sorted_public_answers, function (l, answers) {
						answerTemplate += `<p class="font-size-sm">Answer (${question.sorted_public_answers.length})</p><div class="yotpo__review-answer ml-4 mt-3 border-left pl-3">
							<h4 class="mb-0">Store Owner</h4>
							<p class="font-size-sm">${formatDate(answers.created_at)}</p>
							<p class="mt-2">A: ${answers.content}</p>
							<div class="d-flex justify-content-end align-items-center mt-3 yotpo__likes" data-id="${answers.id}">
								<p class="font-size-sm mr-1 mb-0">Was This Answer Helpful?</p>
								<span class="font-size-sm sni sni__thumbs-up align-items-center mx-1">${answers.votes_up}</span>
								<span class="font-size-sm sni sni__thumbs-down align-items-center ml-1">${answers.votes_down}</span>
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
	}
	ajaxPost();
});

$('.yotpo__filter').on('change', function () {
	ajaxPost();
});

$('.yotpo__filter-form').on('submit', function (e) {
	e.preventDefault();
	ajaxPost();
});

// lightbox
$('#yotpoImageModal').on('shown.bs.modal', function (event) {
	const triggerBtn = $(event.relatedTarget);
	const imgElem = triggerBtn.closest('.yotpo__images');
	const yotpoReviewID = imgElem.attr('data-review-id');
	const imgs = [];
	imgElem.find('img').each(function (i, obj) {
		imgs[i] = $(obj).attr('data-original');
	});

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
		}
	});
});
