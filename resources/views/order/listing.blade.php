<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Chi tiết listing response</h3>
            <span class="pull-right">
                <button class="btn-export btn btn-warning hidden">Export to xlsx/csv</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <div class="listing-info col-xs-12 col-sm-7">
                <div class="form-row">
                    <label>Đặt tin đăng chế độ:</label>
                    <span>{{$item->isPrivate==false?"Công khai":"Riêng tư"}}</span>
                </div>
                <div class="form-row">
                    <label>Loại BĐS:</label>
                    <span>{{$item->listingTypeName}}</span>
                </div>
                <div class="form-row">
                    <label>Loại hình:</label>
                    <span>{{$item->propertyTypeName}}</span>
                </div>
                <div class="form-row">
                    <label>Địa chỉ:</label>
                    <span>{{$item->address}}</span>
                </div>
                <div class="form-row">
                    <label>Diện tích sử dụng:</label>
                    <span>{{$item->formatSize}}</span>
                </div>
                <div class="form-row">
                    <label>Giá:</label>
                    <span>{{$item->formatPrice}}</span>
                </div>
                <div class="form-row row">
                    <label class="col-sm-3">Phòng ngủ:</label>
                    <span class="col-sm-3">{{$item->bedRooms}}</span>
                    <label class="col-sm-3">Phòng tắm:</label>
                    <span class="col-sm-3">{{$item->bathRooms}}</span>
                </div>
                <div class="form-row row">
                    <label class="col-sm-3">Số tầng:</label>
                    <span class="col-sm-3">{{$item->numberFloor}}</span>
                    <label class="col-sm-3">Hướng:</label>
                    <span class="col-sm-3">{{$item->directionName}}</span>
                </div>
                <div class="form-row">
                    <label>Mô tả:</label>
                    <span>{!!$item->description!!}</span>
                </div>
                <div class="form-row">
                    <label>Giá thương lượng thấp nhất:</label>
                    <span>{{$item->formatMinPrice}}</span>
                </div>
                <div class="form-row">
                    <label>Chủ quyền:</label>
                    <span>{{$item->useRightTypeName}}</span>
                </div>

                <div class="form-row">
                    <label>Hoa hồng:</label>
                    <span>{{$item->commissionTo}}</span>
                </div>
            </div>
            <div class="customer-info col-sm-5">

                <div class="form-row">
                    <label>Name:</label>
                    <span>{{$item->name}}</span>
                </div>

                <div class="form-row">
                    <label>Phone:</label>
                    <span>{{$item->phone}}</span>
                </div>

                <div class="form-row">
                    <label>Email:</label>
                    <span>{{$item->email}}</span>
                </div>           
                <div class="clear clearfix" ></div>
            </div>
            <div class="row" style="clear: both;float:none;">                   
                <div class="col-xs-12">
                    <?php foreach ($item->photo as $key => $value): ?>
                        <img class="col-xs-12 col-sm-2" src="{{$value->link}}" style="margin-bottom: 16px;" />
                    <?php endforeach; ?>
                </div>
                <div class="form-group">
                    <div class="col-xs-12">
                        <button id="callAgent" class="btn btn-success">Call môi giới</button>
                    </div>
                </div>
                <div class="form-group panelCallButton" style="margin-top: 16px;">
                    <div class="col-xs-12">
                        <button id="" class="btn btn-warning btnEmailToCustomer">Thông báo ls đăng tin và email cho khách hàng</button>
                        <button id="" class="btn btn-danger">Set listing này cho nội bô sử dụng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div id="modalListingNote" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Propzy</h4>
            </div>
            <div class="modal-body">
                <form method="post" class="form-horizontal">
                    <div class="form-row">
                        <label class="col-sm-2">Địa chỉ</label>
                        <div class="col-sm-10"><input type="text" name="address" id="address" class="form-control" /></div>
                    </div>
                    <div class="form-row">
                        <label class="col-sm-2">Liên hệ</label>
                        <div class="col-sm-10"><input type="text" name="contact" id="contact" class="form-control"  /></div>
                    </div>
                    <div class="form-row">
                        <label class="col-sm-2">Số ĐT</label>
                        <div class="col-sm-10"><input type="text" name="phone" id="phone" class="form-control"  /></div>
                    </div>
                    <div class="form-row">
                        <label class="col-sm-2">Note</label>
                        <div class="col-sm-10"><input type="text" name="note" id="note" class="form-control"  /></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>

@endsection

@include('commons/form-send-mail')

@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script>
var orderId = "{{$orderId}}";
var rlistingId = "{{$item->rlistingId}}";
var toEmail = "{{$customer->email}}";
var toName = "{{$customer->name}}";
var emailContent = CKEDITOR.replace("emailContent");
</script>
<script type="text/javascript" src="{{loadAsset("/js/order/listing.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop