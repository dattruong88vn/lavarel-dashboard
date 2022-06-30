const PfsNotifications = {
    showNotify: function (item) {
        var notifyClass = "";
        var targetLink = item.receiverCode != "mortgage" ? "/deal/detail/"+item.dealId : "/pfs-list/detail/"+item.requestId;
        if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
            return false;
        }
        notifyClass = "notify-diy-change-time";
        var html = "<li class='" + notifyClass + "' onclick='return setNotificationRead(\""+item.id+"\", function (response) { return true;})'>"
                + "<a class='hideNotify text-red' style='margin-right:16px;' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>"
                + "<a class='close' mongo-id='" + item.id + "' >x</a>"
                + "<a class='item-link notify-" + item.id + "' mongo-id='" + item.id + "' href='" + targetLink + "' >" + item.message + "</a>"
                + "</li>";
        $("#notify-area .notifyList").append(html);
    
        var selector = $("."+notifyClass);
        selector.find(".close").unbind("click");
        selector.find(".close").on("click", function (event) { 
            event.preventDefault();
            var selector = $(this);
            var mongoId = $(selector).attr("mongo-id");
            setNotificationRead(mongoId, function (response) {
                selector.parents("li").remove();
            });
        });
    },
    registerNotify: function() {
        let that = this;
        notification.register({
            key: 'RECEIVE_NEED_ADDTIONAL_PROFILE',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'MORTGAGE_REASSIGN_TO_MORTGAGE',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'PROFILE_CHANGE_STATUS_NOTIFY_TO_ASSIGNED_TO',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'RECEIVE_COMPLETE_PROFILE_PROCESSING',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'PROFILE_FULL_INFO',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'MG_PROFILE_DONE',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'UPDATE_EVALUATION_RESULTS',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'PROFILE_CANCLED',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'RECEIVE_LOANS_PROFILE',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
        notification.register({
            key: 'RECEIVE_ADDITIONAL_PROFILE',
            callback: function (response) {
                var jsonResult = JSON.parse(response.body);
                that.showNotify(jsonResult.data);
            }
        });
    }
}