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

class TravellerController extends Controller {

    public function __construct() {
        // code here for construct
    }

    public function index() {
    	$resp['propertyType'] = get_json(GET_PROPERTY_TYPE_LIST);
        $resp['districts'] = get_json(GET_DISTRICTS."/1");
        $resp['directions'] =  get_json(GET_DIRECTIONS)->data;
        return view('traveller.index')->with($resp);
    }

}
