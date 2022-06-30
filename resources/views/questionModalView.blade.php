
<script type="text/javascript">
  function confirmDismissModal() {
        if($('#typePageForQuestion').val() != 2){
          var confirmSubmit = bootbox.confirm({
              message: "Thông tin của bạn nhập có thể bị mất nếu chưa hoàn thành, bạn có muốn tiếp tục không?",
              buttons: {
                  confirm: {
                      label: 'Có',
                      className: 'btn-success'
                  },
                  cancel: {
                      label: 'Không',
                      className: 'btn-danger'
                  }
              },
              callback: function (result) {
                if(result == true){
                  $('#QuestionModal').modal('hide');
                }
              }
          });
        }else{
          $('#QuestionModal').modal('hide');
        }
        CRM_ModalQuestion.onHideModal();        
  }
</script>
<!-- Modal -->
<div id="QuestionModal" style="overflow-y:scroll;" class="modal fade" data-backdrop="static" role="dialog">
  <div class="@if(!empty($viewResult)) modal-dialog modal-lg @else modal-dialog @endif">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button class="close modalMinimize"> <i class='fa fa-minus'></i> </button>
        <button type="button" class="close closeQuestion" onclick="confirmDismissModal()">&times;</button>
        <h4 class="modal-title">Bảng đánh giá khách hàng <span id="pointProfileQuestion">( {{$questionModalView->profileValue == '' ? 0 : round($questionModalView->profileValue)}} đ)</span></h4>
      </div>
      <div class="modal-body">
        <!-- <?php if(!empty($questionModalView->customerName)): ?>
          <div class="form-group">
            <label class="col-sm-2">Tên KH</label>
            <div class="col-sm-10">{{$questionModalView->customerName}}</div>
          </div>
        <?php endif; ?> -->
        <div class="row">
          @if(!empty($viewResult))
            <div style="padding-top: 3%;" class="col-md-6">
              {!!$viewResult!!}
            </div>
          @endif
          <div class="@if(!empty($viewResult)) col-md-6 @else col-md-12 @endif">
            <div class="form-group">
                <input type="hidden" id="typePageForQuestion" name="">
                <input type="hidden" name="data" value="{{ json_encode($questionModalView) }}">
                @foreach($questionModalView->resultQuestion as $ques)
                  <label style="margin-top: 20px;" class=" control-label" for="rolename">{{ $ques->questionName }}: 
                   @if($ques->isRequired == true)
                    (*)
                   @endif
                  </label>
                  @if($ques->answerType != 3)
                  <div questionId="{{$ques->questionId}}" class="">
                      <select 
                        @if($ques->isRequired == true)
                         isRequired="isRequired"
                        @endif
                       level="{{$ques->questionId}}" class="multiselect-ui multiselect-ui-parent form-control" 
                        @if($ques->answerType == 2)
                          multiple
                        @endif 
                        >
                        @if($ques->answerType != 2)
                          <option value="">Chọn câu trả lời</option>
                        @endif
                        @foreach($ques->answers as $ans)
                          <option
                            @if(count($ques->results) > 0)
                              @foreach($ques->results as $res)
                                @if($res->answerId == $ans->answerId)
                                  selected
                                  @break
                                @endif
                              @endforeach
                            @endif
                           value="{{ $ans->answerId }}">{{ $ans->answerName }}</option>
                        @endforeach
                      </select>
                  </div>
                  @else
                    <div class="">
                        <input 
                        @if($ques->isRequired == true)
                         isRequired="isRequired"
                        @endif
                        level="{{$ques->questionId}}"
                          @if(count($ques->results) > 0)
                            value="{{ $ques->results[0]->customValue }}"
                          @endif
                         type="" class="form-control" name="">
                    </div>
                  @endif

                  <!-- QUESTION CHILD BLOCK -->

                  @foreach($ques->answers as $ans)
                    @if( count($ans->questions) > 0 )
                      @foreach($ans->questions as $questionChild)
                        <label style="padding-left: 20px" answerId="{{$ans->answerId}}" class="
                            
                            @if(count($questionChild->results) == 0)
                              hidden
                            @endif 
                            
                            control-label">{{ $questionChild->questionName }}: 
                            @if($questionChild->isRequired == true)
                             (*)
                            @endif
                            </label>

                        @if($questionChild->answerType != 3)
                        <div style="padding-left: 20px" answerId="{{$ans->answerId}}" class="

                            @if(count($questionChild->results) == 0)
                              hidden
                            @endif

                            ">
                            <select 
                              @if($questionChild->isRequired == true)
                               isRequired="isRequired"
                              @endif
                            level="{{$ques->questionId}}_{{$ans->answerId}}_{{$questionChild->questionId}}" title="Chọn câu trả lời" class="multiselect-ui form-control" 
                              @if($questionChild->answerType == 2)
                                multiple
                              @endif 
                              >
                              @if($questionChild->answerType != 2)
                                <option value="0">Chọn câu trả lời</option>
                              @endif
                              @foreach($questionChild->answers as $ansChild)

                                <option
                                  @if(count($questionChild->results) > 0)
                                    @foreach($questionChild->results as $res)
                                      @if($res->answerId == $ansChild->answerId)
                                        selected
                                        @break
                                      @endif
                                    @endforeach
                                  @endif
                                 value="{{ $ansChild->answerId }}">{{ $ansChild->answerName }}</option>
                              @endforeach
                            </select>
                        </div>
                        @else
                          <div style="padding-left: 20px" answerId="{{$ans->answerId}}" class="
                            @if(count($questionChild->results) == 0)
                              hidden
                            @endif
                          ">
                              <input
                              @if($questionChild->isRequired == true)
                               isRequired="isRequired"
                              @endif

                              @if(count($questionChild->results) > 0)
                                value="{{ $questionChild->results[0]->customValue }}"
                              @endif
                               level="{{$ques->questionId}}_{{$ans->answerId}}_{{$questionChild->questionId}}" type="" class="form-control" name="">
                          </div>
                        @endif

                      @endforeach
                    @endif
                  @endforeach
                @endforeach

                <!--\ QUESTION CHILD BLOCK -->
            </div>
          </div>
        </div>
        <div id="alertSubmitCompleteQuestion">
            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-block btn-primary btn-submit">Hoàn thành</button>
      </div>
    </div>

  </div>
</div>
