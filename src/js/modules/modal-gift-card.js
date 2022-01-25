$('.product-form').on('submit', function (e) {
	const isSendAsGift = $('#asGift').prop('checked');
	if (isSendAsGift) {
		e.preventDefault();
		$('#giftCardModal').modal({
			show: true,
		});
	}
});

$('.carousel-item__giftcard').on('click', function () {
	$('.carousel-item__giftcard img').removeClass('border-secondary');
	$(this).find('img').addClass('border-secondary');
});
