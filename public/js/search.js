/*globals $, toastr*/
$('#search-span').on('click', function (e) {
	let form = $('#search-form');
	$(form).submit();
});

$('#search-form').submit(function (e) {
	if ($(e.target).attr('isValid')) {
		return;
	}
	else {
		e.preventDefault();
	}

	let form = $('#search-form');
	let currentValue = $(".autocompleteInput").val();

	if (!currentValue) {
		toastr.warning('Моля въведете име на продукт');
		return;
	}

	$.ajax({
		type: "GET",
		url: "/api/autocomplete",
		data: { name: currentValue },
		success: ((data) => {
			if (data.indexOf(currentValue) === -1) {
				toastr.warning(`Няма продукт с име ${currentValue}`);
			}
			else {
				form.attr('isValid', true);
				$(form).submit();
			}
		}),
		error: ((error) => {
			toastr.error('Грешка при търсене');
		})
	});
});