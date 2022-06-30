@extends('layout.default')
@section('content')
<div>
  @include("lead.header-nav", ["lead" => $lead])
</div>
<div style="padding: 0px 20px;" class="row">
  @include('lead-history.menu')
  <div class="col-md-5">
    <ul class="timeline">
      <!-- timeline time label -->
      <li style="margin-bottom: 15px;" class="time-label">
        <span class="bg-red">
          Bảng đánh giá khách hàng
        </span>
      </li>
      <?php $sttQuestion = 1; ?>
      <!-- /.timeline-label -->
      <!-- timeline item -->
      @if(count($questionModalView) > 0)
        @foreach($questionModalView->resultQuestion as $ques)
          @if(count($ques->results) > 0)
          <li>
            <span class="fa bg-blue">{{$sttQuestion}}</span>
            <!-- <i class="fa fa-question-circle bg-blue"></i> -->
            <div class="timeline-item">
              <h5 class="timeline-header">{{$ques->questionName}} 
                @if(count($ques->results) > 0)
                  @foreach($ques->results as $res)
                    @if($ques->answerType == 3)
                     <span class="badge">{{ $res->customValue }}</span> 
                    @else
                      <span class="badge">{{ $res->answerName }}</span>
                    @endif 
                  @endforeach
                @endif
              </h5>
            </div>
          </li>
          @endif
            <!-- END timeline item -->
            <!-- timeline item -->
            @if(count($ques->results) > 0)
              @foreach($ques->results as $result)
                @foreach($ques->answers as $ans)
                  @if($ans->answerId == $result->answerId)
                    @if( count($ans->questions) > 0 )
                      @foreach($ans->questions as $questionChild)
                        @if(count($questionChild->results) > 0)
                          <li>
                            <!-- <i class="fa fa-user bg-aqua"></i> -->
                            <div style="margin-left: 80px" class="timeline-item">
                              <h5 class="timeline-header no-border">{{ $questionChild->questionName }}
                                @if(count($questionChild->results) > 0)
                                  @foreach($questionChild->results as $res)
                                    @if($questionChild->answerType == 3)
                                      <span class="badge">{{ $res->customValue }}</span>
                                    @else
                                      <span class="badge">{{ $res->answerName }}</span>
                                    @endif 
                                  @endforeach
                                @endif
                              </h5>
                            </div>
                          </li>
                        @endif
                      @endforeach
                    @endif
                  @endif
                @endforeach
              @endforeach
            @endif
            
          <!-- END timeline item -->
          <!-- timeline item -->
          <?php $sttQuestion++; ?>
        @endforeach
      @endif
      
    </ul>

  </div><!-- ./col -->
  <div class="col-md-7 customDatatable">
      <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
        <table id="profileHistories"  class="table-striped-custom table table-striped">
            <thead>
                <tr>
                    <th>Ngày - Giờ</th>
                    <th>Câu hỏi thay đổi</th>
                    <th>Nội dung thay đổi</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
  </div><!-- col -->
</div><!-- /.row -->

@section('page-js')
<script type="text/javascript" src="/plugins/datatables/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/plugins/datatables/dataTables.bootstrap.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript">
  var dateTimeRender = function (data, type, object) {
      if (!data)
          return "";
      return $.format.date(new Date(data), "dd/MM/yyyy HH:mm:ss");
  }

  function openModalQuestionLog(logId){
    showPropzyLoading();
    $.ajax({
        url: "/question/open-modal-question-log",
        type: "post",
        datatype: 'html',
        data: JSON.stringify({'logId': logId})
    }).done(function (response) {
        $('#modal_here_question_ajax').html(response);
        $('#modalQuestionLog').modal('show');
        hidePropzyLoading();
    })
  }

  var renderTitle = function (data, type, object) {
      if(object.type == 116){
        return "Thay đổi bảng config";
      }else{
        return data;
      }
  }

  var renderContent = function (data, type, object){
      if(object.type == 116){
        return "<a href='#' onclick='openModalQuestionLog("+object.logId+")'>Nhấn để xem lịch sử</a>";
      }else{
        return data;
      }
  }

  $(document).ready(function() {
      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('#_token').val()
          }
      });
      $("#profileHistories").DataTable({
          "processing": true,
          "searching": false,
          "serverSide": true,
          "ajax": "/lead-history/list-histories-question/{{$lead->leadId}}",
          "scrollX": true,
          "lengthChange": false,
          "drawCallback": function () {
                      $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                      var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                          pagination.toggle(this.api().page.info().pages > 1);
                  },
          // "iDisplayLength": 1,
          "columns": [
              {data: 'createdDate', render: dateTimeRender},
              {data: 'title', orderable: false, render: renderTitle},
              {data: 'content', orderable: false, render: renderContent}
          ],
          "order": [[0, 'desc']],
          language:
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
              }   
      });
  } );
</script>
@endsection

@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop

@endsection