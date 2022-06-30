(function ($) {
    $.fn.numberPercent = function (options = null) {
        options = options || {};
        options.length = options.length || 2;
        return this.each(function () {
            const numberPercent = $(this);
                
            numberPercent.change(function(e) {
                if ($(this).val().includes(',')) {
                    $(this).val($(this).val().replace(',','.'));
                }
                let value = $(this).val() ? (parseFloat($(this).val())).toFixed(options.length) : '';

                if(value < 0.00) {
                    $(this).val('0');
                    return;
                }
                if(value > 100.00) {
                    $(this).val('100');
                    return;
                }
                if(value && Math.floor(value) === Math.ceil(value)) {
                    $(this).val(Math.floor(value).toString());
                    return;
                }
                $(this).val(value.toString());
            });
        });
    };
})(jQuery);
$('input.number-percent').numberPercent();