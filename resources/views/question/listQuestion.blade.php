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
		 <a href="#" onclick="JQuestionPage.editQuestion(this)"><i class="fa fa-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.delQuestion(this)"><i class="fa fa-trash"></i></a>
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