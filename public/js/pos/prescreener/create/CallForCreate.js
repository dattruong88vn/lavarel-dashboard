class PreCall extends POSCall {
    constructor() {
        super();
    }

    updateStored() {
        const that = this;
        //typePage
        that.stored.typePage = 1;
        // owner, agent and rlistingId

        that.stored.ownerId =  null;
        that.stored.agentId = null;
        that.stored.id = null;

        // department sa default is 2 code;
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
        if(that.stored.crawlerStatus == 3) {
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

        $(document).on("change", "#phone", function () {
            Window.globalVar.listingDetail.loadDataPost();
        });
    }
}
$(document).ready(function () {
    //Window.saCall = new SACall();
    //Window.saCall.init();
    Window.preCall = new PreCall();
});