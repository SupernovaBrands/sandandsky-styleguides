$('.modal--newsletter').on('show.bs.modal', function () {
	$('body').addClass('modal--newsletter-open');
});

$('.modal--newsletter').on('hidden.bs.modal', function () {
	$('body').removeClass('modal--newsletter-open');
	$('#newsletter-form').removeClass('d-none');
	$('#account-form').addClass('d-none');
	$('#completed-form').addClass('d-none');
});

$('#main-newsletter-form form').on('submit', function (e) {
	e.preventDefault();
	$('#main-newsletter-form').addClass('d-none');
	$('#main-account-form').removeClass('d-none');
});

$('#main-account-form form').on('submit', function (e) {
	e.preventDefault();
	$('#main-account-form').addClass('d-none');
	$('#main-completed-form').removeClass('d-none');
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
