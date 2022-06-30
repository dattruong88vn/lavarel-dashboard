
let REQ_CREATE = {
    listingTypeId: 'listingTypeId',
    purposes: [],
    init: () => {
        REQ_CREATE.loadPurpose();
        $('body').on('change', '#' + REQ_CREATE.listingTypeId, function (e) {
            REQ_CREATE.reset();
            e.preventDefault();
        });

    },
    reset: () => {
        $('#div-purpose').html('');
        $('#txtPurposeList').val('');
        REQ_CREATE.loadPurpose();
    },
    updatePurposeList: (id = '') => {
        $('#div-purpose input[type=radio]:checked').each(function () {
            var obj = $(this);
            var arrIds = [];
            arrIds.push(obj.val());
            $('#div-purpose-id-' + obj.val() + ' input[type=checkbox]:checked, #div-purpose-id-' + obj.val() + ' input[type=checkbox]:checked').each(function () {
                var item = $(this);
                arrIds.push(item.val());
                $('#modal-purpose-id-' + item.val() + ' select, #modal-purpose-id-' + item.val() + ' input[type=checkbox]:checked, #modal-purpose-id-' + item.val() + ' input[type=radio]:checked').each(function () {
                    var item2 = $(this);
                    arrIds.push(item2.val());
                });
            });
            $('#txtPurposeList').val(arrIds.join(';'));
            console.log(arrIds);
        });
    },
    initPurposeIds: () => {
        var div = $('#div-purpose');
        var arr = [];
        if (div.attr('data-ids')) {
            arr = div.attr('data-ids').split(';');
        }
        if (arr.length === 0) {
            return;
        }
        arr.forEach(i => {
            //$('#div-purpose input[type=radio][value=' + i + ']').prop('checked', true);
            $('div#div-purpose input#purpose-id-' + i).prop('checked', true);
            $('div#div-purpose select#purpose-id-' + i).val(i + '');
            $('div.modal-purpose-lv4 input#purpose-id-' + i).prop('checked', true);
            $('div.modal-purpose-lv4 select option[value='+i+']').attr('selected','selected');
            $('div#div-purpose-id-' + i).removeClass('hidden');
        });
        $('#txtPurposeList').val(arr.join(';'));
    },
    loadPurpose: () => {
        $.ajax({
            url: '/request/get-purposes',
            method: 'POST',
            data: {
                listingTypeId: $('#' + REQ_CREATE.listingTypeId).val()
            },
            success: (data) => {
                let purposes = data.data.childs;
                purposes.map(i => {
                    let rad = $('<input type="' + i.control + '" id="purpose-id-' + i.id + '" name="purpose-group" value="' + i.id + '"/>');
                    let label = $('<label for="purpose-id-' + i.id + '" style="padding-left: 10px">' + i.title + '</label>');
                    let div = $('<div class="col-md-3"></div>');
                    $('#div-purpose').append(div.append(rad).append(label));

                    rad.unbind('click').click(function () {
                        var obj = $(this);
                        if (obj.is(':checked')) {
                            $('div.purpose-level2').removeClass('hidden').addClass('hidden');
                            $('div#div-purpose-id-' + $(this).val()).removeClass('hidden');
                            $('div.purpose-level2').each(function () {
                                if ($(this).attr('data-id') !== obj.val()) {
                                    $(this).find('input[type=checkbox]').prop('checked', false);
                                }
                            });
                            $('div.modal-purpose-lv4').each(function () {
                                if ($(this).attr('data-id') !== obj.val()) {
                                    $(this).find('input[type=checkbox]').prop('checked', false);
                                    $(this).find('select').val('');
                                }
                            });
                            REQ_CREATE.updatePurposeList();
                            return;
                        }
                        $('div.purpose-level2').removeClass('hidden').addClass('hidden');
                    });

                    let div2 = $('<div class="hidden purpose-level2" id="div-purpose-id-' + i.id + '" data-id="' + i.id + '"></div>');
                    i.childs.map(lv2 => {
                        let chk = $('<input class="form-check-input" type="' + lv2.control + '" id="purpose-id-' + lv2.id + '" name="purpose-group-lv2" value="' + lv2.id + '"/>');
                        let lbl = $('<label for="purpose-id-' + lv2.id + '" style="padding-left: 10px">' + lv2.title + '</label>');
                        let ddiv = $('<div class=""></div>');
                        div2.append(ddiv.append(chk).append(lbl));
                        if (lv2.childs.length > 0) {
                            let eye = $('<i class="fa fa-eye" data-id="' + lv2.id + '" style="padding-left: 10px; cursor: pointer"></i>');
                            ddiv.append(eye);
                            eye.unbind('click').click(function () {
                                var obj = $(this);
                                $('div#modal-purpose-id-' + obj.attr('data-id')).modal('show');
                            });
                            chk.unbind('click').click(function () {
                                var obj = $(this);
                                if (obj.is(':checked')) {
                                    $('div#modal-purpose-id-' + obj.val()).modal('show');
                                }
                                REQ_CREATE.updatePurposeList();
                            });

                            let modal = $('<div class="modal modal-purpose-lv4" tabindex="-1" data-id="' + i.id + '" id="modal-purpose-id-' + lv2.id + '" role="dialog"></div>');
                            let mcontainer = $('<div class="modal-dialog" role="document"></div>');
                            let mcontent = $('<div class="modal-content" style="min-width: 850px"></div>');
                            mcontent.append(`<div class="modal-header">
                                                <h3 class="modal-title">${lv2.title}</h3>
                                            </div>`);
                            let mbody = $('<div class="modal-body"></div>');
                            lv2.childs.map(lv3 => {
                                let ddline = $('<div style="border-bottom: 1px solid #ccc;padding: 10px 0px;"></div>');
                                ddline.append('<div class="col-md-3">' + lv3.title + '</div>');
                                lv3.childs.map(lv4 => {
                                    let ddddiv = $('<div class="col-md-3"></div>');
                                    if (lv4.control === 'select') {
                                        let select = $('<select class="form-control" id="select-purpose-id-' + lv4.id + '"></select>');
                                        select.append('<option value="">--' + lv4.title + '--</option>');
                                        lv4.childs.map(lv5 => {
                                            select.append('<option value="' + lv5.id + '">' + lv5.title + '</option>');
                                        });
                                        ddline.append(ddddiv.append(select));
                                        select.unbind('change').change(function () {
                                            var sl = $(this);
                                            REQ_CREATE.updatePurposeList();
                                        });
                                        return;
                                    }
                                    let input = $('<input type="' + lv4.control + '" id="purpose-id-' + lv4.id + '" value="' + lv4.id + '"/>');
                                    let lllbl = $('<label for="purpose-id-' + lv4.id + '" style="padding-left: 10px">' + lv4.title + '</label>');
                                    input.unbind('click').click(function () {
                                        REQ_CREATE.updatePurposeList();
                                    });
                                    ddline.append(ddddiv.append(input).append(lllbl));
                                });
                                mbody.append(ddline.append('<div style="clear:both"></div>'));
                            });
                            mcontent.append(mbody);
                            mcontent.append(`<div class="modal-footer">
                                                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
                                            </div>`);
                            modal.append(mcontainer.append(mcontent));
                            $('body').append(modal);
                            return;
                        }
                        chk.unbind('click').click(function () {
                            REQ_CREATE.updatePurposeList();
                        });
                    });
                    div.append(div2);
                });
                $('#div-purpose').append('<div style="clear:both"></div>');

                REQ_CREATE.initPurposeIds();
            }
        });
    }
}
$(function () {
    REQ_CREATE.init();
});