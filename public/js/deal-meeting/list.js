var MeetingList = (function(){
    var myDataTable = null;
    var currentSelectedStatus = [];
    var statusNames = [];
    var postData = null;
    var fromDate = null;
    var toDate = null;
    function loadDataTable(){
        try{
            myDataTable.destroy();
        }catch(ex){
            console.log(ex);
        }
        var requestUrl = "/deal-meeting/list-data?_ajax=1&listingTypeId=" + $('#listingTypeId').val()+"&propertyTypeId=" + $('#propertyTypeId').val();
        myDataTable = $("#request-list").DataTable({
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
                "searchPlaceholder": "Deal ID, tên KH,  điện thoại KH",
                "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                "emptyTable": "Chưa có dữ liệu",
                "infoEmpty": "",
            },
            "ordering": false,
            "columns": [
                {data: "dealId", render: function(data, type, object){
                    
                        var render = [];
                        $.each(object.meetingItems,function(k,v){
                            if(v.dealId != null){
                                render.push('DealId: '+"<a href='/deal/detail/"+v.dealId+"' target='_blank' >"+v.dealId+"</a>");
                            }else{
                                render.push('LeadId: '+"<a href='/lead/detail/"+v.id.leadId+"' target='_blank' >"+v.id.leadId+"</a>");
                            }
                        })
                        return render.join('<br/>');
                    
                    // return "<a href='/deal/detail/"+data+"' target='_blank' >"+data+"</a>"; //<a onclick='showUpdateOrCreateMeetingForm("+object.id+")' href='#'>sửa</a>
                }, orderable: false},
                // {data: "leadId", render: function(data, type, object){
                //     var render = [];
                //     $.each(object.meetingItems,function(k,v){
                //         if(v.dealId != null){
                //             render.push('DealId: '+"<a href='/deal/detail/"+v.dealId+"' target='_blank' >"+v.dealId+"</a>");
                //         }else{
                //             render.push('LeadId: '+"<a href='/lead/detail/"+v.id.leadId+"' target='_blank' >"+v.id.leadId+"</a>");
                //         }
                //     })
                //     return render.join('<br/>');
                // }, orderable: false, visible: !isCrm},
                {data: "customerName",render:function(data,type,object){
                  if(!isCrm && object.statusId != 2 || !isCrm && object.isBACancelMeeting ){
                    return data + " <a onclick='showUpdateOrCreateMeetingForm("+object.id+")' href='#'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>";
                  }else if(isCrm && object.statusId == 2 && !object.isBACancelMeeting){
                    return data + " <a onclick='showUpdateOrCreateMeetingForm("+object.id+",\"deal\")' href='#'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>";
                  }
                  return data;
                }},
                {data: 'reminderDate', render: dateRender},
                {data: "createdByName", orderable: false},
                {data: "assignName", orderable: false},
                {data: "createdDate", render: dateRender},
                {data: "tcName"},
                {data: "isAccepted", render: function(data, type, object){
                    if(data==null){
                        return "Chờ chấp nhận";
                    }
                    if(data==false){
                        return "Đã từ chối";
                    }
                    if(data==true){
                        return "Đã chấp nhận"
                    }
                }, visible: false},
                {data:'statusName',orderable:false,render: function(data,type,object){
                    if(object.reasonName != null){
                        data += '<br/>Lý do: '+object.reasonName;
                        if(object.noteCancelMeeting != null){
                            data += ' <a data-placement="top" data-toggle="tooltip" title="Ghi chú: '+object.noteCancelMeeting+'" href="#"><i class="fa fa-sticky-note-o" aria-hidden="true"></i></a>'
                        }
                    }
                    return data;
                }},
                {data: "id", render: renderAction, orderable: false},
            ],
            "order": [[ 3 , "desc" ]],
            "drawCallback": function(settings){
            }
        });
    }

    function init(){
        $('#btn_filter_button_meeting').click(function(){
            loadDataTable();
        });
    }

    var renderAction = function (data, type, object) {
        if(isCrm&&!isCurrentAdmin || isCrm&&isCurrentAdmin&&currentUser.userId==object.assignTo){
            if(object.isBACancelMeeting){ // meeting báo hủy
                return "";
            }
            if (!data) {
                return "";
            }
            var id = data;
            data = "";
            if(object.statusId != 1)
                data = '<a href="#" class="btn btn-primary btnDone" onclick="return MeetingList.doneMeeting('+ id + ');" >Hoàn tất</a>';
            if(!object.isDone)
                data += '<a href="#" class="btn btn-danger" style="margin-top:5px" onclick="deleteMeetingConfirm('+ id + ');" >Báo hủy</a>';
            // data += "<a href='#' class='btn btn-danger' onclick=\"return MeetingList.deleteMeeting('" + data + "');\" >Hủy</a>";
            return data;
        }else{
            return "";
        }
    };

    var renderNameLink = function (data, type, object) {
        return data;
        // return "<a href='/request/detail/" + object.requestId + "'>" + data + "</a>";
    };

    function deleteRequest(id) {
        if (!confirm("Bạn có chắc chắn muốn xóa meeting này?")) {
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
    };

    function doneMeeting(meetingId){
        showPropzyLoading();
        $.ajax({
            "url": "/deal-meeting/done",
            "type": "post",
            "data": JSON.stringify({
                "meetingId": meetingId
            })
        }).done(function (response) {
            if (!response.result) {
                $.confirm({
                    title: 'Hệ thống',
                    content: response.message,
                    buttons: {
                        cancle: {
                            text: 'Ở lại trang này',
                            btnClass: 'btn-default',
                            action: function(){
                                // $.alert('Ở lại trang này');
                            }
                        },
                        continue: {
                            text: 'Tiếp tục',
                            btnClass: 'btn-blue',
                            action: function(){
                                window.location = "/crm-dashboard/task-detail/" + response.data.taskId + "?defineId=" + response.data.defineId;
                            }
                        }
                    }
                });
            }else{
                MeetingList.loadDataTable();
            }
            // return false;
            // if (response.result) {
            //     myModal.modal('hide');
            //     MeetingList.loadDataTable();
            //     myModal.find(".tCId").val(-1);
            //     myModal.find(".address").val("");
            //     myModal.find("#long").val("");
            //     myModal.find("#lat").val("");
            //     // if (postData.reasonId == 3) {
            //     window.location = "/crm-dashboard/task-detail/" + response.data.taskId + "?defineId=" + response.data.defineId;
            //     // }
            // }
            // showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
        // ModalDoneMeeting.showModal({
        //     "meetingId": meetingId
        // });
    }


    return {
        "loadDataTable": loadDataTable,
        "doneMeeting": doneMeeting,
        "init" : init
    };
})();

$(document).ready(function () {
    MeetingList.init();
    MeetingList.loadDataTable();
});
