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
	const productSwatchMobile = $('.product-swatch-mobile');
	const productSwatchTrigger = $('.product-swatch-mobile__trigger');

	$(window).on('scroll', function () {
		scrollTop = $(this).scrollTop();

		if (scrollTop < lastScrollTop) {
			navbarEl.addClass('scrolled');
			if (scrollTop <= 0) {
				// remove scrolled up for mobile menu show properly
				navbarEl.removeClass('scrolled');
			}
		} else if (scrollTop <= 0) {
			// safari fix bounce effect
			navbarEl.removeClass('scrolled');
		} else {
			navbarEl.addClass('scrolled');
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

	$('#dropdownMenuForm').on('hide.bs.dropdown', function () {
		// reset form showing to login
		$('#dropdown__register').removeClass('show');
		$('#dropdown__login').addClass('show');
	});
});
