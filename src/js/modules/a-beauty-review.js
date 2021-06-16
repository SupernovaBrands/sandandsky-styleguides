let beforeIndicator;
let before2Indicator;
let afterIndicator;
let after2Indicator;
$('.a-beauty-review').on('slide.bs.carousel', function (e) {
	beforeIndicator = e.to > 0 ? $(this).find('.carousel-indicators li').get(e.to - 1) : null;
	before2Indicator = beforeIndicator ? $(beforeIndicator).prevAll() : null;
	afterIndicator = e.to + 1 < $(this).find('.carousel-item').length ? $(this).find('.carousel-indicators li').get(e.to + 1) : null;
	after2Indicator = afterIndicator ? $(afterIndicator).nextAll() : null;

	$(this).find('.carousel-indicators li').removeClass('carousel-indicator--prev carousel-indicator--prev-out carousel-indicator--next carousel-indicator--next-out');
	if (beforeIndicator) $(beforeIndicator).addClass('carousel-indicator--prev');
	if (before2Indicator) $(before2Indicator).addClass('carousel-indicator--prev-out');
	if (afterIndicator) $(afterIndicator).addClass('carousel-indicator--next');
	if (after2Indicator) $(after2Indicator).addClass('carousel-indicator--next-out');
});
