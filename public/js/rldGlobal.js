var JMeeting = (function() {

	var loadCreateMeetingModal = function(){
		console.log(moment("14/09/2018 10:28", 'DD/MM/YYYY HH:mm').unix());
		$('#modal-create-meeting-tm').modal();
		listenShowModal();
	};
	var oldTime = "";
	var listenShowModal = function(){
		// không cho xóa và chỉ cho nhập số input time và date
		disBackSpace();
		validNumberDirect();
		$('#modal-create-meeting-tm').on('shown.bs.modal', function() {
			findCrms(null,null);
			// render time input
		    $('#modal-create-meeting-tm .timepicker').timepicker({
                autoclose: true,
                showMeridian: false
            }).on('changeTime.timepicker', function (e) {
            	// console.log(e);
            	var newTime = $('#modal-create-meeting-tm .timepicker').val();
            	if(oldTime!=newTime){
            		// console.log(e);
            		findCrms(null,null);
            	}
            	oldTime=newTime;
		    });
            // render date input
            $("#modal-create-meeting-tm .whenDate").bind('keydown',function(e){
            	// Không cho enter tránh làm trống dữ liệu
				if (e.which == 13)
			        e.stopImmediatePropagation();
		  	}).datepicker({
            	autoclose: true, 
            	startDate: '0 days',
            	format: 'dd/mm/yyyy',
            	defaultViewDate: {}
            }).on("changeDate", function (e) {
		        // console.log(e);
		        findCrms(null,null);
		    })

            listenChangeSelect();
		})
	};

	// chỉ cho nhập số
	var validNumberDirect = function(){
	    $(".numvad").keypress(function (e) {
	     if (e.which != 8 && e.which != 13 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	        return false;
	    }
	   });
	}

	// cấm bấm nút xóa hoặc delete
	var disBackSpace = function(){
		$('.disspace').keydown(function(e) {
		    if (e.keyCode === 8 || e.keyCode === 46) {
		        return false;
		    }
		});
	}

	var findCrms = function(reminderDate, currentId) {
		$('#modal-create-meeting-tm .submit').addClass('disabled');
	    if (!reminderDate) {
	        var whenDate = $("#modal-create-meeting-tm .whenDate").val();
	        var whenTime = $("#modal-create-meeting-tm .whenTime").val();
	        var reminderDate = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm").unix() * 1000;
	    }
	    var postData = {
	        reminderDate: reminderDate,
	        currentCrmId: currentId ? currentId : null
	    };
	    $.ajax({
	        url: "/deal/find-crms",
	        type: "post",
	        data: JSON.stringify(postData)
	    }).done(function (response) {
	        var html = "<option value='' >Chọn BA</option>";
	        for (var i = 0; i < response.data.length; i++) {
	            var item = response.data[i];
	            html += "<option value='" + item.userId + "' " + (item.userId == currentId ? "selected" : "") + " >" + item.userName + " " + (item.availableTime ? " - " + item.availableTime : "") + "</option>";
	        }
	        $("#modal-create-meeting-tm .assignTo").html(html).select2();
	    }).always(function () {
	    });
	};

	// valid realtime
	var listenChangeSelect = function(){
		$('#modal-create-meeting-tm .select-valid').change(function(){
			let valid = true;
			if($(this).attr('name') == 'tCId'){
				if($(this).val() == '8'){
					$('#modal-create-meeting-tm .otherAdd').removeClass('hidden');
					$("#modal-create-meeting-tm .address").geocomplete()
						.bind("geocode:result", function (event, result) {
			                console.log(result);
			                // result.geometry.location.lng()
			                // result.geometry.location.lat()
			            });
				}else{
					$('#modal-create-meeting-tm .otherAdd').addClass('hidden');
				}
			}
			$('#modal-create-meeting-tm .select-valid:visible').each(function(){
				// console.log($(this).val());
				if($(this).val() == ''){
					$(this).css('border', '2px solid red');
					$(this).siblings(".select2-container").css('border', '2px solid red');
					valid = false;
					return false;
				}else{
					$(this).css('border', '1px solid #d2d6de');
					$(this).siblings(".select2-container").css('border', 'none');;
				}
			})
			if(valid){
				$('#modal-create-meeting-tm .submit').removeClass('disabled');
			}else{
				$('#modal-create-meeting-tm .submit').addClass('disabled');
			}
		})
	};

	var submit = function(){
		console.log(arrayNameInput);
	};

	return {
		loadCreateMeetingModal : loadCreateMeetingModal
	};

})();