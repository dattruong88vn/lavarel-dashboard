<div id="profile-modal" class="modal fade" role="dialog" v-cloak>   
   <div class="modal-dialog modal-lg">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Các tiêu chí</h4>
         </div>
         <!-- <div class="modal-body"> -->
            <div class="col-sm-12">
              <div class="col-sm-6" v-for="set in chunkSize(channels, 5)">
               <div class="row form-group" v-for="channel in set">
                  <div class="col-sm-12">
                     <div class="col-sm-5">
                        <label class="control-label">@{{ channel.name }} <code>*</code></label>
                     </div>
                     <div class="col-sm-7">
                      <div class="radio" v-for="child in channel.childs">
                        <div class="col-sm-12">
                          <input type="radio" v-bind:name="sanitizeTitle(channel.name)" class="modalProfileId" v-bind:value="child.id" v-on:change="toggleCheck(child.control,child.id, child.childs, sanitizeTitle(channel.name), channel.childs)">
                          @{{ child.name }}
                        </div>
                        <div class="col-sm-12">
                          <v-select v-if="toggleLabelSelect == 'select_if_checked' && child.childs.length > 0 && subSelectChilds.length > 0 && currentIdSelect == child.id" :options="subSelectChilds" style="margin-left: -22px, width: 100%"></v-select>
                          <v-select multiple v-if="toggleLabelChecklist == 'checklist_if_checked' && child.childs.length > 0 && subChecklistChilds.length > 0 && currentIdChecklist == child.id" :options="subChecklistChilds" style="margin-left: -22px, width: 100%"></v-select>
                          <textarea v-if="toggleLabelText == 'input_text_if_checked' && currentIdText == child.id" class="form-control" rows="5" cols="20"></textarea>
                        </div>  
                      </div>                          
                     </div>                     
                  </div>
               </div>     
              </div>          
            </div>
         <!-- </div> -->
         <div class="modal-footer">
             <button v-on:click="updateProfile" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Cập nhật</button>
             <button onClick="$('#profile-modal').modal('hide');" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Hủy</button>
         </div>
      </div>
   </div>
</div>
