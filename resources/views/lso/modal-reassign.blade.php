<div id="reassign-modal" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Reassign</h4>
         </div>
         <div class="modal-body">
            <form id="lso-reassign-form" class="form-horizontal" role="form">
               <input type="hidden" id="reassignLsoId" value="">
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="assignedTo">Nhân viên LSO</label>
                  <div class="select-2 col-sm-8">
                     <select id="assignedTo" class="form-control">
                        <option value="">--Chọn LSO--</option>
                     </select>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-2">
                     <button id="process-reassign-btn" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu</button>
                  </div>
                  <div class="col-sm-2 padding-side-button">
                     <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Huỷ</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>