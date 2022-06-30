function WS() {
    var _this = this;
    var reconnectCount = 0;

    _this.init = function () {
        initVAR();
        initClient();
    };

    function initVAR() {
        _this.socket = null;
        _this.client = null;
        _this.subscribeList = [];
        _this.url = baseWebSocketApi + 'socket';

        _this.connect = function () {
            _this.client.connect({accessToken: currentUser.userId}, connectedCallback, errorCallback);
        };

        _this.subscribe = function (name, url, callback) {
            if (_this.client.connected == true) {
                var subscriptionIndex = -1;
                for (var i = 0; i < _this.subscribeList.length; i++) {
                    if (_this.subscribeList[i].name == name) {
                        subscriptionIndex = i;
                        break;
                    }
                }

                if (subscriptionIndex == -1) {
                    _this.subscribeList.push({
                        name: name,
                        url: url,
                        callback: callback,
                        subscription: _this.client.subscribe(url, callback)
                    });
                } else {
                    _this.subscribeList[subscriptionIndex] = {
                        name: name,
                        url: url,
                        callback: callback,
                        subscription: _this.client.subscribe(url, callback)
                    };
                }
            } else {
                var subscriptionIndex = -1;
                for (var i = 0; i < _this.subscribeList.length; i++) {
                    if (_this.subscribeList[i].name == name) {
                        subscriptionIndex = i;
                        break;
                    }
                }

                if (subscriptionIndex == -1) {
                    _this.subscribeList.push({
                        name: name,
                        url: url,
                        callback: callback,
                        subscription: null
                    });
                } else {
                    _this.subscribeList[subscriptionIndex] = {
                        name: name,
                        url: url,
                        callback: callback,
                        subscription: null
                    };
                }
            }
        };
    }

    function connectedCallback(response) {
        for (var i = 0; i < _this.subscribeList.length; i++) {
            _this.subscribe(_this.subscribeList[i].name, _this.subscribeList[i].url, _this.subscribeList[i].callback);
        }
    }

    function errorCallback(error) {
        console.log(error);
    }

    function initClient() {
        _this.socket = new SockJS(_this.url);
        _this.client = Stomp.over(_this.socket);
        _this.client.debug = null;
        _this.connect();

        setInterval(function () {
            if (_this.client.connected == false) {
                if (reconnectCount < 3) {
                    delete _this.socket;
                    delete _this.client;
                    _this.socket = new SockJS(_this.url);
                    _this.client = Stomp.over(_this.socket);
                    _this.connect();
                    reconnectCount++;
                }
            } else {
                reconnectCount = 0;
            }
        }, 10000);
    }
}