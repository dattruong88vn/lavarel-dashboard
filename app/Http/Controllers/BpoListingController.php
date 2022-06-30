<?php

namespace App\Http\Controllers;

class BpoListingController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return view("bpo-listing");
    }

    public function bpoZone() {
      return view("bpo-zone-listing");
    }

    public function getTasksBPOListing($page, $numberItem) {
        $requestData = \Request::input();
        $url = "bpo/bpo-listing-ba/$page/$numberItem";
        $response = post_json($url, $requestData);
        return response()->json($response);
    }

    public function getBpoZoneListing($page, $limit) {
        $requestData = \Request::input();
        $url = "/bpo/get-completed-bpo-listing-ba-in-zone/$page/$limit";
        $response = post_json($url, $requestData);
        return response()->json($response);
    }

    public function getResourceBPO($listingId) {
        $response = get_json("bpo/get-detail/$listingId"); // get 401 => null => id
        return response()->json($response);
    }

    public function getBPOConfigHistory($id) {
        $response = get_json("bpo/get-bpo-history/$id");
        return response()->json($response);
    }

    public function getConfigCommentSuggestion() {
        $response = get_json("bpo/config/get-comment-suggestions");
        return response()->json($response);
    }

    public function getConfigGrades() {
        $response = get_json("bpo/config/grades");
        return response()->json($response);
    }

    public function createBPO() {
        $requestData = \Request::input();
        $response = post_json("bpo/save-bpo", $requestData);
        return response()->json($response);
    }

    public function getListBPOLabel() {
        $response = get_json("bpo/get-list-bpo-label");
        return response()->json($response);
    }

    public function getCountBPOListing() {
        $requestData = \Request::input();
        $url = "bpo/count-bpo-listing-ba";
        $response = post_json($url, $requestData);
        return response()->json($response);
    }

    public function getCountBPOZoneListing() {
        $requestData = \Request::input();
        $url = "bpo/count-completed-bpo-listing-ba-in-zone";
        $response = post_json($url, $requestData);
        return response()->json($response);
    }

    public function checkPermissionForListing($rListingId) {
        $response = get_json("bpo/get-bpo-permission/$rListingId");
        return response()->json($response);
    }
}
