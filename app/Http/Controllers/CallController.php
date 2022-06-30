<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class CallController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function saveHistory() {
        $postData = \Request::json()->all();
        if(CALL_SERVICES != 2){
            $response = put_json_with_header('3cx/update-track-history-call', $postData);
        }else{
            $response = post_json("histories/call", $postData);
        }
        
        $response->dataPost = $postData;
        return response()->json($response);
    }

    public function getHistories($type,$id) {
        $requestData = \Request::input();
		$page = get_current_page($requestData);
        $response = get_json_with_header("3cx/get-prescreen-rlisting-history-call/$type/$id/$page/3");
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $response->data->totalItems,
		    'recordsFiltered' => $response->data->totalItems,
		    'data' => $response->data->list,
            'api'=> "3cx/get-prescreen-rlisting-history-call/RLISTING/184032/$page/3",
            "response" => $response
		);
		return response()->json($viewData);
    }
    
    public function getCallInfo(){        
        $requestData = \Request::json()->all();
        $submission = [
              "api_key" => "9db5a833",
              "api_secret" => "7e7fdf47"
        ];
        if(!empty($requestData["call_id"])){
            $submission["call_id"] = $requestData["call_id"];
        }
        $postData = [
          "submission"  => $submission
        ];
        $response = post_json_external("https://api.ccall.vn/cdrs/json", $postData);
        return response()->json($response);
    }

}
