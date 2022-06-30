class SeoList {
    constructor() {
        this._API = {
            'list': '/seo/get-seo-list',
            'delete-seo-slug' : '/seo/delete'
        };
        this._STORED = {
            table : null,
            filter : {
                keyword : null,
                sortColumnName: "createdDate",
                sortValue: "desc"
            }
        };
        this.initTable();
        this.events();
    }
    initTable() {
        const that = this;
        const columns = [
            {
                data: 'slug',
                render: function (data, type, object) {
                    return `<a href="/seo/${object.slugId}" target="_blank">${object.slug}</a>`;
                }
            },
            {
                data: 'listingTypeId',
                render: function (data, type, object) {
                    return getNameListingType(object.listingTypeId).sale.name;
                }
            },
            {
                data: 'propertyTypeGroupName',
                render: function (data, type, object) {
                    return data ? data : 'N/A';
                }
            },
            {
                data: 'propertyTypeName',
                render: function (data, type, object) {
                    return data ? data : 'N/A';
                }
            },
            {
                data: 'districtName',
                render: function (data, type, object) {
                    return data ? data : 'N/A';
                }
            },
            {
                data: 'title',
                render: function (data, type, object) {
                    return data ? data : 'N/A';
                }
            },
            {
                data: 'createdDate',
                render: function (data, type, object) {
                    return data ? moment(data).format('DD/MM/YYYY') : 'N/A';
                }
            },
            {
                data: 'agentName',
                render: function (data, type, object) {
                   return `<button class="btn btn-sm btn-danger remove-seo-slug"><i class="fa fa-times"></i></button>`;
                }
            },
        ];
        this._STORED.table =  $('#table-seo').DataTable({
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
            order: [[0, 'desc']],
            language: DatatableHelper.languages.vn,
            columns: columns,
        })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                settings.ajax.data = function (d) {
                    that._STORED.filter.sortColumnName = settings.aoColumns[settings.aaSorting[0][0]].data;
                    that._STORED.filter.sortValue = settings.aaSorting[0][1];
                    Object.assign(d, that._STORED.filter);
                    return d;
                };
            })
            .on('xhr.dt', function (e, settings, json, xhr) {
                //that.loadOverview(json);
            });
    }
    reloadTable() {
        if (this._STORED.table) {
            this._STORED.table.ajax.reload();
        }
    }
    deleteSeoSlug(slugId) {
        const that = this;
        ModalConfirm.showModal({
            message: 'Bạn có muốn xóa seo slug này',
            onYes: function (modal) {
                showPropzyLoading();
                $.ajax({
                    type: 'POST',
                    url: that._API["delete-seo-slug"],
                    data: JSON.stringify({slugIds : [slugId]}),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        hidePropzyLoading();
                        if ( xhr.result) {
                            posNotifyAlert({type: "pos-notify-success", message : 'Xóa seo slug thành công!'});
                            that.reloadTable();
                        } else {
                            posNotifyAlert({type: "pos-notify-danger", message : xhr.message});
                        }
                    },
                    error: function (data) {
                        hidePropzyLoading();
                        console.error(data);
                    },
                });
            }
        });
        return false;
    }
    events() {
        const that = this;
        $(document).on('keyup', '#search-key', function (e) {
            e.preventDefault();
            const data = $.trim($(this).val());
            that._STORED.filter.keyword = data;
            that.reloadTable();
        });
        $(document).on('click', '.remove-seo-slug', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._STORED.table.row( tr );
            const slug = row.data().slugId;
            that.deleteSeoSlug(slug);
        });
    }
}

$(document).ready(function () {
    showPropzyLoading();
    Window.seoList = new SeoList();
    $(window).load(function () {
        hidePropzyLoading();
    });
});