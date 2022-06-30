@extends('layout.default')
@section('content')
<div>
  @include("lead.header-nav", ["lead" => $lead])
</div>
<div style="padding: 0px 20px;" class="row">
  @include('lead-history.menu')
  <div class="col-md-12 customDatatable">
  	<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
  	  <table id="callHistories"  class="table-striped-custom table table-striped">
  	      <thead>
  	          <tr>
  	              <th>Ngày - Giờ + Thời lượng</th>
  	              <th>Mục đích gọi</th>
                  <th>Trạng thái</th>
  	              <th>Kết quả gọi</th>
                  <th>Gọi ai</th>
  	          </tr>
  	      </thead>
  	      <tbody>
  	      </tbody>
  	  </table>
  </div>
</div>

@section('page-js')
<script type="text/javascript" src="/plugins/datatables/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="http://www.jqueryscript.net/demo/jQuery-Plugin-For-Read-More-Functionality-readmore-readless/js/jquery.readmore-readless.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript">
  var dateTimeRender = function (data, type, object) {
      if (!data)
          return "";
      var duration = "NA";
      if(object.duration != null){duration = object.duration}
      return $.format.date(new Date(data), "dd/MM/yyyy HH:mm:ss") + secondsToHms(duration);
  }

  function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " giờ " : " giờ ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " phút " : " phút ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " giây" : " giây") : "";
      var reps = hDisplay + mDisplay + sDisplay;
      if(reps == '')
        return " + 0 giây";
      else
        return ' + '+reps; 
  }

  var renderStatusCall = function (data, type, object) {
      if(data === null){
        data = "";
      }else{
        if(data == 1){
          data = "Hoàn tất"
        }else{
          data = "Sẽ gọi"
        }
      }
      return data;
  };

  var renderResultCall = function (data, type, object) {
      
      switch(data) {
          case 1:
              data = "Không liên hệ được"
              break;
          case 9999:
              data = object.resultCallText;
              break;
          default:
              data = "N/A";
      }
      return data;
  };

  var renderCallAi = function (data, type, object) {
      
      switch(data) {
          case 1:
              data = "Khách hàng " + object.receiverName;
              break;
          default:
              data = "Chủ nhà " + object.receiverName;
      }
      return data;
  };

  var renderWhyCall = function (data, type, object) {
      
      switch(data) {
          case 1:
              data = object.purpose;
              break;
          default:
              data = object.purpose + ' ('+$.format.date(new Date(object.reminderTime), "dd/MM/yyyy HH:mm:ss")+')';
      }
      return data;
  };

  $(document).ready(function() {
      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('#_token').val()
          }
      });
      $("#callHistories").DataTable({
          "processing": true,
          "searching": false,
          "serverSide": true,
          "ajax": "/lead-history/list-histories-call/{{$lead->leadId}}",
          "scrollX": false,
          "lengthChange": false,
          "drawCallback": function () {
                      $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                      var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                          pagination.toggle(this.api().page.info().pages > 1);
                  },
          // "iDisplayLength": 1,
          "columns": [
              {data: 'createdDate', render: dateTimeRender},
              {data: 'statusId', orderable: false, render: renderWhyCall},
              {data: 'statusId', orderable: false, render: renderStatusCall},
              {data: 'resultCallId', orderable: false, render: renderResultCall},
              {data: 'receiverType', orderable: false, render: renderCallAi}
               
          ],
          "order": [[0, 'desc']],
          "language":
              {
                  "paginate" : {
                      previous: "<",
                      next: ">",
                      first: "|<",
                      last: ">|"
                  },
                  "info": "Trang _PAGE_ của _PAGES_",
                  "emptyTable": "Chưa có lịch sử thay đổi",
                  "infoEmpty": "",
              },
          "initComplete": function(settings, json) {
          		// console.log('LOLthere');
          	      var maxheight = 134;
          	      var showText = "Xem tất cả";
          	      var hideText = "Thu gọn lại";

          	      console.log('LOL');
          	      $('.textContainer_Truncate').each(function () {
          	          var text = $(this);
          	          if (text.height() > maxheight) {
          	              text.css({'overflow': 'hidden', 'height': maxheight + 'px'});

          	              var link = $('<a href="#">' + showText + '</a>');
          	              var linkDiv = $('<div></div>');
          	              linkDiv.append(link);
          	              $(this).after(linkDiv);

          	              link.click(function (event) {
          	                  event.preventDefault();
          	                  if (text.height() > maxheight) {
          	                      $(this).html(showText);
          	                      text.css('height', maxheight + 'px');
          	                  } else {
          	                      $(this).html(hideText);
          	                      text.css('height', 'auto');
          	                  }
          	              });
          	          }
          	      });

              // $("#emailHistories tbody tr td:nth-child(3)").each(function(){
              // 	$(this).append("<a class='showHideBtn'>Show more</a>")
              // 	// $(this).hide();
              // });	
            }   
      });
  } );
</script>
@endsection

@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop

@endsection