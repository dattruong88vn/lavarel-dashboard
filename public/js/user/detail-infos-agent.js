var dateTimeRender = function (data, type, object) {
    if (!data)
        return "";
    return $.format.date(new Date(data), "dd/MM/yyyy");
};

var renderLink = function (data, type, object) {
    return "<a href='/deal/detail/" + object.dealId + "'>" + data + "</a>";
};

function generateListUrlPosted(type, agentId, status){
    var baseUrl = "/user/get-list-deal-agent-posted/" + agentId;
    var params = "";
    if(type){
        params += "type="+type;
    }
    if(status){
        params += "&status="+status;
    }
    return baseUrl + "?" + params;
}
var showDataPosted = function (type, agentId, status) {
    $("#data-detail-posted").DataTable().ajax.url(generateListUrlPosted(type, agentId, status)).load();
    return false;
};

function generateListUrl(agentId, statusId, progressQuoIDs){
    var baseUrl = "/user/get-list-deal-agent/" + agentId + '/' + statusId;
    var params = "";
    if(progressQuoIDs){
        params += "progressQuoIDs="+progressQuoIDs;
    }
    return baseUrl + "?" + params;
}
var showData = function (agentId, statusId, progressQuoIDs) {
    $("#data-detail-transaction").DataTable().ajax.url(generateListUrl(agentId, statusId, progressQuoIDs)).load();
    return false;
};

