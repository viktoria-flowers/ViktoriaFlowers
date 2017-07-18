$('.addToCart').on('click', () => {
    // var saveData = JSON.parse(localStorage.saveData || null) || {};
    // // Store your data.
    // function saveStuff() {
    //     saveData.itemName = $('#b').html();
    //     saveData.itemPrice = $('#c > label').html();
    //     localStorage.saveData = JSON.stringify(saveData);
    // }

    // if (saveData){
    //     alert("success");
    // }

     var test = localStorage.getItem("test");
     var obj = [];
     if(test){
         obj= JSON.parse(test);  
     }
     obj.push({"name":  $('#b').html(), "price": $('#c > label').html()});
     localStorage.setItem("test", JSON.stringify(obj));

    // var a = localStorage.setItem('name', $('#b').html());
    // var b = localStorage.setItem('price', $('#c > label').html());

    // saveStuff('Saved');
});





