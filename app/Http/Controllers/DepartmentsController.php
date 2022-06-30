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

class DepartmentsController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        //
    }

    public function create()
    {
        $listDepartments = get_json(GET_ALL_DEPARTMENTS);
        if ($listDepartments->code == 200)
            $viewData['listDepartments'] = $listDepartments->data;

        $listDepartmentTypes = get_json(GET_DEPARTMENT_TYPE);
        if ($listDepartmentTypes->code == 200)
            $viewData['listDepartmentTypes'] = $listDepartmentTypes->data;

        $listDistricts = get_json(GET_DISTRICT_LIST_BY_CITY . '/' . 1);
        if ($listDistricts->code == 200)
            $viewData['listDistricts'] = $listDistricts->data;

        return view('departments.create')->with($viewData);
    }



    public function doCreateDepartment()
    {
        $postData = \Request::json()->all();
        $response = post_json(DO_CREATE_DEPARTMENT, $postData);
        return response()->json($response);
    }

    public function editDepartment($departmentId)
    {
        $listDepartments = get_json(GET_ALL_DEPARTMENTS);
        if ($listDepartments->code == 200)
            $viewData['listDepartments'] = $listDepartments->data;

        $listDepartmentTypes = get_json(GET_DEPARTMENT_TYPE);
        if ($listDepartmentTypes->code == 200)
            $viewData['listDepartmentTypes'] = $listDepartmentTypes->data;

        $detailDepartment = get_json(DETAIL_DEPARTMENT . '/' . $departmentId);
        if ($detailDepartment->code == 200) {
            $viewData['detailDepartment'] = $detailDepartment->data;
        }

        $requestDetail = $detailDepartment->data;
        $currentDistricts = array();
        $isPreferedDistrict = -1;
        foreach ($requestDetail->departmentDistricts as $myDistrict) {
            $currentDistricts[] = $myDistrict->districtId;
            if ($myDistrict->isPrimary) {
                $isPreferedDistrict = $myDistrict->districtId;
            }
        }
        $districts = get_json(GET_DISTRICTS . '/1')->data;
        $viewData['districts'] = $districts;
        $viewData['currentDistricts'] = $currentDistricts;
        $viewData['isPreferedDistrict'] = $isPreferedDistrict;

        return view('departments.edit')->with($viewData);
    }

    public function doUpdateDepartment()
    {
        $postData = \Request::json()->all();
        $response = put_json(DO_UPDATE_DEPARTMENT, $postData);
        return response()->json($response);
    }

    public function getList($parentId)
    {
        $listDepartments = get_json(GET_ALL_DEPARTMENTS);
        if ($listDepartments->code == 200) {
            $viewData['listDepartments'] = $listDepartments->data;
        }

        $listDepartmentTypes = get_json(GET_DEPARTMENT_TYPE);
        if ($listDepartmentTypes->code == 200)
            $viewData['listDepartmentTypes'] = $listDepartmentTypes->data;

        $listDistricts = get_json(GET_DISTRICT_LIST_BY_CITY . '/' . 1);
        if ($listDistricts->code == 200)
            $viewData['listDistricts'] = $listDistricts->data;

        $viewData['parentId'] = $parentId;
        return view('departments.list')->with($viewData);
    }

    public function getListZone($parentId)
    {
        $viewData = [];
        $listDepartments = get_json(GET_ALL_DEPARTMENTS);
        if ($listDepartments->code == 200) {
            $viewData['listDepartments'] = $listDepartments->data;
        }

        $listDepartmentTypes = get_json(GET_DEPARTMENT_TYPE);
        if ($listDepartmentTypes->code == 200)
            $viewData['listDepartmentTypes'] = $listDepartmentTypes->data;

        $listDistricts = get_json(GET_DISTRICT_LIST_BY_CITY . '/' . 1);
        if ($listDistricts->code == 200)
            $viewData['listDistricts'] = $listDistricts->data;

        $viewData['parentId'] = $parentId;

        $listWards = get_json(GET_WARD_LIST . '/' . 1);
        $viewData['listWards'] = [];
        if ($listWards->code == 200) {
            $viewData['listWards'] = $listWards->data;
        }
        $viewData['countries'] = [];
        $countries = post_json(GET_COUNTRIES, ['departmentIds' => []]);
        if ($countries->code == 200) {
            $viewData['countries'] = $countries->data->list;
        }
        return view('departments.list-zone')->with($viewData);
    }

    public function getListTeam($parentId)
    {
        $listDepartments = get_json(GET_ALL_DEPARTMENTS);
        $viewData['listDepartments'] = [];
        if ($listDepartments->code == 200) {
            $viewData['listDepartments'] = $listDepartments->data;
        }

        $viewData['parentId'] = $parentId;
        return view('departments.list-team')->with($viewData);
    }

    public function doDeletePosition()
    {
        $postData = \Request::json()->all();
        $response = post_json(DELETE_POSITION, $postData);
        return response()->json($response);
    }

    public function apiGetAll()
    { {
            $response = get_json(GET_ALL_DEPARTMENTS);
            return response()->json($response);
        }
    }

    public function getListTeamJson()
    {
        $postData = \Request::json()->all();
        $response = post_json(POST_GET_TEAM, $postData);
        return response()->json($response->data);
    }

    public function getListUsersJson()
    {
        $postData = \Request::json()->all();
        $response = post_json(POST_GET_USERS, $postData);
        return response()->json($response);
    }

    public function adminGetTeamList($zoneId)
    {
        $url = "/departments/over-view/zone/$zoneId";
        $response = get_json($url);
        return response()->json($response);
    }

    public function adminGetusersList($teamId)
    {
        $url = "/departments/over-view/team/$teamId";
        $response = get_json($url);
        return response()->json($response);
    }

    public function getDistricts($id)
    {
        $districts = array();
        $listDistricts = get_json(GET_DISTRICT_LIST_BY_CITY . '/' . 1);

        if ($listDistricts->code == 200) {
            $districts = $listDistricts->data;
        }

        $response = new \stdClass();
        $response->result = true;
        $response->data = $districts;
        return response()->json($response);
    }
    // public function getDistricts($id)
    // {
    //     $postData = ["deparmentIds" => $id];
    //     $response = post_json('/district/department', $postData);
    //     return response()->json($response);
    // }
}
