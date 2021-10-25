import React from 'react';
import ReactDOM from 'react-dom';
import YotpoStar from '~comp/yotpo-star';
import YotpoReviewWidget from '~comp/yotpo-review-widget';

export const initYotpoStar = () => {
	const yotpoStars = document.querySelectorAll('.react-yotpo-star');
	yotpoStars.forEach((el) => {
		ReactDOM.render(
			React.createElement(YotpoStar, {
				productId: parseInt(el.dataset.productId, 10),
				productUrl: el.dataset.productUrl,
				showScore: el.dataset.showScore === 'true',
				showTotal: el.dataset.showTotal === 'true',
				hideStars: el.dataset.hideStars === 'true',
			}, null),
			el,
		);
	});
};

export const initReviewWidget = () => {
	const widgets = document.querySelectorAll('.react-yotpo-widget');
	widgets.forEach((el) => {
		ReactDOM.render(
			React.createElement(YotpoReviewWidget, {
				productId: parseInt(el.dataset.productId, 10),
				productName: el.dataset.name || '',
				productUrl: el.dataset.url || '',
				productImage: el.dataset.imageUrl || '',
				productDesc: el.dataset.description || '',
				canCreate: el.dataset.canCreate === 'true',
				reviewOnly: el.dataset.reviewOnly === 'true',
			}, null),
			el,
		);
	});
};

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