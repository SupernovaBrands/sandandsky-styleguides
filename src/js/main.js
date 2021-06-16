if ($('.carousel--scroll').length > 0) {
	import(/* webpackChunkName: 'carousel-scroll' */ '~mod/carousel-scroll');
}

if ($('.instagram-carousel').length > 0) {
	import(/* webpackChunkName: 'instagram' */ '~mod/instagram');
}
