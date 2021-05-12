if ($('.carousel--scroll').length > 0) {
	const scrollbars = [];

	const adjustScrollThumb = (thumb, inner) => {
		// eslint-disable-next-line no-param-reassign
		thumb.style.width = `${(inner.clientWidth / inner.scrollWidth) * 100}%`;
		// eslint-disable-next-line no-param-reassign
		thumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
	};

	window.addEventListener('resize', () => {
		scrollbars.forEach((s) => adjustScrollThumb(s.thumb, s.inner));
	});

	$('.carousel--scroll').each((index, carousel) => {
		const inner = carousel.querySelector('.carousel-inner');
		const item = carousel.querySelector('.carousel-item');
		const scrollbar = carousel.querySelector('.scrollbar');
		const scrollThumb = carousel.querySelector('.scrollbar--thumb');
		const prevButton = carousel.querySelector('.carousel-control-prev');
		const nextButton = carousel.querySelector('.carousel-control-next');

		adjustScrollThumb(scrollThumb, inner);
		scrollbars.push({ thumb: scrollThumb, inner });

		let x = 0;
		let left = 0;
		let itemIndex = 0;

		const innerDrag = (e) => {
			inner.scrollLeft = left - (e.pageX || e.touches[0].pageX) + x;
			scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		};

		const scrollDrag = (e) => {
			inner.scrollLeft = left + ((e.pageX || e.touches[0].pageX) - x) * (inner.scrollWidth / scrollbar.clientWidth);
			scrollThumb.style.left = `${(inner.scrollLeft / inner.scrollWidth) * 100}%`;
		};

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
		inner.addEventListener('touchstart', eventStart, true);

		scrollThumb.addEventListener('mousedown', eventStart, true);
		scrollThumb.addEventListener('touchstart', eventStart, true);

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
}

if ($('#a-beauty-review').length > 0) {
	let beforeIndicator;
	let before2Indicator;
	let afterIndicator;
	let after2Indicator;
	$('#a-beauty-review').on('slide.bs.carousel', function (e) {
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
}
