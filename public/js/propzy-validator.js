class PropzyValidator {
    constructor(props) {
        this._VALIDATE_FEILDS = new Map();
        this._NEED_LIST_VALIDATE = new Set();
        this._NEED_LIST_VALIDATE_OLD = new Set();
        this._DEFAULT_MESSAGE = {
            notEmpty : {
                message : 'Vui lòng nhập giá trị'
            },
            notFalse : {
                message : 'Vui lòng chọn giá trị'
            }
        };
    }

    /*setValidateFeild
    * key
    * feild is object
    * feild.id : id of feild (label for={id})
    * value : function () => return value
    * hideMessage : true / false
    * message
    * */
    setValidateFeild(feild = {}) {
        this._NEED_LIST_VALIDATE.add(feild);
    }
    showValidation() {
        const that = this;
        that._NEED_LIST_VALIDATE.forEach((item) => {
            $('.form-group').find('label[for="' + item.id +'"]').addClass('required');
        });
        let intersection = new Set(
            [...that._NEED_LIST_VALIDATE_OLD].filter(x => !that._NEED_LIST_VALIDATE.has(x)));
        intersection.forEach(it => {
            that.clearValidateOneFeild(it.id);
        });
    }
    clearValidateOneFeild(id) {
        $('label[for="'+id+'"]').removeClass('required');
        $('label[for="'+id+'"]').parents('.form-group').removeClass('has-error');
    }

    clearAllValidate() {
        $('label.required').removeClass('required');
        $('.has-error').removeClass('has-error');
    }
    removeValidate() {
        $('.has-error').removeClass('has-error');
    }
    checkValidate() {
        const that = this;
        let validation = {
            isError : false,
            listFail : new Set(),
        };
        that.removeValidate();
        const LIST = that._NEED_LIST_VALIDATE;
        LIST.forEach(it => {
            let message = null;
            let hasErr = false;
            if(typeof (it.rules) !== "undefined") {
                if (typeof (it.rules.notEmpty) !== "undefined" && (it.value() == null || it.value() === '' || it.value() === 0 || (Array.isArray( it.value()) && it.value().length > 0 ))) {
                    hasErr = true;
                    message = typeof (it.rules.notEmpty.message) !== 'undefined' ? it.rules.notEmpty.message : that._DEFAULT_MESSAGE.notEmpty.message;
                }
                if(typeof (it.rules.notFalse) !== "undefined" && (it.value() == null || !it.value())) {
                    hasErr = true;
                    message = typeof (it.rules.notFalse.message) !== 'undefined' ? it.rules.notFalse.message : that._DEFAULT_MESSAGE.notFalse.message;
                }
                if(typeof (it.rules.notNull) !== "undefined" && it.value() == null) {
                    hasErr = true;
                    message = typeof (it.rules.notNull.message) !== 'undefined' ? it.rules.notNull.message : that._DEFAULT_MESSAGE.notNull.message;
                }
            } else {
                // default check empty
                if(it.value() == null || it.value() === '' || it.value() === 0 || (Array.isArray( it.value()) && it.value().length === 0)) {
                    hasErr = true;
                    message = that._DEFAULT_MESSAGE.notEmpty.message;
                }
            }
            // show
            if (hasErr) {
                validation.isError = true;
                validation.listFail.add(it);
                $('label[for="' + it.id +'"]').parents('.form-group').addClass('has-error');
                if((typeof (it.hideMessage) == 'undefined' || !it.hideMessage) && message != null) {
                    $('.form-group').find('#'+ it.id).after('<span class="help-block sa-error">'+ message +'</span>');
                }
            }
        });
        console.info(validation);
        return validation;
    }

}