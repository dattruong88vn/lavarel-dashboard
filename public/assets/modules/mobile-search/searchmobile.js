var heightMore = 190;
var markerPositions;
var drawing_poply = false;
var enable_draw = false;
var mode_draw = false;
var list_latLng_draw = [];
var data_send = {};

var allowLoadMarkers = true;
var isFirstTimeLoad = true;
var first_center_marker = false;

var startApp = function () {
    $(".btn-toggle-map").each(function(key,val){
        if($(this).data('remote')=='max-map'){
            if($(this).hasClass('active')){
                showMapView();
                $('#hotline').hide();
            }else{
                showListView();
                $('#hotline').show();
            }
        }
    });
    function init() {
        initEvent();
        App.Feature.loadScripts([
            "https://maps.googleapis.com/maps/api/js?libraries=places&language=vi-VN&key="+keysGoogle,
            "/assets/js/gmap3.min.js"
        ], function () {
            initilizeMap();
        });

        $("#sortWay").click(function(){
            $("#sort").modal();
        });
    }
    function converData2MakerModel(listings, pins) {
        marker_pos = [];
        var bounds = new google.maps.LatLngBounds();
        $(listings).each(function (idx, element) {
            bounds.extend(new google.maps.LatLng(element.latitude, element.longitude));
            marker_pos.push({
                latLng: [element.latitude, element.longitude],
                listingId: element.listingId,
                data: element,
                options: getOptionOverlayLevel(element)
            });
        });
        //
        $(pins).each(function (idx, element) {
            bounds.extend(new google.maps.LatLng(element.latitude, element.longitude));
            marker_pos.push({
                latLng: [element.latitude, element.longitude],
                tcId: element.tcId,
                data: element,
                options: getOptionOverlayLevel(element)
            });
        });
        if (isFirstTimeLoad) {
            var map = $("#map-canvas").gmap3("get");
            map.fitBounds(bounds);
            first_center_marker = bounds.getCenter();
        }
        return marker_pos;
    };
    function drawBounds() {
        $("#map-canvas").gmap3({
            kmllayer: {
                options: {
                    url: "https://cdn.propzy.vn/kmz/" + boundName + ".kmz?v=20.12.2018",
                    opts: {
                        suppressInfoWindows: true,
                        preserveViewport: true,
                        clickable: false

                    }
                }
            }
        });
    };
    function reloadOperation() {
        /* Set compare */
        $('.bl-listing .bl-compare').on('click', function (e) {
            if($(this).hasClass("active"))
                return false;
            e.preventDefault();
            Compare.Add(this);
            return false;
        });

        /* Set cart */
        $(document).on('click','.save-listing',function (e) {
            e.preventDefault();
            var removeCart = Cart.removeFavListing(parseInt($(this).attr("listingid")),this);
            if(!removeCart)
                !isLogin ? addcart(this) : addCollection(this);
        });
    };
    function setZomeFirst(map) {
        if(first_center_marker) {
            map.setCenter(first_center_marker);
            map.setZoom(zoneDefault);
        }
    };
    function getOptionOverlayLevel(element) {
        var option = {};
        if (markers['level'] < 3 && !mode_draw && !element.tcId) {
            var classBig = "big";
            if (element.numRecord > 9)
                classBig = "big-0";
            if (element.numRecord > 99)
                classBig = "big-1";
            if (element.numRecord > 999)
                classBig = "big-2";
            if (element.numRecord > 9999)
                classBig = "big-3";
            if (element.numRecord > 99999)
                classBig = "big-4";
            option.content = '<div class="pin-overlay overlay-item ' + classBig + '">' + element.numRecord + '</div>';
            option.offset = {x: -12.5 , y:-25};
        } else {
            if(element.listGroupBy!=null && element.listGroupBy.length!=0){
                option.content = '<div class="pin-group-overlay house-overlay-item">' + element.listGroupBy.length + ' căn hộ</div>';
            }else{
                if(listingTypeId == 2 && propertyTypeId == 1){
                    var classBig = "big-0";
                    if (element.numRecord > 99)
                        classBig = "big-1";
                    if (element.numRecord > 999)
                        classBig = "big-2";
                    if (element.numRecord > 9999)
                        classBig = "big-3";
                    if (element.numRecord > 99999)
                        classBig = "big-4";
                    option.content = '<div class="pin-overlay overlay-item ' + classBig + '">' + element.numRecord + '</div>';
                    option.offset = {x: -20 , y:-42};
                } else {
                    var price = element.formatPrice;
                    option.content = '<div class="pin-overlay house-overlay-item">' + price + '</div>';
                }
            }
            option.offset = {x: -30 , y: -32};
        }
        if(markers['level'] <= 3 && element.tcId){
            var classBig = "big-0";
            if (element.numRecord > 99)
                classBig = "big-1";
            if (element.numRecord > 999)
                classBig = "big-2";
            if (element.numRecord > 9999)
                classBig = "big-3";
            if (element.numRecord > 99999)
                classBig = "big-4";
            option.content = '<img title="'+ element.name +'" class="pin-tc" src="/assets/images/icons/icon-tc.png"/>';
            option.offset = {x: -20 , y:-42};
        }
        if (markers['level'] == 2 && !element.tcId)
            option.title = element.wardName;
        else if (markers['level'] == 1 && !element.tcId) {
            option.title = element.districtName;
        } else if(element.tcId) {
            option.title = element.name;
        }
        return option;
    };
    function loadMarkersIntoMap(overlays) {
        $("#map-canvas").gmap3({
            clear: {
                name: ["overlay"]
            }
        });
        $("#map-canvas").gmap3({
            overlay: {
                values: overlays,
                options: {
                    offset: {
                        y: -32,
                        x: 12
                    }
                },
                events: {
                    mouseover: function (overlay, event, context) {
                        if ($(event[0].target).hasClass("pin-overlay"))
                            updateOverlayDisplay(true, $(event[0].target));
                        if (context.data.numRecord) {
                            var title = context.data.districtName;
                            var address = '';
                            if (markers['level'] == 2 || markers['level'] == 3)
                                title = context.data.wardName;
                            if(listingTypeId == 2 && propertyTypeId == 1){
                                title = context.data.title;
                                address = context.data.address;
                            }
                            var content = "<div class='infowindow'><b>" + context.data.numRecord +" "+ $("#select-property option:selected").text().toLowerCase()+"</b> "+dialogWindowsType+" tại <b>" + title + "</b></br>"+ address +"</div>";
                            setWindowInfoContentOverise(this, overlay, content, function () {
                                App.Feature.setCookie("pinClosed", true);
                            });
                        }
                        if(context.data.tcId){
                            var title = context.data.fullName;
                            var content = '<div class="infowindow">'+ context.data.fullName +'</div>';
                            setWindowInfoContentOverise(this, overlay, content, function () {
                                App.Feature.setCookie("pinClosed", true);
                            });
                        }
                        if (!context.data.numRecord && markers['level'] == 3) {
                            var ids = [context.data.rlistingId];
                            /* showWindowInfoWithPopup(this, overlay, ids); */
                        }
                    },
                    mouseout: function (overlay, event, context) {
                        updateOverlayDisplay(false, $(event[0].target));
                        var infowindow = $(this).gmap3({get: {name: "infowindow"}});
                        if (infowindow) {
                            /* infowindow.close(); */
                        }
                    },
                    click: function (overlay, event, context) {
                        var target = event[0].target;
                        if($(target).hasClass("pin-tc")){
                            return;
                        }
                        $(".house-overlay-item").removeClass('active');
                        var ids = [context.data];
                        $('#btn-maps-mobile').hide();
                        $('.bl-menu-bottom').hide();
                        if (context.data.numRecord) {
                            // propertyTypeId : 1: chung cư căn hộ - 2: nhà riêng
                            if(listingTypeId == 2 && propertyTypeId == 1){
                                // sẽ hiển thị block detail của ccch
                                if(context.data.numRecord !== 0){
                                    /* Group buildding */
                                    var self = $(event[0].target);
                                    if(self.parents(".popover").first().length==0 && (typeof self.attr('aria-describedby') =='undefined' || typeof self.attr('aria-describedby') =='string')) {
                                        /* Normal listting */
                                        self.addClass('active');
                                        $.ajax({
                                            url: '/api/get-listing-block',
                                            type: "post",
                                            data: JSON.stringify(ids),
                                            beforeSend: function () {

                                            },
                                            cache:true
                                        }).success(function (data) {
                                            if (data) {
                                                //update html, data trong map-listing-detail
                                                $('#map-listing-detail').html('');
                                                $('#map-listing-detail').html(data);
                                                //
                                                $('#map-canvas').height("calc(60vh - 135px)");
                                                $('#map-listing-detail').show();
                                                //
                                            }
                                        }).fail(function (jqXHR, ajaxOptions, thrownError) {
                                        });
                                    }
                                    //
                                    $(".hide-view").click(function () {
                                        $("#map-canvas").css({height:'calc(100vh - 200px)'});
                                        $(".bl-search-building").fadeOut(1000);
                                    });
                                }else{
                                    if(!context.data.tcId)
                                        location.href= App.Feature.renderLinkListingApartment(context.data);
                                }
                            } else {
                                if(markers['level'] < 3){
                                    /* Trường hợp có Pin con */
                                    originalLat = context.data.latitude;
                                    originalLng = context.data.longitude;
                                    var cityId = context.data.cityId;
                                    var districtId = context.data.districtId;
                                    var wardId = context.data.wardId;

                                    App.Feature.Get("/api/get-slug/" + propertyTypeId + "/" + cityId + "/" + districtId + "/" + wardId, function (response) {
                                        if (response.result) {
                                            renderParams();
                                            if($.query.toString() !== '')
                                                location = slugListingType + response.slug + $.query.toString() + '&src=location_map';
                                            else
                                                location = slugListingType + response.slug + $.query.toString() + '?src=location_map';
                                        }
                                    },true);
                                    return true;
                                }
                            }
                        } else { /* Trường hợp không có pin con*/
                            //console.log('ko có pin con');
                            if(context.data.rlistingId){
                                var self = $(event[0].target);
                                if(self.parents(".popover").first().length==0 && (typeof self.attr('aria-describedby') =='undefined' || typeof self.attr('aria-describedby') =='string')) {
                                    /* Normal listting */
                                    self.addClass('active');
                                    $.ajax({
                                        url: '/api/get-listing-block',
                                        type: "post",
                                        data: JSON.stringify(ids),
                                        beforeSend: function () {

                                        },
                                        cache:true
                                    }).success(function (data) {
                                        if (data) {
                                            //update html, data trong map-listing-detail
                                            $('#map-listing-detail').html('');
                                            $('#map-listing-detail').html(data);
                                            //
                                            $('#map-canvas').height("calc(60vh - 135px)");
                                            $('#map-listing-detail').show();
                                            //
                                            $("#map-container .save-listing").unbind("click").click(function (e) {
                                                e.preventDefault();
                                                var listingId = parseInt($(this).attr("listingid"));
                                                var removeCart = Cart.removeFavListing(listingId, this);
                                                if (!removeCart) {
                                                    !isLogin ? addcart(this) : Mycollection.addCollection(listingId);
                                                }
                                            });
                                            $(".bl-compare").click(function (e) {
                                                e.preventDefault();
                                                if ($(this).hasClass("active")) {
                                                    if (Compare.getCompare().length >= 0) {
                                                        var idDelete = parseInt($(this).data("id"));
                                                        if (idDelete) {
                                                            Compare.removeItemCompare(idDelete);
                                                            $.each($(".bl-compare"), function (key, item) {
                                                                if ($(item).data("id") == idDelete) {
                                                                    $(item).removeClass("active");
                                                                }
                                                            });
                                                        }
                                                    }
                                                } else {
                                                    e.preventDefault();
                                                    Compare.Add(this);
                                                }
                                                return false;
                                            });
                                        }
                                    }).fail(function (jqXHR, ajaxOptions, thrownError) {
                                    });
                                }
                            }
                        }
                        /*
                        if(context.data.tcId){
                            $('.tooltip.fade.top.in').remove();
                            var content = '<div class="infowindow">'+ context.data.fullName + '<p style="text-align:center;"> '+ context.data.address +'</p> </div>';
                            if($(event[0].target).hasClass('pin-tc')){
                                $(event[0].target.parentElement).tooltip({
                                    title: content,
                                    html:true
                                }).tooltip("show");
                            }
                        }
                        */
                        google.maps.event.trigger(overlay, "focusout");
                    }
                }
            }

        });
    };
    function initilizeMap() {
        var height = $("#bl-listing-container").height();
        if ($("#map-container").height() > height) {
            $("#map-container").height(height);
        }
        $("#map-canvas").gmap3({
            map: {
                options: {
                    panControl: false,
                    zoomControl: false,
                    mapTypeId: "move_poi",
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    fullscreenControl: false,
                    scrollwheel: true,
                    disableDoubleClickZoom: true,
                    center: centerDefault,
                    zoom: zoneDefault,
                    gestureHandling: 'greedy'
                },
                events: {
                    idle: function () {
                        if(enable_draw) {
                            if($(this).gmap3('get').getZoom() <= zoneDefault) {
                                setZomeFirst($(this).gmap3('get'));
                            }
                        }
                        if(!mode_draw){
                            if (allowLoadMarkers && markers.data && markers.data.length > 0) {
                                markerPositions = converData2MakerModel(markers.data, pins.data);
                                loadMarkersIntoMap(markerPositions);
                                allowLoadMarkers = false;
                            } else {
                                markerPositions = converData2MakerModel(markers.data, pins.data);
                                loadMarkersIntoMap(markerPositions);
                                allowLoadMarkers = false;
                            }
                            if (isFirstTimeLoad) {
                                isFirstTimeLoad = false;
                                drawBounds();
                            }
                        }
                    },
                    zoom_changed: function () {
                        $('.tooltip.fade.top.in').remove();
                        if (!mode_draw && !drawing_poply && !$('#draw-allow').hasClass('active')){
                            allowLoadMarkers = true;
                        }
                    },
                    mousedown: function (map) {
                        $('.tooltip.fade.top.in').remove();
                        if (enable_draw) {
                            drawing_poply = true;
                        }
                    },
                    mouseup: function (map) {
                        if (list_latLng_draw.length != 0) {
                            $("#map-canvas").gmap3({
                                clear: {
                                    name: ["polyline"]
                                },
                                polygon: {
                                    options: {
                                        strokeColor: "#0d5a94",
                                        strokeOpacity: 1.0,
                                        strokeWeight: 3,
                                        paths: list_latLng_draw,
                                        clickable: false,
                                        fillOpacity: 0.1
                                    }
                                }
                            });
                        }
                        if (enable_draw) {
                            drawing_poply = false;
                            $('#draw-allow').trigger('click');
                            /* Xử lý dữ liệu */
                            if (list_latLng_draw.length != 0 && !options.length) {
                                options.locations = list_latLng_draw;
                                data_send.options = options;
                                data_send.current_page = 1;
                                data_send.sort = $("#sort").val();
                                /* console.log(data_send); */
                                App.Feature.Post('/api/draw-search', data_send, function (response) {
                                    if (response.result) {
                                        if (response.data.totalProperties == 0)
                                            loaded = 0;
                                        else
                                            loaded = 1;
                                        /* load listing on map */
                                        markerPositions = converData2MakerModel(response.data.list, pins.data);
                                        loadMarkersIntoMap(markerPositions);
                                        allowLoadMarkers = false;
                                        /* Update page */
                                        $(".p-result span").text(response.data.totalProperties);
                                        $(".bl-result h1").text("Bất động sản vùng chọn");
                                        $(".p-path li:last strong").text("vùng chọn");
                                        $(".inner-block-listing .row").html(response.data.html_listing);
                                        page_draw = 2;
                                        $(".view-more").remove();
                                        reloadOperation();
                                        $("#map-container .gm-style>div").css({'cursor': 'url(https://maps.gstatic.com/mapfiles/openhand_8_8.cur), default'});
                                    }
                                    else {
                                        App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
                                    }
                                },{
                                    text:'Đang tải BĐS...'
                                });
                            } else {
                                App.UI.Error("Không có dữ liệu để truy vấn dữ liệu");
                            }
                            /* Reset data emptry */
                            list_latLng_draw = [];
                        }
                    },
                    mousemove: function (map, event, content) {
                        if (enable_draw && drawing_poply && $('#draw-allow').hasClass('active')) {
                            /* console.log('[' + event.latLng.lat() + ',' + event.latLng.lng() + "]"); */
                            list_latLng_draw.push([event.latLng.lat(), event.latLng.lng()]);
                            $("#map-canvas").gmap3({
                                clear: {
                                    name: ["overlay", 'kmllayer', 'polygon']
                                },
                                polyline: {
                                    options: {
                                        strokeColor: "#0d5a94",
                                        strokeOpacity: 1.0,
                                        strokeWeight: 3,
                                        path: list_latLng_draw,
                                        clickable: false
                                    }
                                }
                            });
                        }
                    }
                },
                callback: function () {
                    //$(this).gmap3('get').setCenter(result[0].geometry.location);
                    var map_custom = $(this).gmap3('get');
                    var centerControlDiv = document.createElement('div');
                    var draw_allow = $("<div id='draw-allow' class='draw-allow' title='Khoanh vùng bản đồ để lọc BĐS'>");
                    draw_allow.text("Chọn vùng");
                    var draw_allow_repeat = $("<div id='draw-allow-repeat' class='draw-allow-repeat'>");
                    draw_allow_repeat.text("Tắt chế độ vẽ");
                    var back_container = document.createElement('div');
                    var back_listing = $("<div id='back-listing' class='back-listing'>");
                    back_listing.text("Xem danh sách");

                    centerControlDiv.appendChild(draw_allow.get(0));
                    centerControlDiv.appendChild(draw_allow_repeat.get(0));
                    back_container.appendChild(back_listing.get(0));
                    back_listing.click(function () {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                            $("#back-listing").removeClass('active');
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                            $("#back-listing").removeClass('active');
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                            $("#back-listing").removeClass('active');
                        }
                    });
                    draw_allow_repeat.click(function () {
                        location.reload();
                    });
                    draw_allow.click(function () {
                        if (!$(this).hasClass('enable_draw')) {
                            $(this).addClass('enable_draw');
                            $("#draw-allow-repeat").addClass('enable_draw');
                        }
                        if (!$(this).hasClass('active')) {
                            $('.btn-draw').addClass('active');
                            $(this).addClass('active');
                            $('.btn-draw').text('Hủy');
                            enable_draw = true;
                            mode_draw = true;
                            $("#map-container .gm-style>div").css({'cursor': 'crosshair'});
                            $("#map-canvas").gmap3({
                                clear: {
                                    name: ["overlay", 'kmllayer', 'polyline', 'polygon']
                                },
                                map: {
                                    options: {
                                        draggable: false
                                    }
                                }
                            });
                            $("#draw-allow-repeat").show();
                            if(map_custom.getZoom() <= zoneDefault) {
                                setZomeFirst(map_custom);
                            }
                        } else {
                            $(this).removeClass('active');
                            $('.btn-draw').removeClass('active');
                            $('.btn-draw').text('Vẽ');
                            enable_draw = false;
                            $("#map-canvas").gmap3({
                                map: {
                                    options: {
                                        draggable: true
                                    }
                                }
                            });
                            //$("#draw-allow-repeat").hide();
                            $("#map-container .gm-style>div").css({'cursor': 'url(https://maps.gstatic.com/mapfiles/openhand_8_8.cur), default'});
                        }
                    });
                    centerControlDiv.index = 1;
                    back_container.index = 1;
                    map_custom.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
                    map_custom.controls[google.maps.ControlPosition.TOP_CENTER].push(back_container);
                    //google.maps.event.addDomListener(control, 'click', options.action);
                    $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function () {
                        var isFullScreen = document.fullScreen ||
                            document.mozFullScreen ||
                            document.webkitIsFullScreen;
                        if (isFullScreen) {
                            $("#back-listing").addClass('active');
                        } else {
                            $("#back-listing").removeClass('active');
                        }
                    });
                }
            },
            styledmaptype: {
                id: "move_poi",
                options: {
                    name: "Xóa các địa điểm"
                },
                styles: [
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#ffffff"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 100
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ]
            }
        });
        setTimeout(function () {
            $("#map-canvas").gmap3('get').setZoom(zoneDefault);
        },500);
        $('#map-container').bind('mousewheel DOMMouseScroll', function (e) {
            e.preventDefault();
            return false;
        });
    };
    function initEvent(){
        $('.close-app-diy').click(function (){
            $('#app-diy').hide();
            $('#bl-header-mobile').removeClass('bl-header');
            $('#bl-header-mobile').addClass('bl-header-remove');
        });
        $("input[name='sort']").change(function () {
            var value = $(this).val();
            if (value > 0) {
                window.location.search = $.query.set("sapxep", value);
            } else {
                $.query.remove("sapxep");
            }
        });
        $("b#sortWay").click(function(){
            $("#sort").modal();
        });
        $('.readmore-block').readmore({
            speed: 1000,
            collapsedHeight: 90,
            moreLink: '<a class="readmore-detail show-readmore" href="#"><div class="show-content">Xem thêm</div></a>',
            lessLink: '<a class="readmore-detail hide-readmore" href="#"><div class="hide-content">Thu gọn</div></a>',
            blockCSS: 'display: block;position: relative;'
        });
        var topscroll = 0;
        $('body').on('scroll', function(e) {
            topscroll = $(this).scrollTop();
            App.Feature.setCookie("topscroll", topscroll);
        });
        topscroll = App.Feature.getCookie("topscroll");
        if (topscroll > 0) {
            var from_detail = App.Feature.getCookie("from_detail");
            var current_url = window.location.href;
            var path_search = App.Feature.getCookie("path_search");
            if(from_detail == 1 && (path_search == current_url)){
                $('html, body').animate({scrollTop: topscroll+'px'}, 100);
                //App.Feature.setCookie("topscroll", 0);
                App.Feature.setCookie("from_detail", 0);
                App.Feature.setCookie("path_search", '');
            } else {
                App.Feature.setCookie("topscroll", 0);
                App.Feature.setCookie("from_detail", 0);
                App.Feature.setCookie("path_search", '');
            }
        }
        
        /* Controll map and list */
        $(".btn-toggle-map").click(function () {
            $(".btn-toggle-map").removeClass('active');
            $(".btn-location").removeClass('active');
            $(this).addClass('active');

            if($(this).data('remote')=='max-map'){
                $(".search-results").removeClass("list-view");
                $(".search-results").addClass("map-view");
                $(".bl-result-search").hide();
                $(".bl-list-result").hide();
                $(".bl-footer").hide();
                $(".bl-footer-top").hide();
                $(".map-wrapper").show();
                $("#map-canvas").show();
                $(".bl-menu-bottom").hide();
                $('.bl-download-app').hide();
                App.Feature.setCookie('control_search_moblie','map');
                $('#sortWay').hide();
                $('#hotline').hide();
            } else {
                $(".search-results").removeClass("map-view");
                $(".search-results").addClass("list-view");
                $(".bl-result-search").show();
                $(".bl-list-result").show();
                $(".bl-footer").show();
                $(".bl-footer-top").show();
                $(".map-wrapper").hide();
                $("#map-canvas").hide();
                $(".bl-menu-bottom").hide();
                $('.bl-download-app').show();
                App.Feature.setCookie('control_search_moblie','list');
                $('#sortWay').show();
                $('#hotline').show();
            }
        });
        //
        $(document).on('click', '#map-listing-detail .btn-down', function(e){
            e.preventDefault();
            $('#map-canvas').height("calc(122vh - 200px)");
            $('#map-listing-detail').hide();
            $('#btn-maps-mobile').show();
            //$('.bl-menu-bottom').show();
        });
        //
        $('.btn-location').click(function(){
            $(this).addClass('active');
            getUserLocation(function(position){
                console.log(position);
                $("#map-canvas").gmap3({
                    map: {
                        options: {
                            center: [position.lat, position.lng],
                            zoom: 16
                        }
                    }
                });
            });
        });
        //
        $('.btn-draw').click(function(){
            $('#draw-allow').trigger('click');
            //$(this).text('Vẽ lại');
        });
    };
    /* Khởi Tạo */
    init();
    $.each($('.bl-pagination a'),function(key, val){
        var href = $.query.remove("src").toString();
        var pathName = $(this).attr('href').split('?')[0];
        $(this).attr('href', pathName+href);
    });
};

