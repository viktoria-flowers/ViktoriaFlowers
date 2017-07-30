/*globals $ */
$('#search-span').on('click', function (e) {
	let form = $('#search-form');
	let currentValue = $(".autocompleteInput").val();

	if (!currentValue) {
		toastr.error('Моля въведете име на продукт');
		e.preventDefault();
		return;
	}

	$.ajax({
		type: "GET",
		url: "/api/autocomplete",
		data: { name: currentValue },
		success: ((data) => {
			console.log(data);
			console.log(currentValue);
			if (data.indexOf(currentValue) === -1) {
				toastr.error('Няма такъв продукт');
			}
			else {
				$(form).submit();
			}
		}),
		error: ((error) => {
			toastr.error('Грешка при търсене');
		})
	});
});