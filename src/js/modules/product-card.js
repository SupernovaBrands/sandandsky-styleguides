/* global theme */

if ($('.product-card-form').length > 0) {
	$('.product-card-form').each((index, el) => {
		const productCardForm = new theme.AjaxProduct($(el)); // eslint-disable-line no-unused-vars
	});
}

if ($('.product-card__rating').length > 0) {
	$('.product-card__rating').each((i, el) => {
		const appKey = $(el).data('app-key');
		const productId = $(el).data('product-id');
		$.get(`https://api.yotpo.com/products/${appKey}/${productId}/bottomline`).done(function (data) {
			console.log(data, 'testing');
			const avg = Math.round(data.response.bottomline.average_score * 10) / 10;
			const totalReviewsText = data.response.bottomline.total_reviews > 1 ? 'Reviews' : 'Review';
			$(el).find('.product-card__review-text').text(`${avg}/5.0 - ${data.response.bottomline.total_reviews} ${totalReviewsText}`);
			$(el).prepend('<div class="yotpo"><span class="d-block sni sni__star-full text-secondary mr-1"></span></div>');
			$(el).removeClass('d-none').addClass('d-flex');
		});
	});
}
