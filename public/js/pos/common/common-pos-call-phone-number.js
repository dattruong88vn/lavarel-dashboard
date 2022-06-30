
/**
 * common for call
 * @author barry
 * date : 31/08/2018
 * version 1.0
 */

// change log
/*
v1 : refactor call sa and prescreen
 */

// codes class for call
class POSCall {
    constructor () {

        // stored information of phones
        this.stored = {
            phones : {
                phones : [],
                phonesAgent : []
            },
            backupPhone : {
                phoneSub : [],
                phonePrimary : {
                    phone : '',
                    noteForPhone : '',
                }
            },
            typeOfPhone : 1, // owner// 2 agent,
            ownerId: null,
            ownerName : null,
            agentId : null,
            id : null,
            department : null, // 1 for pre, 2 for sa
            hasTrackCall : false, // true or false
            crawlerStatus : 3, // for agent
            phoneCall : null,
            tableLiveListingSa : null,
            tableLiveListingPre : null,
            isAdmin : hasValue(currentUser.departments) && currentUser.departments.length > 0 && currentUser.departments[0].isGroupAdmin,
            typePage : 1, // 1 : create , 2 : detail , 3 : view
            listCancelSa : new Set(),
            listCancelPre : new Set(),
            listOwners : new Map()
        };
        // check is Calling
        this.isCalling = false;
        this.ids = {
            posModalCall : "#pos-phone-call-modal",
            posModalCallLiveListing: '#pos-phone-listing-modal',
            posModalCallCancelListing : '#pos-phone-cancel-modal',
            tbLiveListingSa : "#tb-phone-live-listing-sa",
            tbLiveListingPre : "#tb-phone-live-listing-pre",
            btnCall : '.make-call-action',
            btnShowPosCall : '.show-pos-call',
        };

        this.addStoreBackup();
        this.events();

    }

    /**
     * updateStored
     * backup phone when loading
     * when extend class need define funcion again
     *
     */
    updateStored() {
        // overide update stored
    }

    /**
     * updateOwner
     * backup phone when loading
     * when extend class need define funcion again
     *
     */
    updateOwner() {
        // overide update stored
    }
    /**
     * addStoreBackup
     * backup phone when loading
     * when extend class need define funcion again
     *
     */
    addStoreBackup() {
        const backup = $.extend(true, {}, {
            phoneSub :  [],
            phonePrimary : {
                phone : [],
                noteForPhone : [],
            }
        });
        this.stored.backupPhone = backup;
        this.stored.ownerId = null;
    }
    /**
     * getPhoneList
     * get list phone and add into stored
     * when extend class need define funcion again
     *
     */

    getPhoneList() {
        let phones = {
            phones : [],
            phonesAgent : [],
        };
        this.stored.phones = phones;
    }

    /**
     * renderPosModal
     * render html in popup pos call modal
     *
     */
    renderPosModal() {
        const that = this;
        that.getPhoneList();
        const settings = {
            isShowPhone : that.stored.typeOfPhone,
            phones :  that.stored.phones.phones,
            phonesAgent:  that.stored.phones.phonesAgent
        };

        // call funtion posPhoneCallRender from common-pos.js
        posPhoneCallRender(settings);
    }
    /**
     * show pos modal call
     * render html in popup pos call modal
     *
     */
    showPosCallModal() {
        const that = this;
        that.updateStored();
        // check click button call agent or owner
        if ([1, 2].indexOf(that.stored.typeOfPhone) > -1 ) {
            if (that.stored.typeOfPhone === 2 && that.stored.crawlerStatus == 3 && !hasValue(that.stored.agentId)) {
                //showPropzyAlert('Bạn chưa chọn agent');
                //return false;
            }
            //disabled btn
            that.showBtn();

            // add list phone
            that.renderPosModal();

            // check modal not show
            if (!$(that.ids.posModalCall).hasClass('in'))  {
                $(that.ids.posModalCall).modal();
            }
            that.bindPhoneBasic();

        } else {
            // showPropzyAlert('Bạn chưa chọn agent');
            showErrLog(that.stored.typeOfPhone + ": not agent or owner [1, 2]");
            return false;
        }
    }

