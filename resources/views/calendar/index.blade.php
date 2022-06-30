@extends('layout.default')
@section('page-js')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset('/plugins/fullcalendar/fullcalendar.min.js')}}"></script>
<script src="{{loadAsset('/plugins/fullcalendar/locale/vi.js')}}"></script>
<script type="text/javascript" src="{{loadAsset('js/calendar/scripts.js')}}}}"></script>
<script type="text/javascript" src="{{loadAsset('js/calendar/task-calendar.js')}}}}"></script>
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset('/plugins/daterangepicker/daterangepicker.js')}}"></script>
{{--<script type="text/javascript" src="{{loadAsset('/js/calendar/crm.js')}}"></script>--}}
@stop
@section('page-css')
<!-- fullCalendar 2.2.5-->
<link rel="stylesheet" href="{{loadAsset('/plugins/fullcalendar/fullcalendar.min.css')}}">
<link rel="stylesheet" href="{{loadAsset('/plugins/fullcalendar/fullcalendar.print.css')}}" media="print">
<link rel="stylesheet" href="{{loadAsset('/plugins/daterangepicker/daterangepicker-bs3.css')}}">
@stop
@section('content')
<!-- Main content -->
<section class="">

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/calendar?deparment=0">Lịch làm việc</a>
            </div>
            <ul class="nav navbar-nav">
                @if(in_array(12,$departmentIds))
                <li class="{{isset($_GET['deparment']) && $_GET['deparment'] == '0' ? 'active' : ''}}"><a href="/calendar?deparment=0">BA</a></li>
                @endif
                @if(in_array(14,$departmentIds) || in_array(17,$departmentIds))
                <li class="{{!empty($_GET['deparment']) && $_GET['deparment'] == '1' ? 'active' : ''}}"><a href="/calendar?deparment=1">SA</a></li>
                @endif
                @if(in_array(12,$departmentIds))
                <li class="{{!empty($_GET['deparment']) && $_GET['deparment'] == 'cc' ? 'active' : ''}}"><a href="/calendar?deparment=cc">CC</a></li>
                @endif
            </ul>
        </div>
    </nav>

    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body">
                    <div class="col-md-12">
                        <div id="calendar-filter">
                            <div class="row form-group">
                                @if ($currentUser->departments[0]->isGroupAdmin == true)
                                <div class="col-md-3">
                                    <label class="control-label">Người phụ trách</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-users"></select>
                                        </div>
                                    </div>
                                </div>
                                @if(empty($statusCC))
                                <div class="col-md-3">
                                    <label class="control-label">Loại công việc</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-type-task">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="control-label">Trạng thái</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-is-closed">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                @else
                                <div class="col-md-3">
                                    <label class="control-label">Trạng thái</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-status">
                                                <option value="">Tất cả</option>
                                                @foreach($statusCC as $stt)
                                                <option value="{{$stt->id}}">{{$stt->name}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                @endif
                                @else
                                @if(empty($statusCC))
                                <div class="col-md-3">
                                    <label class="control-label">Loại công việc</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-type-task">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="control-label">Trạng thái</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-is-closed">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                @else
                                <div class="col-md-3">
                                    <label class="control-label">Người phụ trách</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-users"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="control-label">Trạng thái</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="calendar-filter-status">
                                                <option value="">Tất cả</option>
                                                @foreach($statusCC as $stt)
                                                <option value="{{$stt->id}}">{{$stt->name}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                @endif
                                @endif
                                <div class="col-md-3 text-right">
                                    <label class="control-label" style="height: 25px;"></label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <button class="btn-sm btn btn-primary" id="calendar-filter-btn">Lọc dữ liệu</button>
                                            <button class="btn-sm btn btn-default" id="calendar-filter-btn-clear">Bỏ lọc</button>
                                            @if ($currentUser->departments[0]->isGroupAdmin == true && !empty($_GET['deparment']))
                                            {{--<button title="Xuất file Excel" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Xuất dữ liệu bonus touring theo thời gian của lịch." class="btn-sm btn btn-default" id="calendar-export-btn"><i class="fa fa-download" aria-hidden="true"></i></button>--}}
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 inline">
                                    <div class="calendar-define-items">
                                        <span class="calendar-define event-orange"></span>
                                        <label>Ưu tiên cao</label>
                                    </div>
                                    <div class="calendar-define-items">
                                        <span class="calendar-define event-green"></span>
                                        <label>Ưu tiên vừa</label>
                                    </div>
                                    <div class="calendar-define-items">
                                        <span class="calendar-define event-azure"></span>
                                        <label>Ưu tiên thấp</label>
                                    </div>
                                    <div class="calendar-define-items">
                                        <span class="calendar-define event-red "></span>
                                        <label>Quá hạn</label>
                                    </div>
                                    <div class="calendar-define-items">
                                        <span class="calendar-define event-default"></span>
                                        <label>Đã hoàn thành</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div><!-- /.box-body -->
            </div><!-- /. box -->
        </div><!-- /.col -->
    </div><!-- /.row -->
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-body no-padding">
                    <!-- THE CALENDAR -->
                    <div class="col-md-12 calendar-wrapper calendar-group-open">
                        <div id="calendar"></div>
                        <div id="group-event-month-calendar" class="calendar-notify"></div>
                    </div>
                </div><!-- /.box-body -->
            </div><!-- /. box -->
        </div><!-- /.col -->
    </div><!-- /.row -->

</section><!-- /.content -->
<section id="calendar-action-popup"></section>
<script type="text/javascript">
    var departmentId = "<?php echo $departmentId; ?>";
</script>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Báo cáo - Deal 1101 đã 3 ngày chưa có tương tác</h4>
            </div>
            <div class="modal-body">
                <p>Thẩm định</p>

                <div class="checkbox">
                    <label><input type="checkbox" value="">Có gọi khách hàng</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" value="">Có trao đổi với nhân viên</label>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">Kết quả thẩm định</div>
                    <div class="panel-body">
                        <div class="radio">
                            <label><input type="radio" name="optradio" checked>Nomarl (Deal vân đang xử lý)</label>
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="optradio">Fallout</label>
                        </div>
                        <div class="radio disabled">
                            <label><input type="radio" name="optradio" disabled>Posibile Leakage (Deal có thể bị gian lận)</label>
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">Ghi chú</div>
                    <div class="panel-body">Panel Content</div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>

@stop