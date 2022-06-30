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

class TimeCounterController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        // code here for construct
    }

    // save time counter for prescreen
    public function saveTimeCounterAssistant(){
        $postData = \Request::json()->all();
        if(app('App\Http\Controllers\CommonController')->checkDublicateReq($postData)){
            $response = post_json(DO_SAVE_TIME_COUNTER_ASSISTANT, $postData);
            return response()->json($response);
        }

        return "DUBLICATE";
    }
    
    // save time counter for bsa
    public function saveTimeCounterSa(){
        $postData = \Request::json()->all();
        if(app('App\Http\Controllers\CommonController')->checkDublicateReq($postData)){
            $response = post_json(DO_SAVE_TIME_COUNTER_SA, $postData);
            return response()->json($response);
        }

        return "DUBLICATE";
    }
    
    public function getNotifyTimeCounter() {
        $response = get_json(GET_NOTIFY_TIME_COUNTER);
        return response()->json($response);
    }

    // public function test(){
    //     return app('App\Http\Controllers\CommonController')->checkDublicateReq();
    // }
}