    callToPhoneNumber() {
        const that = this;
        $(that.ids.posModalCall).modal("hide");
        const params = {
            phoneNumber : that.stored.phoneCall,
            showLoading : false,
            department:that.stored.department,
            id:that.stored.id,
            onCallEnded : (callInfo) => {
                that.isCalling = false;
                if(isVal(that.stored.hasTrackCall)) {
                    // get CCall info
                    let dataTrack = {
                        duration: callInfo.duration,
                        phone: callInfo.number,
                        startedDate: callInfo.startTime * 1000,
                        endedDate: (hasValue(callInfo.endTime) ? callInfo.endTime : moment().unix()) * 1000,
                        statusId: callInfo.statusId,
                        recordLink: null,
                        id : that.stored.id,
                        department : that.stored.department,
                        propzyCallId: $("#propzyCallId").val() ? $("#propzyCallId").val() : null
                    };

                    // get link track call
                    CCall.getCallInfo({
                        callId: callInfo.id, callBack: function (res) {
                            if (isVal(res)) {
                                if (isVal(res.response)) {
                                    // _callInfo.recordLink = res.response["0"].Cdr.recording_file;
                                }
                            }
                            axios.post(POS_APIS_COMMON.get('WRITE_TRACK_CALL'), dataTrack).then(res => {

                            }).catch(re => {

                            });
                        }
                    });
                }
            }
        };

        // call
        CCall.makeCall(params);
    }

    initACall() {
        const that = this;
        that.isCalling = true;

        console.log(that.stored.phoneCall);

        $(that.ids.posModalCall).hide();

        if (isVal(that.stored.phoneCall)) {
            that.callToPhoneNumber();
        } else {
            return false;
        }
    }


    // some functions helps
    /**
     * show or hide buttons in pos call modal
     */
    showBtn() {
        // disable btn
        $("#btn-pos-revert-phones").hide();
        $("#btn-pos-update-phones").hide();
        $("#btn-check-duplicated-phone").hide();
        // disable btn
        if (this.stored.typeOfPhone === 1) {
            $("#btn-check-duplicated-phone").show();

            if (this.stored.typePage === 2) {
                $("#btn-pos-revert-phones").show();
                $("#btn-pos-update-phones").show();
            }
        }
    }

    /**
     * add event for some fields phone number (only input number)
     */
    bindPhoneBasic() {
        $('.pos-phone-call-new-input-number').phoneBasic();
        $('.pos-phone-call-input-number').phoneBasic();
        $('.pos-phone-call-input-number-primary').phoneBasic();
    }

    hasChangePhone() {
        const that = this;
        that.getPhoneList();
        let hasChange = false;
        let hasChangeSub = false;
        let phoneChange = {
            phonePrimaryOld : null,
            phonePrimaryNew : null,
            phoneSubOld : null,
            phoneSubNew : null,
        };

        // check primary phone
        phoneChange.phonePrimaryOld = that.stored.backupPhone.phonePrimary.phone;
        phoneChange.phoneSubOld = that.stored.backupPhone.phoneSub.map(it => it.phoneSub);
        const primary = that.stored.phones.phones.find(it=> it.isPrimary);
        if (hasValue(primary) && primary.phone != that.stored.backupPhone.phonePrimary.phone) {
            hasChange = true;
        }
        phoneChange.phonePrimaryNew = primary.phone;

        // check subphone
        const subPhone = that.stored.phones.phones.filter(it=> {
            if (!it.isPrimary) {
                return $.trim(it.phone);
            }
        });

        // check remove or add new subphone
        if (subPhone.length != that.stored.backupPhone.phoneSub.length) {
            hasChangeSub = true;
        }
        // check chang number in subphone

        const subPhoneChange = subPhone.map(it=> it.phone);
        const hasChangeS = that.stored.backupPhone.phoneSub.filter(it => {
            if (subPhoneChange.indexOf(it.phoneSub) === -1) {
                return it;
            }
        });

        if (hasChangeS.length > 0) {
            hasChangeSub = true;
        }
        phoneChange.phoneSubNew = subPhoneChange;
        if (hasChangeSub) {
            hasChange = true;
            // push
        }

        return {
            hasChange : hasChange,
            phoneChange : phoneChange
        };
    }

    showValidFeild(elm) {
        $("#area-err").html("");
        $(".is-danger").removeClass("is-danger");

        const phone = $(elm).val();
        if (!hasValue(phone) || !isPhoneNumber(phone) || phone.charAt(0) != 0) {
            $('input[type="text"][value="'+phone+'"]').parent(".radio").find(".cr").addClass("is-danger")
            $("#area-err").html("<span>Số điện thoại không hợp lệ</span>");
        }
    }

