$('.tab--scroll-carousel a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	const target = e.target.getAttribute('href');
	document.querySelectorAll(`${target} .carousel--scroll`).forEach((carousel) => {
		carousel.classList.remove('d-none');
		carousel.dispatchEvent(new CustomEvent('adjustThumb'));
		carousel.querySelector('.carousel-control-next').classList.remove('d-none');
	});
});
