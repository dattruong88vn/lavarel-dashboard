<div id="create-street-modal" class="modal fade" role="dialog" v-cloak>
   <input type="hidden" id="wardIdField" value="">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Thêm đường</h4>
         </div>
         <div class="modal-body">
            <form class="form-group" role="form">
               <div class="row form-group">
                  <div class="col-sm-12">
                     <div class="col-sm-3">
                        <label class="control-label">Tên đường <code>*</code></label>
                     </div>
                     <div class="col-sm-5">
                        <div class="form-group" class="{'has-error': errors.has('street')}">
                           <input type="text" class="form-control" v-model="streetName" v-validate="'required'" data-vv-as="Tên đường">
                           <span v-show="errors.has('street')" class="text-danger">@{{ errors.first('street') }}</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-12">
                     <div class="col-sm-3">
                        <label class="control-label">Đơn giá</label>
                     </div>
                     <div class="col-sm-5">
                        <input id="priceStreetModal" type="text" class="form-control">
                     </div>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-12">
                     <div class="col-sm-3">
                        <label class="control-label">Độ rộng mặt tiền đường</label>
                     </div>
                     <div class="col-sm-5">
                        <input type="text" class="form-control" v-model="widthValue">
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <div class="modal-footer">
             <button id="createStreetSubmit" v-on:click="submitStreet" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Lưu</button>
             <button onClick="$('#create-street-modal').modal('hide');" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Hủy</button>
         </div>
      </div>
   </div>
</div>
