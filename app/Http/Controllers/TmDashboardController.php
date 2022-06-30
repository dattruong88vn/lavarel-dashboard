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

class TmDashboardController extends BaseController {

    public function __construct() {
        parent::__construct();
        $reassignReasons = [
            1 => "meeting",
            2 => "cá nhân"
        ];
        View::share("reassignReasons", $reassignReasons);
        // View::share('propertyTypeList', get_json(GET_PROPERTY_TYPE_LIST));
    }

    public function getQuickCheckListingsRequests() {
        $response = get_json("listing/get-request-quick-check");
        return response()->json($response);
    }

}
