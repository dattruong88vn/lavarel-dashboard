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

class ReportAgentTpaController extends BaseController {

	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
    	return view('report-agent-tpa.index');
    }

    public function getListReport() {
        $request = \Request::all();
        $postData = [
            "fromDate" => !empty($request['fromDate']) ? $request['fromDate'] : null,
            "toDate" => !empty($request['toDate']) ? $request['toDate'] : null,
            "name" => !empty($request['name']) ? $request['name'] : null,
            "phone" => !empty($request['phone']) ? $request['phone'] : null,
            "agentStatus" => !empty($request['agentStatus']) ? $request['agentStatus'] : null,
            "relatedListingStatus" => !empty($request['relatedListingStatus']) ? $request['relatedListingStatus'] : null,
            "leadStatus" => !empty($request['leadStatus']) ? $request['leadStatus'] : null,
            "dealStatus" => !empty($request['dealStatus']) ? $request['dealStatus'] : null
        ];
        $page = get_current_page($request);
        $numberItem = 10;
        $draw = isset($request['draw']) ? $request['draw'] : 1;
        $response =  post_json("agent/tpa/list/$page/$numberItem", $postData);
        if($response->result) {
            $response->draw = $draw;
            $response->recordsTotal = $response->data->totalItems;
            $response->recordsFiltered = $response->data->totalItems;
            $response->data = $response->data->list;
            $response->requestData = $postData;
        }
        return response()->json($response);
    }

    public function getDataStatusLead() {
        $response = get_json(GET_LEAD_STATUS_LIST);
        return response()->json($response);
    }

    public function getDataStatusDeal() {
        $response = get_json(GET_DEAL_STATUS_LIST);
        return response()->json($response);
    }

    public function getDataStatusAgent() {
        $response = get_json("agent/status/1");
        return response()->json($response);
    }

    public function getDataStatusRelatedListing() {
        $response = get_json("seller/channel-status/1");
        return response()->json($response);
    }

    public function exportExcel() {
        $postData = \Request::json()->all();
        $response = post_json_export("export/agent/tpa", $postData);
        return response()->json($response);
    }
}