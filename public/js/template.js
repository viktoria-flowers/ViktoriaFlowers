$(document).ready(function () {
    /*
    var defaults = {
    containerID: 'toTop', // fading element id
    containerHoverID: 'toTopHover', // fading element hover id
    scrollSpeed: 1200,
    easingType: 'linear'
    };
    */
    $().UItoTop({ easingType: 'easeOutQuart' });
});

// Mini Cart
paypal.minicart.render({
    action: '#'
});
if (~window.location.search.indexOf('reset=true')) {
    paypal.minicart.reset();
}

jQuery(document).ready(function () {
    jQuery('#demo1').skdslider({ 'delay': 2000, 'animationSpeed': 1000, 'showNextPrev': true, 'showPlayButton': true, 'autoSlide': true, 'animationType': 'fading' });
    jQuery('#responsive').change(function () {
        $('#responsive_wrapper').width(jQuery(this).val());
    });
});


