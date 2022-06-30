// Window.pbx_3cx = new pbx_3CX();
// var _listenEndCall = null;
// var callResult3CX = {
//     id: null,
//     number: null,
//     duration: null,
//     startTime: moment().unix(),
//     endTime: null
// };

// // //sự kiện đổ chuông cuộc gọi đến
// // pbx_3cx.Event_Ringing_3CX = function(OtherPartyNumber,currentExtension) {
// //     console.log("sự kiện đổ chuông cuộc gọi đến");
// // }
// // sự kiện đổ chuông cuộc gọi đi
// pbx_3cx.Event_Dialing_3CX = function(OtherPartyNumber,currentExtension) {
// //     console.log("sự kiện đổ chuông cuộc gọi đi",OtherPartyNumber);
//     $('#msg-3cx-softphone-modal').html("Cuộc gọi đi đang diễn ra trên softphone ...");
// }
// // //sự kiện cuộc gọi được kết nối
// pbx_3cx.Event_Connected_3CX = function(OtherPartyNumber,currentExtension) {
//     console.log("sự kiện cuộc gọi được kết nối",OtherPartyNumber);
//     $('#msg-3cx-softphone-modal').html("Cuộc gọi đã được kết nối ...");
// }

// // sự kiện error khi chưa bật softphone hoặc chưa có plugin 
// pbx_3cx.Event_Error_3CX= function(text) {
//     if(($("#modalMakeCall3CX").data('bs.modal') || {}).isShown || $("#btnToggleModalMakeCall3CX").is(":visible")){
//         $("#modalMakeCall3CX").modal("hide");
//         $("#btnToggleModalMakeCall3CX").hide();
//         $('#modalNotOpenApp3CX').modal();
//     }
// }

// pbx_3cx.Event_Ended_3CX = function(OtherPartyNumber,currentExtension){
//     if(_listenEndCall !== null){ // trường hợp app call event call nhiều lần từ các tab init khác
//         if (_listenEndCall.onCallEnded) {
//             _listenEndCall.onCallEnded(callResult3CX);
//         }
//         $("#btnToggleModalMakeCall3CX").hide();
//         $('#modalMakeCall3CX').modal("hide");
//         _listenEndCall = null;
//     }
// }

// pbx_3cx.Start();

// function phoneCall3CX(stringNumberPhone){
//     pbx_3cx.Send_MakeCall_3CX(stringNumberPhone);
// }

// $(document).ready(()=>{

//     $("#btnToggleModalMakeCall3CX").hide();
//     $(document).on('shown.bs.modal', '#modalMakeCall3CX', function () {
//         $(".btn-hideModalMakeCall-3CX").on('click', function () {
//             $("#btnToggleModalMakeCall3CX").show();
//             $('#modalMakeCall3CX').modal("hide");
//         });
//         $("#btnToggleModalMakeCall3CX").on('click', function () {
//             $(this).hide();
//             $('#modalMakeCall3CX').modal();
//         });
    
//         $(".btn-stopCCall-3CX").on("click", function (event) {
//             event.preventDefault();
//             pbx_3cx.Send_DropCall_3CX();
//         });
//     });
    
// })