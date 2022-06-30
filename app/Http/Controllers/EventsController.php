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

class EventsController extends BaseController {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index() {
        return view("events.index");
    }

    public function getItems() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $searchKeywords = $requestData['search']['value'];
        $postData = array("searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null));
        $data = post_json(EVENTS . "/$page/$numberItem", $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
//return response()->json($data);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    
    public function histories(){
        return view("events.histories");        
    }

    public function getHistoriesItems() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $searchKeywords = $requestData['search']['value'];
        $postData = array("searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null));
        $data = post_json(EVENTS_HISTORY . "/$page/$numberItem", $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
//return response()->json($data);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function detail($id) {
        $response = get_json(EVENTS . "/$id");
        return response()->json($response);
    }

    public function export() {
        $postData = \Request::json()->all();
        $response = post_json(EXPORT_REPORTS_EVENTS, $postData);
        return response()->json($response);
    }

}
