/* global tSettings tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney } from '~mod/utils';

export default class CartUpsell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: false };
	}

	handleClick = (item) => {
		this.setState({ isLoading: true });
		this.props.onAddUpsell(item).then(() => {
			this.setState({ isLoading: false });
			setTimeout(function () {
				$('#cart-drawer').animate({ scrollTop: 0 }, 'fast');
			}, 500);
		});
	}

	render() {
		const { upsell } = this.props;
		return (
			<div className="mt-3 mb-2">
				<div className="text-center bg-secondary text-white py-1 font-size-xs">{upsell.topbar}</div>
				<figure className="upsell bg-gray-100 media">
					<img src={upsell.image} srcSet={`${upsell.image} 1x, ${upsell.image2x} 2x`} alt={upsell.title || upsell.productTitle} />
					<figcaption className="media-body px-g py-2">
						<h5>{upsell.title || upsell.productTitle}</h5>
						<p className="font-size-sm mb-1">{upsell.description}</p>
						<button className="btn btn-block d-block mt-2 px-g btn-outline-primary text-nowrap" type="button" onClick={(e) => { this.handleClick(upsell, e); }} disabled={this.state.isLoading}>
							{this.state.isLoading ? (
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							) : (
								<>
									{upsell.comparePrice > 0 && (<span className="text-linethrough font-weight-normal mr-1">{formatMoney(upsell.comparePrice, tSettings.moneyFormatNoDecimal)}</span>)}
									<span className="mr-1">{formatMoney(upsell.price, tSettings.moneyFormatNoDecimal)}</span>
									{tStrings.addToCart}
								</>
							)}
						</button>
					</figcaption>
				</figure>
			</div>
		);
	}
}

CartUpsell.propTypes = {
	upsell: PropTypes.object.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};
