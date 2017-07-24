$('#sendSubscribeEmail').on('click', () => {

    let subscriberEmail = $("#subscriptionEmail").val(),
        errorMessages = {
            existingEmail : 'E-mail адресът, който сте въвели вече съществува! Моля, опитайте отново',
        },
        hasError = false;
    
    function validate(email){
        let pattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
        if(!email.match(pattern)){
            alert('Моля, въведете валиден e-mail адрес');
            $('#subscriptionEmail').val('');
            hasError = true;
        }
    }

    validate(subscriberEmail);

    if(hasError){
        return;
    }

    $.ajax({
        type: "POST",
        url: "/api/subscribe",
        data: { subscribeEmail : subscriberEmail },
        success: ((data) => {
            alert('Успешно се регистрирахте за нашия бюлетин');
            $('#subscriptionEmail').val('');
        }),
        error: ((error) => {
            if(error.responseJSON === 'email-exists'){
                alert(errorMessages.existingEmail);
            }
        })
    });
});