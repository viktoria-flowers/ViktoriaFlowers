$('.addToCart').on('click', () => {

    var test = localStorage.getItem("test");
    var obj = [];
    var productName = $('#prodName').html();
    var productId = $('input[name=id]').attr('value');
    var exist = false;

    if (test) {
        obj = JSON.parse(test);
    }

    for (let i = 0; i < obj.length; i += 1) {
        if (obj[i].id == productId) {
            exist = true;
        }
    }

    if (!exist) {
        obj.push({ "id": $('input[name=id]').attr('value'), "name": $('.prodName').html(), "price": $('.prodPrice').html(), "imgUrl": $('.prodImg').attr('src') });
        alert('Продуктът беше добавен в количката');
    } else {
        alert('Вече сте добавили този продукт в количката');
    }

    if(localStorage.getItem("cart")){
        localStorage.setItem("cart", JSON.stringify(obj));
    }
    localStorage.setItem("test", JSON.stringify(obj));
});

if (localStorage.length > 0 && localStorage.test !== 'undefined') {

        let savedData;

        if(localStorage.test){
            savedData = JSON.parse(localStorage.test);
        }else{
            savedData = JSON.parse(localStorage.cart);
        }

        let savedDataLen = savedData.length;

    for (let i = 0; i < savedDataLen; i += 1) {

        // Dynamically create the products in cart => get them from localStorage
        let mainRow = $('<tr />').addClass('rem1');
        let firstCell = $('<td />').addClass('invert-image');
        let firstCellAnchor = $('<a />').attr('href', '/');
        let firstCellImg = $('<img />').addClass('img-responsive').attr('src', savedData[i].imgUrl);

        firstCellImg.appendTo(firstCellAnchor);
        firstCellAnchor.appendTo(firstCell);
        firstCell.appendTo(mainRow);

        let secondCell = $('<td />').addClass('invert').html(savedData[i].name).attr('value', savedData[i].id).addClass('productName');
            secondCell.appendTo(mainRow);

        let thirdCell = $('<td />').addClass('invert');
        let quantityDiv = $('<div />').addClass('quantity');
        quantityDiv.appendTo(thirdCell);

        let quantitySelectDiv = $('<div />').addClass('quantity-select');
        quantitySelectDiv.appendTo(quantityDiv);

        let valueMinusDiv = $('<div />').addClass('entry value-minus');
        valueMinusDiv.appendTo(quantitySelectDiv);

        let entryValue = $('<div />').addClass('entry value');
        let spanNumber = $('<span />').html(1);
        spanNumber.appendTo(entryValue);
        entryValue.appendTo(quantitySelectDiv);

        let valuePlusDiv = $('<div />').addClass('entry value-plus active');
        valuePlusDiv.appendTo(quantitySelectDiv);

        thirdCell.appendTo(mainRow);

        let fourthCell = $('<td />').addClass('invert');
        let fourthCellLabel = $('<label />').html(savedData[i].price).attr('class', 'dynamicPrice').attr('value', savedData[i].price);

        fourthCellLabel.appendTo(fourthCell);
        fourthCell.appendTo(mainRow);

        let fifthCell = $('<td />').addClass('invert');
        let fifthCellDiv = $('<div />').addClass('rem');
        let fifthCellDivInner = $('<div />').addClass('close1');

        fifthCellDivInner.appendTo(fifthCellDiv);
        fifthCellDiv.appendTo(fifthCell);
        fifthCell.appendTo(mainRow);

        let tableBody = $('#checkoutBody');
        mainRow.appendTo(tableBody);
    }
} else {
    let container = $('<tr />').addClass('panel panel-default');
    let panelBody = $('<td />').attr('colspan', 5).addClass('panel-body text-center').html('Вашата количка е празна');

    panelBody.appendTo(container);

    let tableBody = $('#checkoutBody');

    container.appendTo(tableBody);
}
var sum = $('.rem1').find('.dynamicPrice').map(function(){
    return $(this).html();
}).get();


var totalSum = sum.reduce(function (a, b) {
    return parseInt(a) + parseInt(b);
}, 0);


let totalSumLabel = $('<p />');
    totalSumLabel.html('Обща сума: ' + totalSum + 'лв.');
let totalSumHolder = $('.checkout-left-basket');
    totalSumLabel.prependTo(totalSumHolder);

//This script is for deleting product from cart
$('body').on('click', '.rem1 .close1', function (c) {
    $(this).closest('tr').fadeOut('slow', function (c) {
        $(this).closest('tr').remove();        
        let sumToBeRemoved = parseInt($(this).closest('tr').find('.dynamicPrice').html());
            totalSumLabel.html('Обща сума: ' + (totalSum -= sumToBeRemoved) + 'лв.');

        let savedData;

        if(localStorage.test){
            savedData = JSON.parse(localStorage.test);
        }else{
            savedData = JSON.parse(localStorage.cart);
        }

        let savedDataLen = savedData.length,
            productForDeletion = $(this).closest('tr').find('.productName').attr('value'),
            slicedLocalStorage;

        for (let i = 0; i < savedDataLen; i += 1) {
            if(savedData[i].id === productForDeletion){
                slicedLocalStorage = savedData.splice(i, 1);
            }
        }
        localStorage.removeItem("test");
        localStorage.setItem("cart", JSON.stringify(slicedLocalStorage));
    });
});

totalSumLabel.html('Обща сума: ' + totalSum + 'лв.');

//This script is for quantity increasing
$('body').on('click', '.value-plus', function () {
    let valueField = $(this).parent().find('.value'),
        newValue = parseInt(valueField.text(), 10) + 1;
    valueField.text(newValue);

    let dynamicPriceField = $(this).parent().parent().parent().parent().find('.dynamicPrice');
    dynamicPriceField.text(parseInt(dynamicPriceField.attr('value')) * newValue);
    totalSum += (parseInt(dynamicPriceField.attr('value')));
    totalSumLabel.html('Обща сума: ' + totalSum + 'лв.');
});

//This script is for quantity decreasing
$('body').on('click', '.value-minus', function () {
    let valueField = $(this).parent().find('.value'),
        newValue = parseInt(valueField.text(), 10) - 1;
    if (newValue >= 1) {
        valueField.text(newValue);
        let dynamicPriceField = $(this).parent().parent().parent().parent().find('.dynamicPrice');
        let initialValue = $(this).parent().parent().parent().parent().find('.dynamicPrice').attr('value');
            dynamicPriceField.text(parseInt(dynamicPriceField.text()) - parseInt(initialValue));
        totalSum -= (parseInt(dynamicPriceField.attr('value')));
        totalSumLabel.html('Обща сума: ' + totalSum + 'лв.');
    }
});