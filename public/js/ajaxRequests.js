/*globals $, alert, typeahead */
$('.autocompleteInput').on('keyup', () => {
    let currentValue = $(".autocompleteInput").val();
    // let data = ['pesho', 'gosho', 'sasho'];
alert(currentValue);
    $.ajax({
        type: "POST",
        url: "/api/autocomplete",
        data: { currentValue: currentValue },
        success: ((data) => {
            $('#autocomplete').typeahead({source: data.data});
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

