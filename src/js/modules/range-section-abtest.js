$('#rangeTabContent .carousel--scroll').each((index, carousel) => {
	carousel.classList.remove('d-none');
	carousel.dispatchEvent(new CustomEvent('adjustThumb'));
});

$('#rangeTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
	$('.carousel--scroll').each((index, carousel) => {
		carousel.classList.remove('d-none');
		carousel.dispatchEvent(new CustomEvent('adjustThumb'));
	});
});
