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
        message: "Giá trị chưa đúng",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            name: {validators: {notEmpty: {message: "Vui lòng nhập Họ và Tên"}}},
            email: {validators: {emailAddress: {message: "Vui lòng nhập địa chỉ email hợp lệ"}}},
            phone: {
                validators: {
                    stringLength: {message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10},
                    notEmpty: {message: "Vui lòng nhập số điện thoại"}
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
            message: "Giá trị chưa đúng",
            excluded: [":hidden"],
            feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                name: {validators: {notEmpty: {message: "Vui lòng nhập Họ và Tên"}}},
                email: {validators: {emailAddress: {message: "Vui lòng nhập địa chỉ email hợp lệ"}}},
                phone: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập số điện thoại"},
                        digits: {message: "Số điện thoại phải là số"}
                    }
                },
                cityId: {validators: {notEmpty: {message: "Vui lòng chọn Tỉnh/Thành"}}},
                districtId: {validators: {notEmpty: {message: "Vui lòng chọn Quận/Huyện"}}},
                street: {validators: {notEmpty: {message: "Vui lòng nhập tên đường"}}},
                address: {validators: {notEmpty: {message: "Vui lòng nhập địa chỉ"}}},
                propertyTypeId: {validators: {notEmpty: {message: "Vui lòng chọn Loại hình BĐS"}}},
                propertyPosition: {validators: {notEmpty: {message: "Vui lòng chọn vị trí BĐS"}}},
                addressPlace: {validators: {notEmpty: {message: "Vui lòng nhập địa chỉ thửa đất"}}},
                length: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập chiều dài"},
                        numeric: {message: "Vui lòng nhập số", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                width: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập chiều rộng"},
                        numeric: {message: "Vui lòng nhập số", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                lotSize: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập diện tích đất"},
                        numeric: {message: "Vui lòng nhập số", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                buildingArea: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập diện tích sử dụng"},
                        numeric: {message: "Vui lòng nhập số", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                floorSize: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập diện tích sàn xây dựng"},
                        numeric: {message: "Vui lòng nhập số", thousandsSeparator: ".", decimalSeparator: ",", separator: ","}
                    }
                },
                duration: {validators: {notEmpty: {message: "Vui lòng nhập thời hạn sử dụng"}}},
                yearBuilt: {validators: {notEmpty: {message: "Vui lòng nhập năm xây dựng"}, digits: {message: "Vui lòng nhập số"}}},
                directionId: {validators: {notEmpty: {message: "Vui lòng chọn hướng"}}},
                numberOfFloor: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập số tầng"},
                        digits: {message: "Vui lòng nhập số"}
                    }
                },
                frontAlley: {validators: {notEmpty: {message: "Vui lòng nhập giá trị"}, digits: {message: "Vui lòng nhập số"}}},
                sideAlley: {validators: {notEmpty: {message: "Vui lòng nhập giá trị"}, numeric: {message: "Vui lòng nhập số"}}},
                bedRooms: {validators: {notEmpty: {message: "Vui lòng nhập số phòng ngủ"}, digits: {message: "Vui lòng nhập số"}}},
                bathRooms: {validators: {notEmpty: {message: "Vui lòng nhập số phòng tắm"}, digits: {message: "Vui lòng nhập số"}}},
                certificate: {validators: {notEmpty: {message: "Vui lòng nhập giấy chứng nhận"}}},
                yearCertificate: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập năm cấp sổ"},
                        digits: {message: "Vui lòng nhập số"}
                    }
                },
                name: {validators: {notEmpty: {message: "Vui lòng nhập Họ và Tên"}}},
                phone: {
                    validators: {
                        notEmpty: {message: "Vui lòng nhập số điện thoại"},
                        stringLength: {message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10}
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
        var address = $("#address").val().trim();
        var ward = $('#wardId').val();
        var district = $('#district').val();
        var latitude = 10.7626639;
        var longitude = 106.6568935;
        var long = '';
        var lat = '';
        if (address !== '' && ward !== '' && district !== '') {
            var geoMap = '';
            geoMap =  $("#address").val().trim() + ', ' + $('#wardId :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
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
                        html += '<option value="">Phường/Xã</option>';
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
                        html += '<option value="">Phường/Xã</option>';
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
            App.UI.Error("Vui lòng chọn ít nhất 4 ảnh giấy tờ pháp lý");
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
        if (long == '' || lat == '' || lat == 10.7626639 || long == 106.6568935 || addressDone == '' || addressDone == '182 Lê Đại Hành, phường 15, Quận 11, Hồ Chí Minh, Việt Nam')
        {
            var geoMap = '';
            geoMap = $("#address").val().trim() + ', ' + $('#wardId :selected').text() + ', ' + $('#district :selected').text() + ', Hồ Chí Minh, Việt Nam';
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
                error_message("Bạn nhập sai captcha!");
            }
            else if (response.result) {
                $(".form-new-services input[type=text]").val('');
                $(".form-new-services input[type=email]").val('');
                $(".form-new-services option:selected").prop('selected', false);
                $("#wardId").prepend('<option value="" selected></option>');
                curForm.data('bootstrapValidator').resetForm();
                $('.ajax-file-upload-container-drawing').html('');
                App.UI.Done("Cảm ơn anh/chị đã đăng ký sử dụng dịch vụ Bất động sản Propzy. \n Trong vòng 24 giờ làm việc Chuyên viên hỗ trợ dịch vụ Propzy sẽ liên hệ anh/chị để xác nhận nhu cầu. \n Trân trọng, Propzy");
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
                error_message("Bạn nhập sai captcha!");
            }
            else if (response.result) {
                $(".form-contact input[type=text]").val('');
                $(".form-contact input[type=email]").val('');
                $(".form-contact option:selected").prop('selected', false);
                curForm.data('bootstrapValidator').resetForm();
                App.UI.Done("Cảm ơn anh/chị đã đăng ký sử dụng dịch vụ Bất động sản Propzy. \n Trong vòng 24 giờ làm việc Chuyên viên hỗ trợ dịch vụ Propzy sẽ liên hệ anh/chị để xác nhận nhu cầu. \n Trân trọng, Propzy");
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