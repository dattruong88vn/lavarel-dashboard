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

class LeadDealByAgentController extends BaseController {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index() {
        $viewData["isAdmin"] = $this->isCurrentAdmin();
        $viewData["cancelReasons"] = get_json('cancel-reason/list')->data;
        return view("lead-deal-by-agent.index")->with($viewData);
    }

    private function paramPostData($requestData) {
        $orders = \Request::input("order");
        $sortColumnIndex = isset($orders) ? $orders[0]['column'] : 1;
        $sortType = isset($orders) ? $orders[0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        if ($sortColumn == "formatedPrice") {
            $sortColumn = "price";
        }
        $postData = [
            "name" => !empty($requestData["name"]) ? $requestData["name"] : null,
            "email" => !empty($requestData["email"]) ? $requestData["email"] : null,
            "phone" => !empty($requestData["phone"]) ? $requestData["phone"] : null,
            "statusLead" => !empty($requestData['statusLead']) ? $requestData['statusLead'] : null,
            "statusDeal" => !empty($requestData['statusDeal']) ? $requestData['statusDeal'] : null,
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
        $postData = $postData = $this->paramPostData($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = post_json("tpa/lead-deal-agent/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }

    public function getDataStatusLead() {
        $response = get_json(GET_LEAD_STATUS_LIST);
        return response()->json($response);
    }

    public function getDataStatusDeal() {
        $response = get_json(GET_DEAL_STATUS_LIST);
        return response()->json($response);
    }

    public function exportExcel() {
        $postData = \Request::json()->all();
        $response = post_json("tpa/lead-deal-agent/export", $postData);
        return response()->json($response);
    }
}
