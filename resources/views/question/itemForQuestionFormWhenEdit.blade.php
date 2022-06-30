@foreach($forms as $que)
<li questionId="{{$que['questionId']}}" style="position: relative; _background-color: #ffffb3;" class="panel ui-sortable-handle" data='{"questionId":"{{$que['questionId']}}","answerType":"{{$que['answerType']}}","questionName":"{{$que['questionName']}}","answers":{{json_encode($que['answers'])}},"isRequired":{{$que['isRequired'] ? 
	"true" : "false"}},"isPrimary":{{ $que['isPrimary'] ? "true" : "false"}}}'>
	<label>
		@if($que['isPrimary'])
			<i class="fa fa-key" aria-hidden="true"></i>
		@endif
		{{$que['questionName']}}
		@if($que['isRequired'] == true) 
			(*) 
		@endif 
		<span class="badge">
			@if($que['answerType'] == 1)
				một câu trả lời
			@elseif($que['answerType'] == 2)
				nhiều câu trả lời
			@else
				nhập câu trả lời
			@endif
		</span>
	<a href="#" onclick="JQuestionPage.editQuestion(this)"></a> <a href="#" onclick="JQuestionPage.delQuestion(this)"></a>
	</label>&nbsp;<input value="{{$que['answerType'] == 3 ? 0 : $que['weight']}}" type="text"
		@if($que['answerType'] == 3)
			disabled="disabled"
		@endif
	 class="scope" onkeyup="JQuestionPage.scope_canculator(this)" style="display: inline-block; width: 40px" placeholder="%">
	<input type="hidden" name="input_hiden_all_data" id="input_hiden_all_data" value='{"questionId":"{{$que['questionId']}}","answerType":"{{$que['answerType']}}","questionName":"{{$que['questionName']}}","answers":{{json_encode($que['answers'])}},"isRequired":{{$que['isRequired'] ? 
	"true" : "false"}},"isPrimary":{{ $que['isPrimary'] ? "true" : "false"}}}'>
	<!-- @if($que['answerType'] != 3) -->
	</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:gray" title="Xem câu hỏi này trong form"  href="javascript:void(0)" onclick="JQuestionPage.viewQuestionForm(this)"><i class="fa fa-eye"></i></a>
	<ul>
		@foreach($que['answers'] as $ans)
			<li >
				{{ $ans['answerName'] }} <input type="text" class="point" value="{{$ans['value']}}" name="" style="display: inline-block; width: 40px" placeholder="Điểm">&nbsp;<a class="slt_question" href="javascript:void(0)" onclick="JQuestionPage.slt_modal_question(this)"><i class="fa fa-cog"></i></a>
				@if(count($ans['toQuestions']) > 0)
				<ul>
					@foreach($ans['toQuestions'] as $toQues)
						<li> {{$toQues['questionName']}} <a questionIdToquestion="{{$toQues['questionId']}}" onclick="JQuestionPage.removeChildQuestion(this)" href="javascript:void(0)"><i class="fa fa-times" aria-hidden="true"></i></a></li>
					@endforeach
				</ul>
				@endif
			</li>
		@endforeach
	</ul>
	<!-- @endif -->
</li>
@endforeach