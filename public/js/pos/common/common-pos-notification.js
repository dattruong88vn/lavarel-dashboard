/**
 * Notify new only Pos
 * @author : Barry
 * @date : 11/07/2018
 * @version : v1.0.0
 */

const notificationChannel = function () {
    let notifications = [];
    if (!currentUser) {
        console.warn('Notify Pos : The current user variable not found!');
    } else if (!currentUser.notificationChannelTypes || !Array.isArray(currentUser.notificationChannelTypes)) {
        console.warn('Notify Pos : The notification channel types not undefined or wrong array!');
    } else {
        notifications = currentUser.notificationChannelTypes;
    }

    return notifications;
};
let specialNotify = new Map();
class NotifyPos {

	constructor() {
		// define variable
        this._ws = _WS;
        // this._ws.init();
        this.currentUser = currentUser;
	}


	getNotificationRegister() {
	    return notificationRegister;
    }

	/**
     * Register web socket
     * @param : param is object
     * */
	registerWS(param) {
	    const that = this;
	    const notificationChanel = notificationChannel();

	    // check is a special case
        let registerItem = null;
	    if (param.id && param.code) {
            // check exited in map
/*
            if (notificationRegister.has(param.id)) {
                console.warn('Notification Pos : the ' + param.code + ' has existed in list register');
                return false;
            }
*/

            // check in list notification channel types
            const notifyItem = notificationChanel.find(it => it.id === param.id);

            if (!notifyItem) {
                console.warn('Notification Pos : the ' + param.code + ' not in list notification channel type');
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
            specialNotify.set(notifyItem.id, registerItem[0]);
        } else if (param.code) {
	        // get list of notification by code
            const list = notificationChanel.filter((it) => it.code === param.code);

            if(list.length === 0) {
                console.warn('Notification Pos : the ' + param.code + ' not in list notification channel type');
                return false;
            }

            // remove special
            const specialList = list.filter((it) => {
                if (!specialNotify.has(it.id)) {
                    return it;
                }
            });

            //
            if(specialList.length === 0) {
                console.warn('Notification Pos : the ' + param.code + ' has defied before');
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
            console.warn('Notification Pos : Can not register notification for ' + param.code);
            return false;
        } else {
	        console.log('Register notification Pos_____:');
	        console.group();
            registerItem.forEach(it => {
                const name = '$' + Math.random().toString().replace(/\./g, '');
                console.info('--' + it.name);
                that._ws.subscribe(name, it.url + that.currentUser.userId, function (response) {
                    if (param.callback) {
                        param.callback(response);
                    }
                });
            });
            console.groupEnd();


        }

	}
}

