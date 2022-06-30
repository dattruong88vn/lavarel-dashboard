<section class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Giỏ hàng của tôi</h3>
    </div>
    <div class="box-body">
        <table class="table table-bordered table-striped" id="datatableListingCart" style="width:1600px;overflow-x: scroll;">
            <thead>
                <tr>
                    <th data-orderable="false">Chọn</th>
                    <th style="width:50px">LID - TTGD</th>
                    <!--<th style="width:50px">Trạng thái ảo</th>-->
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
        <div>

            <?php if ($currentGroup['departmentId'] == 12): ?>
                <button class="btn btn-success btnAddListingsToCustomerCollection " type="button" data-from-table="datatableListingCart">Thêm vào BST</button>
                <a href="" class="btn btn-success btnViewCustomerCollection " target="_blank" data-from-table="datatableListingCart">Xem BST</a>
            <?php endif; ?>
            <a href="#" class="btn btn-success btnOpenEmailForm" data-from-table="#datatableListingCart_wrapper">Email to KH</a>
            <button class="btn btn-success btnAddListingsToCustomerCart hidden" type="button" data-from-table="datatableListingCart">Bỏ vào giỏ hàng của KH</button>
            <button type="button" class="btn btn-success btnShowTransferPSForm" data-from-table='#datatableListingCart_wrapper'>Chuyển PS</button>
        </div>
    </div>
</section>


<script type="text/javascript">

    var MyCart = (function ()
    {
        var datatableListingCart = null;
        var getListingCart = function ()
        {
            try {
                datatableListingCart.destroy();
            } catch (Ex) {
            }
            showPropzyLoading();
            $.fn.dataTableExt.sErrMode = 'throw';
            datatableListingCart = $("#datatableListingCart").on('xhr.dt', function (e, settings, json, xhr) {
                if (json.basketId) {
                    var link = agentSiteUrl + "?accessToken=" + currentUserWebAccessToken + "&basketId=" + json.basketId + "&dealId=" + dealId + "&dashboardAction=dashboard-basket-detail";
                    $(".btnViewCustomerCollection").attr("href", link);
                    $(".btnViewCustomerCollection").show();
                } else {
                    $(".btnViewCustomerCollection").hide();
                }
            }).DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": "/deal/get-listing-cart-list/?leadId=" + leadId,
                "scrollX": true,
                "paging": false,
                //"ordering": false,
                //"lengthChange": false,
                //"searching": false,
                "columns": [
                    {"data": "rlistingId", render: renderViewingSelectListing, width: "50px"},
                    {"data": "rlistingId", render: ProductRender.renderRlistingId},
                    //{"data": "virtualStatus"},
                    {"data": "photo.link", render: ProductRender.renderListingImage},
                    {"data": "pinkBookPhotos", render: renderUseRightImages},
                    {"data": "formatMinPrice"},
                    {"data": "valuationType"},
                    {"data": "formatPrice"},
                    {"data": "formatSize", render:ProductRender.renderSize},
                    {"data": "address", width: "80px"},
                    {"data": "ownerName", render: renderOwner},
                    {"data": "liveDate"},
                    {"data": "updatedDate", render: ProductRender.renderListingCountDayFromLastUpdate, width: "60px"},
                    {"data": "directionName"},
                    {"data": "yearBuilt"},
                    {"data": "percentValue"}
                ],
                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {
                    hidePropzyLoading();
                },
                "createdRow": function (row, data, index) {
                    if (data.isInBasket) {
                        $(row).addClass("in-basket");
                        $(row).attr("title", "Listing trong bộ sưu tập");
                    }
                }
            });
            $('#datatableListingCart').on('draw.dt', function () {
                initBookPhotos();
                defineNoteFunction();
                defineGetLogListing();
            });
        }

        return {
            getListingCart: getListingCart
        };

    })();
    // ------------------------------

</script>