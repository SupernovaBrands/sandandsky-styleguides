const screenLG = 991;
$('.yotpo').on('click', '.text-m', function () {
	$('html, body').animate({
		scrollTop: $('.yotpo__product').offset().top,
	}, 500);
});

if (window.location.hash === '#write-a-review') {
	$('.yotpo__stars .text-m').click();
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

$('.product-form .sni__minus').on('click', function () {
	const inputElem = $(this).parent().find('input[name="quantity"]');
	const num = inputElem.val();
	if (num > 1) {
		inputElem.val(Number(num) - 1);
	}
	return false;
});

$('.product-form .sni__plus').on('click', function () {
	const inputElem = $(this).parent().find('input[name="quantity"]');
	const num = inputElem.val();
	if (num > 0 && num < 99) {
		inputElem.val(Number(num) + 1);
	}
	return false;
});