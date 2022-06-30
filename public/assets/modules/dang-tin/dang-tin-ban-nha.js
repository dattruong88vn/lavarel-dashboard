var postData = {};
var address = {};
var startApp = function () {
    // login as agent
    $('#isOwner').change(function(){
        if($(this).is(':checked')){
            $('#infos-owner').hide();
        } else {
            $('#infos-owner').show();
        }
    });
    // no login
    $('#is-agent').click(function(){
        $('#popup-login').modal();
    });
    //
    $.fn.bootstrapValidator.validators.checkNumberHouse = {
        validate: function (validator, $field, options) {
            if ($('#houseNumber').val().trim().length > 0 || ($('.listingType:checked').val() == 1 && ($('.propertyType:checked').val() == 13 || $('.propertyType:checked').val() == 8)) || ($('#listingType:checked').val() == 2 && $('.propertyType:checked').val() == 8)) {
                return true;
            } else {
                return false;
            }
        }
    };
    
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
    
    $("#city").change(function () {
        var cityId = $(this).val();
        App.Feature.Get("/api/get-districts-by-city/" + cityId, function (districts) {
            var districtIds = [];
            if (districts.length != 0) {
                var htmlOutput = "";
                $.each(districts, function (key, item) {
                    htmlOutput += '<option value="' + item.districtId + '">' + item.districtName + '</option>';
                });
                $("#district").html(htmlOutput);
                return true;
            }
            return false;

        });
    });

    $('.slider-home').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
        dots: true,
        autoplay: true,
        item: 1,
        responsive: {
            0: {
                items: 1,
                nav: false
            }
        }
    });

    $("#district").change(function () {
        if ($(this).val() == '') {
            var option = '<option value="">Phường/Xã</option>';
            $('#ward').html(option);
            return false;
        }
        $('input[name="fullAddress"]').val("");
        //$("#ward").html('');
        var districtId = $(this).val();
        App.Feature.Get("/api/get-wards-by-district/" + districtId, function (wards) {
            var wardIds = [];
            var data = $(wards).map(function (idx, ele) {
                wardIds.push(ele.wardId);
                return {
                    id: ele.wardId,
                    text: ele.wardName
                };
            }).toArray();
            var html = '';
            html += '<option value="">Phường/Xã</option>';
            $.each(data, function (key, item) {
                html += '<option value="' + item.id + '">';
                html += item.text;
                html += '</option>';
            });
            $('#ward').html(html);
        });
        //
        $('.autocomplete-suggestions ').html("");
        address = {};
    });

    $("#ward").change(function () {
        $('input[name="fullAddress"]').val("");
    });

    $('.group-select .form-control').select2({
        minimumResultsForSearch: Infinity
    });

    $('.banner-marketting.bxslider').bxSlider({
        responsive: false,
        useCSS: false,
        auto: true,
        autoStart: true,
        autoReload: true,
        infiniteLoop: true,
        controls: true
    });

    var buy_price = ['2%', '15 triệu', '20 triệu', '1%'];
    var rent_price = ['Tùy thỏa thuận', '1/2 tháng tiền thuê', '01 tháng tiền thuê', 'Số năm + 01 tháng tiền thuê '];

    $('.listingType').change(function () {
        if ($('.listingType:checked').val() == "1") {
            $('.text-price').html('Giá đề nghị <strong class="color-red">*</strong>');
            $('#price').attr('placeholder', 'Giá đề nghị');
            $('.col-deposit').hide();
            $('.text-photoGcn').html('<span class="text">Bản vẽ / Sổ </span>(upload tối thiểu 4 hình, kéo thả file hoặc chọn trực tiếp từ máy tính, Dung lượng từ 600kb -> 1Mb kích thước tối thiểu đối với ảnh ngang 1714x968, ảnh đứng 968x1714) <strong class="color-red">*</strong>');
            $('.propertyType-rent').hide();
            $('.propertyType-buy').show();
            $("#price-button").html("<a href='javascript:;' data-target='#popup-require-price-buy' data-toggle='modal'>biểu phí giao dịch</a>");
        } else {
            $('.text-price').html('Giá thuê (tháng) <strong class="color-red">*</strong>');
            $('#price').attr('placeholder', 'Giá thuê');
            $('.col-deposit').show();
            $('.text-photoGcn').html('<span class="text">Bản vẽ / Sổ </span>(kéo thả file hoặc chọn trực tiếp từ máy tính, Dung lượng từ 600kb -> 1Mb kích thước tối thiểu đối với ảnh ngang 1714x968, ảnh đứng 968x1714)');
            $('.propertyType-buy').hide();
            $('.propertyType-rent').show();
            $("#price-button").html("<a href='javascript:;' data-target='#popup-require-price-rent' data-toggle='modal'>biểu phí giao dịch</a>");
        }
        $('#list-price').trigger("change");
    });
    
    $('#list-price').change(function () {
        var index = $(this).val();
        if ($('.listingType:checked').val() == "1") {
            $(".text-vaule-price").text(" Phí giao dịch: " + buy_price[index]);
        } else {
            $(".text-vaule-price").text(" Phí cho thuê: " + rent_price[index]);
        }
    });

    App.UI.inputAllowNumber(["#phone", '#phone-app', '#price', '#deposit'], false);
    $('#price').mask("#.##0", {reverse: true});
    $('#deposit').mask("#.##0", {reverse: true});
    App.UI.removeCheckSuccess(".form-news", ['email','phone']);

    $("#fullAddress").keypress(function (event) {
        if (event.which == 32)
            return;
    }).autoComplete({
        minChars: 4,
        delay: 400,
        cache: false,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var matches = [];
            $.ajax({
                type: "POST",
                url: '/api/get-streets-by-name',
                cache: false,
                data: {streetName: term},
                success: function (response) {
                    if (response.result) {
                        var data_suggest = {};
                        data_suggest.street = [];
                        $.each(response.street, function (key, item) {
                            if ($('#ward').val() == item.wardId) {
                                data_suggest.street.push(item);
                            }
                        });
                        suggest(data_suggest.street);
                    }
                }
            });
        },
        renderItem: function (item, search) {
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            var fullName = item.streetName;
            return '<div class="autocomplete-suggestion" data-json=\'' + JSON.stringify(item) + '\'>'
                + fullName.replace(re, "<b>$1</b>") + '</div>';
        },
        onSelect: function (e, term, item) {
            chooseStreet = item.data('json');
            name = chooseStreet.streetName;
            address.districtId = chooseStreet.districtId;
            address.wardId = chooseStreet.wardId;
            address.streetId = chooseStreet.streetId;
            $('#fullAddress').val(name);
        },
        onClose: function () {
            $(this).data().autocomplete.term = null;
        }
    });

    var checkValidFormAgentOwner = function (form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
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
                phone: {
                    validators: {
                        stringLength: {
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
                price: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinchunha_price_empty
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
    //
    var checkValidFormNoLogin = function (form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
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
                price: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinchunha_price_empty
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
    //
    var marker;
    var markers = [];
    var currentInfoWindow = null;
    function myMap(long, lat) {
        var mapCanvas = document.getElementById('map');
        var myCenter = new google.maps.LatLng(lat, long);
        var myinput = document.getElementById('myaddress');

        var mapOptions = {
            center: myCenter,
            zoom: 16
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
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
        google.maps.event.addListener(map, 'click', function (event) {
            placeMarker(map, event.latLng);
        });
    };

    function placeMarker(map, location) {
        if (marker) {
            var infowindow = new google.maps.InfoWindow();
            infowindow.close(map, marker);
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers.push(marker);
            for (var i = 0; i < markers.length - 1; i++) {
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
        var latlng = {lat: location.lat(), lng: location.lng()};
        var infowindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latlng}, function (results, status) {
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
        if (currentInfoWindow !== null) {
            currentInfoWindow.close();
        }
        infowindow.open(map, marker);
        currentInfoWindow = infowindow;
    }
    //
    $('#map-dangtin').click(function () {
        $('#popup-map-dangtin').modal();
        //
        var houseNumber = $("#houseNumber").val().trim();
        var fullAddress = $("#fullAddress").val().trim();
        var ward = $('#ward').val();
        var district = $('#district').val();
        var latitude = 10.7626639;
        var longitude = 106.6568935;
        var long = '';
        var lat = '';
        if (houseNumber !== '' && fullAddress !== '' && ward !== '' && district !== '') {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#ward :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
            var getLongLat = function () {
                jQuery.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key="+keysGoogle,
                    data: {'address': geoMap, 'sensor': false},
                    async: false,
                    success: function (data) {
                        if (data.results.length) {
                            long = data.results[0].geometry.location.lng;
                            lat = data.results[0].geometry.location.lat;
                        }
                    }
                });
            };
            getLongLat();
            latitude = lat;
            longitude = long;
            if (latitude == '' || longitude == '') {
                setTimeout(getLongLat(), 100);
                return;
            }
        }
        //
        myMap(longitude, latitude);
    });

    $('.remove-text').click(function () {
        $('#myaddress').val('');
    });
    //
    $('.btn-confirm-longlat').click(function () {
        var fullAdd = $('#address-done-popup').val();
        var fullAddress = '';
        var arrays = fullAdd.split(',');
        if (arrays.length == 5) {
            var ward = arrays[1].trim();
            var district = arrays[2].trim();
            var postDataLongLat = {
                'city_id': 1,
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
                        html += '<option value="">Phường/Xã</option>';
                        $.each(data, function (key, item) {
                            html += '<option value="' + item.id + '">';
                            html += item.text;
                            html += '</option>';
                        });
                        $('#ward').html(html);
                        $('#ward').val(response.data[0].wardId);
                    });
                }
            });
            var city = arrays[3].trim();
            var arr2 = arrays[0].trim().split(' ');
            if (arr2[0] == 'Hẻm') {
                if (arr2[1] !== 'số') {
                    $('#houseNumber').val('Hẻm ' + arr2[1]);
                    for (var i = 2; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if (arr2[1] == 'số') {
                    $('#houseNumber').val('Hẻm số ' + arr2[2]);
                    for (var i = 3; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            } else {
                if (parseInt(arr2[0]) >= 1) {
                    $('#houseNumber').val(arr2[0]);
                    var fullAddress = '';
                    for (var i = 1; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else {
                    $('#houseNumber').val('');
                    var fullAddress = '';
                    for (var i = 0; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            }
        } else if (arrays.length == 4) {
            var district = arrays[1].trim();
            var postDataLongLat = {
                'city_id': 1,
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
                        html += '<option value="">Phường/Xã</option>';
                        $.each(data, function (key, item) {
                            html += '<option value="' + item.id + '">';
                            html += item.text;
                            html += '</option>';
                        });
                        $('#ward').html(html);
                        //$('#ward').val(response.data[0].wardId);
                    });
                }
            });
            var city = arrays[2].trim();
            var arr2 = arrays[0].trim().split(' ');
            if (arr2[0] == 'Hẻm') {
                if (arr2[1] !== 'số') {
                    $('#houseNumber').val('Hẻm ' + arr2[1]);
                    for (var i = 2; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if (arr2[1] == 'số') {
                    $('#houseNumber').val('Hẻm số ' + arr2[2]);
                    for (var i = 3; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            } else {
                if (parseInt(arr2[0]) >= 1) {
                    $('#houseNumber').val(arr2[0]);
                    var fullAddress = '';
                    for (var i = 1; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else {
                    $('#houseNumber').val('');
                    var fullAddress = '';
                    for (var i = 0; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            }
        } else if (arrays.length == 6) {
            arrays.splice(0, 1);
            var district = arrays[1].trim();
            var postDataLongLat = {
                'city_id': 1,
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
                        html += '<option value="">Phường/Xã</option>';
                        $.each(data, function (key, item) {
                            html += '<option value="' + item.id + '">';
                            html += item.text;
                            html += '</option>';
                        });
                        $('#ward').html(html);
                        //$('#ward').val(response.data[0].wardId);
                    });
                }
            });
            var city = arrays[2].trim();
            var arr2 = arrays[0].trim().split(' ');
            if (arr2[0] == 'Hẻm') {
                if (arr2[1] !== 'số') {
                    $('#houseNumber').val('Hẻm ' + arr2[1]);
                    for (var i = 2; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if (arr2[1] == 'số') {
                    $('#houseNumber').val('Hẻm số ' + arr2[2]);
                    for (var i = 3; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            } else {
                if (parseInt(arr2[0]) >= 1) {
                    $('#houseNumber').val(arr2[0]);
                    var fullAddress = '';
                    for (var i = 1; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else {
                    $('#houseNumber').val('');
                    var fullAddress = '';
                    for (var i = 0; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                }
            }
        }
    });

    $('.btn-cancel-longlat').click(function () {
        $('#address-done-popup').val('');
        $('#long').val('');
        $('#lat').val('');
        $('#popup-map-dangtin').modal('hide');
    });

    $('#close-popup').click(function () {
        $('#address-done-popup').val('');
        $('#long').val('');
        $('#lat').val('');
        $('#popup-map-dangtin').modal('hide');
    });
    //
    $('.upload-image').change(function(e){
        if($(this).attr('type')=='file') {
            uploadImage(this, e);
        }
    });
    //
    $('.upload-image-drawing').change(function(e){
        if($(this).attr('type')=='file') {
            uploadImageDrawing(this, e);
        }
    });
    // 1. agent
    $("#btnSendAgent").click(function () {
        $(this).prop('disabled', true);
        var curForm = $(this).closest(".form-news");
        if (!checkValidFormAgentOwner(curForm)) {
            App.UI.Error(messages.dangtinchunha_thatbai_thieuthongtin);
            $(this).prop('disabled', false);
            return false;
        }
        //
        if($('.file-upload-preview-listing').length < 2){
            App.UI.Error(messages.dangtinmoigioi_hinhanhlisting_empty);
            $(this).prop('disabled',false);
            return false;
        }
        if($('.file-upload-preview-drawing').length < 4 && parseInt($(".listingType:checked").val()) == 1){
            App.UI.Error(messages.dangtinmoigioi_hinhanhdrawing_empty);
            $(this).prop('disabled',false);
            return false;
        }
        //
        var long = $('#long').val();
        var lat = $('#lat').val();
        var addressDone = $('#address-done-popup').val();
        if (long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 Lê Đại Hành, phường 15, Quận 11, Hồ Chí Minh, Việt Nam')
        {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#ward :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
            getGeoCode(geoMap,coverGeoCodeAgent);
            // var getLongLat = function () {
            //     jQuery.ajax({
            //         type: "GET",
            //         dataType: "json",
            //         url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key="+keysGoogle,
            //         data: {'address': geoMap, 'sensor': false},
            //         async: false,
            //         success: function (data) {
            //             if (data.results.length) {
            //                 long = data.results[0].geometry.location.lng;
            //                 lat = data.results[0].geometry.location.lat;
            //             }
            //         }
            //     });
            // };
            // getLongLat();
            // var latitude = lat;
            // var longitude = long;
            // if (latitude == '' || longitude == '') {
            //     setTimeout(getLongLat(), 100);
            //     return;
            // }
        } else {
            var latitude = lat;
            var longitude = long;
            coverGeoCodeAgent(latitude,longitude)
        }
        //
    });
    // 2. owner
    $('#btnSendOwner').click(function(){
        $(this).prop('disabled', true);
        var curForm = $(this).closest(".form-news");
        if (!checkValidFormAgentOwner(curForm)) {
            App.UI.Error(messages.dangtinchunha_thatbai_thieuthongtin);
            $(this).prop('disabled', false);
            return false;
        }
        //
        if($('.file-upload-preview-listing').length < 2){
            App.UI.Error(messages.dangtinmoigioi_hinhanhlisting_empty);
            $(this).prop('disabled',false);
            return false;
        }
        if($('.file-upload-preview-drawing').length < 4 && parseInt($(".listingType:checked").val()) == 1){
            App.UI.Error(messages.dangtinmoigioi_hinhanhdrawing_empty);
            $(this).prop('disabled',false);
            return false;
        }
        //
        var long = $('#long').val();
        var lat = $('#lat').val();
        var addressDone = $('#address-done-popup').val();
        if (long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 Lê Đại Hành, phường 15, Quận 11, Hồ Chí Minh, Việt Nam')
        {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#ward :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
            getGeoCode(geoMap,coverGeoCodeOwner);
            // var getLongLat = function () {
            //     jQuery.ajax({
            //         type: "GET",
            //         dataType: "json",
            //         url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key="+keysGoogle,
            //         data: {'address': geoMap, 'sensor': false},
            //         async: false,
            //         success: function (data) {
            //             if (data.results.length) {
            //                 long = data.results[0].geometry.location.lng;
            //                 lat = data.results[0].geometry.location.lat;
            //             }
            //         }
            //     });
            // };
            // getLongLat();
            // var latitude = lat;
            // var longitude = long;
            // if (latitude == '' || longitude == '') {
            //     setTimeout(getLongLat(), 100);
            //     return;
            // }
        } else {
            var latitude = lat;
            var longitude = long;
            coverGeoCodeOwner(latitude,longitude)
        }
        //    
        return false;
    });
    // 3. no login
    $('#btnSendNoLogin').click(function(){
        var curForm = $(this).closest(".form-news");
        if (!checkValidFormNoLogin(curForm)) {
            App.UI.Error(messages.dangtinnhanh_thongtinnhanh_thatbai_thieuthongtin);
            return false;
        }
        //
        if($('.file-upload-preview-listing').length < 2){
            App.UI.Error(messages.dangtinmoigioi_hinhanhlisting_empty);
            $(this).prop('disabled',false);
            return false;
        }
        if($('.file-upload-preview-drawing').length < 4  && parseInt($(".listingType:checked").val()) == 1){
            App.UI.Error(messages.dangtinmoigioi_hinhanhdrawing_empty);
            $(this).prop('disabled',false);
            return false;
        }
        $('#popup-info-quickly').modal();
    });
    $('#btnFinishNoLogin').click(function(){
       $(this).prop('disabled', true);
        var curForm = $(this).closest("#stage_infos");
        if (!checkValidFormNoLogin(curForm)) {
            $(this).prop('disabled', false);
            return false;
        }
        //
        var long = $('#long').val();
        var lat = $('#lat').val();
        var addressDone = $('#address-done-popup').val();
        if (long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 Lê Đại Hành, phường 15, Quận 11, Hồ Chí Minh, Việt Nam')
        {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#ward :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
            getGeoCode(geoMap,coverGeoCodeNoLogin);
            // var getLongLat = function () {
            //     jQuery.ajax({
            //         type: "GET",
            //         dataType: "json",
            //         url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key="+keysGoogle,
            //         data: {'address': geoMap, 'sensor': false},
            //         async: false,
            //         success: function (data) {
            //             if (data.results.length) {
            //                 long = data.results[0].geometry.location.lng;
            //                 lat = data.results[0].geometry.location.lat;
            //             }
            //         }
            //     });
            // };
            // getLongLat();
            // var latitude = lat;
            // var longitude = long;
            // if (latitude == '' || longitude == '') {
            //     setTimeout(getLongLat(), 100);
            //     return;
            // }
        } else {
            var latitude = lat;
            var longitude = long;
            coverGeoCodeNoLogin(latitude,longitude)
        }
        //
        
    });
};

function coverGeoCodeNoLogin(latitude,longitude){
    var phone = $("#phone").val().trim();

    var firstChar = phone.substring(0, 1);
    if (firstChar !== '0' ){
        App.UI.ShowFormMessage('#popup-info-quickly', 'Vui lòng nhập Số điện thoại hợp lệ', App.UI.notiTypeError);
        $('#btnFinishNoLogin').prop('disabled', false);
        return false;
    }
    
    var propertyTypeId = parseInt($(".propertyType:checked").val());
    if(parseInt($(".listingType:checked").val()) == 2){
        propertyTypeId = parseInt($(".propertyType_rent:checked").val());
    }
    var postData = {
        "name": $("#name").val().trim(),
        "phone": phone,
        "email": $("#email").val().trim(),
        "isOwner" : true,
        "statusId": 1,
        "code": "",
        "sourceId": 1,
        "consults": $(".request-type:checked").map(function (idx, input) {
            return  {
                "id": {
                    "typeId": parseInt($(input).val())
                }
            };
        }).toArray(),
        "info": {
            "listingTypeId": parseInt($(".listingType:checked").val()),
            "propertyTypeId": propertyTypeId,
            "cityId": 1,
            "districtId": $("#district").val(),
            "wardId": $('#ward').val(),
            "streetId": address.streetId,
            "houseNumber": $("#houseNumber").val().trim(),
            "houseNumberRoad": $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim(),
            "latitude": latitude,
            "longitude": longitude,
            "isGuaranteed": false,
            "price": parseInt($('#price').val().replace(/\./g, '')),
            "deposit": parseInt($('#deposit').val().replace(/\./g, '')),
            "description": $('#description').val(),
            "address": $('#houseNumber').val() + ' ' + $('#fullAddress').val() + ', ' + $('#ward option:selected').text() + ', ' + $('#district option:selected').text() + ', ' + $('#city option:selected').text() + ', Việt Nam'
        }
    };
    
    //
    var photo = [];
    $.each($('.file-upload-preview-listing'), function(key, val){
        photo[key] = {
            'link': ($(this).attr('src')),
            'isPrivate':false,
            'source' : 'portal'
        };

    });
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
    postData.info.photoGcn = JSON.stringify(photoGcn);
    
    let visitedList = TrackUserRoute.getVisitedList();
    if(visitedList){
        postData.visitList = visitedList;
    }
    App.Feature.Post("/api/dang-tin-quickly", postData, function (response) {
        if (response.result) {
            TrackUserRoute.clearVisitedList();
            App.Feature.AddIframe("/dang-tin-thanh-cong");
            window.location.href = '/thank-you-ban';
        } else {
            App.UI.Error(response.message);
            $('#btnFinishNoLogin').prop('disabled', false);
        }
    });
}

function coverGeoCodeAgent(latitude,longitude){
    var propertyTypeId = parseInt($(".propertyType:checked").val());
    if(parseInt($(".listingType:checked").val()) == 2){
        propertyTypeId = parseInt($(".propertyType_rent:checked").val());
    }
    
    var postData = {
        "code": "",
        "sourceId" : 1,
        "isOwner" : false,
        "statusId": 1,
        "consults": $(".request-type:checked").map(function (idx, input) {
            return  {
                "id": {
                    "typeId": parseInt($(input).val())
                }
            };
        }).toArray(),
        "info": {
            "listingTypeId": parseInt($(".listingType:checked").val()),
            "propertyTypeId": propertyTypeId,
            "cityId": 1,
            "districtId": $("#district").val(),
            "wardId": $('#ward').val(),
            "streetId": address.streetId,
            "houseNumber": $("#houseNumber").val().trim(),
            "houseNumberRoad": $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim(),
            "latitude": latitude,
            "longitude": longitude,
            "isGuaranteed": false,
            "price": parseInt($('#price').val().replace(/\./g, '')),
            "deposit": parseInt($('#deposit').val().replace(/\./g, '')),
            "description": $('#description').val(),
            "address": $('#houseNumber').val() + ' ' + $('#fullAddress').val() + ', ' + $('#ward option:selected').text() + ', ' + $('#district option:selected').text() + ', ' + $('#city option:selected').text() + ', Việt Nam'
        }
    };
    //
    var photo = [];
    $.each($('.file-upload-preview-listing'), function(key, val){
        photo[key] = {
            'link': ($(this).attr('src')),
            'isPrivate':false,
            'source' : 'portal'
        };

    });
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
    postData.info.photoGcn = JSON.stringify(photoGcn);
    //
    if($('#isOwner').is(':checked')){
        postData.isOwner =  true;
        postData.name = $('#name_agent').val();
        postData.phone = $('#phone_agent').val();
        postData.email = $('#email_agent').val();
    } else {
        postData.name = $('#name').val();
        postData.phone = $('#phone').val();
        postData.email = $('#email').val();
    }
    //
    let visitedList = TrackUserRoute.getVisitedList();
    if(visitedList){
        postData.visitList = visitedList;
    }
    App.Feature.Post("/api/dang-tin-quickly", postData, function (response) {
        if (response.result) {
            TrackUserRoute.clearVisitedList();
            App.Feature.AddIframe("/dang-tin-thanh-cong");
            window.location.href = '/thank-you-ban';
        } else {
            App.UI.Error(response.message);
            $('#btnSendAgent').prop('disabled', false);
        }
    });
}

function coverGeoCodeOwner(latitude,longitude){
    var propertyTypeId = parseInt($(".propertyType:checked").val());
    if(parseInt($(".listingType:checked").val()) == 2){
        propertyTypeId = parseInt($(".propertyType_rent:checked").val());
    }
    var postData = {
        "code": "",
        "sourceId" : 1,
        "isOwner" : true,
        "statusId": 1,
        "consults": $(".request-type:checked").map(function (idx, input) {
            return  {
                "id": {
                    "typeId": parseInt($(input).val())
                }
            };
        }).toArray(),
        "info": {
            "listingTypeId": parseInt($(".listingType:checked").val()),
            "propertyTypeId": propertyTypeId,
            "cityId": 1,
            "districtId": $("#district").val(),
            "wardId": $('#ward').val(),
            "streetId": address.streetId,
            "houseNumber": $("#houseNumber").val().trim(),
            "houseNumberRoad": $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim(),
            "latitude": latitude,
            "longitude": longitude,
            "isGuaranteed": false,
            "price": parseInt($('#price').val().replace(/\./g, '')),
            "deposit": parseInt($('#deposit').val().replace(/\./g, '')),
            "description": $('#description').val(),
            "address": $('#houseNumber').val() + ' ' + $('#fullAddress').val() + ', ' + $('#ward option:selected').text() + ', ' + $('#district option:selected').text() + ', ' + $('#city option:selected').text() + ', Việt Nam'
        }
    };
    //
    var photo = [];
    $.each($('.file-upload-preview-listing'), function(key, val){
        photo[key] = {
            'link': ($(this).attr('src')),
            'isPrivate':false,
            'source' : 'portal'
        };

    });
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
    postData.info.photoGcn = JSON.stringify(photoGcn);
    //
    postData.name = $('#name').val();
    postData.phone = $('#phone').val();
    postData.email = $('#email').val();
    //
    let visitedList = TrackUserRoute.getVisitedList();
    if(visitedList){
        postData.visitList = visitedList;
    }
    App.Feature.Post("/api/dang-tin-quickly", postData, function (response) {
        if (response.result) {
            TrackUserRoute.clearVisitedList();
            App.Feature.AddIframe("/dang-tin-thanh-cong");
            window.location.href = '/thank-you-ban';
        } else {
            App.UI.Error(response.message);
            $('#btnSendOwner').prop('disabled', false);
        }
    });
}

/* Upload image */
var uploadImage = function (input, e, callback="") {
    files = e.target.files;
    $.each(files, function(k,v){
        var data = new FormData();
        var obj;
        data.append('file', v);
        if(typeof v !== "undefined") {
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
                        src_img = obj.data.link;
                        var html = $('.ajax-file-upload-container').html();
                        html+= '<div class="ajax-file-upload-statusbar">';
                        html+= '<img class="file-upload-preview-listing" src="'+src_img+'"/>';
                        html+= '<div class="ajax-file-upload-red" onclick="removeInput(this);" style=""><i class="fa fa-trash-o"></i></div>';
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
    });
};

var uploadImageDrawing = function (input, e, callback="") {
    files = e.target.files;
    $.each(files, function(k,v){
        var data = new FormData();
        var obj;
        data.append('file', v);
        if(typeof v !== "undefined") {
            $.ajax({
                url: '/api/upload?type=listing',
                type: 'POST',
                data: data,
                cache: false,
                async: false,
                dataType: 'json',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                // Image loading
                beforeSend: function () {
                    var img_load = new Image();
                    img_load.src = '/assets/images/kloader.gif';
                    $($(input).data('target')).parent().append($(img_load).addClass("image-loadding-drawing"));
                    $($(input).data('target')).parent().css({'position': 'relativie'});
                },
                success: function (result, textStatus, jqXHR) {
                    if (typeof result === 'object') {
                        obj = result;
                    } else {
                        obj = JSON.parse(result);
                    }

                    if (obj.result) {
                        src_img = obj.data.link;
                        var html = $('.ajax-file-upload-container-drawing').html();
                        html+= '<div class="ajax-file-upload-statusbar">';
                        html+= '<img class="file-upload-preview-drawing" src="'+src_img+'"/>';
                        html+= '<div class="ajax-file-upload-red" onclick="removeInput(this);" style=""><i class="fa fa-trash-o"></i></div>';
                        html+= '</div>';
                        $('.ajax-file-upload-container-drawing').html(html);

                        $($(input).data('target')).parent().first().find('.image-loadding-drawing').first().remove();
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
    });   
};

var removeInput = function(element){
    $(element).parent().remove();
};

var onChangeInput = function(event) {
    let name = event.target.name;
    if(name != "commissionText" || (name == "commissionText" && $("#" + name).hasClass("disable-float"))) {
        NumberInputUtil.numberToLabel("#" + name);
    }
};

var getGeoCode = function(address,callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function(results, status) {
        callback(results[0].geometry.location.lat(),results[0].geometry.location.lng()) 
    });
}