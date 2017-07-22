
$('#sendSubscribeEmail').on('click', () => {

    var getEmail = $("#subscriptionEmail").val();

    $.ajax({
        type: "POST",
        url: "/api/subscribe",
        data: { subscribeEmail : getEmail  },
        success: ((data) => {
            alert('Успешно се регистрирахте за нашия бюлетин');
        }),
        error: ((error) => {
            alert(JSON.parse(error.responseText));            
        })
    });
});