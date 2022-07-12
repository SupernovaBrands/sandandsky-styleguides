/* global tSettings tStrings */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReviewStar from '~comp/review-star';
import SvgFull from '~svg/star-full.svg';

const { yotpoKey } = tSettings;

const YotpoStar = (props) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		$.get(`https://api-cdn.yotpo.com/products/${yotpoKey}/${props.productId}/bottomline`).done(function (data) {
			setScore(data.response.bottomline.average_score);
			setTotal(data.response.bottomline.total_reviews);
			if (!init) {
				setInit(true);
			}
		});
	}, [props.productId]);

	if (!init) return (<div />);
	return props.hideStars ? (
		<div className="d-flex align-items-center">
			<SvgFull className="svg text-secondary" />
			<span className="ml-1 mt-1 font-size-xs">{`${score.toFixed(1)}/5.0`}</span>
			<span className="ml-1 mt-1 font-size-xs">
				<a className="text-underline text-nowrap text-body" href={`${props.productUrl}#write-a-review`}>{`${total} ${tStrings.yotpo.reviews}`}</a>
			</span>
		</div>
	) : (
		<div className="d-flex">
			<ReviewStar score={score} />
			{props.showScore && <span className="ml-1">{`${score.toFixed(1)} stars`}</span>}
			{props.showTotal && (
				<span className="ml-1">
					<a className="text-underline text-body" href={`${props.productUrl}#write-a-review`}>{`${total} ${tStrings.yotpo.reviews}`}</a>
				</span>
			)}
		</div>
	);
};

YotpoStar.propTypes = {
	productId: PropTypes.number.isRequired,
	productUrl: PropTypes.string,
	showScore: PropTypes.bool,
	showTotal: PropTypes.bool,
	hideStars: PropTypes.bool,
};

YotpoStar.defaultProps = {
	productUrl: '',
	showScore: false,
	showTotal: true,
	hideStars: false,
};

export default YotpoStar;
