/*globals $, hideLoading, showLoading, toastr */
(function() {

    var productsContainer = '.container.products-content';

    // on drop down change
    $('body').on('change', 'select.frm-field', function() {
        var data = getData();
        doAjax(data);
    });

    // on page click
    $('body').on('click', '.pagination.paging li a', function(e) {
        e.preventDefault();
        
        var $target = $(e.target);
        // Sometime the span element is clicked
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
    });

    function doAjax(dataQuery) {
        showLoading(productsContainer);

        $.ajax({
            method: 'GET',
            url: '/api/products/' + dataQuery.productType || '',
            data: dataQuery
        })
        .done(function(htmlResponse) {
            $(productsContainer).html(htmlResponse);
             $('.prodImg')
                .wrap('<span style="display:inline-block"></span>')
                .css('display', 'inline-block')
                .parent()
                .zoom({
                    touch: true
                });

             $('td img')
                .wrap('<div style="height:300px"></div>')
                .css('display', 'block')
                .parent()
                .zoom({
                    touch: true
            });
                
        })
        .fail(function(err) {
            toastr.error('An error occurred! Check console [F12]!');
            console.log(err);
        })
        .always(function() {
            hideLoading(productsContainer);
        });
    }

    function getData() {
        return {
            sortField: $('select[name=sortField]').val(),
            sortType: $('select[name=sortType]').val(),
            page: $('.pagination.paging li.active a').attr('data-page'),
            productType: $('#productType').val(),
        };
    }
})();