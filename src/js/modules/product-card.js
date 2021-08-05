/* global theme */

import {
	waitFor,
} from '~mod/utils';

const buildStars = (score) => {
	let stars = '';
	const maxScore = 5;
	const hollow = maxScore - (maxScore - score);

	for (let s = 1; s <= 5; s += 1) {
		const se = hollow - s + 1;
		const seFloor = se - Math.floor(se);
		if ((s > hollow && se < 0) || (s > hollow && se > 0 && seFloor < 0.5)) {
			stars += '<i class="sni sni__star-hollow"></i>';
		} else if (s > hollow && se > 0 && seFloor >= 0.5) {
			stars += '<i class="sni sni__star-half"></i>';
		} else {
			stars += '<i class="sni sni__star-full"></i>';
		}
	}

	return stars;
};

if ($('.product-card-form').length > 0) {
	$('.product-card-form').each((index, el) => {
		const productCardForm = new theme.AjaxProduct($(el)); // eslint-disable-line no-unused-vars
	});
}

if ($('.product-card:not(.product-card--secondary) .yotpo.bottomLine').length > 0) {
	$('.product-card:not(.product-card--secondary) .yotpo.bottomLine').each((i, el) => {
		waitFor(() => $(el).find('.yotpo-display-wrapper').length > 0, () => {
			const stars = $(el).find('.yotpo-stars');
			if (stars.length > 0) {
				const rating = stars.find('.sr-only').text().split(' ')[0].replace('/5.0', '');
				stars.after(`<span class="product-card__text-sm pr-1">${rating}/5.0 &nbsp;-</span>`);
				$(el)
					.find('.text-m')
					.removeClass('text-m')
					.addClass('product-card__text-sm')
					.removeAttr('href');
				$(el).before('<div class="yotpo"><span class="d-block yotpo-icon yotpo-icon-star text-secondary mr-1"></span></div>');
			}
		});
	});
}

if ($('.product-card__rating').length > 0) {
	$('.product-card__rating').each((i, el) => {
		const appKey = $(el).data('app-key');
		const productId = $(el).data('product-id');
		$.get(`https://api.yotpo.com/products/${appKey}/${productId}/bottomline`).done(function (data) {
			const avg = Math.round(data.response.bottomline.average_score * 10) / 10;
			const totalReviewsText = data.response.bottomline.total_reviews > 1 ? 'Reviews' : 'Review';
			$(el).find('.product-card__review-text').text(`${avg}/5.0 - ${data.response.bottomline.total_reviews} ${totalReviewsText}`);
			$(el).prepend('<div class="yotpo"><span class="d-block yotpo-icon yotpo-icon-star text-secondary mr-1"></span></div>');
			$(el).removeClass('d-none').addClass('d-flex');
		});
	});
}

if ($('.product-card--secondary .yotpo-product-stars').length > 0) {
	$('.product-card--secondary .yotpo-product-stars').each((index, el) => {
		const appKey = $(el).data('key');
		const productId = $(el).data('product');

		$.get(`https://api.yotpo.com/products/${appKey}/${productId}/bottomline`).done((res) => {
			if (res.status.code === 200) {
				const response = res.response.bottomline;
				const { average_score: averageScore } = response;
				const stars = buildStars(averageScore);
				$(el).html(stars);
			}
		});
	});
}
