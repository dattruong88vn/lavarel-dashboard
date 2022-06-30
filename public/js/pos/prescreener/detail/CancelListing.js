/**
 * create by Barry
 * */
class CancelListing {
    constructor() {
        this.stored = {
            cancelList : new Map()
        };
        this.doms = {
            modal : '#cancel-listing-modal',
            btnCancelListing : '#cancel-listing',
            selectStatus : '#cancel-channel-status',
            selectStatusUncooperative : '#cancel-channel-status-uncooperative',
            txtNote : '#cancel-channel-note',
            displayNote : '.display-cancel-note',
            displaySelectUncooperative : '.display-cancel-uncooperative',
            selectContractFrom : '#contractFrom',
            selectContractTo : '#contractTo'

        };

        this.init();
        this.loadEvent();
        this.loadApi();

    }

    // function init
    init() {
        $(this.doms.displayNote).hide();
    }

    /**
     * function load api
     * */
    loadApi() {
        const _this = this;
        $(_this.doms.selectStatus).html('');
        Listing.getChannelStatus().done(function (response) {
            if (response.result) {
                let statusList = [];
                const statusListFilter = response.data.filter(it => it.type == 7);

                if (statusListFilter.length > 0) {
                    statusList = statusListFilter[0].list;
                }
                let data = [];
                statusList.forEach(it => {
                   _this.stored.cancelList.set(it.id, it);
                   data.push({
                       id : it.id,
                       text :  it.name
                   });
                });
                $(_this.doms.selectStatus).select2({
                    data : data
                });
                $(_this.doms.selectStatus).trigger('change');
            }
        });
    }

    /**
     * function bind event by jquery
     * */
    loadEvent() {
        const _this = this;
        
        // action khi bấm checkbox mặc định
        $('#defaultLeasingExpiredDate').click(function(){
            if($(this).is(':checked')){
                var nextYear = moment().add(1, 'years').format('DD/MM/YYYY');
                $('#contractFrom').val(moment().format('DD/MM/YYYY'));
                $('#contractTo').val(nextYear);
            }
        });
        
        // change select lý do hủy
        $('body').off('change', ).on('change', _this.doms.selectStatus, function (e) {
            $(_this.doms.selectStatusUncooperative).html('');
            const status = parseInt($(this).val());
            let childs = [];
            if (_this.stored.cancelList.has(status)) {
                const statusSelect = _this.stored.cancelList.get(status);
                if (statusSelect.childs && statusSelect.childs.length > 0) {
                    childs = statusSelect.childs;
                }
            }
            if (childs.length > 0) {
                $(_this.doms.displaySelectUncooperative).show();
                const data = childs.map(it => {
                    return {
                        id : it.id,
                        text : it.name
                    };
                });
                $(_this.doms.selectStatusUncooperative).select2({
                    data : data
                });
            } else {
                $(_this.doms.displaySelectUncooperative).hide();
            }
            //
            if(status == 28){
                // đang chọn "đã giao dịch"
                $('.contract-group').show();
            } else {
                $('.contract-group').hide();
            }
        });
        // select change Lý do ko hợp tác
        $('body').off('change', _this.doms.selectStatusUncooperative).on('change', _this.doms.selectStatusUncooperative, function (e) {
            const status = parseInt($(this).val());
            if (status === 43) {
                $(_this.doms.displayNote).show();
            } else {
                $(_this.doms.displayNote).hide();
            }

        });
    }

    /**
     * function execute cancel listing
     * */
    cancelListingFunction(callback) {
        let _this = this;
        let status, note, contractFrom, contractTo = null;
        status = parseInt($(this.doms.selectStatus).val());
        let childs = [];
        if (_this.stored.cancelList.has(status)) {
            const statusSelect = _this.stored.cancelList.get(status);
            if (statusSelect.childs && statusSelect.childs.length > 0) {
                childs = statusSelect.childs;
            }
        }
        if (childs.length > 0) {
            status = parseInt($(_this.doms.selectStatusUncooperative).val());
        }

        if (status === 43) {
            note = $(this.doms.txtNote).val();
        }
        if(status == 28){
            if(Window.jsDetailData.listingTypeId && Window.jsDetailData.listingTypeId != 1){ // nếu listing là bán thì không check ngày hợp đồng
                // đang chọn "đã giao dịch"
                if (!hasValue($(this.doms.selectContractFrom).val())) {
                    posNotifyAlert({type: "pos-notify-danger", message : 'Bạn chưa chọn ngày bắt đầu cho thuê'});
                    return false;
                }
                if (!hasValue($(this.doms.selectContractTo).val())) {
                    posNotifyAlert({type: "pos-notify-danger", message : 'Bạn chưa chọn ngày kết thúc hợp đồng'});
                    return false;
                }
                contractFrom = $(this.doms.selectContractFrom).val() ? moment($(this.doms.selectContractFrom).val(), 'DD/MM/YYYY').unix() * 1000 : null;
                contractTo = $(this.doms.selectContractTo).val() ? moment($(this.doms.selectContractTo).val(), 'DD/MM/YYYY').unix() * 1000 : null;
            }
        }

        callback({statusId : status, note : note, contractFrom : contractFrom, contractTo : contractTo});
    }
}