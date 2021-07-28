const { body, documentElement: html } = document;
const proggreeBar = $('.reading-proggress-bar');
const height = Math.max(
	body.scrollHeight,
	body.offsetHeight,
	html.clientHeight,
	html.scrollHeight,
	html.offsetHeight,
);

const setProgress = () => {
	const scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;
	const width = `${(scrollFromTop / height) * 100}%`;
	proggreeBar.find('.reading-proggress-bar__proggress').css('width', width);
};

window.addEventListener('scroll', setProgress);
setProgress();
