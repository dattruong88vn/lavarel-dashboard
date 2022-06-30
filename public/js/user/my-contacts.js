var renderLink = function (data, type, object) {
    if(object.statusId == 3){// đang bị khóa
        return "<a href='/user-role/unlock-contacts/"+object.contactId+"'>Mở khóa</a>";
    }
    return "<a onclick=\"return confirm('Bạn có chắc muốn khóa tài khoản này không?')\" href='/user-role/lock-contacts/"+object.contactId+"?type="+object.contactType+"'>Khóa</a>";
};
var renderEmail =  function(data, type, object){
    var emails  = "";
    if(object.emails !== null){
        $.each(object.emails, function(k,v){
            if(v.isPrimary == true){
                emails = v.email;
            }
        });
        return emails;
    }
    return '';
};
var renderName = function(data, type, object){
    var photo = '<img src="/images/icon-12.png" class="user-image" /> '+' <a href="/user-role/detail-infos/'+object.contactType+'/'+object.contactId+'"> '+object.contactName+'</a>';
    return photo;
};
var dateTimeRender = function (data, type, object) {
    if (!data)
        return "";
    return $.format.date(new Date(data), "dd/MM/yyyy");
};

var allPos = '';
var allPositions = function(){
    $.ajax({
        url: "/user/get-all-positions",
        async: false,
        type: "get"
    }).done(function (response) {
        allPos = response;
    });
};
allPositions();
//
var listFilters = '';
var allFilters = function(){
    $.ajax({
        url: "/user/get-filter-contacts",
        async: false,
        type: "get"
    }).done(function (response) {
        listFilters = response;
    });
};
allFilters();
//
var renderPositions = function(data,type,object){
    var html = '';
    var styleForASM = '';
    if (currentUser.userRole == "ASM") { 
        styleForASM = 'style="pointer-events: none;opacity:0.4;"';
    }
    if(object.contactType == 'user') {
        html+= '<div '+styleForASM+' class="hidden-sm hidden-xs">';
        html+= '<div id="keep-open" class="inline position-relative dropdown">';
        html+= '<button id="check-roles" class="btn btn-minier btn-primary" data-toggle="dropdown" data-position="auto">Chức vụ đang có ';
        html+= '<i class="ace-icon fa fa-angle-down bigger-110"></i></button>';
        html+= '<ul class="dropdown-role dropdown-menu dropdown-only-icon dropdown-menu-right dropdown-caret dropdown-close">';
        $.each(allPos.positions, function(k,v){
            var checked = "";
            if(object.positions && object.positions.length > 0){
                $.each(object.positions,function(key,val){
                    if(val.positionId == v.positionId){
                        checked = 'checked="checked"';
                    }
                });
            }
            html+= '<li onclick="event.stopPropagation();"><label class="checkbox"><input '+checked+' onclick="updatePositionsContact(event,this);" class="data-position" type="checkbox" data-userId="'+object.contactId+'" value="'+v.positionId+'"/> '+v.positionName+'</label></li>';
        });
        html+= '</ul>';
        html+= '</div>';
    }
    return html;
};

