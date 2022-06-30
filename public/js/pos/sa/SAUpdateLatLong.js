

class SAUpdateLatLong {
    constructor() {
        this.stored = {
            filter : {
                rlistingId : null,
            },
            table : null,
            markers : null,
            currentPositionIcon : {
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // url
                scaledSize: new google.maps.Size(80, 80), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            },
            ccPositionIcon : {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // url
                scaledSize: new google.maps.Size(80, 80), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
        };
        this._API = {
            getListNeedUpdatePosition: '/pos/SaApi/getListNeedUpdatePosition',
            postUpdatePosition: '/pos/SaApi/postUpdatePosition',
            postCancelPosition: '/pos/SaApi/postCancelPosition',
        };
        this.paramsToFilter();
        this.initTable();
        this.bindEvents();
    }

    /**
     * FUNCTION GET PARAM FROM URL AND FILL IT IN TO FILTER
     */
    paramsToFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        this.stored.filter.rlistingId = urlParams.get('rlistingId') ? urlParams.get('rlistingId') : null;
        $('#filter-rlisting-id').val(this.stored.filter.rlistingId);
    }

    initTable() {
        const that = this;
        const columns = that.columsTables();
        // load table
        that.stored.table = $('#needToUpdateLatLongtable').DataTable({
            processing: false,
            serverSide: true,
            bSort: false,
            ajax: {
                url: that._API.getListNeedUpdatePosition,
                type: 'GET',
                data: function (d) {
                    Object.assign(d, that.stored.filter);
                    return d;
                }
            },
            autoWidth: true,
            deferRender: false,
            lengthChange: false,
            paging: true,
            searching: false,
            ordering: false,
            order: [[0, 'desc']],
            language: DatatableHelper.languages.vn,
            createdRow: function (row, data, index) {
                /*// ưu tiên request diy
                if (data.isRequestByDiy == true) {
                    $(row).addClass('is-request-diy');
                } else if (hasValue(data.lastestDateFeedBack)) {
                    $(row).addClass('is-feed-back-customer');
                }*/
            },
            columns: columns
        })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }

            })
            .on('xhr.dt', function (e, settings, json, xhr) {})
            .on( 'draw', function () {});
    }

    loadMap() {
        const that = this;
        var mapOptions = {
            center: new google.maps.LatLng(that.stored.markers[0].lat, that.stored.markers[0].lng),
            // zoom: 8, //Not required.
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var geocoder = new google.maps.Geocoder;

        //Create LatLngBounds object.
        var latlngbounds = new google.maps.LatLngBounds();

        for (var i = 0; i < that.stored.markers.length; i++) {
            var f = function(index){
                var data = that.stored.markers[index];
                var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: data.title,
                    icon: data.icon,
                    animation: google.maps.Animation.DROP
                });
                (function (marker, data) {
                    var infoWindow = new google.maps.InfoWindow();
                    geocoder.geocode({'location': {lat: data.lat, lng: data.lng}}, function(results, status) {
                        var content = 'Không tìm thấy vị trí';
                        if (status === 'OK') {
                            if (results[0]) {
                                content = '<p class="map-position-info">' + data.title + ': ' + '</p><p class="map-position-info">' + results[0].formatted_address + '</p>';
                            }
                        }
                        infoWindow.setContent(content);
                        infoWindow.open(map, marker);
                    });
                    google.maps.event.addListener(marker, "click", function (e) {
                        infoWindow.open(map, marker);
                    });
                })(marker, data);

                //Extend each marker's position in LatLngBounds object.
                latlngbounds.extend(marker.position);
            };
            setTimeout(f(i), i*200);
        }

        //Get the boundaries of the Map.
        // var bounds = new google.maps.LatLngBounds();

        //Center map and adjust Zoom based on the position of all markers.
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }
    /**
     * FUNCTION LOAD EVENT JQUERY FOR THIS PAGE
     */
    bindEvents() {
        const that = this;
        $('body').off('click', '.update').on('click','.update', function(){
            showPropzyLoading();
            var dataJSON = $(this).data('json');
            $.ajax({
                url: that._API.postUpdatePosition,
                type: 'POST',
                data: JSON.stringify(dataJSON)
            }).done(function(response){
                hidePropzyLoading();
                showPropzyAlert(response.message, 'Thông báo', function(){
                    if(response.result){
                       that.stored.table.ajax.reload();
                    }
                });
            });
        });

        // cancel
        $('body').off('click', '.delete').on('click','.delete', function(){
            showPropzyLoading();
            var dataJSON = $(this).data('json');
            delete dataJSON.longitude;
            delete dataJSON.latitude;
            $.ajax({
                url: that._API.postCancelPosition,
                type: 'POST',
                data: JSON.stringify(dataJSON)
            }).done(function(response){
                hidePropzyLoading();
                showPropzyAlert(response.message, 'Thông báo', function(){
                    if(response.result){
                        that.stored.table.ajax.reload();
                    }
                });
            });
        });

        //
        $('body').off('click', '.compareLatLong').on('click','.compareLatLong', function(){
            var latlong = $(this).data('compare-latlong');
            that.stored.markers = [
                {
                    "title": 'Vị trí hiện tại',
                    "lat": latlong.latitude,
                    "lng": latlong.longitude,
                    "description": '',
                    "icon": that.stored.currentPositionIcon
                },
                {
                    "title": 'Vị trí từ cc',
                    "lat": latlong.ccLatitude,
                    "lng": latlong.ccLongitude,
                    "description": '',
                    "icon": that.stored.ccPositionIcon
                },
            ];
            $('#dvMapModal').modal();
            that.loadMap();
        });

        $('body').off('click', '[data-photo]').on('click','[data-photo]', function(){
            $('#photoModal').modal();
            $('#photoModal img').attr('src',$(this).data('photo'));
        });
        $('body').off('click', '#filter').on('click','#filter', function(){
            that.filterUpdate();
            that.stored.table.ajax.reload();
        });
        $('body').off('click', '#cancel-filter').on('click','#cancel-filter', function(){
            that.filterClear();
            that.stored.table.ajax.reload();
        });
    }

    filterUpdate() {
        this.stored.filter.rlistingId = $.trim($('#filter-rlisting-id').val()) ? $.trim($('#filter-rlisting-id').val()) : null;
    }

    filterClear() {
        $('#filter-rlisting-id').val('');
        this.filterUpdate();
    }

    columsTables() {
        return [
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    var rlistingId = object.rlistingId;
                    return rlistingId;
                }
            },
            {
                data: 'address',
                class: 'text-left',
                render: function (data, type, object) {
                    var address = hasValue(object.address)? object.address : 'N/A';
                    return address;
                }
            },
            {
                data: 'currentLatLong',
                render: function (data, type, object) {
                    var currentLatLong = hasValue(object.latitude)? object.latitude : 'N/A';
                    currentLatLong = currentLatLong + ' - ' + (hasValue(object.longitude)? object.longitude : 'N/A');
                    return currentLatLong;
                }
            },
            {
                data: 'ccLatLong',
                render: function (data, type, object) {
                    var ccLatLong = hasValue(object.ccLatitude)? object.ccLatitude : 'N/A';
                    ccLatLong = ccLatLong + ' - ' + (hasValue(object.ccLongitude)? object.ccLongitude : 'N/A');
                    return ccLatLong;
                }
            },
            {
                data: 'compareLatLong',
                render: function (data, type, object) {
                    var compareLatLong = {
                        latitude: object.latitude,
                        longitude: object.longitude,
                        ccLatitude: object.ccLatitude,
                        ccLongitude: object.ccLongitude
                    };
                    compareLatLong = JSON.stringify(compareLatLong);
                    compareLatLong = "<a href='javascript:void(0);' data-compare-latlong=" + compareLatLong + " class='compareLatLong'>Xem trên bản đồ</a>";
                    return compareLatLong;
                }
            },
            {
                data: 'photo',
                render: function (data, type, object) {
                    var photo = hasValue(object.photo)? '<a href="javascript:void(0);" data-photo=' + object.photo + '><img src="' + object.photo + '" /></a>' : 'N/A';
                    return photo;
                }
            },
            {
                data: 'update',
                render: function (data, type, object) {
                    var dataJSON = {
                        "id": object.id,
                        "rlistingId": object.rlistingId,
                        "longitude": object.ccLongitude,
                        "latitude": object.ccLatitude
                    };
                    dataJSON = JSON.stringify(dataJSON);
                    var address = "<div class='form-horizontal'><button class='btn btn-primary update' data-json='" + dataJSON + "'>Cập nhật</button><button class='btn btn-danger delete' data-json=" + dataJSON + ">Xóa</button></div>";
                    return address;
                }
            },
        ];
    }
}

$(document).ready(function(){
    new SAUpdateLatLong();
});