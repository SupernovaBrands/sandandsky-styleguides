/* global tStrings tSettings */

import React from 'react';
import PropTypes from 'prop-types';

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
			<div className="mt-1 d-flex flex-column align-items-start">
				<input type="hidden" name="discount" value={code} />
				<p className="font-size-xs text-muted mb-1">Promo code applied</p>
				<div className="bg-light d-flex align-items-center d-inline-block p-1">
					<i className="sni-text mr-1" aria-hidden="true">tag</i>
					{code}
					{!isAutoDiscount && (
						<button className="btn-unstyled ml-1 sni sni__close-circle" onClick={this.removeDiscount} type="button" aria-label="Remove Discount" />
					)}
				</div>
				{errorExtra && (
					<p className="small text-danger mt-1 mb-0">{tSettings.custom_error_codes_msg}</p>
				)}
			</div>
		) : (
			<div className="d-flex flex-wrap mt-1">
				<label htmlFor="cart-discount" className="floating-label position-relative flex-grow-1 mr-1 mb-0">
					<input id="cart-discount" type="text" name="discount" className="form-control form-control-lg text-body" placeholder={tStrings.cart_discount_input} value={code} onChange={this.onTextChange} onKeyUp={this.onKeyUp} readOnly={loading} />
					<span className="floating-label__text position-absolute font-size-sm">{tStrings.cart_discount_input}</span>
				</label>
				<button className="btn btn-lg btn-outline-primary" type="button" onClick={this.applyDiscount} disabled={!code}>
					{loading ? (<div className="spinner-border" role="status" />) : tStrings.cart_discount_apply}
				</button>
				{error && (
					<p className="small text-danger mb-0 w-100">{error}</p>
				)}
			</div>
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
