window.useLazyload = false;

window.theme = {
	AjaxProduct: class AjaxProduct {
		constructor(el) {
			this.el = el;
		}
	},
};


window.assetUrl = function (filename) {
	return `/images/${filename}`;
};

window.screenLG = 992;
window.tStrings = {
	addToCart: 'Add To Cart',
	soldOut: 'Out of stock',
	waitlistTxt: 'Waitlist Me',
	unavailable: 'Unavailable',
	shopAll: 'Shop All',
	shopLabel: 'Shop',
	estimated_delivery_text: '*Estimated delivery 28 Jan',
	cart_drawer_title: 'Your Cart',
	cart_empty: 'Your cart is currently empty.',
	cart_subtotal: 'Subtotal',
	cart_shipping: 'Shipping',
	cart_coupon_txt: '',
	cart_discount_text: 'Apply a promo code',
	cart_discount_input: 'Enter promo code here',
	cart_discount_apply: 'Apply',
	cart_discount_remove: 'Remove',
	cart_total: 'Total',
	cart_question: '<p>Got a question? Email us at: <a href="mailto:hello@cocoandeve.com" title="mailto:hello@cocoandeve.com">hello@cocoandeve.com</a></p>',
	cart_checkout: 'Secure Checkout',
	discount_error: 'Oops, this code cannot be applied to your order.',
	discount_min_spend: 'This coupon code is eligible for orders over',
	items_selected: 'items selected',
	add: 'Add',
	remove: 'Remove',
	thankyou_shipping_text: "<p>You'll get shipping and delivery updates by email.<br>In addition you can:</p>",
	shade_note: 'Shade',
	code_replacing_error: 'Limited to 1 code per order. [previous_code] is removed. [new_code] is applied.',
	discount_title: 'Discount',
	cart_installment_by: 'or [num] interest-free installments of <b>[amount]</b> by',
};

