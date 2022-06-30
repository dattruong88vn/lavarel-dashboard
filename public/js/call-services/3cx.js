var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
// Hàm dùng để mã hóa
// Base64.encode("Chuỗi cần mã hóa");
// Hàm dùng để giải mã
// Base64.decode("Chuỗi đã mã hóa");

var S3CX = (() => {

    getPZId = async (myCallConfig) => {
        let propzyCallId = null;
        let api = null;
        let dataPost = {};
        let config = {
            headers: {
                Authorization: currentUser.token,
            }
        }
        if(myCallConfig?.department){ // saleside
            switch (myCallConfig.department) {
                case 1: // 1 Pre
                    api = `${BASE_API_CALL}3cx/init-track-prescreen-history-call`;
                    dataPost = {
                        p3RDSource: "3RD_3CX",    
                        appSource: "DB",
                        phone: myCallConfig.phoneNumber,
                        lsoId: myCallConfig.id
                    };
                    break;
                case 2: // 2 SA
                    api = `${BASE_API_CALL}3cx/init-track-seller-history-call`;
                    dataPost = {
                        p3RDSource: "3RD_3CX",    
                        appSource: "DB",
                        phone: myCallConfig.phoneNumber,
                        rlistingId: myCallConfig.id
                    };
                    break;
            }
        }else{ //buyside
            api = `${BASE_API_CALL}3cx/init-track-history-call`;
            dataPost = {
                p3RDSource: "3RD_3CX",    
                appSource: "DB",
                phone: myCallConfig.phoneNumber?.phone ? myCallConfig.phoneNumber.phone : myCallConfig.phoneNumber,
            };
            if(myCallConfig?.dealId || myCallConfig?.leadId){
                dataPost.dealId = myCallConfig?.dealId ? myCallConfig.dealId : null;
                dataPost.leadId = myCallConfig?.leadId ? myCallConfig.leadId : null;
            }else{
                if(typeof deal !== 'undefined'){
                    dataPost.dealId = deal?.dealId ? deal.dealId : null;
                }
                if(typeof lead !== 'undefined'){
                    dataPost.leadId = lead?.leadId ? lead.leadId : null;
                }
            }
        }

        if(api !== null){
            await axios.post(api, dataPost,config)
            .then(xhr => {
                response = xhr.data;
                if(response?.data && response.data?.propzyCallId){
                    propzyCallId = response.data.propzyCallId
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
        $("#propzyCallId").val(propzyCallId);
        return propzyCallId;
    }

    bindCall3CX = (callId, events) => {
        Window.bindCallEvent(callId, events);
    }

    makeCall3CX  = async (myCallConfig) => {
        Window.makeCallAppService(myCallConfig);
        // let propzyCallId = await getPZId(myCallConfig);
        // let _phoneNumber = myCallConfig.phoneNumber?.phone ? myCallConfig.phoneNumber.phone : myCallConfig.phoneNumber;
        // $('#modalMakeCall3CX').modal({ // show modal make call
        //     backdrop: 'static',
        //     keyboard: false
        // }); 
        // let param = Base64.encode(`${_phoneNumber}+${propzyCallId}`);
        // phoneCall3CX(`#b${param}`)
        // _listenEndCall = myCallConfig;
    }

    return {
        makeCall3CX
    };
})();