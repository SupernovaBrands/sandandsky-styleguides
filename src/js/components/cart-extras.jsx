/* global tSettings tStrings cartSettings assetUrl Afterpay */

import React from 'react';
import PropTypes from 'prop-types';

import {
	formatMoney,
} from '~mod/utils';

import SvgCard from '~svg/credit-card.svg';

let currency;
let locale;
if (window.Afterpay !== undefined) {
	currency = 'USD';
	locale = 'en_US';
	if (tSettings.store === 'au') {
		currency = Afterpay.currency.AUD;
		locale = 'en_AU';
	} else if (tSettings.store === 'ca') {
		currency = Afterpay.currency.CAD;
		locale = 'en_CA';
	}
}

export default class CartExtras extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalPrice: props.totalPrice,
			afterpay: cartSettings.payment.afterpay,
			klarna: cartSettings.payment.klarna,
			klarna_installment: cartSettings.payment.klarna_installment,
		};

		$('#modal-klarna').on('show.bs.modal', function () {
			$('body').addClass('show-modal-klarna');
		});

		$('#modal-klarna').on('hidden.bs.modal', function () {
			if ($('.cart-drawer').hasClass('show')) {
				$('body').removeClass('show-modal-klarna').addClass('modal-open');
			} else {
				$('body').removeClass('show-modal-klarna');
			}
		});
	}

	componentDidMount() {
		if (this.afterpayRef) {
			this.injectCss();
		}
	}

	componentDidUpdate() {
		if (this.afterpayRef) {
			this.injectCss();
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.totalPrice !== prevState.totalPrice) {
			return {
				totalPrice: nextProps.totalPrice,
			};
		}

		return null;
	}

	injectCss = () => {
		const toBeInjected = '.afterpay-logo-badge-background { display: none; } .afterpay-logo-badge-lockup { transform: scale(1.2); transform-origin: center; } .afterpay-logo { margin-top: -2px !important; margin-bottom: 0 !important; } .afterpay-logo-link { display: block; }';
		const existing = this.afterpayRef.shadowRoot.querySelector('style').innerHTML;
		if (!existing.includes(toBeInjected)) {
			this.afterpayRef.shadowRoot.querySelector('style').innerHTML = existing + toBeInjected;
		}
	}

	render() {
		const klarnaIns = this.state.klarna ? cartSettings.payment.installment_by_text
			.replace('[amount]', formatMoney(Math.ceil(this.state.totalPrice / this.state.klarna_installment)))
			.replace('[num]', this.state.klarna_installment) : '';
		return (
			<>
				{this.state.afterpay && (
					<afterpay-placement ref={(r) => { this.afterpayRef = r; }} class="text-center border-top m-0 pt-2" data-locale={locale} data-currency={currency} data-amount={this.state.totalPrice / 100} data-size="sm" />
				)}

				{this.state.klarna && (
					<p className="font-size-sm text-center border-top mt-2 pt-2 text center">
						<span dangerouslySetInnerHTML={{ __html: klarnaIns }} />
						<br />
						<img className="mr-1" height="15" src={assetUrl('logo-klarna.svg')} alt="Klarna" />
						<svg data-toggle="modal" href="#modal-klarna" role="button" data-price={this.state.totalPrice} className="svg-info modal-klarna-trigger cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12" height="12"><path d="M7.2 5.6h1.6V4H7.2M8 14.4A6.4 6.4 0 1114.4 8 6.408 6.408 0 018 14.4M8 0a8 8 0 105.657 2.343A8 8 0 008 0m-.8 12h1.6V7.2H7.2z" /></svg>
					</p>
				)}

				{!this.state.afterpay && !this.state.klarna && (
					<div className="font-size-sm text-center border-top mt-2 pt-2 pb-3 text center">
						<div className="bg-light rounded-pill py-2 d-flex justify-content-center align-items-center">
							<SvgCard />
							<span className="ml-2">{tStrings.cartAcceptCards}</span>
						</div>
					</div>
				)}
			</>
		);
	}
}

CartExtras.propTypes = {
	totalPrice: PropTypes.number,
};

CartExtras.defaultProps = {
	totalPrice: 0,
};
