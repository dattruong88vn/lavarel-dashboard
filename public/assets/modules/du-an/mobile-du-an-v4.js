var startApp = function () {
    
    cttab();

    // transparent more images
    $('.item-transparent .bg').delay(1500).fadeIn(400);
    $('.item-transparent .text').delay(1500).fadeIn(400);

    var dataPostListing = {
        projectId : dataProjectInfo.projectId
    };
    // request get listing similar
    setTimeout( function() {
        ListingDetailProject.loadBlockRentProject.setPlatform("mobile")
        .loadContent('#rental', dataPostListing, function(){
            ListingDetailProject.loadBlockBuyProject.setPlatform("mobile").loadContent('#vendor', dataPostListing, function(){
                ListingDetailProject.loadBlockNearbyProject.setPlatform("mobile").loadContent('#nearby', dataPostListing);
            });
        });
    }, 2000);

	$('.navigator-share').click(function () {
		if (navigator.share === undefined) {
			return;
		}

		if (navigator.share) {
			navigator.share({
				title: 'propzy.vn',
				text: 'PROPZY',
				url: url
			});
		}
    });

    $('.btn-call').click(function(){
        location.href = 'tel:02873066099';
    });
    $('.bxslider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      $(".current_photo_index").html(currentSlide+1);
    });
    $('.img-detail .owl-carousel .owl-dots').remove();

    $('.img-detail .owl-carousel').on('changed.owl.carousel', function (e) {
        if (!e.namespace || e.property.name !== 'position')
            return;
        $('#info-slide').text(e.relatedTarget.relative(e.item.index) + 1 + '/' + e.item.count);
    });
    //
    $('.read-more').click(function(){
        $('#popup-read-more .text-center').html($('.bl-project-detail .bl-name-project').html());
        $('#popup-read-more .content').html($('.bl-project-detail .bl-info-describe').html());
        $('#popup-read-more').modal();
    });
    $('.btn-rent').click(function(){
        $('#rlisting-ids').val($(this).data('rlisting-ids'));
        $('#district-id').val($(this).data('district-id'));
        $('#building-id').val($(this).data('building-id'));
        $('#project-id').val($(this).data('project-id'));
        $('#bed-room').val($(this).data('bed-room'));
        $('#min-price').val($(this).data('min-price'));
        $('#max-price').val($(this).data('max-price'));
        $('#price-text').val($(this).data('price-text'));
        $('#popup-schedule-project').modal();
    });
    App.UI.inputAllowNumber("#phone-project");
    App.UI.removeCheckSuccess("#schedule-project", ['email']);

    //
    $("#schedule-project, #schedule-project-rent").bootstrapValidator({
        message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập Họ và tên"
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập số điện thoại"
                    }
                    , stringLength: {
                        message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: "Vui lòng nhập địa chỉ email hợp lệ"
                    }
                }
            },
            building: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng chọn tòa nhà"
                    }
                }
            },
            bedroom: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng chọn số phòng ngủ"
                    }
                }
            }
        }
    });
    var checkValidForm = function (form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    //
    $('#form-infos-customer').click(function(event){
        event.stopPropagation();
    });
    $('.close-form-infos').click(function(){
        $(this).parent().parent().removeClass('open');
    });
    $('.btn-form-infos').click(function(){
        $(this).parent().parent().parent().removeClass('open');
    });
    //
    $("#btn-schedule-project").click(function () {
        var curForm = $(this).closest("#schedule-project");
        if (!checkValidForm(curForm)) {
            return false;
        }
        App.UI.showLoadding();
        var postData = {
            message: "Đặt lịch xem từ trang chi tiết dự án",
            links: [],
            rlistingIds: [],
            requestTypeIds: [],
            date : null,
            minPrice : $('#min-price').val(),
            maxPrice : $('#max-price').val(),
            priceText: $('#price-text').val(),
            requestText: $('#request-text').val(),
            bedRooms: $('#bed-room').val(),
            projectId: $('#project-id').val(),
            buildingId: $('#building-id').val()
        };

        if($('#customer-name').length > 0 && $('#customer-name').val().trim() !== ''){
            postData.customerName = $('#customer-name').val().trim();
        }
        if($('#customer-phone').length > 0 && $('#customer-phone').val().trim() !== ''){
            postData.customerPhone = $('#customer-phone').val().trim();
        }
        if($('#customer-email').length > 0 && $('#customer-email').val() !== ''){
            postData.email = $('#customer-email').val().trim();
        }

        //3(Đặt lịch xem)
        postData.requestTypeIds = [3];
        postData.form_type = 7;
        postData.sourceId = 2;
        
        postData.rlistingIds = [parseInt($('#rlisting-ids').val())];
        postData.content_ids = parseInt($('#rlisting-ids').val());
        postData.content_category = parseInt($('#district-id').val());
        postData.links = [location.href];
        
        let visitedList = TrackUserRoute.getVisitedList();
        if(visitedList){
            postData.visitList = visitedList;
        }
        App.Feature.Post("/api/dat-lich-xem", postData, function (response) {
            App.UI.hideLoadding();
            if(response.code == 410 ) {
                // là moi gioi can login
                App.UI.ShowFormMessage('#popup-login', 'Số điện thoại đã tồn tại trong hệ thống, bạn vui lòng đăng nhập', App.UI.notiTypeError);
                $("#popup-login").modal("show");
            } else {
                if (response.result) {
                    TrackUserRoute.clearVisitedList();
                    window.location.href = '/thank-you';
                } else {
                    App.UI.ShowFormMessage('#popup-schedule-project', response.message, App.UI.notiTypeError);
                }
            }
        });
    });
    $('.bxslider').slick({
        "arrows": false
    });
    //
    var url = window.location.href;
    $("#fb-like").click(function () {
        FB.ui({
            method: 'like',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: url
            })
        }, function (response) {
           
        });
    });

    $("#fb-message").click(function () {
        FB.ui(
            {
                method: 'send',
                link: url
            }, function (response) {});
    });
    //
    $("#select-building").change(function () {
        var buildingId = $(this).val();
        setBedRoom(buildingId);
    });
    $("#select-bedroom").change(function () {
        $('#rlisting-ids-rent').val($(this).val());
        var selected = $(this).find('option:selected');
        $('#bed-room-rent').val(selected.data('bed-room'));
        $('#min-price-rent').val(selected.data('min-price'));
        $('#max-price-rent').val(selected.data('max-price'));
        $('#price-text-rent').val(selected.data('price-text'));
    });
    //
    $('.share-social').click(function(){
        $('.share-social').removeClass('active');
        $(this).addClass('active');
        //
        var arrayIds = [];
        $.each($('btn-share-id'), function(key, val){
            arrayIds.push($(val).attr('listingid'));
        });
        var dataPost = {
            "networkType" : $(this).data('network'),
            "basketId" : null,
            "behaviourType" : 1083,
            "shareIds" : arrayIds.toString(),
            "shareType": 1654
        };
        App.Feature.Post("/api/share-social", dataPost, function (response) {
            if(response.result){
                $('#link-share').val(location.origin + response.data.url);
            }
        });
    });
    //
    $('.copy-link').click(function(){
        var copyText = document.getElementById("link-share");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand('copy');
    });
};

