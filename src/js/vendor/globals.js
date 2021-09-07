window.assetUrl = function (filename) {
	return `/images/${filename}`;
};

window.ga = () => {};

window.productFormSubmit = (e) => {
	e.preventDefault();
	const form = e.target;
	const id = form.querySelector('input[name=id]').value;
	const quantity = form.querySelector('input[name=quantity]').value;
	const submitBtn = form.querySelectorAll('.btn__submit');
	const loadingBtn = form.querySelectorAll('.btn__loading');

	submitBtn.forEach((btn) => {
		btn.classList.add('d-none')
	});
	loadingBtn.forEach((btn) => {
		btn.classList.remove('d-none')
	});
	window.snCart.addItem(id, quantity).then(() => {
		submitBtn.forEach((btn) => {
			btn.classList.remove('d-none')
		});
		loadingBtn.forEach((btn) => {
			btn.classList.add('d-none')
		});
	});
}

window.customerEmail = "";
window.customerTags = "";

window.screenLG = 992;

window.tStrings = {
	"addToCart": "Add to cart",
	"quickBuy": "Quick Buy",
	"soldOut": "Sold Out",
	"unavailable": "Unavailable",
	"stockLabel": "[count] in stock",
	"savePrice": "Save [saved_amount]",
	"cartSavings": "You're saving [savings]",
	"cartTermsConfirmation": "You must agree with the terms and conditions of sales to check out",
	"soldOutWaitlist": "Waitlist Me",
	"addressError": "Error looking up that address",
	"addressNoResults": "No results for that address",
	"addressQueryLimit": "You have exceeded the Google API usage limit. Consider upgrading to a <a href=\"https://developers.google.com/maps/premium/usage-limits\">Premium Plan</a>.",
	"authError": "There was a problem authenticating your Google Maps account. Create and enable the <a href=\"https://developers.google.com/maps/documentation/javascript/get-api-key\">JavaScript API</a> and <a href=\"https://developers.google.com/maps/documentation/geocoding/get-api-key\">Geocoding API</a> permissions of your app.",
	"cartDrawerTitle": "Your Cart",
	"cartEmpty": "Your cart is currently empty.",
	"cartBundleOffer": "Bundle offer",
	"cartSubtotal": "Subtotal",
	"cartBundleDiscount": "Bundle Discount",
	"cartDiscount": "Discount",
	"cartDiscountApplied": "Promo code applied:",
	"cartShipping": "Shipping",
	"cartTotal": "Total",
	"cartDiscountInput": "Promo code",
	"cartDiscountApply": "Apply",
	"cartCheckout": "Secure Checkout",
	"cartTaxMessage": "Taxes and reward points calculated in checkout",
	"cartAcceptCards": "We accept all major credit cards",
	"add": "Add",
	"remove": "Remove",
	"items_selected": "items selected"
};

