import React from 'react';
import PropTypes from 'prop-types';
import SvgTickGreen from '~svg/tick-green-bg.svg';
import SvgPlusGreen from '~svg/plus-green-bg.svg';
import SvgChevronUp from '~svg/chevron-up.svg';
import SvgChevronDown from '~svg/chevron-down.svg';

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
				<span className="cart-upsell--arrow font-size-sm d-flex justify-content-end mb-2 mt-0 px-5 py-1">
					Pairs best with
					<SvgChevronUp className="svg ml-2" />
				</span>
				<div className="cart-upsell--pair d-flex p-g">
					<figure className="d-flex flex-grow-1 mb-0">
						<picture className="d-block flex-shrink-0">
							<source srcSet="https://via.placeholder.com/75x100" media="(min-width: 992px)" />
							<img src="https://via.placeholder.com/75x100" alt="" className="w-100" />
						</picture>
						<figcaption className="d-flex flex-column ml-g">
							<h5 className="font-size-sm font-weight-bold mb-2">Superchanrge your results with Detox Glow Kit</h5>
							<p className="font-size-xs mb-2">WHY: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
							<p className="mb-2">
								<span className="text-linethrough">$73.30</span>
								<span className="text-secondary font-weight-bold ml-1">$32.30</span>
							</p>
						</figcaption>
					</figure>
					<button type="submit" className="btn flex-column flex-shrink-0 align-items-center font-size-sm upsell__add btn__submit align-self-center p-0 d-none">
						<SvgTickGreen />
					</button>
					<button type="submit" className="btn flex-column flex-shrink-0 align-items-center font-size-sm upsell__add btn__submit align-self-center p-0">
						<SvgPlusGreen />
					</button>
				</div>
			</>
		);
	}
}

CartUpsell.propTypes = {
	upsell: PropTypes.object.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};