// slide
$('.project-detail-feature .zoom').click(function () {
    var self = $(this);
    $.fancybox.open(propertyImages, {}, parseInt(self.attr("index")));
    return false;
});

$(document).off('click', '.bl-img-slider .bx-prev').on('click','.bl-img-slider .bx-prev' ,function () {
    $('.bxslider').slick("slickPrev");
    return false;
});
$(document).off('click', '.bl-img-slider .bx-next').on('click','.bl-img-slider .bx-next' ,function () {
    $('.bxslider').slick("slickNext");
    return false;
});

function setBedRoom(buildingId) {
    $('#bed-room-rent').val('');
    $('#min-price-rent').val('');
    $('#max-price-rent').val('');
    $('#price-text-rent').val('');
    if (buildingId == "") {
        $('#building-id-rent').val('');
        $("#select-bedroom").attr("disabled", "disabled");
        $("#select-bedroom").html('<option value="">Chọn số phòng ngủ</option>');
        return;
    } else {
        $('#building-id-rent').val(buildingId);
        $("#select-bedroom").prop("disabled", false);
    }
    App.Feature.Get("/api/get-bedroom-by-buiding/" + buildingId, function (response) {
        if(response.result){
            $('#district-id-rent').val(response.data.list[0].districtId);
            var html = '<option value="">Chọn số phòng ngủ</option>';
            $.each(response.data.list[0].rentCostList, function(key, val){
                html+= '<option value="'+ val.rlistingIds[0] +'" data-building-id="'+ response.data.list[0].buildingId +'" data-bed-room="'+ val.bedRoomNumber +'" data-min-price="'+ val.minPrice +'" data-max-price="'+ val.maxPrice +'" data-price-text="'+ val.formatPrice +'">';
                    html+= val.bedRoomFormat;
                html+= '</option>';
            });
            $("#select-bedroom").html(html);
        }
    });
    
};

var bindCartAjax  = function (element) {

    var listingId = parseInt($(element).attr("listingid"));
    var removeCart = Cart.removeFavListing(listingId,element);
    if(!removeCart) {
        !isLogin ? addcart(element) : Mycollection.addCollection(listingId);
    }
    return element;
}

function openModaShare(element){
    var id = $(element).data('modal');
    var pr = $(element).parents('.myModal');
    $('body').toggleClass('showModal');
    if(pr.length>0) {
        pr.removeClass('active');
    }else {
        $('div#'+id).toggleClass('active');
    }
    //
    var arrayIds = [];
    $.each($('.btnlike'), function(key, val){
        arrayIds.push($(val).attr('listingid'));
    });
    var dataPost = {
        "networkType" : 1079,
        "basketId" : null,
        "behaviourType" : 1083,
        "shareIds" : arrayIds.toString(),
        "shareType": 1654
    };
    App.Feature.Post("/api/share-social", dataPost, function (response) {
        if(response.result){
            $('#link-share').val(location.origin + response.data.url);
        }
    });
}
function downloadDocuments(element) {
    var link = $(element).attr("data-link-download");

    fetch(link)
    .then(res => res.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        var nameFile = link.substring(link.lastIndexOf("/") + 1, link.length);

        a.download = nameFile;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(() => App.UI.Error("Đã có lỗi xảy ra"));
   
}

// slide
$('.bl-zoom').click(function () {
    $.fancybox.open(propertyImages, {}, $('.project-detail-feature .owl-dot').index($('.project-detail-feature .owl-dot.active')));
});

$('.project-detail-feature .owl-carousel .item').click(function () {
    $.fancybox.open(propertyImages, {}, $('.project-detail-feature .owl-dot').index($('.project-detail-feature .owl-dot.active')));
});