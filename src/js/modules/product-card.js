/* global theme */

import {
	waitFor,
} from '~mod/utils';

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
