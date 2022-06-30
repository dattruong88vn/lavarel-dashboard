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
use Carbon\Carbon;

class TourController extends BaseController {

    public $specialViewIds = [5, 6, 7];

    public function __construct() {
        parent::__construct();
    }

    public function report() {
        $viewData["specialViewIds"] = $this->specialViewIds;
        $viewData['isCrm'] = $this->isCrm();
        return view("tour.report")->with($viewData);
    }

    public function reportCategories() {
        $postData = \Request::json()->all();
        $response = post_json("report/schedules/categories", $postData);
        //return response()->json($response);
        $viewData["data"] = $response->data;
        $viewData["specialViewIds"] = $this->specialViewIds;
        return view("tour.report-categories")->with($viewData);
    }

    public function reportDetail($id) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : null;
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            'sortColumn' => $sortColumn,
            'sortType' => $sortType ? $sortType : "desc",
            "fromDate" => ($requestData['fromDate'] ? $requestData['fromDate'] : 0),
            "toDate" => ($requestData['toDate'] ? $requestData['toDate'] : null),
            "reasonId" => (isset($requestData['reasonId']) ? $requestData['reasonId'] : null)
        );
        $data = post_json("/report/schedules/$id/$page/10", $postData)->data;
        //return response()->json($data);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function cancelToursSummary() {
        $requestData = \Request::input();
        $postData = array(
            "fromDate" => ($requestData['fromDate'] ? $requestData['fromDate'] : 0),
            "toDate" => ($requestData['toDate'] ? $requestData['toDate'] : null)
        );
        //return response()->json($postData);
        $response = post_json("report/schedules/cancel", $postData);
        return response()->json($response);
    }

    public function memberHistory($id) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $type = $requestData['type'];
        $data = get_json("report/schedules/$id/histories/$type/$page/10")->data;
        //$data = get_json(" report/schedules/$id/histories/$type")->data;
        //return response()->json($data);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function getSupportNotifies() {
        $response = get_json("schedule/notify-support-schedules");
        return response()->json($response);
    }

    public function changeSupportNotifyStatus() {
        $postData = null;
        if (\Request::isMethod('post')) {
            $postData = \Request::json()->all();
        } else {
            $postData = json_decode(\Request::input('data'));
        }
        $response = post_json("schedule/update-for-support-schedule", $postData);
        return response()->json($response);
    }

    public function getSupportRequests($id) {
        //return response()->json(get_json("schedule/request-support-schedules/$id/1/1000"));
        $data = get_json("schedule/request-support-schedules/$id/1/1000")->data;
        $viewData = array(
            'draw' => 1,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function getReasons() {
        $type = \Request::input("type") ? \Request::input("type") : "";
        $questionId = \Request::input("questionId") ? \Request::input("questionId") : -1;
        $scheduleId = \Request::input("scheduleId") ? \Request::input("scheduleId") : -1;
        $response = get_json("schedule/reasons/$type/$questionId/$scheduleId");
        return response()->json($response);
    }

    public function dismissListing() {
        $postData = \Request::json()->all();
        $response = post_json("schedule/listing/dismiss", $postData);
        return response()->json($response);
    }

    public function orderListing() {
        $postData = \Request::json()->all();
        $response = post_json(SCHEDULE_ORDER_LISTING, $postData);
        return response()->json($response);
    }

    public function whatHappened() {
        $postData = \Request::input();
        //return response()->json($postData);
        $response = post_json(SCHEDULE_WHAT_HAPPENDED, $postData);
        return response()->json($response);
    }

    public function missingSchedules() {
        $postData = \Request::json()->all();
        $response = get_json(SCHEDULE_MISSING_SCHEDULES, $postData);
        return response()->json($response);
    }

    public function confirmListingTimeChange() {
        $postData = \Request::json()->all();
        $response = put_json("schedule/confirm-diy-change-time-listing", $postData);
        return response()->json($response);
    }

    public function getChangeTourInfoReasons(){
        $strReason = <<<EOT
        {"result":true,"code":"10000","data":
        [
            {
            "id": 12,
            "name": "Nhà đã bán"
            },
            {
                "id": 13,
                "name": "Chủ nhà bận đột xuất"
            },
            {
                "id": 14,
                "name": "Khách hàng huỷ tour"
            },
            {
                "id": 15,
                "name": "Khác"
            }
        ]
        ,"message":"Thao t\u00e1c th\u00e0nh c\u00f4ng"}
EOT;
        $objReturn = json_decode($strReason);
        return response()->json($objReturn);
    }

    public function pushChangeInfoToCc() {
        $postData = \Request::json()->all();
        $response = post_json("schedule/push-change-info-to-cc", $postData);
        return response()->json($response);
    }
}
