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

/**
 * Commission deal
 * Date: 2020/07/14
 * Author: thu.tran@propzy.com
 */
class CommissionDealController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index(){
        return view('commission-deal.index');
    }   

    public function getCommissionDealList() {
        $params = \Request::all();
        $url = 'billing/deal/' . $params['page'] . '/' . $params['itemsPerPage'];
        unset($params['page']);
        unset($params['itemsPerPage']);
        $result = post_json($url, $params);
        return response()->json($result);
    }

    /**
     * Get list of collected methods
     */
    public function getCollectedMethods() {
        $methods = array(
            array(
                "id" => 1,
                "name" => "Chuyển khoản"
            ),
            array(
                "id" => 2,
                "name" => "Tiền mặt"
            ),
            
        );
        return response()->json($methods);
    }

    /**
     * Get money collected details of a deal fin ID
     * @param dealFinId
     */
    public function getMoneyCollectedDetail() {
        $dealFinId = \Request::input('dealFinId');
        $url = 'commission/deal/fin/' . $dealFinId . '/deposit-collect';
        $result = get_json($url);
        return response()->json($result);
    }

    /**
     * Action on money collection
     * 
     */
    public function postMoneyCollected() {
        $requestData = \Request::all();
        $url = 'commission/deal/fin/deposit-collect/create';
        $result = post_json($url, $requestData);
        return response()->json($result);
    }

    /**
     * Action on collected completion
     */
    public function postCollectedCompletion() {
        $requestData = \Request::all();
        $url = 'commission/deal/fin/deposit-collect/uncompleted/create';
        $result = post_json($url, $requestData);
        return response() ->json($result);
    }

    /**
     * Get list of money collected history
     * @param dealID
     */
    public function getMoneyCollectedHistoryList() {
        $requestData = \Request::all();
        $url = 'histories/deal-fin/list/1/1000';
        $result = post_json($url, $requestData);
        return response() ->json($result);
    }

    /**
     ** Get list of contract news categories
     */
    public function getContractNewsCategories() {
        $resData = array(
            "contractNews" => false,
            "contractDeposit" => false,
            "rootContract" => true,
            "formBrokerFee" => true,
            "hourlyContract" => false,
            "formServiceFee" => false,
            "voucher" => false,
            "customerID" => false,
        );
        return response() ->json($resData);
    }

    /**
     * Update constract record
     */
    public function updateRecord() {
        $requestData = \Request::all();

        $dealFinId = $requestData['dealFinId'];
        unset($requestData['dealFinId']);

        $url = 'commission/deal/save-or-update-deal-fin-detail-with-file/' . $dealFinId;
        $result = post_json($url, $requestData);
        return response() ->json($result);
    }

    /**
     * Get deal fin details
     */
    public function getDealFinDetails() {
        $dealFinId = \Request::input('dealFinId');
        $url = 'commission/deal/deal-fin-detail-with-file-price/' . $dealFinId;
        $result = get_json($url);
        $checkedList = $result->data->checkedFileList;
        $checkedValued = array();
        if($checkedList) {
            foreach ($checkedList as $key => $value) {
                array_push($checkedValued, $value->fileId);
            }
        }
        $list = $result->data->allFileList;
        foreach ($list as $key => $item) {
            if(in_array($item->fileId, $checkedValued)) {
                $item->checked = true;
            } else {
                $item->checked = false;
            }
        }
        return response() ->json($result);
    }

    /**
     * Get list of money collected plan
     */
    public function getMondeyCollectedPlanList() {
        $depositId = '';//\Request::input('depositId');
        $url = 'bsa/deal-deposit-collect/' . $depositId;
        $result = get_json($url);
        return response() ->json($result);
    }

    /**
     * Update/create new money collected plan
     */
    public function postMoneyCollectedPlanList() {
        $requestData = \Request::all();
        return response() ->json($requestData);
    }
}