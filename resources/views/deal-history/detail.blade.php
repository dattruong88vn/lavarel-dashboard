@extends('layout.default')
@section('content')
<div>
  @include("deal.header-nav", ["deal" => $deal])
</div>
<div style="padding: 0px 20px;" class="row">
  @include('deal-history.menu')
  <div class="col-md-12 customDatatable">
  	<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
  	  <table id="detailHistories"  class="table-striped-custom table table-striped table-striped-custom-fix-filter">
  	      <thead>
  	          <tr>
  	              <th>Ngày - Giờ</th>
  	              <th width="20%">Sự kiện</th>
  	              <th>Chi tiết</th>
                  <th>Người cập nhật</th>
  	          </tr>
  	         <tr>
                 <th></th>
                 <th>
                   <input type="hidden" id="filterEventJson" name="filterEventJson" value="{{json_encode($listEventHistory)}}">
                   <select class="filterEvent">
                     <!-- @foreach($listEventHistory as $item)
                       <option value="{{$item->id}}">{{$item->typeName}}</option>
                     @endforeach -->
                   </select>
                 </th>
                 <th></th><th></th>
             </tr>
          </thead>
          <!-- <tfoot style="background-color: lightblue; display: table-header-group">
            
          </tfoot> -->
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
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
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

  var renderDes = function(data,type,object){
    var returnVal = "";
    if(data===null){
        data="";
    }
    returnVal += "<div class='textContainer_Truncate'>" + data + "</div>";
    return returnVal;
  }

  $(document).ready(function() {

      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('#_token').val()
          }
      });
      loadTableDetailHistories();

      var jsonFilter = $('#filterEventJson').val();
      jsonFilter = JSON.parse(jsonFilter);
      console.log(jsonFilter);
      var dataSelect2 = [];
      $.each(jsonFilter,function(key,value){
        dataSelect2.push({id:value.id,text:value.typeName})
      })

      $('.filterEvent').select2({
        data: dataSelect2,
        multiple: true,  
        width: "150px",
        placeholder: "Chọn sự kiện",
      })
  } );

  function loadTableDetailHistories(url = '/deal-history/list-histories-detail/{{$deal->dealId}}'){
    $("#detailHistories").DataTable({
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
            {data: 'createdDate', render: dateTimeRender},
            {data: 'historyTypeName', orderable: false},
            {data: 'description', orderable: false, render: renderDes},
            {data: 'processByUserName', orderable: false}
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
            // this.api().columns(['1']).every(  function () {
            //     var option = "";
            //     var column = this;
            //     var select = $('<select multiple="multiple" placeholder="Lọc theo trạng thái" style="width:100%" class="statusBookFilter"><option value=""></option></select>')
            //         .appendTo( $(column.footer()).empty() )
            //     $.getJSON( "/deal-history/list-event-history", function( data ) {
            //         console.log(data)
            //       $.each( data, function( key, val ) {
            //         option += "<option value='"+val.id+"'>"+val.typeName+"</option>";
            //       });
            //      select.append( option );
                  
            //     });
            //   } );

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

            //   // FILTER STATUS
              $('.filterEvent').change(function(){
                $("#detailHistories").dataTable().fnDestroy();
                // console.log($(this).val());return false;
                if($(this).val() != null && $(this).val().length > 0){
                  // console.log()
                  loadTableDetailHistories('/deal-history/list-histories-detail/{{$deal->dealId}}?historyTypeId='+$(this).val().join());
                }else{
                  loadTableDetailHistories();
                }
              })
          }   
    });
  }
</script>
@endsection

@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop

@endsection