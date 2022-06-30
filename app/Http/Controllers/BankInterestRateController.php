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

class BankInterestRateController extends BaseController {

    private $API = [
        'bank-list' => '/mortgage/get-list-bank-for-manager-mortgage/%d/%d',
        'add-bank' => '/mortgage/create-bank-and-interest-for-mortgage',
        'update-bank' => '/mortgage/update-bank-and-interest-for-mortgage',
        'list-profile' => '/mortgage/request-additional',
        'send-profile' => '/mortgage/request-additional',
        'list-select-bank' => '/bank/list-with-interestrate'

    ];
	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
    	return view('bank-interest-rate.index');
    }

    public function getListBank() {
        $request = \Request::all();
        $data = [
            "keyword" => !empty($request['keyword']) ? $request['keyword'] : null
        ];

        $numberPages = $this->numberPageFromRequest($request);
        $response = post_json(sprintf($this->API['bank-list'],$numberPages['pages'], $numberPages['items']), $data);
        if($response->result) {
            $response->recordsTotal = !empty($response->data) ? $response->data->totalItems : 0;
            $response->recordsFiltered = !empty($response->data) ? $response->data->totalItems : 0;
            $response->data = !empty($response->data) ? $response->data->list : [];
            $response->requestData = $data;
        }
        return response()->json($response);
    }

    public function saveBank() {
        $requestData = \Request::json()->all();
        $postData = array(
            "bankId" => !empty($requestData["bankId"]) ? $requestData["bankId"] : null,
            "name" => !empty($requestData["name"]) ? $requestData["name"] : null,
            "interestRate1" => !empty($requestData["interestRate1"]) ? $requestData["interestRate1"] : null,
            "interestRate2" => !empty($requestData["interestRate2"]) ? $requestData["interestRate2"] : null,
            "loanRate" => !empty($requestData["loanRate"]) ? $requestData["loanRate"] : null,
            "maxLoanTerm" => !empty($requestData["maxLoanTerm"]) ? $requestData["maxLoanTerm"] : null,
            "earlyRepaymentFee" => !empty($requestData["earlyRepaymentFee"]) ? $requestData["earlyRepaymentFee"] : null
        );
        if (!isset($requestData['bankId']) || empty($requestData['bankId'])) {
            unset($requestData['bankId']);
            $response = post_json($this->API['add-bank'], $postData);
        } else {
            $response = put_json($this->API['update-bank'], $postData);
        }
        return response()->json($response);
    }

    public function getListProfile($id)
    {
        $response = get_json($this->API['list-profile'] . "/" . $id);
        return response()->json($response);
    }

    public function sendProfile()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->API['send-profile'], $postData);
        return response()->json($response);
    }

    public function getListSelectBank()
    {
        $response = get_json($this->API['list-select-bank']);
        return response()->json($response);
    }
}