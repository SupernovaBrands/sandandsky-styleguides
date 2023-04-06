import { scrollToElement, popopOver } from '~mod/utils';

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
		$(this).closest('.product__waitlist-form').addClass('d-none');
		productWaitlistSubmitted.removeClass('d-none');
	});
}

window.variantAvailable(document.querySelector('.product-form [name=product-variant]:checked'));

$('.product-form [name=product-variant]').on('change', function () {
	/** shopify klarna & afterpay */
	// const qty = $(this).closest('form').find('input[name="quantity"]').val();
	// afterpayHandle(qty);
	// klarnaHandle(qty);

	const carouselIndicator = $('.product-image-carousel__indicator .product-image-carousel__indicator__item');
	const imageVariant = $(this).data('image');
	if (imageVariant && carouselIndicator.length > 0) {
		const targetIndicator = carouselIndicator.find(`img[src='${imageVariant}']`).closest('.product-image-carousel__indicator__item').data('slide-to');
		$('#product-image-carousel').carousel(targetIndicator);
	}
});

popopOver();

setTimeout(function () {
	if ($('.ig-reels-card').length > 0) {
		$('.ig-reels-card').each((index, el) => {
			const postId = $(el).find('video').data('id');
			$.get(`https://api.sandandsky.com/instagram/post_feed/${postId}`).then(function (data) {
				if (data) {
					const dataResp = JSON.parse(data);
					$(el).find('video').attr('poster', dataResp.post.thumbnail_url);
					$(el).find('video').html(`<source src='${dataResp.post.media_url}' type='video/mp4'>`);
				}
			});
		});
	}
}, 500);