$(document).ready(function () {
	$('#productFilter').on('hidden.bs.collapse', function () {
		$('.product-filter').removeClass('open');
	}).on('show.bs.collapse', function () {
		$('.product-filter').addClass('open');
	});

	$(".product-filter .nav-item a:not('.close-filter')").click(function () {
		const title = $(this).data('title');
		$('#filter-selected').html(title);
		$('#productFilter').collapse('hide');
	});
});
