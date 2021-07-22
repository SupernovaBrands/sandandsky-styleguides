// stockist
if ($('.stockist').length > 0) {
	const stockistPlace = $('.stockist__select').val();
	$(`.stockist figure[data-toggle*="${stockistPlace}"]`).removeClass('d-none');
	$('.stockist__select').on('change', function () {
		const selectedPlace = $(this).find('option:selected').text();
		$('.stockist__location').html(selectedPlace);
		$('.stockist figure').addClass('d-none');
		$(`.stockist figure[data-toggle*="${$(this).val()}"]`).removeClass('d-none');
	});
}