<div id="modalConfigNewListings" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 style="text-align: center;" class="modal-title">Điều chỉnh tiêu chí</h4>
            </div>
            <div class="modal-body">
                <form class="formConfig">
                    <input type="hidden" class="leadId" value=""/>
                    <input type="hidden" class="configsCount" value=""/>
                    <div class="configs">

                    </div>
                    <div class="errors"></div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btnSave"><span class="glyphicon glyphicon-ok"
                                                                            aria-hidden="true"></span> Lưu
                </button>
            </div>
        </div>
    </div>
</div>

<script type="text/template" class="config-new-listings-template">
    <div class='row config-{id}'>
        <div class="col-md-12">
            <p style="padding: 3px 0px;background-color:#367fa9;text-align:center;margin:10px 0px 3px 0px;color:white;font-weight:bold;">
                {name}</p>
            <div>{html}</div>
        </div>
    </div>
</script>
<script>
    var ConfigNewListings = (function () {
        var modalConfig = null;
        var leadId = null;

        var showModal = function (leadId) {
            modalConfig = $("#modalConfigNewListings");
            var configTemplate = $(".config-new-listings-template").html();
            showPropzyLoading();
            var url = "/new-listing-match-lead/get-config-data";
            if (leadId) {
                url += "?leadId=" + leadId;
                modalConfig.find(".leadId").val(leadId);
            } else {
                modalConfig.find(".leadId").val("");
            }
            $.ajax({
                "url": url,
                "type": "get"
            }).done(function (response) {
                var htmlConfig = "";
                if (response.result) {
                    for (var i = 0; i < response.data.length; i++) {
                        var disiable = '';
                        var item = response.data[i];
                        if (item.isPrimary) {
                            disiable = 'disabled checked="checked"';
                        }else{
                            disiable = 'checked="checked"';
                        }
                        var valueInput = item.maxValue == null ? "" : item.maxValue;
                        var disiableWhenMaxValue = valueInput == 8 || item.isPrimary ? 'disabled' : '';
                        if (item.subCongif.length == 0) {
                            var html = '<div class="row item-type" data-item-type="'+item.typeId+'" ><div class="col-md-7">' +
                                '<input '+disiableWhenMaxValue+' value="' + valueInput +
                                '" style="border:0;outline:0;background:transparent;border-bottom:1px solid #d2d6de;" class="config-value form-control config-value-' + item.typeId +
                                '" placeholder="Nhập Điểm Cho ' + item.name + '" data-type-id="' + item.typeId +'"/></div><div class="col-md-5"><div class="checkbox"><label><input ' + disiable +
                                ' type="checkbox"  value="">Chọn làm tiêu chí tính điểm</label></div></div></div>';
                        } else {
                            var radio = '';
                            $.each(item.subCongif, function (k, v) {
                                var checked = "";
                                if (v.isUse) {
                                    checked = "checked";
                                }
                                radio += '<div style="display:inline-block;margin-right:40px" class="radio"><label><input json="'+JSON.stringify(v).replace(new RegExp('"', 'g'), "'")+'" value="' + v.maxValue +
                                    '" maxValue="' + v.maxValue + '" typeId="' + v.typeId + '" ' + checked + ' type="radio" name="' + item.name +
                                    '"  value="' + v.valueInputText + '" data-item-type="'+item.typeId+'"> ' + v.name + '</label></div>';
                                if (v.typeId == 13) {
                                    radio += '<input placeholder="m" json="'+JSON.stringify(v).replace(new RegExp('"', 'g'), "'")+'" value="' + ((v.valueInputText == null) ? 0 : v.valueInputText) + '" disabled type="text" class="form-control"/>';
                                }
                            })
                            if(item.typeId==10){
                                html = '<div class="row item-type" data-item-type="'+item.typeId+'"><div class="col-md-7">' +
                                    '<input id="input-max-'+item.typeId+'" '+disiableWhenMaxValue+' value="' + valueInput +
                                    '" style="border:0;outline:0;background:transparent;border-bottom:1px solid #d2d6de;" class="config-value form-control config-value-' + item.typeId +
                                    '" placeholder="Nhập Điểm Cho ' + item.name + '" data-type-id="' + item.typeId +'"/></div><div class="col-md-5"><div class="checkbox"><label><input ' + disiable +
                                    ' type="checkbox"  value="">Chọn làm tiêu chí tính điểm</label></div></div></div>'+radio;
                            }
                        }

                        var tpl = configTemplate;
                        tpl = tpl.replace(/{disiable}/g, disiable);
                        tpl = tpl.replace(/{id}/g, item.typeId);
                        tpl = tpl.replace(/{name}/g, item.name);
                        tpl = tpl.replace(/{html}/g, html);
                        tpl = tpl.replace(/{value}/g, item.value ? item.value : "");
                        htmlConfig += tpl;
                    }
                    modalConfig.find(".configsCount").val(response.data.length);
                    modalConfig.find(".lbConfigsCount").html(response.data.length);
                }
                modalConfig.find(".configs").html(htmlConfig);
                loadEventFormConfig();
            }).always(function () {
                hidePropzyLoading();
            });
            modalConfig.modal();
            setUpButtonSave();
        };

        function loadEventFormConfig() {
            $('#modalConfigNewListings input[type=radio]').each(function () {
                if ($(this).is(':checked')) {
                    $(this).parents('div:first').next('input').removeAttr('disabled');
                }
            })

            $('#modalConfigNewListings input[type=radio]').on('change', function () {
                $('#modalConfigNewListings input[type=radio]').each(function () {
                    if ($(this).is(':checked')) {
                        $(this).parents('div:first').next('input').removeAttr('disabled');
                    } else {
                        $(this).parents('div:first').next('input').attr('disabled', 'disabled');
                    }
                })
            })

            $('#modalConfigNewListings input[type=checkbox]').on('change', function () {
                if (!$(this).is(':checked') && !$(this).prop('disabled')) {
                    $(this).parents('.col-md-5').siblings().find('input').val('');
                    $(this).parents('.col-md-5').siblings().find('input').prop('disabled',true);
                }else{
                    $(this).parents('.col-md-5').siblings().find('input').prop('disabled',false);
                }
            })
        };

        var setUpButtonSave = function () {
            var btnSave = modalConfig.find(".btnSave");
            var lbErrors = modalConfig.find(".errors");
            btnSave.unbind("click");
            btnSave.on("click", function (event) {
                event.preventDefault();
                lbErrors.html("");
                var postData = {
                    "leadId": modalConfig.find(".leadId").val(),
                    "values": []
                }
                var configsCount = modalConfig.find(".configsCount").val();
                var totalScore = 0;
                var targetScore = 0;
                for (var i = 1; i <= configsCount; i++) {
                    targetScore += i;
                }
                var isValidate = true;
                var validateDublicate = [];
                var arrValidatePoint = [3,4,5];
                $(".config-value").each(function () {
                    var value = $(this).val();
                    if(jQuery.inArray( parseInt(value), arrValidatePoint ) == -1 && !$(this).prop('disabled') && $(this).parent('.col-md-7').siblings().find('input').is(":checked")){
                        lbErrors.html("Tiêu chí tính điểm phải là số nguyên từ 3 đến 5");
                        isValidate = false;
                        return false;
                    }
                    validateDublicate.push(parseInt(value));
                    var typeId = $(this).attr("data-type-id");
                    value = value ? parseInt(value) : 0;
                    totalScore += value;
                    var item = null;
                    item = {
                        "typeId": typeId,
                        "maxValue": value,
                        "isUse": $(this).parent('.col-md-7').siblings().find('input').is(":checked") ? true : false,
                        "valueInputText": null
                    };
                    postData.values.push(item);
                });

                $('#modalConfigNewListings input[type=radio]').each(function (k, v) {
                    if ($(this).is(':checked')) {
                        if($(this).parents('div').next('input').length > 0){
                            console.log('got it');
                            item = {
                                "valueInputText": $(this).parents('div').next('input').val(),
                                "typeId": $(this).attr('typeId'),
                                "isUse": true,
                                // "maxValue": $(this).attr('maxValue')
                                "maxValue": $('.config-value-'+$(this).data('item-type')).val() == "" ? 0 : $('.config-value-'+$(this).data('item-type')).val()
                            };
                        }else{
                            item = {
                                "valueInputText": $(this).val(),
                                "typeId": $(this).attr('typeId'),
                                "isUse": true,
                                "maxValue": $('.config-value-'+$(this).data('item-type')).val() == "" ? 0 : $('.config-value-'+$(this).data('item-type')).val()
                            };
                        }
                        postData.values.push(item);
                    }else{
                        var json = JSON.parse($(this).attr('json').replace(new RegExp("'", 'g'), '"'));
                        json.isUse=false;
                        json.maxValue = $('.config-value-'+$(this).data('item-type')).val() == "" ? 0 : $('.config-value-'+$(this).data('item-type')).val();
                        postData.values.push(json);
                    }
                });

                if (!isValidate) {
                    return false;
                }
                modalConfig.modal("hide");
                showPropzyLoading();
                $.ajax({
                    "url": "/new-listing-match-lead/save-config",
                    "type": "POST",
                    "data": JSON.stringify(postData)
                }).done(function (response) {
                    showPropzyAlert(response.message);
                }).always(function () {
                    hidePropzyLoading();
                });
            });
        };
        function generateStaffValue(typeId, value) {
            return {
                "id": {
                    "typeId": typeId
                }, "value": value
            }
        }
        function generateManagerValue(typeId, value) {
            return {
                "typeId": typeId,
                "value": value
            };
        }
        return {
            "showModal": showModal
        };
    })();
</script>