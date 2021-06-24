const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQzZGQ4MzdjMzAxMzM2OWM4ODJlYjQiLCJjbGllbnRuYW1lIjoic2FuZCBhbmQgc2t5IiwidXNlcm5hbWUiOiJzYW5kc2t5IiwicGFzc3dvcmQiOiIkMmEkMTAkWjNwRzNkUG8vUW16MjVLeTRFbUFUdVJDV1MzL0ZndHRUVHRwd2xxaFZmb1pMNmxBWThyL08iLCJlbWFpbCI6InJoaWFubmUuY2xpZmZvcmRAc3VwZXJub3ZhYnJhbmRzLmNvbSIsInBhY2thZ2UiOiJ1bHRhIGNvbnNjaW91cyBiZWF1dHkiLCJwZXJtaXNzaW9uIjoib3duZXIiLCJpYXQiOjE2MjQzODk4MjZ9.fxRhjKnsENhUOivqcDzzzzTZtBaeEy6l3Qp5j43d3Tg';

const listIngredients = (ingredientArray) => {
	let serialize = '';
	if (ingredientArray.length > 0) {
		for (let i = 0; i <= ingredientArray.length - 1; i += 1) {
			const ingName = ingredientArray[i].ingredientName;
			const upperCase = ingName.toLowerCase().replace(/\b[a-z]/g, function (letter) {
				return letter.toUpperCase();
			});
			serialize += `<a href="#" class="d-inline-block text-body text-capitalize mr-1" data-toggle="modal" data-target="#ingredientModal" data-name="${ingredientArray[i].ingredientName}">${upperCase},</a>`;
		}
	}
	return serialize;
};

const parseIngredients = (responseData) => {
	let html = '';
	if (responseData.productIngredients.length > 0) {
		$.each(responseData.productIngredients, function (k, obj) {
			if (obj.functionGroup.length > 0) {
				$.each(obj.functionGroup, function (k, obj) {
					html += listIngredients(obj.ingredients);
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
	const triggerBtn = $(event.relatedTarget).attr('data-name');
	const sku = $('#collapseIngredients').data('sku');
	const cname = $('#collapseIngredients').data('cname');
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
		console.log(response);
	});
});
