class PropzyNotifications {
    constructor() {
        this._WS = null;
        this._NOTIFICATION_CHANEL = [];
        this.currentUser = currentUser;
        this._SPECIAL_LIST = new Map();
        if (!currentUser) {
            console.warn('Propzy Notifications : The current user variable not found!');
        } else if (!currentUser.notificationChannelTypes || !Array.isArray(currentUser.notificationChannelTypes)) {
            console.warn('Propzy Notifications: The notification channel types not undefined or wrong array!');
        } else {
            this._NOTIFICATION_CHANEL = currentUser.notificationChannelTypes;
        }
        if (this._NOTIFICATION_CHANEL.length > 0) {
            if (typeof (WS) !== "undefined") {
                this._WS = _WS;
                // this._WS.init();
            } else {
                throw  "Propzy Notifications missing notify";
            }
        } else {
            console.warn('Propzy Notifications: no init ws because not has NOTIFICATION_CHANEL!');
        }
    }
    registerWS(param) {

        const that = this;
        if (that._NOTIFICATION_CHANEL.length === 0 || that._WS === null) {
            return false;
        }
        const notificationChanel = that._NOTIFICATION_CHANEL;

        // check is a special case
        let registerItem = null;
        if (param.id && param.code) {
            // check in list notification channel types
            const notifyItem = notificationChanel.find(it => it.id === param.id);
            if (!notifyItem) {
                console.warn('Propzy Notifications : the ' + param.code + ' not in list notification channel type');
                return false;
            }

            // push notifyItem in to list register notify
            registerItem = [{
                url : notifyItem.subscribeUrl,
                id : notifyItem.id,
                code : notifyItem.code,
                name: notifyItem.name,
                control : notifyItem.control,
            }];
            that._SPECIAL_LIST.set(notifyItem.id, registerItem[0]);
        } else if (param.code) {
            // get list of notification by code
            const list = notificationChanel.filter((it) => it.code === param.code);

            if(list.length === 0) {
                console.warn('Propzy Notifications  : the ' + param.code + ' not in list notification channel type');
                return false;
            }

            // remove special
            const specialList = list.filter((it) => {
                if (!that._SPECIAL_LIST.has(it.id)) {
                    return it;
                }
            });

            if(specialList.length === 0) {
                console.warn('Propzy Notifications  : the ' + param.code + ' has defied before');
                return false;
            }

            //group by code
            registerItem = [];
            specialList.forEach((it) => {
                registerItem.push({
                    url : it.subscribeUrl,
                    id : it.id,
                    code : it.code,
                    name: it.name,
                    control : it.control,
                });
            });
        }
        // register for list

        if (!registerItem) {
            console.warn('Propzy Notifications : Can not register notification for ' + param.code);
            return false;
        } else {
            console.group();
            registerItem.forEach(it => {
                const name = '$' + Math.random().toString().replace(/\./g, '');
                console.info('--' + it.name);
                that._WS.subscribe(name, it.url + that.currentUser.userId, function (response) {
                    if (param.callback) {
                        param.callback(response);
                    }
                });
            });
            console.groupEnd();
        }
    }
}
$(document).ready(function () {
    Window.prozyNotify = new PropzyNotifications();
    let paramsNotifyRegister = [
        {
            id : 126,
            code : "REQUEST_COOPERATION",
            callback : function (response) {
                const dataBody = JSON.parse(response.body);
                createBootstrapNotification({
                    message: dataBody.message + ' <a href="/agent-manager/management-requests" target="_blank">Xem chi tiết </a>'
                });
            }
        },
        {
            id : 127,
            code : "REQUEST_STOP_COOPERATION",
            callback : function (response) {
                const dataBody = JSON.parse(response.body);
                createBootstrapNotification({
                    message: dataBody.message + ' <a href="/agent-manager/management-requests" target="_blank">Xem chi tiết </a>'
                });
            }
        },
    ];
    // for SA, PRe , BA, TM
    paramsNotifyRegister = paramsNotifyRegister.concat([
        {
            code : "REQUEST_COOPERATION_APPROVED",
            callback : function (response) {
                const dataBody = JSON.parse(response.body);
                createBootstrapNotification({
                    message: dataBody.message
                });
            }
        },
        {
            code : "REQUEST_COOPERATION_UNAPPROVED",
            callback : function (response) {
                const dataBody = JSON.parse(response.body);
                createBootstrapNotification({
                    message: dataBody.message
                });
            }
        }
    ]);
    paramsNotifyRegister.forEach(it => {
        Window.prozyNotify.registerWS(it);
    });
});