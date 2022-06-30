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

class PfsListController extends BaseController {

    private $API = [
        'pfs-list' => '/mortgage/get-list-mortgage-request-by-filter/%d/%d',
        'get-request-overview' =>'/mortgage/get-list-mortgage-request',
        'list-button-filter' => '/mortgage/count-mortgage-request-by-filter',
        'list-bank' => '/mortgage/get-list-bank-for-mortgage-request',
        'send-pp' => '/mortgage/handle-request',
        'list-progress' => '/channel-status/5/31',
        'update-progress' => '/mortgage/update-mortgage-request-progress',
        'update-status' => 'mortgage/update-mortgage-request-status',
        'send-validate-field' => '/mortgage/mg-validate-fields',
        'list-assign' => '/mortgage/mg-get-list-assigned'
    ];
	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
    	return view('pfs-list.index');
    }

    public function overviewRequest() {
	    return view('pfs-list.overview-request');
    }

    public function getListPfs() {
        $request = \Request::all();
        $data = [
            "fromDate" => !empty($request['fromDate']) ? $request['fromDate'] : null,
            "toDate" => !empty($request['toDate']) ? $request['toDate'] : null,
            "channelStatusId" => !empty($request['channelStatusId']) ? $request['channelStatusId'] : null,
            "searchKeyword" => !empty($request['searchKeyword']) ? $request['searchKeyword'] : null,
            "listAssignedTo" => !empty($request['listAssignedTo']) ? $request['listAssignedTo'] : null
        ];

        $numberPages = $this->numberPageFromRequest($request);
        if($data['channelStatusId'] == 'NaN'){
            $data['channelStatusId'] = null;
        }
        // return response()->json($data);
        $response = post_json(sprintf($this->API['pfs-list'],$numberPages['pages'], $numberPages['items']), $data);
        if($response->result) {
            $response->recordsTotal = !empty($response->data) ? $response->data->totalItems : 0;
            $response->recordsFiltered = !empty($response->data) ? $response->data->totalItems : 0;
            $response->data = !empty($response->data) ? $response->data->list : [];
            $response->requestData = $data;
        }
        return response()->json($response);
    }
    public function getOverviewRequest() {
        $response = get_json($this->API['get-request-overview']);
        if(!isset($response->data) /*|| is_array($response->data)*/) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getListButtonFilter() {
        $request = \Request::all();
        $data = [
            "fromDate" => !empty($request['fromDate']) ? $request['fromDate'] : null,
            "toDate" => !empty($request['toDate']) ? $request['toDate'] : null,
            "channelStatusId" => !empty($request['channelStatusId']) ? $request['channelStatusId'] : null,
            "searchKeyword" => !empty($request['searchKeyword']) ? $request['searchKeyword'] : null,
            "listAssignedTo" => !empty($request['listAssignedTo']) ? $request['listAssignedTo'] : null
        ];

        $response = post_json($this->API['list-button-filter'], $data);
        return response()->json($response);
    }

    public function getListBank()
    {
        $response = get_json($this->API['list-bank']);
        return response()->json($response);
    }

    public function sendProcessProfile() {
        $postData = \Request::json()->all();
        $response = post_json($this->API['send-pp'], $postData);
        return response()->json($response);
    }

    public function getListProgress()
    {
        $response = get_json($this->API['list-progress']);
        return response()->json($response);
    }

    public function updateProgress() {
        $postData = \Request::json()->all();
        $response = put_json($this->API['update-progress'], $postData);
        return response()->json($response);
    }

    public function receiveRequest($id) {
        $result = get_json("mortgage/mg-receive-request/$id");
        return response()->json($result);
    }

    public function updateStatus() {
        $postData = \Request::json()->all();
        $response = put_json($this->API['update-status'], $postData);
        return response()->json($response);
    }

    public function detail($id){
        $viewData['mortgage'] = (object)['mortgageId' => $id];
    	return view('pfs-list.detail')->with($viewData);
    }

    public function getInfo($id){
        $result = get_json("mortgage/$id");
        return response()->json($result);
    }

    public function sendValidateField()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->API['send-validate-field'], $postData['fileRequires']);
        return response()->json($response);
    }

    public function getListAssign()
    {
        $response = get_json($this->API['list-assign']);
        return response()->json($response);
    }

    public function getListBankSuggest($id) {
        $result = get_json("mortgage/get-banks-suggest-for-mortgage-request/$id");
        return response()->json($result);
    }
}