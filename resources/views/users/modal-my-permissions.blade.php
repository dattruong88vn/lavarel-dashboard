<!-- Modal -->
<div class="modal fade modal-position" id="modalMyPermissions" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <form  id="form-my-permissions" class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Cập nhật chức vụ</h4>
            </div>
            <div class="modal-body">
                <div>
                    <input type="hidden" id="positionId" value="{{isset($curentPosition) ? $curentPosition->positionId : ''}}">
                    <div class="box box-default">
                        <div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div>
										<label>Phòng ban: <span class="required"></span></label>
									</div>
									<div>
										<p class="text-position">
                                            <?php if ($listDepartments) : ?>
                                                <?php foreach ($listDepartments as $key => $department) : ?>
                                                    <span>{{ $department->departmentName }}</span>
                                                    <?php if ($department->isPrimary == true) :  ?>
                                                        <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                                    <?php endif; ?>
                                                    <?php if ($key !== count($listDepartments) - 1) : ?>
                                                        ,
                                                    <?php endif; ?>
                                                <?php endforeach; ?>
                                            <?php endif ?>
                                        </p>
									</div>
								</div>
								<div class="col-md-6">
									<div>
										<label>Vị trí: <span class="required"></span></label>
									</div>
									<div>
										<p class="text-position">
                                            <?php if ($positions) : ?>
                                                <?php foreach ($positions as $key => $position) : ?>
                                                    <span>{{ $position->positionName }}</span>
                                                    <?php if ($position->isPrimary == true) :  ?>
                                                        <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                                    <?php endif; ?>
                                                    <?php if ($key !== count($positions) - 1) : ?>
                                                        ,
                                                    <?php endif; ?>
                                                <?php endforeach; ?>
                                            <?php endif; ?>
                                        </p>
									</div>
								</div>
								
							</div>
                            <div class="row">
                                <div style="margin: 10px 0px" class="col-md-12">
                                    <div class="">
                                        <label for="">Chọn Quyền:</label>
                                    </div>
                                    <div class="roles">
                                        <select id="roles" name="roles[]" multiple="multiple">
                                            <?php foreach ($entitiesList as $item): 
                                                $selected = '';
                                                if(in_array($item->id, $entitiesIdListUpdate)){
                                                    $selected = "selected";
                                                }
                                            ?>
                                                <option {{$selected}} value="{{$item->id}}-{{$item->name}}">{{$item->name}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-xs-12" style="overflow-y: scroll">
                            <table id="table-permission" class="table table-bordered table-striped quick-add-layout">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Read</th>
                                    <th>Add</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                    <th>Export</th>
                                    <th>Import</th>
                                    <th>List</th>
                                    <th>Assign</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php foreach ($entitiesListUpdate as $item): ?>
                                <tr>
                                    <td>
                                        <input type="hidden" id="input_entity" value="{{$item->id}}"/>
                                        {{$item->name}}
                                    </td>
                                    <?php foreach ($item->actions as $ac): ?>
                                    <td>
                                        <input type="hidden" name="{{strtolower($ac->actionName)}}_action" id="input_action"
                                            value="{{$ac->actionId}}"/>
                                        <select id="select_permission" name="{{strtolower($ac->actionName)}}_permission"
                                                class="form-control select2" style="width: 100%;">
                                            <option entityid="-1" actionid="-1" value="-1">--Chọn--</option>
                                            <?php foreach ($ac->permissions as $p):
                                                $selected = "";
                                                if(isset($myPermissions)):
                                                    if (count($myPermissions) > 0):
                                                        foreach ($myPermissions as $private):
                                                            if ($private->actionId == $ac->actionId && $private->entityId == $item->id && $p->permissionId == $private->permissionId): 
                                                                $selected = "selected";
                                                            endif;
                                                        endforeach;
                                                    endif;
                                                endif;
                                            ?>
                                            <option entityid="{{$item->id}}" actionid="{{$ac->actionId}}" {{$selected}} value="{{$p->permissionId}}">{{$p->permissionName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </td>
                                    <?php endforeach; ?>
                                </tr>
                                <?php endforeach; ?>
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button id="btn-save-my-permissions" type="submit" class="btn btn-primary btn-submit"><i class="fa fa-check" aria-hidden="true"></i> Lưu</button>
            </div>
        </form>
    </div>
</div>

<style>


.text-position {
    border: 1px solid #ccc;
    border-radius:1px;
    padding:5px;
}
#modalMyPermissions .modal-lg{
    width: 100%;
    height: 100%;
}
</style>