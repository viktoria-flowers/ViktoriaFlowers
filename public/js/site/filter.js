/*globals hideLoading, showLoading */
(function() {

    // on drop down change
    $('body').on('change', 'select.frm-field', function() {
        var data = getData();
        doAjax(data);
    });

    // on page click
    $('body').on('click', '.pagination.paging li a', function(e) {
        e.preventDefault();

        
        var $target = $(e.target);
        // Sometime  the span elemet is clicked
        if (!$target.is('a')) {
            $target = $target.closest('a');
        }

        // if clicked on active
        if ($target.closest('li').is('.active')) {
            return;
        }

        var data = getData();
        var currentPage = $target.attr('data-page');
        if (data.page === currentPage) {
            return;
        }

        data.page = currentPage;
        doAjax(data);
    })

    function doAjax(dataQuery) {
        showLoading('.products .container');

        $.ajax({
            method: 'GET',
            url: '/api/products/' + dataQuery.prodyctType || '',
            data: dataQuery
        })
        .done(function(htmlResponse) {
            $('.products .container .products-content').html(htmlResponse);
        })
        .fail(function(err) {
            alert('An error occurred! Check console [F12]!');
            console.log(err);
        })
        .always(function() {
            hideLoading('.products .container');
        });
    }


    function getData() {
        return {
            sortField: $('select[name=sortField]').val(),
            sortType: $('select[name=sortType]').val(),
            page: $('.pagination.paging li.active a').attr('data-page'),
            prodyctType: $('#prodyctType').val(),
        };

    };

})()