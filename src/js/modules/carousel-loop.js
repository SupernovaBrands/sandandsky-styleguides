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
			const activeIndex = (e.direction === 'left') ? $(this).find('.active').data('index') + 1 : $(this).find('.active').data('index') - 1;
			let activeItems = (activeIndex > totalItems) ? 1 : activeIndex;
			activeItems = (activeItems == 0) ? totalItems : activeItems;

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
						$(this).find('.carousel-item').eq(0).appendTo($(this).find('.carousel-inner'));
					} else {
						$(this).find('.carousel-item').eq(0).appendTo($(this).find('.carousel-inner'));
					}
				}
				const indicator = $(this).data('indicator');
				const thisLoop = $(this);
				$(indicator).find('li').each(function(k,v){
					let slideTo = $(this).data('slide-to');
					let listIndex = thisLoop.find('.carousel-item[data-index="'+slideTo+'"]');
					$(v).attr('data-actual-slide', thisLoop.find('.carousel-item').index(listIndex));
				});
			}

		});

		$('.carousel--loop').on('slid.bs.carousel', function () {
			const totalItems = $(this).find('.carousel-item').length;
			const activeIndex = $(this).find('.active').data('index');
			let activeItems = (activeIndex > totalItems) ? 1 : activeIndex;
			activeItems = (activeItems == 0) ? totalItems : activeItems;

			$(this).find('.carousel-item--last').removeClass('carousel-item--last');

			$(this).next('.carousel-indicators').find('li').removeClass('active');
			$(this).next('.carousel-indicators').find('li[data-slide-to="'+ (activeItems) +'"]').addClass('active');
		});

		$('.carousel-indicators li').on('click', function(){
			$(this).parent().find('li').removeClass('active');
			$(this).addClass('active');
			const target = $(this).parent().data('target');
			if ($(this).data('actual-slide')) {
				$(target).carousel($(this).data('actual-slide'));
			} else {
				$(target).carousel($(this).data('slide-to') - 1);
			}

		});

	}
});
