$('.yotpo').on('click', '.text-m', function () {
	$('html, body').animate({
		scrollTop: $('.yotpo__product').offset().top,
	}, 500);
});
