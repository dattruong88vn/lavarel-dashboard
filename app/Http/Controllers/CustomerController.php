<?php

namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use View;
use \Illuminate\Support\Facades\Input;

class CustomerController extends BaseController {

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
    }

    public function loanAdviceForm($id) {
        //return response()->json(get_json(BANK_MATURITY_YEAR_LIST));
        $bankMaturityYears = get_json(BANK_MATURITY_YEAR_LIST)->data->list;
        //$bankMaturityMonths = get_json(BANK_MATURITY_MONTH_LIST)->data;
        $bankCurrentPositions = get_json(BANK_CURRENT_POSITION_LIST)->data;
        $bankMonthlyIncomes = get_json(BANK_MONTHLY_INCOME_LIST)->data;
        $bankPaymentMethods = get_json(BANK_PAYMENT_METHOD_LIST)->data;
        $bankAgeRanges = get_json(BANK_AGE_RANGE_LIST)->data;
        $banks = get_json(BANK_LIST)->data;
        $viewData['bankMaturityYears'] = $bankMaturityYears;
        $viewData['bankCurrentPositions'] = $bankCurrentPositions;
        $viewData['bankMonthlyIncomes'] = $bankMonthlyIncomes;
        $viewData['bankPaymentMethods'] = $bankPaymentMethods;
        $viewData['bankAgeRanges'] = $bankAgeRanges;
        $viewData['banks'] = $banks;
        return view('customer.loan-advice-form')->with($viewData);
    }

    public function calculateLoanAdvice() {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json(LOAN_ADVICE_RESULT, $postData);
        return response()->json($response);
    }

    public function saveLoanAdvice() {
        $postData = \Request::json()->all();
        $response = post_json(BANK_LOAN_ADVICE, $postData);
        return response()->json($response);
    }

    public function bankLoans() {
        return view('customer.rating-test');
    }

    public function reviewForm($id) {
        $purposeList = get_json(CUSTOMER_REVIEW_PURPOSE_LIST)->data;
        $planBuyList = get_json(CUSTOMER_REVIEW_PLAN_BUY_LIST)->data;
        $forWhomList = get_json(CUSTOMER_FOR_WHOM_LIST)->data;
        $financingList = get_json(CUSTOMER_REVIEW_FINANCING_LIST)->data;
        $requirementLevelList = get_json(CUSTOMER_REVIEW_REQUIREMENT_LEVEL_LIST)->data;
        $reviewResponsivenessList = get_json(CUSTOMER_REVIEW_RESPONSESIVENESS_LIST)->data;
        //return response()->json($purposeList);
        $viewData['purposeList'] = $purposeList;
        $viewData['planBuyList'] = $planBuyList;
        $viewData['forWhomList'] = $forWhomList;
        $viewData['financingList'] = $financingList;
        $viewData['requirementLevelList'] = $requirementLevelList;
        $viewData['reviewResponsivenessList'] = $reviewResponsivenessList;
        return view("customer.review-form")->with($viewData);
    }

    public function saveReview() {
        $postData = \Request::json()->all();
        $response = post_json(CUSTOMER_REVIEW, $postData);
        return response()->json($response);
    }

    public function reviewList() {
        return view("customer.review-list");
    }

    public function reviewListData() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $term = \Request::input("term");
        $postData = array(
            "term" => !empty($term) ? $term : NULL
        );
        //return response()->json($postData);
        $numberItem = 10;
        $response = post_json(CUSTOMER_REVIEW_LIST . "/$page/$numberItem", $postData);
        $data = $response->data;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function reviewHistory($id) {
        $response = get_json(CUSTOMER_REVIEW_HISTORY . "/$id");
        $viewData = array(
            "data" => $response->data
        );
        //return response()->json($response);
        return view("customer.review-history")->with($viewData);
    }

    public function services() {
        $servicePropertyTypes = get_json("customer-service-property-type");
        $viewData = [
            "servicePropertyTypes" => $servicePropertyTypes->data ? $servicePropertyTypes->data : null
        ];
        //return response()->json($servicePropertyTypes);
        return view("customer.services")->with($viewData);
    }

    public function servicesData() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $term = \Request::input("term");
        $postData = array(
            "term" => !empty($term) ? trim($term) : ""
        );
        //return response()->json($postData);
        $numberItem = 10;
        $response = post_json("customer-sevices/$page/$numberItem", $postData);
        $data = $response->data;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function serviceDetail($id) {
        $response = get_json("customer-sevice/$id");
        return response()->json($response);
    }

    public function updateService() {
        $postData = \Request::json()->all();
        $response = put_json("customer-sevice", $postData);
        return response()->json($response);
    }

    public function setOldRequest($id) {
        $response = get_json("customer/set-old/$id");
        return response()->json($response);
    }
    
    public function getDetailFromNeed(){        
        $postData = \Request::json()->all();
        $response = post_json("customer/get-detail-from-need", $postData);
        return response()->json($response);
    }

    // url: /customer/unlock-phone
    public function unblockPhone(){
        return view("customer.unblock-phone");
    }

    public function requestUnblockPhone() {
        $verifyId = $_GET['verifyId'];
        $postData = [];
        $response = put_json(UNBLOCK_CUSTOMER_PHONE . '/' . $verifyId, $postData);
        return response()->json($response);
    }

    public function getPhoneList() {
        $requestData = \Request::all();
        $numberPage = get_current_page($requestData);
        $dataPost = [
            'keyword' => !empty($requestData['search']['value']) ? $requestData['search']['value'] : null
        ];

        $results = [
            'data' => [],
            'totalItems' => 0,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
        ];
        $response = post_json(GET_CUSTOMER_PHONE_BLOCKED . "/" . $numberPage . "/" . $requestData['length'], $dataPost);
        try {

            if ($response->result && isset($response->data)) {
                $results['data'] = $response->data->list;
                $results['totalItems'] = $response->data->totalItems;
                $results['recordsTotal'] = $response->data->totalItems;
                $results['recordsFiltered'] = $response->data->totalItems;
                $results['dataPost'] = $dataPost;
            }
        } catch (\Exception $e) {

        }

        return response()->json($results);
    }
}