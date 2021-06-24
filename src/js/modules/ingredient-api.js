const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQzZGQ4MzdjMzAxMzM2OWM4ODJlYjQiLCJjbGllbnRuYW1lIjoic2FuZCBhbmQgc2t5IiwidXNlcm5hbWUiOiJzYW5kc2t5IiwicGFzc3dvcmQiOiIkMmEkMTAkWjNwRzNkUG8vUW16MjVLeTRFbUFUdVJDV1MzL0ZndHRUVHRwd2xxaFZmb1pMNmxBWThyL08iLCJlbWFpbCI6InJoaWFubmUuY2xpZmZvcmRAc3VwZXJub3ZhYnJhbmRzLmNvbSIsInBhY2thZ2UiOiJ1bHRhIGNvbnNjaW91cyBiZWF1dHkiLCJwZXJtaXNzaW9uIjoib3duZXIiLCJpYXQiOjE2MjQzODk4MjZ9.fxRhjKnsENhUOivqcDzzzzTZtBaeEy6l3Qp5j43d3Tg';

const toCapitalize = (text) => {
	const upperCase = text.toLowerCase().replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});
	return upperCase;
};

const listIngredients = (ingredientArray) => {
	let serialize = '';
	if (ingredientArray.length > 0) {
		for (let i = 0; i <= ingredientArray.length - 1; i += 1) {
			const ingName = ingredientArray[i].ingredientName;
			const note = ingredientArray[i].retailerNote;
			const upperCase = toCapitalize(ingName);
			const speciality = ingredientArray[i].specialty;
			serialize += `<a href="#" class="d-inline-block text-body text-capitalize mr-1" data-toggle="modal" data-target="#ingredientModal" data-name="${ingName}" data-note="${note}" data-speciality="${speciality}">${upperCase},</a>`;
		}
	}
	return serialize;
};

const parseIngredients = (responseData) => {
	let html = '';
	if (responseData.productIngredients.length > 0) {
		$.each(responseData.productIngredients, function (k, obj) {
			if (obj.functionGroup.length > 0) {
				$.each(obj.functionGroup, function (l, obj2) {
					html += listIngredients(obj2.ingredients);
				});
			}
		});
	}
	return html;
};

// test mode data
$('#collapseIngredients').on('show.bs.collapse', function () {
	const sku = $('#collapseIngredients').data('sku');
	const cname = $('#collapseIngredients').data('cname');
	const params = {
		async: true,
		crossDomain: true,
		contentType: 'application/json',
		url: `//server.clearforme.com/api/app/products/details?sku=${sku}&clientname=${cname}`,
		method: 'GET',
		beforeSend: (xhr) => {
			xhr.setRequestHeader('Authorization', `Bearer ${token}`);
		},
		processData: false,
	};
	$.ajax(params).done(function (response) {
		const ingredientHtml = parseIngredients(response);
		$('.tab-ingredient__content').html(ingredientHtml);
	});
});

$('#ingredientModal').on('show.bs.modal', function (event) {
	$('.tab-ingredient__modal-title').addClass('d-none');
	$('.tab-ingredient__modal-definition').addClass('d-none');
	$('.tab-ingredient__modal-note').addClass('d-none');
	$('.tab-ingredient__modal-quality').addClass('d-none');
	$('.tab-ingredient__modal-func').addClass('d-none');

	const triggerBtn = $(event.relatedTarget).attr('data-name');
	const dataNote = $(event.relatedTarget).attr('data-note');
	const sku = $('#collapseIngredients').data('sku');
	const cname = $('#collapseIngredients').data('cname');
	const dataSp = $(event.relatedTarget).attr('data-speciality');
	const params = {
		async: true,
		crossDomain: true,
		contentType: 'application/json',
		url: `https://server.clearforme.com/api/app/ingredients/definition?sku=${sku}&ingredientName=${triggerBtn}&clientname=${cname}`,
		method: 'GET',
		beforeSend: (xhr) => {
			xhr.setRequestHeader('Authorization', `Bearer ${token}`);
		},
		processData: false,
	};
	$.ajax(params).done(function (response) {
		const cfmAttributes = response.cfmIngredientAttributes;
		const cfmAttributesString = [];
		if (cfmAttributes.length > 0) {
			for (let i = 0; i <= cfmAttributes.length - 1; i += 1) {
				cfmAttributesString[i] = cfmAttributes[i].attribute;
			}
		}
		$('.tab-ingredient__modal-title').html(toCapitalize(triggerBtn)).removeClass('d-none');
		$('.tab-ingredient__modal-definition').html(`<strong>Definition: </strong>${response.definition}`).removeClass('d-none');
		if (dataNote !== '') {
			$('.tab-ingredient__modal-note').html(`<strong>Note:</strong> ${dataNote}`).removeClass('d-none');
		}
		if (cfmAttributesString.length > 0) {
			$('.tab-ingredient__modal-func').html(`<strong>Functions: </strong>${cfmAttributesString.join(', ')}.`).removeClass('d-none');
		}
		if (dataSp !== '') {
			$('.tab-ingredient__modal-quality').html(`<strong>Qualities: </strong>${dataSp}`).removeClass('d-none');
		}
	});
});
