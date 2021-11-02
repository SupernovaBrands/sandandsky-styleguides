/* eslint-disable import/prefer-default-export */

import React from 'react';
import ReactDOM from 'react-dom';
import YotpoStar from '~comp/mobile-menu-abtest';

export const initMenuYotpoStar = () => {
	const yotpoStars = document.querySelectorAll('.react-menu-yotpo-star');
	yotpoStars.forEach((el) => {
		ReactDOM.render(
			React.createElement(YotpoStar, {
				productId: parseInt(el.dataset.productId, 10),
				productUrl: el.dataset.productUrl,
				showScore: el.dataset.showScore === 'true',
				showTotal: el.dataset.showTotal === 'true',
				hideStars: el.dataset.hideStars === 'true',
				menuStars: el.dataset.hideStars === 'true',
			}, null),
			el,
		);
	});
};

$('#tab-1').on('show.bs.collapse', function () {
	$('#tab-1').find('.card-header').addClass('collapsed');
});

$('#tab-2').on('show.bs.collapse', function () {
	$('#tab-2').find('.card-header').addClass('collapsed');
});