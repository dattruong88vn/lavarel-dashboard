<div id="modalReassignResponsiblePerson" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Reassign người chịu trách nhiệm chính</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="" class="col-sm-12">Người chịu trách nhiệm chính</label>
                        <div class="col-sm-12" {{$assignedTo}}>
                            <select class="assignedTo form-control select2" name="assignedTo" style="width:100%;" >
                                <option value=''  >Chọn người chịu trách nhiệm</option>
                                <?php
                                if ($accounts):
                                    foreach ($accounts as $account): 
                                        $disabled = (isset($currentUser) && $currentUser->userId == $account->userId) ? "disabled" : "";
                                        ?>
                                        <option {{$disabled}} value="{{$account->userId}}" >{{$account->name}}</option>
                                        <?php
                                    endforeach;
                                endif;
                                ?>
                            </select>
                            <div class="errors" ></div>
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-12">Lý do chuyển cho người khác</label>
                        <div class="col-sm-12">
                            <textarea  name="leadReassignReason" id="leadReassignReason" class="form-control" rows="6" placeholder="Nhập lý do"></textarea>
                            <div class="errors" ></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success btnSaveReassignResponsiblePerson">Lưu</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Hủy</button>
            </div>
        </div>

    </div>
</div>