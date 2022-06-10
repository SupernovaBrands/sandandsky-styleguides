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
	const isPdpUpsell = form.classList.contains('upsell__pdp');
	const submitUpsell = form.querySelector('.upsell__pdp button[type=submit]');
	const spinLoading = form.querySelector('button[type=submit] .spinner-border');
	const atcText = form.querySelector('.btn__submit-text');
	const isPdp = form.classList.contains('product-form');

	if (isPdpUpsell) {
		submitUpsell.setAttribute('disabled', true);
		spinLoading.classList.remove('d-none');
		atcText.classList.add('invisible');
	}

	submitBtn.forEach((btn) => {
		if (isPdp) {
			btn.setAttribute('disabled', true);
			btn.querySelector('.spinner-border').classList.remove('d-none');
			btn.querySelector('.btn__submit-text').classList.add('invisible');
		} else {
			btn.classList.add('d-none');
		}
	});
	loadingBtn.forEach((btn) => {
		btn.classList.remove('d-none')
	});
	window.snCart.addItem(id, quantity).then(() => {
		submitBtn.forEach((btn) => {
			if (isPdp) {
				btn.setAttribute('disabled', false);
				btn.querySelector('.spinner-border').classList.add('d-none');
				btn.querySelector('.btn__submit-text').classList.remove('invisible');
			} else {
				btn.classList.remove('d-none');
			}
		});
		loadingBtn.forEach((btn) => {
			btn.classList.add('d-none')
		});

		if (isPdpUpsell) {
			spinLoading.classList.add('d-none');
			submitUpsell.setAttribute('disabled', false);
			atcText.classList.remove('invisible');
		}
	});
};

window.variantAvailable = (variantSelected) => {
	const variantId = variantSelected.getAttribute('data-variant-id');
	const mobileSwatchbtn = document.querySelector('.product-swatch-mobile__trigger');
	const addCartBtn = document.querySelectorAll('.product-form button.btn:not(.klarna__close):not(.modal--waitlist__submit)');
	document.getElementById('variantid').value = variantId;

	const productWaitlistForm = document.querySelector('.product__waitlist-form');
	if (productWaitlistForm) {
		productWaitlistForm.classList.add('d-none');
	}

	if (addCartBtn) {
		let btnText;
		addCartBtn.forEach((btn) => {
			if (btn.closest('div').classList.contains('d-none')) {
				btn.closest('div').classList.add('d-flex');
				btn.closest('div').classList.remove('d-none');
			}
			if (variantSelected.getAttribute('data-waitlist') === 'true') {
				btnText = mobileSwatchbtn.getAttribute('data-waitlist');
				btn.removeAttribute('disabled');
				btn.classList.add('btn-primary');
				btn.classList.remove('bg-gray-400');
				
				if (productWaitlistForm) {
					btn.closest('div').classList.add('d-none');
					btn.closest('div').classList.remove('d-flex');
					productWaitlistForm.classList.remove('d-none');
				}
			} else if (variantSelected.getAttribute('data-available') === 'false') {
				btnText = mobileSwatchbtn.getAttribute('data-oos');
				btn.setAttribute('disabled', 'disabled');
				btn.classList.remove('btn-primary');
				btn.classList.add('bg-gray-400');
			} else {
				btnText = mobileSwatchbtn.getAttribute('data-text');
				btn.removeAttribute('disabled');
				btn.classList.remove('bg-gray-400');
				btn.classList.add('btn-primary');
			}
			// eslint-disable-next-line no-param-reassign
			if (btn.querySelector('.btn__submit-text')) btn.querySelector('.btn__submit-text').textContent = btnText;
		});
	}
};

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
	"items_selected": "items selected",
	yotpo: {
		writeReview: 'Write a Review',
		askQuestion: 'Ask a Question',
		averageRating: 'Average rating',
		requiredField: 'Indicates a required field',
		score: 'Score',
		title: 'Title',
		review: 'Review',
		name: 'Use your name',
		email: 'Email',
		question: 'Question',
		scoreError: 'Please enter a star rating for this review',
		titleError: 'Review\'s title & body can\'t be empty',
		reviewError: 'Review\'s title & body can\'t be empty',
		nameError: 'Name field cannot be empty',
		emailError: 'Invalid email',
		questionError: 'Question\'s body can\'t be empty',
		formError: 'One or more of your answers does not meet the required criteria',
		submit: 'Submit',
		reviews: 'Reviews',
		questions: 'Questions',
		answer: 'Answer',
		qnas: 'Q&As',
		reviewsDisplayed: "Reviews displayed",
		readMore: 'Read More',
		readLess: 'Read Less',
		thanksReviewTitle: 'THANK YOU FOR POSTING A REVIEW!',
		thanksReviewText: 'We value your input. Share your review so everyone else can enjoy it too.',
		thanksQuestionTitle: 'THANK YOU FOR POSTING A QUESTION!',
		thanksQuestionText1: 'Please click on the link in the confirmation email we just sent you to submit your question.',
		thanksQuestionText2: 'Your question will appear on the site once someone answers it.',
		filterReviews: 'Filter reviews',
		searchReviews: 'Search Reviews',
		rating: 'Rating',
		imageVideo: 'Images & Videos',
		withImageVideo: 'With Images & Videos',
		beFirstReview: 'Be the first to write a review',
		noReviewFilter: 'Sorry, no reviews match your criteria. Clear or modify your filters and try again.',
		verifiedBuyer: 'Verified Buyer',
		reviewHelpful: 'Was This Review Helpful?',
		beFirstQuestion: 'Be the first to ask a question',
		verifiedReviewer: 'Verified Reviewer',
		storeOwner: 'Store Owner',
		answerHelpful: 'Was This Answer Helpful?',
	}
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
	"yotpoKey": "fsMa7k39L38cMBQ4Js5RqWEWkzwctFnC9qneHywU", // dev
	// "yotpoKey": "QYIrC3wEbDnSbfUwWfhDG5Q1zkGlf7b4n2qFDPzg", // us
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
