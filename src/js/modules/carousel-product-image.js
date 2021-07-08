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
