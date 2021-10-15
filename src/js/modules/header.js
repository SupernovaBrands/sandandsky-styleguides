$(document).ready(function () {
	// mobile menu toggle
	function mobileMenuToggler() {
		$('body').toggleClass('offcanvas-active mobile-nav-show');
	}

	$('.navbar-toggler, .mobile-nav__close').on('click', function () {
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

	const productSwatchMobile = $('.product-swatch-mobile');
	const productSwatchTrigger = $('.product-swatch-mobile__trigger');

	const readingStickyScrolledDown = $('.reading-proggress-bar--scrolled-down');

	$(window).on('scroll', function () {
		scrollTop = $(this).scrollTop();

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
			if (readingStickyScrolledDown.length) {
				readingStickyScrolledDown.removeClass('position-fixed').addClass('d-none');
			}
		} else if (scrollTop <= 0) {
			// safari fix bounce effect
			navbarEl.removeClass('position-fixed').removeClass('scrolled-up');
		} else {
			navbarEl.removeClass('scrolled-up').addClass('scrolled-down');
			if (announceBar.length > 0 && scrollTop > navbarHeight) {
				announceBar.addClass('d-none');
			}

			if (readingStickyScrolledDown.length) {
				readingStickyScrolledDown.addClass('position-fixed').removeClass('d-none');
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
		setTimeout(function () {
			$('.navbar > .container').removeClass('position-relative');
		}, 300);
	});

	$('#tooltip__show').on('click', function () {
		if (window.innerWidth >= screenLG) {
			$('.navbar > .container').addClass('position-relative');
		}
		$('.tooltip').addClass('show');
	});

	const announcementBar = $('#announcementBar');
	if (announcementBar.length) {
		const announcementItems = announcementBar.find('.carousel-item');
		let barHeight = 0;
		announcementItems.each(function () {
			barHeight = ($(this).outerHeight() > barHeight) ? $(this).outerHeight() : barHeight;
		});
		announcementBar.find('a').css({
			height: `${barHeight} px`,
		});
	}
});
