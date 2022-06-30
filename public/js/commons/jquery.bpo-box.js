(function($) {
    $.fn.bpoBox = function(options = null) {
        options = options || [
            {value: '-', text: 'Tất cả'},
            {value: 'N/A', text: 'Không có điểm BPO'},
            {value: '1-3', text: '1 - 3 điểm'},
            {value: '3-4', text: '3 - 4 điểm'},
            {value: '4-5', text: '4 - 5 điểm'}
        ];

        $('head').append(`<style type="text/css">
            .bpo-box{
                border: 1px solid #ccc;
                padding: 7px;
                display: block;
                cursor: pointer;
            }
            ul.bpo-box-ul{
                margin: 0px;
                padding: 0px;
            }
            li.pop-bpo-select:hover{
                background: #efefef;
            }
            li.pop-bpo-select{
                list-style: none;
                display: block;
                padding: 7px;
                border-top: 1px solid #ccc;
                cursor: pointer;
                margin: 0px;
            }
        </style>`);

        return this.each(function () {
            const bpoBox = {
                unit: 'điểm',
                obj: null,
                bpoFrom: null,
                bpoTo: null,
                span: null,
                list: options,
                isError: true,
                updateFromTo: function () {
                    var arr = bpoBox.obj.val().split('-');
                    $('#' + bpoBox.obj.attr('data-id-from')).val(arr[0]);
                    $('#' + bpoBox.obj.attr('data-id-to')).val(arr[1]);
                },
                renderList: function () {
                    var ul = $('<ul class="bpo-box-ul"></ul>');
                    bpoBox.list.forEach(i => {
                        var li = $('<li class="pop-bpo-select" data-value="' + i.value + '">' + i.text + '</li>');
                        li.unbind('click').click(function (e) {
                            var val = $(this).attr('data-value');
                            bpoBox.obj.val(val);
                            if(val !== 'N/A') {
                                var arr = val.split('-');
                                $('#' + bpoBox.obj.attr('id') + 'bpo-from').val(arr[0]);
                                $('#' + bpoBox.obj.attr('id') + 'bpo-to').val(arr[1]);
                                bpoBox.updateFromTo();
                            }
                            bpoBox.span.popover('hide');
                        });
                        ul.append(li);
                    });
                    return ul;
                },
                renderContent: function () {
                    var row = $('<div class="row"></div>');
                    var bpoFrom = $('<input id="' + bpoBox.obj.attr('id') + 'bpo-from" placeholder="' + bpoBox.unit + '" style="width:70px; display: block" type="text"></input>');
                    var lb1 = $('<label >điểm từ</label>');
                    var col1 = $('<div class="col-md-6"></div>');
                    var col2 = $('<div class="col-md-6"></div>');
                    var bpoTo = $('<input id="' + bpoBox.obj.attr('id') + 'bpo-to"  placeholder="' + bpoBox.unit + '"  style="width:70px; display: block" type="text"></input>');
                    var lb2 = $('<label>điểm đến</label>');
                    var ok = $('<button type="button" class="btn btn-success">Ok</button>');
                    var row2 = $(`<div class="row mt-3" style="clear:both; margin-top:10px; margin-bottom: 10px;"></div>`);
                    bpoFrom.on('change', function(e) {
                        bpoBox.obj.val(bpoFrom.val() + '-' + bpoTo.val());
                        bpoBox.updateFromTo();
                    }).on('keyup', function(e) {
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
                    bpoTo.on('change', function() {
                        bpoBox.obj.val(bpoFrom.val() + '-' + bpoTo.val());
                        bpoBox.updateFromTo();
                    }).on('keyup', function(e) {
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
                    ok.on('click', function() {
                        bpoBox.span.popover('hide');
                    });
                    col1.append(lb1).append(bpoFrom);
                    col2.append(lb2).append(bpoTo);
                    row.append(col1).append(col2).append($('<div style="clear:both"></div>'));
                    return $('<div></div>')
                        .append(row).append(row2.append('<div class="col-md-7"><div>').append($('<div class="col-md-5"></div>').append(ok)))
                        .append(bpoBox.renderList());
                },
                clear: function () {
                    bpoBox.span.text('Lọc theo điểm BPO');
                    bpoBox.obj.val('');
                    bpoBox.span.data('bs.popover').options.content = '';
                    bpoBox.updateFromTo();
                },
                showText: function () {
                    const regex = new RegExp(/^(?:5(?:\.0)?|[1-5](?:\.[0-9])?)$/);
                    const value = bpoBox.obj.val();
                    if(!value.includes('-')) {
                        if(value === 'N/A') {
                            bpoBox.span.text('Không có điểm BPO');
                            return;
                        }
                        bpoBox.span.text('Lọc theo điểm BPO');
                        return;
                    }
                    var arr = bpoBox.obj.val().split('-');
                    if(arr[0] === '' && arr[1] === '') {
                        bpoBox.span.text('Tất cả');
                        return;
                    }
                    if(arr[0] === '' && arr[1].match(regex)) {
                        bpoBox.span.text('<= ' + arr[1] + ' ' + bpoBox.unit);
                        return;
                    }
                    if(arr[1] === '' && arr[0].match(regex)) {
                        bpoBox.span.text('>= ' + arr[0] + ' ' + bpoBox.unit);
                        return;
                    }
                    if(!arr[0].match(regex) || !arr[1].match(regex)) {
                        if (bpoBox.isError) {
                            showPropzyAlert('Kí tự tìm kiếm chưa hợp lý, điểm từ điểm đến chỉ chứa số nguyên từ 1 tới 5');
                            bpoBox.isError = false;
                        }
                        bpoBox.obj.val('');
                        bpoBox.span.text('Lọc theo điểm BPO');
                        return;
                    }
                    if (parseFloat(arr[1]) < parseFloat(arr[0])) {
                        if (bpoBox.isError) {
                            showPropzyAlert('Khoảng điểm tìm kiếm chưa hợp lý, điểm từ không được lớn hơn điểm đến.');
                            bpoBox.isError = false;
                        }
                        bpoBox.obj.val('');
                        bpoBox.span.text('Lọc theo điểm BPO');
                        return;
                    }
                    bpoBox.span.text(bpoBox.obj.val().trim() + ' ' + bpoBox.unit);
                },
                updatePointFromToPopover: function () {
                    var arr = bpoBox.obj.val().split('-');
                    if(bpoBox.obj.val() === 'N/A') {
                        $('#' + bpoBox.obj.attr('id') + 'bpo-from').val('');
                        $('#' + bpoBox.obj.attr('id') + 'bpo-to').val('');
                        return;
                    }
                    $('#' + bpoBox.obj.attr('id') + 'bpo-from').val(arr[0]);
                    $('#' + bpoBox.obj.attr('id') + 'bpo-to').val(arr[1]);
                },
                initPopover: function (obj) {
                    bpoBox.obj = obj;
                    bpoBox.span = $('#' + obj.attr('data-id-bpo-span'));
                    bpoBox.span.popover({
                        html: true,
                        placement: 'bottom',
                        content: ''
                    }).on('hidden.bs.popover', function () {
                        bpoBox.showText();
                    }).on('shown.bs.popover', function () {
                        bpoBox.updatePointFromToPopover();
                        bpoBox.isError = true;
                    });
                    // hide popover when click outside
                    $('body').on('click', function (e) {
                        if (e.target.id != bpoBox.span.attr('id') && $(e.target).parents('.popover').length === 0) {
                            bpoBox.span.popover('hide');
                        }
                    });
                    bpoBox.clear();
                    bpoBox.span.data('bs.popover').options.content = bpoBox.renderContent();
                    bpoBox.obj.val('');
                    bpoBox.updateFromTo();
                    bpoBox.showText();
                }
            }
            bpoBox.initPopover($(this));
        });
    };
})(jQuery);
$('input.bpo-box').bpoBox();
