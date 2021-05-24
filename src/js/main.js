import '~mod/globals';

import React from 'react';
import ReactDOM from 'react-dom';
import QuantityBox from '~comp/quantity-box';

window.showGrid = function () {
	jQuery('body').append('<style type="text/css">.gridoverlay{position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:9999}.gridoverlay .col{height:100vh}.gridoverlay .col:before{content:"";display:block;background-color:rgba(0,123,255,0.3);height:100%}</style><div class="container gridoverlay"><div class="row"><div class="col"></div><div class="col"></div><div class="col"></div><div class="col"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div><div class="col d-none d-lg-block"></div></div></div>');
};

if ($('.carousel').length > 0) {
	import(/* webpackChunkName: 'carousel' */ '~mod/carousel');
}

const carouselLoop = $('.carousel--loop');
if (carouselLoop.length > 0) {
	import(/* webpackChunkName: 'carousel-loop' */ '~mod/carousel-loop');
}


if ($('body').hasClass('template-product')) {
	import(/* webpackChunkName: 'products' */ '~mod/products');
}

const qtyBoxes = document.querySelectorAll('.react-quantity-box');
qtyBoxes.forEach((el) => {
	ReactDOM.render(
		React.createElement(QuantityBox, { name: 'quantity', quantity: 1, editable: true }, null),
		el,
	);
});
