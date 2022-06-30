@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">        
        <div class="box  box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Xuất report</h3>
            </div><!-- /.box-header -->
            <div class="box-body">    

                <div class="" >
                    <div class=" form-group row">
                        <label class="col-sm-2">Chọn người phụ trách meeting</label>
                        <div class="col-sm-5">
                            <select class="userId form-control">
                            </select>  
                            <div class="errors"></div>
                        </div>

                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Chọn ngày</label>
                        <div class="col-sm-10">
                            <input type="text" class="fromDate" placeholder="Từ ngày" />
                            <input type="text" class="toDate" placeholder="Đến ngày" />                              
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <button class="export-tour-per-request">Xuất Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
@endsection

@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script type="text/javascript" src="{{loadAsset('/js/crm-dashboard/reports.js')}}"></script>




@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>
    #tableTasks tr>th:nth-child(2), #tableTasks tr>td:nth-child(2){
        background: #f3581d;
    }
    #tableTasks tr>th:nth-child(3), #tableTasks tr>td:nth-child(3){
        background: #ffda67;
    }
    #tableTasks tr>th:nth-child(4), #tableTasks tr>td:nth-child(4){
        background: #75ca3b;
    }
    #tableTasks tr>td a{
        color:#333;
    }
</style>
@stop
