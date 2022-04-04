/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
				<figure className="upsell bg-gray-100 media p-g">
					<LazyLoadImage src={upsell.image} srcSet={`${upsell.image} 1x, ${upsell.image2x} 2x`} alt={upsell.title || upsell.productTitle} />
					<figcaption className="media-body pl-g">
						<h5>{upsell.title || upsell.productTitle}</h5>
						<p className="font-size-sm mb-2">{upsell.description}</p>
						<p className="font-size-sm mb-2">
							<span className="font-weight-bold mr-1">{formatMoney(upsell.price)}</span>
							{upsell.comparePrice > 0 && (<span className="text-linethrough mr-1">{formatMoney(upsell.comparePrice)}</span>)}
						</p>
						<button className="btn col-10 btn-outline-primary btn-outline-black text-nowrap" type="button" onClick={(e) => { this.handleClick(upsell, e); }} disabled={this.state.isLoading}>
							{this.state.isLoading ? (
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							) : tStrings.addToCart}
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
