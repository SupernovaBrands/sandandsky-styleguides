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

$('.product-image-carousel__indicator').on('slide.bs.carousel', function (e) {
	const $e = $(e.relatedTarget);
	const index = $e.index();
	const totalItems = $(this).find('.carousel-item').length;

	const prevButton = $(this).children('button.sni__chevron-up');
	const nextButton = $(this).children('button.sni__chevron-down');

	if (index === 0) {
		prevButton.attr('disabled', 'disabled');
	} else {
		prevButton.removeAttr('disabled');
	}
	if (index + 5 === totalItems) {
		nextButton.attr('disabled', 'disabled');
	} else {
		nextButton.removeAttr('disabled');
	}
});

if ($('.product-collapse__toggle').length > 0) {
	const handleToggle = function (open, el) {
		const toggle = el.siblings('.product-collapse__toggle');
		if (open) {
			toggle.addClass('sni__minus').removeClass('sni__plus');
		} else {
			toggle.addClass('sni__plus').removeClass('sni__minus');
		}
	};
	$('.product-collapse')
		.on('show.bs.collapse', function () { handleToggle(true, $(this)); })
		.on('hide.bs.collapse', function () { handleToggle(false, $(this)); });
}

$('.product-form').on('submit', function (e) {
	e.preventDefault();
	const data = $(this).find('.product-data').text().split('::')
		.map((t) => {
			const splits = t.split('|');
			const result = { id: splits.pop() };
			splits.forEach((element, index) => {
				result[`option${index + 1}`] = element;
			});
			return result;
		});

	const option1 = $(this).find('input[name="product-variant"]:checked').val();
	const option2 = $(this).find('input[name="product-color"]:checked').val();
	const quantity = parseInt($(this).find('input[name="quantity"]').val(), 10);

	const selected = data.find((d) => d.option1 === option1 && d.option2 === option2);

	if (selected) {
		snCart.addItem(parseInt(selected.id, 10), quantity);
	}
});
