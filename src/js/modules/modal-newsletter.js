$('.modal--newsletter').on('show.bs.modal', function () {
	$('body').addClass('modal--newsletter-open');
});

$('.modal--newsletter').on('hidden.bs.modal', function () {
	$('body').removeClass('modal--newsletter-open');
	$('#newsletter-form').removeClass('d-none');
	$('#account-form').addClass('d-none');
	$('#completed-form').addClass('d-none');
});

$('#less-intrusive-newsletter-form--newsletter form').on('submit', function (e) {
	e.preventDefault();
	$('#less-intrusive-newsletter-form--newsletter').addClass('d-none');
	$('#account-form--newsletter').removeClass('d-none');
});

$('#account-form--newsletter form').on('submit', function (e) {
	e.preventDefault();
	$('#account-form--newsletter').addClass('d-none');
	$('#completed-form--newsletter').removeClass('d-none');
	$('.modal--newsletter__bg').addClass('d-none');
	$('.modal--newsletter__bg-completed').removeClass('d-none');
	$('.modal--newsletter .modal-content').addClass('completed-bg');
});

$('.countries-options__select').on('change', function () {
	const val = $(this).val();
	const maskingEl = $('.countries-options__label');
	const phoneCode = $(this).find(`option[value='${val}']`).data('code');
	maskingEl.text(`+${phoneCode}`).addClass('selected');
	$(this).trigger('mouseleave');
});

if ($('html').hasClass('newsletter-without-announcement-abtest')) {
	$('.modal--newsletter').modal('show');
}

$('.modal--newsletter').modal('show');