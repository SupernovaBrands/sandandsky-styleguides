$('.modal--newsletter').on('show.bs.modal', function () {
	$('body').addClass('modal--newsletter-open');
});

$('.modal--newsletter').on('hidden.bs.modal', function () {
	$('body').removeClass('modal--newsletter-open');
	$('#newsletter-form').removeClass('d-none');
	$('#account-form').addClass('d-none');
	$('#completed-form').addClass('d-none');
});

$('#newsletter-form form').on('submit', function (e) {
	e.preventDefault();
	$('#newsletter-form').addClass('d-none');
	$('#account-form').removeClass('d-none');
});

$('#account-form form').on('submit', function (e) {
	e.preventDefault();
	$('#account-form').addClass('d-none');
	$('#completed-form').removeClass('d-none');
});
