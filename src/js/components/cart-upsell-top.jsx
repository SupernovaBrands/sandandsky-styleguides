import React from 'react';
import PropTypes from 'prop-types';
import SvgTickGreen from '~svg/tick-green-bg.svg';
import SvgPlusGreen from '~svg/plus-green-bg.svg';
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
			<>
				<div className="cart-upsell--top d-none p-g">
					<figure className="d-flex flex-grow-1 mb-0 align-items-center">
						<picture className="d-block flex-shrink-0">
							<source srcSet="https://via.placeholder.com/75x100" media="(min-width: 992px)" />
							<img src="https://via.placeholder.com/75x100" alt="" className="w-100" />
						</picture>
						<figcaption className="d-flex flex-column ml-g">
							<h5 className="font-size-sm font-weight-bold mb-1">{upsell.title}</h5>
							<p className="mb-2">
								{upsell.comparePrice > 0 && (<span className="text-linethrough mr-1">{formatMoney(upsell.comparePrice)}</span>)}
								<span className="font-weight-bold">{formatMoney(upsell.price)}</span>
							</p>
						</figcaption>
					</figure>

					<button type="submit" className="btn flex-column flex-shrink-0 align-items-center font-size-sm upsell__add btn__submit align-self-center p-0 d-none">
						<SvgTickGreen />
					</button>
					<button type="submit" onClick={(e) => { this.handleClick(upsell, e); }} disabled={this.state.isLoading} className="btn flex-column flex-shrink-0 align-items-center font-size-sm upsell__add btn__submit align-self-center p-0">
						<SvgPlusGreen />
					</button>
				</div>
				<hr />
			</>
		);
	}
}

CartUpsell.propTypes = {
	upsell: PropTypes.object.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};
