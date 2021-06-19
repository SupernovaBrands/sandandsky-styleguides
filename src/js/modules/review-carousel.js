const toggleReview = (elem, mode) => {
	const figCaption = elem.closest('figcaption');
	const moreBtn = figCaption.find('.review-card__more-text');

	if (mode === 'expand') {
		moreBtn.removeClass('d-none');
	} else {
		moreBtn.addClass('d-none');
		figCaption.find('.review-card__more').removeClass('d-none');
	}
};

$('.review-card__more').on('click', function () {
	$(this).addClass('d-none');
	toggleReview($(this), 'expand');
});

$('.review-card__less').on('click', function () {
	toggleReview($(this), 'hide');
});
