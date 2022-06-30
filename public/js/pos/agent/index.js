
const localEditOwner = {
    stored : {

    },
    filter : {

    },
    columns : {
        requestEditOwner : [
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    return (hasValue(data) ? '<a href="/pos/sa/detail/' + data+ '" target="_blank">' + data + '</a>' : 'N/A');
                }
            },
            {
                data: 'agentName',
                render: function (data, type, object) {
                    return (hasValue(data) ? data + "<i class='fa fa-phone btn-fa-circle btn-fa-circle-green show-pos-call' style='float: right' data-type='2' data-phone='"+object.agentPhone +"'></i>" : 'N/A');
                }
            },
            {
                data: 'ownerName',
                render: function (data, type, object) {
                    return (hasValue(data) ? data : 'N/A');
                }
            },
            {
                data: 'currentPhone',
                render: function (data, type, object) {
                    return (hasValue(data) ? data : 'N/A');
                }
            },
            {
                data: 'newPhone',
                render: function (data, type, object) {
                    return (hasValue(data) ? data : 'N/A');
                }
            },
            {
                data: 'createdDate',
                render: function (data, type, object) {
                    return (hasValue(data) ? moment.unix(data / 1000).format("DD/MM/YYYY HH:mm") : 'N/A');
                }
            },
            {
                data: 'isResolved',
                render: function (data, type, object, option) {
                    let html = "<div style='float: right' class='input-group-circle'>";

                    if (object.currentPhone !== object.newPhone) {
                        html +="<i class='fa fa-repeat btn-fa-circle btn-fa-circle-warning edit-owner-phone' ></i>";
                    } else {
                        html += "<i class='fa fa-check btn-fa-circle btn-fa-circle-green done-edit-owner'  ></i></div>";
                    }

                    return html;
                }
            },
            ]
    }
};
class EditOwner {
    constructor() {
        this._tableEditOwner = null;
        this.loadTable();
        this.loadEvent();
        this.phoneCall = new PhoneEditOwner();
    }

    loadTable() {
        const that = this;
        let columnEditOwner =localEditOwner.columns.requestEditOwner;
        that._tableEditOwner = $('#tb-edit-owner')
            .DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: POS_APIS_AGENTS.get('GET_EDIT_OWNER_LIST'),
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, localEditOwner.filler);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                language: DatatableHelper.languages.vn,
                columns: columnEditOwner
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                /*settings.ajax.data = function (d) {
                    console.log(d);
                    _prescreenIndexVariables.filler.sort = {
                        columnName : settings.aoColumns[settings.aaSorting[0][0]].data,
                        value : settings.aaSorting[0][1]
                    };
                    Object.assign(d, _prescreenIndexVariables.filler);
                    return d;
                };*/
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {})
            .on( 'draw', function () {
                /*if (hasValue(Window.reAssignListing)) {
                    Window.reAssignListing.reloadPage('need-to-call-listing-table');
                }*/
            });
    }

    resolve(data) {
        const that = this;
        if (!data.rlistingId || !data.agentId) {
            posNotifyAlert({type : "pos-notify-warning", message : "Không tìm thấy id hoặc môi giới. Xin vui lòng kiểm tra dữ liệu"});
            return false;
        }
        if (data.phone !== data.newPhone) {
            posNotifyAlert({type : "pos-notify-danger", message : "Bạn không thể hoàn tất yêu cầu này do vẫn chưa cập nhật lại số điện thoại"});
            return false;
        }
        showPropzyLoading();
        axios.get(POS_APIS_AGENTS.get('POST_EDIT_OWNER_RESOLVE'), {
            params: data
        }).then(response => {
            hidePropzyLoading();
            const resultsContent = response.data;
            if (!resultsContent.result) {
                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('EDIT_OWNER_RESOLVE_ERROR') + "<br> Lý do: " + resultsContent.message});
            }
            that._tableEditOwner.ajax.reload();
        }).catch(err => {
            hidePropzyLoading();
            showErrLog(err);
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('PROCESS_ERR')});
        });
    }

    loadEvent() {
        const that = this;
        $(document).off('click', '.done-edit-owner').on('click', '.done-edit-owner', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._tableEditOwner.row( tr ).data();
            const data = {
                rlistingId : row.rlistingId,
                agentId : row.agentId,
                phone : row.currentPhone,
                newPhone : row.newPhone,
            };
            ModalConfirm.showModal({
                message: "Bạn có muốn hoàn tất yêu cầu này?",
                onYes: function (modal) {
                    that.resolve(data);
                }
            });
        });
        $(document).off('click', '.edit-owner-phone').on('click', '.edit-owner-phone', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._tableEditOwner.row( tr ).data();
            const data = {
                phone : row.currentPhone,
                newPhone : row.newPhone,
                subPhones : row.subPhones,
                ownerId : row.ownerId,
                ownerName : row.ownerName,
                rlistingId : row.rlistingId,
                agentId : row.agentId,
            };
            ModalConfirm.showModal({
                message: "Cập nhật lại số điện thoại cho yêu cầu này ?",
                onYes: function (modal) {
                    that.phoneCall.updateEditOwnerPhone(data);
                }
            });
        });
    }
}

