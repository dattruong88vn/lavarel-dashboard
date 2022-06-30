var renderAction = function (data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='#' class='btnDelete' onclick=\"return deleteRequest('" + data + "');\" ><i class='glyphicon glyphicon-trash text-red'></i></a>";
    return data;
};

var renderNameLink = function (data, type, object) {
    return "<a href='/request/detail/" + object.requestId + "'>" + data + "</a>";
};

var renderProfileUser = function(data,type,object) {
    if(object.baId != null){
        return "<a class='getInfoUser' onclick='showProfileJM(this,\""+data+"\",\""+object.baPhone+"\",\""+object.baEmail+"\");return false;' data-placement='top' data-popover-content='#a1' data-toggle='popover' href='#'>"+data+"</a>";
    }else{
        return "N/A";
    }
}

var renderLeadDealID = function(data,type,object) {
    if(data == null){
        return "N/A";
    }
    return data;
}

var renderProfileTM = function(data,type,object) {
    if(object.tmId != null){
        return "<a class='getInfoUser' onclick='showProfileJM(this,\""+data+"\",\""+object.tmPhone+"\",\""+object.tmEmail+"\");return false;' data-placement='top' data-popover-content='#a1' data-toggle='popover' href='#'>"+data+"</a>";
    }else{
        return "N/A";
    }
}

var renderPropertyTypeGroup = function(data, type, object){
    let { propertyTypeGroupName } = object;
    if(!propertyTypeGroupName) return "N/A";
    return propertyTypeGroupName; 
}

