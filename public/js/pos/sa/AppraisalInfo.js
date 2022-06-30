/**
 * creator by @barry
 * required : common-pos.js, common-pos-api
 */
const _localAprraisalInfo = {
    stored : {
        'rListing' : null
    }
};
const _localAppraisalInfoPromise = async function (name) {
    switch (name) {
        case 'CHANEL_TYPE' : {
            $("#appraisal-company").html('').select2();
            $("#appraisal-type").html('').select2();
            let dataCompany = [{id: "", text: "Chọn công ty thẩm định"}];
            let dataType = [{id: "", text: "Chọn loại thẩm định"}];

            if (!POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST) {
                await POS_PROMISISE_API("SA_GET_CHANNEL_TYPE", {});
            }

            let dataCompanyFilter = POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST.filter(it => it.type == 11);
            let dataTypeFilter = POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST.filter(it => it.type == 12);

            dataCompanyFilter = dataCompanyFilter ? dataCompanyFilter[0].list : [];
            dataTypeFilter = dataTypeFilter ? dataTypeFilter[0].list : [];

            const dataCompanyMap = dataCompanyFilter.map(it => {
                return {
                    id : it.id,
                    text : it.name
                };
            });
            const dataTypeMap = dataTypeFilter.map(it => {
                return {
                    id : it.id,
                    text : it.name
                };
            });


            dataCompany = dataCompany.concat(dataCompanyMap);
            dataType = dataType.concat(dataTypeMap);


            $("#appraisal-company").select2({
                data : dataCompany
            });
            $("#appraisal-type").select2({
                data : dataType
            });
            break;
        }
    }
};
class AppraisalInfo {
    constructor(data) {
        _localAprraisalInfo.stored.rListing = data && data.rListing ? data.rListing : null;
        this._PROPZY_UPLOAD = null;
        this.events();
    }

    async loadApi() {
        await _localAppraisalInfoPromise('CHANEL_TYPE');
    }

    async showAppraisalInfo() {
        const that = this;
        if(typeof(_localAprraisalInfo.stored.rListing) == 'undefined' || !_localAprraisalInfo.stored.rListing) {
            posNotifyAlert({type: "pos-notify-danger", message : sprintf(POS_MESSAGE.get('MISSING_PARAM'), ['rlisting id'])});
            return false;
        }
        // show modal

        await that.loadApi();

        let response = null;
        showPropzyLoading();
        await axios.get(POS_APIS_SA.get('GET_APPRAISAL_INFO'), {params : {rlistingId : _localAprraisalInfo.stored.rListing}})
            .then(xhr => {
                response = xhr.data;
                hidePropzyLoading();
            })
            .catch(err => {
                hidePropzyLoading()
                showErrLog(err,  POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_RESPONSE'));
            });

        let listFiles = [];
        if (response) {
           if(response.result && response.data) {
               $("#appraisal-company").val(response.data.company).select2();
               $("#appraisal-type").val(response.data.type).select2();
               $("#appraisal-price").val(response.data.price).trigger('input');
               listFiles = response.data.files;
           } else {

           }
        }
        that._PROPZY_UPLOAD = new PropzyFileUploadLib({
            list : listFiles,
            url : POS_APIS_COMMON.get('UPLOAD_PHOTO'),
            source : 'props',
            wrapper : '#appraisal-photo'
        });
        $('#info-appraisal-modal').modal('show');
        $('#appraisal-type').trigger('change');
    }

    async priateSave() {
        const that = this;
        const data = {
            rlistingId: _localAprraisalInfo.stored.rListing,
            company: $("#appraisal-company").val(),
            type: $("#appraisal-type").val(),
            file: that._PROPZY_UPLOAD.getList(),
            price: $("#appraisal-price").val(),
        };

        // validate
        const validCompany = $("#appraisal-company").requiredError({
            val: data.company,
            noShowMess: true
        });
        const validType = $("#appraisal-type").requiredError({
            val: data.type,
            noShowMess: true
        });
        const validPrice = $("#appraisal-price").requiredError({
            val: data.price,
            noShowMess: true
        });
        let validPhoto = false;
        if (data.type == 205) {
            validPhoto = $("#appraisal-photo").requiredError({
                val: data.file.length > 0 ? data.file.length : null,
                noShowMess: true
            });
        }

        if ($.inArray(true, [validCompany, validType, validPrice, validPhoto]) > -1) {
            return false;
        }

        if (data.type != 205) {
            data.photo = [];
        }

        data.file = JSON.stringify(data.file);
        data.price = Number.parseInt(data.price.split(',').join(""));

        let response = null;
        showPropzyLoading();
        await axios.post(POS_APIS_SA.get('UPDATE_APPRAISAL_INFO'), data)
            .then(xhr => {
                response = xhr.data;
                hidePropzyLoading();
            })
            .catch(err => {
                hidePropzyLoading();
                posNotifyAlert({
                    type: "pos-notify-danger",
                    message: POS_MESSAGE.get('PROCESS_ERR')
                });
                showErrLog(err, POS_MESSAGE.get('PROCESS_ERR'));
            });

        if (response) {
            if (response.result) {
                posNotifyAlert({
                    type: "pos-notify-success",
                    message: sprintf(POS_MESSAGE.get('SUCCESS_RESPONSE_API'), ['Cập nhật thẩm định'])
                });
                $('#info-appraisal-modal').modal('hide');
            } else {
                posNotifyAlert({
                    type: "pos-notify-danger",
                    message: sprintf(POS_MESSAGE.get('ERR_RESPONSE_API'), ['Cập nhật thẩm định', response.message])
                });
            }
        }


    }

    async events() {
        const that = this;
        $('#appraisal-price').inputNumber({
            start : 0,
            type : 'price'
        });
        $(document).on('click', '#show-apprailsal-info', function (e) {
            e.preventDefault();
            const rlistingId = $(this).data('rlisting');
            if(rlistingId) {
                _localAprraisalInfo.stored.rListing = rlistingId;
            }
            $("#appraisal-company").requiredErrorRemove();
            $("#appraisal-type").requiredErrorRemove();
            $("#appraisal-price").requiredErrorRemove();
            $("#appraisal-photo").requiredErrorRemove();
            that.showAppraisalInfo();

        });
        $(document).on('click', '#btn-update-appraisal-info', function (e) {
            e.preventDefault();
            that.priateSave();
        });
        $(document).on('change', '#appraisal-type', function (e) {
            e.preventDefault();
            if($(this).val() == 205) {
                $('.appraisal-photo-group').show();
            } else {
                $('.appraisal-photo-group').hide();
            }

        });
    }
}

