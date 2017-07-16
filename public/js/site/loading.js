function showLoading(selector) {
    /*The parent (.add_wrapper) should have relative position.*/
    $(selector).css('position', 'relative');
    $(selector).prepend($('<div>').addClass('loading-img'))
/* From JS - $('.add_wrapper').prepend($('<div>').addClass('loading-img'))*/
}

function hideLoading(selector) {
    $(selector).find('.loading-img').remove();
}