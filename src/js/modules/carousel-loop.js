/* global screenLG */

$(document).ready(function () {
	if ($('.carousel--loop').length > 0) {
		// moving element carousel item depending of items per slide
		// triggered by bootstrap carousel slide event (when transition started)
		$('.carousel--loop').on('slide.bs.carousel', function (e) {
			const $e = $(e.relatedTarget);
			let idx = $e.index();
			let itemsPerSlide = $(this).data('slide-number') ? $(this).data('slide-number') : 3;
			const totalItems = $(this).find('.carousel-item').length;

			if (screenLG > window.innerWidth) {
				// set 1 for mobile
				itemsPerSlide = 2;
			}

			if ($(this).find('.carousel--centered').length > 0) {
				// add 1 element for negative offset of carousel inner
				idx += 1;

				// special case for carousel centered we would need plus 1, as we have negative offset x on carousel-inner
				if (e.direction === 'right') {
					$(this).find(`.carousel-item:nth-child(${$(this).find('.carousel-item.active').index() + 1 + itemsPerSlide})`).addClass('carousel-item--last');
				}
			}

			if (idx >= totalItems - (itemsPerSlide - 1)) {
				const it = itemsPerSlide - (totalItems - idx);
				for (let i = 0; i < it; i += 1) {
					if (e.direction === 'left') {
						$(this).find('.carousel-inner').append($(this).find('.carousel-item').eq(0).detach());
					} else {
						$(this).find('.carousel-inner').append($(this).find('.carousel-item').eq(totalItems - 1).detach());
					}
				}
			}
		});

		$('.carousel--loop').on('slid.bs.carousel', function () {
			$(this).find('.carousel-item--last').removeClass('carousel-item--last');
		});
	}
});
