<div id="request-listing-modal" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Lý do</h4>
         </div>
         <div class="modal-body">
            <form class="form-group" role="form">
              <div class="radio">
                 <label><input type="radio" name="send-request-opt" class="send-request-opt" value="opened" checked="checked"> Mở bán lại</label>
              </div>
              <div class="radio">
                <label><input type="radio" name="send-request-opt" class="send-request-opt" value="other"> Khác</label>
              </div>
               <div class="row form-group">
                  <div id="lsoRequestContainer" class="col-sm-12" style="display:none;">
                     <label>Lý do:</label>
                     <textarea class="form-control" id="lsoRequestNote" rows="5">
                     </textarea>
                  </div>
               </div>
            </form>
         </div>
         <div class="modal-footer">
           <button id="request-lso-submit" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu
           <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Huỷ</button>
         </div>
      </div>
   </div>
</div>
