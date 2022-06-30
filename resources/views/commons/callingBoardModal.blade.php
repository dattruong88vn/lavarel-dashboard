<div id="callingBoard" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <div class="modal-header-heading"></div>
            </div>
            <div class="modal-body">
                <div class="internal-phone-list"></div>
                <div class="phone-list-area">
                    <!-- <div class="list-title">Hoặc qua số điện thoại cá nhân</div> -->
                    <div class="phone-list"></div>     
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            </div>       
        </div>              
    </div>
</div>
<style>
    #callingBoard .modal-dialog {
        background: white;
        width: 320px;
    }
    #callingBoard .list-title {
        font-weight: bold;
    }
    .modal-header-heading {
        font-size: 16px;
    }
    #callingBoard .phone-list-area {
        /* margin-top: 20px; */
    }
    #callingBoard .phone-list {
        /* margin-top: 10px; */
    }
    #callingBoard .input-group {
        margin-bottom: 10px;
    }
    #callingBoard .input-group:last-child {
        margin-bottom: 0;
    }
    #callingBoard .input-group .input-group-addon-success-btn{
        background-color: #00a65a;
        color: #ffffff;
        cursor: pointer;
        border: 1px solid #00a65a;
    }
    #callingBoard .close-btn {
        border-radius: 0;
        background: white;
        font-weight: bold;
        float: right;
        border-color: #cdcdcd;
        color: black;
        margin-top: 20px;
    }
</style>