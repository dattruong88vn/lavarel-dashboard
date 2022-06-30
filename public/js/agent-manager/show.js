/*
* by Barry
* */
class AgentList {
    constructor() {
        this._API = {
            'list' : '/agent-manager/get-agent-list'
        };
        this._STORED = {
            table : null,
            filter : {
                statusId : null,
                searchKeywords : null,
                sortType : 'desc',
                sortColumn : 'statusDate'
            }
        };
        this.initTable();
        this.events();
    }
    initTable() {
        const that = this;
        const colums  = [
            {
                data: 'agentName',
                render: function (data, type, object) {
                    return object.agentName ? `<a href="/agent-manager/detail/${object.agentId}" target="_blank">${object.agentName}</a>` : `<a href="/agent-manager/detail/${object.agentId}" target="_blank">N/A</a>`;
                }
            },
            {
                data: 'phone',
                render: function (data, type, object) {
                    return object.phone ? object.phone : `N/A`;
                }
            },
            {
                data: 'email',
                render: function (data, type, object) {
                    return object.email ? object.email : `N/A`;
                }
            },
            {
                data: 'numberOfListingLives',
                render: function (data, type, object) {
                    return object.numberOfListingLives ? object.numberOfListingLives : `0`;
                }
            },
            {
                data: 'numberOfDeals',
                render: function (data, type, object) {
                    return object.numberOfDeals ? object.numberOfDeals : `0`;
                }
            },
            {
                data: 'statusId',
                render: function (data, type, object) {
                    if (data == 7) {
                        return `<span class="text-primary">Chính thức</span>`;
                    } else {
                        return `<span class="text-danger">Không chính thức</span>`;
                    }

                }
            },
            {
                data: 'statusDate',
                render: function (data, type, object) {
                    return data ? moment(data).format("DD/MM/YYYY") : 'N/A';
                }
            },
            {
                data: 'createdDate',
                render: function (data, type, object) {
                    return data ? moment(data).format("DD/MM/YYYY") : 'N/A';
                }
            },
        ];
        this._STORED.table = $('#tb-agent-list').DataTable({
                processing: false,
                serverSide: true,
                bSort: false,
                ajax: {
                    url: that._API['list'],
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, that._STORED.filter);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                order: [[6, 'desc']],
                language: DatatableHelper.languages.vn,
                columns: colums,
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                settings.ajax.data = function (d) {
                    that._STORED.filter.sortColumn = settings.aoColumns[settings.aaSorting[0][0]].data;
                    that._STORED.filter.sortType = settings.aaSorting[0][1];
                    Object.assign(d, that._STORED.filter);
                    return d;
                };

                /*if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }*/
            })
            .on('xhr.dt', function (e, settings, json, xhr) {
                that.loadOverview(json);
            });
    }
    loadOverview(json) {
        const overview = json.overview;
        let total = 0;
        if (Array.isArray(overview)) {
            overview.forEach(it => {
                total += it.value;
                $(`.select-status[data-status="${it.statusId}"] span`).html(it.value);
            });
        }
        $('#number-of-agents').html(total);


    }
    reloadTable() {
        if (this._STORED.table) {
            this._STORED.table.ajax.reload();
        }
    }
    events() {
        const that = this;
        $(document).on('click', '.select-status', function (e) {
           e.preventDefault();
           const data = Number.parseInt($(this).data('status'));
           that._STORED.filter.statusId = data;
           that.reloadTable();
        });
        $(document).on('keyup', '#search-key', function (e) {
            e.preventDefault();
            const data = $.trim($(this).val());
            that._STORED.filter.searchKeywords = data;
            that.reloadTable();
        });
    }
}
$(document).ready(function () {
    showPropzyLoading();
    Window.agentList = new AgentList();
    $(window).load(function () {
        hidePropzyLoading();
    });
});