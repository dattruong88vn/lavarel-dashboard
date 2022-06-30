@extends('layout.default')

@section('content')
<?php //var_dump($results); ?>
<div class='dashboard'>
    <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
    <section>
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Danh Sách Liên Hệ Gửi AM</h3>
                    </div>
                    <div class="box-body">
                        <div><button class="btnShowSendToAmModal">Gửi AM</button></div>
                        <table id="table-agent" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>AM</th>
                                    <th>Tên môi giới</th>
                                    <th>Số điện thoại</th>
                                    <th>Quận</th>
                                    <th>Loại GD</th>
                                    <th>Ghi chú</th>
                                    <th>Tên tài khoản</th>
                                    <th>Ngày gửi</th>
                                    <th>Ngày ký hợp đồng</th>
                                    <th>Nhận xét</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </section>

</div>

<div id="modalSendToAm" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Gửi cho AM</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-3">Tên:</div>
                        <div class="col-sm-9 ">
                            <input type="text" name="name" id="name" class="form-control required" />
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Số điện thoại:</div>
                        <div class="col-sm-9">
                            <input type="text" name="phone" id="phone" class="required form-control" />
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Quận:</div>
                        <div class="col-sm-9 ">
                            <select id="districts" multiple="multiple" style="width:100%" class="required">
                                <option value=""></option>
                            </select>
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Loại giao dịch:</div>
                        <div class="col-sm-9">
                            <?php
                            $listingTypes = [
                                "1" => "Bán",
                                "2" => "Thuê"
                            ];
                            ?>
                            <select id="listingTypes" multiple="multiple" style="width:100%" class="required">
                                <?php foreach ($listingTypes as $key => $value): ?>
                                    <option value="{{$key}}">{{$value}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Loại bất động sản:</div>
                        <div class="col-sm-9">
                            <select id="propertyTypes" multiple="multiple" style="width:100%;" class="required">
                                <option value="">Chọn loại bất động sản</option>
                            </select>
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">AM:</div>
                        <div class="col-sm-9 am">
                            <select id="amId" class="form-control required" style="width:100%">
                            </select>
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Ghi chú:</div>
                        <div class="col-sm-9">
                            <textarea class="note form-control required" name="note" rows="8" placeholder="Nội dung ghi chú"></textarea>
                            <div class="errors"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success btnSendToAm">Gửi</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
@endsection


@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>

<script language="JavaScript">
</script>

<script type="text/javascript" src="/js/agent-manager/contact-sent-to-am.js" ></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop