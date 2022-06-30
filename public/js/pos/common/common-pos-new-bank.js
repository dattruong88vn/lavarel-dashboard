const _localPosBank = {
    stored : {
        code : null,
        contracted : false,
        interestedRate : null,
        name : null
    }
};
class PosBank {
    constructor() {
        this.eventHandle();
    }

    resetStore() {
        $("#pos-new-bank-modal input[type='input']").val("");
        $("#pos-new-bank-modal input[name='bank-contracted']").prop("checked", false);

        _localPosBank.stored = {
            code : null,
            contracted : false,
            interestedRate : null,
            name : null
        };
    }

    async addNewBank() {
        const that = this;
        // valid
        let isErr = false;
        if(!_localPosBank.stored.code) {
            $("#pos-new-bank-modal input[name='bank-code']").basicAddErr({name : "Mã ngân hàng"});
            isErr = true;
        }
        if(!_localPosBank.stored.name) {
            $("#pos-new-bank-modal input[name='bank-name']").basicAddErr({name : "Tên ngân hàng"});
            isErr = true;
        }
        if(!_localPosBank.stored.interestedRate || !$.isNumeric(_localPosBank.stored.interestedRate)) {
            $("#pos-new-bank-modal input[name='bank-interested-rate']").basicAddErr({name : "Lãi ngân hàng"});
            isErr = true;
        }

        if (isErr) {
            posNotifyAlert({type: "pos-notify-warning", message : "Bạn cần nhập đầy đủ thông tin ngân hàng!"});
            return false;
        } else {
            showPropzyLoading();
            let response  = null;
            await axios.post(POS_APIS_COMMON.get("NEW_BANK"), {
                code : _localPosBank.stored.code,
                name : _localPosBank.stored.name,
                interestedRate : _localPosBank.stored.interestedRate,
                contracted : _localPosBank.stored.contracted
            }).then(xhr => {
                hidePropzyLoading();
                response = xhr.data;
            }).catch(err => {
                hidePropzyLoading();
                showErrLog(err);
            });


            if(response.result) {
                posNotifyAlert({type: "pos-notify-success", message : "Tạo ngân hàng thành công"});
                that.loadBankList();
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : "Không thể tạo mới ngân hàng. <br> Lý do : " + response.message});
            }
        }
    }
    loadBankList() {
        axios.get(POS_APIS_COMMON.get("GET_BANK_LIST"), {})
            .then(xhr => {
                const response = xhr.data;
                var optionList = [{
                    id: '',
                    text: 'Chọn ngân hàng'
                }];
                if (response.result) {
                    const dataMap = response.data.map(bank => {
                        return {
                            id : bank.id,
                            text : bank.name
                        };
                    });
                    optionList = optionList.concat(dataMap);
                }

                $("#bankId").html("").select2({
                    data : optionList
                });
            })
            .catch(err => {
                var optionList = [{
                    id: '',
                    text: 'Chọn ngân hàng'
                }];
                $("#bankId").html("").select2({
                    data : optionList
                });
                showErrLog(err);
            });
    }
    eventHandle() {
        const that = this;
        $("#pos-new-bank-modal input[name='bank-interested-rate']").inputNumber({start : 0, end : 100})
        $(document).on("keyup", "#pos-new-bank-modal input[type='text']", function () {
            const feild = $(this).data("name");
            $(this).basicRemoveErr();
            _localPosBank.stored[feild] = $(this).val();
        });
        $(document).on("change", "#pos-new-bank-modal input[name='bank-contracted']", function () {
            _localPosBank.stored.contracted = $(this).is(":checked");
        });
        $(document).on("click", ".add-new-bank-btn", function (e) {
            e.preventDefault();
            $("#pos-new-bank-modal").modal();
        });
        $(document).on("click", "#pos-new-bank-modal #btn-pos-add-bank-save", function () {
            that.addNewBank();
        });
        $(document).on("click", "#pos-new-bank-modal button[data-dismiss='modal']", function () {
            $("#pos-new-bank-modal input[type='text']").basicRemoveErr();
            that.resetStore();
        });
    }
}

$(document).ready(function () {
    // bind
    Window.posBank = new PosBank();
});