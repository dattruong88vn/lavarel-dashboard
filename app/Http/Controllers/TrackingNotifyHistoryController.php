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

class TrackingNotifyHistoryController extends BaseController {

	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
    	return view('tracking-notify-history.index');
    }

    public function getListNotify()
    {
        $requestData = \Request::all();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $postData = [
            "notifyType" => !empty($requestData['notifyType']) ? $requestData['notifyType'] : null,
            "userPhone" => !empty($requestData['userPhone']) ? $requestData['userPhone'] : null,
            "userEmail" => !empty($requestData['userEmail']) ? $requestData['userEmail'] : null,
            "statusId" => $requestData['statusId'],
            "fromDate" => !empty($requestData['fromDate']) ? $requestData['fromDate'] : null,
            "toDate" => !empty($requestData['toDate']) ? $requestData['toDate'] : null,
            "fromSource" => !empty($requestData['fromSource']) ? $requestData['fromSource'] : null
        ];
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response =  post_json("notification/notification-statistic/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => !empty($response->data) ? $response->data->totalItems : 0,
            'recordsFiltered' => !empty($response->data) ? $response->data->totalItems : 0,
            'data' => !empty($response->data) ? $response->data->list : []
        );
        return response()->json($viewData);
    }

    public function getReadOrUnread()
    {
        $postData = \Request::json()->all();
        $data = [
            "date" => !empty($postData['date']) ? $postData['date'] : null,
            "statusId" => $postData['statusId'],
            "notifyType" => !empty($postData['notifyType']) ? $postData['notifyType'] : null,
            "fromSource" => !empty($postData['fromSource']) ? $postData['fromSource'] : null,
            "userPhone" => !empty($postData['userPhone']) ? $postData['userPhone'] : null,
            "userEmail" => !empty($postData['userEmail']) ? $postData['userEmail'] : null
        ];
        $response = post_json("notification/users", $data);
        return response()->json($response);
    }
}