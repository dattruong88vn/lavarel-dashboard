(function ($) {
    $.fn.priceBox = function (options = null) {
        options = options || {};
        options.list = options.list || {};
        options.list.milion = options.list.milion || [
            {value: '0-5', text: '< 5 triệu'},
            {value: '5-10', text: '5 - 10 triệu'},
            {value: '10-15', text: '10 - 15 triệu'},
            {value: '15-20', text: '15 - 20 triệu'},
            {value: '20-25', text: '20 - 25 triệu'},
            {value: '25-30', text: '25 - 30 triệu'}
        ];
        options.list.bilion = options.list.bilion || [
            {value: '0-1', text: '< 1 tỷ'},
            {value: '1-2', text: '1 - 2 tỷ'},
            {value: '2-3', text: '2 - 3 tỷ'},
            {value: '3-4', text: '3 - 4 tỷ'},
            {value: '4-6', text: '4 - 6 tỷ'},
            {value: '6-8', text: '6 - 8 tỷ'},
            {value: '8-10', text: '8 - 10 tỷ'},
            {value: '10-20', text: '10 - 20 tỷ'}
        ];
        $('head').append(`<style type="text/css">
        .price-box{
            border: 1px solid #ccc;
            padding: 7px;
            display: block;
            cursor: pointer;
        }
        .disabled{
            color: #999;
            background: #efefef;
            cursor: auto;
        }
        ul.price-box-ul{
            margin: 0px;
            padding: 0px;
        }
        li.pop-price-select:hover{
            background: #efefef;
        }
        li.pop-price-select{
            list-style: none;
            display: block;
            padding: 7px;
            border-top: 1px solid #ccc;
            cursor: pointer;
            margin: 0px;
        }
        </style>`);

        return this.each(function () {
            const priceBox = {
                unit: 'tỷ',
                obj: null,
                priceFrom: null,
                priceTo: null,
                span: null,
                list: options.list.bilion,
                isError: true,

                updatePrice: function (ipf, ipt) {
                    var to = (parseFloat(ipt.val()).toFixed(2) * 100) / 100;
                    var from = (parseFloat(ipf.val()).toFixed(2) * 100) / 100;
                    if (to + '' == 'NaN') {
                        to = 0;
                    }
                    if (from + '' == 'NaN') {
                        from = 0;
                    }
                    priceBox.obj.val(from + '-' + to);
                    priceBox.updateFromTo();
                },
                updateFromTo: function () {
                    if ($('#' + priceBox.obj.attr('data-id-unit')).val() == priceBox.obj.attr('data-unit-none')) {
                        $('#' + priceBox.obj.attr('data-id-from')).val('');
                        $('#' + priceBox.obj.attr('data-id-to')).val('');
                        return;
                    }
                    var arr = priceBox.obj.val().split('-');
                    var from = '0';
                    if (arr[0] && arr[0].trim().length > 0 && arr[0] != 'NaN' && arr[0] != '0.00' && arr[0] != '0') {
                        from = parseFloat(arr[0]).toFixed(2) * 1000000;
                        if (priceBox.unit == 'tỷ') {
                            from = from * 1000;
                        }
                    }
                    var to = '';
                    if (arr[1] && arr[1].trim().length > 0 && arr[1] != 'NaN' && arr[1] != '0.00' && arr[1] != '0') {
                        to = parseFloat(arr[1]).toFixed(2) * 1000000;
                        if (priceBox.unit == 'tỷ') {
                            to = to * 1000;
                        }
                    }
                    $('#' + priceBox.obj.attr('data-id-from')).val(from);
                    $('#' + priceBox.obj.attr('data-id-to')).val(to);
                },
                renderList: function () {
                    var ul = $('<ul class="price-box-ul"></ul>');
                    priceBox.list.forEach(i => {
                        var li = $('<li class="pop-price-select" data-value="' + i.value + '">' + i.text + '</li>');
                        li.unbind('click').click(function (e) {
                            var val = $(this).attr('data-value');
                            priceBox.obj.val(val);
                            var arr = val.split('-');
                            $('#' + priceBox.obj.attr('id') + 'price-from').val(arr[0]);
                            $('#' + priceBox.obj.attr('id') + 'price-to').val(arr[1]);
                            priceBox.updateFromTo();
                            priceBox.span.popover('hide');
                        });
                        ul.append(li);
                    });
                    return ul;
                },
                renderContent: function () {
                    priceBox.span.removeClass('disabled');
                    if ($('#' + priceBox.obj.attr('data-id-unit')).val() == priceBox.obj.attr('data-unit-none')) {
                        priceBox.span.addClass('disabled');
                        return '';
                    }
                    var row = $('<div class="row"></div>');
                    var ipf = $('<input id="' + priceBox.obj.attr('id') + 'price-from" placeholder="' + priceBox.unit + '" style="width:70px; display: block" type="text"></input>');
                    var lb1 = $('<label >giá từ</label>');
                    var col1 = $('<div class="col-md-6"></div>');
                    var col2 = $('<div class="col-md-6"></div>');
                    var ipt = $('<input id="' + priceBox.obj.attr('id') + 'price-to"  placeholder="' + priceBox.unit + '"  style="width:70px; display: block" type="text"></input>');
                    var lb2 = $('<label>giá đến</label>');
                    var ok = $('<button type="button" class="btn btn-success">Ok</button>');
                    var row2 = $(`<div class="row mt-3" style="clear:both; margin-top:10px; margin-bottom: 10px;"></div>`);
                    ipf.unbind('change').change(function () {
                        priceBox.updatePrice(ipf, ipt);
                    }).keydown(function (e) {
                        var key = e.charCode || e.keyCode || 0;
                        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                        // home, end, period, and numpad decimal
                        return (
                            key == 8 ||
                            key == 9 ||
                            key == 13 ||
                            key == 46 ||
                            key == 110 ||
                            key == 190 ||
                            (key >= 35 && key <= 40) ||
                            (key >= 48 && key <= 57) ||
                            (key >= 96 && key <= 105));
                    });
                    ipt.unbind('change').change(function () {
                        priceBox.updatePrice(ipf, ipt);
                    }).keydown(function (e) {
                        var key = e.charCode || e.keyCode || 0;
                        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                        // home, end, period, and numpad decimal
                        return (
                            key == 8 ||
                            key == 9 ||
                            key == 13 ||
                            key == 46 ||
                            key == 110 ||
                            key == 190 ||
                            (key >= 35 && key <= 40) ||
                            (key >= 48 && key <= 57) ||
                            (key >= 96 && key <= 105));
                    });
                    ok.unbind('click').click(function () {
                        priceBox.span.popover('hide');
                    });

                    col1.append(lb1).append(ipf);
                    col2.append(lb2).append(ipt);
                    row.append(col1).append(col2).append($('<div style="clear:both"></div>'));
                    return $('<div></div>')
                        .append(row).append(row2.append('<div class="col-md-7"><div>').append($('<div class="col-md-5"></div>').append(ok)))
                        .append(priceBox.renderList());
                },
                updateUnitData: function () {
                    priceBox.unit = 'tỷ';
                    priceBox.list = options.list.bilion;
                    if ($('#' + priceBox.obj.attr('data-id-unit')).val() == priceBox.obj.attr('data-unit-milion')) {
                        priceBox.unit = 'triệu';
                        priceBox.list = options.list.milion;
                    }
                    priceBox.priceTo = $('#' + priceBox.obj.attr('id') + 'price-from');
                    priceBox.priceFrom = $('#' + priceBox.obj.attr('id') + 'price-to');
                },
                clear: function () {
                    priceBox.span.text('-- Vui Lòng Chọn --');
                    priceBox.obj.val('-');
                    priceBox.updateUnitData();
                    priceBox.span.removeClass('disabled').addClass('disabled');
                    priceBox.span.data('bs.popover').options.content = '';
                    priceBox.updateFromTo();
                },
                showText: function () {
                    var arr = priceBox.obj.val().split('-');
                    if (!arr[1] || arr[1] === '0' || arr[1] === '0.00' || arr[1].trim() === '') {
                        if (!arr[0] || arr[0] === '0' || arr[0] === '0.00' || arr[0].toString().trim() === '') {
                            priceBox.span.text('-- Vui Lòng Chọn --');
                            return;
                        }
                        priceBox.span.text('>= ' + arr[0].trim() + ' ' + priceBox.unit);
                        return;
                    }
                    if (parseFloat(arr[1]) < parseFloat(arr[0])) {
                        if (priceBox.isError) {
                            showPropzyAlert('Khoảng giá tìm kiếm chưa hợp lý, giá từ không được lớn hơn giá đến.');
                            priceBox.isError = false;
                        }
                        priceBox.span.text('-- Vui Lòng Chọn --');
                        return;
                    }
                    priceBox.span.text(priceBox.obj.val().trim() + ' ' + priceBox.unit);
                },
                updatePriceFromToPopover: function () {
                    var arr = priceBox.obj.val().split('-');
                    if (arr[0] && arr[0].trim().length > 0 && arr[0] != 'NaN' && arr[0] != '0.00' && arr[0] != '0') {
                        $('#' + priceBox.obj.attr('id') + 'price-from').val(arr[0]);
                    }
                    if (arr[1] && arr[1].trim().length > 0 && arr[1] != 'NaN' && arr[1] != '0.00' && arr[1] != '0') {
                        $('#' + priceBox.obj.attr('id') + 'price-to').val(arr[1]);
                    }
                },
                initPopover: function (obj) {
                    priceBox.obj = obj;
                    priceBox.span = $('#' + obj.attr('data-id-price-span'));
                    priceBox.updateUnitData();
                    priceBox.span.removeClass('disabled').addClass('disabled');
                    priceBox.span.popover({
                        html: true,
                        placement: 'bottom',
                        content: ''
                    }).on('hidden.bs.popover', function () {
                        priceBox.showText();
                    }).on('shown.bs.popover', function () {
                        priceBox.updatePriceFromToPopover();
                        priceBox.isError = true;
                    });
                    // hide popover when click outside
                    $('body').on('click', function (e) {
                        if (e.target.id != priceBox.span.attr('id') && $(e.target).parents('.popover').length === 0) {
                            priceBox.span.popover('hide');
                        }
                    }).on('change', '#' + priceBox.obj.attr('data-id-unit'), function (e) {
                        priceBox.span.text('-- Vui Lòng Chọn --');
                        priceBox.obj.val('-');
                        priceBox.updateUnitData();
                        priceBox.span.data('bs.popover').options.content = priceBox.renderContent();
                        priceBox.updateFromTo();
                        e.preventDefault();
                    });
                    if ($('#' + priceBox.obj.attr('data-id-unit')).val() != priceBox.obj.attr('data-unit-none')) {
                        priceBox.clear();
                        priceBox.span.data('bs.popover').options.content = priceBox.renderContent();
                        var initFrom = 0;
                        var initTo = '';
                        priceBox.unit = 'triệu';
                        if (priceBox.obj.attr('data-from') !== '') {
                            initFrom = parseFloat(priceBox.obj.attr('data-from').replace(/,/g, '')) / 1000000;
                        }
                        if (priceBox.obj.attr('data-to') !== '') {
                            initTo = parseFloat(priceBox.obj.attr('data-to').replace(/,/g, '')) / 1000000;
                        }
                        if ($('#' + priceBox.obj.attr('data-id-unit')).val() !== priceBox.obj.attr('data-unit-milion')) {
                            initFrom = initFrom / 1000;
                            initTo = initTo == '' ? '' : (initTo / 1000);
                            priceBox.unit = 'tỷ';
                        }
                        priceBox.obj.val(initFrom + '-' + initTo);
                        priceBox.updateFromTo();
                        priceBox.showText();
                    }
                }
            }
            priceBox.initPopover($(this));
        });
    };
})(jQuery);
$('input.price-box').priceBox();