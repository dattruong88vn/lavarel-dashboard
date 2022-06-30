class PreCall extends POSCall {
    constructor() {
        super();
    }

    updateStored() {
        const that = this;
        Window.globalVar.listingDetail.loadDataPost();
        //typePage
        that.stored.typePage = 2;
        // owner, agent and rlistingId

		const owner = Window.globalVar.listingDetail.data.owner;
        const agent = Window.globalVar.listingDetail.data.agent;
        that.stored.ownerId = null;
        that.stored.agentId = null;
        if (isVal(owner) && isVal(owner.ownerId)) {
            that.stored.ownerId = owner.ownerId;
            that.stored.ownerName = owner.name;
		}
        if (isVal(agent)) {
            that.stored.agentId = agent.info.agentId;
        }
        that.stored.id = Window.jsDetailData.id;

        // department pre default is 1 code;
        that.stored.department = 1;

        // set crawler status
        that.stored.crawlerStatus = Window.globalVar.listingDetail.data.crawlerStatus;
        // set write track call
        that.stored.hasTrackCall = false;

    }


    getPhoneList() {
        const that = this;
        let phones = {
            phones : [],
            phonesAgent : [],
        };

        var owner = Window.globalVar.listingDetail.data.owner;
        var agent = Window.globalVar.listingDetail.data.agent;
        // get phones Agent
        if(that.stored.crawlerStatus == 3 & isVal(agent)) {
            agent = agent.info;
            phones.phonesAgent.push({
                phone : agent.phone,
                noteForPhone : agent.noteForPhone,
                isAgent: true,
                isPrimary: true
            });
        }

        //get phone owner
        if (isVal(owner) && isVal(owner.phone)) {
            phones.phones.push({
                phone : owner.phone,
                noteForPhone : owner.noteForPhone,
                isAgent: false,
                isPrimary: true
            });
        }

        // get subphone owner

        let  sPhones = [];
        if (isVal(owner)) {
            sPhones = owner.phones;
        }
        sPhones.forEach(it => {
            phones.phones.push({
                phone : it.phoneSub,
                noteForPhone : it.noteForPhone,
                isAgent: false,
                isPrimary: false,
                isNew : isVal(it.isNew) ? it.isNew : false,
            });
        });
        that.stored.phones = phones;
    }

    updateOwner() {

	}

    addStoreBackup() {
        const that = this;
        const owner = Window.jsDetailData.owner;

        if (isVal(owner)) {
            const backup = $.extend(true, {}, {
                phoneSub :  owner.phones,
                phonePrimary : {
                    phone : owner.phone,
                    noteForPhone :owner.noteForPhone,
                }
            });
            that.stored.backupPhone = backup;
		}

	}

    /**
     * overide event
     */

    eventHandleClickAddPhone() {
        const that = this;
        $(document).on("click", "#btn-pos-phone-call-add", function (e) {
            e.preventDefault();
            const phone = $("#pos-phone-call-new-input-number").val();
            if (!isVal(phone) || !isPhoneNumber(phone)) {
                showPropzyAlert('Số điện thoại chưa đúng định dạng');
                return false;
            }

            const data = {
                phoneSub: phone,
                isNew : true,
                noteForPhone : $("#pos-phone-call-new-input-note").val()
            };
            // add subphone to sa data
            $.merge(Window.globalVar.listingDetail.data.owner.phones, [data]);
            // show again popup call
            that.showPosCallModal();

            // reset
            $("#pos-phone-call-new-input-number").val("");
            $("#pos-phone-call-new-input-note").val("");
        });
    }

    eventHandleClickRemovePhone() {
        const that = this;
        $(document).on("click", "#btn-pos-phone-call-remove", function (e) {
            if($(".pos-phone-call-checkbox").is(":checked")) {
                $(".pos-phone-call-checkbox:checked").each(function () {
                    $(this).parents(".form-inline").remove();
                });
                let phones = [];
                $(".pos-phone-call-input-number").each(function () {
                    let obj = {
                        phoneSub : $(this).val(),
                        noteForPhone : $(this).parents('.form-inline').find(".pos-phone-call-input-note").val()
                    };
                    phones.push(obj);
                });
                Window.globalVar.listingDetail.data.owner.phones = phones;
                that.showPosCallModal();
            } else {
                showPropzyAlert('Không có số điện thoại nào được chọn để xóa');
                console.log("non checked");
            }
        });
    }

    eventHandleClickSetPrimary() {
        const that = this;
        $(document).on("click", ".btn-pos-phone-call-set-primary", function (e) {
            const phone = $(this).parents('.form-inline').find(".pos-phone-call-input-number").val();
            const notForPhone = $(this).parents('.form-inline').find(".pos-phone-call-input-note").val();

            const owner = Window.globalVar.listingDetail.data.owner;
            const phones = owner.phones;
            const phoneP = owner.phone;
            const notForPhoneP = owner.noteForPhone;
            const newPhones = phones.map(it => {
                let ob = {
                    phoneSub : it.phoneSub,
                    noteForPhone : it.noteForPhone
                }
                if (it.phoneSub == phone) {
                    ob.phoneSub = phoneP;
                    ob.noteForPhone = notForPhoneP;
                }
                return ob;
            });
            Window.globalVar.listingDetail.data.owner.phones = newPhones;
            Window.globalVar.listingDetail.data.owner.noteForPhone = notForPhone;
            Window.globalVar.listingDetail.data.owner.phone = phone;
            that.showPosCallModal();
            $('#phone').val(phone);
        });
    }
    eventHandleClickResetPhone() {
        const that = this;
        $(document).on("click", "#btn-pos-revert-phones", function (e) {
            ModalConfirm.showModal({
                message: "Bạn có chắc hủy cập nhật số điện thoại",
                onYes: function (modal) {
                    const backup = $.extend(true, {}, that.stored.backupPhone);
                    Window.globalVar.listingDetail.data.owner.phones = backup.phoneSub;
                    Window.globalVar.listingDetail.data.owner.noteForPhone = backup.phonePrimary.noteForPhone;
                    Window.globalVar.listingDetail.data.owner.phone = backup.phonePrimary.phone;
                    that.showPosCallModal();
                }
            });

        });
    }
    eventHandleChangePhoneNumber() {
        const that = this;
        $(document).on("change", ".pos-phone-call-input-note", function () {
            const note = $(this).val();
            const oldPhone = $(this).parents('.form-inline').find(".pos-phone-call-input-number").val();
            // change subphone
            const owner = Window.globalVar.listingDetail.data.owner;
            const phones = owner.phones;
            const newPhones = phones.map(it => {
                let obj = {
                    phoneSub : it.phoneSub,
                    noteForPhone : it.noteForPhone
                };
                if(it.phoneSub == oldPhone) {
                    obj.noteForPhone = note;
                }
                return obj;
            });
            Window.globalVar.listingDetail.data.owner.phones = newPhones;
        });


        $(document).on("change", ".pos-phone-call-input-note-primary", function () {
            const note = $(this).val();
            Window.globalVar.listingDetail.data.owner.noteForPhone = note;
        });

    }

}
$(document).ready(function () {
    Window.preCall = new PreCall();
});