$('.tab--scroll a[data-toggle="tab"]').on('shown.bs.tab', function () {
	$('.tab-pane').addClass('fade').removeClass('active');
	const targetId = $(this).attr('href');
	const titleText = $(this).text();
	if (targetId !== '#collection__all') {
		$(`${targetId}`).addClass('active show');
		$('.tab-pane h4.d-lg-none').addClass('d-none');
		$('.tab-pane h4.h2').removeClass('d-lg-block');
	} else {
		$('.tab-pane').addClass('active show');
		$('.tab-pane h4.d-lg-none').removeClass('d-none');
		$('.tab-pane h4.h2').addClass('d-lg-block');
	}
	$('#collection__title').text(titleText);
});
