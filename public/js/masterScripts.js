// **************************
// LOGIC
// - Đặt tên module tương đương page cần chạy và có chữ J đầu tiên
// - Gọi file vào Page đó và call module để dùng
// - Author: Quang Huynh (quang.huynh@propzy.com)
// **************************

// HOW TO USE at other files
// $.getScript('path_to_file.js', function()
// {
//    // run script that depends on scripta.js and scriptb.js
// });
// ---------------------

// ĐƯỜNG DẪN THỰC TẾ và ví dụ thực tế
// $.getScript('/js/QuangScripts.js', function()
// {
//    JModule.CLMyName();
// });


// EXAMPLE CODE
// var Module = (function () {

// 	var privateArray = [];

// 	var publicMethod = function (somethingOfInterest) {
// 	   privateArray.push(somethingOfInterest);
// 	};

//     var privateMethod = function (message) {
//       console.log(message);
//     };

//     var publicMethod = function (text) {
//       privateMethod(text);
//     };

//     return {
//       publicMethod: publicMethod
//     };

// })();

// // Example of passing data into a private method
// // the private method will then `console.log()` 'Hello!'
// Module.publicMethod('Hello!');


var JModule = (function() {

	var CLMyName = function(){
		console.log('Jack');
	};

	return {
		CLMyName : CLMyName
	};

})();


var JModuleFunctionHelper = (function() {

	var console_warning = function(){

		console.log('%cDừng lại!', 'color: red; font-size: 50px; font-family: sans-serif; text-shadow: 1px 1px 5px #000;');
		console.log('%cCó vẻ như bạn đang cố tình can thiệp vào hệ thống!', 'color: #444; font-size: 25px; font-family: sans-serif;');
		console.log('%cTruy cập https://propzy.vn/thong-tin/chinh-sach-bao-mat để biết thêm thông tin chi tiết.', 'color: #444; font-size: 25px; font-family: sans-serif;');
	};


	// Reset tất cả INPUT nằm trong tag's class chỉ định
	var clear_form_elements = function(sellector) {

	  jQuery(sellector).find(':input').each(function() {
	    switch(this.type) {
	        case 'password':
	        case 'text':
	        case 'textarea':
	        case 'file':
	        case 'select-one':
	        case 'select-multiple':
	        case 'date':
	        case 'number':
	        case 'tel':
	        case 'email':
	            jQuery(this).val('');
	            break;
	        case 'checkbox':
	        case 'radio':
	            this.checked = false;
	            break;
	    }
	  });
	}

	return {
		clear_form_elements : clear_form_elements,
		console_warning : console_warning
	}

})();


var JModalConfirmMeetingRequestModule = (function(){

	var ShowMoreInputChild = function(){

		// Jquery hide/show more option
		$(document).ready(function(){

		    $('.form-show-hidden').hide();
		    $('.changeHideShow').on('change',function(){
		        var id = '#'+$(this).val();
		        // reset input
		        JModuleFunctionHelper.clear_form_elements(id);
		        // hide all form
		        $(this).siblings( ".neighbours" ).children('.form-show-hidden').hide();
		        // show only form chossed
		        $(id).show();
		    });

		    $('.form-show-hidden-not-id').on('change',function(){
		        if($(this).val() != ""){
		            $(this).siblings( ".neighbours" ).children('.form-show-hidden').show();
		        }else{
		            $(this).siblings( ".neighbours" ).children('.form-show-hidden').hide();
		        }
		    });

		})
	}

	return {
		ShowMoreInputChild : ShowMoreInputChild
	}

})();


var JModalConfirmMeetingRequest = (function(){

	var show_hide_button_group = function(){
		$(document).ready(function(){
			$('.hide-btn-action-group').hide();
			$('.show-btn-action-group .btn-hide').on('click',function(){
				$('.show-btn-action-group').hide("slow");
				$('.hide-btn-action-group').show("slow");
			})

			$('.hide-btn-action-group .btn-hide').on('click',function(){
				$('.hide-btn-action-group').hide("slow");
				$('.show-btn-action-group').show("slow");
			})
		})
	}

	return {
		show_hide_button_group : show_hide_button_group
	}
})();

