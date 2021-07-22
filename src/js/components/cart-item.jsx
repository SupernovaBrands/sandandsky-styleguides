/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import ConditionWrapper from '~comp/condition-wrapper';
import QuantityBox from '~comp/quantity-box';

import { formatMoney } from '~mod/utils';

export default class CartItem extends React.Component {
	onRemoveItem = () => {
		this.props.onRemoveItem(this.props.item);
	}

	render() {
		const { item } = this.props;
		const { models } = item;
		return (
			<div role="listitem">
				<figure className="row py-2 mb-0 align-items-start">
					<ConditionWrapper
						condition={!models.isFree}
						wrapper={(children) => <a href={item.url} className="col-3">{children}</a>}
					>
						<picture className={models.isFree ? 'col-3' : ''}>
							<img src={models.image} className="w-100" alt={item.product_title} />
						</picture>
					</ConditionWrapper>
					<figcaption className="col-9">
						<p className="font-size-xs text-muted mb-2">{models.range}</p>

						<div className="d-flex align-items-start mb-2">
							<h5 className="flex-grow-1 mr-1 mb-0">
								<ConditionWrapper
									condition={!models.isFree}
									wrapper={(children) => <a href={item.url} className="link-secondary">{children}</a>}
								>
									{models.title}
								</ConditionWrapper>
							</h5>
							<div className="d-flex flex-column text-right font-size-sm">
								{models.comparePrice > 0 && (
									<span className="text-linethrough text-muted">{formatMoney(models.comparePrice)}</span>)}
								<span className={`font-weight-bold ${item.original_price === 0 ? 'text-secondary' : ''}`}>{formatMoney(item.original_price)}</span>
							</div>
						</div>

						{models.properties && Object.keys(models.properties).map((key) => (<p key={key} className="mb-1">{`${key}: ${item.properties[key]}`}</p>))}

						<div className="d-flex justify-content-between">
							<QuantityBox
								name="updates[]"
								editable={!item.models.isFree}
								quantity={item.quantity}
								onChangeQuantity={(newQty, callback) => this.props.onChangeQuantity(item, newQty, callback)}
							/>
							{!models.isFree && (<button className="btn-unstyled font-size-sm text-body border-bottom border-dark" type="button" aria-label="Remove" onClick={this.onRemoveItem}>Remove</button>)}
						</div>

						{this.props.isLastStock && (
							<p className="mt-1 mb-0 text-danger">Oh nuts! You got the last one!</p>)}
					</figcaption>
				</figure>

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
};
