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

class NewListingsController extends BaseController {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index() {
        $viewData["isAdmin"] = $this->isCurrentAdmin();
        $viewData["cancelReasons"] = get_json('cancel-reason/list')->data;
        return view("new-listings.index")->with($viewData);
    }

    public function data() {
        $postData = \Request::json()->all();
        $page = !empty($postData["page"]) ? $postData["page"] : 1;
        $response = post_json("relatelisting/get-matched-deal-v1/$page/10", $postData);
        $response->postData = $postData;
        return response()->json($response);
    }

    public function dealsMatchListing() {
        $postData = \Request::json()->all();
        $page = $postData["page"];
        $response = post_json("relatelisting/get-matched-deal-detail-v1/$page/10", $postData);
        $response->postData = $postData;
        return response()->json($response);
    }

    public function listingMatchedDeal() {
        $postData = \Request::json()->all();
        $page = !empty($postData["page"]) ? $postData["page"] : 1;
        $response = post_json("relatelisting/get-matched-deal-to-send-mail-v1/$page/10", $postData);
        $response->postData = $postData;
        return response()->json($response);
    }

    public function closeListings() {
        $postData = \Request::json()->all();
        $response = post_json("relatelisting/set-close-listing-matched-deal-v1", $postData);
        return response()->json($response);
    }

    public function getConfigData() {
        $apiEndPoint = "config/get-deal-match-listing-value";
        if (!$this->isCurrentAdmin()) {
            $dealId = \Request::input("dealId");
            $apiEndPoint = "deal/get-deal-match-listing-value/$dealId";
        }
        $response = get_json($apiEndPoint);
        return response()->json($response);
    }

    public function saveConfig() {
        $requestData = \Request::json()->all();
        $postData = $requestData;
        $apiEndPoint = "deal/set-deal-match-listing-value";
        if ($this->isCurrentAdmin() && empty($postData["dealId"])) {
            $postData = $postData["values"];
            $apiEndPoint = "config/set-deal-match-listing-value";
        }
        $response = post_json($apiEndPoint, $postData);
        return response()->json($response);
    }

}
