// variable global for export
var statusIdExport = -1;
var progressQuoIDExport = null;

dateRender = function (data, type, object) {
    if (!data)
        return "";
    return $.format.date(new Date(data), "dd/MM/yyyy");
}
function formatNumber(data, type, object) {
    if (!data)
        return "";
    return Intl.NumberFormat("de-DE").format(data);
}

var renderLink = function (data, type, object) {
    let html = "<a data-toggle='tooltip' title='"+object.projectBuildingName+"' href='/lead/detail/" + object.leadId + "'>" + data + "</a>";
    html += `<br><a href="#" class="label-primary evaluate-score-block-list">TM : ${object.leadProfileValue ? object.leadProfileValue : 'N/A'}</a>`;
    return  html;
}

var showData = function (statusId, progressQuoIDs) {
    $("#lead-list").DataTable().ajax.url(generateListUrl(statusId, progressQuoIDs)).load();
    return false;
}

var renderProgressName = function (data, type, object) {
    if (typeof object.progressName === 'undefined') {
        return "Server chưa trả về, ahihi";
    } else {
        return object.progressName != null ? object.progressName : 'N/A';
    }
}


function generateListUrl(statusId, progressQuoIDs){
    var baseUrl = "/lead/get-list-lead/" + statusId;
    var params = "";
    statusIdExport = statusId;
    if(progressQuoIDs){
        params += "&progressQuoIDs="+progressQuoIDs;
        progressQuoIDExport = progressQuoIDs;
    }else{
        progressQuoIDExport = null;
    }

    if($(".fromDate").is(":visible")){
        var fromDate = $(".fromDate").val().trim();
        if(fromDate!=""){
            fromDate = moment(fromDate, "DD/MM/YYYY").unix()*1000;
            params += "&fromDate=" + fromDate;
        }else{
            params += "&fromDate=" + 0;
        }

        var toDate = $(".toDate").val().trim();
        if(toDate!=""){
            toDate = moment(toDate, "DD/MM/YYYY").unix()*1000;
            params += "&toDate=" + toDate;
        }else{            
            params += "&toDate=" + (moment().unix()*1000);
        }
    }
    if($("#assignes").length){
        params += "&assignedTos=" + $("#assignes").val() ;
    }
    
    if ($('#listingTypeId').val()) {
        params += "&listingTypeId=" + $('#listingTypeId').val();
    }
    if ($('#propertyTypeId').val()) {
        params += "&propertyTypeId=" + $('#propertyTypeId').val();
    }

    return baseUrl + '?' + encodeURI(params);
}

