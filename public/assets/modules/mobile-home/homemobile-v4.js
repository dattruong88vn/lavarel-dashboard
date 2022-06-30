/* 
    code js xử lý riêng cho page home mobile
    Created on : Dec 26, 2019, 1:09:35 PM
    Author     : Minh Nguyen
 */

var startApp = function () {
    getUserLocation(function(position){
        let dataPost = {
            lat: position.lat,
            long: position.lng
        };
        ListingByLocationLoader.loadBuy.setPlatform("mobile").loadContent('#bds-for-buy-by-location', dataPost);
    }, function(err){
        
    });
    
    $('.dataType').click(function(){
        $('.dataType').removeClass('active');
        $(this).addClass('active');
        if($(this).data('type') == 1){
            // mua bán
            window.location.hash = "mua";
            getUserLocation(function(position){
                let dataPost = {
                    lat: position.lat,
                    long: position.lng
                };
                ListingByLocationLoader.loadBuy.setPlatform("mobile").loadContent('#bds-for-buy-by-location', dataPost);
            }, function(err){
                BuyRentProjectContentLoader.setPlatform("mobile").loadBuyContent();
            });
            $('.search-buy').trigger('click');
        } else if($(this).data('type') == 2){
            // cho thuê
            window.location.hash = "thue";
            getUserLocation(function(position){
                let dataPost = {
                    lat: position.lat,
                    long: position.lng
                };
                ListingByLocationLoader.loadRent.setPlatform("mobile").loadContent('#bds-for-rent-by-location', dataPost);
            }, function(err){
                BuyRentProjectContentLoader.setPlatform("mobile").loadRentContent('#bl-for-rent-content');
            });
            $('.search-rent').trigger('click');
        }else if($(this).data('type') == 99){
            // dự án
            window.location.hash = "project";
            getUserLocation(function(position){
                let dataPost = {
                    lat: position.lat,
                    long: position.lng
                };
                ListingByLocationLoader.loadProject.setPlatform("mobile").loadContent('#bds-for-project-by-location', dataPost);
            }, function(err){
                BuyRentProjectContentLoader.setPlatform("mobile").loadProjectContent('#bl-for-project-content');
            });
            $('.search-project').trigger('click');
        }
    });
    
    // hashtag
    var hash = window.location.hash;
    if(hash == '#thue'){
        $('.dataType[data-type="2"]').trigger('click');
        setTimeout(function(){
            $('.search-rent').trigger('click');
        }, 2000);
    } else if(hash == '#project'){
        $('.dataType[data-type="99"]').trigger('click');
        setTimeout(function(){
            $('.search-project').trigger('click');
        }, 2000);
    }
    // dream house
    $(document).on("click", '#search-buy-request', function(){
        $('#info-request').html('');
        $('#info-request').html($('#info-request-buy').html());
    });
    
    $(document).on("click", '#search-rent-request', function(){
        $('#info-request').html('');
        $('#info-request').html($('#info-request-rent').html());
    });
    //
    var checkValidFormNhuCau = function(form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator( {
            message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: messages.home_nhucau_ten_empty
                        }
                    }
                },
                district: {
                    validators: {
                        notEmpty: {
                            message: messages.home_nhucau_quan_empty
                        }
                    }
                },
                phone: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: messages.home_nhucau_phone_empty
                        },
                        digits: {
                            message: messages.home_nhucau_phone_wrongformat
                        },
                        stringLength: {
                            message: messages.home_nhucau_phone_wrongformat, min: 10, max: 10
                        }
                    }
                },
                price: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: messages.home_nhucau_gia_empty
                        }
                    }
                },
                request: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: messages.home_nhucau_nhucau_empty
                        }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: messages.home_nhucau_email_wrongformat
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    
    $(document).on("click", '#send-infos-popup', function (){
        App.UI.showLoadding();
        $(this).prop('disabled', true);
        var curForm = $(this).closest("#saveCusInfoPopup");
        if(!checkValidFormNhuCau(curForm)) {
            App.UI.hideLoadding();
            $('#send-infos-popup').prop('disabled', false);
            return false;
        }
        var districtIds = [];
        districtIds.push($('#info-district').val());
        
        var dataSend = {
            customerName : $('#info-name').val(),
            customerPhone : $('#info-phone').val(),
            email : $('#info-email').val(),
            listingTypeId : parseInt($('.type_listing:checked').val()),
            propertyTypeId : parseInt($('#info-request').val()),
            districtIds: districtIds,
            sourceId : 2,
            requestText: $('#info-request option:selected').text()
        };
        let visitedList = TrackUserRoute.getVisitedList();
        if(visitedList){
            dataSend.visitList = visitedList;
        }
        App.Feature.Post('/api/request-find-home', dataSend, function(response){
            if(response.code == 200) {
                TrackUserRoute.clearVisitedList();
                $("#saveCusInfoPopup").find("input").val(null);
                $("#saveCusInfoPopup").find("#info-district").val(null);
                App.UI.hideLoadding();
                $('body').toggleClass('showModal');
                $('#tuvanModal').removeClass('active');
                App.UI.Done(messages.home_nhucau_success);
                $('#send-infos-popup').prop('disabled', false);
                App.Feature.setCookie("cinfo", '{"name":"' + dataSend.customerName + '","phone":"' + dataSend.customerPhone + '","email":"' + dataSend.email + '"}');
            } else {
                App.UI.hideLoadding();
                if(response.code == 410 ) {
                    // là moi gioi can login
                    App.UI.ShowFormMessage('#popup-login', 'Số điện thoại đã tồn tại trong hệ thống, bạn vui lòng đăng nhập', App.UI.notiTypeError);
                    $("#popup-login").modal("show");
                } else {
                    App.UI.Error(messages.home_nhucau_error);
                    $('#send-infos-popup').prop('disabled', false);
                }
            }
        });
    });
    $(document).ready(function(){
        $('.btn-search').click(function(){
            $('.btn-search input').blur();
        });
    });  
};

function scrollIntoBlock(prevBlockId) {
	// Tìm thẻ a class title nếu là mua bán
	aTags = $('.block-listings').find('h4.title a.title');
	// if (!aTags.length) {
	// 	// Nếu mua, cho thuê ko ra thì tìm thẻ a của project
	// 	aTags = $('.add-more-project').find('h3.title a');
	// }

	// split href lấy id và gắn id cho thẻ a để scroll tới
	aTags.each(function() {
		$(this).attr('id', 'b' + $(this).attr('href').split('id')[1]);
	});

	if ($('#b' + prevBlockId)[0]) {
		$('#b' + prevBlockId)[0].scrollIntoView();
		window.scrollBy(0, -250);
	}
}