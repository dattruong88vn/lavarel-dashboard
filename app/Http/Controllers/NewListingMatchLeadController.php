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

class NewListingMatchLeadController extends BaseController {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }
    public function index() {
        $viewData["isAdmin"] = $this->isCurrentAdmin();
        $viewData["cancelReasons"] = get_json('cancel-reason/list')->data;
        return view("new-listing-match-lead.index")->with($viewData);
    }
    public function getDataListing() {
        $postData = \Request::json()->all();
        $page = !empty($postData["page"]) ? $postData["page"] : 1;
        $numberItem = !empty($postData["numberItem"]) ? $postData["numberItem"] : 10;
        $response = post_json("relatelisting/get-matched-lead-v1/$page/$numberItem", $postData);
        $response->postData = $postData;
        return response()->json($response);
    }
    public function leadMatchListing() {
        $postData = \Request::json()->all();
        $page = !empty($postData["page"]) ? $postData["page"] : 1;
        $numberItem = !empty($postData["numberItem"]) ? $postData["numberItem"] : 10;
        $response = post_json("relatelisting/get-matched-lead-detail-v1/$page/$numberItem", $postData);
        $response->postData = $postData;
        return response()->json($response);
    }
    public function listingMatchedLeadSendMail() {
        $postData = \Request::json()->all();
        $page = !empty($postData["page"]) ? $postData["page"] : 1;
        $numberItem = !empty($postData["numberItem"]) ? $postData["numberItem"] : 10;
        $response = post_json("relatelisting/get-matched-lead-to-send-mail-v1/$page/$numberItem", $postData);
        $response->postData = $postData;
        return response()->json($response);
    }
    public function closeListings() {
        $postData = \Request::json()->all();
        $response = post_json("relatelisting/set-close-listing-matched-lead-v1", $postData);
        return response()->json($response);
    }
    public function getConfigData() {
        $apiEndPoint = "config/get-lead-match-listing-value";
        if (!$this->isCurrentAdmin()) {
            $leadId = \Request::input("leadId");
            $apiEndPoint = "lead/get-lead-match-listing-value/$leadId";
        }
        $response = get_json($apiEndPoint);
        return response()->json($response);
    }
    public function saveConfig() {
        $requestData = \Request::json()->all();
        $postData = $requestData;
        $apiEndPoint = "lead/set-lead-match-listing-value";
        if ($this->isCurrentAdmin() && empty($postData["leadId"])) {
            $postData = $postData["values"];
            $apiEndPoint = "config/set-lead-match-listing-value";
        }
        $response = post_json($apiEndPoint, $postData);
        return response()->json($response);
    }
}
