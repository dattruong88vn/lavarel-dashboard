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

class ListingByAgentController extends BaseController {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index() {
        $viewData["isAdmin"] = $this->isCurrentAdmin();
        $viewData["cancelReasons"] = get_json('cancel-reason/list')->data;
        return view("listing-by-agent.index")->with($viewData);
    }

    private function paramPostData($requestData) {
        $orders = \Request::input("order");
        $sortColumnIndex = isset($orders) ? $orders[0]['column'] : 1;
        $sortType = isset($orders) ? $orders[0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = [
            "name" => !empty($requestData["name"]) ? $requestData["name"] : null,
            "email" => !empty($requestData["email"]) ? $requestData["email"] : null,
            "phone" => !empty($requestData["phone"]) ? $requestData["phone"] : null,
            "statusList" => !empty($requestData['statusList']) && $requestData['statusList']!=0 ? (int)$requestData['statusList'] : null,
            "sort" => [
                "columnName" => $sortColumn,
                "value" => $sortType
            ]
        ];

        return $postData;
    }

    private function paramPostDataListing($requestData) {
        $orders = \Request::input("order");
        $sortColumnIndex = isset($orders) ? $orders[0]['column'] : 1;
        $sortType = isset($orders) ? $orders[0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        if ($sortColumn == "priceVnd") {
            $sortColumn = "price";
        }
        $postData = [
            "agentId" => !empty($requestData["agentId"]) ? $requestData["agentId"] : null,
            "statusList" => !empty($requestData['statusList']) && $requestData['statusList']!=0 ? (int)$requestData['statusList'] : null,
            "sort" => [
                "columnName" => $sortColumn,
                "value" => $sortType
            ]
        ];

        return $postData;
    }

    public function getData() {
        $requestData = \Request::all();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $postData = $this->paramPostData($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = post_json("tpa/agents-have-listing/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }

    public function exportExcel() {
        $postData = \Request::json()->all();
        $response = post_json_export("tpa/agents-have-listing/export", $postData);
        return response()->json($response);
    }

    public function getDataListing() {
        $requestData = \Request::all();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $postData = $postData = $this->paramPostDataListing($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = post_json("tpa/listings/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }
}
