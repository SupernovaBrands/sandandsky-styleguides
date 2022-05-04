import '~mod/header';

import React from 'react';
import ReactDOM from 'react-dom';
import Cart from '~comp/cart';

if ($('#cart-drawer').length > 0) {
	ReactDOM.render(
		React.createElement(Cart, {}, null),
		document.querySelector('#cart-drawer'),
	);
}

if ($('.hero-carousel').length > 0) {
	import(/* webpackChunkName: 'hero-carousel' */ '~mod/hero-carousel');
}

if ($('.carousel--scroll').length > 0) {
	import(/* webpackChunkName: 'carousel-scroll' */ '~mod/carousel-scroll');
}

if ($('.featured-products-aea-abtest').length > 0) {
	import(/* webpackChunkName: 'carousel-scroll' */ '~mod/featured-products-aea-abtest');
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

if ($('.react-yotpo-star').length > 0 || $('.react-yotpo-widget').length > 0) {
	import(/* webpackChunkName: 'yotpo' */ '~mod/yotpo').then(({ initYotpoStar, initReviewWidget }) => {
		if ($('.react-yotpo-star').length > 0) {
			initYotpoStar();
		}
		if ($('.react-yotpo-widget').length > 0) {
			initReviewWidget();
		}
	});
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
	import(/* webpackChunkName: 'predictive-search' */ '~mod/predictive-search');
}

if ($('.stockist').length > 0) {
	import(/* webpackChunkName: 'stockist' */ '~mod/stockist');
}

if ($('.carousel--loop').length > 0) {
	import(/* webpackChunkName: 'carousel-loop' */ '~mod/carousel-loop');
}

if ($('.reading-proggress-bar').length > 0) {
	import(/* webpackChunkName: 'article-progress-bar' */ '~mod/article-progress-bar');
}

if ($('.cookies-banner').length > 0) {
	import(/* webpackChunkName: 'cookies-banner' */ '~mod/cookies-banner.js');
}

if ($('.collection-template').length > 0) {
	import(/* webpackChunkName: 'collection-template' */ '~mod/collection-template');
}

if ($('.upsell__article').length > 0) {
	import(/* webpackChunkName: 'blog-upsell' */ '~mod/blog-upsell');
}

if ($('.modal--newsletter').length > 0) {
	import(/* webpackChunkName: 'modal-newsletter' */ '~mod/modal-newsletter');
}

if ($('.mobile-nav--abtest').length > 0) {
	import(/* webpackChunkName: 'mobile-menu-abtest' */ '~mod/mobile-menu-abtest').then(({ initMenuYotpoStar }) => {
		if ($('.react-menu-yotpo-star').length > 0) {
			initMenuYotpoStar();
		}
	});
}

if ($('.modal--sweepstakes').length > 0) {
	import(/* webpackChunkName: 'modal' */ '~mod/modal-sweepstakes');
}

if ($('.announcement-bar__timer').length > 0) {
	import(/* webpackChunkName: 'announcement-timer' */ '~mod/announcement-timer');
}

if ($('.range-tab').length > 0) {
	import(/* webpackChunkName: 'carousel-scroll' */ '~mod/range-section-abtest');
}
