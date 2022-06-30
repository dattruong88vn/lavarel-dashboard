<?php $showType = !empty($showType) ? $showType : null; ?>
<section class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Giỏ hàng của khách hàng</h3>
    </div>
    <div class="box-body">
        <table class="table table-bordered table-striped" id="datatableCustomerCart" style="width:1600px;overflow-x: scroll;">
            <thead>
                <tr>
                    <th data-orderable="false">Chọn</th>
                    <th style="max-width: 200px">LID</th>
                    <th width="100px">Trạng thái ảo</th>
                      <th >Mức yêu thích</th>
                      <th style="">Phân loại</th>
                      <th style="">Trạng thái</th>
                      <th style="">Hình nhà</th>
                      <th style="">Hình sổ</th>
                      <th style="">Giá</th>
                      <th >Diện tích (D x R)</th>
                      <th width="300px">Địa chỉ</th>
                      <th style="">Loại listing</th>
                      <th style="">Hướng</th>
                      
                    <!-- <th style="width:50px">LID - TTGD</th>
                    <th style="width:50px">Trạng thái ảo</th>
                    <th data-orderable="false">Hình</th>
                    <th data-orderable="false">Giấy chủ quyền</th>
                    <th >Giá thương lượng thấp nhất</th>
                    <th >Phân loại</th>
                    <th>Giá</th>
                    <th>Diện tích (Dài x Rộng)</th>
                    <th data-orderable="false" style="width:200px">Địa chỉ</th> -->
                    <!-- <th data-orderable="false">TT chủ tin đăng</th> -->
                    <!-- <th>Số ngày live</th>
                    <th>Số ngày từ lần cuối cập nhật</th>
                    <th>Hướng</th>
                    <th>Năm XD</th>
                    <th>Điểm</th> -->
                </tr>
            </thead>
        </table>
        <hr>
        <div>
            <?php if ($showType == 'add_listing_to_schedule'): ?>
                <button class="btn btn-primary btnDoneAddListingToSchedule" type="button" data-from-table="datatableCustomerCart"><i class="fa fa-plus" aria-hidden="true"></i> Thêm</button>
            <?php else: ?>
                <button class="btn btn-success btnShowModalQuickCheckListings" type="button" data-from-table="datatableCustomerCart">Quick check</button>
                <a href="#" class="btn btn-success martop-txt btnOpenScheduleForm" data-from-table="datatableCustomerCart">Đặt lịch xem</a>
                <button type="button" class="btn btn-success btnShowTransferPSForm" data-from-table='#datatableCustomerCart_wrapper'>Chuyển PS</button>
            <?php endif; ?>
            <button type="button" class="btn btn-link" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Đóng</button>
        </div>
    </div>
</section>
<!--MODAL LISTING DETAIL -->
<!-- <div id = "listingDetailModal" class = "modal fade" role = "dialog"> -->

