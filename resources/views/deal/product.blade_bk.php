@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <section>
        <div>
            @include('deal.header-nav')
        </div>
    </section>
    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng đã gửi khách</h3>
        </div>
        <div class="box-body">
            <table id="dataTableSentListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>Tick chọn</th>
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Ngày gửi email listing cho KH</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <button class="btn btn-success btnAddListingsToCustomerCart" type="button" data-from-table="dataTableSentListings">Bỏ vào giỏ hàng của KH</button>

                <a href="#" class="btn btn-success martop-txt btnOpenScheduleForm" data-from-table="dataTableSentListings">Đặt lịch xem</a>
                <a id="btnContinueScheduleForm" href="#" class="btn btn-warning martop-txt" style="display: none;">Cập nhật</a>
                <a id="btnDeactivateEmailListing" href="#" class="btn btn-danger martop-txt">Gửi LS review</a>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng đang đi xem</h3>
        </div>
        <div class="box-body">
            <table id="dataTableSelectedListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>Chọn</th>
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="dataTableSelectedListings" data-status="1">Cần kiểm tra pháp lý</a>
                <a href="#" class="btn btn-warning martop-txt btn-change-status"  data-table-id="dataTableSelectedListings" data-status="2">Cần tham khảo hợp đồng</a>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Giỏ hàng</h3>
        </div>
        <div class="box-body">
            <table id="dataTableFromScheduleListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Note</th>
                        <!--<th>Chọn</th>-->
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div class="hidden">
                <a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="dataTableFromScheduleListings" data-status="1">Cần kiểm tra pháp lý</a>
                <a href="#" class="btn btn-warning martop-txt btn-change-status"  data-table-id="dataTableFromScheduleListings" data-status="2">Cần tham khảo hợp đồng</a>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng khách thích</h3>
        </div>
        <div class="box-body">
            <table id="dataTableLikedListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Note</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="dataTableLikedListings" data-status="3">Đặt cọc</a>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng không được khách thích</h3>
        </div>
        <div class="box-body">
            <table id="dataTableUnlikeListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Lý do không thích</th>
                        <th>Note</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <a id="btnDeactivateUnlikeListing" href="#" class="btn btn-danger martop-txt">Deactive</a>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng cần kiểm tra pháp lý</h3>
        </div>
        <div class="box-body">
            <table id="dataTableLegalCheckListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Note</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="dataTableLegalCheckListings" data-status="3">Đặt cọc</a>
            </div>
        </div>
    </section>
    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng cần tham khảo hợp đồng</h3>
        </div>
        <div class="box-body">
            <table id="dataTableRequestContractListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Note</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="dataTableRequestContractListings" data-status="3">Đặt cọc</a>
            </div>
        </div>
    </section>
    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng khách chọn đặt cọc</h3>
        </div>
        <div class="box-body">
            <table id="dataTableDepositListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <!--<a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="dataTableDepositListings" data-status="3">Đặt cọc</a>-->
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng cần suy nghĩ thêm</h3>
        </div>
        <div class="box-body">
            <table id="dataTableThinkMoreListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Note</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <a href="#" class="btn btn-success martop-txt btn-change-status" data-table-id="dataTableThinkMoreListings" data-status="3">Đặt cọc</a>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tin đăng không khả dụng</h3>
        </div>
        <div class="box-body">
            <table id="dataTableUnavalableListings" class="table table-bordered">
                <thead>
                    <tr>
                        <!--<th>STT</th>-->
                        <th>LID</th>
                        <th>Hình</th>
                        <th>Sổ đỏ</th>
                        <th>Sổ hồng</th>
                        <th>Giá</th>
                        <th>Diện tích</th>
                        <th>% Phù Hợp</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chủ nhà</th>
                        <th>Agent/Owner</th>
                        <th>Quận</th>
                        <th>Hướng</th>
                        <th>Lần đi xem thứ</th>
                        <th>Ngày giờ đi xem</th>
                        <th>Lý do không thích</th>
                        <th>Note</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div>
                <a id="btnDeactivateUnavalableListing" href="#" class="btn btn-danger martop-txt">Deactive</a>
            </div>
        </div>
    </section>

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
                <button class="btn btn-success btnAddListingsToCustomerCart" type="button" data-from-table="datatableListingCart">Bỏ vào giỏ hàng của KH</button>
            </div>
        </div>
    </section>

    @include('deal.panel-customer-cart')
    @include('deal.panel-visited-listings')

