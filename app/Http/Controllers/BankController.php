<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class BankController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $response = get_json(BANK_LIST);
        $viewData = [];
        if ($response->result) {
            $viewData["items"] = $response->data;
        }
        return view("bank.index")->with($viewData);
    }

    public function create() {
        return view("bank.create");
    }

    public function update($id) {
        $response = get_json(BANK . "/$id");
        $viewData = array();
        //return response()->json($response);
        if ($response->result) {
            $viewData["item"] = $response->data;
        } else {
            return redirect("/bank");
        }
        return view("bank.update")->with($viewData);
    }

    public function detail($id) {
        $response = get_json(BANK . "/$id");
        return response()->json($response);
    }

    public function save() {
        $postData = \Request::input();
        unset($postData['_token']);
        $response = NULL;
        if (!isset($postData['id']) || empty($postData['id'])) {
            unset($postData['id']);
            $response = post_json(BANK, $postData);
        } else {
            $response = put_json(BANK, $postData);
        }
        return response()->json($response);
    }

    public function getMaturityYears($id) {
        $response = get_json("bank/maturity-year/list/$id");
        return response()->json($response);
    }

    /**
     *
     */
    public function getBankList() {
        $response = get_json(BANK_LIST);
        return response()->json($response);
    }

}
