$('.review-card__more').on('click', function () {
	$(this).closest('.review-carousel').addClass('review-carousel__visible');
	$(this).addClass('d-none');
	const figCaption = $(this).closest('figcaption');
	figCaption.find('.review-card__more-text').removeClass('d-none');
	figCaption.find('.review-card__less').removeClass('d-none');
});

$('.review-card__less').on('click', function () {
	const figCaption = $(this).closest('figcaption');
	figCaption.find('.review-card__more-text').addClass('d-none');
	figCaption.find('.review-card__more').removeClass('d-none');
	$(this).closest('.review-carousel').addClass('review-carousel__visible');
});
