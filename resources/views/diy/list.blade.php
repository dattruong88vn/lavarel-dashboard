@extends('layout.default')

@section('content')
<?php
$csrf_token = csrf_token();
?>

<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />

    <h1>LSO DASHBOARD</h1>
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-body">
                    <table id="tableDiys" class="table table-bordered" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Ngày tạo</th>
                                <th>Tên chủ tin đăng</th>
                                <th>Địa chỉ tin đăng</th>
                                <!--
                                <th>Phường</th>
                                <th>Quận</th>
                                -->
                                <th>Thông tin liên hệ</th>
                                <!--<th>Hình</th>-->
                                <th>Nguồn</th>
                                <th>Trạng thái DIY</th>
                                <th>Ngày Update DIY cuối</th>
                                <th>Trạng thái</th>
                                <!--<th>Độc quyền</th>-->
                                <th>LID</th>
                                <th>Ngày update cuối</th>
                                <!--<th>Tạo tài khoản DIY</th>-->
                                <th>Hủy</th>
                            </tr>
                            <!--
                            <tr class="row-filter hidden">
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>
                                    <select class="sourceName">
                                        <option value="">Chọn</option>
                            <?php foreach ($sources as $key => $value): ?>
                                                    <option value="{{$key}}">{{$value}}</option>
                            <?php endforeach; ?>
                                    </select>
                                </th>
                                <th>
                                    <select class="isSend">
                                        <option value="">Chọn</option>
                            <?php foreach ($sentStatusList as $key => $value): ?>
                                                    <option value="{{$key}}">{{$value}}</option>
                            <?php endforeach; ?>
                                    </select>
                                </th>
                                <th></th>
                                <th>
                                    <select>
                                        <option value="">Chọn</option>
                            <?php foreach ($statusList as $key => $value): ?>
                                                    <option value="{{$key}}">{{$value}}</option>
                            <?php endforeach; ?>
                                    </select>
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                            -->
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div><!-- /.col -->
    </div><!-- /.row -->

    <div class="modal fade" id="modal-gallery" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header hidden">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Hình DIY</h4>
                </div>
                <div class="modal-body ch-modal-body">
                </div>
            </div>
        </div>
    </div>

</div>

<div class="sliderTemplate">
    <div id="jssor_1" class="slider_main" style="position:relative;margin:0 auto;top:0px;left:0px;width:800px;height:456px;overflow:hidden;visibility:hidden;background-color:#24262e;">
        <div data-u="loading" style="position:absolute;top:0px;left:0px;background-color:rgba(0,0,0,0.7);">
            <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
            <div style="position:absolute;display:block;background:url('images/diy-slider/loading.gif') no-repeat center center;top:0px;left:0px;width:100%;height:100%;"></div>
        </div>
        <div class="slide-photos" data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:800px;height:356px;overflow:hidden;">
            <!--
            <div>
                <img data-u="image" src="http://lokeshdhakar.com/projects/lightbox2/images/image-1.jpg" />
                <img data-u="thumb" src="http://lokeshdhakar.com/projects/lightbox2/images/image-1.jpg" />
            </div>                            
            -->
        </div>
        <!-- Thumbnail Navigator -->
        <div data-u="thumbnavigator" class="jssort01" style="position:absolute;left:0px;bottom:0px;width:800px;height:100px;" data-autocenter="1">
            <!-- Thumbnail Item Skin Begin -->
            <div data-u="slides" style="cursor: default;">
                <div data-u="prototype" class="p">
                    <div class="w">
                        <div data-u="thumbnailtemplate" class="t"></div>
                    </div>
                    <div class="c"></div>
                </div>
            </div>
            <!-- Thumbnail Item Skin End -->
        </div>
        <!-- Arrow Navigator -->
        <span data-u="arrowleft" class="jssora05l" style="top:158px;left:8px;width:40px;height:40px;"></span>
        <span data-u="arrowright" class="jssora05r" style="top:158px;right:8px;width:40px;height:40px;"></span>
    </div>
</div>

<div class="modal fade" id="modal-create-account" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">TẠO TÀI KHOẢN DIY</h4>
            </div>
            <div class="modal-body">
                <form>
                    <input type="hidden" class="id form-control" />
                    <input type="hidden" class="sourceType form-control" />
                    <div class="form-group row">
                        <label class="col-sm-4">Tên tài khoản</label>
                        <div class="col-sm-8">
                            <input type="text" class="name form-control" />
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Email</label>
                        <div class="col-sm-8">
                            <input type="text" class="email form-control" />
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Số ĐT</label>
                        <div class="col-sm-8">
                            <input type="text" class="phone form-control" />
                            <div class="errors"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btnSaveDiyAccount btn btn-warning">Tạo tài khoản và gửi email cho khách hàng</button>
            </div>
        </div>
    </div>
</div>


@endsection


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
<script src="{{loadAsset("/js/jssor.slider-22.1.9.min.js")}}"></script>
<script>
var sources = <?php echo json_encode($sources); ?>;
var sentStatusList = <?php echo json_encode($sentStatusList); ?>;
var statusList = <?php echo json_encode($statusList); ?>;
</script>


<script type="text/javascript" src="{{loadAsset("/js/diy/list.js")}}"></script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
<style>
    .isGuaranteed td{
        background: #d2eaac
    }
</style>
@stop
