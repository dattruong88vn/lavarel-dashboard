var postData = {};
var address = {};
var startApp = function () {
    $.fn.bootstrapValidator.validators.checkNumberHouse = {
        validate: function (validator, $field, options) {
            if ($('input[name="houseNumber"]').val().trim().length > 0 || ($('input[name="listingType"]:checked').val() == 1 && ($('input[name="propertyType"]:checked').val() == 13 || $('input[name="propertyType"]:checked').val() == 8)) || ($('input[name="listingType"]:checked').val() == 2 && $('input[name="propertyType"]:checked').val() == 8)) {
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
            var option = '<option value="">Ph?????ng/X??</option>';
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
            html += '<option value="">Ph?????ng/X??</option>';
            $.each(data, function (key, item) {
                html += '<option value="' + item.id + '">';
                html += item.text;
                html += '</option>';
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

    var buy_price = ['2%', '15 tri???u', '20 tri???u', '1%'];
    var rent_price = ['T??y th???a thu???n', '1/2 th??ng ti???n thu??', '01 th??ng ti???n thu??', 'S??? n??m + 01 th??ng ti???n thu?? '];

    $('.listingType').change(function () {
        if ($('.listingType:checked').val() == "1") {
            $("label.propertyType-2").text("?????t n???n");
            $("#price-button").html("<a href='javascript:;' data-target='#popup-require-price-buy' data-toggle='modal'>bi???u ph?? giao d???ch</a>");
        } else {
            $("label.propertyType-2").text("M???t b???ng");
            $("#price-button").html("<a href='javascript:;' data-target='#popup-require-price-rent' data-toggle='modal'>bi???u ph?? giao d???ch</a>");
        }
        $('#list-price').trigger("change");
    });
    
    $('.propertyType').change(function(){
        if($('.propertyType:checked').val() == "8" || $('.propertyType:checked').val() == "11"){
            $('.size-change').text('Di???n t??ch s??? d???ng (m??)');
        } else {
            $('.size-change').text('Di???n t??ch ?????t (m??)');
        }
    });

    $('#list-price').change(function () {
        var index = $(this).val();
        if ($('.listingType:checked').val() == "1") {
            $(".text-vaule-price").text(" Ph?? giao d???ch: " + buy_price[index]);
        } else {
            $(".text-vaule-price").text(" Ph?? cho thu??: " + rent_price[index]);
        }
    });

    App.UI.inputAllowNumber(["#phone", '#phone-app'], false);
    App.UI.inputAllowNumber(["#lotSize", "#sizeLength", "#sizeWidth"]);
    App.UI.removeCheckSuccess(".form-news", ['email']);

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
                            if ($('#select-ward').val() == item.wardId) {
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
            console.log('CLose...');
        }
    });

    var checkValidForm = function (form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message: "Gi?? tr??? ch??a ????ng", excluded: [":hidden"], feedbackIcons: {
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
        //console.log(markers);
        var latlng = {lat: location.lat(), lng: location.lng()};
        var infowindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latlng}, function (results, status) {
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    infowindow.setContent(results[0].formatted_address);
                    $('#address-done-popup').val(results[0].formatted_address);
                    $('#long').val(location.lng());
                    $('#lat').val(location.lat());
                } else {
                    alert('Kh??ng t??m th???y, xin vui l??ng th??? l???i');
                    $('#popup-map-dangtin').modal('hide');
                }
            } else {
                setTimeout(placeMarker(map, location), 100);
                return;
                //alert('B???n ????? b??? l???i, xin vui l??ng th??? l???i');
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
        var ward = $('#select-ward').val();
        var district = $('#district').val();
        var latitude = 10.7626639;
        var longitude = 106.6568935;
        var long = '';
        var lat = '';
        if (houseNumber !== '' && fullAddress !== '' && ward !== '' && district !== '') {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#select-ward :selected').text() + ', ' + $('#district :selected').text() + ', H??? Ch?? Minh, Vi???t Nam';
            //console.log(geoMap);
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
                        html += '<option value="">Ph?????ng/X??</option>';
                        $.each(data, function (key, item) {
                            html += '<option value="' + item.id + '">';
                            html += item.text;
                            html += '</option>';
                        });
                        $('#select-ward').html(html);
                        $('#select-ward').val(response.data[0].wardId);
                    });
                } else {
                    console.log(response);
                }
            });
            var city = arrays[3].trim();
            var arr2 = arrays[0].trim().split(' ');
            if (arr2[0] == 'H???m') {
                if (arr2[1] !== 's???') {
                    $('#houseNumber').val('H???m ' + arr2[1]);
                    for (var i = 2; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if (arr2[1] == 's???') {
                    $('#houseNumber').val('H???m s??? ' + arr2[2]);
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
                        html += '<option value="">Ph?????ng/X??</option>';
                        $.each(data, function (key, item) {
                            html += '<option value="' + item.id + '">';
                            html += item.text;
                            html += '</option>';
                        });
                        $('#select-ward').html(html);
                        //$('#select-ward').val(response.data[0].wardId);
                    });
                } else {
                    console.log(response);
                }
            });
            var city = arrays[2].trim();
            var arr2 = arrays[0].trim().split(' ');
            if (arr2[0] == 'H???m') {
                if (arr2[1] !== 's???') {
                    $('#houseNumber').val('H???m ' + arr2[1]);
                    for (var i = 2; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if (arr2[1] == 's???') {
                    $('#houseNumber').val('H???m s??? ' + arr2[2]);
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
                        html += '<option value="">Ph?????ng/X??</option>';
                        $.each(data, function (key, item) {
                            html += '<option value="' + item.id + '">';
                            html += item.text;
                            html += '</option>';
                        });
                        $('#select-ward').html(html);
                        //$('#select-ward').val(response.data[0].wardId);
                    });
                } else {
                    console.log(response);
                }
            });
            var city = arrays[2].trim();
            var arr2 = arrays[0].trim().split(' ');
            if (arr2[0] == 'H???m') {
                if (arr2[1] !== 's???') {
                    $('#houseNumber').val('H???m ' + arr2[1]);
                    for (var i = 2; i < arr2.length; i++) {
                        fullAddress += arr2[i] + ' ';
                    }
                    $('#fullAddress').val(fullAddress.trim());
                } else if (arr2[1] == 's???') {
                    $('#houseNumber').val('H???m s??? ' + arr2[2]);
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
    //
    $("#btnSend").click(function () {
        $(this).prop('disabled', true);
        var curForm = $(this).closest(".form-news");
        if (!checkValidForm(curForm)) {
            App.UI.Error(messages.dangtinchunha_thatbai_thieuthongtin);
            $(this).prop('disabled', false);
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
        var long = $('#long').val();
        var lat = $('#lat').val();
        var addressDone = $('#address-done-popup').val();
        if (long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 L?? ?????i H??nh, ph?????ng 15, Qu???n 11, H??? Ch?? Minh, Vi???t Nam')
        {
            var geoMap = '';
            geoMap = $("#houseNumber").val().trim() + ' ' + $("#fullAddress").val().trim() + ', ' + $('#select-ward :selected').text() + ', ' + $('#district :selected').text() + ', H??? Ch?? Minh, Vi???t Nam';
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
        var phone = $("#phone").val().trim();
        
        var firstChar = phone.substring(0,1);
        if (firstChar !== '0' ){
            App.UI.Error(messages.dangtinnhanh_thongtinnhanh_phone_wrongformat);
            $(this).prop('disabled', false);
            return false;
        }
        
        var propertyTypeId = parseInt($(".propertyType:checked").val());
        
        var postData = {};
        postData.listingId = $('#listingId').val();
        var socialCommunications = [];
        socialCommunications[0] = {
            'id': {
                "socialUid": -1
            },
            'name' : $('#name').val(),
            'email': $('#email').val(),
            'phone': $('#phone').val()
        };
        postData.socialCommunications = socialCommunications;
        
        var customerServiceConsults = $(".request-type:checked").map(function (idx, input) {
            return  {
                "id": {
                    "typeId": parseInt($(input).val())
                }
            };
        }).toArray();
        postData.customerServiceConsults = customerServiceConsults;
        
        postData.listingTypeId = parseInt($(".listingType:checked").val());
        postData.propertyTypeId = propertyTypeId;
        postData.sizeLength = parseFloat($("#sizeLength").val());
        postData.sizeWidth = parseFloat($("#sizeWidth").val());
        postData.useRightTypeId = null;
        postData.districtId = $("#district").val();
        postData.wardId = $('#select-ward').val();
        postData.streetId = address.streetId;
        postData.houseNumber = $("#houseNumber").val().trim();
        postData.houseNumberRoad = $('#fullAddress').val();
        postData.latitude = latitude;
        postData.longitude = longitude;
        postData.isGuaranteed = false;
        postData.commissionText = parseFloat($("#request-price").val());
        postData.address = $('#houseNumber').val() + ' ' + $('#fullAddress').val() + ', ' + $('#select-ward option:selected').text() + ', ' + $('#district option:selected').text() + ', ' + $('#city option:selected').text() + ', Vi???t Nam';
        postData.sourceId = 1;
        
        var status = {
            "statusId" : 1,
            "source": "propzy",
            "reasonId": null
        };
        
        postData.status = status;
        
        if(propertyTypeId == 8 || propertyTypeId == 11){// chung c??, nh?? ri??ng
            postData.floorSize = parseFloat($("#lotSize").val());
        } else {//?????t n???n
            postData.lotSize = parseFloat($("#lotSize").val());
        }
        
        // KT S??? nh?? 
        if (parseInt(postData.listingTypeId) === 1) {
            postData.propertyTypeId = parseInt($(".propertyType:checked").val());
        } else {
            postData.propertyTypeId = parseInt($(".propertyType:checked").attr("rent-value"));
        }

        // Resolve user right
        if ($(".userRight:checked").size() > 0) {
            postData.useRightTypeId = $(".userRight:checked").val();
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
        console.log(postData);
        //
        if (true) {
            App.Feature.Post("/api/update-listing", postData, function (response) {
                if (response.result) {
                    App.Feature.AddIframe("/dang-tin-thanh-cong");
                    window.location.href = '/tin-dang';
                } else {
                    App.UI.Error(response.message);
                    $('#btnSend').prop('disabled', false);
                }
            });
            return false;
        }
    });
};
jQuery.fn.getSelectionStart = function () {
    if (this.lengh == 0)
        return -1;
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

$("#name").keypress(function (e) {
    var arr = ["!", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "-", "[", "]", "'", ";", ",", ".", "/", "{", "}", "|", ":", "<", ">", "?", "~", "_"
    ];
    var co = true;

    jQuery.each(arr, function (i, val) {
        if (String.fromCharCode(event.keyCode) == val || event.keyCode == 92 || event.keyCode == 34 || event.keyCode >= 48 && event.keyCode <= 57 && $("#name").getSelectionStart() == 0) {
            co = false;
        }
    });

    return co;
});

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