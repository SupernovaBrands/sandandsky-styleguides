const carousels = [];

const adjustScrollThumb = (thumb, inner) => {
	// eslint-disable-next-line no-param-reassign
	thumb.style.width = `${(inner.clientWidth / inner.scrollWidth) * 100}%`;
	// eslint-disable-next-line no-param-reassign
	thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
};

window.addEventListener('resize', () => {
	carousels.forEach((s) => s.dispatchEvent(new CustomEvent('adjustThumb')));
});

$('.carousel--scroll').each((index, carousel) => {
	const inner = carousel.querySelector('.carousel-inner');
	const scrollbar = carousel.querySelector('.scrollbar');
	const scrollThumb = carousel.querySelector('.scrollbar--thumb');
	const prevButton = carousel.querySelector('.carousel-control-prev');
	const nextButton = carousel.querySelector('.carousel-control-next');

	carousel.addEventListener('adjustThumb', () => { adjustScrollThumb(scrollThumb, inner); });
	if (scrollThumb) adjustScrollThumb(scrollThumb, inner);
	carousels.push(carousel);

	let x = 0;
	let left = 0;
	let itemIndex = 0;

	const checkButton = () => {
		if (inner.scrollLeft === 0 && !$(prevButton).hasClass('carousel-control-prev--always-show')) {
			$(prevButton).addClass('d-none');
		} else {
			$(prevButton).removeClass('d-none');
		}

		if (inner.scrollLeft + inner.clientWidth === inner.scrollWidth && !$(prevButton).hasClass('carousel-control-prev--always-show')) {
			$(nextButton).addClass('d-none');
		} else {
			$(nextButton).removeClass('d-none');
		}
	};

	const innerDrag = (e) => {
		inner.scrollLeft = left - (e.pageX || e.touches[0].pageX) + x;
		if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		checkButton();
	};

	const scrollDrag = (e) => {
		inner.scrollLeft = left + ((e.pageX || e.touches[0].pageX) - x) * (inner.scrollWidth / scrollbar.clientWidth);
		if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		checkButton();
	};

	inner.addEventListener('scroll', () => {
		if (scrollThumb) scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		checkButton();
	});

	const eventStart = (e) => {
		e.preventDefault();
		x = (e.pageX || e.touches[0].pageX);
		left = inner.scrollLeft;

		document.addEventListener(
			e.type === 'mousedown' ? 'mousemove' : 'touchmove',
			e.target === scrollThumb ? scrollDrag : innerDrag,
		);
	};

	inner.addEventListener('mousedown', eventStart, true);
	if (scrollThumb) {
		scrollThumb.addEventListener('mousedown', eventStart, true);
		scrollThumb.addEventListener('touchstart', eventStart, true);
	}

	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', innerDrag);
		document.removeEventListener('mousemove', scrollDrag);
	});

	document.addEventListener('touchend', () => {
		document.removeEventListener('touchmove', innerDrag);
		document.removeEventListener('touchmove', scrollDrag);
	});

	const scrollItem = (direction) => (e) => {
		e.preventDefault();
		const item = carousel.querySelector('.carousel-item');
		itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -2 : 2);
		left = itemIndex * item.clientWidth;
		if (left < 0) left = 0;
		else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;
		$(inner).animate({ scrollLeft: left }, 300);
		$(scrollThumb).animate({ left: `${(left / inner.scrollWidth) * 100}%` }, 300);
	};

	prevButton.addEventListener('mousedown', scrollItem('left'));
	nextButton.addEventListener('mousedown', scrollItem('right'));
});
