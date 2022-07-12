/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { isItemIdInKey } from '~mod/utils';

import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';

export default class CartManualGwp extends React.Component {
	scroll = (direction) => {
		const el = this.scrollRef;
		const left = el.scrollLeft;
		const offset = direction === 'left' ? -116 : 116;
		el.scrollTo({ left: left + offset });
	}

	render() {
		const {
			title,
			maxSelected,
			selectedKey,
			items,
			onAddItem,
			onRemoveItem,
		} = this.props;

		return (
			<div className="mb-3 position-relative">
				<h4 className="font-size-sm font-weight-bold mb-1 text-link">{title}</h4>
				<p className="font-size-sm text-muted">{`${selectedKey.length}/${maxSelected} ${tStrings.items_selected}`}</p>
				<button className={`position-absolute btn-unstyled text-primary manual-gwp__left ${items.length > 3 ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => this.scroll('left')}><SvgChevronPrev class="svg" /></button>
				<button className={`position-absolute btn-unstyled text-primary manual-gwp__right ${items.length > 3 ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => this.scroll('right')}><SvgChevronNext class="svg" /></button>
				<ul className="list-unstyled manual-gwp__container d-flex mt-3 mb-0 text-center" ref={(r) => { this.scrollRef = r; }}>
					{items.map((item) => {
						const isSelected = !!(selectedKey.find((key) => isItemIdInKey(key, item.id)));
						return (
							<li key={item.id} className="manual-gwp__item d-flex flex-column mr-2">
								<figure className="mb-0">
									<picture className="d-block">
										<LazyLoadImage src={item.image} alt={item.title} className="w-100 overflow-hidden rounded-circle" />
									</picture>
									<figcaption className="w-100 mt-ng position-relative rounded-sm">{`Worth ${item.price}`}</figcaption>
								</figure>
								<p className="flex-grow-1 font-size-xs font-weight-bold my-2">{item.title}</p>
								<button
									type="button"
									className={`btn btn-block btn-outline-black px-1 btn-${isSelected ? 'primary' : 'outline-primary'}`}
									onClick={() => {
										if (isSelected) {
											onRemoveItem(item.id);
										} else { onAddItem(item.id); }
									}}
									data-cy="cart-addfreegift-btn"
								>
									{isSelected ? tStrings.remove : tStrings.add}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

CartManualGwp.propTypes = {
	title: PropTypes.string.isRequired,
	maxSelected: PropTypes.number.isRequired,
	selectedKey: PropTypes.array.isRequired,
	items: PropTypes.array.isRequired,
	onAddItem: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
};
