<div id="modal-duplication" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog modal-lg" style="min-width: 900px;">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header" style="padding: 0;">
                <button type="button" class="close" id="close-dupicate" data-dismiss="modal">&times;</button>
                <style type="text/css">
                    #close-dupicate{
                        padding: 5px 10px;
                        background-color: #dd4b39;
                        opacity: 1;
                        margin-top: 6px;
                        margin-right: 7px;
                        color: #fff;
                    }
                </style>
                <ul class="nav nav-pills">
                    <li id="li-phone"><a data-toggle="tab" data-type="phone" href="#tabPhone">Trùng SĐT <span></span></a> </li>
                    <li id="li-mail"><a data-toggle="tab" data-type="email" href="#tabMail" >Trùng email <span></span></a></li>
                    <li id="li-address"><a data-toggle="tab" data-type="lid" href="#tabLID">Trùng địa chỉ <span></span></a></li>
                </ul>
            </div>
            <div class="modal-body" style="padding-bottom: 0px;">
                <div id="content-duplication">
                   <div class="tab-content">
                        <div id="tabPhone" class="tab-pane">
                            <div class="list-profile">
                                <div class="row" style="padding-top: 3px; padding-bottom: 3px;">
                                    <div class="col-md-4" style="padding-right: 0px;">
                                        <div class="item-info">
                                            <b>Tên: </b>
                                            <span class="name"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style="padding-right: 0">
                                        <div class="item-info">
                                            <b>SĐT: </b>
                                            <span class="phone"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="item-info">
                                            <b>Email: </b>
                                            <span class="email"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="item-info">
                                            <b>Loại: </b>
                                            <span class="type"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-dupicate">
                                <h4>Danh sách tin đăng</h4>
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Địa chỉ</th>
                                        <th>Giá</th>
                                        <th>Loại</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div id="tabMail" class="tab-pane fade">
                            <div class="list-profile">
                                <div class="row" style="padding-top: 3px; padding-bottom: 3px;">
                                    <div class="col-md-4" style="padding-right: 0px;">
                                        <div class="item-info">
                                            <b>Tên: </b>
                                            <span class="name"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style="padding-right: 0">
                                        <div class="item-info">
                                            <b>SĐT: </b>
                                            <span class="phone"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="item-info">
                                            <b>Email: </b>
                                            <span class="email"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="item-info">
                                            <b>Loại: </b>
                                            <span class="type"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-dupicate">
                                <h4>Danh sách tin đăng</h4>
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Địa chỉ</th>
                                        <th>Giá</th>
                                        <th>Loại</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div id="tabLID" class="tab-pane fade">
                            <div class="list-dupicate">
                                <h4>Danh sách tin đăng</h4>
                                <table class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Địa chỉ</th>
                                        <th>Giá</th>
                                        <th>Loại</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
