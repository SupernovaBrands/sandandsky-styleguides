if ($('.product-card__rating').length > 0) {
	$('.product-card__rating').each((i, el) => {
		const appKey = $(el).data('app-key');
		const productId = $(el).data('product-id');
		$.get(`https://api-cdn.yotpo.com/products/${appKey}/${productId}/bottomline`).done(function (data) {
			console.log(data, 'testing');
			const avg = Math.round(data.response.bottomline.average_score * 10) / 10;
			const totalReviewsText = data.response.bottomline.total_reviews > 1 ? 'Reviews' : 'Review';
			$(el).find('.product-card__review-text').html(`${avg}/5.0 - <span class="text-underline">${data.response.bottomline.total_reviews} ${totalReviewsText}</span>`);
			$(el).prepend('<div class="yotpo"><span class="d-block sni sni__star-full text-secondary mr-1"></span></div>');
			$(el).removeClass('d-none').addClass('d-flex');
		});
	});
}