$(document).ready(function(){
    setTimeout(function(){
        $('.readmore-block').readmore({
            speed: 1000,
            collapsedHeight: heightMore,
            moreLink: '<a class="readmore-detail show-readmore" href="#"><div class="show-content">Xem thêm</div></a>',
            lessLink: '<a class="readmore-detail hide-readmore" href="#"><div class="hide-content">Thu gọn</div></a>',
            blockCSS: 'display: block;position: relative;'
        });
    }, 2000);
    search_bar();
});

var showMapView = function(){
    $('#sortWay').hide();
    $(".bl-result-search").hide();
    $(".search-results").addClass("map-view");
    $(".search-results").removeClass("list-view");
};

var showListView = function(){
    $(".bl-result-search").show();
    $(".search-results").removeClass("map-view");
    $(".search-results").addClass("list-view");
    if(listingTypeId != 2) {
        showGuideFilterHome.runSlide();
    }
};

var showGuideFilterSearch = {
    timeShow: 500,
    elementParent: "#guideFilterSearch",
    guide: function(element) {
        let that = this;
        $(that.elementParent + " " + element).fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .step").fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .step img").fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .lineStep").fadeIn(that.timeShow + 500);
        $(that.elementParent + " " + element + " .lineStep").height(10);
        setInterval(function() { 
            let heightCurrent = $(that.elementParent + " " + element + " .lineStep").height();
            if(heightCurrent <= 100) {
                $(that.elementParent + " " + element + " .lineStep").css("height", heightCurrent + 20);
            }
        }, 300);
        $(that.elementParent + " " + element + " .point").delay(that.timeShow + 1500).fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .title").delay(that.timeShow + 1500).fadeIn(that.timeShow + 2000);
    },
    runSlide: function () {
        let that = this;
        if (!App.Feature.getCookie("GuideFilterSearch")) {
            $("#guideFilterSearch, #guideFilterSearch #guideStep1 *, #guideFilterSearch #guideStep2 *").css("display", "none");
            $(that.elementParent).fadeIn(that.timeShow).delay(that.timeShow + 8000).fadeOut(that.timeShow);
            let posType = $("#form-search-buy #status_listing").position();
            let posCity = $("#form-search-buy #select-ward").position();        
            $("#guideStep1").css({"top": posType.top});
            $("#guideStep2").css({"top": posCity.top});
            that.guide("#guideStep1");
            setTimeout(function () {
                $("#guideStep1").fadeOut(1000);
                that.guide("#guideStep2");
            }, that.timeShow + 4000);
            $("#guideStep2").fadeOut(4000);
            App.Feature.setCookie("GuideFilterSearch", 1);
        }
    }
};

