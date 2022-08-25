$('.blog-post-grid__newsletter form').on('submit', function (e) {
	e.preventDefault();
	$('.blog-post-grid__newsletter--content form').addClass('d-none').removeClass('d-flex');
	$('.blog-post-grid__newsletter--submitted').removeClass('d-none');
});
