<?php
//  đệ qui dropdown department
function renderDropDownDepartments($array, $slug = '', $return = '',$id=0)
{
    foreach ($array as $item) {
        if (isset($item->id)) {
            if($item->departmentType == 'DEPARTMENT'){
                $item->id == $id ? $selected = 'selected' : $selected = '';
                $return .= '<option '.$selected.' value="' . $item->id . '">' . $slug . $item->departmentName . '</option>';
            }
        } elseif ($item->positionId) {
            $item->positionId == $id ? $selected = 'selected' : $selected = '';
            $return .= '<option '.$selected.' value="' . $item->positionId . '">' . $slug . $item->positionName . '</option>';
        }
        if (isset($item->children) && count($item->children) > 0) {
            $return = renderDropDownDepartments($item->children, $slug . ' -- ', $return,$id);
        } elseif (isset($item->positionsChid) && count($item->positionsChid) > 0) {
            $return = renderDropDownDepartments($item->positionsChid, $slug . ' -- ', $return,$id);
        }
    }
    return $return;
}
?>
<div>
    <input type="hidden" id="positionId" value="{{isset($curentPosition) ? $curentPosition->positionId : ''}}">
    <div class="box box-default">
        <div class="box-body">
            <div class="row">
                <div style="margin-bottom: 10px" class="col-md-4">
                    <div class="">
                        <label for="">Bộ phận:</label> <span class="required">(*)</span>
                    </div>
                    <div class="">
                        <select required class="" id="department" name="department">
                            <option value="">Chọn bộ phận</option>
                            @if(isset($curentPosition))
                                {!! renderDropDownDepartments($departments,'','',$curentPosition->departmentId) !!}
                            @else
                                {!! renderDropDownDepartments($departments) !!}
                            @endif
                        </select>
                        <div class="errors"></div>
                    </div>
                </div>
                <div style="margin-bottom: 10px" class="col-md-4">
                    <div class="">
                        <label for="">Tên chức vụ:</label> <span class="required">(*)</span>
                    </div>
                    <div class="">
                        <input required type="text"
                               @if(isset($curentPosition))
                                       value="{{$curentPosition->positionName}}"
                                       @endif
                               value="" name="name" style="height: 36px;" id="name" class="form-control"/>
                        <div class="errors"></div>
                    </div>
                </div>
                <div style="margin-bottom: 10px" class="col-md-4">
                    <div class="">
                        <label for="">Chức vụ cha:</label>
                    </div>
                    <div class="">
                        <select class="" id="parent" name="parent">
                            <option value="">Chọn chức vụ cha</option>
                            @if(isset($positions) && isset($curentPosition))
                                {!! renderDropDownDepartments($positions,'','',$curentPosition->parentId) !!}
                            @endif
                        </select>
                        <div class="errors"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div style="margin-bottom: 10px" class="col-md-12">
                    <div class="">
                        <label for="">Chọn Quyền:</label>
                    </div>
                    <div class="roles">
                        <select id="roles" name="roles[]" multiple="multiple">
                            <?php foreach ($entitiesList as $item): ?>
                                <option value="{{$item->id}}-{{$item->name}}">{{$item->name}}</option>
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
                
                </tbody>
            </table>
        </div>
    </div>
    {{--<div class="row">--}}
        {{--<div class="col-md-12">--}}
            {{--<button type="submit" style="_margin-top: 5px;" class="btn btn-primary">--}}
                {{--<i class="fa fa-check" aria-hidden="true"></i> Thêm--}}
            {{--</button>--}}
        {{--</div>--}}
    {{--</div>--}}
</div>

