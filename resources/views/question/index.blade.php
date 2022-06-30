@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />

	<div class="row">
		<div style="padding:20px;">
			

			<div class="col-md-6" style="padding-bottom: 200px;border-right: 5px solid #dedede;">
				<div class="alert alert-warning hidden">
				  <strong>Hệ thống:</strong> Vui lòng lưu form hoặc f5 để hủy thao tác.
				</div>
				<div class="panel">
					<!-- <h3 style="text-align: center;">Danh sách câu hỏi đã nhập</h3> -->
					<!-- Question here -->
					
					<div class="questions" style="padding: 10px;">
						<input type="hidden" id="dataUpdateForQuestionText" name="">
						<h4 class="text-center labelForm">THÊM CÂU HỎI</h4>
						<div id="slt_type_block" class="text-center" style="margin-bottom: 10px;">
							<input type="radio" checked="checked" class="type_question" value="1" name="type_question"> 1 câu trả lời &nbsp;&nbsp;&nbsp;&nbsp;
							<input type="radio" class="type_question" value="2" name="type_question"> Nhiều câu trả lời &nbsp;&nbsp;&nbsp;&nbsp;
							<input type="radio" class="type_question" value="3" name="type_question"> Nhập câu trả lời
						</div>
						<textarea id="question" name="" class="form-control input-clean-j" placeholder="Nhập câu hỏi ..."></textarea>
						<input type="hidden" name="id" id="id_question" value="">
						<div class="answer">
							<textarea point="0" name="" answerId="" class="form-control input-clean-j answer_question" placeholder="Câu trả lời ..."></textarea>
							<a href="#">Thêm câu trả lời</a>
						</div>
						<!-- <input type="checkbox" name=""> -->
						<div class="group-action-question">
							<span>
								<input type="checkbox" checked="checked" value="1" id="is_primary" name="is_primary">
								Chọn làm câu hỏi chính
							</span>
							<span>
								<input type="checkbox" value="1" id="isRequired" name="isRequired">
								Câu hỏi bắt buộc
							</span>
							<button class="btn btn-primary" id="submit_question">LƯU</button>
						</div>
					</div>
					<!-- \ Question here -->
					<ul id="sortable1" class="connectedSortable" style="margin-top: 35px;">
						@foreach($questions as $que)
							<li questionId="{{$que->questionId}}" style="position: relative;
								@if($que->isPrimary)
									_background-color: #ffffb3;
								@endif
							" class="panel" data='{"questionId":"{{$que->questionId}}","answerType":"{{$que->answerType}}","questionName":"{{$que->questionName}}","answers":{{json_encode($que->answers)}},"isRequired":{{$que->isRequired ? 
							"true" : "false"}},"isPrimary":{{ $que->isPrimary ? "true" : "false"}}}'>
								<label> 
									@if($que->isPrimary)
										<i class="fa fa-key" aria-hidden="true"></i>
									@endif
										{{ $que->questionName }} 
										@if($que->isRequired == true) 
											(*) 
										@endif
									<span class="badge">
										@if($que->answerType == 1)
											một câu trả lời
										@elseif($que->answerType == 2)
											nhiều câu trả lời
										@else
											nhập câu trả lời
										@endif
									</span>
								 @if($que->isInForm == true)
								 &nbsp;&nbsp;&nbsp;&nbsp;<a style="color:gray" title="Xem câu hỏi này trong form"  href="javascript:void(0)" onclick="JQuestionPage.viewQuestionForm(this)"><i class="fa fa-eye"></i></a>
								 @endif
								 &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.editQuestion(this)"><i class="fa fa-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.delQuestion(this)"><i class="fa fa-trash"></i></a>
								</label>
								<input type="hidden" name="input_hiden_all_data" id="input_hiden_all_data" value='{"questionId":"{{$que->questionId}}","answerType":"{{$que->answerType}}","questionName":"{{$que->questionName}}","answers":{{json_encode($que->answers)}},"isRequired":{{$que->isRequired ? 
							"true" : "false"}},"isPrimary":{{ $que->isPrimary ? "true" : "false"}}}'>
								@if($que->answerType == 1 || $que->answerType == 2)
									<ul>
										@foreach($que->answers as $ans)
											<li >{{ $ans->answerName }}</li>
										@endforeach
									</ul>
								@endif
								@if($que->isPrimary)
									<a href="#"><i style="position: absolute;right: 5px; top: 5px;" class="fa fa-arrows-h fa-2x" style=""></i></a>
								@endif
							</li>
						@endforeach
					</ul>
				</div>
			</div>
			<div class="col-md-6" style="padding-bottom: 200px;">
				<div class="panel">
					<h3 id="displayblockForm" class="text-center" >Form đánh giá khách hàng <span class="scope_display">(0%)</span></h3>

					<ul id="sortable2" class="connectedSortable">
						@foreach($forms as $que)
						<li questionId="{{$que->questionId}}" style="position: relative; _background-color: #ffffb3;" class="panel ui-sortable-handle" data='{"questionId":"{{$que->questionId}}","answerType":"{{$que->answerType}}","questionName":"{{$que->questionName}}","answers":{{json_encode($que->answers)}},"isRequired":{{$que->isRequired ? 
							"true" : "false"}},"isPrimary":{{ $que->isPrimary ? "true" : "false"}}}'>
							<label>
								@if($que->isPrimary)
									<i class="fa fa-key" aria-hidden="true"></i>
								@endif
								{{$que->questionName}}
								@if($que->isRequired == true) 
									(*) 
								@endif 
								<span class="badge">
									@if($que->answerType == 1)
										một câu trả lời
									@elseif($que->answerType == 2)
										nhiều câu trả lời
									@else
										nhập câu trả lời
									@endif
								</span>
							<a href="#" onclick="JQuestionPage.editQuestion(this)"></a> <a href="#" onclick="JQuestionPage.delQuestion(this)"></a>
							</label>&nbsp;<input value="{{$que->answerType == 3 ? 0 : $que->weight}}" type="text"
								@if($que->answerType == 3)
									disabled="disabled"
								@endif
							 class="scope" onkeyup="JQuestionPage.scope_canculator(this)" style="display: inline-block; width: 40px" placeholder="%">
							<input type="hidden" name="input_hiden_all_data" id="input_hiden_all_data" value='{"questionId":"{{$que->questionId}}","answerType":"{{$que->answerType}}","questionName":"{{$que->questionName}}","answers":{{json_encode($que->answers)}},"isRequired":{{$que->isRequired ? 
							"true" : "false"}},"isPrimary":{{ $que->isPrimary ? "true" : "false"}}}'>
							</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:gray" title="Xem câu hỏi này trong form"  href="javascript:void(0)" onclick="JQuestionPage.viewQuestionForm(this)"><i class="fa fa-eye"></i></a>
							<!-- @if($que->answerType != 3) -->
							<ul>
								@foreach($que->answers as $ans)
									<li >
										{{ $ans->answerName }} <input type="text" class="point" value="{{$ans->value}}" name="" style="display: inline-block; width: 40px" placeholder="Điểm">&nbsp;<a class="slt_question" href="javascript:void(0)" onclick="JQuestionPage.slt_modal_question(this)"><i class="fa fa-cog"></i></a>
										@if(count($ans->toQuestions) > 0)
										<ul>
											@foreach($ans->toQuestions as $toQues)
												<li> {{$toQues->questionName}} <a questionIdToquestion="{{$toQues->questionId}}" onclick="JQuestionPage.removeChildQuestion(this)" href="javascript:void(0)"><i class="fa fa-times" aria-hidden="true"></i></a></li>
											@endforeach
										</ul>
										@endif
									</li>
								@endforeach
							</ul>
							<!-- @endif -->
						</li>
						@endforeach
					</ul>
				</div>
				<a href="#" onclick="JQuestionPage.createOrUpdateQuestionForm()" style="width: 100%" class="btn btn-primary saveFormQuestion">Lưu form</a>
			</div>
		</div>
	</div>



	<!-- Modal -->
	<div id="modal_select_question" class="modal fade" role="dialog">
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
	      		<div>
	      		 	<input type="checkbox" questionName="{{$que->questionName}}" value="{{ $que->questionId }}" class="questionUnPrimaryKeySelect"> {{$que->questionName}}
	      		 </div>
	      		@endif
	      	@endforeach
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
	        <button type="button" class="btn btn-primary" onclick="JQuestionPage.saveChildQuestion()">Lưu</button>
	      </div>
	    </div>

	  </div>
	</div>

@endsection
@section('page-js')
	<script type="text/javascript">
		$.ajaxSetup({
		    headers: {
		        'X-CSRF-TOKEN': $('#csrf-token').val()
		    }
		});
		JQuestionPage.submitQuestion();
		JQuestionPage.addmoreanwser();
		JQuestionPage.dragQuestion();
		JQuestionPage.readyDom();
	</script>
@stop
@section('page-css')
	<style type="text/css">
		.questions label{padding-left: 10px;}
			.questions .input-clean-j{
				border-top: none;
			    border-left: none;
			    border-right: none;
			}
			.questions .answer{padding-left: 30px; text-align: right;}
				.questions .answer a{font-size: 12px;}
				.questions .group-action-question{margin-top: 10px;}
				.questions .group-action-question span{ margin-right: 10px; }
	</style>
@stop
