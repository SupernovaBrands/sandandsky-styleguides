if ($('.hero-carousel').length > 0) {
	setTimeout(() => {
		$('.hero-carousel').carousel('cycle');
		$('.hero-carousel .carousel-indicators--timer').addClass('carousel-indicators--timer--start');
	}, 5000);
}
