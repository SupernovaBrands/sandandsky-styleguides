$(document).ready(function () {
	// video modal
	let $videoSrc;
	if ($('.video-card').length > 0) {
		$('.video-card picture').on('click', function () {
			$videoSrc = $(this).data('src');
		});
	}

	const toggleHTMLVideo = (videoEl, show, source) => {
		if (show) {
			videoEl.find('source').attr('src', source);
			videoEl.get(0).load();
			videoEl.get(0).play();
			videoEl.removeClass('d-none');
		} else {
			videoEl.find('source').attr('src', '');
			videoEl.get(0).load();
			videoEl.get(0).pause();
			videoEl.addClass('d-none');
		}
	};

	const toggleiFrameVideo = (iframeEl, show, source) => {
		if (show) {
			iframeEl.attr('src', source).removeClass('d-none');
		} else {
			iframeEl.attr('src', '').addClass('d-none');
		}
	};

	// set the video src to autoplay and not to show related video.
	$('#videoCardModal').on('shown.bs.modal', function () {
		if ($videoSrc.includes('.mp4')) {
			toggleiFrameVideo($(this).find('iframe'), false);
			toggleHTMLVideo($(this).find('video'), true, $videoSrc);
		} else {
			toggleHTMLVideo($(this).find('video'), false);
			toggleiFrameVideo($(this).find('iframe'), true, $videoSrc);
		}
	});

	$('#videoCardModal').on('hide.bs.modal', function () {
		toggleHTMLVideo($(this).find('video'), false);
		toggleiFrameVideo($(this).find('iframe'), false);
	});
});

if ($('.hero-carousel').length > 0) {
	import(/* webpackChunkName: 'hero-carousel' */ '~mod/hero-carousel');
}

if ($('.product-card').length > 0) {
	import(/* webpackChunkName: 'product-card' */ '~mod/product-card');
}

if ($('.carousel--scroll').length > 0) {
	import(/* webpackChunkName: 'carousel-scroll' */ '~mod/carousel-scroll');
}

if ($('.product-image-carousel').length > 0) {
	import(/* webpackChunkName: 'carousel-product-image' */ '~mod/carousel-product-image');
}

if ($('.instagram-carousel').length > 0) {
	import(/* webpackChunkName: 'instagram' */ '~mod/instagram');
}

if ($('.a-beauty-review').length > 0) {
	import(/* webpackChunkName: 'a-beauty-review' */ '~mod/a-beauty-review');
}
