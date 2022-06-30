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

class LsController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function report() {
        $liveListings = get_json("report/ls/live-listing");
        $viewData['liveListings'] = $liveListings->data;
        $viewData['propertyTypes'] = get_json(GET_PROPERTY_TYPE_LIST);
        $viewData['userTypes'] = get_json(GET_LISTING_USER_TYPE);
        return view("ls.report")->with($viewData);
    }

    public function reportStatusListing() {
        $postData = \Request::json()->all();
        $request = \Request::input();
        $type = !empty($request['type']) ? $request['type'] : "";
        $postUrl = "report/ls/status-listings";
        if ($type == "export") {
            $postUrl = "export/report/ls/status-listings";
        }
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }

    public function reportReasonPendingListing() {
        $postData = \Request::json()->all();
        $request = \Request::input();
        $type = !empty($request['type']) ? $request['type'] : "";
        $postUrl = "report/ls/reason-pending-listings";
        if ($type == "export") {
            $postUrl = "export/report/ls/reason-pending-listings";
        }
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }

    public function reportAvgTimeToLive() {
        $postData = \Request::json()->all();
        $request = \Request::input();
        $type = !empty($request['type']) ? $request['type'] : "";
        $postUrl = "report/ls/avg-time-to-live";
        if ($type == "export") {
            $postUrl = "export/report/ls/avg-time-to-live";
        }
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }

    public function getReportListingsByStatus() {
        $requestData = \Request::input();
        $postData = json_decode($requestData['postData']);
        //var_dump($postData);die();
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $postUrl = "report/ls/status-listing/$page/10";
        //return response()->json(post_json($postUrl, $postData));
        $response = post_json($postUrl, $postData)->data;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->totalItems,
            'recordsFiltered' => $response->totalItems,
            'data' => $response->list
        );
        return response()->json($viewData);
    }

    public function exportLiveListings() {
        $postUrl = "export/report/ls/live-listings";
        $response = get_json($postUrl);
        return response()->json($response);
    }

    public function reportListingDiy() {
        $postData = \Request::json()->all();
        $request = \Request::input();
        $type = !empty($request['type']) ? $request['type'] : "";
        $postUrl = "report/ls/diy";
        if ($type == "export") {
            $postUrl = "export/report/ls/diy";
        }
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }

}