var showGuideFilterHome = {
    timeShow: 500,
    elementParent: "#guideFilterHome",
    guide: function(element) {
        let that = this;
        $(that.elementParent + " " + element).fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .step").fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .step img").fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .lineStepHeight").fadeIn(that.timeShow + 500);
        $(that.elementParent + " " + element + " .lineStepHeight").height(10);
        $(that.elementParent + " " + element + " .lineStep").delay(500).fadeIn(that.timeShow + 500);
        $(that.elementParent + " " + element + " .lineStep").width(10);
        setInterval(function() { 
            let heightCurrent = $(that.elementParent + " " + element + " .lineStepHeight").height();
            let widthCurrent = $(that.elementParent + " " + element + " .lineStep").width();
            if(element != "#guideHome4" && widthCurrent <= 100) {
                $(that.elementParent + " " + element + " .lineStep").css("width", widthCurrent + 20);
                $(that.elementParent + " " + element + " .lineStep").css("left", -(widthCurrent + 20));
                $(that.elementParent + " " + element + " .point").css("left", -(widthCurrent + 30)).delay(that.timeShow + 1000).fadeIn(that.timeShow);
                $(that.elementParent + " " + element + " .title").css("left", -(widthCurrent + 100)).delay(that.timeShow + 1000).fadeIn(that.timeShow + 2000);
            }
            if(element == "#guideHome4" && widthCurrent <= (screen.width == 414 ? 120 : 90)) {
                $(that.elementParent + " " + element + " .lineStep").css("width", widthCurrent + 20);
                $(that.elementParent + " " + element + " .point").css("left", widthCurrent + 60).delay(that.timeShow + 1000).fadeIn(that.timeShow);
                $(that.elementParent + " " + element + " .title").css("left", widthCurrent + 20).delay(that.timeShow + 1000).fadeIn(that.timeShow + 2000);
            }
            if(element == "#guideHome4" && heightCurrent <= 50) {
                $(that.elementParent + " " + element + " .lineStepHeight").css("height", heightCurrent + 20);
            }
        }, 300);
    },
    runSlide: function () {
        let that = this;
        if (!App.Feature.getCookie("GuideFilterHome")) {
            $("#guideFilterHome, #guideFilterHome #guideHome1 *, #guideFilterHome #guideHome2 *, #guideFilterHome #guideHome3 *, #guideFilterHome #guideHome4 *").css("display", "none");
            $(that.elementParent).fadeIn(that.timeShow).delay(that.timeShow + 12000).fadeOut(that.timeShow);
            let heightHeaderMobile = $("#bl-header-mobile").height();
            let heightDownloadApp = 0;
            let posHome1 = $("#filterWay").position();
            let posHome2 = $("#sortWay").position();
            let posHome3 = $(".bl-list-result .bl-listing-mobile:nth-child(1)").position();
            if($(".bl-download-app").is(":visible"))
            {
                heightDownloadApp = $(".bl-download-app").height() + 14;
            }
            $("#guideHome1").css({"top": posHome1.top + heightHeaderMobile + heightDownloadApp + 20, "left": posHome1.left});
            $("#guideHome2").css({"top": posHome2.top, "left": posHome2.left + 36});
            $("#guideHome3").css({"top": posHome3.top - 10, "left": posHome2.left + 36});
            $("#guideHome4").css({"top": posHome3.top + 106});
            that.guide("#guideHome1");
            setTimeout(function () {
                $("#guideHome1").fadeOut(1000);
                that.guide("#guideHome2");
            }, that.timeShow + 4000);
            setTimeout(function () {
                $("#guideHome2").fadeOut(1000);
                that.guide("#guideHome3");
            }, that.timeShow + 8000);
            $("#guideHome3").fadeOut(8000);
            // setTimeout(function () {
            //     that.guide("#guideHome4");
            // }, that.timeShow + 12000);
            App.Feature.setCookie("GuideFilterHome", 1);
        }
    }
};

