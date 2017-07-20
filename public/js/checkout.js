$('.addToCart').on('click', () => {

     var test = localStorage.getItem("test");
     var obj = [];

     if(test){
         obj= JSON.parse(test);  
     }

     obj.push({"name":  $('#prodName').html(), "price": $('#prodPrice').html(), "imgUrl": $('#prodImg').attr('src')});
     localStorage.setItem("test", JSON.stringify(obj));
});

let savedData = JSON.parse(localStorage.test),
    savedDataLen = savedData.length;

for(let i = 0; i < savedDataLen; i += 1){

    let mainRow = $('<tr />').addClass('rem1');
        let firstCell = $('<td />').addClass('invert-image');
            let firstCellAnchor = $('<a />').attr('href', '/');
            let firstCellImg = $('<img />').addClass('img-responsive').attr('src', savedData[i].imgUrl);

            firstCellImg.appendTo(firstCellAnchor);
            firstCellAnchor.appendTo(firstCell);
            firstCell.appendTo(mainRow);

        let secondCell = $('<td />').addClass('invert').html(savedData[i].name);
        secondCell.appendTo(mainRow);

        let thirdCell = $('<td />').addClass('invert');    
            let thirdCellFirstDiv = $('<div />').addClass('quantity');
                let firstInnerDiv = $('<div />').addClass('quantity-select');
                let secondInnerDiv = $('<div />').addClass('entry value-minus');
                let thirdInnerDiv = $('<div />').addClass('entry value');
                    let thirdInnerDivSpan = $('<span />').html(1);           
                let fourthInnerDiv = $('<div />').addClass('entry value-plus active');
        
        fourthInnerDiv.appendTo(thirdCellFirstDiv);
        thirdInnerDivSpan.appendTo(thirdInnerDiv);
        thirdInnerDiv.appendTo(thirdCellFirstDiv);
        secondInnerDiv.appendTo(thirdCellFirstDiv);
        firstInnerDiv.appendTo(thirdCellFirstDiv);
        thirdCellFirstDiv.appendTo(thirdCell);
        thirdCell.appendTo(mainRow);

        let fourthCell = $('<td />').addClass('invert');     
            let fourthCellLabel = $('<label />').html(savedData[i].price + 'лв.');
        
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
    
    //This script is for deleting product from cart
    fifthCell.on('click', $(this), function(c){
        mainRow.fadeOut('slow', function(c){
        mainRow.remove();
        });
    });

    //This script is for quantity increasing and decreasing
    fourthInnerDiv.on('click', function(){
        var divUpd = $(this).parent().find('.value');
            newVal = parseInt(divUpd.text(), 10)+1;
        divUpd.text(newVal);
    });
    secondInnerDiv.on('click', function(){
        var divUpd = $(this).parent().find('.value');
            newVal = parseInt(divUpd.text(), 10)-1;
        if(newVal >= 1) {
            divUpd.text(newVal)
        };
    });
}

