var startApp = function () {
    // xem all bđs nổi bật
    $('.view-all-districts').click(function(){
        let url = $('.item-district.active').data('href');
        location.href = url;
    });
    // danh sách bđs nổi bật theo quận
    $('.item-district').click(function(){
        $('.item-district').removeClass('active');
        $(this).addClass('active');
        App.UI.showLoadding();
        var dataPost = {
            districtId: $(this).data('district_id')
        };
        $.ajax({
            type: "POST",
            url: '/api/render-listing-hot-district',
            data: JSON.stringify(dataPost)
        }).success(function (response) {
            $('#bds-hot-district').html(response);
            ResOwlSlider();
            App.UI.hideLoadding();
        }).fail(function (jqXHR, ajaxOptions, thrownError) {
            App.UI.hideLoadding();
        });
    });
	//
	
	// xem all bđs mua
	$('.view-all-buy-items').click(function(){
		let url = $('.item-district-buy.active').data('href');
		location.href = url;
	});

	// danh sách bđs mua theo quận
    $('.item-district-buy').click(function(){
        $('.item-district-buy').removeClass('active');
        $(this).addClass('active');
        var dataPost = {
			districtId: $(this).data('district_id'),
			listingTypeList: '1'
        };
        $.ajax({
            type: "POST",
            url: '/api/render-listing-buy-or-rent-district',
            data: JSON.stringify(dataPost)
        }).success(function (response) {
            $('#bds-buy-district').html(response);
            ResOwlSlider();
        }).fail(function (jqXHR, ajaxOptions, thrownError) {
        });
    });
	
	// xem all bđs thuê
	$('.view-all-rent-items').click(function(){
		let url = $('.item-district-rent.active').data('href');
		location.href = url;
	});

	// danh sách bđs bán theo quận
    $('.item-district-rent').click(function(){
        $('.item-district-rent').removeClass('active');
        $(this).addClass('active');
        var dataPost = {
			districtId: $(this).data('district_id'),
			listingTypeList: '2'
        };
        $.ajax({
            type: "POST",
            url: '/api/render-listing-buy-or-rent-district',
            data: JSON.stringify(dataPost)
        }).success(function (response) {
            $('#bds-rent-district').html(response);
            ResOwlSlider();
        }).fail(function (jqXHR, ajaxOptions, thrownError) {
        });
	});
	
	$('.search-projects').click(function() {
		let selDistrict = $('#sel-district-search').val();
		if (selDistrict) {
			location.href = selDistrict;
		}
	});
    $('.find-by-key').click(function(){
        let listingTypeId = $('.search-type:checked').data('value');
        if(listingTypeId == 1){
            location.href = '/mua/ban-nha-rieng-tphcm';
        } else if (listingTypeId == 2) {
            location.href = '/thue/can-ho-chung-cu-tphcm';
        } else {
            location.href = '/du-an/hcm';
        }

	});
	
	setTimeout(() => {
		$('.owl-carousel.type-listing').owlCarousel().trigger('refresh.owl.carousel');
	});
};

$(document).ready(function(){
    setTimeout(function(){
        $('.reset').trigger('click');
        $('#select-property option:first').prop('selected',true);
    },2000);
});