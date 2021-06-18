const hideReviewText = (elem) => {
	elem.closest('.review-carousel').removeClass('review-carousel__visible');
	elem.closest('.carousel--scroll').addClass('overflow-hidden');
	elem.addClass('d-none');

	const figCaption = elem.closest('figcaption');
	figCaption.find('i').removeClass('position-absolute bg-secondary-light px-g pb-g');
	figCaption.removeClass('position-relative show');
	figCaption.find('.review-card__more-text').addClass('d-none');
	figCaption.find('.review-card__more').removeClass('d-none');
};

$('.review-card__more').on('click', function () {
	$(this).closest('.review-carousel').addClass('review-carousel__visible');
	$(this).closest('.carousel--scroll').removeClass('overflow-hidden');
	$(this).addClass('d-none');

	const figCaption = $(this).closest('figcaption');
	figCaption.find('i').addClass('position-absolute bg-secondary-light px-g pb-g');
	figCaption.addClass('show position-relative');
	figCaption.find('.review-card__more-text').removeClass('d-none');
	figCaption.find('.review-card__less').removeClass('d-none');
});

$('.review-card__less').on('click', function () {
	hideReviewText($(this));
});

$('.scrollbar').on('click', function () {
	hideReviewText($('.review-card__less'));
});

$('.carousel-control').on('click', function () {
	hideReviewText($('.review-card__less'));
});
