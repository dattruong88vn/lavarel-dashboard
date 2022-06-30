function SAMarketReportList() {
    var _this = this;

    _this.init = function () {
        initVAR();
        loadData();
        bindEvents();
    };

    function initVAR() {
        _this.marketReportListTable = null;
        _this.marketReportListTableId = '#market-report-list-table';
        _this.unitNumber = '#numberUnit';
        _this.unit = '#unit';
    }

    function loadData() {
        loadMarketReportList();
    }

    function bindEvents() {
        _this.marketReportListTable
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            });
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
                url: Window.sa.api.apiList.marketReportList,
                type: 'POST',
                data: {
                    rlistingId: parseInt(Window.jsData.rlistingId),
                    numberUnit: parseInt($(_this.unitNumber).val()),
                    unit: $(_this.unit).val()
                }
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
                    data: 'id',
                    render: function (data, type, object) {
                        return '<a href="/pos/sa/detail/' + object.rlistingId + '">' + object.rlistingId + '</a>';
                    },
                    orderable: false
                },
                {
                    data: 'priceFormat',
                    render: function (data, type, object) {
                        return object.priceFormat;
                    }
                },
                {
                    data: 'lotSize',
                    render: function (data, type, object) {
                        return object.lotSize;
                    }
                },
                {
                    data: 'floorSize',
                    render: function (data, type, object) {
                        return object.floorSize;
                    }
                },
                {
                    data: 'address',
                    render: function (data, type, object) {
                        return object.address;
                    },
                    orderable: false
                },
                {
                    data: 'statusName',
                    render: function (data, type, object) {
                        return object.statusName;
                    },
                    orderable: false
                },
                {
                    data: 'sellPrice',
                    render: function (data, type, object) {
                        return object.sellPrice;
                    },
                    orderable: false
                },
                {
                    data: 'bedBath',
                    render: function (data, type, object) {
                        return object.bedBath;
                    },
                    orderable: false
                },
                {
                    data: 'floor',
                    render: function (data, type, object) {
                        return object.floor;
                    },
                    orderable: false
                },
                {
                    data: 'position',
                    render: function (data, type, object) {
                        return object.position;
                    },
                    orderable: false
                }
            ]
        });
    }
}