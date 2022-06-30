@extends('layout.default')

@section('content')

    <div class='dashboard'>
        <section>
            <h1>
                Quản Lý Agent Mới
            </h1>
        </section>
        <section>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    {{--agent-support/agent--}}
                    <a href="{{ url('agent-manager/create') }}">
                        <div class="info-box">
                            <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Thêm</span>
                                <span class="info-box-number">Agent</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <a href="#" class="sent-agent">
                        <div class="info-box">
                            <span class="info-box-icon bg-red"><i class="ion ion-ios-people-outline"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Gửi Form</span>
                                <span class="info-box-number">Agent</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <a href="#" class="add-invite">
                        <div class="info-box">
                            <span class="info-box-icon bg-green"><i class="ion ion-ios-people-outline"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Mời Định Hướng</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
        <section>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">

                        <div class="box-body">
                            <table id="table-request" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <!-- <th style="width: 10px">#</th> -->
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Điện Thoại</th>
                                    <th>Ngày tạo</th>
                                    <!--<th>Trạng Thái</th>-->
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div><!-- /.box-body -->

                    </div><!-- /.box -->
                </div>
            </div>
        </section>
    </div>

    <div id="agent-popup" class="white-popup mfp-hide zoom-anim-dialog">
        <a href="#" class="mpf-close-cus">X close</a>
        <div class="content-popup">
            <div class="title">
                <h1>Assign</h1>
            </div>
            <div class="inner-popup">
                <div class="box-body">
                    <form role="form">
                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox">
                                    Agent 1
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox">
                                    Agent 2
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox">
                                    Agent 3
                                </label>
                            </div>

                            <div class="checkbox">
                                <label>
                                    <input type="checkbox">
                                    Agent 4
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <button class="btn btn-block btn-primary">Tạo</button>
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-block btn-primary">Gửi</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>


    <div id="invite-popup" class="white-popup mfp-hide zoom-anim-dialog">
        <a href="#" class="mpf-close-cus">X close</a>
        <div class="content-popup">
            <div class="title">
                <h1>Assign</h1>
                Request #1
            </div>
            <div class="inner-popup box">
                <div class="box-body">
                    <form role="form">
                        <table id="table-assign" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>Agent Name</th>
                                <th>Date Create</th>
                                <th>Address</th>
                                <th>Type</th>
                                <th width="10%">#</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Nguyễn B</td>
                                <td>11-7-2014</td>
                                <td>Quận 1</td>
                                <td>Sales</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>
                            <tr>
                                <td>Nguyễn W</td>
                                <td>11-7-2014</td>
                                <td>Quận 2</td>
                                <td>Rent</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>
                            <tr>
                                <td>Nguyễn B</td>
                                <td>11-7-2014</td>
                                <td>Quận 1</td>
                                <td>Sales</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>
                            <tr>
                                <td>Nguyễn W</td>
                                <td>11-7-2014</td>
                                <td>Quận 2</td>
                                <td>Rent</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>
                            <tr>
                                <td>Nguyễn B</td>
                                <td>11-7-2014</td>
                                <td>Quận 1</td>
                                <td>Sales</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>
                            <tr>
                                <td>Nguyễn W</td>
                                <td>11-7-2014</td>
                                <td>Quận 2</td>
                                <td>Rent</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>
                            <tr>
                                <td>Nguyễn B</td>
                                <td>11-7-2014</td>
                                <td>Quận 1</td>
                                <td>Sales</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>
                            <tr>
                                <td>Nguyễn W</td>
                                <td>11-7-2014</td>
                                <td>Quận 2</td>
                                <td>Rent</td>
                                <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                            </tr>

                            </tbody>
                        </table>
                        <button class="btn btn-block btn-primary">Gửi</button>
                    </form>
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
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script>
        // fixDataTableVNSearch("#table-request");
        // $("#table-request").dataTable({
        //     "scrollX":true
        // });
        function loadDatatableMeeting(url = '/agent-manager/store') {
            $("#table-request").dataTable().fnDestroy();
            $("#table-request").one('xhr.dt', function (e, settings, json, xhr) {
                // console.log(json);
            }).DataTable({
                "processing": true,
                "searching": true,
                "serverSide": true,
                "ajax": url,
                // "scrollY": "270px",
                "scrollCollapse": true,
                "autoWidth": true,
                "scrollX": false,
                "lengthChange": false,
                "drawCallback": function () {
                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                    pagination.toggle(this.api().page.info().pages > 1);
                },
                "columns": [
                    {data: 'agentName', orderable: false, render : function(data, type, object){
                      return '<a href="/agent-manager/detail/'+object.agentId+'">'+data+'</a>';
                    }},
                    {data: 'email', orderable: false},
                    {data: 'phone', orderable: false},
                    {data: 'createdDate', orderable: false, render: dateRender},
                ],
                "order": [],
                "language":
                    {
                        "search" : "Tìm kiếm",
                        "paginate": {
                            previous: "<",
                            next: ">",
                            first: "|<",
                            last: ">|"
                        },
                        "lengthMenu": "Hiển thị _MENU_ trên 1 trang",
                        "searchPlaceholder": "Tên, Email, điện thoại",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                        "emptyTable": "Chưa có dữ liệu",
                        "infoEmpty": ""
                    },
                "initComplete": function (settings, json) {
                    if(typeof json.downloadj !== "undefined"){
                        if(json.downloadj.result){
                            window.location = json.downloadj.data.linkFile;
                            $('#btn-export-meeting').html('<i class="fa fa-download" aria-hidden="true"></i> <a href="#" download id="download" hidden></a>')
                        }
                    }
                }
            });
        }
    </script>
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script type="text/javascript">
        $(document).ready(function(){
          loadDatatableMeeting();
        })
        $( document ).on( "change", ".status", function() {
            var agentId = $(this).attr('agentId');
            var statusId = $(this).val();
            console.log(statusId);
            var objStatus = {
                "agentId": parseInt(agentId),
                "statusId":parseInt(statusId),
                "note": null
            }

//            /agent/change-status
            post_sync("{{ url('agent-manager/agent-change-status-json') }}", objStatus, false, function(data){
                showPageAlert('Thông báo', data.message);
//                if(data.result){
//                    alert(data.message);
//                }
//                else {
//                    alert(data.message);
//                }
                console.log(data);
            });
        })
    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop
