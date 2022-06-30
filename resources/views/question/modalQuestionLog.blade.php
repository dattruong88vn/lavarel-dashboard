<!-- Modal -->
<div id="modalQuestionLog" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
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
          
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
      </div>
    </div>

  </div>
</div>