function showProfileJM(element,name,phone,email){
    // $.ajax({
    //     "url": "/user/get-by-id/" + id + "/resp",
    //     "type": "get"
    // }).done(function (response) {
    //     if(response.result){
    //         if(typeof response.data.name != 'undefined' ){
    //             var titleTooltip = "<b>Tên: </b>"+response.data.name+"<br/> <b>Số điện thoại: </b>"+response.data.phone+"<br/> <b>Email: </b>"+response.data.email;

    //             $(element).popover({
    //                 html : true,
    //                 content: function() {
    //                     return titleTooltip;
    //                   // var content = $(this).attr("data-popover-content");
    //                   // return $(content).children(".popover-body").html();
    //                 },
    //                 title: function() {
    //                     return "Thông tin";
    //                   // var title = $(this).attr("data-popover-content");
    //                   // return $(title).children(".popover-heading").html();
    //                 }
    //             }).popover('show');
    //         }else{
    //             $(element).popover({
    //                 html : true,
    //                 content: function() {
    //                   return "Chưa có dữ liệu";
    //                 },
    //                 title: function() {
    //                   return "Thông tin";
    //                 }
    //             }).popover('show');
    //         }
    //     } else {
    //         $(element).popover({
    //             html : true,
    //             content: function() {
    //               return "Bạn không có quyền xem";
    //             },
    //             title: function() {
    //               return "Thông tin";
    //             }
    //         }).popover('show');
    //     }
    // });
    if(name != 'undefined' ){
        var titleTooltip = "<b>Tên: </b>"+name+"<br/> <b>Số điện thoại: </b>"+phone+"<br/> <b>Email: </b>"+email;

        $(element).popover({
            html : true,
            content: function() {
                return titleTooltip;
              // var content = $(this).attr("data-popover-content");
              // return $(content).children(".popover-body").html();
            },
            title: function() {
                return "Thông tin";
              // var title = $(this).attr("data-popover-content");
              // return $(title).children(".popover-heading").html();
            }
        }).popover('show');
    }else{
        $(element).popover({
            html : true,
            content: function() {
              return "Chưa có dữ liệu";
            },
            title: function() {
              return "Thông tin";
            }
        }).popover('show');
    }
}

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
$(document).ready(function () {
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $("#request-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/request/list-request-data",
        "lengthChange": false,
        "autoWidth": false,
        "language" : {
            "search" : "Tìm kiếm",
            "paginate" : {
                previous: "<",
                next: ">",
                first: "|<",
                last: ">|"
            },
            "searchPlaceholder": "SDT, Tên, Email, IDs",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
            "emptyTable": "Chưa có dữ liệu",
            "infoEmpty": "",
        },
        "columns": [
            {data: "requestId",render:function(data,type,object){
                var agentInfo = '';
                if(object.agentName != null){
                    agentInfo = object.agentName != null ? object.agentName : 'N/A';
                    agentInfo = ' <a data-toggle="tooltip" title="Môi giới: '+agentInfo+'" href="#"> <i class="fa fa-black-tie" aria-hidden="true"></i></a>';
                }
                return data + agentInfo; 
            }},
            {data: "dealId", orderable: false, render:renderLeadDealID},
            {data: "leadId", orderable: false, render: renderLeadDealID},
            {data: "name", render: renderNameLink, orderable: false},
            {data: 'tmName', orderable: false, render:renderProfileTM},
            {data: 'baName', orderable: false, render:renderProfileUser},
            {data: "createdDate", render: dateRender},
            {data: "updatedDate", render: dateRender, visible:false},
            {data: "listingTypeName", orderable: false, render:function(data,type,object){
                if(object.needListingTypeId != object.listingTypeId){
                    return object.listingTypeName+"<br/><small>"+data+"</small>";    
                }else{
                    return data;
                }
                
            }},
            {data: "propertyTypeGroupName", orderable: false, render: renderPropertyTypeGroup},
            {data: "propertyTypeName", orderable: false, render:function(data,type,object){
                if(object.needPropertyTypeId != object.propertyTypeId){
                    return "<b>"+object.needPropertyTypeName+"</b><br/><small>"+data+"</small>";    
                }else{
                    return data;
                }
                
            }},
            {data: "formatPrice"},
            {data: "sourceName", orderable: false},
            {data: "requestId", orderable: false, render: renderAction, visible: false}
        ],
        "order": [[ 11 , "desc" ]]
    });

    $(".fromDate").datepicker({
        "format": "dd/mm/yyyy"
    });
    $(".toDate").datepicker({
        "format": "dd/mm/yyyy"
    });

    $(".btn-export").click(function () {

        var exportUrl = "/report/export-report/request-list";

        var fromDate = $(".fromDate").val().trim();
        if(fromDate!=""){
            fromDate = moment(fromDate, "DD/MM/YYYY").unix()*1000;
            exportUrl += "?fromDate=" + fromDate;
        }else{
            exportUrl += "?fromDate=" + 0;
        }

        var toDate = $(".toDate").val().trim();
        if(toDate!=""){
            toDate = moment(toDate, "DD/MM/YYYY").unix()*1000;
            exportUrl += "&toDate=" + toDate;
        }else{            
            exportUrl += "&toDate=" + (moment().unix()*1000);
        }

        showPropzyLoading();
        $.post(exportUrl, {}, function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
        return false;
    });

    $(".btn-import").click(function () { 
        $("#modalImportGoogleSheets").modal('show');

        $('.container-error').hide();
        $('.container-modal').show();
        $('.btn-choose').show();
        $('.btn-cancel').removeClass('btn-primary');
        $('.btn-cancel').text('Hủy');
        $('.error-content').text('');
    })

    var ModalImportGoogleSheets = (function () {
        var myModal = $("#modalImportGoogleSheets");

        myModal.find(".btn-cancel").on("click", function () {
            myModal.modal("hide");
        });

        myModal.find(".btn-choose").on("click", function () {
            var inputSheetsValue =  $('.url-input').val();
            if (inputSheetsValue) {
                var sheetId = inputSheetsValue.split('/d/')[1].split('/edit')[0];

                showPropzyLoading();
                $.ajax({
                    "url": '/report/import-leads-from-url?sheetId=' + sheetId,
                    "type": "get"
                }).done(function (response) {
                    if (response.code == 200) {
                        if (response.data && response.data.errors.length == 0) {
                            $("#modalImportGoogleSheets").modal('hide');
                            showPropzyAlert(response.message);
                            setTimeout(function() {
                                window.location.reload();
                            }, 3000)
                        } else {
                            $('.container-error').show();
                            $('.container-modal').hide();
                            $('.btn-choose').hide();
                            $('.btn-cancel').addClass('btn-primary');
                            $('.btn-cancel').text('OK');
    
                            $('.error-content').text('');
                            response.data.errors && response.data.errors.map(item => {
                                item.messageFormat && $('.error-content').append(`<p>${item.messageFormat}</p>`);
                                item.messageConvert && $('.error-content').append(`<p>${item.messageConvert}</p>`);
                            })
                        }
                    } else {
                        $('.container-error').show();
                        $('.container-modal').hide();
                        $('.btn-choose').hide();
                        $('.btn-cancel').addClass('btn-primary');
                        $('.btn-cancel').text('OK');

                        $('.error-content').text('');
                        response.message ? $('.error-content').append(`<p>${response.message}</p>`) : '';
                    }
                }).always(function () {
                    hidePropzyLoading();
                });
            }
        });
       
    })();
});