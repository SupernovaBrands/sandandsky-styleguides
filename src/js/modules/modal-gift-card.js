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

$('#chooseDate').on('click', function () {
	$(this).addClass('d-none');
	$('#chooseDateInput').removeClass('d-none').click().focus();
});

$('#sendNow').on('click', function () {
	$('#chooseDate').removeClass('d-none');
	$('#chooseDateInput').addClass('d-none');
});

$('.btn__send').on('click', function () {
	$('.btn__send').removeClass('btn-primary').addClass('btn-outline-primary');
	$(this).removeClass('btn-outline-primary').addClass('btn-primary');
});
