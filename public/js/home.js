$('body').on('click', '#myButton', function(e) {
    $.get('/api', function(data) {
        alert('Check the console F12');
        console.log(data);
    })
});