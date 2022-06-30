var _WS = new WS();
_WS.init();
// var _flagWS = 0; //cờ để init tất cả notify được đăng ký trước đây 1 lần

function Notification() {
    var _this = this;

    _this.init = function () {
        initVAR();
        initWS();
    };

    function initVAR() {
        _this.ws = _WS;
        _this.notificationList = (hasValue(currentUser.notificationChannelTypes) ? currentUser.notificationChannelTypes : []);
        _this.subscribe = function (params) {
            var _params = {
                name: '$' + Math.random().toString().replace(/\./g, ''),
                url: '',
                callback: function (response) {
                }
            };

            _params = $.extend(true, _params, params);
            _this.ws.subscribe(_params.name, _params.url, function (response) {
                if (hasValue(_params.callback)) {
                    _params.callback(response);
                }
            });

        };

        _this.register = function (params) {
            var _params = {
                key: 'empty_check',
                callback: function (response) {
                }
            };

            _params = $.extend(true, _params, params);

            var notificationIndex = null;

            for (var i = 0; i < _this.notificationList.length; i++) {
                if (_this.notificationList[i].code == _params.key) {
                    notificationIndex = i;
                    break;
                }
            }

            if (notificationIndex !== null) {
                if (hasValue(currentUser)) {
                    _this.subscribe({
                        url: _this.notificationList[notificationIndex].subscribeUrl + currentUser.userId,
                        callback: _params.callback
                    });
                }
            }
        };
    }

    function initWS() {
        // alert(_flagWS);
        // _this.ws.init();
    }
}

notification = new Notification();
notification.init();