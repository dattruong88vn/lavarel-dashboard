var address = {};
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
    
    $("#city").change(function () {
        var cityId = $(this).val();
        App.Feature.Get("/api/get-districts-by-city/" + cityId, function (districts) {
            var districtIds = [];
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
    
    $("#district").change(function () {
        if($(this).val() == ''){
            var option  = '<option value="">Phường/Xã</option>';
            $('#select-ward').html(option);
            return false;
        }
        $('input[name="fullAddress"]').val("");
        //$("#select-ward").html('');
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
            html+= '<option value="">Phường/Xã</option>';
            $.each(data,function(key,item){
                html+= '<option value="'+item.id+'">';
                html+= item.text;
                html+= '</option>';
            });
            $('#select-ward').html(html);
        });
        //
        $('.autocomplete-suggestions ').html("");
        address = {};
    });
    
    $("#select-ward").change(function () {
        $('input[name="fullAddress"]').val("");
    });
    //
    if ($('.listingType:checked').val() == "1" && $('.propertyTypeSell:checked').val() == 8) {
        App.Feature.Get('/sell-apartment',function(response){
            $("#content-different").html(response);
        });
    }
    //
    $('#isOwner').change(function(){
        if($(this).is(':checked')){
            $('#infos-owner').hide();
        } else {
            $('#infos-owner').show();
        }
    });
    //
    $('.listingType').change(function () {
        if ($('.listingType:checked').val() == "1") {//bán
            $('#listingType').val('1');
            $('#listingTypeName').val('bán');
            $('#purpose').hide();
            $('#propertyTypeSell').show();
            $('#propertyTypeLive').hide();
            $('#propertyTypeBuss').hide();
            //
            if ($('.propertyTypeSell:checked').val() == 8) {// bán chung cư căn hộ
                $('#content-different').load('/sell-apartment');
            } else if ($('.propertyTypeSell:checked').val() == 11) {//bán nhà riêng
                $('#content-different').load('/sell-home');
            } else if ($('.propertyTypeSell:checked').val() == 13) {//bán đất nền
                $('#content-different').load('/sell-ground');
            }
        } else if ($('.listingType:checked').val() == "2"){//thuê
            $('#listingType').val('2');
            $('#listingTypeName').val('thuê');
            $('#purpose').show();
            if ($('.purposeTypeTab:checked').val() == "1") {//để ở
                $('#propertyTypeLive').show();
                $('#propertyTypeSell').hide();
                $('#propertyTypeBuss').hide();
                //
                if ($('.propertyTypeLive:checked').val() == "1"){//thuê ở chung cư căn hộ
                    $('#content-different').load('/rent-stay-apartment');
                } else if ($('.propertyTypeLive:checked').val() == "2"){//thuê ở nhà riêng
                    $('#content-different').load('/rent-stay-home');
                } else if ($('.propertyTypeLive:checked').val() == "3"){//thuê ở biệt thự
                    $('#content-different').load('/rent-stay-villa');
                } else if ($('.propertyTypeLive:checked').val() == "10"){//thuê ở phòng cho thuê
                    $('#content-different').load('/rent-stay-motel');
                }
            } else if ($('.purposeTypeTab:checked').val() == "2"){//thương mại
                $('#propertyTypeBuss').show();
                $('#propertyTypeSell').hide();
                $('#propertyTypeLive').hide();
                //
                if ($('.propertyTypeBuss:checked').val() == "4"){//thuê thương mại văn phòng
                    $('#content-different').load('/rent-trade-office');
                } else if ($('.propertyTypeBuss:checked').val() == "7"){//thuê thương mại mặt bằng
                    $('#content-different').load('/rent-trade-ground');
                } else if ($('.propertyTypeBuss:checked').val() == "5"){//thuê thương mại biệt thự
                    $('#content-different').load('/rent-trade-villa');
                } else if ($('.propertyTypeBuss:checked').val() == "6"){//thuê thương mại nhà riêng
                    $('#content-different').load('/rent-trade-home');
                }
            }
        }
    });
    //
    $('.purposeTypeTab').change(function(){
        if ($('.listingType:checked').val() == "2") {
            $('#propertyTypeSell').hide();
            if ($('.purposeTypeTab:checked').val() == "1") {// để ở
                $('#propertyTypeLive').show();
                $('#propertyTypeBuss').hide();
                $('#propertyTypeSell').hide();
                //
                if ($('.propertyTypeLive:checked').val() == "1"){//thuê ở chung cư căn hộ
                    $('#content-different').load('/rent-stay-apartment');
                } else if ($('.propertyTypeLive:checked').val() == "2"){//thuê ở nhà riêng
                    $('#content-different').load('/rent-stay-home');
                } else if ($('.propertyTypeLive:checked').val() == "3"){//thuê ở biệt thự
                    $('#content-different').load('/rent-stay-villa');
                } else if ($('.propertyTypeLive:checked').val() == "10"){//thuê ở phòng cho thuê
                    $('#content-different').load('/rent-stay-motel');
                }
            } else if ($('.purposeTypeTab:checked').val() == "2"){// để thương mại
                $('#propertyTypeBuss').show();
                $('#propertyTypeLive').hide();
                $('#propertyTypeSell').hide();
                //
                if ($('.propertyTypeBuss:checked').val() == "4"){//thuê thương mại văn phòng
                    $('#content-different').load('/rent-trade-office');
                } else if ($('.propertyTypeBuss:checked').val() == "7"){//thuê thương mại mặt bằng
                    $('#content-different').load('/rent-trade-ground');
                } else if ($('.propertyTypeBuss:checked').val() == "5"){//thuê thương mại biệt thự
                    $('#content-different').load('/rent-trade-villa');
                } else if ($('.propertyTypeBuss:checked').val() == "6"){//thuê thương mại nhà riêng
                    $('#content-different').load('/rent-trade-home');
                }
            }
        }
    });
    //
    $('.propertyTypeSell').change(function(){
        if ($('.listingType:checked').val() == "1" && $('.propertyTypeSell:checked').val() == 8) {
            App.Feature.Get('/sell-apartment',function(response){
                $("#content-different").html(response);
            }, 1);
        } else if ($('.listingType:checked').val() == "1" && $('.propertyTypeSell:checked').val() == 11) {
            App.Feature.Get('/sell-home',function(response){
                $("#content-different").html(response);
            }, 1);
        } else if ($('.listingType:checked').val() == "1" && $('.propertyTypeSell:checked').val() == 13) {
            App.Feature.Get('/sell-ground',function(response){
                $("#content-different").html(response);
            }, 1);
        }
    });
    //
    $('.propertyTypeLive').change(function(){
        if ($('.propertyTypeLive:checked').val() == "1"){//thuê ở chung cư căn hộ
            $('#content-different').load('/rent-stay-apartment');
        } else if ($('.propertyTypeLive:checked').val() == "2"){//thuê ở nhà riêng
            $('#content-different').load('/rent-stay-home');
        } else if ($('.propertyTypeLive:checked').val() == "3"){//thuê ở biệt thự
            $('#content-different').load('/rent-stay-villa');
        } else if ($('.propertyTypeLive:checked').val() == "10"){//thuê ở phòng cho thuê
            $('#content-different').load('/rent-stay-motel');
        }
    });
    //
    $('.propertyTypeBuss').change(function(){
        if ($('.propertyTypeBuss:checked').val() == "4"){//thuê thương mại văn phòng
            $('#content-different').load('/rent-trade-office');
        } else if ($('.propertyTypeBuss:checked').val() == "7"){//thuê thương mại mặt bằng
            $('#content-different').load('/rent-trade-ground');
        } else if ($('.propertyTypeBuss:checked').val() == "5"){//thuê thương mại biệt thự
            $('#content-different').load('/rent-trade-villa');
        } else if ($('.propertyTypeBuss:checked').val() == "6"){//thuê thương mại nhà riêng
            $('#content-different').load('/rent-trade-home');
        }
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
    //
    $("#fullAddress").keypress(function(event) {
        if (event.which == 32) 
            return;
    }).autoComplete({
        minChars: 4,
        delay: 400,
        cache:false,
        source: function(term, suggest){
            term = term.toLowerCase();
            var matches = [];
            $.ajax({
                type: "POST",
                url: '/api/get-streets-by-name',
                cache: false,
                data: { streetName: term },
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
        },
        onClose:function(){
            $(this).data().autocomplete.term = null;
        }
    });
    
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
//        var infowindow = new google.maps.InfoWindow({
//            content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
//        });
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
        var ward = $('#select-ward').val();
        var district = $('#district').val();
        var latitude = 10.7626639;
        var longitude = 106.6568935;
        var long = '';
        var lat = '';
        if (houseNumber !== '' && fullAddress !== '' && ward !== '' && district !== '') {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#select-ward :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
            var getLongLat = function () {
                jQuery.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM",
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
                        $('#select-ward').html(html);
                        $('#select-ward').val(response.data[0].wardId);
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
                        $('#select-ward').html(html);
                        //$('#select-ward').val(response.data[0].wardId);
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
                        $('#select-ward').html(html);
                        //$('#select-ward').val(response.data[0].wardId);
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

    // send infos
    var checkValidForm = function (form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            }, 
            fields: {
                district: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_quanhuyen_empty
                        }
                    }
                },
                ward: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_phuongxa_empty
                        }
                    }
                },
                houseNumber: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_sonha_empty
                        }
                    }
                },
                fullAddress: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_diachi_empty
                        }
                    }
                },
                floorSize: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_dientichsudung_empty
                        }
                    }
                },
                lotSize: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_dientichdat_empty
                        }
                    }
                },
                sizeLength: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_chieudai_empty
                        }
                    }
                },
                sizeWidth: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_chieurong_empty
                        }
                    }
                },
                bedRooms: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_phongngu_empty
                        }
                    }
                },
                bathRooms: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_phongtamwc_empty
                        }
                    }
                },
                useRightType: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_giaychuquyen_empty
                        }
                    }
                },
                moveInDate: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập giá trị"
                        }
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_gia_empty
                        }
                    }
                },
                commissionText: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_datcoc_empty
                        }
                    }
                },
                description: {
                    validators: {
                        notEmpty: {
                            message: messages.dangtinmoigioi_motavatienich_empty
                        }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: messages.dangtinmoigioi_email_wrongformat
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    
    removeInput = function(element){
        $(element).parent().remove();
    };
    //
    $('#btnSendAgent').click(function(){
        $(this).prop('disabled',true);
        var curForm = $(this).closest(".form-news");
        if(!checkValidForm(curForm)) {
            App.UI.Error(messages.dangtinmoigioi_thatbai_thieuthongtin);
            $(this).prop('disabled',false);
            return false;
        }
        if($('.file-upload-preview-listing').length < 4){
            App.UI.Error(messages.dangtinmoigioi_hinhanhlisting_empty);
            $(this).prop('disabled',false);
            return false;
        }
        if($('.file-upload-preview-drawing').length < 4){
            App.UI.Error(messages.dangtinmoigioi_hinhanhdrawing_empty);
            $(this).prop('disabled',false);
            return false;
        }
        //
        var date = new Date();
        var today = (date.getMonth()+1) + "-"+date.getDate()+"-"+date.getFullYear();
        today = (new Date(today).getTime());
        //
        var long = $('#long').val();
        var lat = $('#lat').val();
        var addressDone = $('#address-done-popup').val();
        if (long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 Lê Đại Hành, phường 15, Quận 11, Hồ Chí Minh, Việt Nam')
        {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#select-ward :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
            var getLongLat = function () {
                jQuery.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "https://maps.googleapis.com/maps/api/geocode/json?ver=1.1&key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM",
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
            var latitude = lat;
            var longitude = long;
            if (latitude == '' || longitude == '') {
                setTimeout(getLongLat(), 100);
                return;
            }
        } else {
            var latitude = lat;
            var longitude = long;
        }
        //
        var postData = {};
        var isPrivate = true;
        var listingType1 = parseInt($(".listingType1:checked").val());
        if(listingType1 == 0)
            isPrivate = false;
        var listingTypeId = parseInt($(".listingType:checked").val());
        //
        postData.sourceId = 1;
        postData.isOwner = false;
        postData.isPrivate = isPrivate;
        postData.listingTypeId = listingTypeId;
        postData.cityId = $('#city').val();
        postData.districtId = $('#district').val();
        postData.wardId = $('#select-ward').val();
        postData.houseNumber = $('#houseNumber').val();
        postData.houseNumberRoad = $('#fullAddress').val();
        postData.streetId = address.streetId;
        postData.address = $('#houseNumber').val() + ' ' + $('#fullAddress').val() + ', ' + $('#select-ward option:selected').text() + ', ' + $('#district option:selected').text() + ', ' + $('#city option:selected').text() + ', Việt Nam';
        postData.longitude = longitude;
        postData.latitude = latitude;
        //
        if(listingTypeId == 1){//bán
            var propertyTypeSell = parseInt($(".propertyTypeSell:checked").val());
            postData.propertyTypeId = propertyTypeSell;
            if(propertyTypeSell == 8){// bán chung cư căn hộ
                postData.floorSize = $('#floorSize').val();
                postData.numberFloor = $('#numberFloor').val();
                postData.bedRooms = $('#bedRooms').val();
                postData.bathRooms = $('#bathRooms').val();
                postData.directionId = $('#direction').val();
                postData.floors = $('#floors').val();
                postData.useRightTypeId = $('#useRightType').val();
                var rlMoveInDate = {
                    'moveInNow':false,
                    'afterSigningContract' : false,
                    'moveInDate' : null,
                    'afterNumberDays' : null
                };
                
                var moveInDate = $('#moveInDate').val();
                if (moveInDate == 1){
                    rlMoveInDate.moveInNow = true;
                } else if (moveInDate == 2){
                    rlMoveInDate.afterSigningContract = true;
                } else if (moveInDate == 3){
                    var dates1 = $('#dateMoved').val().split("/");
                    var newDate = dates1[1]+"/"+dates1[0]+"/"+dates1[2];
                    rlMoveInDate.moveInDate = new Date(newDate).getTime();
                    if(rlMoveInDate.moveInDate < today){
                        App.UI.Error('Ngày dọn vào phải lớn hay ngày hiện tại');
                        $(this).prop('disabled',false);
                        return false;
                    }
                }
                postData.rlMoveInDate = rlMoveInDate;
                //
                var isVAT = false;
                if(parseInt($('.isVAT:checked').val()) == 1){
                    isVAT = true;
                }
                postData.isVAT = isVAT;
                postData.price = parseInt($('#price').val().replace(/\./g, ''));
                postData.currency = $('#currency').val();
                postData.minPrice = parseInt($('#minPrice').val().replace(/\./g, ''));
                
                if(postData.price < postData.minPrice){
                    App.UI.Error("Giá thương lượng thấp nhất phải thấp hơn hoặc bằng giá bất động sản");
                    $(this).prop('disabled',false);
                    return false;
                }
                
                var commissionList = [];
                commissionList[0] = {
                    'commision' : $('#commissionText').val().replace(/\./g, ''),
                    'contractTime' : null,
                    'isPercentage' : $('.commissionType:checked').val() == 0 ? false : true
                };
                postData.commissionList = commissionList;
                //
            } else if(propertyTypeSell == 11){//bán nhà riêng
                var position = {};
                var propertyPosition = parseInt($(".propertyPosition:checked").val());
                if(propertyPosition == 1){
                    position.position = 1;
                } else {
                    position.position = 2;
                    position.alleyWidth = $('#alley').val();
                }
                
                postData.position = position;
                postData.floorSize = $('#floorSize').val();
                postData.lotSize = $('#lotSize').val();
                postData.sizeLength = $('#sizeLength').val();
                postData.sizeWidth = $('#sizeWidth').val();
                postData.bedRooms = $('#bedRooms').val();
                postData.bathRooms = $('#bathRooms').val();
                postData.directionId = $('#direction').val();
                //
                postData.numberFloor = $('#numberFloor').val();
                postData.useRightTypeId = $('#useRightType').val();
                var rlMoveInDate = {
                    'moveInNow':false,
                    'afterSigningContract' : false,
                    'moveInDate' : null,
                    'afterNumberDays' : null
                };
                
                var moveInDate = $('#moveInDate').val();
                if (moveInDate == 1){
                    rlMoveInDate.moveInNow = true;
                } else if (moveInDate == 2){
                    rlMoveInDate.afterSigningContract = true;
                } else if (moveInDate == 3){
                    var dates1 = $('#dateMoved').val().split("/");
                    var newDate = dates1[1]+"/"+dates1[0]+"/"+dates1[2];
                    rlMoveInDate.moveInDate = new Date(newDate).getTime();
                    if(rlMoveInDate.moveInDate < today){
                        App.UI.Error('Ngày dọn vào phải lớn hay ngày hiện tại');
                        $(this).prop('disabled',false);
                        return false;
                    }
                }
                postData.rlMoveInDate = rlMoveInDate;
                //
                var isVAT = false;
                if(parseInt($('.isVAT:checked').val()) == 1){
                    isVAT = true;
                }
                postData.isVAT = isVAT;
                postData.price = parseInt($('#price').val().replace(/\./g, ''));
                postData.currency = $('#currency').val();
                postData.minPrice = parseInt($('#minPrice').val().replace(/\./g, ''));
                
                if(postData.price < postData.minPrice){
                    App.UI.Error("Giá thương lượng thấp nhất phải thấp hơn hoặc bằng giá bất động sản");
                    $(this).prop('disabled',false);
                    return false;
                }
                
                var commissionList = [];
                commissionList[0] = {
                    'commision' : $('#commissionText').val().replace(/\./g, ''),
                    'contractTime' : null,
                    'isPercentage' : $('.commissionType:checked').val() == 0 ? false : true
                };
                postData.commissionList = commissionList;
            } else if(propertyTypeSell == 13){//bán đất nền
                var position = {};
                var propertyPosition = parseInt($(".propertyPosition:checked").val());
                if(propertyPosition == 1){
                    position.position = 1;
                } else {
                    position.position = 2;
                    position.alleyWidth = $('#alley').val();
                }
                
                postData.position = position;
                postData.lotSize = $('#lotSize').val();
                postData.sizeLength = $('#sizeLength').val();
                postData.sizeWidth = $('#sizeWidth').val();
                postData.directionId = $('#direction').val();
                postData.useRightTypeId = $('#useRightType').val();
                //
                var isVAT = false;
                if(parseInt($('.isVAT:checked').val()) == 1){
                    isVAT = true;
                }
                postData.isVAT = isVAT;
                postData.price = parseInt($('#price').val().replace(/\./g, ''));
                postData.currency = $('#currency').val();
                postData.minPrice = parseInt($('#minPrice').val().replace(/\./g, ''));
                
                if(postData.price < postData.minPrice){
                    App.UI.Error("Giá thương lượng thấp nhất phải thấp hơn hoặc bằng giá bất động sản");
                    $(this).prop('disabled',false);
                    return false;
                }
                
                var commissionList = [];
                commissionList[0] = {
                    'commision' : $('#commissionText').val().replace(/\./g, ''),
                    'contractTime' : null,
                    'isPercentage' : $('.commissionType:checked').val() == 0 ? false : true
                };
                postData.commissionList = commissionList;
            }
        } else {//cho thuê (tạm thời ngưng phục vụ)
            var purposeId = parseInt($(".purposeTypeTab:checked").val());
            postData.purposeId = purposeId;
            if (purposeId == "1") {//để ở
                var propertyTypeLive = parseInt($(".propertyTypeLive:checked").val());
                postData.propertyTypeId = propertyTypeLive;
            } else {//thương mại
                var propertyTypeBuss = parseInt($(".propertyTypeBuss:checked").val());
            }
        }
        //
        postData.description = $('#description').val();
        var photo = [];
        $.each($('.file-upload-preview-listing'), function(key, val){
            photo[key] = {
                'link': ($(this).attr('src')),
                'isPrivate':false,
                'source' : 'portal'
            };

        });
        postData.photo = JSON.stringify(photo);
        //
        var photoGcn = [];
        $.each($('.file-upload-preview-drawing'), function(key, val){
            photoGcn[key] = {
                'link': ($(this).attr('src')),
                'isPrivate':false,
                'source' : 'portal'
            };

        });
        postData.photoGcn = JSON.stringify(photoGcn);
        //
        var socialCommunications = [];
        if($('#isOwner').is(':checked')){
            postData.isOwner = true;
            socialCommunications[0] = {
                'id': {
                    "socialUid": $('#socialUid').val()
                },
                'name' : $('#name_agent').val(),
                'email': $('#email_agent').val(),
                'phone': $('#phone_agent').val(),
                'agentType' : {
                    "agentTypeId": 1
                }
            };
        } else {
            socialCommunications[0] = {
                'id': {
                    "socialUid": -1
                },
                'name' : $('#name').val(),
                'email': $('#email').val(),
                'phone': $('#phone').val()
            };
        }
        
        postData.socialCommunications = socialCommunications;
        //
        let visitedList = TrackUserRoute.getVisitedList();
        if(visitedList){
            postData.visitList = visitedList;
        }

        App.Feature.Post("/api/dang-tin-agent", postData, function (response) {
            if (response.result) {
                TrackUserRoute.clearVisitedList();
                $('#btnSendAgent').prop('disabled',false);
                App.Feature.AddIframe("/dang-tin-thanh-cong");
                window.location.href = '/thank-you-ban';
            } else {
                App.UI.Error(response.message);
                $('#btnSendAgent').prop('disabled',false);
            }
        });
    });
};

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
var onChangeInput = function(event) {
    let name = event.target.name;
    if(name != "commissionText" || (name == "commissionText" && $("#" + name).hasClass("disable-float"))) {
        NumberInputUtil.numberToLabel("#" + name);
    }
};