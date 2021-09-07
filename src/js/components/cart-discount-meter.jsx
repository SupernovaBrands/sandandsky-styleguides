/* global tSettings */

import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney } from '~mod/utils';

const CartDiscountMeter = (props) => {
	const {
		target,
		current,
		progressText,
		finalText,
	} = props;

	const remaining = target - current;
	const progress = remaining <= 0 ? 100 : Math.floor((current / target) * 100);
	const amount = formatMoney(remaining);
	const text = remaining <= 0 ? finalText : progressText.replace('{{freeShippingBarRemaining}}', amount);

	return (
		<div className="bg-secondary-light mx-ng mb-2 px-4 py-2">
			<p className="font-size-sm mb-2">{text}</p>
			<div className="progress bg-white mb-1">
				<div
					className="progress-bar bg-secondary"
					style={{ width: `${progress}%` }}
					role="progressbar"
					aria-label="progress"
					aria-valuenow={progress}
					aria-valuemin="0"
					aria-valuemax="100"
				/>
			</div>
		</div>
	);
};

CartDiscountMeter.propTypes = {
	target: PropTypes.number,
	current: PropTypes.number,
	progressText: PropTypes.string,
	finalText: PropTypes.string,
};

CartDiscountMeter.defaultProps = {
	target: 0,
	current: 0,
	progressText: tSettings.shippingMeter.inProgressText,
	finalText: tSettings.shippingMeter.finalText,
};

export default CartDiscountMeter;