</div>
@include('deal.modal-schedule')

<div id="deleteFormListingMyCart" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Xác nhận xóa</h4>
            </div>
            <div class="modal-body">
                <form id="formListingMyCart" method="post">
                    <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
                    <input type="hidden" id="noteMyListingCartId" name="noteMyListingCartId" value="" />
                    <div class="form-group row">
                        <label class="col-sm-12">Vui lòng nhập lý do</label>
                        <div class="col-xs-12">
                            <textarea id="noteDeleteListingMyCart" name="noteDeleteListingMyCart" class="form-control" rows="7"></textarea>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button type="button" id="btnDoDeleteListingMyCart" class="btn btn-danger">Xóa</button>
                        <a href="#" class="btn btn-default" data-dismiss="modal">Bỏ qua</a>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>


<div id="FormNoteMyCart" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Nội dung cần ghi chú</h4>
            </div>
            <div class="modal-body">
                <form id="formListingMyCart" method="post">
                    <div class="form-group row">
                        <div class="col-xs-12">
                            <textarea id="noteListingMyCart" name="noteListingMyCart" class="form-control" rows="7"></textarea>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button type="button" id="btnDoNoteListingMyCart" class="btn btn-success">Cập nhật</button>
                        <a href="#" class="btn btn-default" data-dismiss="modal">Bỏ qua</a>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>

<div id="image-slider" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div id="owl-carousel" class="owl-carousel owl-theme">
                </div>
            </div>
        </div>

    </div>
</div>

<!-- note for listing -->
<div id="noteForListing" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Note cho listing</h4>
            </div>
            <div class="modal-body">
                <form id="formNoteForListing" method="post">
                    <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
                    <input type="hidden" id="noteListingId" name="noteListingId" value="" />
                    <div class="form-group row">
                        <label class="col-sm-2">Nội dung</label>
                        <div class="col-xs-12">
                            <textarea id="noteContent" name="noteContent" class="form-control" rows="7"></textarea>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button type="button" id="btnUpdateNote" class="btn btn-success">Cập nhật</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Bỏ qua</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@include('deal.form-transfer-ps')
@include('shared.modal-show-log-listing')
@include('deal.email-listing-to-customer-modal')
@endsection


@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script type="text/javascript">
var dealId = "{{$deal -> dealId}}";
var leadId = "{{$deal->leadId}}";
var currentAssignTo = "{{$deal->assignedTo}}";
var isBroadcast = false;
var level = 2;
var firstRun = true;
var customerReviewData = <?php echo json_encode($deal->customerReview); ?>;
var currentUserWebAccessToken = "{{$currentUserWebAccessToken}}";
//var currentUserWebAccessToken = "330d971d394659ef7634ff919e6a866aab41b7bc60039339ac8cd85b90c888fb";
var loanAdviceData = <?php echo json_encode($deal->bankLoanAdvice); ?>;
var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $deal->request->listingType->typeName . " " . $deal->request->propertyType->typeName; ?>";
var deal = <?php echo json_encode($deal); ?>;
loadQuickCheckListingsResult();
setInterval(loadQuickCheckListingsResult, 20000);
</script>
<script src="{{loadAsset("/js/deal/product.js")}}"></script>
<script src="{{loadAsset("/js/deal/schedule.js")}}"></script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors{
        color:#f00;
    }
    .datepicker {
        z-index: 100000 !important;
    }
    .pac-container{ 
        z-index: 100000 !important;        
    }
    #image-slider{
        z-index:999999999;
    }
    #makeScheduleModal{
        padding-right: 0px !important;
    }
    #makeScheduleModal .modal-dialog{
        width: 100% !important;
        margin:0 auto;
    }

    .ui-autocomplete{
        z-index: 1000000;
        background: #fff;
    }
    .tableAgents_wrapper{
        position: absolute;
        z-index: 100000;
        background: #fff;
        width: 100%;
        box-shadow: 2px 2px 2px 2px #aaa;
        padding:6px;
    }
</style>
@stop
