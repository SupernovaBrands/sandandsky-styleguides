import { scrollToElement } from '~mod/utils';

const screenLG = 991;

if (window.location.hash === '#write-a-review') {
	setTimeout(function () {
		scrollToElement('#write-a-review', -130);
	}, 500);
}

const mobileSwatch = $('.product-swatch-mobile');
const mobileSwatchTrigger = document.querySelector('.product-swatch-mobile__trigger');
if (mobileSwatchTrigger && mobileSwatch.length > 0) {
	const observerCallback = (entries) => {
		if (window.innerWidth < screenLG) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					mobileSwatch.removeClass('show');
				} else {
					mobileSwatch.addClass('show');
				}
			});
		}
	};
	const observer = new IntersectionObserver(observerCallback);
	observer.observe(mobileSwatchTrigger);
}

$('.product-form .quantity--minus').on('click', function () {
	const inputElem = $(this).parent().find('input[name="quantity"]');
	const num = inputElem.val();
	if (num > 1) {
		inputElem.val(Number(num) - 1);
	}
	return false;
});

$('.product-form .quantity--plus').on('click', function () {
	const inputElem = $(this).parent().find('input[name="quantity"]');
	const num = inputElem.val();
	if (num > 0 && num < 99) {
		inputElem.val(Number(num) + 1);
	}
	return false;
});

// open shipping table accordion
$('.product-form__shipping a').on('click', function (e) {
	e.preventDefault();
	e.stopPropagation();

	const dataTarget = $(this).parent().data('target');
	$(`[data-target="${dataTarget}"]`).removeClass('collapsed').attr('aria-expanded', true);
	$(dataTarget).addClass('show');

	$('html, body').animate({
		scrollTop: $('.product-form__shipping-accordion').offset().top - 70,
	}, 500);
});

const productWaitlistForm = $('.product__waitlist-form');
const productWaitlistSubmitted = $('.product__waitlist-submitted');
if (productWaitlistForm.length > 0 && productWaitlistSubmitted.length > 0) {
	productWaitlistForm.find('.btn').on('click', function () {
		console.log('click');
		$(this).closest('.product__waitlist-form').addClass('d-none');
		productWaitlistSubmitted.removeClass('d-none');
	});
}