</div> <!-- \ MODAL LISTING DETAIL -->
<script type="text/javascript">
    var dateTimeRender = function (data, type, object) {
        if (!data)
            return "";
        return $.format.date(new Date(data), "dd/MM/yyyy HH:mm:ss");
    };

    var renderPhoto = function(data,type,object){
      var returnValue = "NA";
      if (object.photo != 'NA' && object.photo && object.photo.link) {
          returnValue = '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.photo.link + '" />'
          returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.photoUrls || [object.photo.link]) + '</div>';

      }
      return returnValue;
    }

    var renderRedOrPinkBook = function (data, type, object) {
        returnValue = "";
        // if (object.photo && object.photo.length > 0) {
        //     returnValue += '<img class="redBookPhoto" style="width:48px;height: auto;" src="' + object.photo[0] + '" />';
        //     returnValue += '<div class="redBookPhotos hidden">' + JSON.stringify(object.photo) + '</div>';
        // }
        if (object.pinkBookPhotos && object.pinkBookPhotos.length > 0 && object.pinkBookPhotos != 'NA') {
            returnValue += '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.pinkBookPhotos[0] + '" />';
            returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.pinkBookPhotos) + '</div>';

        }else if(object.redBookPhotos && object.redBookPhotos.length > 0 && object.redBookPhotos != 'NA'){
          returnValue += '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.redBookPhotos[0] + '" />';
          returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.redBookPhotos) + '</div>';
        }
        return returnValue;
    };

    var renderEventContent = function (data, type, object) {
        var returnVal = "";
        if(object.scheduleTime){
            returnVal+= moment(object.scheduleTime).format('DD/MM/YYYY HH:mm:ss')+"<br/>";
        }
        if(data===null){
            data="";
        }
        returnVal += "<div class='textContainer_Truncate'>" + data + "</div>";
        return returnVal;
    };

    var modalListingDetail = function(data,type,object){
      console.log(object.listingAction)
      var label = "";
      if(object.listingAction){
        switch(object.listingAction) {
            case "sent_sms":
                label = '<small class="label bg-blue">Đã SMS</small>'
                break;
            case "diy_not_available":
                label = '<small class="label bg-orange">DIY (không còn trống)</small>'
                break;
            case "portal":
                label = '<small class="label bg-blue">ĐLX Portal</small>'
                break;
            case "matched":
                label = '<small class="label bg-green">Matched</small>'
                break;
            case "sent_mail":
                label = '<small class="label bg-green">Đã Email</small>'
                break;
            case "scheduled":
                label = '<small class="label bg-blue">Đã đi tour</small>'
                break;
            case "sent_sms_and_email":
                label = '<small class="label bg-green">Đã SMS & Email</small>'
                break;
            case "liked":
                label = '<small class="label bg-red">Yêu thích</small>'
                break;
            case "rejected":
                label = '<small class="label bg-orange">Từ chối hợp tác</small>'
                break;
            case "rented":
                label = '<small class="label bg-orange">Đã bán</small>'
                break;
            case "deactivated":
                label = '<small class="label bg-orange">Tạm ngưng giao dịch</small>'
                break;
            case "deactivated_by_saas":
                label = '<small class="label bg-orange">Tạm ngưng từ SaaS</small>'
                break;
            default:
                label = ""
        }  
      }
      
      return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage("+data+");return false;'>"+data+"</a> " + label;

      // return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage("+data+")'>"+data+"</a>"
    }

    var modalListingDetailForLikeTable = function(data,type,object){
      // console.log('modalListingDetailForLikeTable');
      var label = "";
      var dateDLX = "";
      if(object.addedTime && object.addedTime != null && object.addedTime != 'NA'){
        dateDLX = ' ('+$.format.date(new Date(object.addedTime), "dd/MM/yyyy HH:mm:ss")+')';
      }
      var dateAddGaneral = "";
      if(object.createdBasketDate && object.createdBasketDate != null && object.createdBasketDate != 'NA'){
        dateAddGaneral = ' ('+$.format.date(new Date(object.createdBasketDate), "dd/MM/yyyy HH:mm:ss")+')';
      }

      if(object.listingAction){
        switch(object.listingAction) {
            case "portal":
                label = '<small class="label bg-blue">ĐLX Portal'+dateDLX+'</small>'
                break;
            case "diy_not_available":
                label = '<small class="label bg-orange">DIY (không còn trống)</small>'
                break;
            case "matched":
                label = '<small class="label bg-green">Matched'+dateDLX+'</small>'
                break;
            case "liked":
                label = '<small class="label bg-red">Yêu thích</small>'
                break;
            case "rejected":
                label = '<small class="label bg-orange">Từ chối hợp tác</small>'
                break;
            case "rented":
                label = '<small class="label bg-orange">Đã bán</small>'
                break;
            case "deactivated":
                label = '<small class="label bg-orange">Tạm ngưng giao dịch</small>'
                break;
            case "deactivated_by_saas":
                label = '<small class="label bg-orange">Tạm ngưng từ SaaS</small>'
                break;
            case "sent_sms":
                label = '<small class="label bg-blue">Đã SMS</small>'
                break;
            case "portal":
                label = '<small class="label bg-blue">ĐLX Portal</small>'
                break;
            case "matched":
                label = '<small class="label bg-green">Matched</small>'
                break;
            case "sent_mail":
                label = '<small class="label bg-green">Đã Email</small>'
                break;
            case "scheduled":
                label = '<small class="label bg-blue">Đã đi tour</small>'
                break;
            case "sent_sms_and_email":
                label = '<small class="label bg-green">Đã SMS & Email</small>'
                break;
            case "liked":
                label = '<small class="label bg-red">Yêu thích</small>'
                break;
            case "rejected":
                label = '<small class="label bg-orange">Từ chối hợp tác</small>'
                break;
            case "rented":
                label = '<small class="label bg-orange">Đã bán</small>'
                break;
            case "deactivated":
                label = '<small class="label bg-orange">Tạm ngưng giao dịch</small>'
                break;
            case "deactivated_by_saas":
                label = '<small class="label bg-orange">Tạm ngưng từ SaaS</small>'
                break;
            default:
                label = ""
        }  
      }
      
      return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage("+data+");return false;'>"+data+"</a> " + label;
    }

    var renderS = function(data,type,object){
      return object.floorSize + ' (' + object.sizeWidth + " x " + object.sizeLength + ')'; // làm tròn xuống
    }
    var CustomerCart = (function () {
        var dataTable = null;
        var myTable = $("#datatableCustomerCart");
        var modalAddListing = $("#modalAddListings");
        var showCart = function (dealId, listingIds = []) {
            try {
                dataTable.destroy();
            } catch (Ex) {
            }
            showPropzyLoading();
            $.fn.dataTableExt.sErrMode = 'throw';
            var dataUrl = "/deal/customer-cart-data/?dealId=" + dealId;
            if (modalAddListing.find(".scheduleId").val()) {
                dataUrl += "&scheduleId=" + modalAddListing.find(".scheduleId").val();
            }
            dataTable = myTable.DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                  "url": dataUrl,
                  "type": "POST",
                  "data": { listingIds }
                },
                "scrollX": true,
                "paging": false,
                //"ordering": false,
                //"lengthChange": false,
                "searching": false,
                "columns": [
                    {"data": "rlistingId", render: ProductRender.renderSelectListing},
                    {data: 'rlistingId', orderable: false, render:modalListingDetailForLikeTable},
                    {data: 'virtualStatus', orderable:false, className: 'virtualStatus'}, // add class to find this column for updating content after execute check empty
                    {data: 'levelLike', orderable:false},
                    {data: 'valuationType', orderable:false},
                    {data: 'legal', orderable:false}, // format html
                    {data: 'rlistingId', orderable:false, render:renderPhoto},
                    {data: 'pinkBookPhotos', orderable:false, render:renderRedOrPinkBook},
                    {data: 'formatPrice', orderable:true},
                    {data: 'lotSize', orderable:false, render: renderS},
                    {data: 'address', orderable:false},
                    {data: 'sourceBy', orderable:false},
                    {data: 'directionName', orderable:false}
                    
                ],
                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {
                    hidePropzyLoading();
                },
                "createdRow": function (row, data, index) {
                    // if (data.fromSchedule) {
                    //     $(row).addClass("listing-from-schedule");
                    //     $(row).attr("title", "Listing được đặt lịch xem");
                    // }
                },
                "drawCallback": function () {
                    JMDetail ? JMDetail.openPhoto() : ''; // load function open Photos
                      // *****************************
                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                        pagination.toggle(this.api().page.info().pages > 1);
                },
            });
            myTable.on('draw.dt', function () {
                initBookPhotos();
                defineNoteFunction();
                $('.getLogListing').on('click', function (e, value) {
                    event.preventDefault();
                    var listingID = $(this).attr('data-listing-id');
                    getLogListing(listingID);
                });
            });
        };

        $(".btnDoneAddListingToSchedule").on("click", function (event) {
            event.preventDefault();
            var postData = {
                "scheduleId": parseInt(modalAddListing.find(".scheduleId").val()),
                "listingIds": []
            };
            modalAddListing.find(".select-listing:checked").each(function () {
                var listingId = $(this).val();
                if (listingId) {
                    postData.listingIds.push(parseInt(listingId));
                }
            });
            if (postData.listingIds <= 0) {
                $("#modalAddListings").modal("hide");
                return false;
            }
            var resultStatusListing = getStatusOfListings(postData.listingIds);
            // console.log(resultStatusListing);return false;
            if(resultStatusListing.result == false){
                runAddListingTotour(postData)
            }else{
                bootbox.confirm({
                    message: resultStatusListing.messages,
                    buttons: {
                        confirm: {
                            label: 'Tiếp tục',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'Hủy',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if(result){
                            runAddListingTotour(postData)
                        }
                    }
                });
            }
            
        });

        function runAddListingTotour(postData){
            showPropzyLoading();
            $.ajax({
                url: "/deal/add-listings-to-schedule",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if((response.code=='405') && !$.isEmptyObject(response.data)){
                    response.message ='';
                    $.each(response.data,function (key,item) {
                        response.message +='<div style="padding:10px; margin-bottom: 10px; font-weight: bold; border-radius: 3px; border:1px solid #eee;">'+item.message+'</div>';
                    });
                }
                showPropzyAlert(response.message);
                if (response.result) {
                    $("#modalAddListings").modal("hide");
                    window.location.reload();
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }



        var renderVirutalStatus = function (data, type, object) {
            if (object.isMarked) {
                data = data + "<i class='glyphicon glyphicon-warning-sign text-red pull-right'></i>";
            }
            return data;
        };


        return {
            showCart: showCart
        };

    })();
</script>