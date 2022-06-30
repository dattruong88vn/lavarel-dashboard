function SAMarketReport() {
    var _this = this;
    var dateFormat = 'DD/MM/YYYY';
    var dataPost = {
        rlistingId: Window.jsData.rlistingId,
        dateFrom: moment().unix() * 1000,
        dateTo: moment().unix() * 1000
    };
    var api = {
        marketReportData: '/pos/SaApi/marketReportData',
        marketReportList: '/pos/SaApi/marketReportList',
    };

    var fillterFeilds = {
        rlistingId: Window.jsData.rlistingId,
        dateFrom : moment().unix() * 1000,
        dateTo: moment().unix() * 1000,
        columnName : null,
        value : null
    }

    _this.init = function () {
        initVAR();
        initDOM();
        loadMarketReportData();
        loadMarketReportList();
        bindEvent();
    };

    function initVAR() {
        _this.applySearch = '#maket-report-filter';
        _this.avgSizeM2Format = '#avgSizeM2Format';
        _this.indexOfListing = '#indexOfListing';
        _this.maxPriceFormat = '#maxPriceFormat';
        _this.minPriceFormat = '#minPriceFormat';
        _this.priceFormat = '#priceFormat';
        _this.totalListing = '#totalListing';
        _this.marketReportListTable = null;
        _this.marketReportListTableId = '#market-report-list-table';
    }

    function initDOM() {
        $('.date-range input').each(function() {
            $(this).datepicker({
                format: 'dd/mm/yyyy',
                showOtherMonths: true,
                selectOtherMonths: true,
                autoclose: true,
                changeMonth: true,
                changeYear: true,
                todayHighlight : true,
            });
        });
        $('.date-range-from').datepicker("update", moment().subtract(3, 'months').endOf('day').format(dateFormat))
        $('.date-range-to').datepicker("update", moment().endOf('day').format(dateFormat));
    }

    function getDataPost() {
        fillterFeilds.dateFrom = isVal($('.date-range-from').val()) ? moment($('.date-range-from').datepicker('getDate')).unix() * 1000 : moment().subtract(3, 'months').endOf('day').unix() * 1000;
        fillterFeilds.dateTo = isVal($('.date-range-to').val()) ? moment($('.date-range-to').datepicker('getDate')).unix() * 1000 : moment().endOf('day').unix() * 1000;
    }

    function loadMarketReportData() {
        getDataPost();
        $.ajax({
            url: api.marketReportData,
            type: 'POST',
            data: JSON.stringify(fillterFeilds)
        })
            .done(function (response) {
                if (response.result) {
                    $(_this.avgSizeM2Format).html((response.data.avgSizeM2Format ? response.data.avgSizeM2Format :  "0" )+ ' /m2');
                    $(_this.indexOfListing).html(response.data.indexOfListing);
                    $(_this.maxPriceFormat).html(response.data.maxPriceFormat);
                    $(_this.minPriceFormat).html(response.data.minPriceFormat);
                    $(_this.priceFormat).html(response.data.priceFormat);
                    $(_this.totalListing).html(response.data.totalListing);
                    loadMap(response.data.latLongRListingIds);
                }
            });
    }
    async function loadMap(dataList) {
        var mapOptions = {
            //center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 8, //Not required.
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-market"), mapOptions);
        var geocoder = new google.maps.Geocoder;

        //Create LatLngBounds object.
        var latlngbounds = new google.maps.LatLngBounds();

        if(dataList && dataList.length > 0) {
            dataList.forEach( it => {
                const position = new google.maps.LatLng(it.latitude, it.longitude);
                const marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: ''+it.rlistingId,
                    animation: google.maps.Animation.DROP
                });

                /*const infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent('' + it.rlistingId);
                infoWindow.open(map, marker);*/
                latlngbounds.extend(marker.position);
            });
        }

        //Get the boundaries of the Map.
        // var bounds = new google.maps.LatLngBounds();

        //Center map and adjust Zoom based on the position of all markers.
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }

    function loadMarketReportList() {
        try {
            _this.marketReportListTable.destroy();
        } catch (Ex) {
            // nothing
        }
        _this.marketReportListTable = $('#market-report-list-table').DataTable({
            processing: false,
            serverSide: true,
            ajax: {
                url: api.marketReportList,
                type: 'POST',
                data: fillterFeilds
            },
            autoWidth: true,
            deferRender: false,
            lengthChange: false,
            paging: true,
            searching: false,
            ordering: true,
            language: DatatableHelper.languages.vn,
            columns: [
                {
                    data: 'R_ID',
                    render: function (data, type, object) {
                        return '<a href="/pos/sa/detail/' + object.rlistingId + '" target="_blank">' + object.rlistingId + '</a>';
                    },
                },
                {
                    data: 'price',
                    render: function (data, type, object) {
                        return hasValue(object.priceFormat) ? object.priceFormat : 'N/A';
                    }
                },
                {
                    data: 'lotSize',
                    render: function (data, type, object) {
                        return hasValue(object.lotSize) ? object.lotSize : 'N/A';
                    }
                },
                {
                    data: 'landPriceFormat',
                    render: function (data, type, object) {
                        return hasValue(object.landPriceFormat) ? object.landPriceFormat : 'N/A';
                    },
                    orderable: false
                },
                {
                    data: 'floorSize',
                    render: function (data, type, object) {
                        return hasValue(object.floorSize) ? object.floorSize : 'N/A';
                    }
                },
                {
                    data: 'address',
                    render: function (data, type, object) {
                        return hasValue(object.address) ? object.address : 'N/A';
                    },
                    orderable: false
                },
                {
                    data: 'bedBath',
                    render: function (data, type, object) {
                        return hasValue(object.bedBath) ? object.bedBath : 'N/A';
                    },
                    orderable: false
                },
                {
                    data: 'floor',
                    render: function (data, type, object) {
                        return hasValue(object.floor) ? object.floor : 'N/A';
                    },
                    orderable: false
                },
                {
                    data: 'position',
                    render: function (data, type, object) {
                        return hasValue(object.position) ? object.position : 'N/A';
                    },
                    orderable: false
                },
                {
                    data: 'statusId',
                    render: function (data, type, object) {
                        return hasValue(object.statusName) ? object.statusName : 'N/A';
                    },
                    orderable: false
                }
            ]
        })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                settings.ajax.data.columnName = settings.aoColumns[settings.aaSorting[0][0]].data;
                settings.ajax.data.value = settings.aaSorting[0][1]
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            });
    }

    function bindEvent() {
        $('body').off('click', _this.applySearch).on('click', _this.applySearch, function (e) {
            e.preventDefault();
            loadMarketReportData();
            loadMarketReportList();
        });
    }
}

$(document).ready(function () {
    (new SAMarketReport()).init();
});