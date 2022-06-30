function IndexPage() {
    var _this = this;
    var isLoading = false;

    _this.init = function () {
        initVAR();
        initDOM();
        loadData();
        bindEvents();
    };

    function initVAR() {
        _this.listingStatusId = '#listing-status';
        _this.listingStatus = null;
        _this.listingStatusVal = null;
        _this.listingDateView = '#listing-date-view';
        _this.listingDateViewVal = null;

        _this.crawledListingTable = null;
        _this.crawledListingTableId = '#table-crawled-listing';
    }

    function initDOM() {
        initListingStatusDOM();
    }

    function loadData() {
        loadListingStatus();
        loadCrawledListingList();
    }

    function initListingStatusDOM() {
        _this.listingStatus = $(_this.listingStatusId);
        _this.listingStatus.select2();
        _this.listingStatusVal = _this.listingStatus.val();
        $(_this.listingDateView).datepicker({format: "dd/mm/yyyy", autoclose: true});
        loadListingViewDate();
    }

    function loadListingViewDate() {
        _this.listingDateViewVal = $(_this.listingDateView).val();
        if (hasValue(_this.listingDateViewVal)) {
            if (moment(_this.listingDateViewVal, 'DD/MM/YYYY').isValid()) {
                _this.listingDateViewVal = moment(_this.listingDateViewVal, 'DD/MM/YYYY').unix() * 1000;
            } else {
                _this.listingDateViewVal = null;
            }
        } else {
            _this.listingDateViewVal = null;
        }
    }

    function bindEvents() {
        $('body').off('change', _this.listingStatus).on('change', _this.listingStatus, function (e) {
            _this.listingStatusVal = _this.listingStatus.val();
            loadCrawledListingList();
        });
        $('body').off('change', _this.listingDateView).on('change', _this.listingDateView, function (e) {
            loadListingViewDate();
            loadCrawledListingList();
        });
    }

    function loadListingStatus() {
        $.ajax({
            url: API_LIST.getCrawlerListingStatuses
        }).done(function (response) {
            if (response.result) {
                $.each(response.data, function (i, data) {
                    _this.listingStatus.append('<option value="' + data.statusId + '">' + data.statusName + '</option>');
                })
            } else {
                // nothing
            }
        });
    }

    function loadCrawledListingList() {
        showPropzyLoading();
        if (isLoading == false) {
            isLoading = true;
            try {
                _this.crawledListingTable.destroy();
            } catch (Ex) {
                // nothing
            }
            _this.crawledListingTable = $(_this.crawledListingTableId)
                .DataTable({
                    processing: false,
                    serverSide: true,
                    ajax: {
                        url: API_LIST.getCrawlerListingList,
                        type: 'POST',
                        data: {
                            statusId: _this.listingStatusVal,
                            dateCrawler: _this.listingDateViewVal
                        }
                    },
                    lengthChange: false,
                    paging: true,
                    searching: false,
                    ordering: false,
                    scrollX: true,
                    language: DatatableHelper.languages.vn,
                    columns: [
                        {
                            data: 'createdDate',
                            width: '150px',
                            render: function (data, type, object) {
                                return moment(object.createdDate).format("DD/MM/YYYY");
                            }
                        },
                        {
                            data: 'crawlerName',
                            width: '200px',
                            render: function (data, type, object) {
                                return object.crawlerName;
                            }
                        },
                        {
                            data: 'statusName',
                            width: '320px',
                            render: function (data, type, object) {
                                return object.statusName;
                            }
                        },
                        {
                            data: 'link',
                            render: function (data, type, object) {
                                return '<a href="' + object.link + '" target="_blank">click here ....</a>';
                            }
                        }

                    ]
                })
                .off('processing.dt')
                .on('processing.dt', function (e, settings, processing) {
                    if (processing) {
                        showPropzyLoading();
                    } else {
                        hidePropzyLoading();
                    }
                })
                .off('xhr.dt')
                .on('xhr.dt', function (e, settings, json, xhr) {
                    hidePropzyLoading();
                    var recordsTotal = json.recordsTotal;
                    if (hasValue(_this.listingDateViewVal)) {
                        $('.total-crawled-listing').text('Listing đã cào ngày ' + moment(_this.listingDateViewVal).format('DD/MM/YYYY') + ': ' + recordsTotal);
                    } else {
                        $('.total-crawled-listing').text('Listing đã cào : ' + recordsTotal);
                    }
                    isLoading = false;
                });
        }
    }

}

$(document).ready(function () {
    var indexPage = new IndexPage();
    indexPage.init();
});