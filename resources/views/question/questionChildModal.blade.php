<div class="modal-dialog">

	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">Chọn logic câu hỏi phụ</h4>
	      </div>
	      <div class="modal-body">
	      	<input type="hidden" id="dataQuestionModal" name="">
	      	<input type="hidden" id="positionQuestionModal" name="">
	      	<input type="hidden" id="positionAnswerModal" name="">
	      	@foreach($questions as $que)
	      		@if(!$que->isPrimary)
	      		 <input type="checkbox" questionName="{{$que->questionName}}" value="{{ $que->questionId }}" class="questionUnPrimaryKeySelect"> {{$que->questionName}} <br/>
	      		@endif
	      	@endforeach
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
	        <button type="button" class="btn btn-primary" onclick="JQuestionPage.saveChildQuestion()">Lưu</button>
	      </div>
	    </div>

	  </div>