class BrowserCloseAction extends TimerCountDown
{
    constructor(key,reload,close) { // callback reload,close = function
        super();
        this.out = false;
        this._key = key;
        this._reload = reload;
        this._close = close;
    }

    init(){
        // if(localStorage.getItem(this._key)){ // case reload set lại initTime
        //     this.setInitTimeStamp(localStorage.getItem(this._key)); //set lại initTime
        //     // localStorage.removeItem(this._key); // remove initTime session
        // }

        // console.log("getInitTimeStamp",this.getInitTimeStamp());

        this.checkMountAndCloseActionClick();
    }

    setInitTime(){
        if(localStorage.getItem(this._key) === null){
            let _getInitTimeStamp = this.getInitTimeStamp();
            localStorage.setItem(this._key, _getInitTimeStamp);
        }
        return true;
    }

    checkMountAndCloseActionClick(){
        let _this = this;
        // check mount on page
        $("body").mouseover(function(){
            _this.out = false;
        }).mouseout(function(){
            _this.out = true;
        });

        $(window).on('beforeunload', function(e){
            // console.log(_this.out);
            if(_this.out){ // case bấm vô nút x
                _this._close(); 
                localStorage.removeItem(_this._key);
            }else{ // case reload
                if(_this.setInitTime()){ // cho lần sau
                    _this._reload();
                } 
            }
        });
    }

    detectKYC(){ // boolean
        // check url with first prefix is kyc
        let result = false;
        let pathName = window.location.pathname;
        let prefix = pathName.split("/")[1];
        
        if(prefix == "kyc"){
            // is page kyc
            result = true;
        }
        return result;
    }

    initKYCFunc(){
        // xử lý kyc
        if(this.detectKYC){
            // var timer = new SendTimerCounter({key:`deal-${lead.leadId}`, timeDoAction: 60});
        }
        if(localStorage.getItem("kyc")){  // đang kyc

        }else{ // mới bắt đầu vào kyc
            localStorage.setItem("kyc",[0]);
        }
    }

