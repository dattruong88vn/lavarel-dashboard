class SendTimerCounter extends TimerCountDown {
    constructor(...config){
        super(...config);
    }
    submit(data) {
        var _this = this;
        this.done(function(item) {
            //console.log("timer", item);
            if(data.leadId) {
                let dataPost = {
                    "leadId": parseInt(data.leadId),
                    "openedDate": item.initTimeStamp,
                    "duration": item.timer
                };
                $.ajax({
                    url: "/timer-counter/track-time-lead",
                    data: JSON.stringify(dataPost),
                    type: "post"
                }).done(function (response) {
                    if (response.result === false) {
                        console.log("Có lỗi xảy ra");
                    } else {
                        console.log("Track time success");
                    }
                })
            } else if(data.dealId) {
                let dataPost = {
                    "dealId": parseInt(data.dealId),
                    "openedDate": item.initTimeStamp,
                    "duration": item.timer
                };
                $.ajax({
                    url: "/timer-counter/track-time-deal",
                    data: JSON.stringify(dataPost),
                    type: "post"
                }).done(function (response) {
                    if (response.result === false) {
                        console.log("Có lỗi xảy ra");
                    } else {
                        console.log("Track time success");
                    }
                })
            }
        })
    }
}