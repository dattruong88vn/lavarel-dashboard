class SACallNew extends POSCall {
    constructor () {
        super();
    }

    /**
     * overide updateStored
     */
    updateStored() {
        const that = this;
        //typePage
        if (Window.jsRole == 'edit') {
            that.stored.typePage = 2;
        }
        if (Window.jsRole == 'view') {
            that.stored.typePage = 3;
        }
        if (Window.jsRole == 'create') {
            that.stored.typePage = 1;
        }
        // owner, agent and rlistingId
        const socialCommunication = Window.sa.data.socialCommunication();
        that.stored.ownerId = hasValue(socialCommunication.ownerId) ? socialCommunication.ownerId : null;
        that.stored.ownerName = hasValue(socialCommunication.name) ? socialCommunication.name : null;
        that.stored.agentId = Window.sa.data.agentId();
        that.stored.id = Window.sa.data.rlistingId();

        // department sa default is 2 code;
        that.stored.department = 2;

        // set crawler status
        that.stored.crawlerStatus = Window.sa.data.crawlerStatus();
        // set write track call
        that.stored.hasTrackCall = true;

    }
    /**
     * overide updateOwner
     */
    updateOwner() {
        const that = this;
        let socialCommunication = Window.sa.data.socialCommunication();
        if(hasValue(that.stored.ownerId)) {
            socialCommunication.ownerId = that.stored.ownerId;
            socialCommunication.name = that.stored.ownerName;
        }
    }

    /**
     * overide addStoreBackup
     */

    addStoreBackup() {
        const that = this;
        const social = (hasValue(Window.jsDetailData.socialCommunications) && Window.jsDetailData.socialCommunications.length > 0) ? Window.jsDetailData.socialCommunications : [];
        if (social.length > 0) {
            const backup = $.extend(true, {}, {
                phoneSub :  social[0].phones,
                phonePrimary : {
                    phone : social[0].phone,
                    noteForPhone :social[0].noteForPhone,
                }
            });

            that.stored.backupPhone = backup;

        }
    }

    /**
     * overide getPhoneList
     */
    getPhoneList() {
        const that = this;
        let phones = {
            phones : [],
            phonesAgent : [],
        };

        // get phones Agent
        if(that.stored.crawlerStatus == 3) {
            phones.phonesAgent.push({
                phone : Window.sa.data.phoneAgent(),
                noteForPhone : Window.sa.data.noteForPhoneAgent(),
                isAgent: true,
                isPrimary: true
            });
        }

        //get phone owner
        if (isVal(Window.sa.data.phone())) {
            phones.phones.push({
                phone : Window.sa.data.phone(),
                noteForPhone : Window.sa.data.noteForPhone(),
                isAgent: false,
                isPrimary: true
            });
        }

        // get subphone owner

        const sPhones = Window.sa.data.phones();

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
            $.merge(Window.sa.data.phones(), [data]);

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
                Window.sa.data.phones(phones);
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
            const phones = Window.sa.data.phones();
            const phoneP = Window.sa.data.phone();
            const notForPhoneP = Window.sa.data.noteForPhone();
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
            Window.sa.data.phones(newPhones);
            Window.sa.data.noteForPhone(notForPhone);
            Window.sa.data.phone(phone);
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
                    Window.sa.data.phones(backup.phoneSub);
                    Window.sa.data.phone(backup.phonePrimary.phone);
                    Window.sa.data.noteForPhone(backup.phonePrimary.noteForPhone);
                    that.showPosCallModal();
                }
            });

        });
    }
    eventHandleChangePhoneNumber() {
        const that = this;
        $(document).on("change", ".pos-phone-call-input-number", function () {
            let phones = [];
            $(".pos-phone-call-input-number").each(function () {
                let obj = {
                    phoneSub : $(this).val(),
                    noteForPhone : $(this).parents('.form-inline').find(".pos-phone-call-input-note").val()
                };
                phones.push(obj);
            });
            Window.sa.data.phones(phones);
            //showBtn();
            //showValidFeild(this);
        });
        $(document).on("change", ".pos-phone-call-input-note", function () {
            const note = $(this).val();
            const oldPhone = $(this).parents('.form-inline').find(".pos-phone-call-input-number").val();
            // change subphone
            const phones = Window.sa.data.phones();

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
            Window.sa.data.phones(newPhones);
        });

        $(document).on("change", ".pos-phone-call-input-number-primary", function () {
            const phone = $(this).val();
            Window.sa.data.phone(phone);
            //showBtn();
            //showValidFeild(this);
        });

        $(document).on("change", ".pos-phone-call-input-note-primary", function () {
            const note = $(this).val();
            Window.sa.data.noteForPhone(note);
        });

    }
}

$(document).ready(function () {
	//Window.saCall = new SACall();
	//Window.saCall.init();
    Window.saCall = new SACallNew();
});