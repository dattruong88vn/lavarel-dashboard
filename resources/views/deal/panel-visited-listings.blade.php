<section class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Sản phẩm đã xem</h3>
    </div>
    <div class="box-body">
        <table class="table table-bordered table-striped" id="datatableVisitedListings">
            <thead>
                <tr>
                    <th data-orderable="false">Chọn</th>
                    <th data-orderable="false">Ngày đi xem</th>
                    <th style="width:50px">LID - TTGD</th>
                    <th style="width:50px">Trạng thái ảo</th>
                    <th data-orderable="false">Hình</th>
                    <th data-orderable="false">Giấy chủ quyền</th>
                    <th >Giá thương lượng thấp nhất</th>
                    <th >Phân loại</th>
                    <th>Giá</th>
                    <th>Diện tích (Dài x Rộng)</th>
                    <th data-orderable="false" style="width:200px">Địa chỉ</th>
                    <th data-orderable="false">TT chủ tin đăng</th>
                    <th>Số ngày live</th>
                    <th>Số ngày từ lần cuối cập nhật</th>
                    <th>Hướng</th>
                    <th>Năm XD</th>
                    <th>Điểm</th>
                </tr>
            </thead>
        </table>
    </div>
    <div class="box-footer">

        <a href="#" class="btn btn-success martop-txt btnOpenScheduleForm" data-from-table="datatableVisitedListings_wrapper">Đặt lịch xem</a>
        <a href="#" class="btn btn-success btnOpenEmailForm" data-from-table="#datatableVisitedListings_wrapper">Gửi email lại</a>
        <button type="button" class="btn btn-success btnShowTransferPSForm" data-from-table='#datatableVisitedListings_wrapper'>Chuyển PS</button>
        <a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="datatableVisitedListings_wrapper" data-status="2">Xem xét</a>
        <a href="#" class="btn btn-warning martop-txt btn-change-status"  data-table-id="datatableVisitedListings_wrapper" data-status="6">Thương lượng</a>
        <a href="#" class="btn btn-warning martop-txt btn-change-status"  data-table-id="datatableVisitedListings_wrapper" data-status="3">Đặt cọc</a>
    </div>
</section>
<script type="text/javascript">
    var VisitedListings = (function () {
        var dataTable = null;
        var myTable = $("#datatableVisitedListings");
        var showTable = function (dealId) {
            try {
                dataTable.destroy();
            } catch (Ex) {
            }
            showPropzyLoading();
            $.fn.dataTableExt.sErrMode = 'throw';
            dataTable = myTable.DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": "/deal/visited-listings/?dealId=" + dealId,
                "scrollX": true,
                "paging": false,
                //"ordering": false,
                //"lengthChange": false,
                //"searching": false,
                "columns": [
                    {"data": "rlistingId", render: ProductRender.renderSelectListing},
                    {"data": "scheduleTime", render: renderSheduleTime},
                    {"data": "rlistingId", render: ProductRender.renderRlistingId},
                    {"data": "virtualStatus", render: renderVirutalStatus},
                    {"data": "photo.link", render: ProductRender.renderListingImage},
                    {"data": "pinkBookPhotos", render: ProductRender.renderUseRightImages},
                    {"data": "formatMinPrice"},
                    {"data": "valuationType"},
                    {"data": "formatPrice"},
                    {"data": "formatSize", render: ProductRender.renderSize},
                    {"data": "address"},
                    {"data": "ownerName", render: ProductRender.renderOwner},
                    {"data": "liveDate"},
                    {"data": "updatedDate", render: ProductRender.renderListingCountDayFromLastUpdate},
                    {"data": "directionName"},
                    {"data": "yearBuilt"},
                    {"data": "percentValue"}
                ],
                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {
                    hidePropzyLoading();
                },
                "createdRow": function (row, data, index) {
                    if (data.isOverOne) {
                        $(row).addClass("listing-over-one");
                        $(row).attr("title", "Listing xem nhiều lần");
                    }
                }
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
        var renderSheduleTime = function (data, type, object) {
            if (!data) {
                return "";
            }
            var returnValue = moment(data).format("D/M/YYYY");
            if (object.dismissFrom) {
                returnValue += "<div>" + object.dismissFrom + "</div>";
            }
            return returnValue;
        };

        $(".btnDoneAddListingToSchedule").on("click", function (event) {
            var modalAddListing = $("#modalAddListings");
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
            showPropzyLoading();
            $.ajax({
                url: "/deal/add-listings-to-schedule",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                $("#modalAddListings").modal("hide");
                showPropzyAlert(response.message);
                if (response.result) {
                    window.location.reload();
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });



        var renderVirutalStatus = function (data, type, object) {
            if (object.isMarked) {
                data = data + "<i class='glyphicon glyphicon-warning-sign text-red pull-right'></i>";
            }
            return data;
        };


        return {
            showTable: showTable
        };
    })();
</script>