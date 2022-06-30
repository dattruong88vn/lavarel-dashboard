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

class CommissionDocumentController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return view('commission-document.index');
    }

    public function getDocumentList() {
        $data = \Request::json()->all();
        $url = 'commission/document/list';
        if ($data['pagination']) {
            $url .=  '/' . $data['pagination']['page'] . '/' . $data['pagination']['limit'];
        }
        $response = get_json($url);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getTypeList() {
        $response = get_json_test('commission-document/get-type-list');
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function addDocument() {
        $data = \Request::json()->all();
        $response = post_json('commission/document/create', $data);
        return response()->json($response);
    }

    public function getDetailDocument($id) {
        $response = get_json('/commission/document/' . $id);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function updateDocument() {
        $data = \Request::json()->all();
        $response = put_json('/commission/document/update', $data);
        return response()->json($response);
    }
}