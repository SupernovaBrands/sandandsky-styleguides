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
				<div className="text-center bg-secondary text-white py-1 font-size-xs">Save 20%</div>
				<figure className="upsell bg-gray-100 media">
					<img src="https://via.placeholder.com/132x146/F7E3F0" alt="" />
					<figcaption className="media-body px-g py-2">
						<h5>Dreamy Glow Drops Besties Kit</h5>
						<p className="font-size-sm mb-1">Porefining Face Mask (60g) + FREE applicator brush</p>
						<button className="btn d-block mt-2 px-g btn-outline-primary" type="button" onClick={(e) => { this.handleClick(upsell, e); }}>
							{this.state.isLoading ? (
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							) : (
								<>
									<span className="text-linethrough font-weight-normal mr-1">$299</span>
									<span className="mr-1">$99</span>
									Add to cart
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
