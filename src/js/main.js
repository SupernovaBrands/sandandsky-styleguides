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
	import(/* webpackChunkName: 'predictive-search' */ '~mod/predictive-search');
}

if ($('.stockist').length > 0) {
	import(/* webpackChunkName: 'stockist' */ '~mod/stockist');
}

if ($('.carousel--loop').length > 0) {
	import(/* webpackChunkName: 'carousel-loop' */ '~mod/carousel-loop');
}
