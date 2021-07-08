
const searchNode = $('input[name=q]')
const searchClear = $('.search-box__clear')
const searchNoResult = $('.search-box__no-result')
const searchHome = $('.search-box__home')
const searchResult = $('.search-box__result')
const searchTag = $('.search-box__tag')
var _Search = {
	init: function() {
		this.inputEventListener()
	},
	inputEventListener: function() {
		var input = searchNode 
		input.on("keyup", _Search.debounce(function(evt) {
				console.log('keyup', evt)
			if (evt.target.value == '') {
				searchClear.addClass('disabled')
				searchNoResult.hide()
			} else {
				searchClear.removeClass('disabled')
			}
			_Search.search(evt.target.value)
		}, 500));
		_Search.keywordListener(input)
		// _Search.navigation()
		searchClear.on('click', function() {
			_Search.clear()
		})
	},
	keywordListener: function(input) {
		searchTag.on('click', function(evt) {
			input.val(evt.target.textContent)
			_Search.search(evt.target.textContent)
			searchClear.removeClass('disabled')
		})
	},
	search: function(keyword) {
		console.log(keyword)
		_Search.loading(true)
		searchNoResult.hide()
		searchHome.hide()
		searchResult.hide()
		if (keyword == '') {
			_Search.loading(false)
			searchResult.hide()
			searchHome.show()
			return
		}
		
		searchResult.show()
		_Search.loading(false)

		/*
		jQuery.getJSON("/search/suggest.json", {
			"q": keyword,
			"resources": {
				"type": "product",
				"options": {
					"unavailable_products": "last",
					"fields": "tag,title"
				}
			}
		}).done(function(response) {
			console.log(response)
			var productSuggestions = response.resources.results.products;
			if (productSuggestions.length > 0) {
				console.log(productSuggestions)
				var firstProductSuggestion = productSuggestions[0];
				_Search.buildResult(productSuggestions)
				searchResult.show()
				_Search.loading(false)
				ga('send', 'event', 'ProductSearch', 'SearchKeyword', keyword);
				if (dataLayer) {
					dataLayer.push({event: 'ProductSearch', search_term: keyword})
				}
			} else {
				searchNoResult.show()
				searchHome.show()
				_Search.loading(false)
			}
		});
		*/
	},
	buildResult: function(results) {
		var $search_container = $('#search-products')
		$search_container.empty()

		var items = [],
				item = {},
				data = {},
				source = $('#searchRowTemplate').html(),
				template = Handlebars.compile(source)

		results = results.filter(function(i, index) {
			return i.type == 'HERO' || i.type == 'BUNDLE'
		})
		$.each(results, function(index, item) {
			var range = 'Aussie Skincare Essentials'
			if (item.title.includes('Tasmanian Spring Water')) {
				range = 'Tasmanian Spring Water'
			} else if (item.title.includes('Australian Pink Clay')) {
				range = 'Australian Pink Clay'
			} else if (item.title.includes('Australian Emu Apple')) {
				range = 'Australian Emu Apple'
			}
			item = {
				product_id: item.id,
				img: item.image,
				title: item.title.replace(range, ''),
				handle: item.handle,
				price: item.price,
				url: item.url,
				range: range
			}

			items.push(item)
		})
		var result_heading = $('.search-nav__result-wrapper').attr('data-heading')
		if (results.length > 0) {
			info = result_heading.replace('{{total}}', results.length)
		}

		data = {
			items: items
		}

		_Search.loading(false)
		
		$search_container.append(template(data))
		$('.result-heading').html(info)
		_Search.navigation()
	},
	debounce: function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}, wait);
			if (immediate && !timeout) func.apply(context, args);
		};
	},
	loading(state) {
		if (state) {
			$('.lds-ring').addClass('active')
			$('.search-nav__footer').hide()
		} else {
			$('.lds-ring').removeClass('active')
			$('.search-nav__footer').show()
		}
	},
	clear() {
		searchNode.val('')
		searchResult.hide()
		searchHome.show()
		searchClear.addClass('disabled')
		searchNoResult.hide()
	},
	panelToggle() {
		$('.mega-search-wrapper').toggleClass('active')
		$('body').toggleClass('body-search-open')
		if ($('.mega-search-wrapper').hasClass('active')) {
			var userDomain = window.location.hostname.split('.')[0];
			if (userDomain == 'us' || userDomain == 'www') {
				// hj('trigger', 'search_box');
			}
			document.getElementById('searchq').focus();
		}
	},
	navigation() {
		var contentWidth = ($('.item-link').length * 200) - 30
		var container = $('.search-nav__result').innerWidth()
		var elem = $(".search-nav__result-wrapper");
		var offset = elem.offset().left - elem.parent().offset().left;
		if (contentWidth <= container) {
			$('.search-nav__result-nav-right').addClass('disabled')
		} else {
			$('.search-nav__result-nav-right').removeClass('disabled')
		}
		$('.search-nav__result-nav-right').off().on('click',function() {
			var elem = $(".search-nav__result-wrapper");
			var offset = elem.offset().left - elem.parent().offset().left;
			
			var move = offset - container
			var spaceleft = contentWidth - (move * -1)
			elem.css('transform', 'translateX('+move+'px)')

			if (spaceleft <= container) {
				$('.search-nav__result-nav-right').addClass('disabled')
			} else {
				$('.search-nav__result-nav-right').removeClass('disabled')
			}
			if (move == 0) {
				$('.search-nav__result-nav-left').addClass('disabled')
			} else {
				$('.search-nav__result-nav-left').removeClass('disabled')
			}
		})

		$('.search-nav__result-nav-left').off().on('click', function() {
			var elem = $(".search-nav__result-wrapper");
			var offset = elem.offset().left - elem.parent().offset().left;
			var move = offset + container
			var spaceleft = contentWidth - (move * -1)
			elem.css('transform', 'translateX('+move+'px)')
			if (spaceleft <= container) {
				$('.search-nav__result-nav-right').addClass('disabled')
			} else {
				$('.search-nav__result-nav-right').removeClass('disabled')
			}
			if (move == 0) {
				$('.search-nav__result-nav-left').addClass('disabled')
			} else {
				$('.search-nav__result-nav-left').removeClass('disabled')
			}
		})
	}
}

$(document).ready(function(){
	_Search.init();
})