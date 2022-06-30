var JMCommons = (function() {
	var validImg = function(avatar){
		var result = true;
	    var extension = avatar.split('.').pop().toUpperCase();
	    
	    if (extension!="PNG" && extension!="JPG" && extension!="JPEG"){
	        result = false;
	    }
	    else {
	        result = true;
	    }
	    
	    return result;
	};

	var viewMore = function(){
		var maxheight = 134;
		var showText = "Xem thêm";
		var hideText = "Thu gọn lại";

		// console.log('LOL');
		$('.textContainer_Truncate').each(function () {
		    var text = $(this);
		    if (text.height() > maxheight) {
		        text.css({'overflow': 'hidden', 'height': maxheight + 'px'});

		        var link = $('<a href="#">' + showText + '</a>');
		        var linkDiv = $('<div style="text-align:center"></div>');
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
	}

	return {
		validImg : validImg,
		viewMore : viewMore
	};
})();

var RLDFuncs = (function() {
	var getChanelChild = function(){
		var element = 'select[name=channelType]';
		init(element);
		$(element).on('change',function(){
			init(element);
		})
	};

	var init = function(element){
		$('select[name=channelSubType]').prop('selectedIndex',0);
		$('select[name=tCId]').prop('selectedIndex',0);

		var channelType = $(element).val();
		if(channelType != ''){
			if(channelType != 7){
				$.ajax({
					url: '/common/chanel-child/'+channelType,
					type: 'post'
				}).done(function (response) {
					$('select[name=channelSubType]').html('');
					var option = '<option value="">N/A</option>';
					$.each(response,function(k,v){
						option += '<option value="'+v.id+'">'+v.name+'</option>';
					})
					$('select[name=channelSubType]').html(option);
					$('select[name=channelSubType]').show();
					if(typeof dataForRLDFuncs !== 'undefined'){
						if(dataForRLDFuncs.channelSubType != null){
							$('#channelSubType').val(dataForRLDFuncs.channelSubType);
						}
					}

				}).always(function () {
					
				});
				$('select[name=tCId]').hide();
			}else{
				$('select[name=tCId]').show();
				$('select[name=channelSubType]').hide();
				if(typeof dataForRLDFuncs !== 'undefined'){
					if(dataForRLDFuncs.tCId != null){
						$('#tCId').val(dataForRLDFuncs.tCId);
					}
				}
			}
		}else{
			$('select[name=channelSubType]').html('');
			var option = '<option value="">N/A</option>';
			$('select[name=channelSubType]').html(option);
			$('select[name=channelSubType]').show();
			$('select[name=tCId]').hide();
		}
	};

	return {
		getChanelChild : getChanelChild
	};
})();