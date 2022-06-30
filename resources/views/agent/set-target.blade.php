@extends('layout.default')

@section('content')
<div class='agent-management-platform'>
    <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
    <section></section>
    <section>
        <div class="db-tm-item table-management-platform">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Thiết lập target</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal">
                                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">                             

                                @include('agent.area-filter')

                            </form>
                            <table id="agentsList" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Contact</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Primary coverage area</th>
                                        <th>Created by</th>
                                        <th>Created</th>
                                        <th>Modified</th>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
                <div class="col-md-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Thiết lập credit toàn hệ thống</h3>
                        </div>
                        <div class="box-body">
                            <form id="formSetSystemCredit" method="post" >                
                                <div class="form-group">
                                    <table class="table table-bordered">
                                        <tr>
                                            <th>Các tiêu chí</th>
                                            <th>Credit</th>
                                        </tr>
                                        <tr class="credit credit-1" creditType="1">
                                            <td>Số tăng trưởng hàng tháng (AG)</td>
                                            <td><input type="text" class="creditValue"></td>
                                        </tr>
                                        <tr class="credit credit-2" creditType="2">
                                            <td>Số môi giới đang hoạt động</td>
                                            <td><input type="text" class="creditValue"></td>
                                        </tr>
                                        <tr class="credit credit-3" creditType="3">
                                            <td>Số tin đăng trên mỗi môi giới</td>
                                            <td><input type="text" class="creditValue"></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="form-group text-center">
                                    <!--<button class="btn btn-success btnSaveSystemCredit">Save</button>-->
                                </div>
                                <!--
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                                -->
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</div>
@include("agent.form-set-target")
@endsection

@section('page-js')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/raphael/raphael-min.js")}}"></script>
<script src="{{loadAsset("/plugins/morris/morris.min.js")}}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>


<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>
<script src="{{loadAsset("/js/agent/set-target.js")}}" type="text/javascript"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
@stop