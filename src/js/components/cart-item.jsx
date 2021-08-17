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
				<figure className="row py-2 px-lg-hg mb-0 align-items-start">
					<ConditionWrapper
						condition={!models.isFree}
						wrapper={(children) => <a href={item.url} className="col-3 px-lg-hg">{children}</a>}
					>
						<picture className={models.isFree ? 'col-3 d-block' : 'd-block'}>
							<img src={models.image} className="w-auto" alt={item.product_title} />
						</picture>
					</ConditionWrapper>
					<figcaption className="col-9 px-lg-hg">
						<p className="font-size-xs text-muted mb-2">{models.range}</p>

						<div className="d-flex align-items-start mb-2">
							<div className="flex-grow-1 mr-1">
								<h5 className="mb-0">
									<ConditionWrapper
										condition={!models.isFree}
										wrapper={(children) => <a href={item.url}>{children}</a>}
									>
										{models.title}
									</ConditionWrapper>
								</h5>
								{models.notes && models.notes.map((note) => (<span className="font-size-sm text-secondary">{note}</span>))}
							</div>
							<div className="d-flex flex-column text-right font-size-sm">
								{models.comparePrice > 0 && (
									<span className="text-linethrough text-muted">{formatMoney(models.comparePrice)}</span>)}
								<span className={`font-weight-bold ${models.price === 0 ? 'text-secondary' : ''}`}>{formatMoney(models.price)}</span>
							</div>
						</div>

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
