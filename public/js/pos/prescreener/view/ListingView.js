function ListingView() {
    var _this = this;
    var com = new common();

    _this.init = function () {
        initVAR();
        bindEvents();
        com.showView(Window.jsDetailData);
        if (Window.jsDetailData.virtualTouring?.url.toString().trim().length > 0) {
            $('input#virtualTouring').val(Window.jsDetailData.virtualTouring?.url || '');
        }

    };

    function initVAR() {
        $('input').attr('disabled', true).css('background-color', '#fff');
        $('select').attr('disabled', true).css('background-color', '#fff');
        $('textarea').attr('disabled', true).css('background-color', '#fff');

        var editor = CKEDITOR.replace('description', {height: 300});
        editor.on('change', function (e) {
            $('#' + 'description').val(e.editor.getData());
            $('#' + 'description').trigger('change');
        });
        var prices = ['price', 'minPrice', 'depositText', 'priceForStatusQuo'];
        $.each(prices, function (i, item) {
            $('#' + item).autoNumeric("init", {
                'mDec': 0
            });
        })
        $('#photos-wrapper .file-selector').remove();
        $('#photoGcns-wrapper .file-selector').remove();
        $('#photos-wrapper .delete-btn').remove();
        $('#photoGcns-wrapper .delete-btn').remove();
    }

    function bindEvents() {
        $('body').on('click', '#see-phones', function (e) {
            e.preventDefault();
            var phones = com.getFullPhones(Window.jsDetailData);
            var table = $('#table-phones-list');
            table.html('');
            $.each(phones, function (i, phone) {
                table.append('<tr><td>' + (i + 1) + '</td><td>' + phone.phoneSub + '</td><td>' + phone.noteForPhone + '</td></tr>')
            })
            $('#phone-list-view-modal').modal('show');
        })
        $('body').on("click", '#seeonmap', function () {
            var lat = $.trim($('#latitude').val());
            var lng = $.trim($('#longitude').val());
            var link = 'https://www.google.com/maps/?q=' + lat + ',' + lng;
            window.open(link);
            return false;
        });

    }

    function getAllPhones() {
        var phones = com.getFullPhones(Window.jsDetailData);
        return com.getPhonesStringArray(phones);
    }
}
