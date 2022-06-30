@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist" id="myTab">
            <li><a href="/calendar-task">Lịch làm việc</a></li>
            <li class="active"><a href="/crm-dashboard" id="crm-dashboard">Việc cần làm</a></li>
        </ul>

        <div class="tab-content">
            <div class="tab-pane active" id="crm-dashboard">
                <div class="content-header">
                    <h2>Danh sách việc cần làm</h2>
                </div>
                <div class="box  box-primary">
                    <div class="box-body">
                        <div id="tasks_wrapper">
                            <table id="tableTasks" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Ưu tiên / Status</th>
                                        <th>High (<span class="column-item-count">0</span>)</th>
                                        <th>Medium (<span class="column-item-count">0</span>)</th>
                                        <th>Low (<span class="column-item-count">0</span>)</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

@include('crm-dashboard.modal-meeting-detail')
@include('crm-dashboard.modal-reassign-meeting')
@include('crm-dashboard.modal-confirm-meeting-request')
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
<script type="text/javascript" src="{{loadAsset('/js/crm-dashboard/index.js')}}"></script>




@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>
    #tableTasks tr>th:nth-child(2),
    #tableTasks tr>td:nth-child(2) {
        background: #ff49045e;
    }

    #tableTasks tr>th:nth-child(3),
    #tableTasks tr>td:nth-child(3) {
        background: #ffda67ad;
    }

    #tableTasks tr>th:nth-child(4),
    #tableTasks tr>td:nth-child(4) {
        background: #75ca3b;
    }

    #tableTasks tr>td a {
        color: #333;
    }
</style>
@stop