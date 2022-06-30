<div id="rent-listing-modal" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Lý do</h4>
         </div>
         <div class="modal-body">
            <form class="form-group" role="form">
              <div class="radio">
                 <label><input type="radio" name="rent-by" class="rent-by" value="propzy">Do Propzy cho thuê</label>
              </div>
              <div class="radio">
                <label><input type="radio" name="rent-by" class="rent-by" value="owner">Do khách tự cho thuê</label>
              </div>
              <div class="row form-group">
                <div class="col-sm-1"></div>
                <div class="col-sm-5">
                  <span class="rent-options-by"></span>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-sm-12">
                  Hợp đồng
                </div>
              </div>
              <div class="row form-group">
                <div class="col-sm-6">
                  <div class="form-group">
                    Từ
                    <div class="input-group bootstrap-timepicker timepicker">
                       <input id="rent-from" type="text" class="form-control input-small">
                   </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    Đến
                    <div class="input-group bootstrap-timepicker timepicker">
                       <input id="rent-to" type="text" class="form-control input-small">
                   </div>
                  </div>
                </div>
              </div>
               <div class="row form-group">
                <label class="col-sm-2 control-label" for="meeting-note" >Giá thuê</label>
                <div class="col-sm-8">
                  <input id="rent-price" type="text" class="form-control">
                </div>
               </div>
            </form>
         </div>
         <div class="modal-footer">
           <button id="rent-lso-submit" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu
           </button>
           <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Huỷ</button>
         </div>
      </div>
   </div>
</div>
