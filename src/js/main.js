$(document).ready( function () {

	$('.product-image-carousel__indicator__item').on('click', function () {
		const carousel = $(this).data('target');
		const selectedIndex = $(this).data('index');
		$(carousel).carousel(selectedIndex - 1);
		$('.product-image-carousel__indicator__item span').removeClass('border-secondary').addClass('border-white');

		$(this).find('span').addClass('border-secondary').removeClass('border-white');

		const parent = $(this).closest('.carousel');
		const index = $(this).index();
		const active = parent.find('.active').index();
		const total = parent.find('.carousel-item').length;
		if (total > 5) {
			if ((index - active === 4) && (index < total - 1)) {
				$(parent).carousel(active + 1);
			}
			if (index === active && active !== 0) {
				$(parent).carousel(active - 1);
			}
		}
	});
});
