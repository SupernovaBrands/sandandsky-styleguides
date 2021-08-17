import snCart from '~mod/sn-cart';

// eslint-disable-next-line import/prefer-default-export
export const blogUpsellBtn = (id, mode) => {
	if (mode === 'add') {
		$(`.upsell__add[data-id="${id}"]`).addClass('d-none');
		$(`.upsell__remove[data-id="${id}"]`).removeClass('d-none');
	} else if (mode === 'remove') {
		$(`.upsell__add[data-id="${id}"]`).removeClass('d-none');
		$(`.upsell__remove[data-id="${id}"]`).addClass('d-none');
	}
};

const checkUpsellBtnPDP = () => {
	$('.upsell__add').each(function (i, el) {
		const variantId = $(el).attr('data-id');
		$(this).siblings('.btn__loading').addClass('d-none');
		const itemInCart = snCart.getItem(parseInt(variantId, 10));

		if (itemInCart) {
			$(this).addClass('d-none');
			$(this).siblings('.upsell__remove').removeClass('d-none');
		} else {
			$(this).removeClass('d-none');
			$(this).siblings('.upsell__remove').addClass('d-none');
		}
	});
};

$(document).on('click', '.upsell__remove', function (e) {
	e.preventDefault();
	const variantId = $(this).attr('data-id');
	$(this).addClass('d-none');
	$(this).siblings('.btn__loading').removeClass('d-none');
	snCart.removeItem(parseInt(variantId, 10));
	$(this).siblings('.btn__loading').addClass('d-none');
	$(this).siblings('.upsell__add').removeClass('d-none');
});

$(document).ready(function () {
	checkUpsellBtnPDP();
});

document.addEventListener('snCart.requestComplete', function () {
	$('#cart-drawer').modal({
		show: true,
	});
});
