const adjustScrollThumb = (thumb, inner, scrollParent) => {
	let innerOuterWidth;
	if ($(inner).closest('.instagram-carousel').length > 0) {
		// instagram scroll bugfix: out of container
		// round to 1 decimal of item width
		const itemWidth = Math.round($(inner).find('.carousel-item').outerWidth() * 10) / 10;
		// instagram total images from instagram.js
		innerOuterWidth = itemWidth * 15;
	} else {
		innerOuterWidth = inner.scrollWidth;
	}
	// eslint-disable-next-line no-param-reassign
	thumb.style.width = `${(inner.clientWidth / innerOuterWidth) * 100}%`;
	// eslint-disable-next-line no-param-reassign
	thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
	if (inner.clientWidth === inner.scrollWidth) {
		inner.classList.add('justify-content-center');
		scrollParent.classList.add('d-none');
	} else {
		inner.classList.remove('justify-content-center');
		scrollParent.classList.remove('d-none');
	}
};

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
