var enableTab = function (idx) {
    $(".tab-menu li:nth-child(" + idx + ") a").click();
    return false;
};

var checkHash = function () {
    if (location.hash == "#tham-dinh-gia-bat-dong-san") {
        $(".tab-menu li:nth-child(1) a").tab('show');
    }
    else if (location.hash == "#thong-tin-quy-hoach") {
        $(".tab-menu li:nth-child(2) a").tab('show');
    } 
    else if (location.hash == "#thu-tuc-va-ho-so-vay-mua-nha") {
        $(".tab-menu li:nth-child(3) a").tab('show');
    }
    else if (location.hash == '#dam-bao-thanh-toan-ngan-hang') {
        $(".tab-menu li:nth-child(4) a").tab('show');
    } 
    else if (location.hash == '#phap-ly-bat-dong-san') {
        $(".tab-menu li:nth-child(5) a").tab('show');
    }
    else if (location.hash == "#ho-tro-tai-chinh") {
        $(".tab-menu li:nth-child(8) a").tab('show');
    }
    else if (location.hash == "#dich-vu-bds") {
        $(".tab-menu li:nth-child(9) a").tab('show');
    }
}


    


var startApp = function () {

    openServiceTab({defaultHash: (window.location.hash||"#phap-ly-bat-dong-san"), scrollBody: true});
    var numberItem = $('.number-total-item-seen').val();
    var loop = false;
    if(numberItem > 4){
       loop = true; 
    }
    $('.owl-carousel').owlCarousel({
        items: 4,
        lazyLoad: true,
        loop:loop,
        margin: 30,
        dots: false,
        autoplay: false,
        slideBy: 4,
        padding: 0,
        stagePadding: 0,
        autoHeight: false,
        responsiveClass:true,
        autoHeightClass: 'owl-height',
        autoplayHoverPause: true,
        nav: true,
        navText:'',
        responsive:{
            0: {
                items: 1
            },
            360:{
                items: 2
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
    
    $('#carousel').carousel("pause");
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        $("#carousel").carousel(parseInt($(this).attr("banner"))).carousel("pause");
    });

    $(".form-contact").bootstrapValidator({
        message: "Gi?? tr??? ch??a ????ng",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            name: {validators: {notEmpty: {message: "Vui l??ng nh???p H??? v?? T??n"}}},
            email: {validators: {emailAddress: {message: "Vui l??ng nh???p ?????a ch??? email h???p l???"}}},
            phone: {
                validators: {
                    stringLength: {message: "Vui l??ng nh???p s??? ??i???n tho???i h???p l???", min: 10, max: 10},
                    notEmpty: {message: "Vui l??ng nh???p s??? ??i???n tho???i"}
                }
            }
        }
    });
    App.UI.inputAllowNumber([".phone"],false);
    App.UI.removeCheckSuccess(".form-new-services",['email','propertyTypeId','cityId']);
    App.UI.removeCheckSuccess(".form-contact",['email']);
    App.UI.inputAllowNumber(['#sizeLength','#sizeWidth','#lotSize','#buildingArea','#floorSize']);
    App.UI.inputAllowNumber(['#duration','#yearBuilt','#bedRooms','#bathRooms','#yearCertificate'],false);
    

    var checkValidForm = function (form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message: "Gi?? tr??? ch??a ????ng",
            excluded: [":hidden"],
            feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                name: {validators: {notEmpty: {message: "Vui l??ng nh???p H??? v?? T??n"}}},
                email: {validators: {emailAddress: {message: "Vui l??ng nh???p ?????a ch??? email h???p l???"}}},
                phone: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p s??? ??i???n tho???i"},
                        digits: {message: "S??? ??i???n tho???i ph???i l?? s???"}
                    }
                },
                cityId: {validators: {notEmpty: {message: "Vui l??ng ch???n T???nh/Th??nh"}}},
                districtId: {validators: {notEmpty: {message: "Vui l??ng ch???n Qu???n/Huy???n"}}},
                street: {validators: {notEmpty: {message: "Vui l??ng nh???p t??n ???????ng"}}},
                address: {validators: {notEmpty: {message: "Vui l??ng nh???p ?????a ch???"}}},
                propertyTypeId: {validators: {notEmpty: {message: "Vui l??ng ch???n Lo???i h??nh B??S"}}},
                propertyPosition: {validators: {notEmpty: {message: "Vui l??ng ch???n v??? tr?? B??S"}}},
                addressPlace: {validators: {notEmpty: {message: "Vui l??ng nh???p ?????a ch??? th???a ?????t"}}},
                length: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p chi???u d??i"},
                        numeric: {message: "Vui l??ng nh???p s???", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                width: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p chi???u r???ng"},
                        numeric: {message: "Vui l??ng nh???p s???", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                lotSize: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p di???n t??ch ?????t"},
                        numeric: {message: "Vui l??ng nh???p s???", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                buildingArea: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p di???n t??ch s??? d???ng"},
                        numeric: {message: "Vui l??ng nh???p s???", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                floorSize: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p di???n t??ch s??n x??y d???ng"},
                        numeric: {message: "Vui l??ng nh???p s???", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                duration: {validators: {notEmpty: {message: "Vui l??ng nh???p th???i h???n s??? d???ng"}}},
                yearBuilt: {validators: {notEmpty: {message: "Vui l??ng nh???p n??m x??y d???ng"}, digits: {message: "Vui l??ng nh???p s???"}}},
                directionId: {validators: {notEmpty: {message: "Vui l??ng ch???n h?????ng"}}},
                numberOfFloor: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p s??? t???ng"},
                        digits: {message: "Vui l??ng nh???p s???"}
                    }
                },
                frontAlley: {validators: {notEmpty: {message: "Vui l??ng nh???p gi?? tr???"}, digits: {message: "Vui l??ng nh???p s???"}}},
                sideAlley: {validators: {notEmpty: {message: "Vui l??ng nh???p gi?? tr???"}, numeric: {message: "Vui l??ng nh???p s???"}}},
                bedRooms: {validators: {notEmpty: {message: "Vui l??ng nh???p s??? ph??ng ng???"}, digits: {message: "Vui l??ng nh???p s???"}}},
                bathRooms: {validators: {notEmpty: {message: "Vui l??ng nh???p s??? ph??ng t???m"}, digits: {message: "Vui l??ng nh???p s???"}}},
                certificate: {validators: {notEmpty: {message: "Vui l??ng nh???p gi???y ch???ng nh???n"}}},
                yearCertificate: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p n??m c???p s???"},
                        digits: {message: "Vui l??ng nh???p s???"}
                    }
                },
                name: {validators: {notEmpty: {message: "Vui l??ng nh???p H??? v?? T??n"}}},
                phone: {
                    validators: {
                        notEmpty: {message: "Vui l??ng nh???p s??? ??i???n tho???i"},
                        stringLength: {message: "Vui l??ng nh???p s??? ??i???n tho???i h???p l???", min: 10, max: 10}
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
        var address = $("#address").val().trim();
        var ward = $('#wardId').val();
        var district = $('#district').val();
        var latitude = 10.7626639;
        var longitude = 106.6568935;
        var long = '';
        var lat = '';
        if (address !== '' && ward !== '' && district !== '') {
            var geoMap = '';
            geoMap =  $("#address").val().trim() + ', ' + $('#wardId :selected').text() + ', ' + $('#district :selected').text() + ', H??? Ch?? Minh, Vi???t Nam';
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
                        $('#wardId').html(html);
                        $('#wardId').val(response.data[0].wardId);
                    });
                }
            });
            var city = arrays[3].trim();
            $('#address').val(arrays[0]);
            
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
                        $('#wardId').html(html);
                        //$('#wardId').val(response.data[0].wardId);
                    });
                }
            });
            var city = arrays[2].trim();
            $('#address').val(arrays[0]);
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
                        $('#wardId').html(html);
                        //$('#wardId').val(response.data[0].wardId);
                    });
                }
            });
            var city = arrays[2].trim();
            $('#address').val(arrays[0]);
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
    $('.upload-image-drawing').change(function(e){
        if($(this).attr('type')=='file') {
            uploadImageDrawing(this, e);
        }
    });
    //
    removeInput = function(element){
        $(element).parent().remove();
    };
    
    $("#btn-continue-send").click(function () {
        var postData = {};
        var curForm = $(this).closest(".form-new-services");
        if (!checkValidForm(curForm)) {
            return false;
        }
        
        if($('.file-upload-preview-drawing').length < 4){
            App.UI.Error("Vui l??ng ch???n ??t nh???t 4 ???nh gi???y t??? ph??p l??");
            $(this).prop('disabled',false);
            return false;
        }
        
        parent = $(this).closest(".tab-pane");
        $("#formDinhGia").find("select, input").each(function (idx, element) {
            postData[$(element).attr("name")] = $(element).val();
        });
        postData["customerInfo"] = {
            name: parent.find("input[name='name']").val(),
            phone: parent.find("input[name='phone']").val(),
            email: parent.find("input[name='email']").val()
        };

        //
        var long = $('#long').val();
        var lat = $('#lat').val();
        var addressDone = $('#address-done-popup').val();
        if (long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 L?? ?????i H??nh, ph?????ng 15, Qu???n 11, H??? Ch?? Minh, Vi???t Nam')
        {
            var geoMap = '';
            geoMap = $("#address").val().trim() + ', ' + $('#wardId :selected').text() + ', ' + $('#district :selected').text() + ', H??? Ch?? Minh, Vi???t Nam';
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

        postData.latitude = latitude;
        postData.longitude = longitude;
        postData.addressPlace = addressDone;
        //

        delete postData.name;
        delete postData.phone;
        delete postData.email;
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
        
        
        App.Feature.Post("/api/service", postData, function (response) {
            if (response.result == "1001") {
                error_message("B???n nh???p sai captcha!");
            }
            else if (response.result) {
                $(".form-new-services input[type=text]").val('');
                $(".form-new-services input[type=email]").val('');
                $(".form-new-services option:selected").prop('selected', false);
                $("#wardId").prepend('<option value="" selected></option>');
                curForm.data('bootstrapValidator').resetForm();
                $('.ajax-file-upload-container-drawing').html('');
                App.UI.Done("C???m ??n anh/ch??? ???? ????ng k?? s??? d???ng d???ch v??? B???t ?????ng s???n Propzy. \n Trong v??ng 24 gi??? l??m vi???c Chuy??n vi??n h??? tr??? d???ch v??? Propzy s??? li??n h??? anh/ch??? ????? x??c nh???n nhu c???u. \n Tr??n tr???ng, Propzy");
            }
        });
        return false;
    });

    checkHash();

    $(".link-left.for-pc-he a").removeClass("active");
    $(".for-new-project").addClass("active");
    $(".title-services").click(function(){
        $(".tab-menu li").removeClass("active");
    });


    $(".btn-register").click(function () {
        var curForm = $(this).closest(".form-contact");
        if (!checkValidForm(curForm)) {
            return false;
        }
        parent = $(this).closest(".tab-pane");
        postData = {
            "serviceTypeId": parent.find("#serviceTypeId").val(),
            "customerInfo": {
                "name": parent.find("input[name='name']").val(),
                "phone": parent.find("input[name='phone']").val(),
                "email": parent.find("input[name='email']").val(),
                "procedureTypeId": parent.find(".procedureTypeId:checked").val()
            }
        };
        App.Feature.Post("/api/service", postData, function (response) {
            if (response.result == "1001") {
                error_message("B???n nh???p sai captcha!");
            }
            else if (response.result) {
                $(".form-contact input[type=text]").val('');
                $(".form-contact input[type=email]").val('');
                $(".form-contact option:selected").prop('selected', false);
                curForm.data('bootstrapValidator').resetForm();
                App.UI.Done("C???m ??n anh/ch??? ???? ????ng k?? s??? d???ng d???ch v??? B???t ?????ng s???n Propzy. \n Trong v??ng 24 gi??? l??m vi???c Chuy??n vi??n h??? tr??? d???ch v??? Propzy s??? li??n h??? anh/ch??? ????? x??c nh???n nhu c???u. \n Tr??n tr???ng, Propzy");
            }
        });

        return false;
    });

    if($("#district").val() == "") {
        $("#wardId").attr("disabled", "disabled");
        $("#address").attr("disabled", "disabled");
    }
    
    $("#district").change(function () {
        $("#wardId").html("");
        $("#address").val("");
        if ($(this).val() == "") {
            $("#wardId").attr("disabled", "disabled");
            $("#address").attr("disabled", "disabled");
            return;
        }
        else{
            $("#wardId").prop("disabled", false);
            $("#address").prop("disabled", false);
        }
        $.get("/api/get-wards-by-district/" + $(this).val(), function (data) {
            $(data).each(function (idx, ward) {
                $("#wardId").append('<option value="' + ward.wardId + '">' + ward.wardName + '</option>');
            });
            $("#wardId").prop("disabled", false);
            $("#address").prop("disabled", false);
        });

    });
    $('#carousel').carousel("pause");
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        $("#carousel").carousel(parseInt($(this).attr("banner"))).carousel("pause");
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