<?php

namespace App\Http\Controllers;


class LeadDealCommonsController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function userRequestUpdate() {
        $postData = \Request::json()->all();
        $response = post_json("user/request-update-lead-deal", $postData);
        return response()->json($response);
    }

}
