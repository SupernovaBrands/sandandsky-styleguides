/* global tStrings tSettings */

import React from 'react';
import PropTypes from 'prop-types';

import SvgTag from '~svg/tag.svg';
import SvgCloseCircle from '~svg/close-circle.svg';
import SvgPercent from '~svg/percent-square.svg';
import MenuBannerDecorative from '~svg/menu-banner-decoration.svg';

export default class CartDiscountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			prevCode: '',
			error: '',
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.prevCode !== nextProps.code) {
			return {
				prevCode: nextProps.code,
				code: nextProps.code,
				error: nextProps.error,
			};
		}
		return {
			error: nextProps.error,
		};
	}

	onTextChange = (e) => {
		const { target: { value } } = e;
		this.setState({ code: value });
	}

	onKeyUp = (e) => {
		if (e.keyCode === 13) {
			this.applyDiscount(e);
		}
	}

	applyDiscount = (e) => {
		e.stopPropagation();
		this.setState((prevState) => ({ code: prevState.code.trim() }), () => {
			this.props.onApply(this.state.code);
		});
	}

	removeDiscount = (e) => {
		e.stopPropagation();
		this.props.onRemove();
	}

	render() {
		const {
			isApplied,
			loading,
			isAutoDiscount,
			errorExtra,
		} = this.props;
		const {
			code,
			error,
		} = this.state;

		return isApplied ? (
			<div className="mt-1 d-flex align-items-center">
				<input type="hidden" name="discount" value={code} />
				<p className="font-size-sm text-muted mb-0 mr-2">{tStrings.cartDiscountApplied}</p>
				<div className="bg-light d-flex align-items-center p-1 rounded-lg text-muted">
					<SvgTag className="svg font-size-sm mr-1" />
					{code}
					{!isAutoDiscount && (
						<button className="d-flex btn-unstyled ml-1 text-muted" onClick={this.removeDiscount} type="button" aria-label="Remove Discount" data-cy="cart-removepromo-icon">
							<SvgCloseCircle class="svg" />
						</button>
					)}
				</div>
				{errorExtra && (
					<p className="small text-danger mt-1 mb-0">{tSettings.custom_error_codes_msg}</p>
				)}
			</div>
		) : (
			<>
				<div className="d-flex flex-wrap mt-1">
					<label htmlFor="cart-discount" className="floating-label position-relative flex-grow-1 mr-1 mb-0">
						<input id="cart-discount" type="text" name="discount" className="form-control font-size-sm text-body" placeholder={tStrings.cartDiscountInput} value={code} onChange={this.onTextChange} onKeyUp={this.onKeyUp} readOnly={loading} data-cy="cart-discount" />
						<span className="floating-label__text position-absolute font-size-sm">{tStrings.cartDiscountInput}</span>
					</label>
					<button className="btn btn-lg btn-outline-primary" type="button" onClick={this.applyDiscount} disabled={!code} data-cy="apply-btn">
						{loading ? (<div className="spinner-border spinner-border-sm" role="status" />) : tStrings.cartDiscountApply}
					</button>
					{error && (
						<p className="small text-danger mb-0 w-100">{error}</p>
					)}
				</div>
				<div className="discount__banner position-relative m-0 d-flex px-g py-2 bg-primary-light mt-2">
					<SvgPercent className="svg text-primary" />
					<div className="mobile-nav__banner-content pl-g d-flex justify-content-between w-100">
						<p className="mb-0">10% off on all bundles!<br />promocode: <b>AFTERPAY10</b></p>
						<span className="d-flex text-primary font-weight-bold align-items-center ">Use</span>
					</div>
					<MenuBannerDecorative className='svg position-absolute banner-decoration' />
				</div>
			</>
		);
	}
}

CartDiscountForm.propTypes = {
	isApplied: PropTypes.bool.isRequired,
	code: PropTypes.string.isRequired,
	isAutoDiscount: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	errorExtra: PropTypes.bool.isRequired,
	onApply: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};