window.tSettings = {
	"brand": "sandandsky_shopify_dev",
	"cartType": "page",
	"moneyFormat": "${{amount}}",
	"moneyFormatNoDecimal": "${{amount_no_decimals}}",
	"moneyWithCurrencyFormat": "${{amount}} USD",
	"currency": "USD",
	"recentlyViewedEnabled": false,
	"quickView": false,
	"themeVersion": "1.3.2",
	"money": "USD",
	"yotpo": "fsMa7k39L38cMBQ4Js5RqWEWkzwctFnC9qneHywU",
	"permanent_domain": "dev-sandandsky.myshopify.com",
	"enable_swell": true,
	"exit_intent_enable": false,
	"range_placeholder": "Aussie Skincare Essentials",
	"tracking_url": "https://shipping-api-production.herokuapp.com/track_order.json",
	"tracking_store": "sandandsky_shopify_int",
	"extraButtons": false,
	"recentlyViewedEnabled": false,
	"shippingMeter": {
		"enabled": true,
		"inProgressText": "You are {{freeShippingBarRemaining}} away from free shipping",
		"finalText": "You've unlocked free shipping"
	},
	"discountTiers": {
		"enabled": false,
		"code": "vipsale",
		"tiers": [{
				"percentage": "0",
				"text": "You're $XX away from unlocking $10 off!",
				"min_spend": "0",
				"free_item": ""
			},
			{
				"percentage": "10",
				"text": "You're $XX away from unlocking $25 off!",
				"min_spend": "50",
				"free_item": ""
			},
			{
				"percentage": "25",
				"text": "You're $XX away from unlocking $35 off",
				"min_spend": "100",
				"free_item": ""
			},
			{
				"percentage": "35",
				"text": "Congratulations! You have unlocked the maximum offer",
				"min_spend": "150",
				"free_item": ""
			}
		]
	},
	"autoGwp": [{
			"enabled": true,
			"title": "Auto Add 1",
			"minPurchase": 0,
			"buyIds": "",
			"buySpecialIds": "39409197580359",
			"buyInvalidIds": "32588237766727, 32588237799495, 32588237832263, 32566347530311, 32714813833287, 32782314569799, 32227652567111, 32714693869639",
			"getIds": "32782237696071",
			"getItemQty": 1
		},
		{
			"enabled": true,
			"title": "Your Free Mitt Kit",
			"minPurchase": 0,
			"buyIds": "32613130600519, 32616597913671",
			"buySpecialIds": "",
			"buyInvalidIds": "",
			"getIds": "32578002845767",
			"getItemQty": 1
		},
		{
			"enabled": false,
			"title": "Auto Add 3",
			"minPurchase": 0,
			"buyIds": "32227653910599,32227653222471",
			"buySpecialIds": "",
			"buyInvalidIds": "",
			"getIds": "32717118734407",
			"getItemQty": 1
		},
		{
			"enabled": false,
			"title": "FREE Holiday Pouch",
			"minPurchase": 30,
			"buyIds": "",
			"buySpecialIds": "",
			"buyInvalidIds": "",
			"getIds": "32765064413255",
			"getItemQty": 1
		}
	],
	"manualGwp": {
		"enabled": true,
		"title": "Select your free travel serum",
		"minPurchase": 3000,
		"maxSelected": 1,
		"items": [{
				"id": 32766113579079,
				"title": "Travel Size Splash Serum",
				"price": "",
				"image": "//cdn.shopify.com/s/files/1/0277/5262/8295/files/select-travel-tsw_120x120_crop_center.jpg?v=1616387848"
			},
			{
				"id": 32766173806663,
				"title": "Travel Size Dreamy Glow Drops",
				"price": "$49.90",
				"image": "//cdn.shopify.com/s/files/1/0277/5262/8295/files/select-travel-dreamy_ac3374fd-1559-4e91-94b4-c8052097b191_120x120_crop_center.jpg?v=1616388135"
			},
			{
				"id": 39409242931271,
				"title": "Australian Emu Apple Dreamy Glow Drops Travel Size",
				"price": "",
				"image": "//cdn.shopify.com/s/files/1/0277/5262/8295/products/SS_Direct_Website_Carousel_DGD_Mini_1_AS_24032021_1312x_76c204bd-e21d-4e53-b0c7-56287c4848d3_120x120_crop_center.jpg?v=1625735752"
			},
			{
				"id": 39409242931271,
				"title": "Free Australian Emu Apple Dreamy Glow Drops",
				"price": "",
				"image": "//cdn.shopify.com/s/files/1/0277/5262/8295/products/SS_Direct_Website_Carousel_DGD_Mini_1_AS_24032021_1312x_76c204bd-e21d-4e53-b0c7-56287c4848d3_120x120_crop_center.jpg?v=1625735752"
			}
		]
	},
	"payment": {
		"afterpay": false,
		"klarna": false,
		"klarna_installment": 4,
		"installment_by_text": "translation missing: en.cart.general.installment_by_html"
	},
	"surveyCodes": [],
	"enable_custom_codes": false,
	"custom_codes_code": "",
	"custom_error_handles": "",
	"custom_error_codes_msg": "",
	"cart_code_rejection": false,
	"cart_code_rejection_msg": "",
	"swellDiscounts": [{
			"prefix": "vip2",
			"variant_id": "32782213120071"
		},
		{
			"prefix": "vip3",
			"variant_id": "32227653681223"
		}
	],
	"freeItemSKUs": {}
};
