<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class TourReportController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function personal() {
        return view("tour-report.personal");
    }

    public function getListOfZoneTeamMember() {
        $response = get_json("/departments/get-zone-team-members");
        return response()->json($response);
    }

    public function toursOfTheDate() {
        return view("tour-report.tours-of-the-date");
    }

    public function personalGoingTour() {
        $response = get_json("report/tour/going/1/10000");
        //return response()->json($response);
        $viewData['tours'] = $response->data;
        return view("tour-report.personal-going-tour")->with($viewData);
    }

    public function viewedTour() {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json("report/tour", $postData);
        return response()->json($response);
    }

    public function canceledTour() {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json("report/tour/cancel", $postData);
        return response()->json($response);
    }

    public function infoDeals() {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json("v2/report/tour/info-deal/1/10000", $postData);
        return response()->json($response);
    }

}
