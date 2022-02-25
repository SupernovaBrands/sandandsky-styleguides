const carousels = [];

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

window.addEventListener('resize', () => {
	carousels.forEach((s) => s.dispatchEvent(new CustomEvent('adjustThumb')));
});

$('.carousel--scroll').each((index, carousel) => {
	const inner = carousel.querySelector('.carousel-inner');
	const scrollbar = carousel.querySelector('.scrollbar');
	const scrollThumb = carousel.querySelector('.scrollbar--thumb');
	const prevButton = carousel.querySelector('.carousel-control-prev');
	const nextButton = carousel.querySelector('.carousel-control-next');

	if (scrollbar) {
		carousel.addEventListener('adjustThumb', () => { adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode); });
		if (scrollThumb) adjustScrollThumb(scrollThumb, inner, scrollbar.parentNode);
	}
	carousels.push(carousel);

	let x = 0;
	let left = 0;
	let itemIndex = 0;

	const checkButton = () => {
		if (inner.scrollLeft === 0) {
			if (!$(prevButton).hasClass('carousel-control-prev--always-show')) {
				$(prevButton).addClass('d-none');
			} else {
				$(prevButton).addClass('disabled');
			}
		} else if (!$(prevButton).hasClass('carousel-control-prev--always-show')) {
			$(prevButton).removeClass('d-none');
		} else {
			$(prevButton).removeClass('disabled');
		}

		if (inner.scrollLeft + inner.clientWidth === inner.scrollWidth) {
			if (!$(nextButton).hasClass('carousel-control-prev--always-show')) {
				$(nextButton).addClass('d-none');
			} else {
				$(nextButton).addClass('disabled');
			}
		} else if (!$(nextButton).hasClass('carousel-control-prev--always-show')) {
			$(nextButton).removeClass('d-none');
		} else {
			$(nextButton).removeClass('disabled');
		}
	};
	if (scrollThumb) {
		checkButton();
	}

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
		const itemToScroll = $(carousel).parent().hasClass('review-carousel') || $(carousel).parent().hasClass('instagram-carousel') ? 1 : 2;
		itemIndex = Math.round(inner.scrollLeft / item.clientWidth) + (direction === 'left' ? -(itemToScroll) : itemToScroll);
		left = itemIndex * item.clientWidth;
		if (left < 0) left = 0;
		else if (left > inner.scrollWidth - inner.clientWidth) left = inner.scrollWidth - inner.clientWidth;
		$(inner).animate({ scrollLeft: left }, 300);
		$(scrollThumb).animate({ left: `${(left / inner.scrollWidth) * 100}%` }, 300);
	};

	if (prevButton) {
		prevButton.addEventListener('mousedown', scrollItem('left'));
	}

	if (nextButton) {
		nextButton.addEventListener('mousedown', scrollItem('right'));
	}

	window.addEventListener('resize', function () {
		checkButton();
	});
});
