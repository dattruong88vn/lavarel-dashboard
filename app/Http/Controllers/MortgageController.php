<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use \Cache;
use App\Repositories\API\CommonsRepository;

class MortgageController extends Controller {

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function createMortgageRequest() {
        $dataPost = \Request::json()->all();
        // return response()->json($dataPost);
        if(!empty($dataPost['id'])){
            // return "hihi";
            $result =  post_json('mortgage/update-request', $dataPost);
        }else{
            $result = post_json(CREATE_MORTGAGE_REQUEST, $dataPost); //mortgage/tm-create-request
        }
        return response()->json($result);
    }

    public function updateInfoMortgage() {
        $dataPost = \Request::json()->all();
        // return response()->json($dataPost);
        $result = post_json('mortgage/ba-fill-mortgage-info', $dataPost);
        return response()->json($result);
    }

    public function getInfo($leadId){
        $result = get_json("mortgage/lead/$leadId");
        return response()->json($result);
    }

    public function changeRequestStatus(){
        $dataPost = \Request::json()->all();
        // return response()->json($dataPost);
        $result = put_json('mortgage/change-request-status', $dataPost);
        return response()->json($result);
    }

    public function getCollateral(){
        $dataPost = \Request::json()->all();
        // return response()->json($dataPost);
        $result = post_json('mortgage/collateral', $dataPost);
        return response()->json($result);
    }

    public function getChildProfile($typeId){
        $result = get_json("mortgage/child-profile/$typeId");
        return response()->json($result);
    }

    public function rejectProfile(){
        $dataPost = \Request::json()->all();
        $result = post_json('mortgage/reject', $dataPost);
        return response()->json($result);
    }
    
    public function getReasonReject(){
        $result = get_json("channel-status/5/42");
        return response()->json($result);
    }

    public function updateResultBank(){
        $dataPost = \Request::json()->all();
        $result = put_json('mortgage/result-bank', $dataPost);
        return response()->json($result);
    }

    public function downloadProfile($id){
        $result = get_json("mortgage/download/$id");
        return response()->json($result);
    }

    public function getListUserMortgage(){
        $result = get_json("user/lists/20");
        return response()->json($result);
    }

    public function reassign(){
        $dataPost = \Request::json()->all();
        $result = put_json('mortgage/reassign', $dataPost);
        return response()->json($result);
    }

    public function getListingCart($id){
        $result = get_json("mortgage/listing/$id");
        return response()->json($result);
    }
}
