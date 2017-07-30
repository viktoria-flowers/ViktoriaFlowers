/*globals $ */
$('#search-span').on('click', function (e) {
	console.log(55555555555);

	let form = $('#search-form');
	console.log(form);
	if (!$('#autocomplete').val()) {
		e.preventDefault();
		return;
	}
	
	$(form).submit();
});