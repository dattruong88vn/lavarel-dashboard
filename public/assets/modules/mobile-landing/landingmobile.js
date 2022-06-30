var startApp = function(){
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    $('.bxslider-mobile').bxSlider({
        controls: false,
        auto: true,
        autoStart: true,
        pause: 5000
    });
    $("#sort").change(function () {
        var value = parseInt($(this).val());
        if (value > 0) {
            window.location.search = $.query.set("sapxep", value);
        } else {
            $.query.remove("sapxep");
        }
    });
    $('.group-select select.form-control').select2({
        minimumResultsForSearch: Infinity
    });
    //App.Feature.setCookie("optionSearch", JSON.stringify(optionSearch));
    //search_bar();

}