$(document).ready(function () {
	// mobile menu toggle
	function mobileMenuToggler() {
		$('.mobile-nav').toggleClass('show');
		$('body').toggleClass('offcanvas-active');
	}

	$('.navbar-toggler').on('click', function () {
		mobileMenuToggler();
	});

	$('.mobile-nav').click(function (e) {
		if (e.target !== e.currentTarget) return;
		mobileMenuToggler();
	});

	// header navbar detect scroll top or down
	let lastScrollTop;
	let scrollTop = 0;
	const screenLG = 992;
	const navbarEl = $('.main-header');
	const announceBar = $('.announcement-bar');
	const navbarHeight = navbarEl.height();
	const cookiesBanner = $('.cookies-banner');

	const productSwatchMobile = $('.product-swatch-mobile');
	const productSwatchTrigger = $('.product-swatch-mobile__trigger');

	$(window).on('scroll', function () {
		scrollTop = $(this).scrollTop();

		if ($('.cookies-banner:not(.d-none)').length > 0) {
			if (cookiesBanner.find('.collapse:not(.show)').length > 0) {
				$('body').addClass('cookies-banner-show');
			} else if (cookiesBanner.find('.collapse.show').length > 0) {
				$('body').addClass('cookies-banner-show--expanded');
			}
			navbarEl.removeClass('position-fixed').removeClass('scrolled-up').removeClass('scrolled-down');
			announceBar.removeClass('d-none');
		} else {
			navbarEl.addClass('position-fixed');
			if (scrollTop < lastScrollTop) {
				navbarEl.removeClass('scrolled-down').addClass('scrolled-up');
				if (scrollTop <= 0) {
					// remove scrolled up for mobile menu show properly
					navbarEl.removeClass('position-fixed').removeClass('scrolled-up');
					if (announceBar.length > 0) {
						announceBar.removeClass('d-none');
					}
				}
			} else if (scrollTop <= 0) {
				// safari fix bounce effect
				navbarEl.removeClass('position-fixed').removeClass('scrolled-up');
			} else {
				navbarEl.removeClass('scrolled-up').addClass('scrolled-down');
				if (announceBar.length > 0 && scrollTop > navbarHeight) {
					announceBar.addClass('d-none');
				}
			}
		}

		lastScrollTop = scrollTop;

		if (window.innerWidth < screenLG && productSwatchTrigger.length > 0) {
			const overSwatch = scrollTop > productSwatchTrigger.offset().top;
			if (overSwatch && !productSwatchMobile.hasClass('show')) {
				productSwatchMobile.addClass('show');
			} else if (!overSwatch && productSwatchMobile.hasClass('show')) {
				productSwatchMobile.removeClass('show');
			}
		}
	});

	// tooltip
	$('#tooltip__close').on('click', function () {
		$(this).parent().removeClass('show');
		setTimeout(function() {
			$('.navbar > .container').removeClass('position-relative');
		}, 300);
	});

	$('#tooltip__show').on('click', function () {
		$('.navbar > .container').addClass('position-relative');
		$('.tooltip').addClass('show');
	});

	const announcementBar = $('#announcementBar');
	if (announcementBar.length) {
		const announcement_items = announcementBar.find('.carousel-item');
		let barHeight = 0;
		announcement_items.each(function() {
			barHeight = ($(this).outerHeight() > barHeight) ? $(this).outerHeight() : barHeight;
		})
		announcementBar.find('a').css({
			'height': barHeight + 'px'
		})
	}

	function searchBoxToggle() {
		$('.search-box').toggleClass('show');
	}

	$('header .sni__search, .search-box__top .sni__times').on('click', function () {
		searchBoxToggle()
	})
});

if ($('.hero-carousel').length > 0) {
	import(/* webpackChunkName: 'hero-carousel' */ '~mod/hero-carousel');
}

if ($('.product-card').length > 0) {
	import(/* webpackChunkName: 'product-card' */ '~mod/product-card');
}

if ($('.carousel--scroll').length > 0) {
	import(/* webpackChunkName: 'carousel-scroll' */ '~mod/carousel-scroll');
}

if ($('.product-image-carousel').length > 0) {
	import(/* webpackChunkName: 'carousel-product-image' */ '~mod/carousel-product-image');
}

if ($('.instagram-carousel').length > 0) {
	import(/* webpackChunkName: 'instagram' */ '~mod/instagram');
}

if ($('.a-beauty-review').length > 0) {
	import(/* webpackChunkName: 'a-beauty-review' */ '~mod/a-beauty-review');
}

if ($('.yotpo__product').length > 0) {
	import(/* webpackChunkName: 'yotpo-product' */ '~mod/yotpo-product');
}

if ($('.review-carousel').length > 0) {
	import(/* webpackChunkName: 'review-carousel' */ '~mod/review-carousel');
}

if ($('.tab-ingredient').length > 0) {
	import(/* webpackChunkName: 'ingredient-api' */ '~mod/ingredient-api');
}

if ($('.template-product').length > 0) {
	import(/* webpackChunkName: 'product-template' */ '~mod/product-template');
}

if ($('.video-card').length > 0) {
	import(/* webpackChunkName: 'video-card' */ '~mod/video-card');
}

if ($('.search-box').length > 0) {
	import(/* webpackChunkName: 'ingredient-api' */ '~mod/predictive-search');
}