var updateData = {};
var updatePositionsContact = function (event,element){
    event.stopPropagation();
    var userId = $(element).attr('data-userId');
    var parent = $(element).parents("ul");
    var positionIds = [];
    $(parent.find("li")).each(function(){
        var pos = $(this).find('.data-position').val();
        if($(this).find('.data-position').is(":checked")){
            positionIds.push(pos);
        }
    });
    updateData['userId'] = userId;
    updateData['positionIds'] = positionIds;
    
    console.log(updateData);
    
    showPropzyLoading();
        
    $.ajax({
        url: "/user/update-positions",
        data: JSON.stringify(updateData),
        type: "post"
    }).done(function (response) {
        console.log(response);
        if (response.result) {
            console.log(response.message);
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
};

$(document).ready(function(){
    $("#startDate").datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        minDate: 0
    });
    $("#endDate").datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true

    }).on('show', function (e) {
        var startDate = $("#startDate").val();
        $(this).data('datepicker').setStartDate(startDate);
    });
    
    var getList = function (limit = 10) {
        $("#data-contacts").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/user/get-all-contacts?limit="+limit,
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
                {data: 'contactName', render:renderName, orderable: false},
                {data: 'emails', render:renderEmail, orderable: false},
                {data: 'contactType', orderable: false},
                {data: 'statusName'},
                {data: 'createdDate', render: dateTimeRender, orderable: true},
                {data: 'updatedDate', render: dateTimeRender, orderable: true},
                {data: 'registerFromName', orderable: false},
                {data: 'positions', render:renderPositions, orderable: false},
                {data: 'contactId',render: renderLink, orderable: false}
            ],
            "order": [[4, 'desc']],
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
                    "searchPlaceholder": "Tên, Email",
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
    
    //btn-filter
    $('#btn-filter').click(function(){
        var filters = {};
        var dataFilter = {};
        
        var typeUser = $('#typeUserFilter').val();
        if(typeUser == '')
            typeUser = null;
        //
        var status = $('#statusFilter').val();
        if(status == '')
            status = null;
        //
        var active = $('#activeFilter').val();
        if(active == '')
            active = null;
        //
        var startDate = 0;
        if ($('#startDate').val()) {
            startDate = HumanToEpoch2($('#startDate').val());
        }
        //
        var currentdate = new Date();
        var endDate = currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        endDate = HumanToEpoch2(endDate);
        if ($('#endDate').val()) {
            endDate = HumanToEpoch2($('#endDate').val()+' 23:59:59');
        }
        //
        dataFilter['contactType'] = typeUser;
        dataFilter['statusId'] = status;
        dataFilter['activeId'] = active;
        // ranges
        var filterRanges = [];
        var ranges = $('.filter-contacts').find('input[name="filter_date"]:checked').val();
        if(ranges == 1){
            if(startDate !== 0){
                filterRanges[0] =  {
                    "columnName" : 'createdDate',
                    "from" : startDate,
                    "to" : endDate
                };
            }
        } else if (ranges == 2) {
            if(startDate !== 0){
                filterRanges[0] =  {
                    "columnName" : 'updatedDate',
                    "from" : startDate,
                    "to" : endDate
                };
            }
        }
        if(filterRanges.length > 0){
            filters['ranges'] = filterRanges;
        }
        // columns
        var filterColumns = [];
        var i = 0;
        $.each(dataFilter, function(key, val){
            if(val !== '' && val !== null){
                filterColumns[i] = {
                    "columnName" : key,
                    "value" : val
                };
                i++;
            }
        });
        if(filterColumns.length > 0){
            filters['columns'] = filterColumns;
        }
        //
        console.log(filters);
        $("#data-contacts").DataTable().ajax.url(generate(filters)).load();
    });
    //typeUserFilter
    if(($("#typeUserFilter").val() == "")) {
        $("#statusFilter").attr("disabled", "disabled");
        $("#activeFilter").attr("disabled", "disabled");
    }
    $("#typeUserFilter").change(function () {
        $("#statusFilter").html("");
        $("#activeFilter").html("");
        if (($(this).val() === "")) {
            $("#statusFilter").html('<option value="">-- Trạng thái --</option>');
            $("#activeFilter").html('<option value="">-- Active --</option>');
            $("#statusFilter").attr("disabled", "disabled");
            $("#activeFilter").attr("disabled", "disabled");
            return;
        }
        else{
            $("#statusFilter").prop("disabled", false);
            $("#activeFilter").prop("disabled", false);
            //console.log(listFilters);
            var htmlOwnerStatusList = '';
            var htmlOwnerActives = '';
            var htmlAgentStatusList = '';
            var htmlAgentActives = '';
            var htmlUserStatusList = '';
            var htmlUserActives = '';
            var htmlCustomerStatusList = '';
            var htmlCustomerActives = '';
            
            if($(this).val() === "owner"){
                htmlOwnerStatusList+= '<option value="">-- Trạng thái --</option>';
                htmlOwnerActives+= '<option value="">-- Active --</option>';
                if(listFilters.listFilters.owner.statusList !== null){
                    $.each(listFilters.listFilters.owner.statusList, function(key, val){
                        htmlOwnerStatusList+= '<option>';
                        htmlOwnerStatusList+= val.name;
                        htmlOwnerStatusList+= '</option>';
                    });
                }
                $('#statusFilter').html(htmlOwnerStatusList);
                //
                if(listFilters.listFilters.owner.actives !== null){
                    $.each(listFilters.listFilters.owner.actives, function(key, val){
                        htmlOwnerActives+= '<option value="'+val.key+'">';
                        htmlOwnerActives+= val.name;
                        htmlOwnerActives+= '</option>';
                    });
                }
                $('#activeFilter').html(htmlOwnerActives);
            } else if($(this).val() === "agent") {
                htmlAgentStatusList+= '<option value="">-- Trạng thái --</option>';
                htmlAgentActives+= '<option value="">-- Active --</option>';
                //console.log(listFilters.listFilters.agent.statusList);
                if(listFilters.listFilters.agent.statusList !== null){
                    $.each(listFilters.listFilters.agent.statusList, function(key, val){
                        htmlAgentStatusList+= '<option value="'+val.key+'">';
                        htmlAgentStatusList+= val.name;
                        htmlAgentStatusList+= '</option>';
                    });
                }
                $('#statusFilter').html(htmlAgentStatusList);
                //
                if(listFilters.listFilters.agent.actives !== null){
                    $.each(listFilters.listFilters.agent.actives, function(key, val){
                        htmlAgentActives+= '<option value="'+val.key+'">';
                        htmlAgentActives+= val.name;
                        htmlAgentActives+= '</option>';
                    });
                }
                $('#activeFilter').html(htmlAgentActives);
            } else if($(this).val() === "user") {
                htmlUserStatusList+= '<option value="">-- Trạng thái --</option>';
                htmlUserActives+= '<option value="">-- Active --</option>';
                //console.log(listFilters.listFilters.user.statusList);
                if(listFilters.listFilters.user.statusList !== null){
                    $.each(listFilters.listFilters.user.statusList, function(key, val){
                        htmlUserStatusList+= '<option value="'+val.key+'">';
                        htmlUserStatusList+= val.name;
                        htmlUserStatusList+= '</option>';
                    });
                }
                $('#statusFilter').html(htmlUserStatusList);
                //
                if(listFilters.listFilters.user.actives !== null){
                    $.each(listFilters.listFilters.user.actives, function(key, val){
                        htmlUserActives+= '<option value="'+val.key+'">';
                        htmlUserActives+= val.name;
                        htmlUserActives+= '</option>';
                    });
                }
                $('#activeFilter').html(htmlUserActives);
            } else if($(this).val() === "customer") {
                htmlCustomerStatusList+= '<option value="">-- Trạng thái --</option>';
                htmlCustomerActives+= '<option value="">-- Active --</option>';
                //console.log(listFilters.listFilters.customer.statusList);
                if(listFilters.listFilters.customer.statusList !== null){
                    $.each(listFilters.listFilters.customer.statusList, function(key, val){
                        htmlCustomerStatusList+= '<option value="'+val.key+'">';
                        htmlCustomerStatusList+= val.name;
                        htmlCustomerStatusList+= '</option>';
                    });
                }
                $('#statusFilter').html(htmlCustomerStatusList);
                //
                if(listFilters.listFilters.customer.actives !== null){
                    $.each(listFilters.listFilters.customer.actives, function(key, val){
                        htmlCustomerActives+= '<option value="'+val.key+'">';
                        htmlCustomerActives+= val.name;
                        htmlCustomerActives+= '</option>';
                    });
                }
                $('#activeFilter').html(htmlCustomerActives);
            }
        }
    });
});

function generate(filters){
    var baseUrl = "/user/get-all-contacts";
    var params = "";
    if(filters){
        params += "?filters="+JSON.stringify(filters);
    }
    return baseUrl + params;
}

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