<?php

namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use View;
use \Illuminate\Support\Facades\Input;

class ActivityController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        
    }

    public function getList() {
        
    }

    public function taskOverview() {
        $typeList = get_json("/activity/type/list");
        $viewData['typeList'] = $typeList->data;
        return view("activity.task-overview")->with($viewData);
    }

    public function taskOverviewDataTable() {
        $postData = \Request::json()->all();
        $response = post_json("/activity/tasks/overview", $postData);
        return response()->json($response);
    }

    public function taskDetail() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $numberItem = 16;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $postData = array(
            "date" => isset($requestData['date']) ? $requestData['date'] : null,
            "strTypeId" => isset($requestData['strTypeId']) ? $requestData['strTypeId'] : null, // Build format chuổi cho phần checkbox filter task
            "userId" => isset($requestData['userId']) ? $requestData['userId'] : null, //Dành cho phần quản lý
            "regionId" => isset($requestData['regionId']) ? $requestData['regionId'] : null, //Dành cho phần quản ly
            "cityId" => isset($requestData['cityId']) ? $requestData['cityId'] : null // Dành cho phần quản ly
        );
        //return response()->json($postData);
        $response = post_json("activity/tasks/detail/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => array()
        );
        if ($response->data) {
            $viewData = array(
                'draw' => $draw,
                'recordsTotal' => $response->data->totalItems,
                'recordsFiltered' => $response->data->totalItems,
                'data' => $response->data->list
            );
        }
        return response()->json($viewData);
    }

    public function acepted() {
        $postData = \Request::json()->all();
        $response = post_json("activity/acepted", $postData);
        return response()->json($response);
    }

    public function conversionRateAndKpi() {
        return view("activity.conversion-rate-and-kpi");
    }

    public function conversionDetail() {
        $postData = \Request::json()->all();
        $response = post_json("activity/conversions/detail", $postData);
        return response()->json($response);
    }

    public function kpiDetail() {
        $postData = \Request::json()->all();
        $response = post_json("activity/kpis/detail", $postData);
        return response()->json($response);
    }

    public function reassignedLeads() {
        $postData = \Request::json()->all();
        $response = post_json("lead/reassigns", $postData);
        return response()->json($response);
    }

    public function tmAdminOverview() {
        return view("activity.tm-admin-overview");
    }

    public function tmAdminSetTarget() {
        return view("activity.tm-admin-set-target");
    }

    public function tmAdminDetail() {
        return view("activity.tm-admin-detail");
    }

    public function tmAdminConversionRate() {
        return view("activity.tm-admin-conversion-rate");
    }
    public function tmAdminKpi() {
        return view("activity.tm-admin-kpi");
    }
    
    public function getItemType(){
        $response = get_json("activity/items/type");
        return response()->json($response);
    }

}
