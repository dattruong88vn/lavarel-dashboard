<div id="meeting-modal" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Meeting <code>(Sẽ nhắc trước 15 phút)</code></h4>
         </div>
         <div class="modal-body">
            <form id="lso-meeting-form" class="form-horizontal" role="form">
               <input type="hidden" id="meetingId">
               <input type="hidden" id="meetingLsoId">
               <input type="hidden" id="meetingDate">
               <input type="hidden" id="meetingTime">
               <!-- New field -->
               <input type="hidden" id="createdBy">
               <input type="hidden" id="createdDate">
               <input type="hidden" id="updatedBy">
               <input type="hidden" id="updatedDate">
               <input type="hidden" id="isClosed">
               @if (isset($listing->owner->name))
               <div class="form-group">
                  <label  class="col-sm-3 control-label"
                     for="meeting-owner">Chủ nhà
                  </label>
                  <div class="col-sm-8">
                     <span id="meeting-owner">{{ isset($listing->owner->name) ? $listing->owner->name : "" }}</span>
                  </div>
               </div>
               @endif
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-date" >Thời gian</label>
                  <label class="col-sm-3">Ngày tháng</label>
                  <div class="col-sm-2 padding-side-0">
                  	<input id="meeting-date" type="text" name="" class="form-control">
                  </div>
                  <label class="control-label col-sm-2">Phút</label>
                  <div class="col-sm-2 padding-side-0">
                     <div class="input-group bootstrap-timepicker timepicker">
                        <input id="meeting-time" type="text" class="form-control input-small">
                    </div>
                  </div>               
               </div>
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-address" >Địa chỉ</label>
                  <div class="col-sm-8">
                  	<input type="text" id="meeting-address" name="" class="form-control">
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-lso-members" >Nhân viên LSO</label>
                  <div class="select-2 col-sm-8">
                     <select id="meeting-lso-members" class="form-control">
                        <option value="">--Chọn nhân viên--</option>
                     </select>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-note" >Note</label>
                  <div class="col-sm-8">
                     <textarea class="form-control" id="meetingNote" rows="5">
                     </textarea>                     
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-2">
                     <button id="create-meeting-listing-btn" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu</button>
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