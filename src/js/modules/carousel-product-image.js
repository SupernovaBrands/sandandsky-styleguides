const screenLG = 991;

let itemIndex = 0;
let left = 0;

const scrollThumb = (direction) => {
	const inner = document.getElementById('product-image-carousel__indicator-scroll').querySelector('.carousel-inner');
	const item = document.getElementById('product-image-carousel__indicator-scroll').querySelector('.carousel-item');
	const itemToScroll = 1;
	itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -(itemToScroll) : itemToScroll);
	left = itemIndex * item.clientWidth;
	if (left < 0) left = 0;
	else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;
	$(inner).animate({ scrollLeft: left }, 300);
};

$('.product-image-carousel__indicator__item').on('click', function () {
	$('.product-image-carousel__indicator__item img').removeClass('border-secondary').addClass('border-white');
	$(this).find('img').addClass('border-secondary').removeClass('border-white');

	const parent = $(this).closest('.carousel');
	const index = $(this).index();
	const active = parent.find('.active').index();
	const total = parent.find('.carousel-item').length;

	if (total > 5 && window.innerWidth < screenLG) {
		if ((index - active === 4) && (index < total - 1)) {
			$(parent).carousel(active + 1);
			if (parent.hasClass('carousel--scroll')) {
				scrollThumb('right');
			}
		}
		if (index === active && active !== 0) {
			$(parent).carousel(active - 1);
			if (parent.hasClass('carousel--scroll')) {
				scrollThumb('left');
			}
		}
	}
});

const scrollIndicator = $('#product-image-carousel__indicator-scroll .carousel-inner');
const scrollIndicatorItem = $('#product-image-carousel__indicator-scroll .carousel-item');
const scrollIndicatorLength = scrollIndicator.find('.carousel-item').length - 1;
$('#product-image-carousel').on('slid.bs.carousel', function (e) {
	scrollIndicatorItem.removeClass('active');
	scrollIndicatorItem.find('img').removeClass('border-secondary').addClass('border-white');
	scrollIndicator.find(`.carousel-item[data-slide-to="${e.to}"]`).addClass('active');
	scrollIndicator.find(`.carousel-item[data-slide-to="${e.to}"] img`).removeClass('border-white').addClass('border-secondary');

	const gap = (e.direction === 'left') ? 3 : 2;
	if (e.to === 0) {
		$(scrollIndicator).animate({ scrollLeft: 0 }, 300);
	} else if (e.to >= gap && e.to < scrollIndicatorLength) {
		if (e.direction === 'left') scrollThumb('right');
		else scrollThumb('left');
	} else if (e.to === scrollIndicatorLength) {
		const leftPos = scrollIndicatorItem.width() * (scrollIndicatorLength - 3);
		$(scrollIndicator).animate({ scrollLeft: leftPos }, 300);
	}
});
