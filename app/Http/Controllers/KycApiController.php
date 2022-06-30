<?php

namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Libraries\PropzyCommons;
use GuzzleHttp\Client;
use Session;
use View;
use Carbon\Carbon;

/**
 * Đây là controller dùng để xử lý dữ liệu và tương tác với API phía SERVER cho phần KYC.
 */
class KycApiController extends BaseController
{

    private $API = [
        'get-detail-loan-advice' => '/kyc/get-loan-debt-info',
        'get-info-by-phone' => 'visitor/kyc',
        'get-lead-deal-in-group' => 'visitor/kyc/get-all-lead-deal-in-group',
        'get-header-step' => '/kyc/home',
        'get-page' => '/kyc/get-page',
        'list-channel-type' => '/channel-types',
        'list-channel-sub-type' => '/channel-sub-type',
        'list-property_type' => '/property_type/list',
        'list-loaction-tc' => '/transaction-center',
        'continue-checking' => '/visitor/track-kyc',
        'check-duplicate-lead-deals' => 'visitor/kyc/check-duplicate-lead-deals',
        'right-customer' => 'kyc/check-right-customer',
        'save-cloned-deal' => 'kyc/clone-lead-deal',
        'create-feedback' => '/kyc/create-feedBack-expand-introduce',
        'get-list-product' => '/kyc/get-deal-related-listing',
        'get-related-listing' => '/relatelisting/%d', // rlistingId, 
        'detail-loan-advice' => '/mortgage/kyc',
        'calculate-loan' => '/bank/calculator',
        'create-document' => '/mortgage/kyc',
        'save-page' => '/kyc/save-page',
        'update-feedback-listing' => '/kyc/update-feedback-listing',
        'done-page' => '/kyc/done-item',
        'create-reminder' => '/kyc/create-work-reminder',
        'get-detail-payment-schedule' => '/bank/payment-schedule/default',
        'get-customer-match-deal' => '/kyc/get-deal-map-kyc-lists-by-filter/%d/%d',
        'listings-compare' => '/listings/compare',
        // 'listing-detail' => '/listings/%d/%d/%d',
        'listing-detail' => 'relatelisting',
        'send-check-empty' => '/listing/quick-check-listing-for-ba',
        'get-deal-group-user' => '/kyc/get-deal-group-user-assigned-map-kyc-lists-by-filter/%d/10',
        'get-loan-demand-info' => '/kyc/get-loan-demand-info',
        'calc-loan-demand' => '/kyc/calculate-loan-demand/%d/%d',
        'save-deny-tour' => '/kyc/not-book-tour-kyc-reason',
        'create-debt-info-step-one' => '/kyc/create-or-update-mortgage-request-step-info'
    ];

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        return response()->json(["result" => "testing"]);
    }

    public function getInfo()
    {
        $request = \Request::all();
        $data = [
            "phone" => !empty($request['phone']) ? $request['phone'] : null,
            "listingTypeId" => !empty($request['listingTypeId']) ? $request['listingTypeId'] : null,
            "propertyTypeId" => !empty($request['propertyTypeId']) ? $request['propertyTypeId'] : null
        ];
        $response = post_json($this->API['get-info-by-phone'], $data);
        return response()->json($response);
    }
    public function getInfoStep()
    {
        $request = \Request::all();
        $data = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null
        ];
        $response = post_json($this->API['get-header-step'], $data);
        return response()->json($response);
    }
    /*
     * @KYC_EXPERIENCE_BUY
     * */
    public function getContentBuyExperiencePage()
    {
        $postData = \Request::json()->all();
        $data = [
            "customerId" => $postData['customerId'],
            "page" => 'KYC_EXPERIENCE_BUY'
        ];
        $response = post_json($this->API['get-page'], $data);
        return response()->json($response);
    }
    /*
     * @KYC_EXPERIENCE_RENT
     * */
    public function getContentRentExperiencePage()
    {
        $postData = \Request::json()->all();
        $data = [
            "customerId" => $postData['customerId'],
            "page" => 'KYC_EXPERIENCE_RENT'
        ];
        $response = post_json($this->API['get-page'], $data);
        return response()->json($response);
    }

    public function getListChannelTypes($type)
    {
        $response = get_json($this->API['list-channel-type'] . "/" . $type);
        return response()->json($response);
    }

    public function getListChannelSubType($type)
    {
        $response = get_json($this->API['list-channel-sub-type'] . "/" . $type);
        return response()->json($response);
    }

    public function getListPropertyType($type)
    {
        $response = get_json($this->API['list-property_type'] . "/" . $type);
        return response()->json($response);
    }

    public function getListLocationTc()
    {
        $response = get_json($this->API['list-loaction-tc']);
        return response()->json($response);
    }

    public function continueChecking()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->API['continue-checking'], $postData);
        return response()->json($response);
    }
    public function checkDuplicateLeadDeals()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->API['check-duplicate-lead-deals'], $postData);

        return response()->json($response);
    }

    public function rightCustomer()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->API['right-customer'], $postData);

        return response()->json($response);
    }
    public function saveClonedDeal()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->API['save-cloned-deal'], $postData);

        return response()->json($response);
    }

    public function createFeedback()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "employeeNumber" => !empty($request['employeeNumber']) ? $request['employeeNumber'] : null,
            "hobby" => !empty($request['hobby']) ? $request['hobby'] : null,
            "otherHobby" => !empty($request['otherHobby']) ? $request['otherHobby'] : null,
            "isDraff" => false,
            "isHot" => $request['isHot'],
            "optionCode" => !empty($request['optionCode']) ? $request['optionCode'] : null,
            "expectedClosingDate" => !empty($request['expectedClosingDate']) ? $request['expectedClosingDate'] : null,
            "comments" => $request['comments']
        ];
        $response = post_json($this->API['create-feedback'], $postData);
        return response()->json($response);
    }

    /*Tư vấn sản phẩm*/
    public function getListRelatedListing()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
        ];
        $response = post_json($this->API['get-list-product'], $postData);
        return response()->json($response);
    }

    public function getDealGroupUser()
    {
        $request = \Request::json()->all();
        $postData = [
            "listingTypeId" => !empty($request['listingTypeId']) ? $request['listingTypeId'] : null,
            "propertyTypeId" => !empty($request['propertyTypeId']) ? $request['propertyTypeId'] : null,
            "districtIds" => !empty($request['districtIds']) ? $request['districtIds'] : null,
            "suggestBudget" => !empty($request['suggestBudget']) ? $request['suggestBudget'] : null,
            "page" => !empty($request['page']) ? $request['page'] : 1,
            "fromDate" => !empty($request['fromDate']) ? $request['fromDate'] : null,
            "toDate" => !empty($request['toDate']) ? $request['toDate'] : null,
        ];

        $response = post_json(sprintf($this->API['get-deal-group-user'], $postData["page"]), $postData);

        return response()->json($response);
    }
    public function getDealGroup()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->API['get-lead-deal-in-group'], $postData);
        return response()->json($response);
    }

    public function getDetailDealGroupUser()
    {
        $response = array(
            'result' => true,
            'code' => '200',
            'message' => 'Thao tác thành công',
            'validatedMessage' => NULL,
            'data' =>
            array(
                'totalItems' => 1,
                'list' =>
                array(
                    0 =>
                    array(
                        'customerName' => 'anh Hoàng Hải',
                        'propertyTypeName' => 'Nhà riêng',
                        'initialBudget' => '2,5 tỷ',
                        'finalBudget' => '3,5 tỷ',
                        'minSize' => 10.0,
                        'maxSize' => NULL,
                        'districtName' => 'Quận 2',
                        'note' => NULL,
                    ),
                ),
            ),
            'additional' => NULL,
        );
        return response()->json($response);
    }

    public function getDetailListing()
    {
        $request = \Request::json()->all();
        $postData = [
            "rlistingId" => !empty($request['rlistingId']) ? $request['rlistingId'] : null,
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
        ];
        $response = post_json(sprintf($this->API['get-related-listing'], $postData['rlistingId']), $postData);
        return response()->json($response);
    }

    public function getListingDetail()
    {
        $request = \Request::json()->all();
        // $response = get_json_sam_v2(sprintf($this->API['listing-detail'], $request['listingId'], $request['listingType'], $request['propertyTypeId']));
        $response = post_json($this->API['listing-detail'] . "/" . $request['listingId'], $request);
        return response()->json($response);
    }

    public function getDetailLoanAdvice($dealId)
    {
        $response = get_json($this->API['detail-loan-advice'] . "/" . $dealId);
        return response()->json($response);
    }

    public function getDetailLoanAdviceNew($dealId)
    {
        $postData = [
            "dealId" => !empty($dealId) ? $dealId : null
        ];
        $response = post_json($this->API['get-detail-loan-advice'], $postData);
        return response()->json($response);
    }

    public function createDebtInfoStepOne()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "leadId" => !empty($request['leadId']) ? $request['leadId'] : null,
            "totalIncome" => !empty($request['totalIncome']) ? $request['totalIncome'] : null,
            "isMarried" => !empty($request['isMarried']) ? $request['isMarried'] : false,
            "profiles" => !empty($request['profiles']) ? $request['profiles'] : [],
            "isDraff" => false
        ];
        $response = post_json($this->API['create-debt-info-step-one'], $postData);
        return response()->json($response);
    }

    public function saveDenyTour()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "reasonId" => !empty($request['reasonId']) ? $request['reasonId'] : null,
            "reasonNote" => !empty($request['reasonNote']) ? $request['reasonNote'] : null,
        ];
        $response = post_json($this->API['save-deny-tour'], $postData);
        return response()->json($response);
    }

    /* Tư vấn vay vốn */
    public function calculateLoan()
    {
        $request = \Request::json()->all();
        $postData = [
            "loanAmount" => !empty($request['loanAmount']) ? $request['loanAmount'] : null,
            "bankId" => !empty($request['bankId']) ? $request['bankId'] : null,
            "maturity" => !empty($request['maturity']) ? $request['maturity'] : null,
            "paidPerMonth" => !empty($request['paidPerMonth']) ? $request['paidPerMonth'] : null
        ];
        $response = post_json($this->API['calculate-loan'], $postData);
        return response()->json($response);
    }

    public function createDocumentKyc()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "mortgageRequestId" => !empty($request['mortgageRequestId']) ? $request['mortgageRequestId'] : null,
            "loanAmount" => !empty($request['loanAmount']) ? $request['loanAmount'] : null,
            "loanYear" => !empty($request['loanYear']) ? $request['loanYear'] : null,
            "bankId" => !empty($request['bankId']) ? $request['bankId'] : null,
            "isMarried" => !empty($request['isMarried']) ? $request['isMarried'] : null,
            "remainingMoneyType" => !empty($request['remainingMoneyType']) ? $request['remainingMoneyType'] : null,
            "documents" => !empty($request['documents']) ? $request['documents'] : null
        ];
        $response = post_json($this->API['create-document'], $postData);
        return response()->json($response);
    }

    public function updateDeal()
    {
        // echo "kdjfldksf"; die();
        $request = \Request::json()->all();
        $request['purposeList'] = PropzyCommons::getPurposeIdFromDetail($request['customerPurpose']);
        if (count($request['amenitiesList'])) {
            $newArr = [];
            foreach ($request['amenitiesList'] as $am) {
                $newArr[] = ['id' => ['amenityId' => $am['id']]];
            }
            $request['amenitiesList'] = $newArr;
        }
        $response = put_json("deal/kyc-update", $request);
        return response()->json($response);
    }

    public function savePage()
    {
        $request = \Request::json()->all();
        $postData = [
            "page" => !empty($request['page']) ? $request['page'] : null,
            "customerId" => !empty($request['customerId']) ? $request['customerId'] : null,
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "data" => !empty($request['data']) ? $request['data'] : null,
        ];
        $response = post_json($this->API['save-page'], $postData);
        return response()->json($response);
    }
    public function updateFeedbackListing()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "feedbackListingId" => !empty($request['feedbackListingId']) ? $request['feedbackListingId'] : null,
        ];
        $response = put_json($this->API['update-feedback-listing'], $postData);
        return response()->json($response);
    }
    public function donePage()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "kycItemId" => !empty($request['kycItemId']) ? $request['kycItemId'] : null,
        ];
        $response = post_json($this->API['done-page'], $postData);
        return response()->json($response);
    }
    public function createReminder()
    {
        $request = \Request::json()->all();
        $postData = [
            "dealId" => !empty($request['dealId']) ? $request['dealId'] : null,
            "note" => !empty($request['note']) ? $request['note'] : null,
            "reminderDate" => !empty($request['reminderDate']) ? $request['reminderDate'] : null,
        ];
        $response = post_json($this->API['create-reminder'], $postData);
        return response()->json($response);
    }

    public function searchListings()
    {
        $postData = \Request::json()->all();
        $response = post_json_sam_v2("get-properties", $postData);
        return response()->json($response);
    }

    public function searchListingsMatchingRanking()
    {
        $postData = \Request::json()->all();
        $postData['filter']['assignedTo'] = \Session::has("user") ? \Session::get("user")->userId : "";
        $postData['filter']['currentUserId'] = \Session::has("user") ? \Session::get("user")->userId : "";
        $response = post_json_search_listing("kyc/listing/search/1/10", $postData);
        return response()->json($response);
    }

    public function getDetailPaymentSchedule()
    {
        $request = \Request::json()->all();
        $postData = [
            "loanAmount" => !empty($request['loanAmount']) ? $request['loanAmount'] : null,
            "bankId" => !empty($request['bankId']) ? $request['bankId'] : null,
            "maturity" => !empty($request['maturity']) ? $request['maturity'] : null
        ];
        $response = post_json($this->API['get-detail-payment-schedule'], $postData);
        return response()->json($response);
    }

    public function getCustomerMatchDeal()
    {
        $request = \Request::all();
        $postData = !empty($request['filter']) ? $request['filter'] : [];

        $response = post_json(sprintf(
            $this->API['get-customer-match-deal'],
            1,
            10000
        ), $postData);

        $results = [
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => [],
            'postData' => $postData,
        ];

        if ($response->result) {
            $results['recordsTotal'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['recordsFiltered'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['data'] = isset($response->data->list) ? $response->data->list : [];
        }

        return response()->json($results);
    }
    public function sendCheckEmpty()
    {
        $request = \Request::json()->all();
        $response = post_json($this->API['send-check-empty'], $request);
        return response()->json($response);
    }

    public function getListingCompare()
    {
        $request = \Request::json()->all();
        $response = post_json_sam($this->API['listings-compare'], $request);
        return response()->json($response);
    }

    public function getLoanDemandInfo()
    {
        $request = \Request::json()->all();
        $response = post_json($this->API['get-loan-demand-info'], $request);
        return response()->json($response);
    }

    public function calcLoanDemand()
    {
        $request = \Request::json()->all();
        $request['bankIds'] = count($request['bankIds']) ? $request['bankIds'] : null;
        $response = post_json(sprintf($this->API['calc-loan-demand'], 1, 10), $request);
        return response()->json($response);
    }
    public function kml()
    {
        $request = \Request::json()->all();
        $response = post_json_loca("/kmz/files/multi", $request);
        return response()->json($response);
    }
}