window.tSettings = {
	domain: 'dev.cocoandeve.com',
	store: 'dev',
	locale: 'en',
	currency: 'USD',
	// eslint-disable-next-line no-template-curly-in-string
	moneyFormat: '${{amount}}',
	// eslint-disable-next-line no-template-curly-in-string
	moneyWithCurrencyFormat: '${{amount}} USD',
	currencyFormat: 'money_format',
	variantNotification: [
		32068892688419,
		32068892721187,
		32068891574307,
		32363243831331,
	],
	range_placeholder: 'Aussie Skincare Essentials',
	launch_wl_submit_event: '',
	gdpr_performace_list: '_ga;_gid;_gat',
	gdpr_ads_list: '_gads;__cfduid;ghostmonitor_sesion_id;liveconnect;postie;_fbp',
	chk_medium: true,
	chk_dark: false,
	chk_ultra: true,
	chk_medium_bundle: false,
	chk_dark_bundle: false,
	chk_ultra_bundle: false,
	enable_tan_change: true,
	variant_color_add_to_cart: 'Add To Cart',
	tan_single_variant_id: '',
	tan_bundle_variant_id: '',
	tan_masque_glossy_bundle: '',
	tan_deluxe_travel_kit: '',
	enable_free_shipping_measure: true,
	checkout_agreeement: 'By clicking complete order, you agree to our <a href="/pages/terms-conditions">Terms and Conditions</a>',
	checkout_agreeement_de: 'Wenn Sie auf Bestellung abschließen klicken, stimmen Sie unseren <a href="/pages/terms-conditions">Geschäftsbedingungen zu</a>',
	return_link_en: 'Return to Shop',
	return_link_de: 'Zurück zum Shop',
	ab_checkout_express: '',
	upsell_header_title: 'Add these bestsellers',
	upsell_shade: 'Medium,Dark,Ultra Dark',
	upsell_shade_label: 'Shade',
	upsell_auto: true,
	upsell_max_item: 2,
	upsell_btn_label: 'Add to Cart',
	enable_custom_codes: true,
	custom_codes_code: 'SECRET25',
	custom_error_codes_msg: 'Oops, this code cannot be applied to new products and bundles.',
	custom_error_handles: 'bronzing-self-tanner-drops,glow-essentials,glowy-face-tan-set,miracle-elixir-hair-oil-treatment,clean-scalp-treatment,silky-hair-set,healthy-hair-bundle',
	cartShippingMeter: {
		enable: true,
		inProgressText: '#{shipping_price} away from free shipping',
		finalText: 'Congrats! Your order qualifies for free shipping!',
		barColor: '#f4436c',
	},
	cart_payment_icons: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/ShopifyPaymentLogos.png?v=1599485964',
	cartUpsellCollection: [],
	cartUpsell: [
		{
			upgrade_bundle_method: 'keep',
			when_contain_product: '32068891541539,32068891607075,32068891639843',
			replace_product_bundle: '32068891246627,32068891279395,32068891312163',
			bundle_front_image_200: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/unnamed-_1_200x200.jpg?v=1600406474',
			bundle_front_image: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/unnamed-_1_{width}x.jpg?v=1600406474',
			product_handle: 'get-glossy-glowy-kit',
			bundle_ad_product_name: 'Get Glossy & Glow Kit',
			bundle_ad_product_desc: '1 x Like A Virgin Hair Masque <br> 1 x Bali Bronzing Foam',
			bundle_txt_button: 'Add to cart',
		},
		{
			upgrade_bundle_method: 'keep',
			when_contain_product: '32068892688419',
			replace_product_bundle: '32374478176291',
			bundle_front_image_200: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Main-pdp_200x200.jpg?v=1600406215',
			bundle_front_image: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/Main-pdp_{width}x.jpg?v=1600406215',
			product_handle: 'healthy-hair-bundle',
			bundle_ad_product_name: 'Healthy Hair Bundle',
			bundle_ad_product_desc: '1 x Deep Clean Scalp Scrub <br>1 x Super Nourishing Hair Masque (212ml)',
			bundle_txt_button: 'Add to cart',
		},
		{
			upgrade_bundle_method: 'keep',
			when_contain_product: '32363243831331',
			replace_product_bundle: '32891615510563',
			bundle_front_image_200: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/03--Mixing-with-Moisturiser_1000x-2_200x200.png?v=1606804632',
			bundle_front_image: '//cdn.shopify.com/s/files/1/0286/1327/9779/files/03--Mixing-with-Moisturiser_1000x-2_{width}x.png?v=1606804632',
			product_handle: 'glow-essentials',
			bundle_ad_product_name: 'Glow Essentials Bundle',
			bundle_ad_product_desc: '1x Bronzing Face Drops Medium Shade (30ml)',
			bundle_txt_button: 'Add to cart',
		},
	],
	autoGwp: {
		enabled: true,
		isBuyAny: false,
		prerequisiteIds: '32068892426275',
		freeItemIds: '32068890624035',
		freeQuantity: 1,
		minPurchase: '0',
	},
	manualGwp: {
		enabled: true,
		title: 'Select your free gift',
		minPurchase: 3000,
		maxSelected: 1,
		items: [
			{
				id: 32986612924451,
				title: 'FREE Silky Face Mask',
				price: '$11.90',
				image: '//cdn.shopify.com/s/files/1/0286/1327/9779/products/FaceMask-Productshot2_6fbd178a-651d-46f2-b0ad-aa804e876470_120x.jpg?v=1608195616',
			},
			{
				id: 39294074257443,
				title: 'FREE Satin Eye Mask - Pink',
				price: '$15.90',
				image: '//cdn.shopify.com/s/files/1/0286/1327/9779/products/C7-EyeMask-pinkprint_1_95ff7d2f-1b6d-4a2b-9175-d6971675e65f_120x.jpg?v=1618989343',
			},
			{
				id: 39295700959267,
				title: 'FREE Satin Eye Mask - Green',
				price: '$15.90',
				image: '//cdn.shopify.com/s/files/1/0286/1327/9779/products/C7-EyeMask-baliprint_1_9e4ee86a-c606-49f9-bc1f-72d22646ded5_120x.jpg?v=1619061719',
			},
		],
	},
	payment: {
		klarna: true,
		klarna_installment: 3,
		afterpay: false,
	},
	surveyCodes: [
		'thankyou50',
	],
};
