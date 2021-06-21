const yotpoProduct = $('.yotpo__product');
const appKey = yotpoProduct.data('key');
const productId = yotpoProduct.data('product');

const apiUrl = `https://api.yotpo.com/v1/widget/${appKey}/products/${productId}/reviews.json`;
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

// Build topics tag
$.post(`https://api.yotpo.com/v1/topic/${appKey}/topics.json`, { domain_key: productId }, function (data) {
	for (let i = 0; i <= 5; i += 1) {
		const tagname = data.response.top_topics.top_mention_topics[i].name;
		const tag = `<a href="#" class="badge badge-gray font-size-sm mr-1 mb-2 text-capitalize" data-name="${tagname}">${tagname}</a>`;
		$('.yotpo__tags').append(tag);
	}
	// append ellipsis
	$('.yotpo__tags').append('<a href="#" class="badge badge-gray font-size-sm mr-1 mb-2" data-name="">...</a>');
});

$.get(apiUrl, function (data) {
	const avg = Math.round(data.response.bottomline.average_score * 10) / 10;
	$('.yotpo__avg-score').text(avg);
	$('.yotpo__total-reviews').text(data.response.bottomline.total_review);
	if (data.response.reviews.length > 0) {
		$.each(data.response.reviews, function (k, review) {
			const isLastElement = (k === data.response.reviews.length - 1) ? '' : 'border-bottom';
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
				mediaImages += '<div class="yotpo__images">';
				$.each(review.images_data, function (k2, image) {
					mediaImages += `<img src="${image.thumb_url}" class="mr-g" alt="Image Review of ${review.user.display_name}">`;
				});
				mediaImages += '</div>';
			}

			const yotpoReviewTemplate = `<div class="yotpo__review-content ${isLastElement} py-3">
				<h4 class="mb-0 sni-after align-items-center yotpo__review-author ${verifiedBuyer} ">${review.user.display_name}</h4>
				${verifiedBuyerLabel}
				<p class="font-size-sm mb-3">${formatDate(review.created_at)}</p>
				${customFields}
				<div class="sni sni__five-stars  text-secondary mt-3"></div>
				<h4 class="mb-3 mt-2">${review.title}</h4>
				<p class="mb-3">${review.content}</p>
				${mediaImages}
				<div class="d-flex justify-content-end align-items-center mt-3 yotpo__likes">
					<p class="font-size-sm mr-1 mb-0">Was this review helpful?</p>
					<span class="font-size-sm sni sni__thumbs-up align-items-center mx-1">${review.votes_up}</span>
					<span class="font-size-sm sni sni__thumbs-down align-items-center ml-1">${review.votes_down}</span>
				</div>
			</div>`;

			$('.yotpo__review').append(yotpoReviewTemplate);
		});
	}
});
