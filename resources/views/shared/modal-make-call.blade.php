<div style="z-index:999999" id="modalMakeCall" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close hidden" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Gọi điện thoại</h4>
            </div>
            <div class="modal-body">	
                <div class="" id="call_audio_wrapper" >
                    <audio controls class="callAudio" id="callAudio" width="100" ></audio>
                    <audio controls class="statusAudio hidden" id="statusAudio" width="100"></audio>
                </div>
                <div class="call_status_wrapper" >
                    <div class="callStatus"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success btn-hideModalMakeCall">Ẩn cuộc gọi</button> 
                <button class="btn btn-danger btn-stopCCall">Tắt</button>              
            </div>
        </div>
    </div>
</div>

<div style="z-index:999999" id="modalMakeCall3CX" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close hidden" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Gọi điện thoại</h4>
            </div>
            <div class="modal-body">
                <h5 id="msg-3cx-softphone-modal">Đang kết nối tới softphone ...<h5>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success btn-hideModalMakeCall-3CX">Ẩn cuộc gọi</button>
                <button class="btn btn-danger btn-stopCCall-3CX">Tắt</button>             
            </div>
        </div>
    </div>
</div>

<div style="z-index:999999" id="modalNotOpenApp3CX" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thông báo</h4>
            </div>
            <div class="modal-body">
                <h5>Không kết nối được với 3CX Client. Vui lòng kiểm tra lại. 
                   <a target="_blank" href="https://cdn.propzy.vn/3cx/huong_dan.gif">Xem hướng dẫn</a>.<h5>
            </div>
        </div>
    </div>
</div>

<button id="btnToggleModalMakeCall" class="btn btn-danger" style="position: fixed; bottom:0px; left:0px;z-index:999999999; display:none;"><i class="fa fa-phone"></i> Hiện cuộc gọi</button>
<button id="btnToggleModalMakeCall3CX" class="btn btn-danger" style="position: fixed; bottom:0px; left:0px;z-index:999999999; display:none;"><i class="fa fa-phone"></i> Hiện cuộc gọi</button>

<script src="/js/jssip-3.2.11.js"></script>
<!-- <script src="https://api-propzy.ringbot.co/api3cx/pbx_3cx.js "></script> -->
<!-- <script src="https://api-propzy.ringbot.co/api3cx/pbx_3cx_live_v3.js"></script> -->
<script src="{{loadAsset('/js/call-services/3cx-connect-client-tool.js') }}"></script>
<script type="text/javascript">
    CCall.start({
        user_extend: '{{ Session::get("user")->voipId }}',
        password: '{{ Session::get("user")->voipPassword }}'
    });
</script>