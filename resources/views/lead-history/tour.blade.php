@extends('layout.default')
@section('content')
<div>
  @include("lead.header-nav", ["lead" => $lead])
</div>
<div style="padding: 0px 20px;" class="row">
  @include('lead-history.menu')
  <div class="col-md-12">
    <!-- Custom Tabs (Pulled to the right) -->
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">
        <li><a href="#tab_1-1" data-toggle="tab">Số tour booked <span class="badge">{{$countHistories->numberOfTours}}</span></a></li>
        <li class="active"><a href="#tab_2-2" data-toggle="tab">Số tour đã đi <span class="badge">{{$countHistories->numberOfWentTours}}</span></a></li>
        <li><a href="#tab_3-2" data-toggle="tab">Số tour bị hủy <span class="badge">{{$countHistories->numberOfCancelTours}}</span></a></li>
        <!-- <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            Dropdown <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
            <li role="presentation" class="divider"></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
          </ul>
        </li> -->
        
      </ul>
      <div class="tab-content">
        <div class="tab-pane customDatatable" id="tab_1-1">
          <table id="tourBookedHistories"  class="table-striped-custom table table-striped">
              <thead>
                  <tr>
                      <th >Ngày - Giờ đi</th>
                      <th >Số listing book</th>
                      <th>Ghi chú từ CRM</th>
                      <th>Trạng thái</th>
                      <th>Tên CS</th>
                  </tr>
              </thead>
              <tfoot style="background-color: lightblue">
                <tr><th></th><th></th><th></th><th></th><th></th></tr>
              </tfoot>
              <tbody>
              </tbody>
          </table>
        </div><!-- /.tab-pane -->
        <div class="tab-pane active customDatatable" id="tab_2-2">
          <table id="tourGone" class="table table-bordered table-striped-custom">
            <thead>
              <tr>
                <th width="15%">Ngày - giờ đi</th>
                <th>Số đi / Số book</th>
                <th width="15%">CS nhận xét khách hàng</th>
                <th>Giá</th>
                <th width="15%">Địa chỉ</th>
                <th>Điểm</th>
                <th>CS đánh giá listing</th>
                <th width="25%">Phản hồi từ khách hàng</th>
                <th>Trạng thái GD listing</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div><!-- /.tab-pane -->
        <div class="tab-pane customDatatable" id="tab_3-2">
          <table id="tourCancled" class="table table-striped table-striped-custom">
            <thead>
              <tr>
                <th>Ngày - giờ đi</th>
                <th>Lý do hủy</th>
                <th>Hướng giải quyết</th>
                <th>Tên CS</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div><!-- /.tab-pane -->
      </div><!-- /.tab-content -->
    </div><!-- nav-tabs-custom -->
  </div><!-- /.col -->
