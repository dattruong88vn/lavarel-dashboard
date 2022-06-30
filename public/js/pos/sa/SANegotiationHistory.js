function SADepositHistory(){
    var _this = this;
    var table = null;
    var tableId = '#negotiation-history-table';
    var api = new SAApi();
    var apiLocal = {
        getNegotiationHistoryList: '/pos/SaApi/getNegotiationHistoryList'
    }

    var filterUi = {
        ui:{
            'negotiationId':{
                id: '#negotiationId',
                type: 'hidden',
                wrapper: '#negotiationId-wrapper',
                attrs:{
                    id: 'negotiationId',
                    'data-field-name': 'data.negotiationId',
                    class: '',
                    value: Window.negotiationHistory.negotiationId
                }
            },
            'dealId':{
                id: '#dealId',
                type: 'hidden',
                wrapper: '#dealId-wrapper',
                attrs:{
                    id: 'dealId',
                    'data-field-name': 'data.dealId',
                    class: '',
                    value: Window.negotiationHistory.dealId
                }
            },
            'createdDateFrom':{
                id: '#createdDateFrom',
                type: 'date',
                wrapper: '#createdDateFrom-wrapper',
                attrs:{
                    id: 'createdDateFrom',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Từ ngày tạo'
                }
            },
            'createdDateTo':{
                id: '#createdDateTo',
                type: 'date',
                wrapper: '#createdDateTo-wrapper',
                attrs:{
                    id: 'createdDateTo',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Đến ngày tạo'
                }
            },
            'createdByName':{
                id: '#createdByName',
                type: 'input',
                wrapper: '#createdByName-wrapper',
                attrs:{
                    id: 'createdByName',
                    'data-field-name': 'data.createdByName',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Tên BA'
                }
            },
            'negotiationPriceFrom':{
                id: '#negotiationPriceFrom',
                type: 'price',
                wrapper: '#negotiationPriceFrom-wrapper',
                attrs:{
                    id: 'negotiationPriceFrom',
                    // 'data-field-name': 'data.negotiationPrice',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Khoảng giá tiền nhỏ nhất'
                }
            },
            'negotiationPriceTo':{
                id: '#negotiationPriceTo',
                type: 'price',
                wrapper: '#negotiationPriceTo-wrapper',
                attrs:{
                    id: 'negotiationPriceTo',
                    // 'data-field-name': 'data.negotiationPrice',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Khoảng giá tiền lớn nhất'
                }
            },
            'note':{
                id: '#note',
                type: 'textarea',
                wrapper: '#note-wrapper',
                attrs:{
                    id: 'note',
                    'data-field-name': 'data.note',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Ghi chú'
                }
            },
            'statusId':{
                id: '#statusId',
                type: 'select2',
                wrapper: '#statusId-wrapper',
                attrs:{
                    id: 'statusId',
                    'data-field-name': 'data.statusId',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Trạng thái'
                },
                options: {
                    data: function () {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            },
                            {
                                value: 1,
                                text: 'Hoàn tât'
                            },
                            {
                                value: 2,
                                text: 'Đang thương lượng'
                            },
                            {
                                value: 3,
                                text: 'Tạm dừng'
                            },
                            {
                                value: 4,
                                text: 'Hủy'
                            }
                        ];
                        return optionList;
                    }
                  }
            },
        }
    };

    var filterForm = null;

    function initFilterForm(){
        filterForm = new MyForm(filterUi);
        filterForm.init();
    }

    function bindEvents(){
        $('body').off('click','#filter').on('click','#filter',function(){
            loadHistory();
        });

        $('body').off('click','#clearFilter').on('click','#clearFilter',function(){
            filterForm.clear();
            loadHistory();
        });
    }

    _this.init = function(){
        initFilterForm();
        loadHistory();
        bindEvents();
    }

    function loadHistory(){
        ajaxStart();
        var columns = [
            {
                data: 'createdDate',
                name: 'createdDate',
                render: function (data, type, object) {
                    return hasValue(object.createdDate) ? moment(object.createdDate).format("HH:mm:ss DD/MM/YYYY") : 'N/A';
                }
            },
            {
                data: 'data.createdByName',
                name: 'data.createdByName',
                render: function (data, type, object) {
                    return hasValue(object.data.createdByName) ? object.data.createdByName : 'N/A';
                }
            },
            {
                data: 'data.formatedNegotiationPrice',
                name: 'data.negotiationPrice',
                render: function (data, type, object) {
                    return hasValue(object.data.formatedNegotiationPrice) ? object.data.formatedNegotiationPrice : 'N/A';
                }
            },
            {
                data: 'data.note',
                name: 'data.note',
                render: function (data, type, object) {
                    return hasValue(object.data.note) ? object.data.note : 'N/A';
                }
            },
            {
                data: 'data.statusName',
                name: 'data.statusId',
                render: function (data, type, object) {
                    return hasValue(object.data.statusName) ? object.data.statusName : 'N/A';
                }
            },
        ];
        try {
            table.destroy();
        } catch (error) {
            
        }
        table = $(tableId).DataTable({
            processing: false,
            serverSide: true,
            bSort: false,
            ajax: {
                url: apiLocal.getNegotiationHistoryList,
                type: 'POST',
                data: function (d){
                    var createdDateFrom = Window.myForm.createdDateFrom;
                    var createdDateTo = Window.myForm.createdDateTo;
                    var negotiationPriceFrom = hasValue(Window.myForm.negotiationPriceFrom)? parseInt(Window.myForm.negotiationPriceFrom.replace(/,/g,'')) : 0;
                    var negotiationPriceTo = hasValue(Window.myForm.negotiationPriceTo)? parseInt(Window.myForm.negotiationPriceTo.replace(/,/g,'')) : Number.MAX_SAFE_INTEGER;
                    var note = hasValue(Window.myForm['data.note'])? 'like:' + Window.myForm['data.note']: '';
                    var createdByName = hasValue(Window.myForm['data.createdByName'])? 'like:' + Window.myForm['data.createdByName']: '';
                    
                    createdDateFrom = 'date:' + (hasValue(createdDateFrom)? moment(createdDateFrom, 'DD/MM/YYYY').unix()*1000 : 0);
                    createdDateTo = 'date:' + (hasValue(createdDateTo)? moment(createdDateTo, 'DD/MM/YYYY').unix()*1000 : moment().unix()*1000);
                    if(createdDateFrom <= createdDateTo){
                        Window.myForm.createdDate = createdDateFrom + '-' + createdDateTo;
                    }else{
                        Window.myForm.createdDate = createdDateTo+ '-' + createdDateFrom;
                    }
                    if(negotiationPriceFrom <= negotiationPriceTo){
                        Window.myForm['data.negotiationPrice'] = negotiationPriceFrom + '-' + negotiationPriceTo;
                    }else{
                        Window.myForm['data.negotiationPrice'] = negotiationPriceTo + '-' + negotiationPriceFrom;
                    }
                    if(hasValue(note)){
                        Window.myForm['data.note'] = note;
                    }else{
                        delete Window.myForm['data.note'];
                    }
                    if(hasValue(createdByName)){
                        Window.myForm['data.createdByName'] = createdByName;
                    }else{
                        delete Window.myForm['data.createdByName'];
                    }

                    Window.myForm['data.dealId'] = Window.negotiationHistory.dealId;
                    Window.myForm['data.negotiationId'] = Window.negotiationHistory.negotiationId;
                    return $.extend({}, d, {filter:Window.myForm});
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
            columns: columns
        })
        .off('processing.dt')
        .on('processing.dt', function (e, settings, processing) {
            if (processing) {
                ajaxStart();
            } else {
                ajaxEnd();
            }
        })
        .on('xhr.dt', function (e, settings, json, xhr) {
            ajaxEnd();
        });
    }
}

$(document).ready(function(){
    (new SADepositHistory()).init();
});