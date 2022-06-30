<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách môi giới chờ liên hệ</h3>
            <span class="pull-right">
                <button class="btn-export btn btn-warning hidden">Export to xlsx/csv</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="order-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Sale</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>


            <div class="form-row row">
                <div class="col-xs-12">
                    <button id="callAgent" class="btn btn-success">Call môi giới</button>
                </div>
            </div>
            <div class="form-row row panelCallButton" style="margin-top: 16px;">
                <div class="col-xs-12">
                    <button id="" class="btn btn-warning notifyLsContact">Thông báo ls liên hệ</button>
                    <button id="" class="btn btn-danger notifyListingMisMatch">Contact không có tin đăng phù hợp</button></div>
            </div>

            <div id="modalContactNote" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Propzy</h4>
                        </div>
                        <div class="modal-body">
                            <div style="height:100%;overflow: scroll">
                                <form id="formContactNote" method="post" class="form-horizontal">
                                    <input type="hidden" name="orderId" value="{{$orderId}}" />
                                    <input type="hidden" name="contactId" id="contactId" />
                                    <input type="hidden" name="longitude" id="longitude" />
                                    <input type="hidden" name="latitude" id="latitude" />
                                    <div class="form-group">
                                        <label class="col-sm-2">Địa chỉ</label>
                                        <div class="col-sm-10">
                                            <input type="text" name="address" id="address" class="form-control required" />
                                            <div class="errors"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2">Liên hệ</label>
                                        <div class="col-sm-10"><input type="text" name="name" id="name" class="form-control" /></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2">Số ĐT</label>
                                        <div class="col-sm-10">
                                            <input type="text" name="phone" id="phone" class="form-control required" />
                                            <div class="errors"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2">Note</label>
                                        <div class="col-sm-10"><input type="text" name="note" id="note" class="form-control"  /></div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-xs-12">
                                            <!--Images/Video-->
                                            <div class="col-md-12 col-xs-12">
                                                <div class="form-group imageListing">
                                                    <label>Hình ảnh</label>
                                                    <div class="errors" ></div>
                                                    <input class="file-image" multiple type="file" class="file" data-upload-url="/imageListingUploader">
                                                </div>
                                            </div>
                                            <!-- #Images/Video-->
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success btn-save-note">Lưu</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>


<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
<!-- <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script> -->
<script src="{{loadAsset("/js/jquery.geocomplete.js")}}"></script>

<script type="text/javascript">
var orderId = "{{$orderId}}";
var statusId = "{{$statusId}}";
</script>
<script src="{{loadAsset("/js/order/status-detail.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />

<style>    
    .pac-container{
        z-index: 100000 !important;        
    }
</style>
@stop
