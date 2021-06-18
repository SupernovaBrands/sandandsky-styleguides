export const setCookie = (name, value, days = 1) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = `; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const getCookie = (name) => {
	const nameEQ = `${name}=`;
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i += 1) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};

export const removeCookie = (name) => {
	setCookie(name, null);
};

export const daysToTime = (days = 1) => days * 24 * 60 * 60 * 1000;

export const setLSWithExpiry = (key, value, ttl = 60 * 60 * 1000) => {
	const now = new Date();
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

export const getLSWithExpiry = (key) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) { return null; }
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

export const removeLS = (key) => {
	localStorage.removeItem(key);
};

export const waitFor = (condition, cb) => {
	if (typeof condition === 'function' && typeof cb === 'function') {
		setTimeout(() => {
			if (condition()) { cb(); } else { waitFor(condition, cb); }
		}, 200);
	}
};
