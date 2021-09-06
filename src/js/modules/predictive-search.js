/* global Handlebars */
const searchNode = $('input[name=q]');
const searchClear = $('.search-box__clear');
const searchNoResult = $('.search-box__no-result');
const searchHome = $('.search-box__home');
const searchResult = $('.search-box__result');
const searchTag = $('.search-box__tag');
const SearchBox = {
	init() {
		this.inputEventListener();
	},
	inputEventListener() {
		const input = searchNode;
		input.on('keyup', SearchBox.debounce(function (evt) {
			if (evt.target.value === '') {
				searchClear.addClass('disabled');
				searchNoResult.hide();
			} else {
				searchClear.removeClass('disabled');
			}
			SearchBox.search(evt.target.value);
		}, 500));
		SearchBox.keywordListener(input);
		searchClear.on('click', function () {
			SearchBox.clear();
		});

		$('header .sni__search, .search-box__top .sni__close').on('click', function () {
			SearchBox.searchBoxToggle();
		});
	},
	searchBoxToggle() {
		$('.search-box').toggleClass('show');
		$('body').toggleClass('search-box-active');
	},
	keywordListener(input) {
		searchTag.on('click', function (evt) {
			input.val(evt.target.textContent);
			SearchBox.search(evt.target.textContent);
			searchClear.removeClass('disabled');
		});
	},
	search(keyword) {
		SearchBox.loading(true);
		searchNoResult.hide();
		searchHome.hide();
		searchResult.hide();
		if (keyword === '') {
			SearchBox.loading(false);
			searchResult.hide();
			searchHome.show();
			return;
		}

		searchResult.show();
		SearchBox.loading(false);

		/*
		jQuery.getJSON('/search/suggest.json', {
			q: keyword,
			resources: {
				type: 'product',
				options: {
					unavailable_products: 'last',
					fields: 'tag,title',
				},
			},
		}).done(function (response) {
			const productSuggestions = response.resources.results.products;
			if (productSuggestions.length > 0) {
				SearchBox.buildResult(productSuggestions);
				searchResult.show();
				SearchBox.loading(false);
				// ga('send', 'event', 'ProductSearch', 'SearchKeyword', keyword);
				// if (dataLayer) {
				// 	dataLayer.push({event: 'ProductSearch', search_term: keyword});
				// }
			} else {
				searchNoResult.show();
				searchHome.show();
				SearchBox.loading(false);
			}
		});
		*/
	},
	buildResult(results) {
		const $searchContainer = $('#search-products .carousel-inner');
		$searchContainer.empty();

		const items = [];
		const source = $('#searchRowTemplate').html();
		const template = Handlebars.compile(source);

		const resultsFiltered = results.filter(function (i) {
			return i.type === 'HERO' || i.type === 'BUNDLE';
		});
		$.each(resultsFiltered, function (index, item) {
			let range = 'Aussie Skincare Essentials';
			if (item.title.includes('Tasmanian Spring Water')) {
				range = 'Tasmanian Spring Water';
			} else if (item.title.includes('Australian Pink Clay')) {
				range = 'Australian Pink Clay';
			} else if (item.title.includes('Australian Emu Apple')) {
				range = 'Australian Emu Apple';
			}

			const itemRow = {
				product_id: item.id,
				img: item.image,
				title: item.title.replace(range, ''),
				handle: item.handle,
				price: item.price,
				url: item.url,
				range,
			};

			items.push(itemRow);
		});
		let info = 0;
		const resultHeading = $searchContainer.attr('data-heading');
		if (resultsFiltered.length > 0) {
			info = resultHeading.replace('_total_', results.length);
		}

		const data = {
			items,
		};

		SearchBox.loading(false);
		$searchContainer.append(template(data));
		$('#search-result-heading').html(info);
	},
	debounce(func, wait, immediate) {
		let timeout;
		return function () {
			const context = this;
			// eslint-disable-next-line prefer-rest-params
			const args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}, wait);
			if (immediate && !timeout) func.apply(context, args);
		};
	},
	loading(state) {
		if (state) {
			$('.lds-ring').addClass('active');
			$('.search-nav__footer').hide();
		} else {
			$('.lds-ring').removeClass('active');
			$('.search-nav__footer').show();
		}
	},
	clear() {
		searchNode.val('');
		searchResult.hide();
		searchHome.show();
		searchClear.addClass('disabled');
		searchNoResult.hide();
	},
	panelToggle() {
		$('.mega-search-wrapper').toggleClass('active');
		$('body').toggleClass('body-search-open');
		if ($('.mega-search-wrapper').hasClass('active')) {
			document.getElementById('searchq').focus();
		}
	},
};

$(document).ready(function () {
	SearchBox.init();
});
