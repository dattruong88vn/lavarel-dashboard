/**
 * Hanle voiceip over CCall
 * @author Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since crm v2.2
 * @requires jssip-3.0.15.js
 */
var CCall = (function () {
    var modalMakeCall = $("#modalMakeCall");
    var myCallConfig = null;
    var ua = null;
    var callSession = null;
    var callAudio = document.getElementById('callAudio');
    var statusAudio = document.getElementById('statusAudio');
    var callResultInfo = {
        startTime: moment().unix(),
        endTime: moment().unix(),
    };

    var causeMessages = {
        'busy': 'Máy bận',
        'unavailable': 'Số vừa gọi không đúng',
        'canceled': 'Cuộc gọi bị hủy'
    };
    var audioFiles = {
        'busy': '/voice/busy.mp3',
        'stop': '/voice/stop.mp3',
        'connected': '/voice/connected.mp3',
        'unavailable': '/voice/unavailable.mp3',
        'not_found': '/voice/not_found.mp3'
    };
    
    var statusList = {
        'busy': 32,
        'confirmed': 31,
        'unavailable': 30,
        'not_found': 33,
        'canceled': 34
    }
    
    var mapStatus = function(cause){
       cause = cause.toLowerCase();
       return statusList[cause];
    }

    var playStatusAudio = function (config) {
        statusAudio.volume = 1;
        statusAudio.autoplay = true;
        statusAudio.loop = config.loop !== undefined ? config.loop : true;
        statusAudio.src = config.file;
    };
    var stopStatusAudio = function () {
        statusAudio.pause();
    };

    function logError(message, obj) {
        console.log('-----' + message + '------');
        console.log(obj);
    }


    var initCallResultInfo = function () {
        return {
            id: null,
            number: null,
            duration: null,
            startTime: moment().unix(),
            endTime: null
        };
    };

    var options = {
        'eventHandlers': {
            'connecting': function (e) {
                logError('connecting', e);

            },
            'peerconnection': function (e) {
                logError('peerconnection', e);
            },
            'sending': function (e) {
                logError('sending', e);
            },
            'accepted': function (e) {
                logError('accepted', e);
            },
            'progress': function (e) {
                logError('progress', e);
                console.log(callSession);

                modalMakeCall.find(".callStatus").html("Đã kết nối thành công. Đang chờ bắt máy...");
                // playStatusAudio({
                //     file: audioFiles.connected 
                // });
            },
            'failed': function (e) {
                var cause = e.cause.toLowerCase();
                cause = cause.replace(/\s/i, '_');
                modalMakeCall.find(".callStatus").html(causeMessages[cause]);

                logError("failed: ", e);
                //console.log(e);
                //console.log(callSession);

                stopCallAudio();

                var statusAudioFile = audioFiles.stop;
                if (audioFiles[cause]) {
                    statusAudioFile = audioFiles[cause];
                }
                playStatusAudio({
                    file: statusAudioFile,
                    loop: false
                });

                callResultInfo.duration = 0;
                callResultInfo.id = e.message && e.message.call_id ? e.message.call_id : null;
                callResultInfo.cause = e.cause ? e.cause: null;
                callResultInfo.statusId = mapStatus(cause);
                if (myCallConfig.onCallEnded) {
                    myCallConfig.onCallEnded(callResultInfo);
                }
                modalMakeCall.modal("hide");
                $("#btnToggleModalMakeCall").hide();
            },
            'ended': function (e) {
                //console.log('call ended with cause: ');
                console.log(e);
                console.log(callSession);
                stopCallAudio();
                playStatusAudio({
                    file: audioFiles.stop, loop: false
                });
                var startTime = moment(callSession.start_time);
                var endTime = moment(callSession.endTime);
                callResultInfo.duration = endTime.diff(startTime, 'seconds');
                callResultInfo.id = e.message && e.message.call_id ? e.message.call_id : null;
                callResultInfo.startTime = startTime.unix();
                callResultInfo.endTime = endTime.unix();
                callResultInfo.cause = e.cause ? e.cause: null;
                callResultInfo.statusId = statusList.confirmed;
                if (myCallConfig.onCallEnded) {
                    myCallConfig.onCallEnded(callResultInfo);
                }
                $("#btnToggleModalMakeCall").hide();
                modalMakeCall.modal("hide");
            },
            'confirmed': function (e) {
                modalMakeCall.find(".callStatus").html("Đang nói chuyện...");
                //console.log(e);
                console.log(callSession);
                stopStatusAudio();
            }
        },
        'mediaConstraints': {'audio': true, 'video': false},
        'sessionTimersExpires': 999999
    };





    function initModalMakeCall() {
        $("#btnToggleModalMakeCall").hide();
        $(".btn-hideModalMakeCall").on('click', function () {
            $("#btnToggleModalMakeCall").show();
            $('#modalMakeCall').modal("hide");
        });
        $("#btnToggleModalMakeCall").on('click', function () {
            $("#btnToggleModalMakeCall").hide();
            $('#modalMakeCall').modal();
        });

        $(".btn-stopCCall").on("click", function (event) {
            event.preventDefault();
            CCall.terminateCall();
        });
    }

    initModalMakeCall();

    function start(infoCallConfig) {
        var infoCall = {
            wsuri: 'sbcwrtchcm.ccall.vn',
            port: '8080',
            user_extend: null,
            password: null,
            // server: 'crv001.testapi' /// config server test
            server: 'propzyhcm160.ccall.vn' // config server production
        };
        if (infoCallConfig) {
            infoCall = {
                wsuri: infoCallConfig.wsuri ? infoCallConfig.wsuri : infoCall.wsuri,
                port: infoCallConfig.port ? infoCallConfig.port : infoCall.port,
                user_extend: infoCallConfig.user_extend ? infoCallConfig.user_extend : infoCall.user_extend,
                server: infoCallConfig.server ? infoCallConfig.server : infoCall.server,
                password: infoCallConfig.password ? infoCallConfig.password : infoCall.password
            };
        }
        //console.log(infoCall);
        //var socket = new JsSIP.WebSocketInterface('wss://' + infoCall['wsuri'] + ':' + infoCall['port'] + '/ws');
        var socket = new JsSIP.WebSocketInterface('wss://' + infoCall['wsuri'] + ':' + infoCall['port']);
        ua = new JsSIP.UA({
            sockets: [socket],
            uri: infoCall['user_extend'] + '@' + infoCall['server'],
            password: infoCall['password']
        });
        ua.start();
        ua.on('newRTCSession', function (e) {
            callSession = e.session;
            if (callSession.direction === "incoming") {
                /*
                 callSession.on('addstream', function (e) {
                 console.log("accepting call");
                 callAudio.volume = 1;
                 callAudio.autoplay = true;
                 callAudio.loop = true;
                try{
                    callAudio.srcObject = event.stream;
                    callAudio.play();
                } catch (error) {
                    callAudio.src = window.URL.createObjectURL(event.stream);
                }
                 });
                 */
                // handleIncomingCall(callSession);

            }
        });
    }

    function handleIncomingCall(callSession) {
        if (confirm("Bạn có một cuộc gọi đến. Bạn có muốn nhận không?")) {
            var options = {
                'mediaConstraints': {
                    'audio': true,
                    'video': false
                }
            };
            callSession.answer(options);
            callSession.connection.addEventListener('addstream', function (event) {
                callAudio.volume = 1;
                callAudio.autoplay = true;
                callAudio.loop = true;
                try{
                    callAudio.srcObject = event.stream;
                    callAudio.play();
                } catch (error) {
                    callAudio.src = window.URL.createObjectURL(event.stream);
                }
            });
        } else {
            terminateCall();
        }

    }

    makeCallCCall = (callConfig) => {
        $(modalMakeCall).modal({
            backdrop: 'static',
            keyboard: false
        });
        modalMakeCall.find(".callStatus").html("Đang kết nối tới số máy khách hàng...");
        myCallConfig = callConfig;
        callResultInfo = initCallResultInfo();
        callResultInfo.number = callConfig.phoneNumber;
        // start make call
        ua.call(callConfig.phoneNumber, options);
        callSession.connection.addEventListener('addstream', function (event)
        {
            callAudio.volume = 1;
            callAudio.autoplay = true;
            callAudio.loop = true;
            try{
                callAudio.srcObject = event.stream;
                callAudio.play();
            } catch (error) {
                callAudio.src = window.URL.createObjectURL(event.stream);
            }
        });
    }

    function bindCallEvent(callId, events) {
        bindCall3CX(callId, events);
    }

    function makeCall(callConfig) {
        // callConfig.phoneNumber = '0779678136';
        let _phones = callConfig.phoneNumber ? callConfig.phoneNumber.split(',') : [];
        if(_phones.length > 1){
            callConfig.phoneNumber = _phones[0];
        }
        switch (CALL_SERVICES) {
            case "2": // 
                makeCallCCall(callConfig);
                break;
            default: // 1 or != 2 will be 3CX Services
                makeCall3CX(callConfig);
                break;
        }
    }

    function terminateCall() {
        try {
            callSession.terminate();
        } catch (ex) {
            console.log(ex);
        }
        modalMakeCall.modal("hide");
        hidePropzyLoading();
    }

    function stopCallAudio() {
        if (callAudio) {
            callAudio.pause();
            callAudio.src = null;
        }
    }

    function activeButtons() {
        $("#btnToggleModalMakeCall").css('pointer-events', 'auto');
        $("#btn-hideModalMakeCall").css('pointer-events', 'auto');
        $("#btn-stopCCall").css('pointer-events', 'auto');
    }
    
    var getCallInfo = function(params){
        var postData = {};
        if(params && params.callId){
            postData.call_id = params.callId;
        }
        $.ajax({
           "url": "/call/get-call-info",
           "type": "post",
           "data": JSON.stringify(postData)
        }).done(function(response){
            if(params && params.callBack){
                params.callBack(response);
            }
            console.log(response);
        }).always(function(){
            
        });
    }


    return {
        "start": start,
        "makeCall": makeCall,
        "terminateCall": terminateCall,
        "activeButtons": activeButtons,
        "getCallInfo": getCallInfo,
        "bindCallEvent": bindCallEvent
    };
    
})(S3CX);