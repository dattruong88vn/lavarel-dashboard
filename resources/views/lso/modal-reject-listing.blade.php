<div id="modal-reject-listing" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">            
            <h4 class="modal-title">Từ chối</h4>
         </div>
         <div class="modal-body">
            <form class="form-group" role="form">
              <div id="reject-opts"></div>
              <div id="reject-reason" class="row form-group" style="display:none;">
                <label class="control-label col-sm-12">Lý do</label>
                <div class="col-sm-12">
                  <textarea id="reject-reason-input" class="form-control" rows="5"></textarea>
                </div>
              </div>
            </form>
         </div>
         <div class="modal-footer">
           <button id="reject-lso-submit" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu
           </button>
           <button id="close-reject-modal" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Huỷ</button>
         </div>
      </div>
   </div>
</div>
