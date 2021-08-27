/* global tStrings */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { formatMoney } from '~mod/utils';

const RecentProducts = (props) => {
	const {
		product,
		onAddToCart,
	} = props;

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		window.checkLazyImages();
	});

	return (
		<div className="item__third bg-white px-g">
			<figure className="product-card position-relative d-flex flex-column">
				<a href="/">
					<picture className="embed-responsive bg-shimmer">
						<img data-src={product.image} alt={product.title} className="d-block w-100 lazyload embed-responsive-item fit--cover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
					</picture>
				</a>
				<figcaption className="mt-2 flex-grow-1 d-flex flex-column">
					<p className="product-card__text-sm mb-2 text-muted">{product.range}</p>
					<a href="/" className="product-card__text mb-2 font-weight-bold text-body">{product.title}</a>

					<p className="product-card__text mb-2">
						{product.comparePrice > 0 && <span className="text-muted text-linethrough mr-1">{formatMoney(product.comparePrice)}</span>}
						<span className="font-weight-bold">{formatMoney(product.price)}</span>
					</p>
					<button className="btn btn-block btn-primary" type="button" onClick={() => { onAddToCart(product); setLoading(true); }} disabled={loading}>
						{loading ? (
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
						) : tStrings.addToCart}
					</button>
				</figcaption>
			</figure>
		</div>
	);
};

RecentProducts.propTypes = {
	product: PropTypes.object.isRequired,
	onAddToCart: PropTypes.func,
};

RecentProducts.defaultProps = {
	onAddToCart: () => {},
};

const CartRecentProducts = (props) => {
	const {
		products,
		onAddToCart,
	} = props;

	const withNext = products.length > 1;

	return (
		<div id="cart-recent-products" className="carousel--preview carousel slide" data-ride="carousel" data-interval="false">
			<h4 className="mb-3">Recently Viewed</h4>
			<div className="carousel-inner">
				{products.map((p, index) => {
					const prev = index > 0 ? products[index - 1] : products.slice(-1)[0];
					const next = index < products.length - 1 ? products[index + 1] : products[0];
					return (
						// eslint-disable-next-line react/no-array-index-key
						<div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
							{withNext ? (<RecentProducts product={prev} />) : (<div className="item__third bg-white px-g" />)}
							<RecentProducts product={p} onAddToCart={onAddToCart} />
							{withNext ? (<RecentProducts product={next} />) : (<div className="item__third bg-white px-g" />)}
						</div>
					);
				})}
			</div>

			{withNext && (
				<a className="carousel-control-prev text-body" href="#cart-recent-products" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon carousel-control--background sni sni__chevron-prev justify-content-center align-items-center" aria-hidden="true" />
					<span className="sr-only">Previous</span>
				</a>
			)}
			{withNext && (
				<a className="carousel-control-next text-body" href="#cart-recent-products" role="button" data-slide="next">
					<span className="carousel-control-next-icon carousel-control--background sni sni__chevron-next justify-content-center align-items-center" aria-hidden="true" />
					<span className="sr-only">Next</span>
				</a>
			)}
		</div>
	);
};

CartRecentProducts.propTypes = {
	products: PropTypes.array,
	onAddToCart: PropTypes.func.isRequired,
};

CartRecentProducts.defaultProps = {
	products: [],
};

export default CartRecentProducts;
