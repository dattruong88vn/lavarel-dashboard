function SADepositHistory(){
    var _this = this;
    var table = null;
    var tableId = '#deposit-history-table';
    var api = new SAApi();
    var apiLocal = {
        getDepositHistoryList: '/pos/SaApi/getDepositHistoryList'
    }
    var filterUi = {
        ui:{
            depositId:{
                id: '#depositId',
                type: 'hidden',
                wrapper: '#depositId-wrapper',
                attrs:{
                    id: 'depositId',
                    class: '',
                    value: Window.depositId
                }
            },
            createdDateFrom:{
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
            createdDateTo:{
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
            baName:{
                id: '#baName',
                type: 'input',
                wrapper: '#baName-wrapper',
                attrs:{
                    id: 'baName',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Tên BA'
                }
            },
            depositPrice:{
                id: '#depositPrice',
                type: 'price',
                wrapper: '#depositPrice-wrapper',
                attrs:{
                    id: 'depositPrice',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Tiền đặt cọc'
                }
            },
            meetingAddress:{
                id: '#meetingAddress',
                type: 'input',
                wrapper: '#meetingAddress-wrapper',
                attrs:{
                    id: 'meetingAddress',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Địa chỉ đặt cọc'
                }
            },
            meetingTimeFrom:{
                id: '#meetingTimeFrom',
                type: 'date',
                wrapper: '#meetingTimeFrom-wrapper',
                attrs:{
                    id: 'meetingTimeFrom',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Từ ngày đặt cọc'
                }
            },
            meetingTimeTo:{
                id: '#meetingTimeTo',
                type: 'date',
                wrapper: '#meetingTimeTo-wrapper',
                attrs:{
                    id: 'meetingTimeTo',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Đến ngày đặt cọc'
                }
            },
            note:{
                id: '#note',
                type: 'textarea',
                wrapper: '#note-wrapper',
                attrs:{
                    id: 'note',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Ghi chú'
                }
            },
            statusName:{
                id: '#statusName',
                type: 'select2',
                wrapper: '#statusName-wrapper',
                attrs:{
                    id: 'statusName',
                    class: 'form-control',
                    value: '',
                    placeholder: 'Trạng thái'
                },
                options: {
                    type: "ajax",
                    data: function () {
                      return api.getDepositStatusList();
                    },
                    callback: function (response) {
                      var optionList = [{
                          value: -1,
                          text: '------ Chọn trạng thái ------'
                      }];
                      if (response.result) {
                        $.each(response.data, function (id, item) {
                            optionList.push({
                                value: item.id,
                                text: item.name
                            });
                        });
                      }
                      return optionList;
                    }
                  }
            },
        }
    };

    var filterForm = null;

    _this.init = function(){
        initFilterForm();
        loadHistory();
        bindEvents();
    }

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
                data: 'baName',
                name: 'baName',
                render: function (data, type, object) {
                    return hasValue(object.baName) ? object.baName : 'N/A';
                }
            },
            {
                data: 'formattedDepositPrice',
                name: 'depositPrice',
                render: function (data, type, object) {
                    return hasValue(object.formattedDepositPrice) ? object.formattedDepositPrice : 'N/A';
                }
            },
            {
                data: 'meetingAddress',
                name: 'meetingAddress',
                render: function (data, type, object) {
                    return hasValue(object.meetingAddress) ? object.meetingAddress : 'N/A';
                }
            },
            {
                data: 'meetingTime',
                name: 'meetingTime',
                render: function (data, type, object) {
                    return hasValue(object.meetingTime) ? moment(object.meetingTime).format("HH:mm:ss DD/MM/YYYY") : 'N/A';
                }
            },
            {
                data: 'note',
                name: 'note',
                render: function (data, type, object) {
                    return hasValue(object.note) ? object.note : 'N/A';
                }
            },
            {
                data: 'statusName',
                name: 'statusName',
                render: function (data, type, object) {
                    return hasValue(object.statusName) ? object.statusName : 'N/A';
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
                url: apiLocal.getDepositHistoryList,
                type: 'POST',
                data: function (d){
                    var createdDateFrom = Window.myForm.createdDateFrom;
                    var createdDateTo = Window.myForm.createdDateTo;
                    var meetingTimeFrom = Window.myForm.meetingTimeFrom;
                    var meetingTimeTo = Window.myForm.meetingTimeTo;
                    createdDateFrom = hasValue(createdDateFrom)? moment(createdDateFrom, 'DD/MM/YYYY').unix()*1000 : 0;
                    createdDateTo = hasValue(createdDateTo)? moment(createdDateTo, 'DD/MM/YYYY').unix()*1000 : moment().unix()*1000;
                    meetingTimeFrom = hasValue(meetingTimeFrom)? moment(meetingTimeFrom, 'DD/MM/YYYY').unix()*1000 : 0;
                    meetingTimeTo = hasValue(meetingTimeTo)? moment(meetingTimeTo, 'DD/MM/YYYY').unix()*1000 : moment().unix()*1000;
                    if(createdDateFrom <= createdDateTo){
                        Window.myForm.createdDate = createdDateFrom + '-' + createdDateTo;
                    }else{
                        Window.myForm.createdDate = createdDateTo+ '-' + createdDateFrom;
                    }
                    if(meetingTimeFrom <= meetingTimeTo){
                        Window.myForm.meetingTime = meetingTimeFrom + '-' + meetingTimeTo;
                    }else{
                        Window.myForm.meetingTime = meetingTimeTo + '-' + meetingTimeFrom;
                    }
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