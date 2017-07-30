$('.addToCart').on('click', () => {

    var username = getUserName();
    var storageKey = 'cart-' + username;
    var products = localStorage.getItem(storageKey);
    var productsArr = [];
    var productName = $('#prodName').html();
    var productId = $('input[name=id]').attr('value');
    var exist = false;

    if (products) {
        productsArr = JSON.parse(products);
    }

    for (let i = 0; i < productsArr.length; i += 1) {
        if (productsArr[i].id == productId) {
            exist = true;
        }
    }

    if (!exist) {
        productsArr.push({ "id": $('input[name=id]').attr('value'), "name": $('.prodName').html(), "price": $('.prodPrice').html(), "imgUrl": $('.prodImg').attr('src') });
        toastr.info('Продуктът беше добавен в количката')
    } else {
        toastr.options.closeButton = true;
        toastr.error('Вече сте добавили този продукт в количката')
    }

    // if (localStorage.getItem("cart")) {
    //     localStorage.setItem("cart", JSON.stringify(productsArr));
    // }
    localStorage.setItem(storageKey, JSON.stringify(productsArr));
});

var username = getUserName();
var localStorageKey = 'cart-' + username;

if (localStorage.length > 0 && localStorage[localStorageKey]) {

    let savedData = JSON.parse(localStorage[localStorageKey]);

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

        let secondCell = $('<td />').addClass('invert productName').html(savedData[i].name).attr('value', savedData[i].id);
        secondCell.appendTo(mainRow);

        let thirdCell = $('<td />').addClass('invert');
        let quantityDiv = $('<div />').addClass('quantity');
        quantityDiv.appendTo(thirdCell);

        let quantitySelectDiv = $('<div />').addClass('quantity-select');
        quantitySelectDiv.appendTo(quantityDiv);

        let valueMinusDiv = $('<div />').addClass('entry value-minus');
        valueMinusDiv.appendTo(quantitySelectDiv);

        let entryValue = $('<div />').addClass('entry value');
        let spanNumber = $('<span />').html(1).addClass('quantities');
        spanNumber.appendTo(entryValue);
        entryValue.appendTo(quantitySelectDiv);

        let valuePlusDiv = $('<div />').addClass('entry value-plus active');
        valuePlusDiv.appendTo(quantitySelectDiv);

        thirdCell.appendTo(mainRow);

        let fourthCell = $('<td />').addClass('invert');
        let fourthCellLabel = $('<label />').html(savedData[i].price + ' лв.');
        fourthCellLabel.appendTo(fourthCell);
        fourthCell.appendTo(mainRow);

        let fifthCell = $('<td />').addClass('invert');
        let fifthCellLabel = $('<label />').html(savedData[i].price).attr('class', 'dynamicPrice').attr('value', savedData[i].price);
        let currencySpan = $('<span />').html(' лв.');
        currencySpan.appendTo(fifthCellLabel);

        fifthCellLabel.appendTo(fifthCell);
        fifthCell.appendTo(mainRow);

        let sixthCell = $('<td />').addClass('invert');
        let sixthCellDiv = $('<div />').addClass('rem');
        let sixthCellDivInner = $('<div />').addClass('close1');

        sixthCellDivInner.appendTo(sixthCellDiv);
        sixthCellDiv.appendTo(sixthCell);
        sixthCell.appendTo(mainRow);

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

// All images in site
$(document).ready(function() {
    $('.prodImg')
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'inline-block')
        .parent()
        .zoom({
            touch: true
        });
});

// Cart images
$(document).ready(function() {
    $('td img')
        .wrap('<div style="height:300px"></div>')
        .css('display', 'block')
        .parent()
        .zoom({
            touch: true
        });
});

var sum = $('.rem1').find('.dynamicPrice').map(function() {
    return $(this).html();
}).get();


var totalSum = sum.reduce(function(a, b) {
    return parseInt(a) + parseInt(b);
}, 0);


let totalSumLabel = $('<p />');
totalSumLabel.html('Обща сума: ' + totalSum + ' лв.');
let totalSumHolder = $('.checkout-left-basket');
totalSumLabel.prependTo(totalSumHolder);

//This script is for deleting product from cart
$('body').on('click', '.rem1 .close1', function(c) {
    var username = getUserName();
    var storageKey = 'cart-' + username;

    $(this).closest('tr').fadeOut('slow', function(c) {
        $(this).closest('tr').remove();
        let sumToBeRemoved = parseInt($(this).closest('tr').find('.dynamicPrice').html());
        totalSumLabel.html('Обща сума: ' + (totalSum -= sumToBeRemoved) + 'лв.');

        var idToRemove = $(this).closest('tr').find('.productName').attr('value');
        var arrItems = JSON.parse(localStorage.getItem(storageKey));
        var indexOfItem = arrItems.findIndex(obj => obj.id === idToRemove);

        if (indexOfItem !== -1) {
            arrItems.splice(indexOfItem, 1);
        }

        localStorage.setItem(storageKey, JSON.stringify(arrItems));
    });
});

totalSumLabel.html('Обща сума: ' + totalSum + ' лв.');

//This script is for quantity increasing
$('body').on('click', '.value-plus', function() {
    let valueField = $(this).parent().find('.value'),
        newValue = parseInt(valueField.text(), 10) + 1;
    valueField.text(newValue).addClass('quantities');

    let dynamicPriceField = $(this).parent().parent().parent().parent().find('.dynamicPrice');
    dynamicPriceField.text(parseInt(dynamicPriceField.attr('value')) * newValue + ' лв.');
    totalSum += (parseInt(dynamicPriceField.attr('value')));
    totalSumLabel.html('Обща сума: ' + totalSum + ' лв.');
});

//This script is for quantity decreasing
$('body').on('click', '.value-minus', function() {
    let valueField = $(this).parent().find('.value'),
        newValue = parseInt(valueField.text(), 10) - 1;
    if (newValue >= 1) {
        valueField.text(newValue).addClass('quantities');
        let dynamicPriceField = $(this).parent().parent().parent().parent().find('.dynamicPrice');
        let initialValue = $(this).parent().parent().parent().parent().find('.dynamicPrice').attr('value');
        dynamicPriceField.text(parseInt(dynamicPriceField.text()) - parseInt(initialValue) + ' лв.');
        totalSum -= (parseInt(dynamicPriceField.attr('value')));
        totalSumLabel.html('Обща сума: ' + totalSum + ' лв.');
    }
});


// Sliding cart
if (localStorage.length > 0 && localStorage[localStorageKey]) {

    let savedData =JSON.parse(localStorage[localStorageKey]);
    
    let savedDataLen = savedData.length;
    let slidingCartName = $('#slidingCartTitle');
    let slidingCartPrice = $('#slidingCartPrice');
    let slidingCartImgSrc = $('#slidingCartImg');

    for (let i = 0; i < savedDataLen; i += 1) {
        slidingCartName.html(savedData[i].name);
        slidingCartPrice.html(savedData[i].price + ' лв.');
        slidingCartImgSrc.attr('src', savedData[i].imgUrl).css('width', '100%');
    }
}

function getUserName() {
    // get only the username from cookie using RegEx
    var reg = /username=(\w+)\;?/g
    var matches = reg.exec(document.cookie);
    if (matches && matches.length) {
        return matches[1];
    }

    return '';
}

