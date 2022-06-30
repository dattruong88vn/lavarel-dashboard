class TimerCountDown {
    constructor(config) {
        this.config = config;
        this.timer = 0;
        this.timerCounting = null;
        this.isDoAction = true;
        this.timeDoAction = null;
        this.mousemove = false;
        this.clearInterval = null;
        this.timeNotAction = 0;

        this.initTimeStamp = new Date().getTime();
    }

    init() {
        if(this.config){
            this.timer = 0;
            let thisObjTimer = this;
            thisObjTimer.checkAction();
            if (thisObjTimer.config){
                thisObjTimer.timeDoAction = thisObjTimer.config.timeDoAction * 60;
            }
            this.timerCounting = setInterval(function () {
                thisObjTimer.timer = thisObjTimer.timer + 1;
                if (!thisObjTimer.isDoAction) {
                    let key = thisObjTimer.config.key.split('-');
                    // let name = key[0].charAt(0).toUpperCase() + key[0].slice(1);
                    // case warning for deal
                    if(key[0] === 'deal'){
                        if( !$('#modalMakeCall').hasClass('in') && !$('#btnToggleModalMakeCall').is(":visible") ){
                            timer.submit({ dealId: deal.dealId });
                            window.location.replace("/");
                        }
                    }else{
                        $('#modalWarningNoActive #message').html(
                            `Đã qua ${thisObjTimer.timeDoAction/60} phút mà bạn không có hoạt động nào trên ${key[1]}
                            `);
                        $('#modalWarningNoActive').modal();
                    }
                }else{
                    if(thisObjTimer.timeDoAction < thisObjTimer.timer && thisObjTimer.config && !thisObjTimer.mousemove){
                        let key = thisObjTimer.config.key.split('-');
                        // let name = key[0].charAt(0).toUpperCase() + key[0].slice(1);
                        // case warning for deal
                        if(key[0] === 'deal'){
                            if( !$('#modalMakeCall').hasClass('in') && !$('#btnToggleModalMakeCall').is(":visible") ){
                                timer.submit({ dealId: deal.dealId });
                                window.location.replace("/");
                            }
                        }else{
                            $('#modalWarningNoActive #message').html(
                                `Đã qua ${thisObjTimer.timeDoAction/60} phút mà bạn không có hoạt động nào trên ${key[1]}
                                `);
                            $('#modalWarningNoActive').modal();
                        }
                    }
                }
            }, 1000);
        }
    }

    getInitTimeStamp() {
        return this.initTimeStamp;
    }

    setInitTimeStamp(timeStamp) {
        this.initTimeStamp = timeStamp;
    }

    checkAction(){
        let thisObjTimer = this;
        // document.onmousedown = function (e) {
        //    thisObjTimer.isDoAction = true;
        // }; 
        // document.onscroll = function (e) {
        //     thisObjTimer.isDoAction = true;
        // }
        $(document).mousemove(function(e){ //được kích hoạt khi rê chuột
            thisObjTimer.isDoAction = true;
            thisObjTimer.mousemove = true;
            if(thisObjTimer.clearInterval !== null){
                clearInterval(thisObjTimer.clearInterval);
                thisObjTimer.timeNotAction = 0;
            }
            var lastTimeMouseMoved = new Date().getTime();
            
            thisObjTimer.clearInterval = setInterval(()=>{
                var currentTime = new Date().getTime();
                var calTime = currentTime - lastTimeMouseMoved;
                if(calTime > 1000){
                    thisObjTimer.timeNotAction = thisObjTimer.timeNotAction + 1;
                    if(thisObjTimer.timeNotAction > thisObjTimer.timeDoAction){
                        thisObjTimer.isDoAction = false;
                    }
                }
            },1000);
        });
    }

    done(callback) {
        let thisObjTimer = this;

        // console.log("config timer couter",thisObjTimer.config);
        if(thisObjTimer.config && thisObjTimer.config.key){
            if(localStorage.getItem(thisObjTimer.config.key) !== null){
                callback({ 
                    timer: thisObjTimer.timer, 
                    initTimeStamp:   localStorage.getItem(thisObjTimer.config.key) 
                });
            }else{
                callback({ 
                    timer: thisObjTimer.timer, 
                    initTimeStamp:   thisObjTimer.initTimeStamp 
                });
            } 
        }else{
            callback({ 
                timer: thisObjTimer.timer, 
                initTimeStamp: thisObjTimer.initTimeStamp 
            });
        }
        clearInterval(thisObjTimer.timerCounting);
    }

    dontActionInTime(seconds) {
        console.log('dont action ', this.config);
    }

}