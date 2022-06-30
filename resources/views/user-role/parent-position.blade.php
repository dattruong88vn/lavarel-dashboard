<?php
//  đệ qui dropdown department
function renderDropDownDepartments($array, $slug = '', $return = '',$id=0)
{
    foreach ($array as $item) {
        if (isset($item->id)) {
            $item->id == $id ? $selected = 'selected' : $selected = '';
            $return .= '<option '.$selected.' value="' . $item->id . '">' . $slug . $item->departmentName . '</option>';
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
<option value="">Chọn chức vụ cha</option>
{!! renderDropDownDepartments($positions) !!}
