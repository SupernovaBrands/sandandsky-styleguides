import React, { useEffect, useRef, useState } from 'react';
import SWELL_PRODUCTS from '~mod/swell/dummy-products.json';
import SvgChevronPrev from '~svg/chevron-prev.svg';
import SvgChevronNext from '~svg/chevron-next.svg';

const CartRedemption = () => {
	const SCROLL_ITEM = 151;
	const [loading, setLoading] = useState(true);
	const [redeemProducts, setRedeemProducts] = useState([]);
	const swellRef = useRef(null);
	const [itemAdded, setItemAdded] = useState(0);
	const [showError, setShowError] = useState(false);

	const scroll = (direction) => {
		const el = swellRef;
		const left = el.current.scrollLeft;
		const offset = direction === 'left' ? -(SCROLL_ITEM) : SCROLL_ITEM;
		el.current.scrollTo({ left: left + offset });
	};

	// const { item, itemRedeemed } = props;
	const resetBtn = () => {
		document.querySelectorAll('.cart-drawer__redemption-item .btn')?.forEach((btn) => {
			btn.classList.remove('btn-primary', 'rounded-pill');
			btn.classList.add('bg-white');
			// eslint-disable-next-line no-param-reassign
			btn.textContent = 'Add';
		});
	};
	const redeemItem = (e) => {
		const { itemId } = e.target.dataset;
		const id = parseInt(itemId, 10);
		if (itemAdded !== 0 && id !== itemAdded) {
			setShowError(true);
			return;
		}
		resetBtn();
		e.target.classList.add('btn-primary', 'rounded-pill');
		e.target.classList.remove('bg-white');
		e.target.textContent = 'Remove';
		if (id === itemAdded) {
			resetBtn();
			setShowError(false);
		}
		setItemAdded((prevId) => (prevId === id ? 0 : id));
	};

	useEffect(() => {
		setRedeemProducts(SWELL_PRODUCTS);
		setLoading(false);
	}, []);

	return loading ? (
		<div className="d-flex justify-content-center my-1">
			<div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
		</div>
	) : (
		<div className="cart-drawer__redemption position-relative">
			<p className="mb-3 font-weight-bold">You have ⭐️ 0 points  to redeem:</p>
			{showError && (
				<p className="font-size-sm text-primary mb-g">You can only redeem 1 reward per order. Remove the current reward first before swapping to another one.</p>
			)}
			<button className={`position-absolute btn-unstyled text-primary manual-gwp__left ${redeemProducts.length > 3 ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => scroll('left')}>
				<SvgChevronPrev class="svg" />
			</button>
			<button className={`position-absolute btn-unstyled text-primary manual-gwp__right ${redeemProducts.length > 3 ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => scroll('right')}>
				<SvgChevronNext class="svg" />
			</button>
			<ul className="cart-drawer__redemption-list list-unstyled manual-gwp__container d-flex my-3 text-center" ref={swellRef}>
				{redeemProducts.map((product) => (
					<li key={product.id} className="cart-drawer__redemption-item manual-gwp__item d-flex flex-column mr-2 bg-gray-100 px-1">
						<img src="https://via.placeholder.com/90x90/F8F8F8" alt={product.name} />
						<p className="mb-0 mt-2">{`⭐️ ${product.amount}`}</p>
						<button type="button" data-item-id={product.id} className="btn btn-block bg-white font-weight-normal my-2 font-size-base px-1" onClick={redeemItem}>Add</button>
					</li>
				))}
			</ul>
			<figure className="d-block position-relative mb-0 cart-drawer__redemption-banner">
				<img className="w-100" src="https://cdn.shopify.com/s/files/1/0277/5262/8295/files/Cart_Beauty_Club_banner_x184.jpg?v=1690529024" alt="Redemption Banner" height="92" loading="lazy" />
				<figcaption className="position-absolute ml-g">
					<p>
						Get 52 points
						<br />
						with this purchase
					</p>
					<p className="font-size-sm mb-0">
						<a href="/account/register" className="text-primary">Sign up</a>
						{' or '}
						<a href="/account/login" className="text-primary">Log in</a>
						{' to collect!'}
					</p>
				</figcaption>
			</figure>
		</div>
	);
};

export default CartRedemption;