</div> <!-- /.row -->
<!-- END CUSTOM TABS -->


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

  var renderListingLink = function(data, type, object){
    var string = data+' ( ';
    $.each(object.rListingLink,function(key,value){
      string += "<a target='_blank' href='"+value+"'>"+key+",</a> ";
    })
    string = string.slice(0, -6);
    string = string + '</a> )';
    return string; 
  }


  function loadTableTourCancledHistory(url = "/lead-history/list-tour-cancled/{{$lead->leadId}}"){
    $("#tourCancled").DataTable({
        "responsive": true,
        "processing": true,
        "searching": false,
        "serverSide": true,
        "ajax": url,
        "scrollX": false,
        "lengthChange": false,
        "drawCallback": function () {
                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                        pagination.toggle(this.api().page.info().pages > 1);
                },
        // "iDisplayLength": 1,
        "columns": [
            {data: 'scheduleTime', render: dateTimeRender},
            {data: 'reasonName', orderable: false},
            {data: 'solution', orderable:false},
            {data: 'csName', orderable:false}
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
        initComplete: function(settings, json) {
            } 
    });
  }


  function loadTableTourBookedHistory(url = "/lead-history/list-tour-booked/{{$lead->leadId}}"){
    $("#tourBookedHistories").DataTable({
        "responsive": true,
        "processing": true,
        "searching": false,
        "serverSide": true,
        "ajax": url,
        "scrollX": false,
        "lengthChange": false,
        "drawCallback": function () {
                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                        pagination.toggle(this.api().page.info().pages > 1);
                },
        // "iDisplayLength": 1,
        "columns": [
            {data: 'scheduleTime', render: dateTimeRender},
            {data: 'totalListingBook', orderable: false, render: renderListingLink},
            {data: 'note', orderable: false},
            {data: 'statusBook', orderable:false},
            {data: 'csName', orderable:false}
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
        initComplete: function(settings, json) {
            this.api().columns(['3']).every(  function () {
                  var column = this;
                  var select = $('<select placeholder="Lọc theo trạng thái" style="width:100%" class="statusBookFilter"><option value=""></option></select>')
                      .appendTo( $(column.footer()).empty() )
                  select.append( '<option value="1">Sẽ đi</option><option value="2">Đã đi</option><option value="3">Hủy</option>')
              } );

              // FILTER STATUS
              $('.statusBookFilter').change(function(){
                $("#tourBookedHistories").dataTable().fnDestroy();
                loadTableTourBookedHistory('/lead-history/list-tour-booked/{{$lead->leadId}}?statusBook='+$(this).val());
              })
          }   
    });
  }

  var priceRender = function (data, type, object) {
      var formatPrice = "";
      var listings = object.listings;
      $.each(listings,function(key,value){
        formatPrice += "<div class='datatableChildCustom'>"+value.formatPrice + "</div>";
      })
      return formatPrice;
  }

  var addressRender = function (data, type, object) {
      var addr = "";
      var listings = object.listings;
      $.each(listings,function(key,value){
        addr += "<div class='datatableChildCustom'>"+value.address + "</div>";
      })
      return addr;
  }

  var poinRender = function (data, type, object) {
      var poin = "";
      var listings = object.listings;
      $.each(listings,function(key,value){
        if(value.reasonValue == null){
          poin += "<div class='datatableChildCustom'>"+value.percentValue + "</div>";
        }else{
          poin += "<div class='datatableChildCustom'>"+value.reasonValue + "</div>";
        }
        
      })
      return poin;
  }

  var csReviewRender = function (data, type, object) {
      var review = "";
      var listings = object.listings;
      $.each(listings,function(key,value){
        review += "<div class='datatableChildCustom'>"+value.csFeedbackForListing + "</div>";
      })
      return review;
  }

  var statusTradeRender = function (data,type, object) {
    var status = ""
    var listings = object.listings;
    $.each(listings,function(key,value){
      status += "<div class='datatableChildCustom'>"+value.statusNameForListing + "</div>";
    })
    return status;
  }

  var feedbackCustomer = function(data, type, object){
    var feedback = "";
    var listings = object.listings;
    $.each(listings,function(key,value){
      if(value.reasonDismiss != null){
        feedback += "<div class='datatableChildCustom'>"+value.reasonDismiss + "</div>";
      }else{
        if(value.customerFeedbackForListing != null){
          var like = value.customerFeedbackForListing.customerFeedback == 1 ? 'có' : 'không';
          var thinking = value.customerFeedbackForListing.investigate == 1 ? 'có' : 'không';
          feedback += "<div class='datatableChildCustom'><ul ><li>Thích/Không thích: "+like+"</li><li>Xem xét: "+thinking+"</li><li>Tại sao: "+value.customerFeedbackForListing.reason+"</li></ul></div>"
        }else{
          feedback += "<div class='datatableChildCustom'>N/A</div>";
        }
      }
    })
    return feedback;
  }

  $(document).ready(function() {
      $("#tourGone").DataTable({
          "responsive": true,
          "processing": true,
          "searching": false,
          "serverSide": true,
          "ajax": '/lead-history/list-tour-gone/{{$lead->leadId}}',
          "scrollX": false,
          "lengthChange": false,
          "drawCallback": function () {
                      $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                      var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                          pagination.toggle(this.api().page.info().pages > 1);
                  },
          // "iDisplayLength": 1,
          "columns": [
              {data: 'scheduleTime', render: dateTimeRender},
              {data: 'numberOfWentPerBookingListing', orderable: false},
              {data: 'csFeedbackForCustomer', orderable:false},
              {data: null,orderable:false, render: priceRender},
              {data: null,orderable:false, render: addressRender},
              {data: null, orderable:false, render: poinRender},
              {data: null, orderable:false, render: csReviewRender},
              {data: null, orderable:false, render: feedbackCustomer},
              {data: null, orderable:false, render: statusTradeRender}
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
          initComplete: function(settings, json) {
              var maxHeight = 0;
              $('#tourGone').find('.datatableChildCustom').each(function(){
                var height = $(this).height();
                $(this).parent('td').attr('style','padding:0px')
                if(height > maxHeight){
                  maxHeight = height;
                }
              })
              console.log(maxHeight)
              $('.datatableChildCustom').height(maxHeight);            }   
      });


      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          $($.fn.dataTable.tables(true)).DataTable()
             .columns.adjust()

            var target = $(e.target).attr("href") // activated tab
            if(target == '#tab_1-1'){
              $("#tourBookedHistories").dataTable().fnDestroy();
              loadTableTourBookedHistory();
            }else if(target == '#tab_3-2'){
              $("#tourCancled").dataTable().fnDestroy();
              loadTableTourCancledHistory()
            }
      }); 
  } );
</script>
@endsection

@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop

@endsection