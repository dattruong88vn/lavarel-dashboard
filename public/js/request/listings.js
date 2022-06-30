var renderAction = function (data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='#' class='btnDelete' onclick=\"return deleteRequest('" + data + "');\" ><i class='glyphicon glyphicon-trash text-red'></i></a>";
    return data;
};

var renderNameLink = function (data, type, object) {
    return data;
    // return "<a href='/request/detail/" + object.requestId + "'>" + data + "</a>";
};

function deleteRequest(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa request này?")) {
        return false;
    }
    showPropzyLoading();
    $.ajax({
        "url": "/request/delete/" + id,
        "type": "get"
    }).done(function (response) {
        if (response.result) {
            window.location.reload();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}

var RequestListings = (function(){
    var tableListings = null;
    var currentSelectedStatus = [];
    var statusNames = [];
    var postData = null;
    var fromDate = null;
    var toDate = null;
    function loadDataTable(){
        try{
            tableListings.destroy();
        }catch(ex){
            console.log(ex);
        }
        var requestUrl = "/request/listings-data?_ajax=1";
        fromDate = $(".fromDate").val().trim();
        if(fromDate!=""){
            fromDate = moment(fromDate, "DD/MM/YYYY").unix()*1000;
            requestUrl += "&fromDate=" + fromDate;
        }else{
            requestUrl += "&fromDate=" + 0;
        }

        toDate = $(".toDate").val().trim();
        if(toDate!=""){
            toDate = moment(toDate, "DD/MM/YYYY").unix()*1000;
            requestUrl += "&toDate=" + toDate;
        }else{            
            requestUrl += "&toDate=" + (moment().unix()*1000);
        }  
        var currentSelectedStatus = $(".select-status").val();
        if(currentSelectedStatus){
            requestUrl += "&statusNameList="+currentSelectedStatus;
        }
        tableListings = $("#request-list").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": requestUrl,
            "lengthChange": false,
            "orderCellsTop": true,
            "language" : {
                "search" : "Tìm kiếm",
                "paginate" : {
                    previous: "<",
                    next: ">",
                    first: "|<",
                    last: ">|"
                },
                "searchPlaceholder": "SDT, Tên, Email",
                "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                "emptyTable": "Chưa có dữ liệu",
                "infoEmpty": "",
            },
            "columns": [
                {data: "id", orderable: false,render:function(data,type,object){
                    var agentInfo = '';
                    if(object.agentName != null){
                        agentInfo = object.agentName != null ? object.agentName : 'N/A';
                        agentInfo = ' <a data-toggle="tooltip" title="Môi giới: '+agentInfo+'" href="#"> <i class="fa fa-black-tie" aria-hidden="true"></i></a>';
                    }
                    return data + agentInfo;
                }},
                {data: "rlistingId", orderable: false},
                {data: "ownerName", render: renderNameLink, orderable: false},
                {data: 'assignedToName', orderable: false},
                {data: "createdByName", orderable: false},
                {data: "createdDate", render: dateRender},
                {data: "listingTypeName", orderable: false},
                {data: "propertyTypeGroupName", orderable: false},
                {data: "propertyTypeName", orderable: false},
                {data: "formatPrice"},
                {data: "sourceName", orderable: false},
                {data: "statusName", orderable: false},
                {data: "requestId", orderable: false, render: renderAction, visible: false}
            ],
            "order": [[ 5 , "desc" ]],
            "drawCallback": function(settings){
                $(".select-status").select2();
                $(".select-status").unbind("change");
                $(".select-status").change(function(){
                    loadDataTable();
                });
            }
        }).on("xhr.dt", function(e, settings, json, xhr){    
            postData = json.postData;        
            var html = "";
            if(statusNames.length<=0){
                statusNames = json.statusNames;
            }
            for(var i=0;i<statusNames.length;i++){
                var statusName = statusNames[i];
                var selected = "";
                if(currentSelectedStatus){
                    for(var j=0;j<currentSelectedStatus.length;j++){
                        if(currentSelectedStatus[j]==statusName){
                            selected="selected";
                        }
                    }                    
                }
                html += "<option value='"+statusName+"' "+selected+">"+statusName+"</option>";
            }
            $(".select-status").html(html);
        });        
    }



    $(".btn-export").click(function () {

        var exportUrl = "/request/export-request-listings";
        showPropzyLoading();
        $.ajax({
            "url": exportUrl,
            "type": "post",
            "data": JSON.stringify(postData),
        }).done(function(response){
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        }).always(function(){
            hidePropzyLoading();
        });
        return false;
    });

    $(".fromDate").datepicker({
        "format": "dd/mm/yyyy"
    }).on("changeDate", function(){  
        loadDataTable();
    });

    $(".toDate").datepicker({
        "format": "dd/mm/yyyy"
    }).on("changeDate", function(){
        loadDataTable();
    });
    return {
        "loadDataTable": loadDataTable,
    };
})();
$(document).ready(function () {
    RequestListings.loadDataTable();
});