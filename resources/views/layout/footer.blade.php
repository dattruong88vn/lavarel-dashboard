@include('shared.modal-negotiate-reminder')
@include('shared.modal-deposit-task-detail')
@include('shared.modal-quick-check-listings')
@include('shared.modal-task-detail')
@include('shared.modal-missing-schedule')
@include('crm-dashboard.modal-reject-meeting')
@include('crm-dashboard.modal-create-task')
@include('call.modal-update-call')
@include('shared.modal-confirm')
@include('shared.modal-make-call')
<!-- alert model -->
@include('layout.alert-modal')
@include('layout.alert-modal-popup-general')
<!-- end alert modal -->
<!-- confirm model -->
<div id="confirmModal" style="z-index:10000000000;" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Xác nhận</h4>
            </div>
            <div class="modal-body message">
                <p>Đã có lỗi xảy ra</p>
            </div>
            <div class="modal-footer">
                <button id="confirm-cancel-btn" type="button" class="btn btn-default" data-dismiss="modal">Không</button>
                <button id="confirm-ok-btn" type="button" class="btn btn-success">Có</button>
            </div>
        </div>

    </div>
</div>
<!-- end confirm modal -->

<div id='ajax-loading' style="
    position: fixed;
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100000;
    background-color: rgba(0, 0, 0, .6);
    display: none;
">
    <div className="spinner-icon" style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: spinner 2s linear infinite ;
        "></div>

</div>
<!--<footer class="main-footer">
    <div class="pull-right hidden-xs">
        Anything you want
    </div>
    <strong>Copyright © 2015 <a href="#">Company</a>.</strong> All rights reserved.
</footer>-->
<div id="notify-area">
    <ul class="notifyList">
        <li>
            <button class="toggle-notification"><i class="fa fa-chevron-right"></i></button>
        </li>
    </ul>
</div>

<!-- notify model -->
<div id="modalScheduleNotify" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body message">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-yes">Đồng Ý</button>
            </div>
        </div>

    </div>
</div>
<!-- modal notify time counter -->
<div id="modalTimeCounterStaffNotify" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body message">
                <h4>Bạn có {id} chưa được xử lý</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-yes">Đồng Ý</button>
            </div>
        </div>
    </div>
</div>
<div id="modalTimeCounterLeaderNotify" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body message">
                <h4>Nhân viên {name} chưa được xử lý</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-yes">Đồng Ý</button>
            </div>
        </div>
    </div>
</div>
<div id="modalTimeCounterAsmNotify" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body message">
                <h4>Nhân viên {name} thuộc team {group} chưa được xử lý</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-yes">Đồng Ý</button>
            </div>
        </div>
    </div>
</div>
<!-- end alert modal -->
<script src="{{loadAsset("/js/global-notifications.js")}}"></script>
<script src="{{loadAsset("/js/pfs-notifications.js")}}"></script>
<script src="{{loadAsset("/js/time-counter-notification.js")}}"></script>
<!-- <script src="http://localhost:8000/livereload.js"></script> -->