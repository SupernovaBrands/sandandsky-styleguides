/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ConditionWrapper from '~comp/condition-wrapper';
import QuantityBox from '~comp/quantity-box';
import CartUpsellPair from '~comp/cart-upsell-pair';
import SvgRecurring from '~svg/repeat.svg';

import { formatMoney } from '~mod/utils';

export default class CartItem extends React.Component {
	onRemoveItem = () => {
		this.props.onRemoveItem(this.props.item);
	}

	render() {
		const { item, upsell, onAddUpsell } = this.props;
		const { models } = item;
		return (
			<div className="cart-item" role="listitem">
				<figure className="row py-2 px-lg-hg mb-0 align-items-start">
					<ConditionWrapper
						condition={!models.isFree}
						wrapper={(children) => <a href={item.url} className="col-3 px-lg-hg">{children}</a>}
					>
						<picture className={`d-block ${models.isFree ? 'col-3 px-lg-hg' : ''}`}>
							<LazyLoadImage src={models.image} alt={item.product_title} />
						</picture>
					</ConditionWrapper>
					<figcaption className="col-9 px-lg-hg">
						<p className="font-size-xs text-muted mb-2">{models.range}</p>

						<div className="d-flex align-items-start mb-2 cart-drawer__item">
							<div className="flex-grow-1 mr-1">
								<h5 className="mb-0">
									<ConditionWrapper
										condition={!models.isFree}
										wrapper={(children) => <a href={item.url}>{children}</a>}
									>
										{models.title}
									</ConditionWrapper>
								</h5>
								{models.recurring && (
									<span className="text-primary mt-1 d-flex font-italic font-size-sm font-weight-normal">
										<SvgRecurring className="svg mr-1" />
										{' '}
										Recurring every 2 months
									</span>
								)}
								{models.notes && models.notes.map((note) => (<span className="font-size-sm text-secondary">{note}</span>))}
							</div>
							<div className="d-flex flex-column text-right font-size-sm">
								{models.comparePrice > 0 && (
									<span className="text-linethrough text-muted">{formatMoney(models.comparePrice)}</span>)}
								<span className={`font-weight-bold ${models.price === 0 ? 'text-secondary' : ''}`}>
									{formatMoney(models.price)}
									{models.recurring && ('/2month')}
								</span>
							</div>
						</div>

						<div className="d-flex justify-content-between">
							<QuantityBox
								name="updates[]"
								editable={!item.models.isFree}
								quantity={item.quantity}
								onChangeQuantity={(newQty, callback) => this.props.onChangeQuantity(item, newQty, callback)}
							/>
							{!models.isFree && (<button className="btn-unstyled font-size-sm text-body border-bottom border-dark" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-removeproduct">Remove</button>)}
						</div>

						{this.props.isLastStock && (
							<p className="mt-1 mb-0 text-danger">Oh nuts! You got the last one!</p>)}
					</figcaption>
				</figure>

				{upsell && (<CartUpsellPair upsell={upsell} onAddUpsell={onAddUpsell} />)}

				{models.showPreorderNotif && (
					<span className="d-block mb-2">{tStrings.estimated_delivery_text}</span>
				)}
			</div>
		);
	}
}

CartItem.propTypes = {
	item: PropTypes.object.isRequired,
	isLastStock: PropTypes.bool.isRequired,
	onChangeQuantity: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	upsell: PropTypes.object.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};
