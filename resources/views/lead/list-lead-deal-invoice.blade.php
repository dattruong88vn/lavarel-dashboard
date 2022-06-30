@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class="page-all-lead">
    <section></section>
    <section>
        <div class="db-tm-item deal-tm-filter-lead">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-body">
                            <div class="nav-tabs-filter-lead">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_filter_lead_1" data-toggle="tab">FILTER</a></li>
                                    <li><a href="#tab_filter_lead_2" data-toggle="tab">NEW LEADS</a></li>
                                    <li><a href="#tab_filter_lead_3" data-toggle="tab">MY LEADS</a></li>
                                    <li><a href="#tab_filter_lead_4" data-toggle="tab">LEADS tạo ra từ check availbility request</a></li>
                                    <li><a href="#tab_filter_lead_5" data-toggle="tab">+</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_filter_lead_1">
                                        <form class="form-horizontal m-t-20">
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Search:</label>
                                                <div class="col-sm-5">
                                                    <input type="text" class="form-control">
                                                </div>
                                                <div class="col-sm-4">
                                                    <select class="form-control select2" style="width: 100%;">
                                                        <option selected="selected">First and Last Name</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Lead Name:</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control">
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Source:</label>
                                                <div class="col-sm-9">
                                                    <select multiple="" class="form-control">
                                                        <option>Socail</option>
                                                        <option>Existing Client</option>
                                                        <option>Employee</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Status:</label>
                                                <div class="col-sm-9">
                                                    <select multiple="" class="form-control">
                                                        <option>(none))</option>
                                                        <option>New Request</option>
                                                        <option>Assigned to Client Services</option>
                                                        <option>Listings Search Initiated</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Opportunity:</label>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control">
                                                </div>
                                                <label class="col-sm-1 text-center">---</label>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control">
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Currency:</label>
                                                <div class="col-sm-9">
                                                    <select multiple="" class="form-control">
                                                        <option>(none))</option>
                                                        <option>VND</option>
                                                        <option>US Dollar</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Created:</label>
                                                <div class="col-sm-9">
                                                    <select class="form-control select2" style="width: 100%;">
                                                        <option selected="selected">(no)</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Responsible:</label>
                                                <div class="col-sm-9">
                                                    <input type="number" class="form-control">
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="col-sm-6">
                                                <a href="#" class="btn btn-success">SAVE</a>
                                                <a href="#" class="btn btn-warning m-l-10">CANCEL</a>
                                            </div>
                                            <div class="col-sm-6 text-right">
                                                <a href="#" class="btn btn-default"><i class="fa fa-cog"></i></a>
                                                <a href="#" class="btn btn-default m-l-10">+</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="tab-pane" id="tab_filter_lead_2">
                                        NEW LEADS
                                    </div>
                                    <div class="tab-pane" id="tab_filter_lead_3">
                                        MY LEADS
                                    </div>
                                    <div class="tab-pane" id="tab_filter_lead_4">
                                        LEADS tạo ra từ check availbility request
                                    </div>
                                </div>				
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="db-tm-item deal-tm-result-lead">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <div class="btn-group-table">
                                <a href="#" class="btn btn-success">Add</a>
                                <a href="#" class="btn btn-default pull-right"><i class="fa fa-cog"></i></a>
                            </div>
                        </div>
                        <div class="box-body">
                            <table id="table-lead" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>Lead</th>
                                        <th>Brokered Lead?</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Responsive</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                        <th>Initial Budget</th>
                                        <th>Transaction Type</th>
                                        <th>Product Type</th>
                                        <th>ID</th>
                                        <th>Phone</th>
                                        <th>Actitvity</th>
                                        <th>Lead Name</th>
                                        <th>Ngày dự định dọn vào</th>
                                        <th>Source</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php for ($i = 0; $i < 6; $i++): ?>
                                        <tr>
                                            <td><input type="checkbox"></td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                        </tr>
                                    <?php endfor; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</div>
@endsection



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

<script type="text/javascript">
$(document).ready(function () {
    $("#table-lead").DataTable({
        "scrollX": true
    });
});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop