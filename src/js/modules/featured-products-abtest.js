$('#tabFeaturedProductContentFeatured .carousel--scroll').each((index, carousel) => {
	carousel.classList.remove('d-none');
	carousel.dispatchEvent(new CustomEvent('adjustThumb'));
});

$('#tabFeaturedProductAbTest a[data-toggle="tab"]').on('shown.bs.tab', function () {
	$('.carousel--scroll').each((index, carousel) => {
		carousel.classList.remove('d-none');
		carousel.dispatchEvent(new CustomEvent('adjustThumb'));
	});
});
