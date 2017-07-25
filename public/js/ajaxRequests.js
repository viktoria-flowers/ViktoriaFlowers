/*globals $, alert, typeahead */
$('.autocompleteInput').on('keyup', () => {
    let currentValue = $(".autocompleteInput").val();
    $.ajax({
        type: "GET",
        url: "/api/autocomplete",
        data: { name: currentValue },
        success: ((data) => {
            $('#autocomplete').typeahead({ source: data });
        }),
        error: ((error) => {
            alert("error on search");
        })
    });
});

$('#sendSubscribeEmail').on('click', () => {

    let subscriberEmail = $("#subscriptionEmail").val(),
        errorMessages = {
            existingEmail: 'E-mail адресът, който сте въвели вече съществува! Моля, опитайте отново',
        },
        hasError = false;

    function validate(email) {
        let pattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
        if (!email.match(pattern)) {
            alert('Моля, въведете валиден e-mail адрес');
            $('#subscriptionEmail').val('');
            hasError = true;
        }
    }

    validate(subscriberEmail);

    if (hasError) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "/api/subscribe",
        data: { subscribeEmail: subscriberEmail },
        success: ((data) => {
            alert('Успешно се регистрирахте за нашия бюлетин');
            $('#subscriptionEmail').val('');
        }),
        error: ((error) => {
            if (error.responseJSON === 'email-exists') {
                alert(errorMessages.existingEmail);
            }
        })
    });
});

// to do more work here
$('#contactFormSend').on('click', (() => {

    let names = $('#cUserNames').val();
    let email = $('#cUserEmail').val();
    let text = $('#cUserText').val();

    let hasError = false;

    function validate(names, email, text) {
        let namesPattern = /^[a-zA-Z]+$/;
        let emailPattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
        let textPattern = /^[a-zA-Z0-9 ]+$/;

        if (names === '' || email === '' || text === '') {
            alert('Формата за връзка с нас е празна, моля попълнете всички полета');
            return;
        }

        if (!names.match(namesPattern)) {
            alert('Моля, въведете валидни имена');
            $('#cUserNames').val('');
            hasError = true;
        }

        if (!email.match(emailPattern)) {
            alert('Моля, въведете валиден e-mail адрес');
            $('#cUserEmail').val('');
            hasError = true;
        }

        if (!text.match(textPattern)) {
            alert('Текстовото поле съдържа непозволени символи');
            $('#cUserText').val('');
            hasError = true;
        }
    }

    validate(names, email, text);

    if (hasError) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "/api/contactUs",
        data: {
            contactUserNames: names,
            contactUserEmail: email,
            contactUserText: text,
        },
        success: ((data) => {
            alert('Успешно се абонирахте за нашите предложения');
            $('#cUserNames').val('');
            $('#cUserEmail').val('');
            $('#cUserText').val('');
        }),
        error: ((error) => {
            let len = error.responseJSON.length;

            for (let i = 0; i < len; i += 1) {
                if (error.responseJSON[i] === 'names') {
                    alert('Моля, въведете валидни имена');
                } else if (error.responseJSON[i] === 'email') {
                    alert('Моля, въведете валиден e-mail');
                } else if (error.responseJSON[i] === 'text') {
                    alert('Използвали сте невалидни символи в текстовото поле');
                }
            }
        })
    });

}));