$(document).ready(function(){
    $("#startDate, #lastActivityDate").datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        minDate: 0
    });
    
    var agentId = $('#agentId').val();
    
    $('#status-agent').on('change',function(){
        var status = $('#status-agent').val();
        var dataSend = {};
        dataSend['agentId'] = agentId;
        dataSend['statusId'] = status;
        
        //console.log(dataSend);
        
        showPropzyLoading();
        $.ajax({
            url: "/user/do-update-status-agent",
            data: JSON.stringify(dataSend),
            type: "post"
        }).done(function (response) {
            //console.log(response);
            if (response.result) {
                showPropzyAlert(response.message);
                $('#alertModal').on('hide.bs.modal',function () {
                    window.location.reload();
                });
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
    
    var getList = function(limit = 10){
        var tableList = $("#data-detail-transaction").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/user/get-list-deal-agent/"+agentId+"/-1?limit="+limit,
            "scrollX": false,
            "lengthChange": true,
            "autoWidth": false,
            "lengthMenu": [[10, 25, 50], [10 + ' records', 25 + ' records', 50 + ' records']],
            "pagingType": "full_numbers",
            "iDisplayLength": limit,
            "drawCallback": function (oSettings) {
                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                pagination.toggle(this.api().page.info().pages > 1);
            },
            "columns": [
                {data: 'dealId', orderable: false},
                {data: 'customerName', render: renderLink, orderable: false},
                {data: 'statusName'},
                {data: 'progressName'},
                {data: 'tmName'},
                {data: 'createdDate', render: dateTimeRender, orderable: false}
            ],
            "order": [[2, 'desc']],
            "language":
                {
                    "search" : "Tìm kiếm",
                    "paginate" : {
                        previous: "<",
                        next: ">",
                        first: "|<",
                        last: ">|"
                    },
                    "lengthMenu": "Hiển thị _MENU_ trên 1 trang",
                    "searchPlaceholder": "ID, Tên KH",
                    "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                    "emptyTable": "Chưa có dữ liệu",
                    "infoEmpty": ""
                },
            "createdRow": function (row, data, index) {
                //console.log(data);
                if (!data.isActivated) {
                    $('td', row).parent('tr').addClass("unactivated");
                }
                if (data.isNew) {
                    $('td', row).parent('tr').addClass("item-new");
                }
            }
        });
    };
    getList();
    //
    var getListPosted = function(limit = 10){
        var tableList = $("#data-detail-posted").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/user/get-list-deal-agent-posted/"+agentId+"/-1?limit="+limit,
            "scrollX": false,
            "lengthChange": true,
            "autoWidth": false,
            "lengthMenu": [[10, 25, 50], [10 + ' records', 25 + ' records', 50 + ' records']],
            "pagingType": "full_numbers",
            "iDisplayLength": limit,
            "drawCallback": function (oSettings) {
                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                pagination.toggle(this.api().page.info().pages > 1);
            },
            "columns": [
                {data: 'rid'},
                {data: 'lid'},
                {data: 'address', orderable: false},
                {data: 'statusName', orderable: false},
                {data: 'assignedTo', orderable: false},
                {data: 'sourceName', orderable: false}
            ],
            "order": [[0, 'desc']],
            "language":
                {
                    "search" : "Tìm kiếm",
                    "paginate" : {
                        previous: "<",
                        next: ">",
                        first: "|<",
                        last: ">|"
                    },
                    "lengthMenu": "Hiển thị _MENU_ trên 1 trang",
                    "searchPlaceholder": "ID, Địa chỉ",
                    "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                    "emptyTable": "Chưa có dữ liệu",
                    "infoEmpty": ""
                },
            "createdRow": function (row, data, index) {
                //console.log(data);
                if (!data.isActivated) {
                    $('td', row).parent('tr').addClass("unactivated");
                }
                if (data.isNew) {
                    $('td', row).parent('tr').addClass("item-new");
                }
            }
        });
    };
    getListPosted();
    //
    $('#edit-infos').click(function(event){
        event.preventDefault();
        $('#updateInfosContactsAgent').modal();
    });
    //
    $('#cancel-update-infos').click(function(event){
        event.preventDefault();
        $('#updateInfosContactsAgent').modal('hide');
    });
    //
    var validateOptions = {
        ignore: null,
        rules: {
            "name": {required: true},
            "cmnd" : {required: true},
            "address" : {required: true}
        },
        messages: {
            "name": {required: 'Nhập Tên'},
            "cmnd" : {required: 'Nhập chứng minh nhân dân'},
            "address" : {required: 'Nhập địa chỉ'}
        }
    };
    
    var validateUpdateInfosAgent = $("#form-update-infos-agent").validate(validateOptions);
    
    var inputAllowNumber = function(input, allowSeparator){
        allowSeparator = (typeof allowSeparator !== 'undefined' ? allowSeparator : true);
        if($.isArray(input)) {
            $.each(input,function(index,element) {
                $(element).on('input', function () {
                    var text = $(this).val().match(/[\d]/g);
                    if(allowSeparator)
                    	var text = $(this).val().match(/[\d\.]/g);
                    text = !!text ? text.join("") : "";
                    $(this).val(text);
                });
            });
        }else{
            $(input).on('input', function () {
                var text = $(this).val().match(/[\d]/g);
                if(allowSeparator)
                    var text = $(this).val().match(/[\d\.]/g);
                text = !!text ? text.join("") : "";
                $(this).val(text);
            });
		}
	};
    
    var isValidEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
	};
    
    inputAllowNumber(".phone_num",false);
    
    $('#update-infos').click(function(event){
        event.preventDefault();
        if (!validateUpdateInfosAgent.form()) {
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        var isValidated = true;
        var form = $('#form-update-infos-agent');
        form.find('.errors').html('');
        //
        var photo = $('#photo').val() == '' ? null : $('#photo').val();
        //var userName = $('#userName').val();
        var agentId = $('#agentId').val();
        var agentName = $('#name').val();
        var cmnd = $('#cmnd').val();
        var startDate = HumanToEpoch2($('#startDate').val());
        var address = $('#address').val();
        //email
        var flagEmail = false;
        var emails = [];
        $('#updateInfosContactsAgent input[name="email"]').each(function(){
            $(this).parent('.col-md-6').find('input').removeAttr('style');
            if($(this).val() !== ''){
                if(!isValidEmail($(this).val())){
                    $(this).parent('.col-md-6').find('input').css('border','2px solid red');
                    $(this).parent('.col-md-6').find('.errors').html('Email không hợp lệ');
                    showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
                    isValidated = false;
                } else {
                    emails.push({
                        "email" : $(this).val(),
                        "isPrimary" : $(this).parent('.col-md-6').siblings().find('select').val() == '1' ? true : false
                    });
                }
            }
        });
        
        $('#updateInfosContactsAgent select[name="primaryEmail"]').each(function(){
            if($(this).val() == 1){
                if($(this).parent('.col-md-6').siblings().find('input').val() == ''){
                    $(this).parent('.col-md-6').siblings().find('input').css('border','2px solid red');
                    flagEmail = true;
                    $(this).parent('.col-md-6').siblings().find('.errors').html('Nhập email chính');
                }
            } else {
                $(this).parent('.col-md-6').siblings().find('input').removeAttr('style');
            }
        });

        var flagPrimaryEmail = true;
        $.each(emails,function(k,v){
            //console.log(v.isPrimary);
            if(v.isPrimary == 1){
                flagPrimaryEmail = false;
                return false;
            }
        });
        
        if(flagEmail == true || flagPrimaryEmail == true){
            emails = null;
            //console.log('fail');
            showPropzyAlert("Có lỗi xảy ra. Vui lòng chọn email chính");
            return false;
        }
        //console.log(emails);
        //
        var flagPhone = false;
        var phones = [];
        $('#updateInfosContactsAgent input[name="phone"]').each(function(){
            $(this).parent('.col-md-6').find('input').removeAttr('style');
            if($(this).val() !== ''){
                if ($(this).val().length >= 10 && $(this).val().trim().length <= 15) {
                    phones.push({
                        "phone" : $(this).val(),
                        "isPrimary" : $(this).parent('.col-md-6').siblings().find('select').val() == '1' ? true : false
                    });
                } else if($(this).val().trim().length > 15 || $(this).val().trim().length < 10){
                    $(this).parent('.col-md-6').find('input').css('border','2px solid red');
                    $(this).parent('.col-md-6').find('.errors').html('Số điện thoại không hợp lệ');
                    showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
                    isValidated = false;
                }
            }
        });
        
        $('#updateInfosContactsAgent select[name="primaryPhone"]').each(function(){
            if($(this).val() == 1){
                if($(this).parent('.col-md-6').siblings().find('input').val() == ''){
                    $(this).parent('.col-md-6').siblings().find('input').css('border','2px solid red');
                    flagPhone = true;
                    $(this).parent('.col-md-6').siblings().find('.errors').html('Nhập số điện thoại chính');
                }
            } else {
                $(this).parent('.col-md-6').siblings().find('input').removeAttr('style');
            }
        });

        var flagPrimary = true;
        $.each(phones,function(k,v){
            //console.log(v.isPrimary);
            if(v.isPrimary == 1){
                flagPrimary = false;
                return false;
            }
        });
        
        if(flagPhone == true || flagPrimary == true){
            phones = null;
            //console.log('fail');
            showPropzyAlert("Có lỗi xảy ra. Vui lòng chọn số điện thoại chính");
            return false;
        }
        //console.log(phones);
        //
        var dataSend = {};
        dataSend['photo'] = photo;
        //dataSend['userName'] = userName;
        dataSend['agentId'] = agentId;
        dataSend['agentName'] = agentName;
        dataSend['cmnd'] = cmnd;
        dataSend['startDate'] = startDate;
        dataSend['address'] = address;
        dataSend['emails'] = emails;
        dataSend['phones'] = phones;
        //
        if (false === isValidated) {
            return false;
        }
        console.log(dataSend);
        showPropzyLoading();
        $.ajax({
            url: "/user/do-update-infos-agent",
            data: JSON.stringify(dataSend),
            type: "post"
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                showPropzyAlert(response.message);
                $('#alertModal').on('hide.bs.modal',function () {
                    window.location.reload();
                });
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
});

function parseMonth(mnth) {
    switch (mnth.toLowerCase()) {
        case 'january':
        case 'jan':
        case 'enero':
            return 1;
        case 'february':
        case 'feb':
        case 'febrero':
            return 2;
        case 'march':
        case 'mar':
        case 'marzo':
            return 3;
        case 'april':
        case 'apr':
        case 'abril':
            return 4;
        case 'may':
        case 'mayo':
            return 5;
        case 'jun':
        case 'june':
        case 'junio':
            return 6;
        case 'jul':
        case 'july':
        case 'julio':
            return 7;
        case 'aug':
        case 'august':
        case 'agosto':
            return 8;
        case 'sep':
        case 'september':
        case 'septiembre':
        case 'setiembre':
            return 9;
        case 'oct':
        case 'october':
        case 'octubre':
            return 10;
        case 'nov':
        case 'november':
        case 'noviembre':
            return 11;
        case 'dec':
        case 'december':
        case 'diciembre':
            return 12;
    }
    return mnth;
}

function HumanToEpoch2(strDate) {
    strDate = strDate.replace(/[\,]/g, '');
    strDate = strDate.replace(/^\s+|\s+$/g, '');
    strDate = strDate.replace(/ +(?= )/g, '');
    strDate = strDate.replace(/^(\d+)\./, '$1');
    var ok = 0;
    var skipDate = 0;
    var content = "";
    var date = "";
    var format = "";
    var yr = 1970;
    var mnth = 1;
    var dy = 1;
    var hr = 0;
    var mn = 0;
    var sec = 0;
    var dmy = 1;
    if (!ok) {
        var dateTimeSplit = strDate.split(" ");
        var dateParts = dateTimeSplit[0].split("-");
        if (dateParts.length === 1) dateParts = dateTimeSplit[0].split(".");
        if (dateParts.length === 1) {
            dmy = 0;
            dateParts = dateTimeSplit[0].split("/");
        }
        if (dateParts.length === 1) {
            dmy = 1;
            if (dateTimeSplit.length > 2) {
                if (dateTimeSplit[2].split(":").length === 1) {
                    strDate = strDate.replace(dateTimeSplit[0] + ' ' + dateTimeSplit[1] + ' ' + dateTimeSplit[2], dateTimeSplit[0] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[2]);
                    dateTimeSplit = strDate.split(" ");
                    dateParts = dateTimeSplit[0].split("-");
                }
            }
        }
        if (dateParts.length === 1) {
            dateParts = dateTimeSplit;
            if (dateTimeSplit.length > 3) timeParts = dateTimeSplit[4];
        }
        if (dateParts.length > 2) {
            if (dateParts[0] > 100) {
                yr = dateParts[0];
                mnth = parseMonth(dateParts[1]);
                dy = dateParts[2];
                format = "YMD";
            } else {
                if (dmy) {
                    dy = dateParts[0];
                    mnth = parseMonth(dateParts[1]);
                    yr = dateParts[2];
                    format = "DMY";
                    if ((!parseFloat(mnth)) || (!parseFloat(dy))) {
                        dy = dateParts[1];
                        mnth = parseMonth(dateParts[0]);
                        format = "MDY";
                    }
                } else {
                    mnth = parseMonth(dateParts[0]);
                    dy = dateParts[1];
                    yr = dateParts[2];
                    format = "MDY";
                    if ((!parseFloat(mnth)) || (!parseFloat(dy))) {
                        dy = dateParts[0];
                        mnth = parseMonth(dateParts[1]);
                        format = "DMY";
                    }
                }
            }
            ok = 1;
        }
        if (ok && dateTimeSplit[1]) {
            var timeParts = dateTimeSplit[1].split(":");
            if (timeParts.length >= 2) {
                hr = timeParts[0];
                mn = timeParts[1];
            }
            if (timeParts.length >= 3) {
                sec = timeParts[2];
            }
            if ((dateTimeSplit[2] && dateTimeSplit[2].toLowerCase() === "pm") && (parseFloat(hr) < 12)) hr = parseFloat(hr) + 12;
            if ((dateTimeSplit[2] && dateTimeSplit[2].toLowerCase() === "am") && (parseFloat(hr) === 12)) hr = 0;
        }
    }
    if (!ok) {
        date = new Date(strDate);
        if (date.getFullYear() > 1900) {
            ok = 1;
            skipDate = 1;
        }
    }
    if (ok) {
        if (!skipDate) {
            if (mnth !== parseFloat(mnth)) mnth = parseMonth(mnth);
            if (yr < 30) yr = 2000 + parseFloat(yr);
            if (yr < 200) yr = 1900 + parseFloat(yr);
            var usedGMT = 0;
            if (((strDate.toUpperCase().indexOf('GMT') > 0) || (strDate.toUpperCase().indexOf('UTC') > 0)) && (strDate.toUpperCase().indexOf('GMT+') == -1) && (strDate.toUpperCase().indexOf('UTC+') == -1)) {
                date = new Date(Date.UTC(yr, mnth - 1, dy, hr, mn, sec));
                usedGMT = 1;
            } else {
                date = new Date(yr, mnth - 1, dy, hr, mn, sec);
            }
        }
        content = date.getTime();
    }
    return content;
}