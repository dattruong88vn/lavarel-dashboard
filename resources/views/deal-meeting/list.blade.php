<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->

<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Meeting</h3>
        </div><!-- /.box-header -->
        <div class="box-body">
            @if(Session::has('msg'))
              <div style="_padding: 0px 2%;">
                <div class="alert alert-success">
                  <strong>Hệ thống: </strong> {{ Session::get('msg') }}
                </div>
              </div>
            @endif
            <div style="text-align: center;margin-bottom: 10px;" class="form-inline">
                <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                  <label>Hình thức GD:</label>
                  <select style="width: 150px;" id="listingTypeId" name="listingTypeId" class="form-control">
                      <option value="">Tất cả</option>
                      <?php foreach ([1 => 'Mua', 2 => 'Thuê'] as $key => $value): ?>
                          <option value={{$key}} >{{$value}}</option>
                      <?php endforeach; ?>
                  </select>
                </div>
                <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                    <label>Loại BĐS:</label>
                    <select style="width: 150px;" name="propertyTypeId" id="propertyTypeId" class="form-control">
                        <option value="">N/A</option>
                    </select>
                  </div>
                  <button id="btn_filter_button_meeting" class="btn btn-primary"><i class="fa fa-filter" aria-hidden="true"></i></button>
            </div>
            <hr>
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="request-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th width="100">ID</th>
                        <th>Khách hàng</th>                        
                        <th>Giờ meeting</th>                        
                        <th>Người tạo</th>
                        <th>Người nhận</th>
                        <th>Ngày tạo</th>
                        <th>TC</th>
                        <th>Tình trạng</th>

                        <th>Trạng thái</th>
                        <th width="50"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</section>
@include("deal-meeting.modal-done-meeting")
@include('shared.modal-meeting')
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
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&language=vi-VN&key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM"></script>
<script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
<script>
    var doneReasons = <?=json_encode($doneReasons); ?>;
    var transactionCenters = <?=json_encode($transactionCenters); ?>;
    var isCrm = <?=$isCrm?"true": "false"; ?>;
    var isCurrentAdmin = <?=$isCurrentAdmin?"true":"false" ?>;
</script>
<script type="text/javascript" src="{{loadAsset("js/deal-meeting/list.js")}}"></script>
<script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>

<script type="text/javascript">
    $(document).ready(function(){
        DealFunctions.initSelectListingTypes();
    })
    function deleteMeetingConfirm(idmeeting){
        var optionString = '@foreach($reasonDelete as $reason) "<option value=\'{{$reason->reasonId}}\'>{{$reason->reasonName}}</option>" @endforeach';
        $.confirm({
            title: 'Báo hủy meeting!',
            content: '' +
            '<form action="/deal/delete-meeting-for-ba" method="post" id="meeting-not-created">' +
            '<input type="hidden" name="_token" value="{{ csrf_token() }}">' +
            '<div class="form-group">' +
            '<input type="hidden" value="'+idmeeting+'"  name="id" class="id" />' +
            '<label>Chọn lý do</label>' +
            '<select class="form-control reasonId" name="reasonId"><option value="">-Chọn lý do-</option>'+optionString+'</select>' +
            '</div>' +
            '<label>Ghi chú</label>' +
            '<textarea class="form-control" name="noteCancelMeeting"></textarea>' +
            '</form>',
            buttons: {
                formSubmit: {
                    text: 'Gửi',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.reasonId').val();
                        if(!name){
                            $.alert('Vui lòng chọn 1 lý do');
                            return false;
                        }
                        var intercom = Intercom.getInstance();
                        intercom.emit('closeModalCancleMeeting',idmeeting);
                        this.$content.find('form')[0].submit();
                    }
                },
                cancel: {
                    text: 'Đóng',
                    action: function () {
                    }
                }
            },
            onContentReady: function () {
                // bind to events
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    }
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop