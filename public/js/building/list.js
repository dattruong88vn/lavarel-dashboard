
class BuildingList {
    constructor() {
        this.stored =  {
            _TABLE : null,
            _FILTER : {
                keyword : null,
                sortColumnName : 'buildingId',
                sortValue : 'desc'
            },
            _URL : {
                list : 'building/list'
            }
        };
        this.bindEvents();
        this.initTable();
    }
    bindEvents () {
        const that = this;
        $(document).on('click', '#btn-search', function (e) {
            e.preventDefault();
            that.updateFilter();
            that.stored._TABLE.ajax.reload();
        });
        $(document).on('click', '#btn-clear-search', function (e) {
            e.preventDefault();
            that.clearFilter();
            that.stored._TABLE.ajax.reload();
        });
    }
    updateFilter() {
        this.stored._FILTER.keyword = $('#input-search').val().trim();
    }
    clearFilter() {
        $('#input-search').val('');
        this.updateFilter();
    }
     initTable() {
        const  that = this;
        const columns = [
            {
                data: 'buildingId',
                render: function (data, type, object) {
                    return `<a href="building/${object.buildingId}" target="_blank">${object.buildingId}</a>`;
                }
            },
            {
                data: 'buildingName',
                render: function (data, type, object) {
                    return `<a href="building/${object.buildingId}" target="_blank">${object.buildingName}</a>`;
                }
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    return object.address;
                }
            },
            {
                data: 'districtId',
                render: function (data, type, object) {
                    return object.districtName || 'N/a';
                }
            },
            {
                data: 'numberListingsInBuilding',
                render: function (data, type, object) {
                    return object.numberListingsInBuilding || 'N/a';
                }
            },
            {
                data: 'numberListingsLive',
                render: function (data, type, object) {
                    return object.numberListingsLive || 'N/a';
                }
            },
            {
                data: 'createdBy',
                render: function (data, type, object) {
                    return object.createdBy || 'N/a';
                }
            },
            {
                data: 'updatedBy',
                render: function (data, type, object) {
                    return object.updatedBy || 'N/a';
                }
            },
        ];
        this.stored._TABLE = $('#tb-budding')
            .DataTable({
                processing: false,
                serverSide: true,
                bSort: false,
                ajax: {
                    url: that.stored._URL.list,
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, that.stored._FILTER);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                order: [[0, 'desc']],
                language: DatatableHelper.languages.vn,
                columns: columns,
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                settings.ajax.data = function (d) {
                    that.stored._FILTER.sortColumnName = settings.aoColumns[settings.aaSorting[0][0]].data;
                    that.stored._FILTER.sortValue = settings.aaSorting[0][1]
                    Object.assign(d, that.stored._FILTER);
                    return d;
                };
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            });
    }
}

$(document).ready(function () {
    showPropzyLoading();
    Window.buiding = new BuildingList();
    $(window).load(function () {
        hidePropzyLoading();
    });
});