var JDealPage = (function(){

	var searchListingHistory = function(dealID){
		var data = {
		    "keySearch": null,
		    "privateListing": "2",
		    "sortColumn": "rlistingId",
		    "sortType": "asc",
		    "wardsList": [290, 82, 84, 86, 117],
		    "fromTo": [{
		        "type": "alley",
		        "fromAlley": "34",
		        "toValue": 9999999999
		    }, {
		        "fromValue": "3434",
		        "toValue": "0",
		        "type": "length"
		    }, {
		        "fromValue": "3434",
		        "toValue": "3432",
		        "type": "width"
		    }],
		    "districtsList": [1,2,3],
		    "directionsList": [1,2,3],
		}
	}

	return {
		searchListingHistory : searchListingHistory
	}
})();


var JQuestionPage = (function(){

	var addmoreanwser = function(){
		$(".answer a").on('click',function(){
			$( ".answer a" ).before( '<textarea point="0" name="" answerId="" class="form-control input-clean-j answer_question" placeholder="Câu trả lời ..."></textarea>' );
			$('.answer_question').last().focus();
			return false;
		})
	}

	var dragQuestion = function(){
		$( function() {
			$('.type_question').on('click',function(){
				if($(this).val() == '3'){
					$('.answer').hide();
					$('.answer_question').val('');
				}else{$('.answer').show()}

				if($(this).val() == '2'){
					$('input#is_primary').prop('checked',false);
					$('input#is_primary').attr('disabled','disabled');
				}else{
					$('input#is_primary').prop('checked',true);
					$('input#is_primary').removeAttr('disabled');
				}
			})

		    $( "#sortable1, #sortable2" ).sortable({
		      connectWith: ".connectedSortable",
		      stop: function( event, ui ) {
	      		JQuestionPage.replaceElement();
		      }
		    }).disableSelection();

		    // CLICK DRAG TO FORM
		    $("#sortable1 .fa-arrows-h, #sortable2 .fa-arrows-h").on('click',function(){
		    	if($(this).parents().eq(2).attr('id') == 'sortable1'){
		    		if( $('#sortable2').find('li[questionId="'+$(this).parents().eq(1).attr('questionId')+'"]').length > 0 ) {
		    			console.log('in form'); return false;
		    		}
		    		// console.log($('#sortable2').find('li[questionId="'+$(this).parents().eq(1).attr('questionId')+'"]').length)
		    	}
		    	$(this).parents().eq(2).attr('id') == 'sortable1' ?  $(this).parent('a').parent('li').clone().appendTo("#sortable2") : $(this).parent('a').parent('li').remove();
		    	
		    	$('#sortable2 li[questionId='+$(this).parents().eq(1).attr('questionId')+']').addClass('questionAction');

		    	$("html, body").animate({
		    	        scrollTop: $('#sortable2 li[questionId='+$(this).parents().eq(1).attr('questionId')+']').offset().top
		    	    });
		    	JQuestionPage.replaceElement();
		    	setTimeout(function(){
		    		$('body').find('*').removeClass('questionAction');
		    	},3000);
		    	// return false;
		    })

		  } );
	}

	var viewQuestionForm = function(element){
		if($(element).parents().eq(2).attr('id') == 'sortable1'){
			console.log($(element).parents().eq(2).attr('id')) ;
			var questionId = $(element).parents().eq(1).attr('questionId');
			if( $('#sortable2').find('li[questionId="'+questionId+'"]').length > 0 ) {
				$('#sortable2 li[questionId='+questionId+']').addClass('questionAction');

				$("html, body").animate({
				        scrollTop: $('#sortable2 li[questionId='+questionId+']').offset().top
				    });
				setTimeout(function(){
					$('body').find('*').removeClass('questionAction');
				},3000);
			}else{return false;}
		}else{
			var questionId = $(element).parents().eq(0).attr('questionId');
			if( $('#sortable1').find('li[questionId="'+questionId+'"]').length > 0 ) {
				$('#sortable1 li[questionId='+questionId+']').addClass('questionAction');

				$("html, body").animate({
				        scrollTop: $('#sortable1 li[questionId='+questionId+']').offset().top
				    });
				setTimeout(function(){
					$('body').find('*').removeClass('questionAction');
				},3000);
			}else{return false;}
		}
	}


	var replaceElement = function(){
  		console.log($('#sortable2').sortable('toArray',{attribute : 'data'}))
  		$('#sortable2 .fa-edit').remove();
  		$('#sortable2 .fa-trash').remove();
  		$('#sortable2 .fa-arrows-h').remove();
  		$('#sortable2 li.panel').each(function(){
  			if($(this).find('input.scope').length == 0){
  				$(this).find('label').html( $(this).find('label').html().replace(/&nbsp;/g, '') );
  				$(this).find('.fa-eye').remove();
  				var disabledScopeAnwserTypeFreeText = "";
  				if(JSON.parse($(this).attr('data')).answerType == "3" ){
  					disabledScopeAnwserTypeFreeText = 'value="0" disabled="disabled"';
  				}
  				$(this).find('label').after('&nbsp;<input type="text" '+disabledScopeAnwserTypeFreeText+' class="scope" onkeyup="JQuestionPage.scope_canculator(this)" style="display: inline-block; width: 40px" placeholder="%">&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:gray" title="Xem câu hỏi này trong form"  href="javascript:void(0)" onclick="JQuestionPage.viewQuestionForm(this)"><i class="fa fa-eye"></i></a>')
  			}
  			if($(this).find('input.point').length == 0){
  				$(this).find('ul>li').append('&nbsp;<input type="text" class="point" name="" style="display: inline-block; width: 40px" placeholder="Điểm">&nbsp;<a class="slt_question" href="#" onclick="JQuestionPage.slt_modal_question(this)"><i class="fa fa-cog"></i></a>');
  			}
  		})
  		$('#sortable1').find('label').each(function(){
  			$(this).html( $(this).html().replace(/&nbsp;/g, '') );
  		})
  		$('#sortable1 .fa-edit, #sortable1 .fa-trash,#sortable1 .fa-cog').remove();
  		$('#sortable1 .scope, #sortable1 .point').remove();

  		if($('.questions').is(":visible")){
  			$('#sortable1 label').append('&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.editQuestion(this)"><i class="fa fa-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp;<a onclick="JQuestionPage.delQuestion(this)" href="#"><i class="fa fa-trash"></i></a>')
  		}else{
  			$('#sortable1 label').append('&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="JQuestionPage.delQuestion(this)" href="#"><i class="fa fa-trash"></i></a>')

  		} 
      	JQuestionPage.scope_canculator('selector')
	}

	var delQuestion = function(element){
		var confirmDel = confirm("Bạn có chắc muốn xóa câu hỏi này?");
		if(confirmDel == true){
			var questionId = $(element).parents().eq(1).attr('questionId');
			// case del have question in form
			if($('#sortable2').find('li[questionId="'+questionId+'"]').length > 0){
				$('#sortable1').find('li[questionId="'+questionId+'"]').addClass('questionIsDelete');
				$('#sortable2').find('li[questionId="'+questionId+'"]').addClass('questionIsDelete');
				var data = $('#sortable2').find('li[questionId="'+questionId+'"]').attr('data');
				data = JSON.parse(data);
				data['isDeleted'] = true;
				$('#sortable2').find('li[questionId="'+questionId+'"]').attr('data',JSON.stringify(data));
				JQuestionPage.scope_canculator('selector')
				$('.questions, #sortable1 .fa-edit').hide();
				$('.alert-warning').removeClass('hidden');
				return false;
			}else{ // case del direct (question not in form)
				requestData = {'questionId' : questionId}
				$.ajax({
				    url: "/question/delete",
				    type: "POST",
				    data: JSON.stringify(requestData)
				}).done(function(response) {
					console.log(response);
					$(element).parents().eq(1).remove();
				});
			}
		}
		return false;
	}

	var submitQuestion = function(){
		$( function() {
			$('#submit_question').on('click',function(){
				showPropzyLoading();
				var requestData = {};
				var type_question = $('input:radio[name=type_question]:checked').val();
				if( $('#question').val() != "" ){
					var li_answer = "";
					var arr_answer = [];
					if($('.answer_question').length > 0){
						$('.answer_question').each(function(){
							if($(this).val()!=''){
								li_answer += '<li >'+$(this).val()+'</li>';
								arr_answer.push({
									'answerId':$(this).attr('answerId') == "" ? null : $(this).attr('answerId'),
									'answerName':$(this).val(),
									'value' : $(this).attr('point')
								});
							}
						})
					}

					if(arr_answer.length == 0){
						if(type_question == 1 || type_question == 2){
							$('.answer_question:nth-child(1)').attr('style','border: 1px solid red');
							hidePropzyLoading()
							return false;
						}else{
							if($('#id_question').val() == ""){
								arr_answer.push({'answerId':null,'answerName':null,'value':null})
							}else{
								arr_answer =  JSON.parse( $('#dataUpdateForQuestionText').val() ).answers ;
							}
						}
					}

					requestData = {
						questionId : $('#id_question').val() == "" ? null : $('#id_question').val(),
						answerType : type_question,
						questionName : $('#question').val(),
						answers : arr_answer,
						isPrimary : $('input[name=is_primary]:checked').length > 0 ? true : false,
						isRequired : $('input[name=isRequired]:checked').length > 0 ? true : false,
					}
				}else{
					$('#question').attr('style','border: 1px solid red');
					hidePropzyLoading();
					return false;
				}

				// console.log(JSON.stringify(requestData)  );return false;

				if($('#id_question').val() == ""){
					$.ajax({
					    url: "/question/create-or-update",
					    type: "POST",
					    data: JSON.stringify(requestData)
					}).done(function(response) {
						// console.log(response);return false;
						$.ajax({
						    url: "/question/get-question-list",
						    type: "GET"
						}).done(function(responseGetQuestionList) {
							console.log(responseGetQuestionList);
							$('#sortable1').html(responseGetQuestionList)
							$('.input-clean-j').val('');
							var scrollToQuestion = $('#sortable1').find('li[questionId="'+response.data.questionId+'"]');
							hidePropzyLoading()
							$("html, body").animate({
							        scrollTop: scrollToQuestion.offset().top
							    });
							scrollToQuestion.addClass('questionAction');
							setTimeout(function(){
									scrollToQuestion.removeClass('questionAction');
								},3000)
							// call for drag question to form first submit
							JQuestionPage.dragQuestion();
							// location.reload();
						});

						// update modal question child
						$.ajax({
						    url: "/question/update-question-child",
						    type: "GET"
						}).done(function(responseGetQuestionChild) {
							console.log('update child');
							$('#modal_select_question').html(responseGetQuestionChild)
							// location.reload();
						});
						// location.reload();
						// console.log(response)
						// var input_hiden_all_data = "<input type='hidden' name='input_hiden_all_data' id='input_hiden_all_data' value='"+JSON.stringify(response.data)+"' /> " ;
						// var question_block = '<li data='+JSON.stringify(response.data)+' class="panel"><label>'+$('#question').val()+' &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.editQuestion(this)"><i class="fa fa-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.delQuestion(this)"><i class="fa fa-trash"></i></a></label>'+input_hiden_all_data+'<ul>'+li_answer+'</ul></li>'
						// $('#sortable1').prepend(question_block);
						

					});
				}else{
					// TRƯỜNG HỢP UPDATE / EDIT
					// console.log(JSON.stringify(requestData));return false;
					$.ajax({
					    url: "/question/create-or-update",
					    type: "PUT",
					    data: JSON.stringify(requestData)
					}).done(function(response) {
						// console.log(response.data);
						var requestData = {item:response.data};
						// change left collum when edit
						$.ajax({
						    url: "/question/get-question-list",
						    type: "GET"
						}).done(function(responseGetQuestionList) {
							console.log(responseGetQuestionList)
							$('#sortable1').html(responseGetQuestionList)
							$('.input-clean-j').val('');
							$('#id_question').val();
							$('.labelForm').html('THÊM CÂU HỎI');
							var scrollToQuestion = $('#sortable1').find('li[questionId="'+response.data.questionId+'"]');
							hidePropzyLoading()
							$("html, body").animate({
							        scrollTop: scrollToQuestion.offset().top
							    });
							scrollToQuestion.addClass('questionAction');
							setTimeout(function(){
								scrollToQuestion.removeClass('questionAction');
							},3000)
							JQuestionPage.dragQuestion();
							// location.reload();
						});
						// change right collum when edit
						$.ajax({
						    url: "/question/add-item-edited-to-form",
						    type: "POST",
						    data: JSON.stringify(requestData)
						}).done(function(itemJson) {
							// console.log($('#sortable2').has('li[questionId="'+response.data.questionId+'"]').length)
							if( $('#sortable2').has('li[questionId="'+response.data.questionId+'"]').length  ){
								// console.log('isset');
								$('#sortable2').find('li[questionId="'+response.data.questionId+'"]').replaceWith(itemJson);
							}
						})

						// update modal question child
						$.ajax({
						    url: "/question/update-question-child",
						    type: "GET"
						}).done(function(responseGetQuestionChild) {
							console.log('update child');
							$('#modal_select_question').html(responseGetQuestionChild)
							// location.reload();
						});
						// location.reload();
						// console.log(response)
						// var input_hiden_all_data = "<input type='hidden' name='input_hiden_all_data' id='input_hiden_all_data' value='"+JSON.stringify(response.data)+"' /> " ;
						// var question_block = '<li class="panel"><label>'+$('#question').val()+' &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.editQuestion(this)"><i class="fa fa-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="JQuestionPage.delQuestion(this)"><i class="fa fa-trash"></i></a></label>'+input_hiden_all_data+'<ul>'+li_answer+'</ul></li>'
						// $('#sortable1').prepend(question_block);
						// $('.input-clean-j').val('');
					});
				}

			})
		});
	}


	var editQuestion = function(element) {
		$('#dataUpdateForQuestionText').val($(element).parent().siblings('input[name=input_hiden_all_data]').val());
		$('.labelForm').html('SỬA CÂU HỎI');
		$('.questions').addClass('questionAction');
		var data = JSON.parse($(element).parent().siblings('input[name=input_hiden_all_data]').val()) ;
		// $(element).parent().parent('.panel').remove();
		switch(data.answerType) {
		    case '2':
		        $('input:radio[value="2"]').prop("checked", true);
		        break;
		    case '3':
		        $('input:radio[value="3"]').prop("checked", true);
		        break;
		    default:
		        $('input:radio[value="1"]').prop("checked", true);
		}
		$('#id_question').val(data.questionId);
		if(data.isPrimary == true){
			$('input:checkbox[name=is_primary]').prop("checked",true);
		}else{
			$('input:checkbox[name=is_primary]').prop("checked",false);
		}

		if(data.isRequired == true){
			$('input:checkbox[name=isRequired]').prop("checked",true);
		}else{
			$('input:checkbox[name=isRequired]').prop("checked",false);
		}

		$('#question').val(data.questionName);
		$('.answer_question').remove();
		if(data.answers.length > 0 && data.answerType != '3'){
			for(var render = 0; render < data.answers.length; render++){
				$('.answer').find('a').click();
				$('.answer').find('.answer_question').each(function(){
					console.log(data.answers[render].answerName);
					if($(this).val() == ''){
						$(this).val(data.answers[render].answerName)
						data.answers[render].value == null ? $(this).attr('point',0) : $(this).attr('point',data.answers[render].value)
						$(this).attr("answerId",data.answers[render].answerId)
					}
				})
			}
		}

		setTimeout(function(){
			$('.questions').removeClass('questionAction');
		},3000)
		return false
	}


	var slt_modal_question = function(element){
		showPropzyLoading()
		// update modal question child
		$.ajax({
		    url: "/question/get-question-list-modal",
		    type: "GET"
		}).done(function(responseGetQuestionChild) {
			$('#modal_select_question').html(responseGetQuestionChild)
			$('#modal_select_question input:checkbox').removeAttr('checked');
			// CẬP NHẬT CÂU HỎI PHỤ
			// - vị trí li của câu hỏi chính, data attr
			// - vị trí câu trả lời
			// - đã chọn r thì cho checked
			// - tất cả quăng vô form modal
			// LỌC CÂU HỎI PHỤ ĐÃ CÓ TRONG FORM
			var questionsChildInForm = [];
			$('#sortable2 li').each(function(){
				if(typeof $(this).attr('data') !== 'undefined'){
					var dataQuestion = JSON.parse($(this).attr('data'));
					$.each(dataQuestion.answers,function(index,value){
						if(value.toQuestions.length > 0){
							$.each(value.toQuestions,function(ind,val){
								questionsChildInForm.push(val.questionId);
							})
						}
					})
				}
			})
			$.each(questionsChildInForm,function(index,value){
				$('#modal_select_question .questionUnPrimaryKeySelect').each(function(){
					if( $(this).val() == value ){
						$(this).parent('div').remove();
					}
				})
			})
			// console.log(questionsChildInForm);return false;

			var data = $(element).parents().eq(2).attr('data');
			$('#dataQuestionModal').val(data);
			var positionQuestion = $(element).parents().eq(2).index();
			$('#positionQuestionModal').val(positionQuestion);
			var posionAnswer = $(element).parent('li').index();
			$('#positionAnswerModal').val(posionAnswer);
			$('#modal_select_question').modal('show');
			hidePropzyLoading();
			return false;
		});
	}


	var removeChildQuestion = function(element){
		// console.log($(element).parent('li').text());
		var data = JSON.parse( $(element).parents().eq(4).attr('data') );
		$.each(data.answers,function(index,value){
			var toQuestionChange = []
			$.each(value.toQuestions,function(ind,val){
				// console.log(val.questionName)
				if(val.questionId){
					if(val.questionId != $(element).attr('questionIdToquestion')){
						toQuestionChange.push({questionId : val.questionId, questionName : val.questionName})
					}
				}
			})
			data.answers[index].toQuestions = toQuestionChange; 
		})
		$(element).parents().eq(4).attr('data',JSON.stringify(data))
		$(element).parent('li').remove();
		return false;
	}

	var saveChildQuestion = function(){
		var posionAnswer = $('#positionAnswerModal').val();
		var liAdd = "";
		var toQuestion = [];
		var data = JSON.parse($('#dataQuestionModal').val());
		$('.questionUnPrimaryKeySelect').each(function(){
			if($(this).is(":checked")){
				liAdd += "<li>"+$(this).attr('questionName')+"</li>";
				data.answers[posionAnswer].toQuestions.push({
					questionId :$(this).val(),
					questionName :$(this).attr('questionName')
				})
			}
		})
		// data.answers[posionAnswer].toQuestions = toQuestion;
		data = JSON.stringify(data);
		var positionQuestion = $('#positionQuestionModal').val();
		postionDomQuestion = parseInt(positionQuestion) + 1;
		postionDomAnswer = parseInt(posionAnswer) + 1
		$('#sortable2 li:nth-child('+postionDomQuestion+')').attr('data',data);
		// $('#sortable2 li:nth-child('+postionDomQuestion+') ul').children('ul li:nth-child('+postionDomAnswer+')').find('ul').remove() ;
		// $('#sortable2 > li:nth-child('+postionDomQuestion+') > ul > li:nth-child('+postionDomAnswer+') > ul').remove();
		$('#sortable2 > li:nth-child('+postionDomQuestion+') > ul > li:nth-child('+postionDomAnswer+')').append('<ul>'+liAdd+'</ul>');
		// $('#sortable2 li:nth-child('+postionDomQuestion+') ul').children('ul li:nth-child('+postionDomAnswer+')').append('<ul>'+liAdd+'</ul>') ;
		$('#modal_select_question').modal('hide');
		return false;
	}


	var scope_canculator = function(element){
		var total = [];
		$('.scope').each(function(){
			if($(this).val() != ''){
				total.push( parseInt($(this).val()));
			}
		})
		var sum = total.reduce(add, 0);

		var excludeArr = []
		$('#sortable2 .questionIsDelete').find('.scope').each(function(){
			if($(this).val() != ''){
				excludeArr.push( parseInt($(this).val()));
			}
		})
		var exclude = excludeArr.reduce(add,0);

		var resultCount = sum-exclude;
		$('.scope_display').html(resultCount +' %');

		console.log(resultCount);
		if(resultCount != 100){
			$('.saveFormQuestion').attr("disabled", true)
		}else{
			$('.saveFormQuestion').attr("disabled", false)
		}

		function add(a, b) {
		    return a + b;
		}
	}


	var createOrUpdateQuestionForm = function(){
		if ($('.saveFormQuestion').attr('disabled') !== undefined){
			return false;
		}
		// var confirmSubmit = confirm("Những thay đổi này có thể ảnh hưởng đến hồ sơ những khách hàng trước đây. Bạn có chắc chắn muốn lưu?");
		var confirmSubmit = bootbox.confirm({
		    message: "Những thay đổi này có thể ảnh hưởng đến hồ sơ những khách hàng trước đây. Bạn có chắc chắn muốn lưu?",
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
		    		showPropzyLoading();
		    		// return false;
		    		// kiểm tra trọng số đã đủ 100% chưa
		    		if($('.scope_display').html() == '100 %'){
		    			var dataReq = [];
		    			var questionList = $('#sortable2').sortable('toArray',{attribute : 'data'});
		    			for(var i = 0; i < questionList.length; i++){
		    				if(questionList[i] != ''){
		    					// console.log(questionList[i]);
		    					var dataParse = JSON.parse(questionList[i]);
		    					// DOM TỚI LI CHỨA VALUE NÀY để:
		    					// - update lại data (thêm trọng số và điểm)
		    					var positionLi = i+1; // dom nth bắt đầu từ 1
		    					var liTagThisValue = $('#sortable2 li:nth-child('+positionLi+')');
		    					// code proccess point here
		    					var itemPointAnswer = 0;
		    					var maxArrayPush = [];
		    					dataParse['weight'] = $(liTagThisValue).children('.scope').val(); // trọng số % của câu hỏi
		    					$(liTagThisValue).find('ul > li > input.point').each(function(){ // mảng điểm câu trả lời
		    						dataParse.answers[itemPointAnswer]['value'] = $(this).val() == '' ? 0 : $(this).val();
		    						maxArrayPush.push(dataParse.answers[itemPointAnswer]['value'])
		    						itemPointAnswer = itemPointAnswer+1;
		    					});
		    					// console.log(maxArrayPush)
		    					// console.log(JQuestionPage.MaxArray(maxArrayPush) )
		    					if(maxArrayPush.length > 0){
		    						if(JQuestionPage.MaxArray(maxArrayPush) == 0 && $(liTagThisValue).children('.scope').val() > 0){
		    							hidePropzyLoading();
		    							$(liTagThisValue).find('ul > li > input.point').attr('style','display: inline-block; width: 40px;border: 1px solid red')
		    							alert('Bạn cần nhập điểm cho các câu trả lời !')
		    							return false
		    						}
		    					}
		    					// console.log(JSON.stringify(JQuestionPage.MaxArray(maxArrayPush)));return false;
		    					 
		    					dataReq.push(dataParse); // xử lý xong đẩy vào mảng này để request api
		    					
		    				}
		    			}

		    			

		    			$.ajax({
		    			    url: "/question/set-question-form",
		    			    type: "POST",
		    			    data: JSON.stringify(dataReq)
		    			}).done(function(response) {
		    				console.log(response)
		    				location.reload();
		    			});
		    		}
		    	}
		    }
		});
	}


	var MaxArray = function(arr){
	  return arr.reduce(function (p, v) {
	    return ( p > v ? p : v );
	  });
	}


	var readyDom = function(){
		$(document).ready(function(){
			window.onscroll = function() {scrollFunction()};

			function scrollFunction() {
			    if (document.body.scrollTop > $('#displayblockForm').innerHeight() || document.documentElement.scrollTop > $('#displayblockForm').innerHeight()) {
			        //document.getElementByClass("myBtn").style.display = "block";
			    	$('#displayblockForm').attr('style','position:fixed;right:3%;top:0;z-index:9999999;width:150px;background-color:#3c8dbc;opacity:0.5; color:white')
			    } else {
			    	$('#displayblockForm').attr('style','')
			        //document.getElementByClass("myBtn").style.display = "none";
			    }
			}

			JQuestionPage.scope_canculator()
		})
	}


	return {
		MaxArray : MaxArray,
		readyDom : readyDom,
		replaceElement : replaceElement,
		createOrUpdateQuestionForm : createOrUpdateQuestionForm,
		scope_canculator : scope_canculator,
		editQuestion : editQuestion,
		delQuestion : delQuestion,
		slt_modal_question : slt_modal_question,
		submitQuestion : submitQuestion,
		addmoreanwser : addmoreanwser,
		dragQuestion : dragQuestion,
		saveChildQuestion : saveChildQuestion,
		viewQuestionForm : viewQuestionForm,
		removeChildQuestion : removeChildQuestion
	}
})();

// Dvquoc add this function use for notify
//type = ['', 'info', 'success', 'warning', 'danger'];
// element : Element is add notifytion. Default is body.
var dashboardNotify =  function(type='success',messaInput='Test thông báo.',element='body',position=['top', 'center'],timer =3000,callback =null) {
    return  $.notify({
        icon: "notifications",
        message: messaInput
    }, {
        element: element,
        type: type,
        timer:1000,
        placement: {
            from: position[0],
            align: position[1]
        },
        onClosed:callback,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        }
    });
};
