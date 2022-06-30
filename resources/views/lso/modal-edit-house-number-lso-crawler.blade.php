

<div id="edit-house-modal" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Cập nhật địa chỉ</h4>
         </div>
         <div class="modal-body">
            <form class="form-group" role="form">
               <div class="row form-group">
                  <div class="col-sm-4">
                     <label for="crawlerWard">Phường</label>
                     <select id="crawlerWard" class="form-control"></select>
                     <span id="crawlerWard-error"></span>
                  </div>
                  <div class="col-sm-6">
                     <label for="crawlerStreet">Đường</label>
                     <select id="crawlerStreet" class="form-control"></select>
                     <span id="crawlerStreet-error"></span>
                  </div>
                  <div class="col-sm-2">
                     <label for="crawlerHouseNumber">Số nhà</label>
                     <input type="text" id="crawlerHouseNumber" class="form-control" name="">
                     <span id="crawlerHouseNumber-error"></span>
                  </div>
               </div>
            </form>
         </div>
         <div class="modal-footer">
            <button id="save-listing-house-number-btn" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu
               </button>
            <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Huỷ</button>
         </div>
      </div>
   </div>
</div>