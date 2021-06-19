const toggleReview = (elem) => {
	const figCaption = elem.closest('figcaption');
	const moreBtn = figCaption.find('.review-card__more-text');

	if ($(elem).hasClass('review-card__more')) {
		moreBtn.removeClass('d-none');
	} else {
		moreBtn.addClass('d-none');
		figCaption.find('.review-card__more').removeClass('d-none');
	}
};

$('.review-card__more').on('click', function () {
	$(this).addClass('d-none');
	toggleReview($(this));
});

$('.review-card__less').on('click', function () {
	toggleReview($(this));
});
