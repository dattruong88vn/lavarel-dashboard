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

class TrackingVisitorController extends BaseController {

    private $API = [
        'list-transaction' => '/transaction-center',
        'list-channel-type' => '/channel-type',
        'get-info-by-phone' => '/visitor',
        'save-track-visitor' => '/visitor/track',
        'list-channel-sub-type' => '/channel-sub-type',
    ];
	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
    	return view('tracking-visitor.index');
    }

    public function getListTransaction() {
        $response = get_json($this->API['list-transaction']);
        return response()->json($response);
    }

    public function getListChannelType($type)
    {
        $response = get_json($this->API['list-channel-type'] . "/" . $type);
        return response()->json($response);
    }
    
    public function getInfoByPhone()
    {
        $postData = \Request::json()->all();
        $data = [
            "phone" => !empty($postData['phone']) ? $postData['phone'] : null,
        ];
        $response = post_json($this->API['get-info-by-phone'], $data);
        return response()->json($response);
    }

    public function saveVisitor() {
        $postData = \Request::json()->all();
        $response = post_json($this->API['save-track-visitor'], $postData);
        return response()->json($response);
    }

    public function getListChannelSubType($type)
    {
        $response = get_json($this->API['list-channel-sub-type'] . "/" . $type);
        return response()->json($response);
    }
}