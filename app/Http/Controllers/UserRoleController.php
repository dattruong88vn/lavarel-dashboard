<?php

namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Storage;

class UserRoleController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function storeReset(Request $request)
    {
        $v = \Validator::make(\Request::all(), [
            'activationKey' => 'required',
            'password' => 'required|confirmed'
        ], [
            'activationKey.required' => 'Vui lòng nhập vào Mã xác nhận.',
            'password.required' => 'Vui lòng nhập vào Mật khẩu mới.',
            'confirmed' => 'Mật khẩu nhập lại không trùng khớp.'
        ]);
        if ($v->fails()) {
            $request->session()->put('status', [
                'class' => 'text-success',
                'message' => 'Mật khẩu nhập lại không trùng khớp.'
            ]);
            return view('user-role.changePassword');
        }
        $postData = \Request::all();
        $postData['rePassword'] = $postData['password_confirmation'];
        unset($postData['password_confirmation']);
        unset($postData['_token']);
        $result = post_json('auth/change-password', $postData);

        if ($result->result) {
            $request->session()->put('status', [
                'class' => 'text-success',
                'message' => 'Đổi mật khẩu thành công.'
            ]);
            return view('login');
        }
        $request->session()->put('status', [
            'class' => 'text-success',
            'message' => 'Mã xác nhận không chính xác.' //$result->message
        ]);
        return view('user-role.changePassword');
    }

    public function changePassword(Request $request)
    {
        $request->session()->forget('status');
        $request->session()->flush();
        return view('user-role.changePassword');
    }

    public function forgotPws(Request $request)
    {
        $v = \Validator::make(\Request::all(), ['email' => 'required'], ['email.required' => 'Vui lòng nhập vào email đăng nhập.']);

        if ($v->fails()) {
            $request->session()->put('status', [
                'class' => 'text-danger',
                'message' => 'Vui lòng nhập vào email đăng nhập để lấy lại mật khẩu.'
            ]);
            return view('login');
        }
        $postData = ['email' =>  \Request::get('email')];
        $result = post_json('auth/forgot-password', $postData);
        if ($result->result) {
            $request->session()->put('status', [
                'class' => 'text-success',
                'message' => 'Gửi yêu cầu lấy lại mật khẩu thành công. Vui lòng kiểm tra email của bạn và làm theo hướng dẫn.'
            ]);
            return view('login');
        }
        $request->session()->put('status', [
            'class' => 'text-danger',
            'message' => $result->message
        ]);
        return view('login');
    }

    public function listPosition()
    {
        $postData = \Request::json()->all();
        $list = get_json('user-positions/get-tree-by-department/' . $postData['id']);
        return response()->json($list);
    }

    public function createPosition()
    {
        $data['departments'] = get_json('departments/get-all')->data;
        $data['entitiesList'] = get_json(GET_ENTITIES_LIST)->data;
        $returnHTML = view('user-role.create-position')->with($data)->render();
        return response()->json($returnHTML);
    }

    public function storePosition()
    {
        $postData = \Request::json()->all();
        if ($postData['positionId'] == null) {
            $response = post_json("user-positions", $postData);
        } else {
            $response = put_json("user-positions", $postData);
        }

        return response()->json($response);
    }

    public function genarateParentPosition($idDepartMent)
    {
        $viewData['positions'] = get_json('user-positions/get-by-department/' . $idDepartMent)->data;
        $returnHTML = view('user-role.parent-position')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    public function getAllEntities()
    {
        $data['entities'] = get_json(GET_ENTITIES_LIST)->data;
        return response()->json($data);
    }

    function editPosition($idPosition)
    {
        $data['curentPosition'] = get_json('user-positions/' . $idPosition)->data;

        $data['departments'] = get_json('departments/tree/0')->data;
        $data['positions'] = get_json('user-positions/get-by-department/' . $data['curentPosition']->departmentId)->data;
        $data['entitiesList'] = get_json(GET_ENTITIES_LIST)->data;
        $data['entitiesListUpdate'] = [];
        $entitiesIdListUpdate = [];
        foreach ($data['entitiesList'] as $item) {
            $selected = false;
            foreach ($item->actions as $ac) {
                foreach ($ac->permissions as $p) {
                    if (isset($data['curentPosition']->permissions)) {
                        if (count($data['curentPosition']->permissions) > 0) {
                            foreach ($data['curentPosition']->permissions as $private) {
                                if ($private->actionId == $ac->actionId && $private->entityId == $item->id && $p->permissionId == $private->permissionId) {
                                    $selected = true;
                                }
                            }
                        }
                    }
                }
            }
            if ($selected == true) {
                array_push($data['entitiesListUpdate'], $item);
                $entitiesIdListUpdate[] = $item->id;
            }
        }
        $data['entitiesIdListUpdate'] = $entitiesIdListUpdate;
        return view('user-role.create-update-position')->with($data);
    }

    public function quickAddPosition($idDepartment, $idPosition)
    {
        $data['curentPosition'] = (object) ['positionId' => null, 'departmentId' => $idDepartment, 'positionName' => '', 'parentId' => $idPosition];
        $data['departments'] = get_json('departments/tree/0')->data;
        $data['positions'] = get_json('user-positions/get-by-department/' . $data['curentPosition']->departmentId)->data;
        $data['entitiesList'] = get_json(GET_ENTITIES_LIST)->data;
        return view('user-role.quick-add-position')->with($data);
    }
}
