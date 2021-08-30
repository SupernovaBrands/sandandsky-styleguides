import { getCookie, setCookie } from '~mod/utils';

const existingData = getCookie('ig_media');

const carouselSlide = (item) => (
	`<div class="carousel-item col-9 col-lg-1o5"><a href="${item.link}" target="_blank" class="embed-responsive embed-responsive-1by1 bg-shimmer"><noscript class="loading-lazy"><img class="d-block w-100 embed-responsive-item fit--cover" src="${item.image}" loading="lazy" /></noscript></a></div>`
);

const fillCarousel = (items) => {
	$('.instagram-carousel .carousel-item').remove();
	items.forEach((item) => {
		$('.instagram-carousel .carousel-inner').append(carouselSlide(item));
	});
	window.checkLazyImages();
	$('.instagram-carousel .carousel--scroll').each((index, carousel) => {
		carousel.dispatchEvent(new CustomEvent('adjustThumb'));
		if (items.length > 5) {
			carousel.querySelector('.carousel-control-next').classList.remove('d-none');
		}
	});
};

if (existingData) {
	fillCarousel(JSON.parse(existingData));
} else {
	$.get('https://cdn.sandandsky.com/instagram/sandandsky.json').then(function (data) {
		const dataMedia = [];
		for (let i = 0; i < 15; i += 1) {
			const d = data[i];
			const obj = { link: d.permalink, image: d.thumbnail_url };
			dataMedia.push(obj);
		}
		setCookie('ig_media', JSON.stringify(dataMedia));
		fillCarousel(dataMedia);
		$('.instagram-carousel .carousel-control-next').removeClass('d-none');
	}).catch(function () {
		fillCarousel([
			{ image: 'https://via.placeholder.com/255x255/?text=1' },
			{ image: 'https://via.placeholder.com/255x255/?text=2' },
			{ image: 'https://via.placeholder.com/255x255/?text=3' },
			{ image: 'https://via.placeholder.com/255x255/?text=4' },
			{ image: 'https://via.placeholder.com/255x255/?text=5' },
			{ image: 'https://via.placeholder.com/255x255/?text=6' },
			{ image: 'https://via.placeholder.com/255x255/?text=7' },
			{ image: 'https://via.placeholder.com/255x255/?text=8' },
		]);
	});
}
