var allowLoadMarkers = true;
var isFirstTimeLoad = true;
var first_center_marker = false;
var markerPositions;
var drawing_poply = false;
var enable_draw = false;
var mode_draw = false;
var list_latLng_draw = [];
var data_send = {};

var containerMap = $("#map-canvas");

/* set for pagination */
var page = pageCurrent + 1;
var page_draw = 2;
var page_loadding = false;
var page_limit = 3;
var default_draw_zoom = 14;

/* set last zindex overplay */
var lastZIndex = 0;
function insertParam(key,value){
    key = encodeURIComponent(key); value = encodeURIComponent(value);

    var s = document.location.search;
    var kvp = key+"="+value;

    var r = new RegExp("(&|\\?)"+key+"=[^\&]*");

    s = s.replace(r,"$1"+kvp);

    if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;};

    //again, do what you will here
    return s;
}
function getOptionOverlayLevel(element) {
    var option = {};
    if (markers['level'] < 3 && !mode_draw && !element.tcId) {
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
        if(element.listGroupBy != null && element.listGroupBy.length != 0){
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
            /* options: getOptionLevel(element)*/
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
    //
    if (isFirstTimeLoad) {
        var map = $("#map-canvas").gmap3("get");
        map.fitBounds(bounds);
        first_center_marker = bounds.getCenter();
    }
    return marker_pos;
};
function updateOverlayDisplay(isActive, overlay) {
    /* Refresh pin icon */
    if (isActive) {
        lastZIndex = $(overlay.parents().first()).css('zIndex');
        $(overlay.parents().first()).css('zIndex', 999);
        $(overlay.parents().first()).addClass("item-overlay-active");
        // marker.setIcon(createPinIcon(pinImageHover));
    } else {
        $(overlay.parents().first()).css('zIndex', 'auto');
        $(overlay.parents().first()).removeClass("item-overlay-active");
        //marker.setIcon(createPinIcon(pinImage));
    }
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
function setWindowInfoContentOverise(eventClick,html) {
    $("#container-poup .content").html(html);
    $("#container-poup").show().css({
        'top':(eventClick[0].clientY - 325),
        'left':(eventClick[0].clientX - 320/2)
    });
    $("#container-poup .close").unbind('click').click(function () {
        $("#container-poup").hide();
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
function covert2D(latLng,type){
    var convertTo = [];
    $.each(latLng,function (key,item) {
        if(type=='objectXY')
            convertTo.push({x:item[0],y:item[1]});
        else
            convertTo.push([item.x,item.y]);
    });
    return convertTo;
}
function loadMarkersIntoMap (overlays) {
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
                    $('.tooltip.fade.top.in').remove();
                    if ($(event[0].target).hasClass("pin-overlay"))
                        updateOverlayDisplay(true, $(event[0].target));
                    if (context.data.numRecord) {
                        var title = context.data.districtName;
                        var address = '';
                        if (markers['level'] == 2 || markers['level'] == 3){
                            title = context.data.wardName;
                        }
                        if(listingTypeId == 2 && propertyTypeId == 1){
                            title = context.data.title;
                            address = context.data.address;
                        }
                        var content = "<div class='infowindow'><b>" + context.data.numRecord +" "+ $(".property_type option:selected").text().toLowerCase()+"</b> "+dialogWindowsType+" tại <b>" + title + "</b></br>"+ address +"</div>";
                        if($(event[0].target).hasClass('pin-overlay')){
                            $(event[0].target).tooltip({
                                title: content,
                                html:true
                            }).tooltip("show");
                        }
                    }
                    if(context.data.tcId){
                        var title = context.data.fullName;
                        var content = '<div class="infowindow">'+ context.data.fullName + '<p style="text-align:center;"> '+ context.data.address +'</p> </div>';
                        if($(event[0].target.children).hasClass('pin-tc')){
                            $(event[0].target).tooltip({
                                title: content,
                                html:true
                            }).tooltip("show");
                        }
                    }
                    if (!context.data.numRecord && markers['level'] == 3) {
                        var ids = [context.data.rlistingId];
                        /* showWindowInfoWithPopup(this, overlay, ids); */
                    }
                },
                mouseout: function (overlay, event, context) {
                    updateOverlayDisplay(false, $(event[0].target));
                },
                click: function (overlay, event, context) {
                    var target = event[0].target;
                    if($(target).hasClass("pin-tc") || $(target).find(".pin-tc").length>0){
                        return;
                    }
                    $(".house-overlay-item").removeClass('active');
                    var ids = [context.data];
                    if (context.data.numRecord) {
                        // propertyTypeId : 1: chung cư căn hộ - 2: nhà riêng
                        if(listingTypeId == 2 && propertyTypeId == 1){
                            // tạm thời redirect wa trang /du-an
                            location.href = App.Feature.renderLinkListingApartment(context.data);
                            return false;
                            // sẽ hiển thị block detail của ccch
                            var self = $(event[0].target);
                            if(self.parents(".popover").first().length==0 && (typeof self.attr('aria-describedby') =='undefined' || typeof self.attr('aria-describedby') =='string')) {
                                if(context.data.listGroupBy!=null && context.data.listGroupBy.length!=0){
                                    console.log(context.data);
                                    /* Group buildding */
                                    var header = $('<div class="bl-table bl-title-building">');
                                    header.append('<div class="bl-inline bl-img-building"></div>');
                                    header.append('<div class="bl-inline bl-info"><p class="name-building">'+context.data.buildingName+'</p><p class="address-building">'+context.data.shortAddress+'</p></div>');
                                    var containerItemListing = $('<div class="bl-table bl-item-building slider-scroll">').css({width:350});
                                    context.data.listGroupBy.forEach(function (item,key) {
                                        var itemlisting = $('<div class="blocks-listing">');
                                        var itemA = $("<a>").addClass("item-listing").attr("href",App.Feature.renderLinkListingApartment(item)).css({'display':'inline-block'});
                                        var image = $('<div class="bl-inline bl-img-listing"><img src="'+'/assets/images/version-4/img-listing.jpg'+'"/></div>');
                                        var info = $('<div class="bl-inline bl-info">').append('<div class="bl-table bl-price"><span class="span-price">'+item.formatPrice+'</span><span class="span-acreage">'+item.formatSize+'</span></div>');
                                            info.append('<p class="address-listing">'+item.title+'</p>');
                                        itemlisting.append(itemA.append(image).append(info));
                                        containerItemListing.append(itemlisting);
                                    });

                                    self.popover('hide').popover({
                                        content: $('<div>').append(containerItemListing).html(),
                                        title:header,
                                        placement: 'bottom',
                                        html: true,
                                        template:'<div class="popover buildding_id_'+context.data.buildingId+' popover-pin-group-overlay" role="tooltip"><div class="arrow"></div><h3 class="pin-group-overlay-title popover-title"></h3><div class="popover-content"></div></div>'
                                    }).popover('show').on('shown.bs.popover',function () {
                                        $(".buildding_id_"+context.data.buildingId).find('.bl-item-building').unbind('mousewheel').bind('mousewheel', function(e){
                                            var iCurScrollPos = $(this).scrollTop(e.originalEvent.deltaY);
                                            console.log(iCurScrollPos);
                                            if(e.originalEvent.wheelDelta /120 > 0) {
                                                console.log('scrolling up !');
                                            }
                                            else{
                                                console.log('scrolling down !');
                                            }
                                        });
                                    });
                                    $(".buildding_id_"+context.data.buildingId).hover(function () {
                                        containerMap.gmap3('get').setOptions({scrollwheel: false});
                                    }).mouseleave(function () {
                                        containerMap.gmap3('get').setOptions({scrollwheel: true});
                                        self.popover('hide');
                                    });
                                }
                                else
                                {
                                    self.addClass('active');
                                    $.ajax({
                                        url: '/api/get-listing-block',
                                        type: "post",
                                        data: JSON.stringify(ids),
                                        beforeSend: function () {
                                            $(".house-overlay-item").not('.active').popover('hide');
                                        },
                                        cache:true
                                    }).success(function (data) {
                                        if (data) {
                                            self.popover({
                                                content: data,
                                                placement: 'top',
                                                html: true
                                            }).popover('show');
                                        }
                                    });
                                }
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
                                    else {
                                        App.UI.Error("Đã có lỗi xảy ra");
                                    }
                                },true);
                                return true;
                            }
                        }
                    } else { /* Trường hợp không có pin con*/
                        var self = $(event[0].target);
                        if(self.parents(".popover").first().length==0 && (typeof self.attr('aria-describedby') =='undefined' || typeof self.attr('aria-describedby') =='string')) {
                            /* Normal listting */
                            self.addClass('active');
                            $.ajax({
                                url: '/api/get-listing-block',
                                type: "post",
                                data: JSON.stringify(ids),
                                beforeSend: function () {
                                    $(".house-overlay-item").not('.active').popover('hide');
                                    //$('#loadding-ajax').show();
                                },
                                cache:true
                            }).success(function (data) {
                                if (data) {
                                    self.popover({
                                        content: data,
                                        placement: 'top',
                                        html: true
                                    }).popover('show');
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
                                //$('#loadding-ajax').hide();
                            }).fail(function (jqXHR, ajaxOptions, thrownError) {
                                //$('.ajax-loading').hide();
                                //$('#loadding-ajax').hide();
                            });
                        }
                    }
                    google.maps.event.trigger(overlay, "focusout");
                }
            }
        }

    });
};
function initilizeMap () {
    var height = $("#bl-listing-container").height();
    if ($("#map-container").height() > height) {
        $("#map-container").height(height);
    }
    containerMap.gmap3({
        map: {
            options: {
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                mapTypeId: "move_poi",
                mapTypeControl: false,
                scaleControl: false,
                fullscreenControl:false,
                streetViewControl: false,
                overviewMapControl: true,
                scrollwheel: true,
                disableDoubleClickZoom: true,
                center: centerDefault,
                zoom: zoneDefault,
                gestureHandling: 'greedy'
            },
            events: {
                idle: function () {
                    if(enable_draw){
                        if($(this).gmap3('get').getZoom() <= default_draw_zoom) {
                            containerMap.gmap3('get').setOptions({minZoom:default_draw_zoom});
                        }
                    }
                    if(!mode_draw){
                        if (allowLoadMarkers && markers.data !=null && markers.data.length > 0) {
                            markerPositions = converData2MakerModel(markers.data, pins.data);
                            loadMarkersIntoMap(markerPositions);
                            allowLoadMarkers = false;
                        } else if(pins.data.length > 0){
                            markerPositions = converData2MakerModel(markers.data, pins.data);
                            loadMarkersIntoMap(markerPositions);
                            allowLoadMarkers = false;
                        }
                        if (isFirstTimeLoad) {
                            isFirstTimeLoad = false;
                            drawBounds();
                            if(options.locations && typeof options.locations !='undefined' && options.locations.length!=0) {
                                containerMap.gmap3({
                                    clear: {
                                        name: ["polyline,polygon"]
                                    },
                                    polygon: {
                                        options: {
                                            strokeColor: "#000000",
                                            strokeOpacity: 1.0,
                                            strokeWeight: 2,
                                            paths: options.locations,
                                            clickable: false,
                                            fillOpacity: 0.1
                                        }
                                    }
                                });
                            }
                        }
                    }
                },
                zoom_changed: function () {
                    if (!mode_draw && !drawing_poply && !$('#draw-allow').hasClass('active')){
                        allowLoadMarkers = true;
                    }
                },
                mousedown: function (map) {
                    if (enable_draw) {
                        drawing_poply = true;
                        containerMap.gmap3('get').setOptions({draggable: false});
                        /* Reset data emptry */
                        list_latLng_draw = [];
                    }
                },
                mousemove: function (map, event, content) {
                    if (enable_draw && drawing_poply && $('#draw-allow').hasClass('active')) {
                        containerMap.gmap3('get').setOptions({draggable: false});
                        /* console.log('[' + event.latLng.lat() + ',' + event.latLng.lng() + "]"); */
                        list_latLng_draw.push([event.latLng.lat(), event.latLng.lng()]);
                        containerMap.gmap3({
                            clear: {
                                name: ["overlay", 'kmllayer', 'polygon']
                            },
                            polyline: {
                                options: {
                                    strokeColor: "#000000",
                                    strokeOpacity: 1.0,
                                    strokeWeight: 1,
                                    path: list_latLng_draw,
                                    clickable: false
                                }
                            }
                        });
                    }
                },
                mouseup: function (map) {
                    if (list_latLng_draw.length != 0) {
                        var currentZoom = containerMap.gmap3('get').getZoom();
                        var  tolerance = (list_latLng_draw.length/ 10000) / (currentZoom * 10/5);
                        var object_polygon_new = simplify(covert2D(list_latLng_draw,'objectXY'), tolerance, true);
                        var new_list = covert2D(object_polygon_new,false);
                        console.log(":---------------------------:");
                        console.log("--- Tolerance: "+tolerance);
                        console.log("--- current Zoom: "+currentZoom);
                        console.log("--- Lenght first: "+ JSON.stringify(list_latLng_draw).length);
                        console.log("--- Lenght last: "+ JSON.stringify(new_list).length);
                        containerMap.gmap3({
                            clear: {
                                name: ["polygon,polyline"]
                            },
                            polygon: {
                                options: {
                                    strokeColor: "#000000",
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2,
                                    paths: [list_latLng_draw],
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
                            options.locations = new_list;
                            data_send.options = options;
                            data_send.current_page = 1;
                            data_send.sort = $("#sort").val();

                            App.Feature.Post('/api/draw-search', data_send, function (response) {
                                console.log(response);
                                if (response.result) {
                                    /* load listing on map */
                                    var url = decodeURIComponent(insertParam('locations',JSON.stringify(new_list)));
                                    window.history.pushState({}, '', location.protocol+"//"+location.host+location.pathname+url);
                                    markerPositions = converData2MakerModel(response.data.list, pins.data);
                                    loadMarkersIntoMap(markerPositions);
                                    allowLoadMarkers = false;
                                    /* Update page */
                                    var text1 = $('.text-result-1').val();
                                    var text2 = $('.text-result-2').val();
                                    $('.text-mode-1').text(text1);
                                    $('.text-mode-2').html(text2);
                                    $(".p-result span").text(response.data.totalProperties);
                                    
                                    $(".p-path li:last strong").text("vùng chọn");
                                    $(".inner-block-listing").html(response.data.html_listing);
                                    if(response.data.totalProperties==0){
                                        let carousel = $('.owl-carousel').owlCarousel({
                                            items: 4,
                                            lazyLoad: true,
                                            lazyLoadEager: true,
                                            loop:true,
                                            margin: 0,
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
                                            navText: ["<img class='hover-display' src='/assets/images/version-4/icons/ic-slider-prev.png'/>","<img class='hover-display' src='/assets/images/version-4/icons/ic-slider-next.png'>"],
                                            responsive:{
                                                0: {
                                                    items: 1
                                                },
                                                360:{
                                                    items: 1
                                                },
                                                768: {
                                                    items: 1
                                                },
                                                1024: {
                                                    items: 1
                                                },
                                                1366: {
                                                    items: 3
                                                }
                                            }
                                        });

                                        carousel.on("load.owl.lazy", function(){
                                            $(".owl-item").removeClass("hidden");
                                        });
                                    }
                                    page_draw = 2;
                                    $(".view-more").remove();
                                    reloadOperation();
                                    $("#map-container .gm-style>div").css({'cursor': 'url(https://maps.gstatic.com/mapfiles/openhand_8_8.cur), default'});
                                }
                                else {
                                    App.UI.Error("Có lỗi xảy ra");
                                }
                            },{
                                text:'Đang tải BĐS...'
                            });
                        }
                    }
                }
            },
            callback: function () {
                //$(this).gmap3('get').setCenter(result[0].geometry.location);
                var map_custom = $(this).gmap3('get');
                var centerControlDiv = document.createElement('div');
                var draw_allow = $("<div id='draw-allow' class='draw-allow' title='Khoanh vùng bản đồ để lọc BĐS'>");
                draw_allow.text("Vẽ");
                if(showDraw)
                    $(draw_allow).show();
                else
                    $(draw_allow).hide();
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
                    location.href=location.protocol+'//'+location.host+location.pathname;
                    return false;
                });
                draw_allow.click(function () {
                    if (!$(this).hasClass('enable_draw')) {
                        $(this).addClass('enable_draw');
                        $("#draw-allow-repeat").addClass('enable_draw');
                    }
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active');
                        $(this).text('Vẽ lại');
                        enable_draw = true;
                        mode_draw = true;
                        $("#map-canvas").gmap3({
                            clear: {
                                name: ["overlay", 'kmllayer', 'polyline', 'polygon']
                            }
                        });
                        $("#map-container .gm-style>div").css({'cursor': 'crosshair'});
                        $("#draw-allow-repeat").show();
                        if(map_custom.getZoom() <= default_draw_zoom) {
                            containerMap.gmap3('get').setZoom(default_draw_zoom);
                        }
                    } else {
                        $(this).removeClass('active');
                        enable_draw = false;
                        containerMap.gmap3({
                            map: {
                                options: {
                                    draggable: true
                                }
                            }
                        });
                        containerMap.gmap3('get').setOptions({minZoom:null});
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
    $('#map-container').bind('mousewheel DOMMouseScroll', function (e) {
        e.preventDefault();
        return false;
    });
};
function load_more(page_current) {
    if (!page_loadding) {
        renderParams();
        $.ajax({
            url: baseUrl + '/p' + page_current + '/autoload' + $.query.toString(),
            type: "get",
            datatype: "html",
            beforeSend: function () {
                App.UI.showLoadding();
                page_loadding = true;
            }
        }).success(function (data) {
            if (data == 'fail') {
                page_loadding = true;
            } else {
                $(".inner-block-listing .row").append(data);
                reloadOperation();
                /* console.log("Finish load: " + baseUrl + '/p' + page_current + '/autoload'); */
                page++;
                page_loadding = false;
                if (page > page_limit)
                    $(".inner-block-listing").append("<div class='view-more text-center'><a href='" + baseUrl + '/p' + page + $.query.toString() + "'> Xem thêm</a></div>");
            }
            slider();
            App.UI.hideLoadding();

        }).fail(function (jqXHR, ajaxOptions, thrownError) {
            page_loadding = true;
            App.UI.hideLoadding();
            /* console.log("Fail load: " + baseUrl + '/p' + page_current + '/autoload'); */
        });
    }
};
function load_more_draw(page_draw_current) {
    if (!page_loadding) {
        data_send.current_page = page_draw_current;
        $.ajax({
            type: "POST",
            url: '/api/draw-search',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data_send),
            async: true,
            beforeSend: function () {
                App.UI.showLoadding({text:'Tải thêm BĐS...'});
                page_loadding = true;
            }

        }).success(function (response) {
            if (!response.result) {
                page_loadding = true;
            } else {
                if (response.data.totalProperties != 0) {
                    loaded = 1;
                    $(".inner-block-listing .row").append(response.data.html_listing);
                }else{
                    loaded = 0;
                }
                reloadOperation();
                page_draw++;
                page_loadding = false;
                if (page_draw > page_limit && response.data.totalProperties != 0 && false)
                    $(".inner-block-listing").append("<div class='view-more text-center'><a href='" + baseUrl + '/p' + page + $.query.toString() + "'> Xem thêm</a></div>");
            }
            slider();
            App.UI.hideLoadding();
        }).fail(function (jqXHR, ajaxOptions, thrownError) {
            page_loadding = true;
            slider();
            App.UI.hideLoadding();
            /* console.log("Đã có lỗi sảy ra khi load trang in draw"); */
        });
    }
};
function initLoadMore() {
    if (loaded) {
        /* Phân trang bình thường */
        if (!mode_draw) {
            if (page <= page_limit) {
                if (($(window).scrollTop() + $(window).height()) >= $(".bl-listing-overview").offset().top - 300) {
                    load_more(page);
                }
            }
        } else {
            if (page_draw <= page_limit || true) {
                if (($(window).scrollTop() + $(window).height()) >= $(".bl-listing-overview").offset().top- 300) {
                    load_more_draw(page_draw);
                }
            }
        }
    }
}

var initApp = function() {
    let width = $(document).width();
    if(width <= 1024) {
        $("#bl-listing-container").removeClass("col-lg-7 col-sm-6").addClass("col-lg-12 col-sm-12");
        $("#col-left").removeClass("col-lg-5 col-sm-6").addClass("col-lg-12 col-sm-12");
        $("#bl-listing-container").show();
        $('[class^="bl-listing-"]').removeClass('col-md-12').removeClass('col-sm-12').addClass('col-md-6 col-sm-6');
        setTimeout(function () {
            $("#col-left").hide();
        },1000);
    } else {
        $(".btn-controll-map").find("button[data-remote='min-map']").addClass('active');
        $(".btn-controll-map").find("button[data-remote='max-map']").removeClass('active');
        $("#bl-listing-container").removeClass("col-sm-12").removeClass("col-lg-12").addClass('col-lg-7 col-sm-6');
        $("#col-left").removeClass("col-sm-12").removeClass("col-lg-12").addClass('col-lg-5 col-sm-6');
        $("#bl-listing-container").show();
        $(".control-full-map").hide();
        $("#col-left").show();
        $('[class^="bl-listing-"]').removeClass('col-md-6').removeClass('col-sm-6').addClass('col-md-12 col-sm-12');
    }
    search_bar();
};

var startApp = function () {
    var slider = function(){
        $('.is-search').addClass("owl-carousel").addClass("owl-theme");
        let searchCarousel = $('.is-search').owlCarousel({
            items: 1,
            lazyLoad: true,
            lazyLoadEager: true,
            loop:true,
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
            navText: ["<img class='hover-display is-seach-nav' src='/assets/images/version-4/icons/left-slide.png'/>","<img class='hover-display is-seach-nav' src='/assets/images/version-4/icons/right-slide.png'/>"]
        });

        
        searchCarousel.on("load.owl.lazy", function(){
            $(".owl-item").removeClass("hidden");
        });

        $('.is-seach-nav').parents('.owl-next').click(function(e){
            e.preventDefault();
            return false;
        });
        $('.is-seach-nav').parents('.owl-prev').click(function(e){
            e.preventDefault();
            return false;
        });
    };
    $(document).ready(function () {
        slider();
        loaded = false; /* Set not scroll */
        $(window).scroll(function () {
            initLoadMore();
        });
        $.each($('.bl-pagination a'),function(key, val){
            var href = $.query.remove("src").toString();
            var pathName = $(this).attr('href').split('?')[0];
            $(this).attr('href', pathName+href);
        });
        /* Save url search */
        if (typeof(Storage) !== 'undifined') {
            localStorage.setItem('urlSearch', window.location.href);
        }
        $('.readmore-block').readmore({
            speed: 1000,
            collapsedHeight: 120,
            moreLink: '<a class="readmore-detail show-readmore" href="#"><div class="show-content">Xem thêm</div></a>',
            lessLink: '<a class="readmore-detail hide-readmore" href="#"><div class="hide-content">Thu gọn</div></a>',
            blockCSS: 'display: block;position: relative;'
        });
        $("#sort").change(function () {
            var value = parseInt($(this).val());
            if(!mode_draw) {
                if (value > 0) {
                    window.location.search = $.query.set("sapxep", value);
                } else {
                    $.query = $.query.remove("sapxep");

                    if ($.query.toString().length == 0) {
                        window.location = window.location.href.split("?")[0];
                    }
                    else {
                        window.location.search = $.query.remove("sapxep");
                    }

                }
            }else{
                data_send.sort = $("#sort").val();
                data_send.current_page = 1;
                /* console.log(data_send); */
                App.Feature.Post('/api/draw-search', data_send, function (response) {
                    if (response.result) {
                        if (response.data.totalProperties == 0)
                            loaded = 0;
                        else
                            loaded = 1;
                        /* Update page */
                        $(".inner-block-listing .row").html(response.data.html_listing);
                        page_draw = 2;
                        $(".view-more").remove();
                    }
                    else {
                        App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
                    }
                },true);
            }
        });
        $('.group-select select.form-control').each(function (key,item) {
            $(item).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $(item).parent(),
                language: {
                    noResults: function(){
                        return "Không có dữ liệu";
                    }
                }
            });
        });
        $(".btn-controll-map").click(function () {
            $(".btn-controll-map").find("button").removeClass('active');

            if($(this).find("button").data('remote')=='max-map'){
                $(".btn-controll-map").find("button[data-remote='max-map']").addClass('active');
                $("#col-left").removeClass('col-sm-6').removeClass("col-lg-5").addClass('col-sm-12 col-lg-12');
                $("#bl-listing-container").hide();
                $(".control-full-map").show();
                $("#col-left").show();
            } else {
                $(".btn-controll-map").find("button[data-remote='min-map']").addClass('active');
                $("#col-left").removeClass('col-sm-12').removeClass("col-lg-12").addClass('col-lg-5 col-sm-6');
                $("#bl-listing-container").show();
                $(".control-full-map").hide();
                let width = $(document).width();
                if(width <= 1024) {
                    $("#col-left").hide();
                    $('[class^="bl-listing-"]').removeClass('col-md-12').removeClass('col-sm-12').addClass('col-md-6 col-sm-6');
                }
            }
        });
        $("#popup-save .form-horizontal").bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            } , fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập giá trị"
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập giá trị"
                        }
                        , digits: {
                            message: "Phải là số"
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
                }
            }
        });
        /* Save option search to cookie */
        //App.Feature.setCookie("optionSearch", JSON.stringify(optionSearch));
        $('[data-toggle="tooltip"]').tooltip();
        if ($("#guideline").size() == 1 && !App.Feature.getCookie("guide")) {
            App.Feature.setCookie("guide", 1);
            var step = 1;
            $("#guideline-step1").fadeIn(500);
            var interval = setInterval(function () {
                if (step == 3) {
                    clearInterval(interval);
                    $("#guideline").fadeOut(300, function () {
                        $("#guideline").remove();
                    });
                }
                else {
                    $("#guideline-step" + step++).fadeOut(1000, function () {
                        $("#guideline-step" + step).fadeIn(1000).css("display", "block");
                    });
                }
            }, 4000);
            $("#guideline-step").click(function () {
                clearInterval(interval);
                $("#guideline").fadeOut(300, function () {
                    $("#guideline").remove();
                });
            });
            $('.modal').on('shown.bs.modal', function () {
                if ($(this).attr("id") == "popup-cart-save") {
                    clearInterval(interval);
                    $("#guideline").remove();
                }
            });
        }
        let carousel = $('.owl-carousel').owlCarousel({
            items: 4,
            lazyLoad: true,
            lazyLoadEager: true,
            loop:true,
            margin: 0,
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
            navText: '',
            responsive:{
                0: {
                    items: 1
                },
                360:{
                    items: 1
                },
                768: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1366: {
                    items: 3
                }
            }
        });
        carousel.on("load.owl.lazy", function(){
            console.log("lazy"); 
            $(".owl-item").removeClass("hidden");
        });
        
        var actual_link = window.location.href;
        var lastUrl = actual_link.substr(actual_link.length - 3);
        if (lastUrl == "/p1") {
            var link = location.href.replace('/p1', '', window.location.href);
            window.history.pushState('object', document.title, link);
        }
        $(window).resize(function() {
            initApp();
        });
    });
    $(document).on('click', ".pagination-ajax a.paginate, .pagination-ajax a.paginate",function (e) {
        e.preventDefault();
        /* Xử lý dữ liệu */
        var data_send ={};
        if (list_latLng_draw.length != 0 && !options.length) {
            var array_semengt = $(this).attr('href').split("/");
            var end_segment = array_semengt[array_semengt.length-1];
            if(end_segment.search(/p\d{1,}/i)!=-1)
                data_send.current_page = end_segment.replace("p",'');
            else
                data_send.current_page = 1;
            options.locations = list_latLng_draw;
            data_send.options = options;
            data_send.sort = $("#sort").val();
            console.log(data_send);
            App.Feature.Post($(this).attr('href'), data_send, function (response) {
                if (response.result) {
                    
                    $(".inner-block-listing").html(response.data.html_listing);
                    reloadOperation();
                }
                else {
                    App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
                }
            },{
                text:'Đang tải BĐS...'
            });
        }
    });
    setTimeout(function () {
        App.Feature.loadScripts(["/assets/modules/search/markerwithlabel.js"], function () {
            initilizeMap();
            initApp();
        });
    },1000);
};