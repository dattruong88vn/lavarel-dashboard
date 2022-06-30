<div id="reminder-modal" class="modal fade" role="dialog">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Tạo nhắc nhở <code>(Sẽ nhắc trước 1 phút)</code></h4>
         </div>
         <div class="modal-body">
            <form id="lso-reminder-form" class="form-horizontal" role="form">
               <input type="hidden" id="reminderNotifyId">
               <input type="hidden" id="reminderNotifyLsoId">
               <input type="hidden" id="reminderNotifyDate">
               <input type="hidden" id="reminderNotifyTime">
               @if (isset($listing->owner->name))
               <div class="form-group">
                  <label  class="col-sm-3 control-label"
                     for="meeting-owner">Với Chủ nhà</label>
                  <div class="col-sm-8">
                     <span id="meeting-owner">{{ isset($listing->owner->name) ? $listing->owner->name : "" }}</span>
                  </div>
               </div>
               @endif
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-date" >Thời gian</label>
                  <div class="col-sm-3"><label>Ngày tháng</label></div>
                  <div class="col-sm-2 padding-side-0">
                  	<input id="reminderDate" type="text" name="" class="form-control">
                     <span id="reminderDateError"></span>
                  </div>
                  <label class="control-label col-sm-2">Phút</label>
                  <div class="col-sm-2 padding-side-0">
                     <div class="input-group bootstrap-timepicker timepicker">
                        <input id="reminderTime" type="text" class="form-control input-small">
                    </div>
                  </div>
               </div>
               <div class="form-group">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-3">
                     <input id="isReminder" type="checkbox" name="isReminder" value="1"> Nhắc nhở
                  </div>
                  <div class="col-sm-2 padding-side-0">
                     <input id="reminderMinute" type="text" class="form-control" disabled="disabled" />
                     <span id="reminderTimeError"></span>
                  </div>
                  <div class="col-sm-1">
                     Phút
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-address">Tiêu đề</label>
                  <div class="select-2 col-sm-8">
                  	<select id="reminderWorkTypes" class="form-control">
                        <option value="">--Chọn tiêu đề--</option>
                     </select>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-note" >Nội dung</label>
                  <div class="col-sm-8">
                     <textarea id="reminderNote" class="form-control" rows="5">
                     </textarea>
                     <span id="reminderNoteError"></span>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-lso-members" >Nhân viên LSO</label>
                  <div class="select-2 col-sm-8">
                     <select id="reminderLsoMembers" class="form-control">
                        <option value="">--Chọn nhân viên--</option>
                     </select>
                  </div>
               </div>
               <div class="form-group">
                  <label class="col-sm-3 control-label"
                     for="meeting-address">Tình trạng</label>
                  <div class="select-2 col-sm-8">
                     <select id="reminderStatus" class="form-control">
                        <option value="">--Chọn tình trạng--</option>
                     </select>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-2">
                     <button id="create-reminder-btn" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu</button>
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