import React from 'react';
import PropTypes from 'prop-types';

const RecentProducts = (props) => (
	<div className="item__third bg-white px-g">
		<figure className="product-card product-card--new position-relative d-flex flex-column">
			<a href="/">
				<picture className="d-block">
					<img src="https://via.placeholder.com/444x558/" alt="Placeholder" className="d-block w-100" />
				</picture>
			</a>
			<figcaption className="mt-2 flex-grow-1 d-flex flex-column">
				<p className="product-card__text-sm mb-2 text-muted">Tasmanian Spring Water</p>
				<a href="/" className="product-card__text mb-2 font-weight-bold text-body link-secondary">{`Hydration Boost Cream ${props.number}`}</a>

				<p className="product-card__text mb-2">
					<span className="text-muted text-linethrough mr-1">$39.73</span>
					<span className="font-weight-bold">$39.73</span>
				</p>
				<button className="btn btn-block btn-primary" type="submit">Add to cart</button>
			</figcaption>
		</figure>
	</div>
);

RecentProducts.propTypes = {
	number: PropTypes.number.isRequired,
};

const CartRecentProducts = (props) => {
	const {
		products,
	} = props;

	return (
		<div id="cart-recent-products" className="carousel--preview carousel slide" data-ride="carousel" data-interval="false">
			<h4 className="mb-3">Recently Viewed</h4>
			<div className="carousel-inner">
				{products.map((p, index) => {
					const prev = index > 0 ? products[index - 1] : products.slice(-1)[0];
					const next = index < products.length - 1 ? products[index + 1] : products[0];
					return (
						<div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
							<RecentProducts number={prev} />
							<RecentProducts number={p} />
							<RecentProducts number={next} />
						</div>
					);
				})}
			</div>

			<a className="carousel-control-prev text-body" href="#cart-recent-products" role="button" data-slide="prev">
				<span
					className="carousel-control-prev-icon carousel-control--background sni sni__chevron-prev justify-content-center align-items-center"
					aria-hidden="true"
				/>
				<span className="sr-only">Previous</span>
			</a>
			<a className="carousel-control-next text-body" href="#cart-recent-products" role="button" data-slide="next">
				<span
					className="carousel-control-next-icon carousel-control--background sni sni__chevron-next justify-content-center align-items-center"
					aria-hidden="true"
				/>
				<span className="sr-only">Next</span>
			</a>
		</div>
	);
};

CartRecentProducts.propTypes = {
	products: PropTypes.array,
};

CartRecentProducts.defaultProps = {
	products: [1, 2, 3],
};

export default CartRecentProducts;