    caseClose(timer){
        console.log("close");
        let tmpKYC = {};
        if(localStorage.getItem("kyc") !== null){ // có kyc trước đó
            tmpKYC = JSON.parse(localStorage.getItem("kyc"));
            if(tmpKYC[dealId]){ //nếu có id này trước đó
                timer.done(function(item){
                    tmpKYC[dealId]["timer"].push(item.timer);
                    tmpKYC[dealId]["timer"] = tmpKYC[dealId]["timer"].reduce((a, b) => a + b); // sum array
                });
            }else{ // nếu chưa tồn tại id
                if(dealId && dealId != null){
                    tmpKYC[dealId] = {
                        dealId:dealId,
                        timer:item.timer,
                        initTimeStamp:item.initTimeStamp
                    };
                } 
            }
            console.log("sum",tmpKYC);
            // localStorage.setItem("kyc",JSON.stringify(tmpKYC));
        }else{ // vừa mới vô mà tắt trình duyệt
            if(dealId && dealId != null){
                timer.done(function(item){
                    tmpKYC[dealId] = {
                        dealId:dealId,
                        timer:item.timer,
                        initTimeStamp:item.initTimeStamp
                    };
                });
            }
        }

        for (var key in tmpKYC) {
            if (tmpKYC.hasOwnProperty(key)) {
                let dataPost = {
                    "dealId": tmpKYC[key]["dealId"],
                    "openedDate": tmpKYC[key]["initTimeStamp"],
                    "duration": tmpKYC[key]["timer"]
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
        }
        localStorage.removeItem("kyc");
    }

    kyc(action = 'default'){
        let timer = null;
        let out = false;
        let _this = this;
        timer = new SendTimerCounter({key:`deal-kyc`, timeDoAction: 60});
        if(window.location.pathname == "/kyc/checking"){
            _this.caseClose(timer);
        }
        timer.init();
        $("body").mouseover(function(){
            out = false;
        }).mouseout(function(){
            out = true;
        });

        $("body").on("click",function(){ // trường hợp click
            if(dealId && dealId != null){ //case reload
                if(timer == null){
                    timer = new SendTimerCounter({key:`deal-kyc`, timeDoAction: 60});
                }
                _this.caseReload(timer); // done trước, init lại
                timer.init();
            }else{ // case close browser, chỉ check locastoge r gửi lên api
                _this.caseClose(timer);
            }
        })

        $(window).on('beforeunload', function(e){ // trường hợp reload and close
            if(dealId && dealId != null){
                if(out){ // case close browser
                    _this.caseClose(timer);
                }else{ // case reload
                    _this.caseReload(timer);
                }
            }
        })
        // if(dealId && dealId != null){ //kyc 
        //     let timer = new SendTimerCounter({key:`deal-${dealId}`, timeDoAction: 60});
        //     timer.init();
            
        //     // $("body").on("click",function(){
        //     if(action == 'click'){
        //         if(dealId && dealId != null){
        //             if(localStorage.getItem("kyc") !== null){ // có kyc trước đó
        //                 let tmpKYC = JSON.parse(localStorage.getItem("kyc"));
        //                 if(tmpKYC[dealId]){ //nếu có id này trước đó
        //                     timer.done(function(item){
        //                         tmpKYC[dealId]["timer"].push(item.timer)
        //                     });
        //                 }else{ // nếu chưa tồn tại id
        //                     tmpKYC[dealId] = {
        //                         dealId:dealId,
        //                         timer:[item.timer],
        //                         initTimeStamp:item.initTimeStamp
        //                     };
        //                 }
        //                 localStorage.setItem("kyc",JSON.stringify(tmpKYC));
        //             }else{ // case chưa có kyc
        //                 let set = {};
        //                 timer.done(function(item){
        //                     set[dealId] = {
        //                         dealId:dealId,
        //                         timer:[item.timer],
        //                         initTimeStamp:item.initTimeStamp
        //                     };
        //                 });
        //                 localStorage.setItem("kyc",JSON.stringify(set));
        //             }
        //             timer.init();
        //         }
        //     }
        //     // })
        //     // ---------------click not reload page KYC--------------------

        //     $("body").mouseover(function(){
        //         out = false;
        //     }).mouseout(function(){
        //         out = true;
        //     });
    
        //     $(window).on('beforeunload', function(e){
        //         if(out){ // case bấm vô nút x
        //             console.log("close");
        //             let tmpKYC = {};
        //             if(localStorage.getItem("kyc") !== null){ // có kyc trước đó
        //                 tmpKYC = JSON.parse(localStorage.getItem("kyc"));
        //                 if(tmpKYC[dealId]){ //nếu có id này trước đó
        //                     timer.done(function(item){
        //                         tmpKYC[dealId]["timer"].push(item.timer);
        //                         tmpKYC[dealId]["timer"] = tmpKYC[dealId]["timer"].reduce((a, b) => a + b); // sum array
        //                     });
        //                 }else{ // nếu chưa tồn tại id
        //                     tmpKYC[dealId] = {
        //                         dealId:dealId,
        //                         timer:item.timer,
        //                         initTimeStamp:item.initTimeStamp
        //                     };
        //                 }
        //                 console.log("sum",tmpKYC);
        //                 // localStorage.setItem("kyc",JSON.stringify(tmpKYC));
        //             }else{ // vừa mới vô mà tắt trình duyệt
        //                 timer.done(function(item){
        //                     tmpKYC[dealId] = {
        //                         dealId:dealId,
        //                         timer:item.timer,
        //                         initTimeStamp:item.initTimeStamp
        //                     };
        //                 });
        //             }

        //             for (var key in tmpKYC) {
        //                 if (tmpKYC.hasOwnProperty(key)) {
        //                     let dataPost = {
        //                         "dealId": tmpKYC[key]["dealId"],
        //                         "openedDate": tmpKYC[key]["initTimeStamp"],
        //                         "duration": tmpKYC[key]["timer"]
        //                     };
        //                     $.ajax({
        //                         url: "/timer-counter/track-time-deal",
        //                         data: JSON.stringify(dataPost),
        //                         type: "post"
        //                     }).done(function (response) {
        //                         if (response.result === false) {
        //                             console.log("Có lỗi xảy ra");
        //                         } else {
        //                             console.log("Track time success");
        //                         }
        //                     })
        //                 }
        //             }
        //             localStorage.removeItem("kyc");
        //         }else{ // case reload
        //             console.log("reload")
        //             if(localStorage.getItem("kyc") !== null){ // có kyc trước đó
        //                 let tmpKYC = JSON.parse(localStorage.getItem("kyc"));
        //                 if(tmpKYC[dealId]){ //nếu có id này trước đó
        //                     timer.done(function(item){
        //                         tmpKYC[dealId]["timer"].push(item.timer)
        //                     });
        //                 }else{ // nếu chưa tồn tại id
        //                     tmpKYC[dealId] = {
        //                         dealId:dealId,
        //                         timer:[item.timer],
        //                         initTimeStamp:item.initTimeStamp
        //                     };
        //                 }
        //                 localStorage.setItem("kyc",JSON.stringify(tmpKYC));
        //             }else{ // case chưa có kyc
        //                 let set = {};
        //                 timer.done(function(item){
        //                     set[dealId] = {
        //                         dealId:dealId,
        //                         timer:[item.timer],
        //                         initTimeStamp:item.initTimeStamp
        //                     };
        //                 });
        //                 localStorage.setItem("kyc",JSON.stringify(set));
        //             }
        //             // timer.submit({dealId: dealId}); 
        //         }
        //         return true;
        //     });
        // }else{
        //     console.log("close");
        //     let tmpKYC = {};
        //     if(localStorage.getItem("kyc") !== null){ // có kyc trước đó
        //         tmpKYC = JSON.parse(localStorage.getItem("kyc"));
        //         if(tmpKYC[dealId]){ //nếu có id này trước đó
        //             timer.done(function(item){
        //                 tmpKYC[dealId]["timer"].push(item.timer);
        //                 tmpKYC[dealId]["timer"] = tmpKYC[dealId]["timer"].reduce((a, b) => a + b); // sum array
        //             });
        //         }else{ // nếu chưa tồn tại id
        //             tmpKYC[dealId] = {
        //                 dealId:dealId,
        //                 timer:item.timer,
        //                 initTimeStamp:item.initTimeStamp
        //             };
        //         }
        //         console.log("sum",tmpKYC);
        //         // localStorage.setItem("kyc",JSON.stringify(tmpKYC));
        //     }

        //     for (var key in tmpKYC) {
        //         if (tmpKYC.hasOwnProperty(key)) {
        //             let dataPost = {
        //                 "dealId": tmpKYC[key]["dealId"],
        //                 "openedDate": tmpKYC[key]["initTimeStamp"],
        //                 "duration": tmpKYC[key]["timer"]
        //             };
        //             $.ajax({
        //                 url: "/timer-counter/track-time-deal",
        //                 data: JSON.stringify(dataPost),
        //                 type: "post"
        //             }).done(function (response) {
        //                 if (response.result === false) {
        //                     console.log("Có lỗi xảy ra");
        //                 } else {
        //                     console.log("Track time success");
        //                 }
        //             })
        //         }
        //     }
        //     localStorage.removeItem("kyc");
        // }
    }
    caseReload(timer){
        if(localStorage.getItem("kyc") !== null){ // có kyc trước đó
            let tmpKYC = JSON.parse(localStorage.getItem("kyc"));
            if(tmpKYC[dealId]){ //nếu có id này trước đó
                timer.done(function(item){
                    tmpKYC[dealId]["timer"].push(item.timer)
                });
            }else{ // nếu chưa tồn tại id
                tmpKYC[dealId] = {
                    dealId:dealId,
                    timer:[item.timer],
                    initTimeStamp:item.initTimeStamp
                };
            }
            localStorage.setItem("kyc",JSON.stringify(tmpKYC));
        }else{ // case chưa có kyc
            let set = {};
            timer.done(function(item){
                set[dealId] = {
                    dealId:dealId,
                    timer:[item.timer],
                    initTimeStamp:item.initTimeStamp
                };
            });
            localStorage.setItem("kyc",JSON.stringify(set));
        }
    }

    isPageChecking(){
        let tmpKYC = {};
        if(localStorage.getItem("kyc") !== null){ // có kyc trước đó
            tmpKYC = JSON.parse(localStorage.getItem("kyc"));
            for (var key in tmpKYC) {
                if (tmpKYC.hasOwnProperty(key)) {
                    let dataPost = {
                        "dealId": tmpKYC[key]["dealId"],
                        "openedDate": tmpKYC[key]["initTimeStamp"],
                        "duration": tmpKYC[key]["timer"].reduce((a, b) => a + b)
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
            }
            localStorage.removeItem("kyc");
        }
    }

    initEvent(){
        let _this = this;
        let out = false;
        if(dealId && dealId != null){
            let timer = new SendTimerCounter({key:`deal-kyc`, timeDoAction: 60});
            timer.init();
            // click page not reload
            $("body").on("click",function(){
                // console.log("click")
                _this.caseReload(timer); // done trước, init lại
                timer.init();
            })
            // ----------------------------
            // ----------------------------
            // reload or close browser case
            $("body").mouseover(function(){
                out = false;
            }).mouseout(function(){
                out = true;
            });
            $(window).on('beforeunload', function(e){
                if(out){ // case bấm vô nút x
                    _this.caseReload(timer);
                    _this.isPageChecking();
                }else{ // case reload
                    _this.caseReload(timer);
                }
            })
        }
    }

    kycCounter(){
        let _this = this;
        // ở trang checking thì xử lý stoge nếu có và xóa đi
        if(location.pathname == "/kyc/checking"){
            _this.isPageChecking();
        }else{ // page bình thường, có dealId
            _this.initEvent(); // start counter and listen click or reload or close here
        }
    }
}