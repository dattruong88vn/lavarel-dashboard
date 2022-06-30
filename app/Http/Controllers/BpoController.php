<?php

namespace App\Http\Controllers;

use App\Http\Requests\Request;

class BpoController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function voteOptions()
    {
        $response = get_json('bpo/config/grades');
        return response()->json($response);
    }
    public function suggestions()
    {
        $response = get_json('bpo/config/get-comment-suggestions');
        return response()->json($response);
    }
    public function ba()
    {
        $response = get_json('user/list-ba-in-zone-rent-buy');

        return response()->json($response);
    }
    public function history($listingId,$isBA)
    {
        $api = "/bpo/get-full-bpo-history/$listingId";
        if($isBA == "true"){
            $api = "/bpo/get-bpo-history-for-current-user/$listingId";
        }
        $response = get_json($api);
        $response->api = $api;
        return response()->json($response);
    }
    public function create()
    {
        $postData = \Request::input();
        // false = /dashboard/api/bpo/create-bpo BSA
        // true = /dashboard/api/bpo/rating-bpo
        $api = "/bpo/create-bpo";
        if($postData["isBA"] == "true"){
            $api = "/bpo/rating-bpo";
        }
        $response = post_json($api, $postData);
        $response->api = $api;
        return response()->json($response);
    }
    public function resolveConflict()
    {
        $postData = \Request::input();
        $response = post_json('/bpo/resolve-conflict', $postData);
        return response()->json($response);
    }
    public function getBPONotification()
    {
        $response = get_json('/bpo/count-listing-not-bpo');
        return response()->json($response);
    }
    public function resolveDetail($listingId)
    {
        $response = get_json('bpo/get-detail-conflict/' . $listingId);
        return response()->json($response);
    }
    public function detail($listingId)
    {
        $response = get_json('bpo/get-detail/' . $listingId);

        return response()->json($response);
    }

    public function checkHealthPage()
    {
        return response()->json();
    }
}
