/* global tSettings tStrings customerTags */

import React from 'react';
import { getSizedImageUrl } from '@shopify/theme-images';

import CartItem from '~comp/cart-item';
import CartDiscountMeter from '~comp/cart-discount-meter';
import CartDiscountForm from '~comp/cart-discount-form';
import CartManualGwp from '~comp/cart-manual-gwp';
import CartUpsell from '~comp/cart-upsell';
import CartExtras from '~comp/cart-extras';
import CartRecentProducts from '~comp/cart-recent-products';

import snCart from '~mod/sn-cart';
import { getShippingPrice } from '~mod/shipping';
import {
	isFreeItem,
	isItemHasProp,
	isSameText,
	kebabCase,
	formatMoney,
	getItemRange,
	waitFor,
	getCookie,
	isGiftCardOnly,
} from '~mod/utils';

import SvgClose from '~svg/close.svg';
import SvgSS from '~svg/ss.svg';

import { blogUpsellBtn } from '~mod/blog-upsell';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLastStockKey: '',
			cart: { items: [] },
			loadingInit: true,
			loadingCart: true,

			itemCount: 0,
			manualGwpCount: 0,
			totalPrice: 0,
			upsellData: {},

			discountData: {},
			loadingDiscount: false,

			manualGwp: {},
			loadingManualGwp: { loading: false, id: -1 },
			shippingData: {},
			discountMeter: {},

			recentProducts: [],

			loadingExtraButtons: true,
			displayExtraButtons: false,
			walletHeader: null,
			walletBody: null,
			walletToken: null,
		};
	}

	componentDidMount() {
		this.setCartData();
		this.setRecentProducts();
		document.addEventListener('snCart.requestComplete', this.getDiscountAndShipping);
		document.addEventListener('snCart.requestDone', this.setCartCount);
		document.addEventListener('snCart.recentProducts', this.setRecentProducts);

		if (tSettings.extraButtons) {
			setTimeout(() => {
				this.modifyExtraButtons();
				window.addEventListener('resize', this.checkExtraButtons);
			}, 3000);
			this.injectWalletListener();
		}
	}

	componentWillUnmount() {
		document.removeEventListener('snCart.requestComplete', this.getDiscountAndShipping);
		document.removeEventListener('snCart.requestDone', this.setCartCount);
		document.removeEventListener('snCart.recentProducts', this.setRecentProducts);

		if (tSettings.extraButtons) {
			window.removeEventListener('resize', this.checkExtraButtons);
		}
	}

	setCartCount = (e) => {
		this.setState((prevState) => {
			const { detail } = e;
			let count = prevState.itemCount;
			if (detail && detail.action === 'add') {
				const item = detail.result;
				if (!isItemHasProp(item, '_campaign_type', 'manual_gwp')) {
					count = prevState.itemCount + parseInt(detail.quantity, 10);
				}
			} else {
				count = detail.result.item_count - prevState.manualGwpCount;
				this.setCartData(detail.result);
			}
			count = count > 0 ? count : 0;
			$('.cart-drawer__count').text(count);

			return {
				itemCount: count,
			};
		});
	}

	/* -------------------
		Process cart data for display
	------------------- */
	setCartData = async (cartResult = null) => {
		const cart = cartResult !== null ? cartResult : snCart.cart;
		if (!cart) return;
		const models = {};
		const { items } = cart;

		let count = 0;
		let manualGwpCount = 0;
		let comparePriceDiff = 0;
		for (let i = 0; i < items.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			items[i].models = await this.getItemModels(items[i]);
			if (items[i].models.isManualGwp) {
				manualGwpCount += items[i].quantity;
			} else {
				count += items[i].quantity;
				comparePriceDiff += items[i].models.comparePriceDiff * items[i].quantity;
			}
		}

		models.itemCount = count;
		models.manualGwpCount = manualGwpCount;
		models.comparePriceDiff = comparePriceDiff;
		$('.cart-drawer__count').text(count);

		models.upsellData = await this.getUpsell(items);

		models.totalPrice = cart.items_subtotal_price;
		models.subtotalPrice = cart.items_subtotal_price + comparePriceDiff;

		const isCartInit = this.state.loadingInit;
		this.setState({
			loadingInit: false,
			loadingDiscount: false,
			loadingCart: true,
			cart,
			...models,
		}, () => {
			if (isCartInit) {
				this.getDiscountAndShipping();
			}
		});
	}

	getDiscountAndShipping = async () => {
		const { cart, totalPrice } = this.state;
		const models = {
			totalPrice,
		};

		await snCart.checkAppliedDiscount(cart).then((discountData) => {
			models.discountData = this.getDiscountDataDisplay({
				...discountData,
				errorExtra: this.getDiscountErrorExtra(discountData),
			});

			if (models.discountData.amount > 0) {
				models.totalPrice -= models.discountData.amount;
			}
		}).then(() => {
			if (isGiftCardOnly(cart.items)) {
				models.manualGwp = { enabled: false };
				models.shippingData = { show: false };
				models.discountMeter = { enabled: false };
				return Promise.resolve();
			}

			return snCart.getManualGwp(cart)
				.then((manualGwp) => {
					models.manualGwp = manualGwp;
					return getShippingPrice(models.totalPrice);
				}).then((shippingData) => {
					models.shippingData = {
						show: shippingData.shipping !== null,
						amount: shippingData.shipping || 0,
					};

					if (customerTags.indexOf('swell_vip_level 2') >= 0 || customerTags.indexOf('swell_vip_level 3') >= 0 || customerTags.indexOf('swell_loyalty_has_account') >= 0) {
						models.shippingData = {
							show: true,
							amount: 0,
						};

						models.discountMeter = {
							enabled: true,
							target: 1,
							current: 1,
						};
					} else if (shippingData.freeRate && models.totalPrice > 0) {
						const rate = shippingData.freeRate;
						models.discountMeter = {
							enabled: true,
							target: rate.min_order_subtotal ? parseFloat(rate.min_order_subtotal) * 100 : 0,
							current: models.totalPrice,
						};
					} else {
						models.discountMeter = {
							enabled: false,
						};
					}
					models.totalPrice += models.shippingData.amount;
				});
		});

		this.updateWalletInfo();

		this.setState({
			loadingCart: false,
			...models,
		});
	}

	async getItemModels(item) {
		const productData = await snCart.getProductInfo(item.handle);

		const models = {
			range: getItemRange(item.product_title),
			title: item.variant_title,
			isFree: isFreeItem(item),
			isManualGwp: isItemHasProp(item, '_campaign_type', 'manual_gwp'),
			image: item.image ? item.image.replace(/(\.[^.]*)$/, '_75x100_crop_center$1').replace('http:', '') : '//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif',
			price: item.original_price,
			comparePrice: productData ? productData.comparePrices[item.id] : 0,
			color: (item.options_with_values.find((opt) => isSameText(opt.name, 'color')) || { value: false }).value,
			style: (item.options_with_values.find((opt) => isSameText(opt.name, 'style')) || { value: false }).value,
		};

		models.url = models.free ? undefined : item.url;
		models.notes = [];
		if (item.properties) {
			Object.keys(item.properties).forEach((key) => {
				if (key === '_bundle' && item.properties[key]) {
					models.notes.push(tStrings.cartBundleOffer);
					if (models.comparePrice === 0) models.comparePrice = models.price;
					models.price -= item.discounts[0].amount / item.quantity;
				} else if (key === '_campaign_name' && item.properties[key]) {
					models.notes.push(item.properties[key]);
				} else if (!key.startsWith('_') && item.properties[key]) {
					models.notes.push(`${key}: ${item.properties[key]}`);
				}
			});
		}

		models.comparePriceDiff = models.comparePrice > 0 ? models.comparePrice - models.price : 0;

		if (models.color) {
			models.variantHandle = kebabCase(models.color);
			models.variantOptions = await this.getColorOptions(item.handle, item.variant_options);
			models.variantType = 'Shade';
			models.variantTitle = models.color;
		}

		if (models.style) {
			models.variantHandle = kebabCase(models.style);
			models.variantType = 'Style';
			models.variantTitle = models.style;
		}

		return models;
	}

	setRecentProducts = async () => {
		const { recentProducts } = snCart;
		const products = [];

		for (let i = 0; i < recentProducts.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			const productData = await snCart.getProductInfo(recentProducts[i]);
			if (productData) {
				const range = getItemRange(productData.product.title);
				const variant = productData.product.variants[0];
				if (variant && variant.available) {
					products.push({
						upsellId: variant.id,
						range,
						title: productData.product.title.replace(range, '').trim(),
						image: getSizedImageUrl(productData.product.featured_image, '444x558'),
						price: variant.price,
						comparePrice: variant.compare_at_price || 0,
					});
				}
			}
		}

		this.setState({
			recentProducts: products,
		});
	}

	/* -------------------
		Upsell
	------------------- */
	async getUpsell(items) {
		const enable = window.cartUpsellEnable;
		const upsellItems = window.cartUpsellItems || [];
		const variantIds = items.map((item) => item.id);
		let upsell = false;

		if (enable && upsellItems.length > 0) {
			const upsellItem = upsellItems.find((item) => (
				!variantIds.includes(item.upsell_item)
				&& (
					item.cart_item === 'any' || (item.cart_item !== 'any' && variantIds.includes(item.cart_item))
				)
			));

			if (upsellItem) {
				upsell = {
					targetId: upsellItem.cart_item,
					upsellId: upsellItem.upsell_item,
					topbar: upsellItem.topbar,
					productTitle: upsellItem.upsell_item_title,
					title: upsellItem.title,
					description: upsellItem.description,
					url: upsellItem.url,
					price: upsellItem.upsell_price,
					comparePrice: upsellItem.upsell_compare_price,
					image: upsellItem.upsell_image,
					image2x: upsellItem.upsell_image_2x,
				};
			}
		}

		return upsell;
	}

	/* -------------------
		Discounts
	------------------- */
	getDiscountErrorExtra(data = {}) {
		// to show error when items is not valid but discount applied
		const { cart } = snCart;
		const { items } = cart;

		let isItemsInCart = false;
		for (let i = 0; i < items.length; i += 1) {
			if (tSettings.custom_error_handles.includes(items[i].handle)) {
				isItemsInCart = true;
				break;
			}
		}

		if (tSettings.enable_custom_codes && isItemsInCart && isSameText(data.code, tSettings.custom_codes_code)) {
			return true;
		}

		return false;
	}

	getDiscountDataDisplay(data = {}) {
		let error = '';
		if (data.reason) {
			switch (data.reason) {
				case 'purchase':
					error = `${tStrings.discount_min_spend} ${formatMoney(data.minPurchase)}`;
					break;
				case 'product':
					error = tStrings.discount_error;
					break;
				default:
					error = data.reason;
					break;
			}
		} else if (data.error) {
			error = data.error;
		}

		// to set custom code error message from theme settings when disccode is match
		const customCodes = tSettings.custom_codes_code.toUpperCase();
		if (!data.valid && data.discode && data.discode.toUpperCase() === customCodes && tSettings.enable_custom_codes) {
			error = tSettings.custom_error_codes_msg;
		}

		if (data.reason && data.reason === 'product' && data.code && data.code.toUpperCase() === customCodes && tSettings.enable_custom_codes) {
			error = tSettings.custom_error_codes_msg;
		}

		if (data.code_reject) {
			error = tSettings.cart_code_rejection_msg;
		}

		let amount = data.discount < 0 ? (data.discount * -1) : (data.discount || 0);
		if (!amount) {
			amount = data.amount;
		}

		return {
			applied: data.valid && data.code && data.code !== '' && !error && !tSettings.cart_code_rejection,
			code: !error ? (data.code || '').toUpperCase() : '',
			isAuto: !!data.isAuto,
			amount,
			error,
			errorExtra: data.errorExtra ? data.errorExtra : false,
		};
	}

	/* -------------------
		Actions
	------------------- */

	onChangeQuantity = (item, qty, callback) => {
		this.setState({ isLastStockKey: '' }, () => {
			snCart.changeQuantity(item, qty, (newQty, isQtyCorrect) => {
				if (!isQtyCorrect) this.setState({ isLastStockKey: item.key });
				callback(newQty);
			});
		});
	}

	onChangeVariant = (item, newVariantId) => {
		if (item.id !== newVariantId) {
			snCart.replaceItem(item.key, newVariantId, item.quantity);
		}
	}

	onRemoveItem = (item) => {
		snCart.removeItem(item.key);
		blogUpsellBtn(item.id, 'remove');
	}

	onAddUpsell = (upsell) => {
		if (upsell.upgrade_bundle_method === 'replace') {
			return snCart.replaceItem(upsell.targetId, upsell.upsellId, 1);
		}
		blogUpsellBtn(upsell.upsellId, 'add');
		return snCart.addItem(upsell.upsellId, 1);
	}

	onApplyDiscountCode = (code) => {
		this.setState({ loadingDiscount: true }, () => {
			if (!tSettings.cart_code_rejection) {
				snCart.applyDiscountCode(code).then((discountData) => {
					if (discountData.enabled === false || discountData.isValid === false) {
						this.setState({
							loadingDiscount: false,
							discountData: this.getDiscountDataDisplay({ reason: discountData.error, discode: discountData.code }),
						});
					} else {
						this.setState({
							loadingDiscount: false,
							discountData: this.getDiscountDataDisplay({
								...discountData,
								valid: true,
								error: '',
								errorExtra: this.getDiscountErrorExtra(discountData),
							}),
						});
					}
				});
			} else {
				snCart.applyDiscountCode(code).then(() => {
					this.setState((prevState) => ({
						loadingDiscount: false,
						discountData: this.getDiscountDataDisplay({ ...prevState.discountData, code_reject: true }),
					}));
				});
			}
		});
	}

	onRemoveDiscountCode = () => {
		this.setState({ loadingDiscount: true }, () => {
			snCart.removeDiscountCode();
			this.setState({
				loadingDiscount: false,
				discountData: this.getDiscountDataDisplay(),
			});
		});
	}

	onToggleManualGwp = (id) => {
		this.setState({
			loadingManualGwp: { loading: true, id },
		}, () => {
			const newSelected = snCart.toggleManualGwp(this.state.manualGwp, id);
			this.setState((prevState) => ({
				manualGwp: {
					...prevState.manualGwp,
					selectedKey: newSelected,
				},
				loadingManualGwp: { loading: false, id: -1 },
			}));
		});
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	}

	checkExtraButtons = () => {
		if (this.extraBtnsRef) {
			waitFor(() => this.extraBtnsRef.querySelector('.paypalLight'), () => {
				const paypal = this.extraBtnsRef.querySelector('.paypalLight');
				if (!paypal.parentElement.classList.contains('show')) {
					this.setState({ loadingExtraButtons: true }, () => {
						this.modifyExtraButtons();
					});
				}
			});
		}
	}

	modifyExtraButtons = () => {
		if (this.extraBtnsRef) {
			if (!this.state.displayExtraButtons) {
				this.setState({ displayExtraButtons: true });
			}
			waitFor(() => this.state.displayExtraButtons && this.extraBtnsRef.querySelector('.paypalLight'), () => {
				const paypal = this.extraBtnsRef.querySelector('.paypalLight');
				this.setState({ loadingExtraButtons: false }, () => {
					paypal.parentElement.classList.add('show');
				});
			});
		}
	}

	injectWalletListener = () => {
		// Inject discount code for wallet
		if (typeof window.fetch === 'function') {
			const oldFetch = window.fetch;
			const this1 = this;
			window.fetch = function (...args) {
				let header; let body;
				if (args[0].indexOf('wallets/checkouts.json') > -1 && args[1] && args[1].body) {
					header = args[1].headers;
					body = JSON.parse(args[1].body);
					if (getCookie('currentDiscount')) {
						body.checkout.discount_code = getCookie('currentDiscount');
						// eslint-disable-next-line no-param-reassign
						args[1].body = JSON.stringify(body);
					}
					this1.setState({
						walletHeader: header,
						walletBody: body,
					});
				}

				return oldFetch.apply(this, args).then(function (e) {
					if (e.url.indexOf('wallets/checkouts.json') > -1) {
						e.clone().json().then(function (e2) {
							this1.setState({
								walletToken: e2.checkout.token,
							});
						});
					}
					return e;
				});
			};
		}
	}

	updateWalletInfo = () => {
		const { walletHeader, walletBody, walletToken } = this.state;
		if (!tSettings.extraButtons || walletBody === null || walletToken === null) return;

		const url = `https://dev.sandandsky.com/wallets/checkouts/${walletToken}.json`;
		const discountCode = getCookie('currentDiscount') || '';
		if (walletBody.checkout.discount_code !== discountCode) {
			walletBody.checkout.discount_code = discountCode;

			window.fetch(url, {
				method: 'PATCH',
				headers: walletHeader,
				credentials: 'same-origin',
				body: JSON.stringify(walletBody),
			}).then((response) => response.json())
				.then((e) => {
					this.setState({
						walletBody,
						walletToken: e.checkout.token,
					});
				});
		}
	}

	submitForm() {
		$('#cart-drawer-form').trigger('submit');
	}

	render() {
		const {
			cart,
			loadingInit,
			loadingCart,
			isLastStockKey,
			itemCount,
			subtotalPrice,
			totalPrice,
			comparePriceDiff,
			loadingDiscount,
			discountData,
			manualGwp,
			loadingManualGwp,
			upsellData,
			shippingData,
			discountMeter,
			recentProducts,
			loadingExtraButtons,
			displayExtraButtons,
		} = this.state;
		return (
			<div className="modal-dialog modal-dialog-scrollable modal-md m-0 w-100 mh-100 float-right">
				<div className="modal-content vh-100 mh-100 border-0 rounded-0">
					<div className="modal-body pt-0 px-0">
						<div className="container px-g d-flex flex-column align-items-stretch text-center pt-3">
							<h5>{tStrings.cartDrawerTitle}</h5>
							<button type="button" className="close text-body m-0 p-3 position-absolute font-size-xs" data-dismiss="modal" aria-label="Close" data-cy="close-icon">
								<SvgClose aria-hidden="true" className="d-flex" />
							</button>

							{discountMeter.enabled && itemCount > 0 && (
								<CartDiscountMeter
									target={discountMeter.target}
									current={discountMeter.current}
								/>
							)}
						</div>

						{loadingInit && (
							<div className="d-flex justify-content-center p-2">
								<div className="spinner-border" role="status" />
							</div>
						)}

						{!loadingInit && (itemCount === 0 ? (
							<div className="pt-3 text-center">
								<div className="container px-g">
									<SvgSS width="45" />
									<p className="my-3 text-center">{tStrings.cartEmpty}</p>
									<a href="/collections" className="btn btn-primary" data-cy="shop-all-btn">Shop all products</a>
								</div>
								{recentProducts.length > 0 && (
									<>
										<hr />
										<CartRecentProducts products={recentProducts} onAddToCart={this.onAddUpsell} />
									</>
								)}
							</div>
						) : (
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
							<form
								id="cart-drawer-form"
								className="container px-g"
								action="/cart"
								method="post"
								noValidate
								onKeyDown={this.handleKeyDown}
							>
								<input type="hidden" name="checkout" value="Checkout" />

								<div className="list-unstyled" role="list">
									{cart.items.map((item) => !!item.models && !item.models.isManualGwp && (
										<CartItem
											key={item.key}
											item={item}
											isLastStock={item.key === isLastStockKey}
											onChangeVariant={this.onChangeVariant}
											onChangeQuantity={this.onChangeQuantity}
											onRemoveItem={this.onRemoveItem}
										/>
									))}
								</div>

								{upsellData && (<CartUpsell upsell={upsellData} onAddUpsell={this.onAddUpsell} />)}

								{manualGwp.enabled && (
									<>
										<hr />
										<CartManualGwp
											title={manualGwp.title}
											maxSelected={manualGwp.maxSelected}
											selectedKey={manualGwp.selectedKey}
											items={manualGwp.items}
											onAddItem={this.onToggleManualGwp}
											onRemoveItem={this.onToggleManualGwp}
											loading={loadingManualGwp.loading}
											processingId={loadingManualGwp.id}
										/>
									</>
								)}

								<hr />
								<CartDiscountForm
									isApplied={discountData.applied}
									code={discountData.code}
									isAutoDiscount={discountData.isAuto}
									loading={loadingDiscount}
									error={discountData.error}
									errorExtra={discountData.errorExtra}
									onApply={this.onApplyDiscountCode}
									onRemove={this.onRemoveDiscountCode}
								/>
								<hr />

								<div className="row">
									<h5 className="col-8 font-weight-bold" data-cy="cart-subtotal-label">{tStrings.cartSubtotal}</h5>
									<h5 className="col-4 text-right" data-cy="cart-subtotal-value">{formatMoney(subtotalPrice)}</h5>

									{comparePriceDiff > 0 && (
										<>
											<h5 className="col-8">{tStrings.cartBundleDiscount}</h5>
											<h5 className="col-4 text-right">{`-${formatMoney(comparePriceDiff)}`}</h5>
										</>
									)}

									{loadingCart && (
										<div className="col-12 mb-2 d-flex justify-content-center">
											<div className="spinner-border spinner-border-sm" role="status" />
										</div>
									)}

									{!loadingCart && discountData.amount > 0 && (
										<>
											<h5 className="col-8">{tStrings.cartDiscount}</h5>
											<h5 className="col-4 text-right">{`-${formatMoney(discountData.amount)}`}</h5>
										</>
									)}

									{!loadingCart && shippingData.show && (
										<>
											<h5 className="col-8">{tStrings.cartShipping}</h5>
											<h5 className="col-4 text-right text-secondary">{shippingData.amount > 0 ? formatMoney(shippingData.amount) : 'Free'}</h5>
										</>
									)}

									<p className="col-12 font-size-sm mt-2 mb-2 text-muted">{tStrings.cartTaxMessage}</p>
								</div>

								<CartExtras totalPrice={totalPrice} />
							</form>
						))}
					</div>

					<div className={`modal-footer px-hg px-lg-0 ${!loadingInit && itemCount > 0 ? '' : 'd-none'}`}>
						<div className="row w-100">
							<h4 className="col-8 mb-1" data-cy="cart-total-label">{tStrings.cartTotal}</h4>
							<h4 className="col-4 mb-1 d-flex justify-content-end align-items-center" data-cy="cart-total-value">
								{!loadingCart && formatMoney(totalPrice)}
								{loadingCart && (<div className="spinner-border spinner-border-sm" role="status" />)}
							</h4>
							{tSettings.extraButtons && (
								<div className="col-6 my-1 pr-lg-hg" ref={(node) => { this.extraBtnsRef = node; }}>
									<div className="extra-checkout position-relative btn border-0 p-0 d-flex justify-content-center align-items-center">
										{loadingExtraButtons && (<div className="spinner-border position-absolute" role="status" />)}
										{displayExtraButtons && (<div className="dynamic-checkout__content" id="dynamic-checkout-cart" data-shopify="dynamic-checkout-cart" />)}
									</div>
								</div>
							)}
							<div className={`${tSettings.extraButtons ? 'col-6 pl-lg-hg' : 'col-12'} my-1`}>
								<button
									type="button"
									className="btn btn-lg btn-block btn-primary px-1"
									disabled={loadingDiscount || manualGwp.loading}
									onClick={this.submitForm}
									data-cy="checkout-btn"
								>
									{tStrings.cartCheckout}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