class PhoneEditOwner extends POSCall {
    constructor() {
        super();
    }

    getPhoneList() {
        const that = this;
        let phones = {
            phones : [],
            phonesAgent : [],
        };

        phones.phonesAgent.push({
            phone : that.stored.editOwnerAgentPhone,
            noteForPhone : "",
            isAgent: true,
            isPrimary: true
        });

        that.stored.phones = phones;
    }

    updateEditOwnerPhone(data) {
        const that = this;
        if (!data.ownerId) {
            // missing owner
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('EDIT_OWNER_UPDATE_PHONE_MISSING_OWNER')});
            return false;
        }
        if (!data.newPhone) {
            // missing owner
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('EDIT_OWNER_UPDATE_PHONE_MISSING_NEW_PHONE')});
            return false;
        }
        const dataPost = {
            "ownerId": data.ownerId,
            "phone": data.newPhone,
            "subPhones": hasValue(data.subPhones) ? data.subPhones : "",
        };
        // update stored in phone
        that.stored.ownerId = data.ownerId;
        that.stored.ownerName = data.ownerName;
        that.stored.editOwnerPrimaryPhone = data.newPhone;
        that.stored.editOwnerPrimaryCurrentPhone = data.phone;
        that.stored.editOwnerPrimarySubPhone = hasValue(data.subPhones) ? data.subPhones : "";
        that.stored.editOwnerRlistingId = data.rlistingId;
        that.stored.editOwnerAgentId = data.agentId;
        that.changePhoneNumber(dataPost);
    }
    /**
     * overide funcion changePhoneNumber in merg list
     */
    async changePhoneNumber(data) {
        console.log(data);
        const that = this;
        let response = null;
        // hide modal show listing live (if exits)
        $(that.ids.posModalCallLiveListing).modal('hide');

        // call api update phone number
        showPropzyLoading();
        await axios.post(POS_APIS_COMMON.get('UPDATE_PHONE_NUMBER'), data)
            .then(xhr => {
                hidePropzyLoading();
                response = xhr.data;
            })
            .catch(err => {
                console.error(err);
            });
        // check response;
        if(response.result) {
            posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get('EDIT_OWNER_UPDATE_PHONE_SUCCESS')});
            const dataResolve = {
                rlistingId : that.stored.editOwnerRlistingId,
                agentId : that.stored.editOwnerAgentId,
                phone : that.stored.editOwnerPrimaryPhone,
                newPhone : that.stored.editOwnerPrimaryPhone,
            };
            Window.editOwner.resolve(dataResolve);
        } else {
            if (response.code == 403) {
                // get list live listing  on systems
                that.getListLiveListingOfOwner();
            } else {
                // system error 500
                posNotifyAlert({type: "pos-notify-danger", message : response.message});
            }
        }
    }

    /**
     * overide funcion getPhonesList in merg list
     */
    getPhonesList() {
        const that = this;
        return {
            primary : that.stored.editOwnerPrimaryPhone,
            subPhone : that.stored.editOwnerPrimarySubPhone
        };
    }
    /**
     * overide funcion getPhonePrimary in get list
     */
    getPhonePrimary () {
        const that = this;
        return that.stored.editOwnerPrimaryPhone;
    }

    /**
     * overide function showPosCallModal (not show modal)
     */
    showPosCallModal() {
        // nothing
    }

    eventHandleOpenPosCall() {
        const that = this;
        $(document).off('click', that.ids.btnShowPosCall).on('click', that.ids.btnShowPosCall, function (e) {
            e.preventDefault();
            that.stored.typeOfPhone = Number.parseInt($(this).data("type"));
            that.stored.phoneCall = $(this).data("phone");
            //that.showPosCallModal();
            that.stored.hasTrackCall = true;
            that.initACall();
        });
    }
}

$(document).ready(function () {
    Window.editOwner = new EditOwner();
});