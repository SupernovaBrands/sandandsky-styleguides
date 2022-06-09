import {
	validateEmail,
	validatePhone,
} from '~mod/utils';

const phoneSubmitted = (el) => {
	$(el).find('.modal--waitlist__phone').addClass('d-none');
	$(el).find('.modal--waitlist__phone-submitted').removeClass('d-none').addClass('d-flex');
};

const emailSubmitted = (el) => {
	$(el).find('.modal--waitlist__email').addClass('d-none');
	$(el).find('.modal--waitlist__email-submitted').removeClass('d-none').addClass('d-flex');
};

const formListener = () => {
	$('.modal--waitlist form, .product__waitlist-form form').on('submit', function (e) {
		console.log('form submit');
		e.preventDefault();
		const el = e.target;
		const email = $(el).find('input[name="email"]').val();
		const phone = $(el).find('input[name="phone"]').val() || '';
		const phoneValid = phone !== '' && validatePhone(phone);
		const emailValid = validateEmail(email);

		if (emailValid || phoneValid) {
			if (emailValid) {
				console.log('emailValid');
				emailSubmitted(el);
			}

			if (phoneValid) {
				console.log('phoneValid');
				phoneSubmitted(el);
			}
		}
	});
};

formListener();
$('.modal--waitlist').modal('show');
