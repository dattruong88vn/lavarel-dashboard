const TimeCounterNotifications = {
    arrKey: [
        'TIME_COUNTER_LEAD_STAFF',
        'TIME_COUNTER_LEAD_LEADER',
        'TIME_COUNTER_LEAD_ASM',
        'TIME_COUNTER_DEAL_STAFF',
        'TIME_COUNTER_DEAL_LEADER',
        'TIME_COUNTER_DEAL_ASM',
        'TIME_COUNTER_MEETING_STAFF',
        'TIME_COUNTER_MEETING_LEADER',
        'TIME_COUNTER_MEETING_ASM',
        'TIME_COUNTER_ASSISTANT_STAFF',
        'TIME_COUNTER_ASSISTANT_LEADER',
        'TIME_COUNTER_ASSISTANT_ASM',
        "TIME_COUNTER_ASSISTANT_MANAGER",
        'TIME_COUNTER_SELLER_STAFF',
        'TIME_COUNTER_SELLER_LEADER',
        'TIME_COUNTER_SELLER_ASM',
        "TIME_COUNTER_SELLER_MANAGER"
    ],
    registerNotify: function() {
        return this.arrKey.map( item => {
            return notification.register({
                key: item,
                callback: function (response) {
                    commonNotifyTimer.init();
                }
            });
        });
    }
}