    validatePhone() {
        let valid = false;
        let message = "";

        const that = this;
        that.stored.phones.phones.forEach(it => {
            if (it.isPrimary) {
                if (!hasValue(it.phone) || !isPhoneNumber(it.phone) || it.phone.charAt(0) != "0") {
                    valid = true;
                    message = "Số điện thoại chính không hợp lệ";
                    return false;
                }
            } else {
                if (!hasValue(it.phone) || !isPhoneNumber(it.phone) || it.phone.charAt(0) != "0") {
                    valid = true;
                    message = "Số điện thoại "+ it.phone +" chính không hợp lệ";
                    return false;
                }
            }
        });

        return {
            valid : valid,
            message : message
        };
    }


    /**
     * function call check update new phone number
     */
    updateNewPhoneNumber() {
        const that = this;
        // has value of ownerId and page is edit
        if (hasValue(that.stored.ownerId) && that.stored.typePage == 2) {
            that.getPhoneList();
            const hasChange = that.hasChangePhone();
            const validate = that.validatePhone();

            // check valid phone
            if (validate.valid) {
                posNotifyAlert({type: "pos-notify-warning", message : validate.message});
                return false;
            }

            // check has change phone number
            if (hasChange.hasChange) {
                let html = "";
                const phoneChange = hasChange.phoneChange;
                html += "<br>" +
                    "<b>Số chính mới </b>" +
                    "<p>" + phoneChange.phonePrimaryNew + "</p>";
                html += "<br>" +
                    "<b>Số phụ mới</b>" +
                    "<p>" + phoneChange.phoneSubNew.join(", ") + "</p>";
                ModalConfirm.showModal({
                    message: "Bạn có chắc muốn cập nhật lại số điện thoại ? " + html,
                    onYes: function (modal) {
                        const data = {
                            "ownerId": that.stored.ownerId,
                            "phone": hasValue(phoneChange.phonePrimaryNew) ? phoneChange.phonePrimaryNew : phoneChange.phonePrimaryOld,
                            "subPhones": hasValue(phoneChange.phoneSubNew) ? phoneChange.phoneSubNew.join(',') : "",
                        };
                        that.changePhoneNumber(data);
                    }
                });
            } else {
                posNotifyAlert({type: "pos-notify-warning", message : POS_MESSAGE.get('UPDATE_PHONE_OWNER_FAIL_BY_NOT_CHANGE')});
                return false;
            }
        } else {
            posNotifyAlert({type: "pos-notify-warning", message : POS_MESSAGE.get('UPDATE_PHONE_OWNER_FAIL_BY_NOT_ACCESS')});
            return false;
        }
    }

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
            //that.addStoreBackup();
            //that.showPosCallModal();
            posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get('UPDATE_PHONE_OWNER_SUCCESS')});

            // refesh
            setInterval(() => {
                location.reload();
            }, 3000);
        } else {
            if (response.code == 403) {
                // get list live listing  on systems
               that.getListLiveListingOfOwner();
               // posNotifyAlert({type: "pos-notify-info", message : response.message});
            } else {
                // system error 500
                posNotifyAlert({type: "pos-notify-danger", message : response.message});
            }
        }
    }
    async mergeListing() {
        const  that = this;
        if (that.stored.listOwners.size > 0 && isVal(that.stored.ownerId)) {
            let html = '<div class="form-group"><label class="radio control-label"><input type="radio" class="pos-phone-call-choose-owner" name="pos-phone-call-choose-owner" checked value="'+ that.stored.ownerId +'" data-name="'+ that.stored.ownerName +'"><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label><p>'+that.stored.ownerName +'('+ that.stored.ownerId+')'+'</p></div>';

            that.stored.listOwners.forEach((val, key, map) => {
                html += '<div class="form-group"><label class="radio control-label"><input type="radio" class="pos-phone-call-choose-owner" name="pos-phone-call-choose-owner" value="'+ key +'" data-name="'+val+'"><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label><p>'+ val +'('+ key+')'+'</p></div>';

            });

            ModalConfirm.showModal({
                message: "Bạn có muốn gom toàn bộ listing của các chủ nhà thành một ? . Vui lòng chọn một chủ nhà chính" + html,
                onYes: function (modal) {

                    const ownerId = $('.pos-phone-call-choose-owner:checked').val();
                    const ownerName = $('.pos-phone-call-choose-owner:checked').data('name');
                    let ownerIdFrom = [];
                    $('.pos-phone-call-choose-owner:not(:checked)').each(function (i, val) {
                        ownerIdFrom.push($(val).val());
                    });
                    ownerIdFrom = ownerIdFrom.join(",")
                    const data = {
                        "ownerIdFromList": ownerIdFrom,
                        "ownerIdTo": ownerId
                    };
                    showPropzyLoading();
                    axios.post(POS_APIS_COMMON.get('MERGE_LISTING_OF_OWNER'), data)
                        .then(xhr => {
                            hidePropzyLoading();
                            const response = xhr.data;
                            if(response.result) {
                                // set owner store
                                that.stored.ownerId = ownerId;
                                that.stored.ownerName= ownerName;
                                // update owner in page
                                that.updateOwner();
                                //


                                // update phone number
                                const phones = that.getPhonesList();
                                let primary = phones.primary;
                                let subPhone = phones.subPhone;
                                posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get('MERGE_LISTING_BY_PHONE_SUCCESS')});
                                if (hasValue(primary)) {
                                    //primary = primary.phone;
                                    const data = {
                                        "ownerId": that.stored.ownerId,
                                        "phone": primary,
                                        "subPhones": subPhone,
                                    };
                                    that.changePhoneNumber(data);
                                } else {
                                    posNotifyAlert({type: "pos-notify-warning", message : POS_MESSAGE.get('MISSING_PRIMARY_PHONE_NUMBER')});
                                    $(that.ids.posModalCallLiveListing).modal('hide');
                                    that.showPosCallModal();
                                }
                            } else if (response.code == 504) {
                                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('UPDATE_PHONE_OWNER_FAIL_BY_OWNER_DEACTIVE')});

                                // refesh
                                setInterval(() => {
                                    location.reload();
                                }, 3000);
                            } else {
                                posNotifyAlert({type: "pos-notify-danger", message : response.message});
                            }
                        })
                        .catch(err => {
                            hidePropzyLoading();
                            showErrLog(err);
                            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('PROCESS_ERR')});
                        });

                    // check response;
                }
            });
        } else {

        }
    }

    async cancelListing(option) {

        let options = {
            listIds : "",
            type : 1,
        }
        $.extend(options, option);
        const that = this;


        const listIds = options.listIds;
        const type = options.type;
        if (!listIds) {
            posNotifyAlert({type: "pos-notify-info", message : POS_MESSAGE.get('CANCEL_LISTING_BY_PHONE_IS_EMPTY')});
            return false;
        }

        const reason = $.trim($('#txt-note-cancel-listing-by-phone').val());

        if (!reason) {
            posNotifyAlert({type: "pos-notify-info", message : POS_MESSAGE.get('CANCEL_LISTING_BY_PHONE_VALID_REASON')});
            return false;
        }

        // show popup choose reason

        let dataRequest = {};
        if(type == 1) {
            dataRequest = {
                listIds : listIds,
                statusId : 50, // lý do khác,
                type : 1,
                reasonContent :  "Thay đổi số điện thoại - " + reason
            };
        }

        if (type == 2) {
            dataRequest = {
                listIds : listIds,
                statusId : 5, // hủy,
                reasonId : 169, // lý do khác
                reasonContent :  "Thay đổi số điện thoại - " + reason ,
                type: 2,
            };
        }
        // doing

        let result = null;
        showPropzyLoading();
        await axios.post(POS_APIS_COMMON.get('CANCEL_LISTING_BY_CHANG_PHONE'), dataRequest)
            .then(xrh => {
                hidePropzyLoading();
                result = xrh.data;
            })
            .catch(err => {
                showErrLog(err);
            });

        // check result;
        if (result && result.result) {
            // hide modal reason;
            $(that.ids.posModalCallCancelListing).modal('hide');
            // show notify alert
            posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get('CANCEL_LISTING_BY_PHONE_IS_SUCCESS')});

            // update phone number
            const phones = that.getPhonesList();
            let primary = phones.primary;
            let subPhone = phones.subPhone;
            if (hasValue(primary)) {
                const data = {
                    "ownerId": that.stored.ownerId,
                    "phone": primary,
                    "subPhones": subPhone,
                };
                that.changePhoneNumber(data);
            } else {
                posNotifyAlert({type: "pos-notify-warning", message : POS_MESSAGE.get('MISSING_PRIMARY_PHONE_NUMBER')});
                $(that.ids.posModalCallLiveListing).modal('hide');
                that.showPosCallModal();
            }
        } else {
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('CANCEL_LISTING_BY_PHONE_IS_ERROR')});
        }
    }



    getPhonePrimary() {
        // get primary phone to get list live listing (new phone to change)
        return this.stored.phones.phones.filter(it => it.isPrimary)[0].phone;
    }

    getPhonesList() {
        const that = this;
        let primary = that.stored.phones.phones.find(it=> {
            if (it.isPrimary) {
                return $.trim(it.phone);
            }
        });
        let subPhone = that.stored.phones.phones.filter(it=> {
            if (!it.isPrimary) {
                return $.trim(it.phone);
            }
        }).map(it=> it.phone);

        return {
            primary : primary.phone,
            subPhone : hasValue(subPhone) ? subPhone.join(',') : ""
        };
    }


    getListLiveListingOfOwner() {
        const that = this;

        $(that.ids.posModalCallLiveListing).modal();
        $(that.ids.posModalCall).modal('hide');
        // reset

        that.stored.listOwners.clear();
        that.stored.listCancelPre.clear();
        that.stored.listCancelSa.clear();

        try {
            that.stored.tableLiveListingSa.destroy();
        } catch (e) {
            console.log('destroy-fail');
        }
        try {
            that.stored.tableLiveListingPre.destroy();
        } catch (e) {
            console.log('destroy-fail-pre');
        }
        const columsPre = [
            {
                data: 'action',
                width: "50px",
                render: function (data, type, object) {
                    const action = '<label class="checkbox control-label"><input type="checkbox" class="pos-phone-list-live-listing-checkbox-pre" value="'+object.id+'"><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label>';
                    if (that.stored.isAdmin || object.isAllowEdit) {
                        return action;
                    }
                    return null;
                }
            },
            {
                data: 'id',
                width: "50px",
                render: function (data, type, object) {
                    const id = (hasValue(object.id) ? '<a href="/pos/prescreener/detail/' + object.id + '" target="_blank">' + object.id + '</a>' : 'N/A');
                    return id;
                }
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    const address = (hasValue(object.address) ? object.address : 'N/A');
                    return address;
                }
            },
            {
                data: 'name',
                width: "160px",
                render: function (data, type, object) {
                    that.stored.listOwners.set(object.ownerId, object.name);
                    const name = (hasValue(object.name) ? object.name : 'N/A');
                    return name;
                }
            },
            {
                data: 'assigned',
                width: "160px",
                render: function (data, type, object) {

                    return (hasValue(object.assignedName) ? object.assignedName : 'N/A');;
                }
            },
        ];
        const columsSa = [
            {
                data: 'action',
                width: "50px",
                render: function (data, type, object) {
                    const action = '<label class="checkbox control-label"><input type="checkbox" class="pos-phone-list-live-listing-checkbox-sa" value="'+object.id+'"><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label>';
                    if (that.stored.isAdmin || object.isAllowEdit) {
                        return action;
                    }
                    return null;
                }
            },
            {
                data: 'id',
                width: "50px",
                render: function (data, type, object) {
                    const id = (hasValue(object.id) ? '<a href="/pos/sa/detail/' + object.id + '" target="_blank">' + object.id + '</a>' : 'N/A');
                    return id;
                }
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    const address = (hasValue(object.address) ? object.address : 'N/A');
                    return address;
                }
            },
            {
                data: 'name',
                width: "160px",
                render: function (data, type, object) {
                    that.stored.listOwners.set(object.ownerId, object.name);
                    const name = (hasValue(object.name) ? object.name : 'N/A');
                    return name;
                }
            },
            {
                data: 'assigned',
                width: "160px",
                render: function (data, type, object) {

                    return (hasValue(object.assignedName) ? object.assignedName : 'N/A');;
                }
            },
        ];
        that.stored.tableLiveListingSa = $(that.ids.tbLiveListingSa)
            .DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: POS_APIS_COMMON.get('GET_LIVE_LISTING_BY_PHONE'),
                    type: 'POST',
                    data: {
                        type : 1, // sa
                        phone : that.getPhonePrimary(),
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                order: [[2, 'desc']],
                pageLength : 100,
                language: DatatableHelper.languages.vn,
                columns: columsSa
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {
                $('#pos-phone-listing-label-sa').html(json.recordsTotal);
            })
            .on( 'draw', function () {});

        that.stored.tableLiveListingPre = $(that.ids.tbLiveListingPre)
            .DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: POS_APIS_COMMON.get('GET_LIVE_LISTING_BY_PHONE'),
                    type: 'POST',
                    data: {
                        type : 2, // pre
                        phone : that.getPhonePrimary(),
                        length : 100
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                pageLength : 100,
                order: [[2, 'desc']],
                language: DatatableHelper.languages.vn,
                columns: columsPre
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {
                $('#pos-phone-listing-label-pre').html(json.recordsTotal);
            })
            .on( 'draw', function () {});
    }

    /**
     * Add events for buttons in ppos call modal
     */

    events () {
        this.eventHandleOpenPosCall();
        this.eventHandleClickCall();
        this.eventHandleClickCloseModalPos();
        this.eventHandleClickUpdatePhone();
        this.eventHandleClickAddPhone();
        this.eventHandleClickRemovePhone();
        this.eventHandleClickSetPrimary();
        this.eventHandleClickResetPhone();
        this.eventHandleChangePhoneNumber();
        this.eventHandleClickMergListing();
        this.eventHandleClickCancelListing();
        this.eventHandleClickSendCancelListing();
    }
    eventHandleOpenPosCall() {
        const that = this;
        $(document).off('click', that.ids.btnShowPosCall).on('click', that.ids.btnShowPosCall, function (e) {
            e.preventDefault();
            that.stored.typeOfPhone = Number.parseInt($(this).data("type"));
            that.showPosCallModal();
        });
    }
    eventHandleClickCall() {
        const that = this;
        $(document).off('click', that.ids.btnCall).on('click', that.ids.btnCall, function (e) {
            e.preventDefault();
            const phone = $(this).parents(".form-group").find(".pos-phone-list").val();
            that.stored.phoneCall = phone;
            that.initACall();
        });
    }
    eventHandleClickCloseModalPos() {
        const that = this;
        $(document).on("click", "#btn-pos-close-phone", function (e) {
            $(that.ids.posModalCall).modal("hide");
            /*const hasChange = hasChangePhone();
            if (hasChange.hasChange) {
                showPropzyAlert("Bạn đã thay đổi số điện thoại nhưng vẫn chưa cập nhật lại trên hệ thống !");
            } else {
                $(_this.phoneListModalId).modal("hide");
            }*/
        });
    }
    eventHandleClickUpdatePhone() {
        const that = this;
        $(document).on("click", "#btn-pos-update-phones", function (e) {
            // update
            that.updateNewPhoneNumber();

        });
    }
    eventHandleClickMergListing() {

        const that = this;
        $(document).on("click", "#btn-pos-phone-merge-listing", function (e) {
            // update
            that.mergeListing();

        });
    }
    eventHandleClickCancelListing() {

        const that = this;
        $(document).on("click", "#btn-pos-phone-cancel-listing", function (e) {
            // reset reason
            $('#txt-note-cancel-listing-by-phone').val('');
            // update

            // get tab active // pre or sa
            const tab = $('.pos-phone-listing-tab.active').data('type');

            if( tab != 1 && tab != 2) {
                //posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('PROCESS_ERR')});
                return false;
            }
            // get listing need cancel
            let listIds = [];
            if (tab == 1) {
                // pre
                 $('.pos-phone-list-live-listing-checkbox-pre:checked').each((i, v) => {
                    listIds.push(v.value);
                });
            } else {
                 $('.pos-phone-list-live-listing-checkbox-sa:checked').each((i, v) => {
                    listIds.push(v.value);
                });
            }
            if (listIds.join()) {
                $(that.ids.posModalCallCancelListing).modal();
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('CANCEL_LISTING_BY_PHONE_IS_EMPTY')});
            }

        });
    }
    eventHandleClickSendCancelListing() {

        const that = this;
        $(document).on("click", "#btn-pos-phone-cancel-listing-send", function (e) {
            // update
            const tab = $('.pos-phone-listing-tab.active').data('type');
            let listIds = [];
            if (tab == 1) {
                // pre
                $('.pos-phone-list-live-listing-checkbox-pre:checked').each((i, v) => {
                    listIds.push(v.value);
                });
            } else {
                $('.pos-phone-list-live-listing-checkbox-sa:checked').each((i, v) => {
                    listIds.push(v.value);
                });
            };
            const data = {
                type : tab,
                listIds : listIds.join()
            }
            that.cancelListing(data);

        });
    }

    /**
     * some event should be override
     */

    eventHandleClickAddPhone() {
        // todo override eventHandldeClickAddPhone here
    }
    eventHandleClickRemovePhone() {
        // todo override eventHandleClickRemovePhone here
    }
    eventHandleClickSetPrimary() {
        // todo override eventHandleClickSetPrimary here
    }
    eventHandleClickResetPhone() {
        // todo override eventHandleClickResetPhone here
    }
    eventHandleChangePhoneNumber() {
        // todo override eventHandleChangePhoneNumber here
    }
}
