function AddNewStreet() {
    var _this = this;
    var newStreetInfo = {
        wardId: null,
        streetName: null,
        price: null,
        widthValue: null
    };
    var isValid = true;

    var apiList = {
        addNewStreet: '/pos/CommonPos/addNewStreet'
    };

    _this.init = function () {
        initVAR();
        bindEvent();
    };

    function initVAR() {
        _this.addNewStreetModalId = '#addNewStreetModal';
        _this.wardId = null;
        _this.callback = null;

        _this.showModal = function () {
            showModal();
        };
    }

    function bindEvent() {
        $('body').off('click', _this.addNewStreetModalId + ' #addNewStreet').on('click', _this.addNewStreetModalId + ' #addNewStreet', function (e) {
            loadNewStreetInfo();
            if (validate() == true) {
                addNewStreet().done(function (response) {
                    if (hasValue(_this.callback)) {
                        _this.callback(response);
                    }
                });
                isValid = true;
            } else {
                isValid = false;
                $(_this.addNewStreetModalId).modal('hide');
                showPropzyAlert('Bạn chưa nhập tên đường', '', function () {
                    if (isValid == false) {
                        $(_this.addNewStreetModalId).modal();
                    }
                });
            }
        });
    }

    function validate() {
        return (hasValue(newStreetInfo.wardId) && hasValue(newStreetInfo.streetName));
    }

    function autoNumericFormat() {
        $(_this.addNewStreetModalId + ' .auto-numeric-format').autoNumeric();
    }

    function showModal() {
        if (isNaN(_this.wardId)) {
            _this.wardId = null;
        }
        if (hasValue(_this.wardId)) {
            $('body').append(
                '<div id="' + _this.addNewStreetModalId.replace('#', '') + '" class="modal" role="dialog" aria-hidden="false">' +
                '    <div class="modal-dialog">' +
                '        <!-- Modal content-->' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <button type="button" class="close" data-dismiss="modal">×</button>' +
                '                <h4 class="modal-title">Thêm đường</h4>' +
                '            </div>' +
                '            <div class="modal-body message">' +
                '                <div class="form-horizontal">' +
                '                    <div class="form-group">' +
                '                        <div class="col-md-12">' +
                '                            <label for="streetName" class="control-label">Tên đường</label>' +
                '                        </div>' +
                '                        <div class="col-md-12">' +
                '                            <input id="streetName" type="text" class="form-control">' +
                '                        </div>' +
                '                    </div>' +
                '                    <div class="form-group">' +
                '                        <div class="col-md-12">' +
                '                            <label for="price" class="control-label">Đơn giá</label>' +
                '                        </div>' +
                '                        <div class="col-md-12">' +
                '                            <input id="price" type="text" class="form-control auto-numeric-format">' +
                '                        </div>' +
                '                    </div>' +
                '                    <div class="form-group">' +
                '                        <div class="col-md-12">' +
                '                            <label for="widthValue" class="control-label">Độ rộng mặt tiền đường</label>' +
                '                        </div>' +
                '                        <div class="col-md-12">' +
                '                            <input id="widthValue" type="text" class="form-control auto-numeric-format">' +
                '                        </div>' +
                '                    </div>' +
                '                </div>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>' +
                '                <button id="addNewStreet" type="button" class="btn btn-success">Lưu</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>'
            );

            clearField();
            $(_this.addNewStreetModalId).modal();
            autoNumericFormat();
        } else {
            showPropzyAlert('Bạn cần chọn quận trước khi thêm mới tên đường');
        }
    }

    function clearField() {
        $(_this.addNewStreetModalId + ' #streetName').val('');
        $(_this.addNewStreetModalId + ' #price').val('');
        $(_this.addNewStreetModalId + ' #widthValue').val('');
    }

    function loadNewStreetInfo() {
        newStreetInfo = {
            wardId: parseInt(_this.wardId),
            streetName: $(_this.addNewStreetModalId + ' #streetName').val(),
            price: parseFloat($(_this.addNewStreetModalId + ' #price').val().replace(/\,/g, '')),
            widthValue: parseFloat($(_this.addNewStreetModalId + ' #widthValue').val().replace(/\,/g, ''))
        };
    }

    function addNewStreet() {
        return $.ajax({
            url: apiList.addNewStreet,
            type: 'POST',
            data: JSON.stringify(newStreetInfo)
        });
    }
}