$('#sendSubscribeEmail').on('click', () => {

    let subscriberEmail = $("#subscriptionEmail").val(),
        errorMessages = {
            existingEmail : 'E-mail адресът, който сте въвели вече съществува! Моля, опитайте отново',
        };
    
    function validate(email){
        let pattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
        if(!email.match(pattern)){
            alert('Моля, въведете валиден e-mail адрес');
            return;
        }
    }

    validate(subscriberEmail);

    $.ajax({
        type: "POST",
        url: "/api/subscribe",
        data: { subscribeEmail : subscriberEmail },
        success: ((data) => {
            alert('Успешно се регистрирахте за нашия бюлетин');
        }),
        error: ((error) => {
            if(error.responseText === 'email'){
                alert(errorMessages.existingEmail);
            }
        })
    });
});