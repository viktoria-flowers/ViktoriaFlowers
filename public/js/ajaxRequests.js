/*globals $, typeahead, toastr */
$('.autocompleteInput').on('keyup', () => {
    
    let currentValue = $(".autocompleteInput").val();
    if (!currentValue) {
        return;
    }

    $.ajax({
        type: "GET",
        url: "/api/autocomplete",
        data: { name: currentValue },
        success: ((data) => {
            $('#autocomplete').autocomplete({ source: data });
                        // .typeahead({ source: data });
        }),
        error: ((error) => {
            toastr.error("error on search");
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
            toastr.error("Моля, въведете валиден e-mail адрес");
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
            toastr.success("Успешно се регистрирахте за нашия бюлетин");
            $('#subscriptionEmail').val('');
        }),
        error: ((error) => {
            if (error.responseJSON === 'email-exists') {
                toastr.error(errorMessages.existingEmail);
            }
        })
    });
});

// to do more work here
$('#contactFormSend').on('click', (() => {

    let names = $('#cUserNames').val();
    let email = $('#cUserEmail').val();
    let text = $('#cUserText').val();

    let hasError = validate(names, email, text);

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
            toastr.success('Успешно се абонирахте за нашите предложения');
            $('#cUserNames').val('');
            $('#cUserEmail').val('');
            $('#cUserText').val('');
        }),
        error: ((error) => {
            let len = error.responseJSON.length;

            for (let i = 0; i < len; i += 1) {
                if (error.responseJSON[i] === 'names') {
                    toastr.error('Моля, въведете валидни имена');
                } else if (error.responseJSON[i] === 'email') {
                    toastr.error('Моля, въведете валиден e-mail');
                } else if (error.responseJSON[i] === 'text') {
                    toastr.error('Използвали сте невалидни символи в текстовото поле');
                }
            }
        })
    });

}));

$('body').on('click', '.delete_product', (e) => {

    let productId = $(e.target).parent().parent().find('.idCell').attr('value');
    
    $.ajax({
        type: "POST",
        url: "/api/delete-product",
        data: { _id: productId },
        success: ((data) => {
            $(location).attr('href', '/products/delete');
        }),
        error: ((error) => {
            toastr.error(JSON.stringify(error));
        })
    });
});

function validate(names, email, text) {
    let namesPattern = /^[a-zA-Z]+/;
    let emailPattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    let textPattern = /^[a-zA-Z0-9 ]+$/;
    let hasError = false;

    if (!names && !email && !text) {
        toastr.error('Формата за връзка с нас е празна, моля попълнете всички полета');
        hasError = true;
        return hasError;
    }
    if (!names.match(namesPattern)) {
        toastr.error('Моля, въведете валидни имена');
        $('#cUserNames').val('');
        hasError = true;
        return hasError;

    }

    if (!email.match(emailPattern)) {
        toastr.error('Моля, въведете валиден e-mail адрес');
        $('#cUserEmail').val('');
        hasError = true;
        return hasError;
    }

    if (!text.match(textPattern)) {
        toastr.error('Текстовото поле съдържа непозволени символи или е празно');
        $('#cUserText').val('');
        hasError = true;
        return hasError;
    }
    return hasError;

}

$('#checkout-button').on('click', () => {

    let ids = $('.productName').toArray();
    let quantities = $('.quantities').toArray();
    let sendInfo = [];
    let sendIdsArray = [];
    let sendQuantitiesArray = [];

    for (let i = 0; i < ids.length; i += 1) {
        sendIdsArray.push({ "_id": ids[i].attributes.value.nodeValue });
        sendQuantitiesArray.push(quantities[i].innerHTML);
    }

    sendInfo[0] = sendIdsArray;
    sendInfo[1] = sendQuantitiesArray;

    $.ajax({
        type: "POST",
        url: "/api/checkout",
        data: {
            sendInfo: sendInfo,
        },
        success: ((data) => {
            toastr.success(data);
        }),
        error: ((error) => {
            toastr.error(JSON.stringify(error));
        })
    });
});

$('.set-admin').on('click', (e) => {

    let userId = $(e.target).parent().parent().find('.userIdCell').attr('value');

    $.ajax({
        type: "POST",
        url: "/api/create-admin",
        data: {
            userId: userId,
        },
        success: ((data) => {
            $(location).attr('href', '/userslist');
        }),
        error: ((error) => {
            toastr.error(error);                            
        })
    });
});



