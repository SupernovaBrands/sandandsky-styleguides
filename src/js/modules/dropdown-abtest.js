$('#dropdownMenuForm').on('hide.bs.dropdown', function () {
	// reset form showing to login
	$('#dropdown__register').removeClass('show');
	$('#dropdown__login').addClass('show');
});
