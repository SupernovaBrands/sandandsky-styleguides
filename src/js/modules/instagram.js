/* global useLazyload */

import { getCookie, setCookie } from '~mod/utils';

const existingData = getCookie('ig_media');

const carouselSlide = (item) => (
	`<div class="carousel-item col-9"><a href="${item.link}" target="_blank"><img class="d-block w-100 ${useLazyload ? 'lazyload' : ''}" ${useLazyload ? 'data-' : ''}src="${item.image}" /></a></div>`
);

const fillCarousel = (items) => {
	$('.instagram-carousel .carousel-item').remove();
	items.forEach((item) => {
		$('.instagram-carousel .carousel-inner').append(carouselSlide(item));
	});
	$('.instagram-carousel .carousel--scroll').each((index, carousel) => {
		carousel.dispatchEvent(new CustomEvent('adjustThumb'));
	});
};

if (existingData) {
	fillCarousel(JSON.parse(existingData));
} else {
	$.get('http://cdn.sandandsky.com/instagram/sandandsky.json').then(function (data) {
		const dataMedia = [];
		for (let i = 0; i < 15; i += 1) {
			const d = data[i];
			let obj;
			if (d.media_type === 'VIDEO') {
				obj = { link: d.permalink, image: d.thumbnail_url };
			} else {
				obj = { link: d.permalink, image: d.media_url };
			}
			dataMedia.push(obj);
		}
		setCookie('ig_media', JSON.stringify(dataMedia));
		fillCarousel(dataMedia);
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
