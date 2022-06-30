var postData = {};
var address = {};

var stored = {
    houseNumber : null,
    listingTypeId : 1,
    propertyTypeId : 11,
    cityId : 1,
    districtId : null,
    districtName : null,
    wardId : null,
    wardName : null,
    fullAddress: null,
    lotSize:  null,
    sizeWidth:  null,
    sizeLength:  null,
    useRightTypeId: null,
    customerServiceConsults : null
};

var startApp = function(){
    App.UI.inputAllowNumber('#phone-app', false);
    $('#submit-phone-app').click(function(event){
        event.preventDefault();
        grecaptcha.reset();
        var phone = $('#phone-app').val();
        if(phone.length <10 || phone.length>11){
            App.UI.Error(messages.home_taiapp_phone_wrongformat);
            return false;
        }
        SendPhoneApp.send(false);
    });
    
    var checkValidForm = function(form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                houseNumber: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinchunha_sonha_empty
                        }
                    }
                },
                district: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinchunha_quanhuyen_empty
                        }
                    }
                },
                ward: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinchunha_phuongxa_empty
                        }
                    }
                },
                fullAddress: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinchunha_diachi_empty
                        }
                    }
                },
                name: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinnhanh_thongtinnhanh_name_empty
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinnhanh_thongtinnhanh_phone_empty
                        }
                        , stringLength: {
                            message: messages.dangtinnhanh_thongtinnhanh_phone_wrongformat, min: 10, max: 10
                        }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: messages.dangtinnhanh_thongtinnhanh_email_wrongformat
                        }
                    }
                },
                requirePost: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinchunha_dieukhoan_uncheck
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    // custom validate for house number
    $.fn.bootstrapValidator.validators.checkNumberHouse = {
        validate: function(validator, $field, options) {
            var passed = false;
            if(stored.houseNumber || (stored.listingTypeId == 1 && stored.propertyTypeId != 11)) {
                // có số nhà hoặc khác bán nhà riêng
                passed =  true;
            }
            return passed;
        }
    };

    App.UI.inputAllowNumber("#phone", false);
    App.UI.inputAllowNumber(["#lotSize","#sizeLength","#sizeWidth"]);
    App.UI.removeCheckSuccess(".form-infos",['email']);
    // listing type
    $('.listingType').change(function(){
        stored.listingTypeId = Number.parseInt($(this).val());
        // điều khoản và biểu phí giao dịch
        if(stored.listingTypeId == 1) {
            // bán
            $("#price-button").html("<a href='javascript:;' data-target='#popup-require-price-buy' data-toggle='modal'>biểu phí giao dịch</a>");
        } else {
            // thue
            $("#price-button").html("<a href='javascript:;' data-target='#popup-require-price-rent' data-toggle='modal'>biểu phí giao dịch</a>");
        }
    });
    // propertyId
    $(document).on('change', '#propertyType', function (e) {
       e.preventDefault();
        if ($(this).val() == "8" || $(this).val() == "11") {
            $('.size-change').text('Diện tích sử dụng (m²)');
        } else {
            $('.size-change').text('Diện tích đất (m²)');
        }
        stored.propertyTypeId = Number.parseInt($(this).val());
    });
    // city
    $(document).on('change', '#city', function (e) {
        e.preventDefault();
        stored.cityId = Number.parseInt($(this).val());
        App.Feature.Get("/api/get-districts-by-city/" + stored.cityId, function (districts) {
            if(districts.length!=0){
                var htmlOutput ="";
                $.each(districts,function (key,item) {
                    htmlOutput+='<option value="'+item.districtId+'">'+item.districtName+'</option>';
                });
                $("#district").html(htmlOutput);
                return true;
            }
            return false;

        });
    });
    // district
    $(document).on('change', '#district', function (e) {
        e.preventDefault();
        stored.districtId = $.trim($(this).val()) ? Number.parseInt($(this).val()) : null;
        stored.districtName = stored.districtId ? $.trim($(this).find('option:selected').text()) : null;

        // update address
        $('input[name="fullAddress"]').val("");

        if (stored.districtId) {
            App.Feature.Get("/api/get-wards-by-district/" + stored.districtId, function (wards) {
                var wardIds = [];
                var data = $(wards).map(function (idx, ele) {
                    wardIds.push(ele.wardId);
                    return {
                        id: ele.wardId,
                        text: ele.wardName
                    };
                }).toArray();
                var html = '';
                html+= '<option value="">Chọn phường/ xã</option>';
                $.each(data,function(key,item){
                    html+= '<option value="'+item.id+'">';
                    html+= item.text;
                    html+= '</option>';
                });
                $('#select-ward').html(html);
            });
            $('.autocomplete-suggestions ').html("");
            address = {};
        } else {
            var option  = '<option value="">Chọn phường/ xã</option>';
            $('#select-ward').html(option);
            return false;
        }
    });
    // ward
    $(document).on('change', '#select-ward', function (e) {
        stored.wardId = $.trim($(this).val()) ? Number.parseInt($(this).val()) : null;
        stored.wardName = stored.wardId ? $.trim($(this).find('option:selected').text()) : null;
        $('input[name="fullAddress"]').val("");
    });
    // request type
    $(document).on('change', '.request-type', function (e) {
        e.preventDefault();
        var data = $(".request-type:checked").map(function(idx, input){
            return  {
                "id":{
                    "typeId":parseInt($(input).val())
                }
            };
        }).toArray();
        stored.customerServiceConsults = data;
    });
    // lotSize size width , size length
    $(document).on('change', '#lotSize, #sizeLength, #sizeWidth', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
        var val = $(this).val();
        stored[id] = val;
    });
    $(document).on('change', '#lotSize, #sizeLength, #sizeWidth', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
        var val = $(this).val();
        stored[id] = val ? Number.parseFloat(val) : null;
    });
    $(document).on('change', '#userRightType', function (e) {
        e.preventDefault();
        var val = $(this).val();
        stored.useRightTypeId = val ? Number.parseInt(val) : null;
    });
    $(document).on('change', '#houseNumber, #fullAddress', function (e) {
        var id = $(this).attr('id');
        var val = $(this).val();
        stored[id] = val ? $.trim(val) : null;
    });

    $('.slider-home').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
        dots: true,
        autoplay: true,
        item:1,
        responsive: {
            0: {
                items: 1,
                nav: false
            }
        }
    });

    $("#fullAddress").keypress(function(event) {
        // space (keycode == 32)
        if (event.which == 32) return;
    }).autoComplete({
        minChars: 4,
        delay: 400,
        cache:false,
        source: function(term, suggest){
            term = term.toLowerCase();
            var matches = [];
            $.ajax({ type: "POST", url: '/api/get-streets-by-name', data: { streetName: term },
                success: function(response) {
                    if(response.result){
                        var data_suggest = {};
                        data_suggest.street = [];
                        $.each(response.street,function (key,item) {
                            if($('#select-ward').val() == item.wardId) {
                                data_suggest.street.push(item);
                            }
                        });
                        suggest(data_suggest.street);
                    }
                }
            });
        },
        renderItem :function (item, search){
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            var fullName = item.streetName;
            return '<div class="autocomplete-suggestion" data-json=\'' + JSON.stringify(item) + '\'>'
                + fullName.replace(re, "<b>$1</b>") + '</div>';
        },
        onSelect: function(e, term, item){
            chooseStreet = item.data( 'json');
            name = chooseStreet.streetName;
            address.districtId = chooseStreet.districtId;
            address.wardId = chooseStreet.wardId;
            address.streetId = chooseStreet.streetId;
            $('#fullAddress').val(name);
        }
    });
    //
    var marker;
    var markers = [];
    var currentInfoWindow = null;
    function myMap(long,lat){
        var mapCanvas = document.getElementById('map');
        var myCenter = new google.maps.LatLng(lat,long);
        var myinput = document.getElementById('myaddress');
        
        var mapOptions = {
            center: myCenter,
            zoom: 16
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(myCenter);
        });
        //
        var autocomplete = new google.maps.places.Autocomplete(myinput);
        autocomplete.bindTo('bounds', map);
        var infowindow = new google.maps.InfoWindow();
        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                placeMarker(map, myCenter);
                return;
            }
            placeMarker(map, place.geometry.location);
        });
        //
        
        placeMarker(map, myCenter);
        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(map, event.latLng);
        });
    };
    
    function placeMarker(map, location){
        if (marker) {
            var infowindow = new google.maps.InfoWindow();
            infowindow.close(map,marker);
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers.push(marker);
            for (var i = 0; i < markers.length-1; i++) {
                markers[i].setMap(null);
                markers.splice(i, 1);
            }
            marker.setPosition(location);
            map.setCenter(location);
        } else {
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers.push(marker);
        }
        //console.log(markers);
        var latlng = {lat: location.lat(), lng: location.lng()};
        var infowindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    infowindow.setContent(results[0].formatted_address);
                    $('#address-done-popup').val(results[0].formatted_address);
                    $('#long').val(location.lng());
                    $('#lat').val(location.lat());
                } else {
                    alert('Không tìm thấy, xin vui lòng thử lại');
                    $('#popup-map-dangtin').modal('hide');
                }
            } else {
                setTimeout(placeMarker(map, location), 100);
                return;
                //alert('Bản đồ bị lỗi, xin vui lòng thử lại');
                //$('#popup-map-dangtin').modal('hide');
            }
        });
