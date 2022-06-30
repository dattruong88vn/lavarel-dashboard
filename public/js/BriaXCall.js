/**
 * Hanle voiceip over BriaX
 * @author Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since crm v2.1
 */
var BriaXCall = (function () {
    var myConfig = null;
    var webSocket = null;
    var XmlDeclaration = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\r\n";
    var isConnected = false;
    var getStatusInterval = null;
    var latestCallId = null;
    var getLatestCallInterval = null;
    function connect(callBack) {
        var ws = new WebSocket("wss://cpclientapi.softphone.com:9002/counterpath/socketapi/v1");
        ws.onopen = function () {
            isConnected = true;
            if (callBack) {
                callBack();
            }
        };
        ws.onmessage = function (evt)
        {
            var receivedMessage = evt.data;
            receivedMessage = receivedMessage.replace("\r\n", "\n");
            var arrReceivedMessage = receivedMessage.split("\n");
            var messageType = parseMessageType(arrReceivedMessage[0]);
            var xmlContent = "";
            for (var i = 0; i < arrReceivedMessage.length; i++) {
                var textLine = arrReceivedMessage[i].trim();
                if (textLine.indexOf("<") === 0) {
                    xmlContent += textLine;
                }
            }
            var xmlDoc = $.parseXML(xmlContent);
            switch (messageType.messageType) {
                case "response":
                    handleResponse(xmlDoc);
                    break;
                case "event":
                    handleEvent(xmlDoc);
                    break;
            }

        };
        ws.onclose = function ()
        {
            clearInterval(getStatusInterval);
            clearInterval(getLatestCallInterval);
            isConnected = false;
            isCalling = false;
        };
        return ws;
    }



    function handleEvent(xmlDoc) {
        // will be implement later...
    }
    function handleResponse(xmlDoc) {
        console.log("=== handleing response... ===");
        var responseType = $(xmlDoc).find("status").attr("type");
        var callState = $(xmlDoc).find("status state").text().trim();
        console.log(responseType + " status: " + callState);
        switch (responseType) {
            case "callHistory":
                var xmlCallHistory = $(xmlDoc).find("callHistory");
                var callInfo = {
                    id: $(xmlCallHistory).find("id").text(),
                    number: $(xmlCallHistory).find("number").text(),
                    duration: $(xmlCallHistory).find("duration").text()
                };
                if (myConfig.onCallEnded) {
                    myConfig.onCallEnded(callInfo);
                }
                afterCalling();
                return false;
                break;
            case "call":
                var xmlCalls = $(xmlDoc).find("call");
                if (latestCallId === null || latestCallId.trim() === "") {
                    latestCallId = $(xmlCalls).find("id").text();
                }
                if (latestCallId != null && latestCallId != "" && !xmlCalls.html()) {
                    getCallItem(latestCallId);
                    afterCalling();
                } else if (callState == "failed") {
                    var callInfo = {
                        id: $(xmlCalls).find("id").text(),
                        number: $(xmlCalls).find("number").text(),
                        duration: 0,
                    };
                    if (myConfig.onCallEnded) {
                        myConfig.onCallEnded(callInfo);
                    }
                    afterCalling();
                } else if (callState == "ended") {
                    getCallItem(latestCallId);
                    afterCalling();
                } else if (callState == "connecting") {
                }
                break;
        }

    }


    function makeCall(config) {
        if (config.showLoading != false) {
            showPropzyLoading();
        }
        latestCallId = null;
        myConfig = config;
        myConfig.phoneNumber = sanitizePhoneNumber(myConfig.phoneNumber);
        var content = XmlDeclaration + "<dial type=\"" + "audio" + "\">\r\n <number>" + myConfig.phoneNumber + "</number>\r\n <displayName></displayName>\r\n</dial>";
        if (!isConnected) {
            webSocket = connect(function () {
                webSocket.send(constructApiMessage("call", content));
                getStatusInterval = setInterval(function () {
                    getStatus("call");
                }, 1000);
            });
        } else {
            latestCallId = null;
            webSocket.send(constructApiMessage("call", content));
            getStatusInterval = setInterval(function () {
                getStatus("call");
            }, 1000);
        }

        isCalling = true;
    }

    function getStatus(type)
    {
        var content = XmlDeclaration + "<status>\r\n <type>" + type + "</type>\r\n</status>";
        var msg = constructApiMessage("status", content);
        webSocket.send(msg);
    }



    function getCallItem(id) {
        var content = XmlDeclaration + "<status>\r\n <type>callHistoryItem</type>\r\n<id>" + id + "</id>\r\n</status>";
        var msg = constructApiMessage("status", content);
        webSocket.send(msg);
    }

    function handleFailCall() {
        console.log("Call fail");
    }

    function handleEndedCall() {
        if (myConfig.onCallEnded) {
            myConfig.onCallEnded();
        }
        console.log("Call ended");
    }

    function afterCalling() {
        clearInterval(getStatusInterval);
        //clearInterval(getLatestCallInterval);
        hidePropzyLoading();
    }


    function constructApiMessage(request, content) {
        var callId = generateCallId();
        var msg = "GET /";
        msg += request;
        msg += "\r\nUser-Agent: Bria API Sample App";
        msg += "\r\nTransaction-ID: ";
        msg += callId;
        msg += "\r\nContent-Type: application/xml";
        msg += "\r\nContent-Length: ";
        if (content != null)
        {
            msg += content.length;
            msg += "\r\n\r\n";
            msg += content;
        } else
        {
            msg += "0";
        }
        return msg;
    }

    function parseMessageType(line) {
        var returnValue = {
            messageType: null,
            eventType: null
        };
        if (line.startsWith("HTTP/1.1")) {
            line = line.substring(9, line.length).trim();
            if (line.startsWith("200")) {
                returnValue.messageType = "response";
            } else if (line.startsWith("4") || line.startsWith("5")) {
                returnValue.messageType = "error";
            }
        } else if (line.startsWith("POST")) {
            returnValue.messageType = "event";
            line = line.substring(5, line.length).trim();
            if (line.startsWith("/statusChange")) {
                returnValue.eventType = "StatusChange";
            }
        }
        return returnValue;
    }

    function generateCallId() {
        return "prop-" + moment().unix();
    }

    function stopCall() {

    }

    function sanitizePhoneNumber(number) {
        number = number.replace(/\s/g, '');
        var specialChars = [",", "/", ";", ".", ":"];
        for (var i = 0; i < specialChars.length; i++) {
            number = number.split(specialChars[i])[0];
        }
        return number;
    }

    return {
        connect: connect,
        makeCall: makeCall,
        sanitizePhoneNumber: sanitizePhoneNumber
    };
})();