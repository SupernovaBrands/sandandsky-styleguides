$('.product-image-carousel__indicator__item').on('click', function () {

	const parent = $(this).closest('.carousel');
	const index = $(this).index();
	const active = parent.find('.active').index();
	const total = parent.find('.carousel-item').length;
	if (total > 5 && screenLG > window.innerWidth) {
		if ((index - active === 4) && (index < total - 1)) {
			$(parent).carousel(active + 1);
		}
		if (index === active && active !== 0) {
			$(parent).carousel(active - 1);
		}
	}
	$('.product-image-carousel__indicator__item button').removeClass('border-secondary').addClass('border-white');
	$(this).find('button').addClass('border-secondary').removeClass('border-white');
});
