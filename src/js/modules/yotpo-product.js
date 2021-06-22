const yotpoProduct = $('.yotpo__product');
const appKey = yotpoProduct.data('key');
const productId = yotpoProduct.data('product');

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

// loop trough reviews response
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
		if (review.images_data.length > 0) {
			mediaImages += '<div class="yotpo__images d-flex flex-nowrap row w-auto overflow-auto px-lg-2">';
			$.each(review.images_data, function (k2, image) {
				mediaImages += `<a href="#" class="d-inline-block mx-1 mb-g"><img src="${image.thumb_url.replace('https:', '')}" alt="Image Review of ${review.user.display_name}"></a>`;
			});
			mediaImages += '</div>';
		}

		const yotpoReviewTemplate = `<div class="yotpo__review-content border-bottom py-3 row">
		<div class="col-lg-3">
			<h4 class="mb-0 sni-after align-items-center yotpo__review-author ${verifiedBuyer} ">${review.user.display_name}</h4>
			${verifiedBuyerLabel}
			<p class="font-size-sm mb-3">${formatDate(review.created_at)}</p>
			${customFields}
		</div>
		<div class="col-lg-9">
			<div class="sni sni__five-stars text-secondary mt-3 mt-lg-0"></div>
			<h4 class="mb-3 mt-2">${review.title}</h4>
			<p class="mb-3">${review.content}</p>
			${mediaImages}
			<div class="d-flex justify-content-end align-items-center mt-3 yotpo__likes">
				<p class="font-size-sm mr-1 mb-0">Was this review helpful?</p>
				<span class="font-size-sm sni sni__thumbs-up align-items-center mx-1">${review.votes_up}</span>
				<span class="font-size-sm sni sni__thumbs-down align-items-center ml-1">${review.votes_down}</span>
			</div>
		</div></div>`;
		$('.yotpo__review').append(yotpoReviewTemplate);
	});
};

// Render pagination
const renderPagination = (pagination) => {
	$('.yotpo__pagination').html('');
	const currPage = pagination.page;
	const totalPage = Math.floor(pagination.total / pagination.per_page);

	const pageStart = (currPage - 4 < 1) ? 1 : currPage - 4;
	const pageEnd = (currPage + 4 > 9) ? currPage + 4 : 9;

	let active;
	let paginationHtml = '';
	if (currPage > 1) {
		paginationHtml += `<li><a href="#" data-page="${currPage - 1}" class="px-1 text-body sni sni__chevron-prev"></a></li>`;
	}
	for (let i = pageStart; i <= pageEnd; i += 1) {
		active = i === currPage ? 'font-weight-bold text-secondary' : 'text-body';
		paginationHtml += `<li><a href="#" data-page="${i}" class="px-1 ${active}">${i}</a></li>`;
	}
	if (currPage <= totalPage) {
		paginationHtml += `<li><a href="#" data-page="${currPage + 1}" class="px-1 pr-lg-0 text-body sni sni__chevron-next"></a></li>`;
	}
	$('.yotpo__pagination').html(paginationHtml);
	$('.yotpo__offset').html(`${(pagination.per_page * (currPage - 1)) + 1} - ${(pagination.per_page * currPage)}`);
};

// Build topics tag
$.post(`https://api.yotpo.com/v1/topic/${appKey}/topics.json`, { domain_key: productId }, function (data) {
	for (let i = 0; i <= data.response.top_topics.top_mention_topics.length - 1; i += 1) {
		const hideTag = (i > 5) ? 'd-none' : '';
		const tagname = data.response.top_topics.top_mention_topics[i].name;
		const tag = `<a href="#" class="badge badge-gray font-size-sm mr-1 mb-2 text-capitalize ${hideTag}" data-name="${tagname}">${tagname}</a>`;
		$('.yotpo__tags').append(tag);
	}
	// append ellipsis
	$('.yotpo__tags').append('<a href="#" class="badge badge-gray font-size-sm mr-1 mb-2 yotpo__tags-expand" data-name="">...</a>');
});

// Initial build
$.get(`https://api.yotpo.com/v1/widget/${appKey}/products/${productId}/reviews.json`, { page: 9 }, function (data) {
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
	$.get(`https://api.yotpo.com/v1/widget/${appKey}/products/${productId}/reviews.json`, { page: $(this).data('page') }, function (data) {
		if (data.response.reviews.length > 0) {
			renderPagination(data.response.pagination);
			renderReviews(data.response.reviews);
		}
	});
});

$('.yotpo__tags').on('click', '.yotpo__tags-expand', function (e) {
	e.preventDefault();
	$(this).closest('.yotpo__tags').find('.badge-gray.d-none').removeClass('d-none');
	$(this).addClass('d-none');
});
