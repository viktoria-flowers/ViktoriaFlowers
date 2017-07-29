/*globals $ */
$('body').on('click', '.input-group-addon', function (e) {

	let form = $(e.target).closest($('form-group'));

	if (!$('#autocomplete').val()) {
		e.preventDefault();
		return;
	}
	console.log(55555555555);
	$(form).submit();
});