@extends('layout.default')
@section('content')
<div>
  @include("lead.header-nav", ["lead" => $lead])
</div>
<div style="padding: 0px 20px;" class="row">
  @include('lead-history.menu')
  <div class="col-md-12 customDatatable">
  	<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
  	  <table id="emailHistories"  class="table-striped-custom table table-striped">
  	      <thead>
  	          <tr>
  	              <th width="20%">Ngày - Giờ</th>
  	              <th width="20%">Mục đích Email</th>
  	              <th>Chi tiết Email</th>
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
      return $.format.date(new Date(data), "dd/MM/yyyy HH:mm:ss");
  }

  var renderEventContent = function (data, type, object) {
      var returnVal = "";
      if(object.scheduleTime){
          returnVal+= moment(object.scheduleTime).format('DD/MM/YYYY HH:mm:ss')+"<br/>";
      }
      if(data===null){
          data="";
      }
      returnVal += "<div class='textContainer_Truncate'>" + data + "</div>";
      return returnVal;
  };

  $(document).ready(function() {
      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('#_token').val()
          }
      });
      $("#emailHistories").DataTable({
          "processing": true,
          "searching": false,
          "serverSide": true,
          "ajax": "/lead-history/list-histories-email/{{$lead->leadId}}",
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
              {data: 'title', orderable: false},
              {data: 'content', orderable: false, render:renderEventContent}
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