@extends('layout.default')

@section('content')
    <?php
    $transations = get_transaction_centers();
    ?>
    <div class="row">
        <div class="col-md-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Danh sách meeting</h3>
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Từ</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input type="text" class="form-control pull-right active" id="fromDate"
                                           placeholder="mm/dd/yyyy">
                                </div><!-- /.input group -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Đến</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input type="text" class="form-control pull-right active" id="toDate"
                                           placeholder="mm/dd/yyyy">
                                </div><!-- /.input group -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Địa Điểm</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-map-marker"></i>
                                    </div>
                                    <select style="-webkit-border-radius: 0px;
-moz-border-radius: 0px;
-o-border-radius: 0px;
border-radius: 0px;
_border: 0px;" class="form-control" name="transactionMeeting" id="transactionMeeting">
                                        <option value="">Chọn địa điểm</option>
                                        @foreach($transations as $value)
                                            <option value="{{$value->id}}">{{$value->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Trạng Thái</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-info"></i>
                                    </div>
                                    <select style="-webkit-border-radius: 0px;
-moz-border-radius: 0px;
-o-border-radius: 0px;
border-radius: 0px;
_border: 0px;" name="renderDoneStatusMeeting" id="statusMeeting" class="form-control">
                                        <option value="">Chọn trạng thái</option>
                                        @foreach($status as $stt)
                                            <option value="{{$stt->statusId}}">{{$stt->statusName}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Hình thức GD</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-info" aria-hidden="true"></i>
                                    </div>
                                    <select id="listingTypeId" name="listingTypeId" class="form-control">
                                          <option value="">Tất cả</option>
                                          <?php foreach ([1 => 'Mua', 2 => 'Thuê'] as $key => $value): ?>
                                              <option value={{$key}} >{{$value}}</option>
                                          <?php endforeach; ?>
                                      </select>
                                </div><!-- /.input group -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Loại BĐS</label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-info" aria-hidden="true"></i>
                                    </div>
                                    <select name="propertyTypeId" id="propertyTypeId" class="form-control">
                                        <option value="">N/A</option>
                                    </select>
                                </div><!-- /.input group -->
                            </div>
                        </div>
                        <div class="col-md-1" style="padding-top: 25px;">
                            <button onclick="doFilter()" class="btn btn-primary btn-block">
                                <i class="fa fa-filter"
                                   aria-hidden="true"></i>
                                Lọc
                            </button>
                        </div>
                        <div class="col-md-1" style="padding-top: 25px;">
                            <button id="btn-export-meeting" onclick="doFilter('export')" class="btn btn-default btn-block">
                                <i class="fa fa-download"
                                   aria-hidden="true"></i>
                                <a href="#" download id="download" hidden></a>
                            </button>
                        </div>
                    </div>
                </div><!-- /.box-header -->
                <div class="box-body">
                    <table id="meetingReport" class="table table-bordered">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên TM</th>
                            <th>Tên BA</th>
                            <th style="width: 100px">IDs</th>
                            <!-- <th>LeadID</th>
                            <th>DealID</th> -->
                            <th>Thời Gian</th>
                            <th>Địa Điểm</th>
                            <th>Khách Hàng</th>
                            <th>Trạng Thái</th>
                            <th>Kết quả</th>
                            <th>Ghi Chú</th>
                            <th>Ngày Hoàn Thành</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div><!-- /.box-body -->
            </div>
        </div>
    </div>
@stop

@section('page-css')
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}">
@stop

@section('page-js')
    @include('pos.blocks.common-script-page')
    <script type="text/javascript" src="/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
    <script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('.sidebar-toggle').hide();
            $('#fromDate, #toDate').datepicker();
            loadDatatableMeeting();
            eventChangeRageDate();
            DealFunctions.initSelectListingTypes();
        })

        function eventChangeRageDate() {
            $('#fromDate').change(function () {
                if ($(this).val() != '') {
                    if ($('#toDate').val() == '') {
                        $('#toDate').val($(this).val())
                    }
                }
            })
            // $('#toDate').change(function () {
            //     if($(this).val() != ''){
            //         $('#fromDate').val($(this).val())
            //     }
            // })
        }

        function doFilter(type = 'nomal') {
            var queryUrl = '';
            var fromDate = $('#fromDate').val();
            var toDate = $('#toDate').val();
            if (fromDate != '' && toDate != '') {
                fromDate = HumanToEpoch2(fromDate);
                toDate = HumanToEpoch2(toDate + " 23:59:59");
                if (fromDate > toDate) {
                    $('#toDate').val($('#fromDate').val())
                    toDate = fromDate;
                }
                queryUrl += '&';
                queryUrl += 'range=' + fromDate + '-' + toDate;
            } else if (type != 'nomal') {
                $('#fromDate,#toDate').each(function () {
                    if ($(this).val() == '') {
                        $(this).css('border', '1px solid red');
                    }
                })
                return false;
            }

            if ($('#transactionMeeting').val() != "") {
                queryUrl += '&';
                queryUrl += 'transaction=' + $('#transactionMeeting').val();
            }
            let propertyTypeId = $('#propertyTypeId').val();
            let listintgTypeId = $('#listingTypeId').val();
            queryUrl += "&listingTypeId=" + listintgTypeId ? listintgTypeId : '';
            queryUrl += "&propertyTypeId=" + propertyTypeId ? propertyTypeId : '';
            // console.log(queryUrl);return false;

            if ($('#statusMeeting').val() != "") {
                queryUrl += '&';
                queryUrl += 'status=' + $('#statusMeeting').val();
            }
            if (type == 'export') {
                $('#btn-export-meeting').html('<i class="fa fa-spinner fa-spin"></i>');
                queryUrl += '&download=export';
            }
            loadDatatableMeeting('meeting/store?' + queryUrl);
        }

        var renderStatusMeeting = function (data, type, object) {
            var resp = 'NA';
            if (typeof object.isAccepted !== "undefined") {
                resp = object.statusMeeting;
            }
            return resp;
        }

        var renderDoneStatusMeeting = function (data, type, object) {
            var resp = 'NA';
            if (typeof object.isDone !== "undefined") {
                resp = object.doneStatus;
            }
            return resp;
        }

        function loadDatatableMeeting(url = '/meeting/store') {
            $("#meetingReport").dataTable().fnDestroy();
            $("#meetingReport").one('xhr.dt', function (e, settings, json, xhr) {
                // console.log(json);
            }).DataTable({
                "processing": true,
                "searching": true,
                "serverSide": true,
                "ajax": url,
                "scrollY": "270px",
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
                    {data: 'meetingId'},
                    {data: 'tmName', orderable: true},
                    {data: 'baName', orderable: true},
                    {data: 'meetingId',orderable:false,render:function(data,type,object){
                        var print = "";
                        if(object.meetingItems != null){
                            $.each(object.meetingItems,function(k,v){
                                if(v.dealId != null){
                                    print += "<p>DealID: " + v.dealId + "</p>";
                                }
                                print += "<p>LeadID: " + v.id.leadId + "</p>";
                            })
                        }
                        return print;
                    }},
                    // {data: 'leadId', orderable: false},
                    // {data: 'dealId', orderable: false},
                    {data: 'reminderDate', orderable: false, render: renderDateDatatable},
                    {data: 'tcName', orderable: true},
                    {data: 'customerName', orderable: false},
                    {data: 'isAccepted', orderable: true, render: renderStatusMeeting},
                    {data: 'isDone', orderable: true, render: renderDoneStatusMeeting},
                    {data: 'doneNote', orderable: false},
                    {data: 'doneDate', orderable: false, render: renderDateDatatable},
                ],
                "order": [[0, 'desc']],
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
                        "searchPlaceholder": "MeetingID, DealID, LeadID",
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
@stop