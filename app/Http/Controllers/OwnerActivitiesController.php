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

class OwnerActivitiesController extends BaseController {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }
    public function getTrackingOwnerHistory() {
        $postData = \Request::json()->all();
        $page = !empty($postData["page"]) ? $postData["page"] : 1;
        $numberItem = !empty($postData["numberItem"]) ? $postData["numberItem"] : 10;
        $response = post_json("histories/get-tracking-owner-history/$page/$numberItem", $postData);
        $response->postData = $postData;
        return response()->json($response);
    }
    
}