var renderWardDictrictPrefer = function(data,type,object){
    return data + ' - '+ object.preferWard;
}

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    $("#lead-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/lead/get-list-lead/-1",
        "scrollX": false,
        "lengthChange": true,
        "lengthMenu": [[10, 25, 50], [10 + ' records', 25 + ' records', 50 + ' records']],
        "autoWidth": false,
        "order": [[7, "desc"]],
        "language":
                {
                    "search" : "Tìm kiếm",
                    "paginate": {
                        previous: "<",
                        next: ">",
                        first: "|<",
                        last: ">|"
                    },
                    "lengthMenu": "Hiển thị _MENU_ trên 1 trang",
                    "searchPlaceholder": "SDT, Tên, Email, IDs",
                    "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                    "emptyTable": "Chưa có dữ liệu",
                    "infoEmpty": "",
                },
        "columns": [
            // {data: null, render: customKey, orderable: false},
            // {data: 'customerId', orderable: false},
            {data: 'leadId', orderable: false,render:function(data,type,object){
                var agentInfo = '';
                if(object.agentName != null){
                    agentInfo = object.agentName != null ? object.agentName : 'N/A';
                    agentInfo = ' <a data-toggle="tooltip" title="Môi giới: '+agentInfo+'" href="#"> <i class="fa fa-black-tie" aria-hidden="true"></i></a>';
                }
                return data + agentInfo; 
            }},
            {data: 'customerName', render: renderLink, width: "20%", orderable: false},
            //{data: 'customerEmail', orderable: false, visible: false},
            {data: 'tmName', orderable: false},
            {data: 'timeCounter', orderable: false, render: function(data,type,object){
                if(data){
                    return data;
                }
                return 'N/A'; 
            }},
            {data: 'statusName', orderable: false},
            {data: 'progressName', orderable: false, render: progressQuoNameRender},
            {data: 'createdDate', render: dateTimeRender},
            {data: 'lastUpdatedDate', render: dateTimeRender},
            {data: 'formatPrice', orderable: false},
            // {data: 'listingTypeName', orderable: false, visible: false},
            // {data: 'formatUnitPrice', orderable: false},
            {data: 'propertyTypeGroupName', orderable: false},
            {data: 'propertyTypeName', orderable: false, render:function(data,type,object){
                return object.listingTypeName + ' - ' + object.propertyTypeName;
                
            }},
            // {data: 'recentlyStatusName', defaultContent: "", orderable: false, visible: false},
            // {data: 'moveInDate', render: dateRender, width: "10%", orderable: false, visible: false},
            {data: 'preferDistrict', orderable: false, render:renderWardDictrictPrefer},
            {data: 'sourceName', orderable: false},
            {data: 'subjectName', orderable: false},
            // {data: 'device', orderable: false, visible: false},
            // {data: null, defaultContent: "", width: "10%", orderable: false, visible: false},
            {data: 'createdDateOfDeal', render: leadDealRender.renderDaysOfBeingLead, orderable: false},
            // {data: null, defaultContent: "", width: "10%", orderable: false, visible: false},
            // {data: "leadId", render: renderAction, orderable: false, visible: isGroupAdmin},
        ],
        "createdRow": function (row, data, index) {
            console.log(data);
            if (!data.isActivated) {
                $('td', row).parent('tr').addClass("unactivated");
            }
            if (data.isNew) {
                $('td', row).parent('tr').addClass("item-new");
            }
        }

    });
    try {
        $("#lead-list").dataTable().fnSetFilteringDelay(1000);
    } catch (Ex) {
    }



    $(".fromDate").datepicker({
        "format": "dd/mm/yyyy"
    });
    $(".toDate").datepicker({
        "format": "dd/mm/yyyy"
    });

    ReassignLeads.loadCrmsSelect();
    $('.assignedTos').select2();

    $('#btn_filter_button_deal').click(function(){
        var filterUrl = "/lead/generate-filter-deal-button?";
        if($(".fromDate").is(":visible")){
            var fromDate = $(".fromDate").val().trim();
            if(fromDate!=""){
                fromDate = moment(fromDate, "DD/MM/YYYY").unix()*1000;
                filterUrl += "&fromDate=" + fromDate;
            }else{
                filterUrl += "&fromDate=" + 0;
            }

            var toDate = $(".toDate").val().trim();
            if(toDate!=""){
                toDate = moment(toDate, "DD/MM/YYYY").unix()*1000;
                filterUrl += "&toDate=" + toDate;
            }else{            
                filterUrl += "&toDate=" + (moment().unix()*1000);
            }
        }else{
            filterUrl += "&fromDate=" + 0;
            filterUrl += "&toDate=" + (moment().unix()*1000);
        }
        if($("#assignes").is(":visible")){
            filterUrl += "&assignes=" + $('#assignes').val();
        }

        // new update filter
        if ($('#listingTypeId').val()) {
            filterUrl += "&listingTypeId=" + $('#listingTypeId').val()
        }
        if ($('#propertyTypeId').val()) {
            filterUrl += "&propertyTypeId=" + $('#propertyTypeId').val()
        }
        showPropzyLoading();
        $.post(filterUrl, {}, function (response) {
            $('#wrap_group_button_deal').html(response)
            hidePropzyLoading(); 
            showData(-1);
            return false;
        });
        return false;
    })
    
    $(".btn-export").click(function () {

        var exportUrl = "/report/export-report/lead-list---"+statusIdExport+"?";
        var fromDate = $(".fromDate").val().trim();
        if(fromDate!=""){
            fromDate = moment(fromDate, "DD/MM/YYYY").unix()*1000;
            exportUrl += "&fromDate=" + fromDate;
            $(".fromDate").css('border','1px solid #dedede');
        }else{
            if($('#assignes').val() == 0){
                $(".fromDate").css('border','1px solid red');
                return false;
            }
            // exportUrl += "?fromDate=" + 0;
        }

        var toDate = $(".toDate").val().trim();
        if(toDate!=""){
            toDate = moment(toDate, "DD/MM/YYYY").unix()*1000;
            exportUrl += "&toDate=" + toDate;
            $(".toDate").css('border','1px solid #dedede');
        }else{
            if($('#assignes').val() == 0){
                $(".toDate").css('border','1px solid red');
                return false;
            }
            // exportUrl += "&toDate=" + (moment().unix()*1000);
        }

        if(progressQuoIDExport != null){
            exportUrl += "&progressQuoIDs="+progressQuoIDExport;
        }

        exportUrl += "&assignedTos=" + $('#assignes').val();

        exportUrl += "&listingTypeId=" + $('#listingTypeId').val();
        exportUrl += "&propertyTypeId=" + $('#propertyTypeId').val();
        // return false;
        showPropzyLoading();
        $.post(exportUrl, {}, function (response) {
            if (response.result) {
                // return false;
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
        return false;
    });
});
var renderAction = function (data, type, object) {
    data = "<a href='#' onclick=\"return deleteItem('" + object.leadId + "')\"><i class='glyphicon glyphicon-trash text-red'></i></a>";
    return data;
};
function deleteItem(itemId) {
    if (!confirm("Bạn có chắc chắn muốn xóa lead này?")) {
        return false;
    }
    showPropzyLoading();
    var currentRow = $(this);
    $.ajax({
        "url": "/lead/delete/" + itemId,
        "type": "get"
    }).done(function (response) {
        if (response.result) {
            window.location.reload();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}