import '~mod/header';

import React from 'react';
import ReactDOM from 'react-dom';
import Cart from '~comp/cart';

if ($('#cart-drawer').length > 0) {
	window.cartUpsellEnable = true;
	window.cartUpsellItems = [
		{
			cart_item: 39409261805639,
			upsell_product_handle: 'porefining-face-mask',
			upsell_item: 32227653910599,
			upsell_item_title: 'Australian Pink Clay Porefining Face Mask',
			upsell_item_variant_title: 'Porefining Face Mask',
			upsell_price: 3990,
			upsell_compare_price: 0,
			upsell_image: '//cdn.shopify.com/s/files/1/0277/5262/8295/products/SS_EcommHeo_SB_All_SetUp_1121SS_Ecomm_Hero_SB_APC_PFM_Crop_23_1_100x126_crop_center.jpg?v=1637739942',
			upsell_image_2x: '//cdn.shopify.com/s/files/1/0277/5262/8295/products/SS_EcommHeo_SB_All_SetUp_1121SS_Ecomm_Hero_SB_APC_PFM_Crop_23_1_200x252_crop_center.jpg?v=1637739942',
			url: '/products/porefining-face-mask?variant=39409261805639',
			priority: '2',
			topbar: 'Bundle up and SAVE 20%',
			title: 'Add our Australian Pink Clay Mask',
			replace_item: 32227653222471,
			upsell_image_kit: '//cdn.shopify.com/s/files/1/0277/5262/8295/products/SS_Ecomm_Hero_SB_APC_PerfectSkinKit_23_1_100x126_crop_center.jpg?v=1637739840',
			upsell_image_kit_2x: '//cdn.shopify.com/s/files/1/0277/5262/8295/products/SS_Ecomm_Hero_SB_APC_PerfectSkinKit_23_1_200x252_crop_center.jpg?v=1637739840',
			upsell_kit_price: 6140,
			upsell_kit_compare_price: 7680,
			upsell_kit_description: '<b>Drastically reduce congestion and pore size</b><br>1x Porefining Face Mask <br>1x Flash Perfection Exfoliator',
			description: 'Show your pores whos boss',
		},
	];

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

if ($('#tabFeaturedProductHead').length > 0) {
	import(/* webpackChunkName: 'carousel-scroll' */ '~mod/featured-products-tab');
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

if ($('.modal--waitlist').length > 0 || $('.product__waitlist-form').length > 0) {
	import(/* webpackChunkName: 'modal' */ '~mod/product-waitlist');
}

if ($('.announcement-bar__timer').length > 0) {
	import(/* webpackChunkName: 'announcement-timer' */ '~mod/announcement-timer');
}