var showGuideFilterMap = {
    timeShow: 500,
    elementParent: "#guideFilterMap",
    guide: function(element) {
        let that = this;
        $(that.elementParent + " " + element).fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .step").fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .step img").fadeIn(that.timeShow);
        $(that.elementParent + " " + element + " .lineStep").delay(500).fadeIn(that.timeShow + 500);
        $(that.elementParent + " " + element + " .lineStep").width(10);
        setInterval(function() { 
            let widthCurrent = $(that.elementParent + " " + element + " .lineStep").width();
            if(widthCurrent <= 100) {
                $(that.elementParent + " " + element + " .lineStep").css("width", widthCurrent + 20);
                $(that.elementParent + " " + element + " .lineStep").css("left", -(widthCurrent + 20));
                $(that.elementParent + " " + element + " .point").css("left", -(widthCurrent + 30)).delay(that.timeShow + 1000).fadeIn(that.timeShow);
                $(that.elementParent + " " + element + " .title").css("left", -(widthCurrent + 100)).delay(that.timeShow + 1000).fadeIn(that.timeShow + 2000);
            }
        }, 300);
    },
    runSlide: function () {
        let that = this;
        if (!App.Feature.getCookie("GuideFilterMap")) {
            $("#guideFilterMap, #guideFilterMap #guideMap1 *, #guideFilterMap #guideMap2 *").css("display", "none");
            $(that.elementParent).fadeIn(that.timeShow).delay(that.timeShow + 8000).fadeOut(that.timeShow);
            let pos = $("#btn-maps-mobile").position();
            let posPost = $("#btn-maps-mobile .btn-posted").position();
            let posSelect = $("#btn-maps-mobile .btn-select").position();
            $("#guideMap1").css({"top": pos.top + posPost.top, "left": pos.left});
            $("#guideMap2").css({"top": pos.top + posSelect.top, "left": pos.left});
            that.guide("#guideMap1");
            setTimeout(function () {
                $("#guideMap1").fadeOut(1000);
                that.guide("#guideMap2");
            }, that.timeShow + 4000);
            $("#guideMap2").fadeOut(4000);
            App.Feature.setCookie("GuideFilterMap", 1);
        }
    }
};

$(document).on('click', '.btn-map', function(e){
    e.preventDefault();
    showGuideFilterMap.runSlide();
});
$(document).on('click', '#filterWay', function(e){
    e.preventDefault();
    showGuideFilterSearch.runSlide();
});
$(document).on('click', '#btn-maps-mobile .btn-posted', function(e){
    e.preventDefault();
    showGuideFilterHome.runSlide();
});