//        var infowindow = new google.maps.InfoWindow({
//            content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
//        });
        if(currentInfoWindow !== null) {
            currentInfoWindow.close(); 
        }
        infowindow.open(map,marker);
        currentInfoWindow = infowindow;
    }
    //
    $('#map-dangtin').click(function(){
        $('#popup-map-dangtin').modal();
        //
        var houseNumber = $("#houseNumber").val().trim();
        var fullAddress = $("#fullAddress").val().trim();
        var ward = $('#select-ward').val();
        var district = $('#district').val();
        var latitude = 10.7626639;
        var longitude = 106.6568935;
        var long = '';
        var lat = '';
        if(houseNumber !== '' && fullAddress !== '' && ward !== '' && district !== ''){
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#select-ward :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
            //console.log(geoMap);
            var getLongLat = function(){
                jQuery.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM",
                    data: {'address': geoMap,'sensor':false},
                    async: false,
                    success: function(data){
                        if(data.results.length){
                            long = data.results[0].geometry.location.lng;
                            lat = data.results[0].geometry.location.lat;
                        }
                    }
                });
            };
            getLongLat();
            latitude = lat;
            longitude = long;
            if(latitude == '' || longitude == ''){
                setTimeout(getLongLat(), 100);
                return;
            }
        }
        
        //
        myMap(longitude,latitude);
    });
    
    $('#my-location').click(function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.7626639, lng: 106.6568935},
            zoom: 16
        });
        var infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var myCenter = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                placeMarker(map, myCenter);
                infoWindow.setPosition(pos);
                map.setCenter(pos);
            });
        }
    });
    
    $('.remove-text').click(function (){
        $('#myaddress').val('');
    });
    //
    $('.btn-confirm-longlat').click(function(){
        var fullAdd = $('#address-done-popup').val();
        var fullAddress = '';
        var arrays = fullAdd.split(',');
        if(arrays.length == 5){
            var ward = arrays[1].trim();
            var district = arrays[2].trim();
            var postDataLongLat = {
                'city_id':1,
                "ward_name": ward,
                "district_name": district
            };
            App.Feature.Post("/api/get-ward-district", postDataLongLat, function (response) {
                if (response.result) {
                    $('#district').val(response.data[0].districtId);
                    App.Feature.Get("/api/get-wards-by-district/" + response.data[0].districtId, function (wards) {
                        var wardIds = [];
                        var data = $(wards).map(function (idx, ele) {
                            wardIds.push(ele.wardId);
                            return {
                                id: ele.wardId,
                                text: ele.wardName
                            };
                        }).toArray();
                        var html = '';
                        html+= '<option value="">Phường/Xã</option>';
                        $.each(data,function(key,item){
                            html+= '<option value="'+item.id+'">';
                            html+= item.text;
                            html+= '</option>';
                        });
                        $('#select-ward').html(html);
                        $('#select-ward').val(response.data[0].wardId);
                    });
                } 
            });
            var city = arrays[3].trim();
            var arr2 = arrays[0].trim().split(' ');
            if(arr2[0] == 'Hẻm'){
                if(arr2[1] !== 'số'){
                    $('#houseNumber').val('Hẻm '+arr2[1]);
                    for(var i=2;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if(arr2[1] == 'số'){
                    $('#houseNumber').val('Hẻm số '+arr2[2]);
                    for(var i=3;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            } else {
                if(parseInt(arr2[0]) >= 1){
                    $('#houseNumber').val(arr2[0]);
                    var fullAddress = '';
                    for(var i=1;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else {
                    $('#houseNumber').val('');
                    var fullAddress = '';
                    for(var i=0;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            }
        }
        else if(arrays.length == 4){
            var district = arrays[1].trim();
            var postDataLongLat = {
                'city_id':1,
                "ward_name": '',
                "district_name": district
            };
            App.Feature.Post("/api/get-ward-district", postDataLongLat, function (response) {
                if (response.result) {
                    $('#district').val(response.data[0].districtId);
                    App.Feature.Get("/api/get-wards-by-district/" + response.data[0].districtId, function (wards) {
                        var wardIds = [];
                        var data = $(wards).map(function (idx, ele) {
                            wardIds.push(ele.wardId);
                            return {
                                id: ele.wardId,
                                text: ele.wardName
                            };
                        }).toArray();
                        var html = '';
                        html+= '<option value="">Phường/Xã</option>';
                        $.each(data,function(key,item){
                            html+= '<option value="'+item.id+'">';
                            html+= item.text;
                            html+= '</option>';
                        });
                        $('#select-ward').html(html);
                        //$('#select-ward').val(response.data[0].wardId);
                    });
                }
            });
            var city = arrays[2].trim();
            var arr2 = arrays[0].trim().split(' ');
            if(arr2[0] == 'Hẻm'){
                if(arr2[1] !== 'số'){
                    $('#houseNumber').val('Hẻm '+arr2[1]);
                    for(var i=2;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if(arr2[1] == 'số'){
                    $('#houseNumber').val('Hẻm số '+arr2[2]);
                    for(var i=3;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            } else {
                if(parseInt(arr2[0]) >= 1){
                    $('#houseNumber').val(arr2[0]);
                    var fullAddress = '';
                    for(var i=1;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else {
                    $('#houseNumber').val('');
                    var fullAddress = '';
                    for(var i=0;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            }
        } else if(arrays.length == 6){
            arrays.splice(0, 1);
            var district = arrays[1].trim();
            var postDataLongLat = {
                'city_id':1,
                "ward_name": '',
                "district_name": district
            };
            App.Feature.Post("/api/get-ward-district", postDataLongLat, function (response) {
                if (response.result) {
                    $('#district').val(response.data[0].districtId);
                    App.Feature.Get("/api/get-wards-by-district/" + response.data[0].districtId, function (wards) {
                        var wardIds = [];
                        var data = $(wards).map(function (idx, ele) {
                            wardIds.push(ele.wardId);
                            return {
                                id: ele.wardId,
                                text: ele.wardName
                            };
                        }).toArray();
                        var html = '';
                        html+= '<option value="">Phường/Xã</option>';
                        $.each(data,function(key,item){
                            html+= '<option value="'+item.id+'">';
                            html+= item.text;
                            html+= '</option>';
                        });
                        $('#select-ward').html(html);
                        //$('#select-ward').val(response.data[0].wardId);
                    });
                } 
            });
            var city = arrays[2].trim();
            var arr2 = arrays[0].trim().split(' ');
            if(arr2[0] == 'Hẻm'){
                if(arr2[1] !== 'số'){
                    $('#houseNumber').val('Hẻm '+arr2[1]);
                    for(var i=2;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if(arr2[1] == 'số'){
                    $('#houseNumber').val('Hẻm số '+arr2[2]);
                    for(var i=3;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            } else {
                if(parseInt(arr2[0]) >= 1){
                    $('#houseNumber').val(arr2[0]);
                    var fullAddress = '';
                    for(var i=1;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else {
                    $('#houseNumber').val('');
                    var fullAddress = '';
                    for(var i=0;i<arr2.length;i++){
                        fullAddress+= arr2[i]+' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            }
        }
    });
    
    $('.btn-cancel-longlat').click(function(){
        $('#address-done-popup').val('');
        $('#long').val('');
        $('#lat').val('');
        $('#popup-map-dangtin').modal('hide');
    });
    
    $('#close-popup').click(function(){
        $('#address-done-popup').val('');
        $('#long').val('');
        $('#lat').val('');
        $('#popup-map-dangtin').modal('hide');
    });
    //
    $('#btnContinue2').click(function(){
        var curForm = $(this).closest(".form-infos");
        if(!checkValidForm(curForm)) {
            App.UI.Error(messages.dangtinmoigioi_thatbai_thieuthongtin);
            return false;
        }
        $('#bl-header-mobile').hide();
        $('#bl-child-header-mobile').show();
        $('#bl-child-header-mobile-step-2').hide();
        $('#form-infos').hide();
        $('.bl-banners').hide();
        $('#form-image').show();
        $(document).scrollTop(0);
    });
    //
    $('.back-step-1').click(function(){
        $('#form-infos').show();
        $('.bl-banners').show();
        $('#choose-img').hide();
        $('#tootip-step-3').hide();
        //
        $('#form-image').hide();
        $('#bl-header-mobile').show();
        $('#bl-child-header-mobile').hide();
        $('#bl-child-header-mobile-step-2').hide();
        $(document).scrollTop(0);
    });
    //
    $('.back-step-2').click(function(){
        $('#form-infos').hide();
        $('.bl-banners').hide();
        $('#choose-img').hide();
        $('#tootip-step-3').hide();
        //
        $('#form-image').show();
        $('#bl-header-mobile').hide();
        $('#bl-child-header-mobile').show();
        $('#bl-child-header-mobile-step-2').hide();
        $(document).scrollTop(0);
    });
    //
    $('#continue-choose-img').click(function(){
        if($('.file-upload-preview-listing').length < 4){
            App.UI.Error(messages.dangtinmoigioi_hinhanhlisting_empty);
            $(this).prop('disabled',false);
            return false;
        }
        $('#form-infos').hide();
        $('.bl-banners').hide();
        $('#form-image').hide();
        $('#bl-child-header-mobile').hide();
        $('#bl-header-mobile').hide();
        //
        $('#choose-img').show();
        $('#tootip-step-3').show();
        $('#bl-child-header-mobile-step-2').show();
    });
    //
    $('.upload-image').change(function(e){
        if($(this).attr('type')=='file') {
            files = e.target.files;
            $.each(files, function(k,v){
                uploadImage($('.upload-image'), v);
            });
        }
    });
    //
    $('.upload-image-drawing').change(function(e){
        if($(this).attr('type')=='file') {
            files = e.target.files;
            $.each(files, function(k,v){
                uploadImageDrawing($('.upload-image-drawing'), v);
            });
        }
    });
    //
    $("#btnFinish").click(function(){
        $(this).prop('disabled',true);
        if($('.file-upload-preview-drawing').length < 4){
            App.UI.Error(messages.dangtinmoigioi_hinhanhdrawing_empty);
            $(this).prop('disabled',false);
            return false;
        }
        //
        var long = $('#long').val();
        var lat = $('#lat').val();
        //var addressDone = $('#address-done-popup').val();
        var positionLatLong = getLatLongFromAdrress({
            long : long,
            lat : lat,
            address: stored.address,
            houseNumber: stored.houseNumber,
            wardName : stored.wardName,
            districtName : stored.districtName
        });

        //
        var phone = $("#phone").val().trim();
        
        var firstChar = phone.substring(0,1);
        if (firstChar !== '0' ){
            App.UI.Error(messages.dangtinnhanh_thongtinnhanh_phone_wrongformat);
            $(this).prop('disabled', false);
            return false;
        }
        
        var postData = {
           "name": $("#name").val().trim(),
           "phone":phone,
           "email":$("#email").val().trim(),
           "statusId":1,
           "code":"",
           "customerServiceConsults": $(".request-type:checked").map(function (idx, input) {
                return  {
                    "id": {
                        "typeId": parseInt($(input).val())
                    }
                };
            }).toArray(),
            "info":{
                "listingTypeId": stored.listingTypeId,
                "propertyTypeId": stored.propertyTypeId,
                "sizeLength":parseFloat($("#sizeLength").val()),
                "sizeWidth": parseFloat($("#sizeWidth").val()),
                "useRightTypeId": $('#useRightType').val(),
                "districtId": $("#district").val(),
                "wardId": $('#select-ward').val(),
                "streetId":address.streetId ? address.streetId : null,
                "houseNumber": $("#houseNumber").val().trim(),
                "houseNumberRoad": $("#fullAddress").val().trim(),
                "latitude":positionLatLong.latitude,
                "longitude":positionLatLong.longitude,
                "isGuaranteed":false,
                "commissionText": $("#request-price").val() ? parseFloat($("#request-price").val()) : null,
                "address": $('#houseNumber').val() + ' ' + $('#fullAddress').val() + ', ' + $('#select-ward option:selected').text() + ', ' + $('#district option:selected').text() + ', ' + $('#city option:selected').text() + ', Việt Nam'
            }
        };
        postData.sourceId = 1;
        if(stored.propertyTypeId == 8 || stored.propertyTypeId == 11){// chung cư, nhà riêng
            postData.info['floorSize'] = parseFloat($("#lotSize").val());
        } else {//đất nền
            postData.info['lotSize'] = parseFloat($("#lotSize").val());
        }
        //
        var photo = [];
        $.each($('.file-upload-preview-listing'), function(key, val){
            photo[key] = {
                'link': ($(this).attr('src')),
                'isPrivate':false,
                'source' : 'portal'
            };

        });
        // postData.photo = JSON.stringify(photo);
        postData.info.photo = JSON.stringify(photo);
        //
        var photoGcn = [];
        $.each($('.file-upload-preview-drawing'), function(key, val){
            photoGcn[key] = {
                'link': ($(this).attr('src')),
                'isPrivate':false,
                'source' : 'portal'
            };

        });
        // postData.photoGcn = JSON.stringify(photoGcn);
        postData.info.photoGcn = JSON.stringify(photoGcn);
        
        let visitedList = TrackUserRoute.getVisitedList();
        if(visitedList){
            postData.visitList = visitedList;
        }
        App.Feature.Post("/api/dang-tin-quickly", postData, function(response){
            if(response.result) {
                TrackUserRoute.clearVisitedList();
                App.Feature.AddIframe("/dang-tin-thanh-cong");
                window.location.href = '/thank-you-ban';
            } else {
                App.UI.Error(response.message);
                $('#btnSend').prop('disabled',false);
            }
        });
        return false;
    });
};

/**
 * getLatLongFromAdrress
 * @param options {lat, long, address, houseNumber, wardName, districtName}
 * @returns {{latitude: *|jQuery, longitude: *|jQuery}}
 */
var getLatLongFromAdrress = function(options) {

    var lat = options.lat;
    var long = options.long;
    var address = options.address;
    var houseNumer = options.houseNumber;
    var wardName = options.wardName;
    var districtName = options.districtName;
    //

    // set lat long
    var latitude = lat;
    var longitude = long;
    // find lat long from address
    if (!$.trim(lat) || !$.trim(long)) {
        var geoMap = '';
   // if(long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 Lê Đại Hành, phường 15, Quận 11, Hồ Chí Minh, Việt Nam')
        geoMap = $.trim(houseNumer) + ' ' + $.trim(address) + ', ' + $.trim(wardName) + ', ' + $.trim(districtName) + ', Hồ Chí Minh, Việt Nam';
        var getLongLat = function(){
            jQuery.ajax({
                type: "GET",
                dataType: "json",
                url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM",
                data: {'address': geoMap,'sensor':false},
                async: false,
                success: function(data){
                    if(data.results.length){
                        long = data.results[0].geometry.location.lng;
                        lat = data.results[0].geometry.location.lat;
                    }
                }
            });
        };
        getLongLat();
        latitude = lat;
        longitude = long;
        if(latitude == '' || longitude == ''){
            setTimeout(getLongLat(), 100);
            return;
        }
    }

    return {
        latitude : latitude,
        longitude : longitude
    };
};

jQuery.fn.getSelectionStart = function () {
    if (this.lengh == 0) return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
            pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if (typeof (input.selectionStart) != "undefined")
        pos = input.selectionStart;

    return pos;
};

$("#name").keypress(function(e){
    var arr = [ "!" , "`" , "@" , "#" , "$" , "%" , "^" , "&" , "*" , "(" , ")" , "+" , "=" , "-" , "[" , "]" , "'" , ";" , "," , "." , "/" , "{" , "}" , "|" , ":" , "<" , ">" , "?" , "~" , "_" 
  ];
  var co = true;
  
    jQuery.each( arr, function( i, val ) {
        if(String.fromCharCode(event.keyCode) == val || event.keyCode == 92 || event.keyCode == 34 || event.keyCode >= 48 && event.keyCode <= 57 && $("#name").getSelectionStart() == 0){
            co = false;
    }
});
  
  return co;
});

/* Upload image */
var uploadImage = function (input, e, callback="") {
    var data = new FormData();
    var obj;
    data.append('file', e);
    if(typeof e !== "undefined") {
        $.ajax({
            url: '/api/upload?type=listing',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            async: false,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            // Image loading
            beforeSend: function () {
                var img_load = new Image();
                img_load.src = '/assets/images/kloader.gif';
                $($(input).data('target')).parent().append($(img_load).addClass("image-loadding"));
                $($(input).data('target')).parent().css({'position': 'relativie'});
            },
            success: function (result, textStatus, jqXHR) {
                if (typeof result === 'object') {
                    obj = result;
                } else {
                    obj = JSON.parse(result);
                }

                if (obj.result) {
                    var src_img = obj.data.link;
                    var html = $('.ajax-file-upload-container').html();
                    html+= '<div class="col-xs-4 div-col">';
                        html+= '<img class="file-upload-preview-listing" src="'+src_img+'"/>';
                        html+= '<div class="div-close" onclick="removeImg(this);"></div>';
                    html+= '</div>';
                    $('.ajax-file-upload-container').html(html);

                    $($(input).data('target')).parent().first().find('.image-loadding').first().remove();
                    var callback = $($(input).data('target')).data('callback');
                    if ($.isFunction(callback)) {
                        callback($($(input).data('target')));
                    }
                } else {
                    alert(obj.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }
};
//
var uploadImageDrawing = function (input, e, callback="") {
    var data = new FormData();
    var obj;
    data.append('file', e);
    if(typeof e !== "undefined") {
        $.ajax({
            url: '/api/upload?type=listing',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            async: false,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            // Image loading
            beforeSend: function () {
                var img_load = new Image();
                img_load.src = '/assets/images/kloader.gif';
                $($(input).data('target')).parent().append($(img_load).addClass("image-loadding"));
                $($(input).data('target')).parent().css({'position': 'relativie'});
            },
            success: function (result, textStatus, jqXHR) {
                if (typeof result === 'object') {
                    obj = result;
                } else {
                    obj = JSON.parse(result);
                }

                if (obj.result) {
                    var src_img = obj.data.link;
                    var html = $('.ajax-file-upload-container-drawing').html();
                    html+= '<div class="col-xs-4 div-col">';
                        html+= '<img class="file-upload-preview-drawing" src="'+src_img+'"/>';
                        html+= '<div class="div-close" onclick="removeImg(this);"></div>';
                    html+= '</div>';
                    $('.ajax-file-upload-container-drawing').html(html);

                    $($(input).data('target')).parent().first().find('.image-loadding').first().remove();
                    var callback = $($(input).data('target')).data('callback');
                    if ($.isFunction(callback)) {
                        callback($($(input).data('target')));
                    }
                } else {
                    alert(obj.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }
};
/* add image */
var addImage = function (input, e, callback="") {
    var data = new FormData();
    var obj;
    data.append('file', e);
    if(typeof e !== "undefined") {
        $.ajax({
            url: '/api/upload?type=listing',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            async: false,
            processData: false,
            contentType: false,
            // Image loading
            beforeSend: function () {
                var img_load = new Image();
                img_load.src = '/assets/images/kloader.gif';
                $($(input).data('target')).parent().append($(img_load).addClass("image-loadding"));
                $($(input).data('target')).parent().css({'position': 'relativie'});
            },
            success: function (result, textStatus, jqXHR) {
                if (typeof result === 'object') {
                    obj = result;
                } else {
                    obj = JSON.parse(result);
                }
                var html = '';
                if (obj.result) {
                    var src_img = obj.data.link;
                    html+= '<div class="col-xs-4 div-col col-img">';
                    html+= '<img class="img-finish" src="'+src_img+'" />';
                    html+= '<div class="bg-active"></div>';
                    html+= '<div class="div-close" onclick="removeImg(this)";></div>';
                    html+= '</div>';
                    if($('#choose-img .row').children().hasClass('.col-img'))
                        $(html).insertAfter($('#choose-img .row').find('.col-img:last'));
                    else
                        $('#choose-img .row').prepend(html);
                } else {
                    alert(obj.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }
};

var removeImg = function(element){
    $(element).parent().remove();
};

var onChangeInput = function(event) {
    let name = event.target.name;
    if(name != "commissionText" || (name == "commissionText" && $("#" + name).hasClass("disable-float"))) {
        NumberInputUtil.numberToLabel("#" + name);
    }
};