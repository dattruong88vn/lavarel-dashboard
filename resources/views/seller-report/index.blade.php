@extends('layout.default')

@section('content')
<h2 style="border-bottom: 3px solid #3498db">Seller Report</h2>


<!-- row 1 -->
<div class="row">
    <div class="col-xs-2">Từ ngày</div>
    <div class="col-xs-2">Đến ngày</div>
    <div class="<?php echo !empty($bsaList) ? "col-xs-1": "col-xs-2" ?>" style="<?php echo !empty($bsaList) ? "padding: 0px": "" ?>">Id listing</div>
    <div class="col-xs-3 bsaInchargeLabel">BSA phụ trách</div>
    <div class="col-xs-4" style="<?php echo !empty($bsaList) ? "padding: 0px": "" ?>">Trạng thái</div>
</div>

<!-- row 2 -->
<div class="row">
    <div class="col-xs-2">
        <div class="input-group">
            <input autocomplete="off" type="text" name="fromDate" class="fromDate form-control datepicker" />
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
    </div>
    <div class="col-xs-2">
        <div class="input-group">
            <input autocomplete="off" type="text" name="toDate" class="toDate form-control datepicker" />
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
    </div>
    <div class="<?php echo !empty($bsaList) ? "col-xs-1": "col-xs-2" ?>" style="<?php echo !empty($bsaList) ? "padding: 0px": "" ?>"><input autocomplete="off" type="number" class="listingId form-control" /></div>
    <!-- bsa incharge -->
    <div class="col-xs-3 bsaInchargeContainer">
        <select class="bsaIncharge">
            <option value="">-- Vui lòng chọn --</option>
            @if ($bsaList)
                @foreach ($bsaList as $bsa)
                    <option value="{{$bsa->userId}}">{{$bsa->name}}</option>
                @endforeach
            @endif
        </select>
    </div>
    <!-- status -->
    <div class="col-xs-2" style="<?php echo !empty($bsaList) ? "padding: 0px": "" ?>">
        <select class="form-control status">
            <option value="">Tất cả</option>
            <option value="0">Chưa xem</option>
            <option value="1">Đã xem</option>
        </select>
    </div>
    <div class="col-xs-2">
        <button class="btn btn-primary btn-find">Tìm kiếm</button>
        <button class="btn btn-default btn-clear-filter">Xóa</button>
    </div>
</div>

<table id="table-seller-report-tracking" class="table table-bordered table-striped">
    <thead>
        <tr>
            <th width="10%">Listing ID</th>
            <th>Chủ nhà</th>
            <th>Thời gian gửi report</th>
            <th>Channel</th>
            <th>Trạng thái</th>
            <th>Channel đã xem</th>
            <th>Action</th>
            <th>Lading page</th>
            <th>BSA phụ trách</th>
            <th>Report</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
    <tfoot>

    </tfoot>
</table>

@stop

@section('page-js')

<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>

