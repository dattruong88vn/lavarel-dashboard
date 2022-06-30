<div id="sold-listing-modal" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Lý do</h4>
         </div>
         <div class="modal-body">
            <form class="form-group" role="form">
               <div class="radio">
                  <label><input type="radio" name="sold-by" class="sold-by" value="propzy"> Do Propzy bán</label>
               </div>
               <div class="radio">
                 <label><input type="radio" name="sold-by" class="sold-by" value="owner"> Do khách tự bán</label>
               </div>
               <div class="row form-group">
                 <div class="col-sm-1"></div>
                 <div class="col-sm-5">
                   <span class="sold-options-by"></span>
                 </div>
               </div>
               <div class="sold-add-opts" style="display:none;">
                <div class="row form-group">
                  <label class="col-sm-2 control-label" for="meeting-note" >Ngày bán</label>
                  <div class="col-sm-4">
                    <input id="sold-date" type="text" class="form-control input-small">
                  </div>
                </div>
                <div class="row form-group">
                  <label class="col-sm-2 control-label" for="meeting-note" >Giá bán</label>
                  <div class="col-sm-4">
                    <input id="sold-price" type="text" class="form-control col-sm-3">
                  </div>
                </div>
              </div>
            </form>
         </div>
         <div class="modal-footer">
           <button id="sold-lso-submit" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu</button>
           <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Huỷ</button>
         </div>
      </div>
   </div>
</div>
