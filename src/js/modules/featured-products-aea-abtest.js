$('.featured-products-aea-abtest .carousel--scroll').each((index, carousel) => {
	carousel.classList.remove('d-none');
	carousel.dispatchEvent(new CustomEvent('adjustThumb'));
});