<script>
    var fromDate = undefined;
    var toDate = undefined;

    $(document).ready(function() {

        $('.bsaIncharge').selectize({
            create: false,
            //sortField: 'text'
            onType: function(str) { str || this.$dropdown_content.removeHighlight(); },
            onChange: function() {this.$dropdown_content.removeHighlight(); }
        });

        fromDate = $(".fromDate").datepicker({
            format: 'dd/mm/yyyy',
            showOtherMonths: true,
            selectOtherMonths: true,
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            todayHighlight: true,
        });
        toDate = $(".toDate").datepicker({
            format: 'dd/mm/yyyy',
            showOtherMonths: true,
            selectOtherMonths: true,
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            todayHighlight: true,
        });

        $(".btn-clear-filter").click(function() {
            $(".fromDate").val(null);
            $(".toDate").val(null);
            $(".listingId").val(null);
            $(".bsaIncharge").val(null);
            $(".status").val(null);
        });
        $(".btn-find").click(function() {
            gridReport.ajax.reload();
        });
    });

    let isManager = <?php echo !empty($bsaList) ? "true": "false" ?>;
    var gridReport = $("#table-seller-report-tracking").DataTable({
        bFilter: false,
        bLengthChange: false,
        pageLength: 25,
        serverSide: true,
        processing: true,
        ajax: {
            "url": "tracking-seller-report/get-report-history",
            "contentType": "application/json",
            "type": "POST",
            "data": function(d) {
                return JSON.stringify(Object.assign(d, {
                    fromDate: moment($(".fromDate").val() + " 00:00", "DD/MM/YYYY HH:mm").toDate().getTime(),
                    toDate: moment($(".toDate").val() + " 23:59", "DD/MM/YYYY HH:mm").toDate().getTime(),
                    listingId: $(".listingId").val(),
                    bsaIncharge: $(".bsaIncharge").val(),
                    status: $(".status").val()
                }));
            },
            "complete": function(d) {
                //isManager = d.responseJSON.isManager;
                gridReport.column(8).visible(isManager)
                isManager ? $('.bsaInchargeLabel').show() : $('.bsaInchargeLabel').hide();
                isManager ? $('.bsaInchargeContainer').show() : $('.bsaInchargeContainer').hide();
            }
        },
        columns: [{
                width: "60px",
                data: "relatedListingId",
                orderable: true,
                render: function(data, type, row, meta) {
                    return '<a href="/pos/sa/detail/' + data + '" target="_blank" data-toggle="" data-target="">' + data + '</a>';
                }
            },
            {
                width: "120px",
                data: "sellerName",
                orderable: false
            },
            {
                width: "80px",
                data: "createdAt",
                orderable: true,
                render: function(data, type, row, meta) {
                    return moment(row.createDate).format("DD/MM/YYYY");
                }
            },
            {
                width: "80px",
                data: "sendChannels",
                orderable: false
            },
            {
                width: "70px",
                data: "status",
                orderable: false,
                render: function(data, type, row, meta) {
                    return data ? 'Đã xem' : 'Chưa xem'
                }
            },
            {
                width: "70px",
                data: "readChannels",
                orderable: false
            },
            {
                data: "actions",
                orderable: false,
                render: function(data, type, row, meta) {
                    let output = "";
                    data.forEach(element => {
                        if (element.request == "price") {
                            output += "- Điều chỉnh giá: Mức giá điều chỉnh mới là: <b>" + number_format(element.data.price) + "</b><br/>";
                        }
                        if (element.request == "info") {
                            output += "- Cập nhật hình ảnh và thông tin: <br/>";
                            element.data.alleyWidth ? output += " &nbsp + Độ rộng hẻm: <b>" + element.data.alleyWidth + " m</b><br/>" : null;
                            element.data.numberFloor ? output += " &nbsp + Kết cấu nhà: <b>" + element.data.numberFloor + " lầu</b><br/>" : null;
                            element.data.bathrooms ? output += " &nbsp + WC: <b>" + element.data.bathrooms + "</b><br/>" : null;
                            element.data.bedrooms ? output += " &nbsp + Phòng ngủ: <b>" + element.data.bedrooms + "</b><br/>" : null;
                            element.data.countDeletedPhotos ? output += " &nbsp + Xóa: <b>" + element.data.countDeletedPhotos + " ảnh</b><br/>" : null;
                            element.data.countNewPhotos ? output += " &nbsp + Thêm: <b>" + element.data.countNewPhotos + " ảnh</b><br/>" : null;
                            element.data.direction ? output += " &nbsp + Hướng: <b>" + element.data.direction + "</b><br/>" : null;
                            element.data.others ? output += " &nbsp + Khác: <b>" + element.data.others + "</b><br/>" : null;
                        }
                        if (element.request == "services") {
                            element.serviceNames ? output += "- Đăng kí dịch vụ hỗ trợ từ Propzy: <b>" + element.serviceNames + "</b><br/>" : null;
                        }
                    });
                    return output;
                }
            },
            {
                width: "90px",
                data: "landingPage",
                orderable: false
            },
            {
                width: "90px",
                data: "bsaName",
                orderable: false,
                visible: isManager
                
            },
            {
                width: "90px",
                orderable: false,
                render: function(data, type, row, meta) {
                    return `<a class="" href="${row.pdf}" target="_blank" >Xem report</a>`;
                }
            }
        ],
        order: [],
        language: {
            search: "Tìm kiếm",
            paginate: {
                previous: "<",
                next: ">",
                first: "|<",
                last: ">|",
            },
            lengthMenu: "Hiển thị _MENU_ trên 1 trang",
            searchPlaceholder: "Deals ID, Tên, Mã KH",
            info: "Hiển thị _START_ đến _END_ của _TOTAL_",
            emptyTable: "Chưa có dữ liệu",
            infoEmpty: "",
        },
        drawCallback: function() {
           
        }
    })
</script>

@stop

@section('page-css')
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
@stop