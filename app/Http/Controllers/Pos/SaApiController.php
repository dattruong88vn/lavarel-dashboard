<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class SaApiController extends CommonPosController
{

    private $apiList  = array(
        'getStatusListingXLList' => 'seller/channel-types',
        'doUpdateStatusListingXL' => 'seller/listings/guaranteed-status-update',
        'getChannelStatusList' => 'seller/channel-status',
        'getChannelTypeList' => 'seller/channel-types',
        'loadListingOverview' => 'seller/v2/count-listing',
        'getListListing' => 'seller/v2/listings',
        'getListingDetail' => 'seller/listings',
        'updateListing' => 'seller/listings',
        'createListing' => 'seller/listings',
        'trackCall' => 'seller/listings',
        'sendDIY' => 'seller/listings',
        'unlock' => 'seller/listings/%d/lock-unlock',
        'resendAccount' => 'seller/resend/account/%d',
        'pushToSAOwnerList' => 'seller/listings/%d/push-diy',
        'createReminder' => 'seller/reminders',
        'getReminder' => 'seller/reminders/popup',
        'closeReminder' => 'seller/reminders/closed-popup',
        'marketReportChartData' => 'seller/market-report',
        'marketReportData' => 'seller/market-report-area',
        'marketReportList' => 'seller/market-report-list',
        'sendPricingRequest' => 'seller/send-pricing-request-email',
        'checkEmptyPopup' => 'seller/listings/check-empty',
        'checkEmptyList' => 'seller/listings/check-empty',
        'countTasks' => 'seller/listings/count/task',
        'sendCheckEmptyResult' => 'seller/listings/update/check-empty',
        'sendCheckEmptyResultAgain' => 'seller/listings/update/again-check-empty',
        'loadNotificationCurrentUser' => 'notification/current-user',
        'addNoteCRM' => 'seller/listings/comment/add',
        'updateNoteCRM' => 'seller/listings/comment/update',
        //'noteCRMList' => 'seller/listings/comment',
        'noteCRMList' => 'listing/v2/log/%d/%d/%d', // rlisting/page/number
        'checkHighlight' => 'seller/v2/listings/check/highlight',
        'countCollectionAndTour' => 'seller/listings/count-by-district',
        'countAggreate' => '/seller/listings/aggregate-detail/%d',
        'getSAListingFeedback' => 'seller/listings/feeback-tour',
        'getFeedbackConcierge' => 'seller/listings/feedback-tour-cc',
        'getValuation' => 'seller/valuation',
        /*'getDealListingCountByDistrict' => 'seller/deal/listing/count-by-district',
			'getTourListingCountByDistrict' => 'seller/tour/listing/count-by-district',*/
        'getDealTotalList' => 'seller/listings/deal-total/%d',
        'getTourTotalList' => 'seller/listings/tour-total/%d',
        'sendEvaluationEmail' => 'seller/listings/send-evaluation-email',
        'getNegotiationList' => 'seller/listings/negotiation',
        'getDepositHistoryList' => 'seller/deal/deposit/%d/history/%d/%d',
        'getDepositList' => 'seller/listings/deposit',
        'getNegotiationRejectReason' => 'seller/deal/negotiation/reject/reason',
        'getNegotiationPendingReason' => 'seller/deal/negotiation/pending/reason',
        'getNegotiationLatest' => 'seller/negotiation/price/latest/%d',
        'setNegotiationResponse' => 'seller/negotiation/response',
        'getDepositRejectReason' => 'seller/deal/deposit/cancel/reason',
        'setDepositDeny' => 'seller/deal/deposit/%d/status/cancel',
        'setDepositApprove' => 'seller/deal/deposit/%d/status/agree',
        'setDepositMeeting' => 'seller/deal/deposit/%d/status/updating',
        'getDepositStatusList' => 'deal/deposit/status',
        'getNegotiationHistoryList' => 'histories/list/negotiation/%d/%d',
        'getDealStatusList' => 'deal/status/list',
        'getDepositForm' => 'seller/deal/deposit/form/%d',
        'getDepositTaskSupport' => 'seller/deal/deposit/meeting-tasks',
        'getDepositTaskCancel' => 'seller/deal/deposit/cancel-tasks/',
        'setDepositTaskSupportDone' => 'seller/deal/task/%d',
        'updateGuaranteedListing' => 'seller/listings/guaranteed/update',
        'getListNeedUpdatePosition' => 'seller/listings/position/%d/%d',
        'postUpdatePosition' => 'seller/listings/position/update',
        'postCancelPosition' => 'seller/listings/position/cancel',
        'deleteSubPhone' => 'seller/listings/delete-sub-phone',
        'changePhone' => 'seller/listings/reverse-phone-number',
        'update-info-image' => 'seller/listings/request-image',
        'get-appraisal-info' => 'seller/listing/valuation-info/%d', //rlistingId
        'update-appraisal-info' => 'seller/listing/valuation-info',
        'get-list-card' => 'channel-types/%d',
        'update-score-card' => 'seller/scorecard',
        'history-change-score-card' => '/seller/classify/history/%d',
        'get-list-bpo' => '/channel-types/%d'
    );
    private $numberOfPage;

    public function __construct()
    {
        parent::__construct();
        $this->numberOfPage = 10;
    }
    // lấy danh sách trạng thái của listing độc quyền
    public function getStatusListingXLList()
    {
        $requestData = \Request::all();

        $response = get_json($this->apiList['getStatusListingXLList'] . '/' . 36);

        return response()->json($response);
    }

    // cập nhật trạng thái của listing độc quyền
    public function doUpdateStatusListingXL()
    {
        $postData = \Request::json()->all();
        $response = post_json($this->apiList['doUpdateStatusListingXL'], $postData);
        $response->postData = $postData;
        return response()->json($response);
    }

    public function getChannelStatusList()
    {
        $requestData = \Request::all();
        $type = !empty($requestData['type']) ? $requestData['type'] : -1;

        $response = get_json($this->apiList['getChannelStatusList'] . '/' . $type);

        return response()->json($response);
    }

    public function getDealStatusList()
    {
        $response = get_json($this->apiList['getDealStatusList']);

        return response()->json($response);
    }

    public function getChannelTypeList($type = -1)
    {
        $response = get_json($this->apiList['getChannelTypeList'] . '/' . $type);
        return response()->json($response);
    }

    public function marketReportList()
    {
        $requestData = \Request::all();
        /*$sortColumnList = [
			1 => 'price',
			2 => 'lotSize',
			3 => 'floorSize',
			9 => 'position'
		];*/
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;
        $postData = [
            'rlistingId' => intVal($requestData['rlistingId']),
            'dateFrom' => doubleval($requestData['dateFrom']),
            'dateTo' => doubleval($requestData['dateTo']),
            'columnName' => $requestData['columnName'] ? $requestData['columnName'] : null,
            'value' => $requestData['value'] ? $requestData['value'] : null
        ];
        /*if (array_key_exists($requestData['order'][0]['column'], $sortColumnList)) {
			$postData['columnName'] = $sortColumnList[$requestData['order'][0]['column']];
			$postData['value'] = $requestData['order'][0]['dir'];
		}*/
        $response = post_json($this->apiList['marketReportList'] . '/' . $page . '/' . $numberItem, $postData);
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

    public function loadListingOverview()
    {
        $requestData = \Request::json()->all();
        $postData = $this->buildFilterData($requestData);
        $response = post_json($this->apiList['loadListingOverview'], $postData);
        $response->postData = $postData;
        return response()->json($response);
    }

    public function getListingDetail()
    {
        $requestData = \Request::json()->all();

        $response = get_json($this->apiList['getListingDetail'] . '/'
            . $requestData->id);

        return response()->json($response);
    }

    public function updateListing()
    {
        $requestData = \Request::json()->all();
        if (!count($requestData['facility'])) {
            $requestData['facility']['numberBasement'] = 0;
        }
        if (!empty($requestData['title'])) {
            $requestData['title'] = htmlspecialchars($requestData['title'], ENT_QUOTES);
        }
        $response = put_json($this->apiList['updateListing'], $requestData);
        $response->postData = $requestData;
        return response()->json($response);
    }

    public function createListing()
    {
        $requestData = \Request::json()->all();
        if (!empty($requestData['title'])) {
            $requestData['title'] = htmlspecialchars($requestData['title'], ENT_QUOTES);
        }
        $response = post_json($this->apiList['createListing'], $requestData);
        $response->postData = $requestData;
        return response()->json($response);
    }

    public function trackCall()
    {
        $requestData = \Request::json()->all();

        $rlistingId = $requestData['rlistingId'];

        unset($requestData['rlistingId']);

        if(CALL_SERVICES != 2){
            $url3CX = '3cx/update-track-seller-history-call';
            $response = put_json_with_header($url3CX, $requestData);
        }else{
            $response = post_json($this->apiList['trackCall'] . '/' . $rlistingId
            . '/track-call', $requestData);
        }

        return response()->json($response);
    }

    public function sendDIY()
    {
        $requestData = \Request::json()->all();

        $rlistingId = intval($requestData['rlistingId']);

        $response = get_json($this->apiList['sendDIY'] . '/' . $rlistingId
            . '/send-diy');

        return response()->json($response);
    }

    public function unlock()
    {
        $requestData = \Request::json()->all();

        $rlistingId = intval($requestData['rlistingId']);

        $response = get_json(sprintf($this->apiList['unlock'], $rlistingId));

        return response()->json($response);
    }

    public function resendAccount()
    {
        $requestData = \Request::json()->all();

        $rId = intval($requestData['rId']);

        $response = get_json(sprintf($this->apiList['resendAccount'], $rId));

        return response()->json($response);
    }

    public function pushToSAOwnerList()
    {
        $requestData = \Request::json()->all();

        $rId = intval($requestData['rId']);

        $response = get_json(sprintf($this->apiList['pushToSAOwnerList'], $rId));

        return response()->json($response);
    }

    public function createReminder()
    {
        $requestData = \Request::json()->all();

        $response = post_json($this->apiList['createReminder'], $requestData);

        return response()->json($response);
    }

    public function getReminder()
    {
        $response = get_json($this->apiList['getReminder']);

        return response()->json($response);
    }

    public function closeReminder()
    {
        $requestData = \Request::json()->all();

        $response = get_json($this->apiList['closeReminder'] . '/'
            . $requestData['reminderId']);

        return response()->json($response);
    }

    public function uploadPhoto()
    {
        $type = 'listing';
        // Get upload image
        $images = \Input::file('files');

        $results = [];
        if (count($images) > 0) {
            foreach ($images as $key => $image) {
                $uploadRs = uploadImageFilesUseApi($image, $type);
                $results = array_add($results, $key, $uploadRs);
            }
        }

        // Upload image via API
        return response()->json($results);
    }

    public function marketReportChartData()
    {
        $requestData = \Request::json()->all();

        $response = get_json($this->apiList['marketReportChartData'] . '/'
            . $requestData['rlistingId'] . '/' . $requestData['numberUnit']
            . '/' . $requestData['unit']);

        return response()->json($response);
    }

    public function marketReportData()
    {
        $requestData = \Request::json()->all();
        $response = post_json($this->apiList['marketReportData'], $requestData);
        return response()->json($response);
    }

    public function sendPricingRequest()
    {
        $requestData = \Request::json()->all();
        $response = post_json($this->apiList['sendPricingRequest'], $requestData);

        return response()->json($response);
    }



    public function countTasks()
    {
        try {
            $response = get_json($this->apiList['countTasks']);
        } catch (\Exception $e) {
            $response = [
                "result" => true,
                "code" => "200",
                "message" => "Thao tác thành công",
                "validatedMessage" => null,
                "data" => [
                    "totalItems" => 0,
                ],
                "additional" => null
            ];
        }

        return response()->json($response);
    }

    public function checkEmptyList()
    {
        $requestData = \Request::all();
        $listingTypeId = !empty($requestData['listingTypeId']) ? $requestData['listingTypeId'] : null;
        $response = post_json($this->apiList['checkEmptyList'], ['type' => 2, 'listingTypeId' => $listingTypeId]);
        $response = [
            'recordsTotal' => isset($response->data[0]) ? count($response->data) : 0,
            'recordsFiltered' => isset($response->data[0]) ? count($response->data) : 0,
            'data' => isset($response->data) ? $response->data : [],
        ];

        return response()->json($response);
    }

    public function checkEmptyPopup()
    {
        $response = post_json($this->apiList['checkEmptyPopup'], ['type' => 1, 'listingTypeId' => null]);

        //        $response = [
        //            'recordsTotal' => isset($response->data[0]) ? count($response->data[0]) : 0,
        //            'recordsFiltered' => isset($response->data[0]) ? count($response->data[0]) : 0,
        //            'data' => isset($response->data[0]) ? [$response->data[0]] : [],
        //        ];

        return response()->json($response);
    }

    public function sendCheckEmptyResult()
    {
        $requestData = \Request::json()->all();

        $response = post_json($this->apiList['sendCheckEmptyResult'], $requestData);

        return response()->json($response);
    }

    public function postUpdatePosition()
    {
        $requestData = \Request::json()->all();

        $response = put_json($this->apiList['postUpdatePosition'], $requestData);

        return response()->json($response);
    }

    public function postCancelPosition()
    {
        $requestData = \Request::json()->all();

        $response = put_json($this->apiList['postCancelPosition'], $requestData);

        return response()->json($response);
    }

    public function sendCheckEmptyResultAgain()
    {
        $requestData = \Request::json()->all();

        $response = post_json($this->apiList['sendCheckEmptyResultAgain'], $requestData);

        return response()->json($response);
    }

    public function addNoteCRM()
    {
        $requestData = \Request::json()->all();

        $response = post_json($this->apiList['addNoteCRM'], $requestData);

        return response()->json($response);
    }

    public function updateNoteCRM()
    {
        $requestData = \Request::json()->all();
        $response = post_json($this->apiList['updateNoteCRM'], $requestData);
        return response()->json($response);
    }

    public function noteCRMList()
    {
        $requestData = \Request::all();

        $numberPages = $this->getNumberPages($requestData);

        $response = $this->getResponseServer(
            'GET',
            sprintf($this->apiList['noteCRMList'], $requestData['rlistingId'], $numberPages['pages'], $numberPages['items']),
            $requestData
        );

        $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
        $dataResponse = isset($response->data->list) ? $response->data->list : [];
        $response->recordsTotal = $total;
        $response->recordsFiltered = $total;
        $response->data = $dataResponse;
        return response()->json($response);
    }

    public function loadNotificationCurrentUser()
    {
        $response = get_json($this->apiList['loadNotificationCurrentUser']);

        return response()->json($response);
    }

    public function checkHighlight()
    {
        $requestData = \Request::json()->all();
        $postData = $this->buildFilterData($requestData);

        $response = post_json($this->apiList['checkHighlight'], $postData);
        $response->postData = $postData;
        // $response = get_json_test('seller/check-highlight');
        return response()->json($response);
    }

    public function searchList()
    {
        $requestData = \Request::all();
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;
        $postData = $this->buildFilterData($requestData);
        $response = $this->getResponseServer('POST', $this->apiList['getListListing'] . '/' . $page . '/' . $numberItem, $postData);

        if ($response->result) {
            $response->postData = $postData;
        }

        return response()->json($response);
    }

    public function getSAListingFeedback()
    {
        $requestData = \Request::all();
        $rlistingId = intval($requestData['rlistingId']);
        $response = get_json($this->apiList['getSAListingFeedback'] . '/' . $rlistingId);
        $response = [
            'recordsTotal' => isset($response->data) ? (count($response->data) > 0 ? count($response->data) - 1 : 0) : 0,
            'data' => isset($response->data) ? $response->data : [],
            'requestData' => $requestData
        ];
        return response()->json($response);
    }
    public function getFeedbackConcierge()
    {
        $requestData = \Request::all();
        $rlistingId = intval($requestData['rlistingId']);
        $response = get_json($this->apiList['getFeedbackConcierge'] . '/' . $rlistingId);
        $response = [
            'recordsTotal' => isset($response->data) ? (count($response->data) > 0 ? count($response->data) - 1 : 0) : 0,
            'data' => isset($response->data) ? $response->data : [],
            'requestData' => $requestData
        ];
        return response()->json($response);
    }

    public function getValuation()
    {
        $requestData = \Request::json()->all();
        $rlistingId = intval($requestData['rlistingId']);
        $response = get_json($this->apiList['getValuation'] . '/' . $rlistingId);
        $response->rlistingId = $rlistingId;
        return response()->json($response);
    }

    public function countCollectionAndTour()
    {
        $requestData = \Request::json()->all();
        $postData = $this->buildFilterData($requestData);
        $response = post_json($this->apiList['countCollectionAndTour'], $postData);
        $response->postData = $postData;
        return response()->json($response);
    }


    public function updateGuaranteedListing()
    {
        $requestData = \Request::json()->all();
        $response = put_json($this->apiList['updateGuaranteedListing'], $requestData);
        $response->requestData = $requestData;
        return response()->json($response);
    }

    public function countAggreate()
    {
        $requestData = \Request::json()->all();
        $rlistingId = intval($requestData['rlistingId']);
        $response = get_json(sprintf($this->apiList['countAggreate'], $rlistingId));
        return response()->json($response);
    }

    public function getDealTotalList()
    {
        $requestData = \Request::all();
        $rlistingId = intval($requestData['rlistingId']);
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;
        $postData = [
            "rlistingId" => $rlistingId
        ];
        $response = $this->getResponseServer('GET', sprintf($this->apiList['getDealTotalList'], $rlistingId) . '/' . $page . '/' . $numberItem, $postData);
        if ($response->result) {
            $response->recordsTotal = $response->data->totalItems;
            $response->recordsFiltered = $response->data->totalItems;
            $response->data = $response->data->list;
        }
        return response()->json($response);
    }

    public function getTourTotalList()
    {
        $requestData = \Request::all();
        $rlistingId = intval($requestData['rlistingId']);
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;
        $postData = [
            "rlistingId" => $rlistingId
        ];
        $response = $this->getResponseServer('GET', sprintf($this->apiList['getTourTotalList'], $rlistingId) . '/' . $page . '/' . $numberItem, $postData);
        if ($response->result) {
            $response->recordsTotal = $response->data->totalItems;
            $response->recordsFiltered = $response->data->totalItems;
            $response->data = $response->data->list;
        }
        return response()->json($response);
    }

    public function getListNeedUpdatePosition()
    {
        $requestData = \Request::all();
        $numberPages = $this->getNumberPages($requestData);
        $data = [
            "rlistingId" => !empty($requestData['rlistingId']) ? $requestData['rlistingId'] : null
        ];
        $response = $this->getResponseServer('POST', sprintf($this->apiList['getListNeedUpdatePosition'],  $numberPages['pages'], $numberPages['items']), $data);
        $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
        $dataResponse = isset($response->data->list) ? $response->data->list : [];
        $response->recordsTotal = $total;
        $response->recordsFiltered = $total;
        $response->data = $dataResponse;
        return response()->json($response);
    }

    public function sendEvaluationEmail()
    {
        $requestData = \Request::json()->all();
        $postData = $requestData;
        $response = post_json($this->apiList['sendEvaluationEmail'], $postData);
        $response->postData = $postData;
        return response()->json($response);
    }

    public function getNegotiationList()
    {
        $requestData = \Request::all();
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;

        $postData = [
            "rListingId" => $requestData["rListingId"] ? (int) ($requestData["rListingId"]) : null,
            "statusId" => $requestData["statusId"] ? (int) ($requestData["statusId"]) : null,
            "createdDateFrom" => $requestData["createdDateFrom"] ? (int) ($requestData["createdDateFrom"]) : null,
            "createdDateTo" => $requestData["createdDateTo"] ? (int) ($requestData["createdDateTo"]) : null,
            "hasTask" => $requestData["hasTask"] ? (int) ($requestData["hasTask"]) : null,
            "listingTypeId" => !empty($requestData['listingTypeId']) ? $requestData['listingTypeId']  : null,
            "propertyTypeIds" => !empty($requestData['propertyTypeIds']) ? $requestData['propertyTypeIds']  : null,
            "sort" => [
                "columnName" => $requestData["sort"]["columnName"],
                "value" =>  $requestData["sort"]["value"]
            ]
        ];

        $response = post_json($this->apiList['getNegotiationList'] . '/' . $page . '/' . $numberItem, $postData);

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

    public function getDepositList()
    {
        $requestData = \Request::all();
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;


        $stateSort = empty($requestData['stateSort']) ? $requestData['stateSort']  : false;
        if ($stateSort) {
            $order = isset($requestData['order'][0]) ? $requestData['order'][0] : ["column" => 0, "dir" => "asc"];
            $sort = [
                [
                    "columnName"  => $requestData['columns'][$order["column"]]["data"],
                    "value"  => $order["dir"]
                ]
            ];
        } else {
            $sort = isset($requestData['sort']) ? $requestData['sort'] : [];
        }


        $postData = [
            "sort" => $sort,
            "listingId" => !empty($requestData['listingId']) ? $requestData['listingId']  : null,
            "hasTask" => !empty($requestData['hasTask']) ? $requestData['hasTask']  : null,
            "statusId" => !empty($requestData['statusId']) ? $requestData['statusId']  : null,
            "createdDateFrom" => !empty($requestData['createdDateFrom']) ? $requestData['createdDateFrom']  : null,
            "createdDateTo" => !empty($requestData['createdDateTo']) ? $requestData['createdDateTo']  : null,
            "listingTypeId" => !empty($requestData['listingTypeId']) ? $requestData['listingTypeId']  : null,
            "propertyTypeIds" => !empty($requestData['propertyTypeIds']) ? $requestData['propertyTypeIds']  : null,
        ];
        //dd($postData);

        $response = post_json($this->apiList['getDepositList'] . '/' . $page . '/' . $numberItem, $postData);

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

    public function getDepositHistoryList()
    {
        $requestData = \Request::all();
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;
        $depositId = isset($requestData['filter']['depositId']) ? intval($requestData['filter']['depositId']) : 0;
        $sortColumn = intval($requestData['order'][0]['column']);
        $filter = [];
        unset($requestData['filter']['createdDateFrom']);
        unset($requestData['filter']['createdDateTo']);
        unset($requestData['filter']['meetingTimeFrom']);
        unset($requestData['filter']['meetingTimeTo']);
        // $requestData['filter']['depositId'] = intval($requestData['filter']['depositId']);
        $requestData['filter']['depositId'] = $depositId;
        $filterKeys = array_keys($requestData['filter']);
        for ($i = 0; $i < count($filterKeys); $i++) {
            $temp = $requestData['filter'][$filterKeys[$i]];
            if (!empty($temp)) {
                $filter[] = [
                    'columnName' => $filterKeys[$i],
                    'value' => $temp
                ];
            }
        }
        $postData = [
            "sort" => [
                [
                    "columnName" => $requestData['columns'][$sortColumn]['name'],
                    "value" => $requestData['order'][0]['dir']
                ]
            ],
            "filter" => $filter
        ];

        $response = post_json(sprintf($this->apiList['getDepositHistoryList'], $depositId, $page, $numberItem), $postData);
        $results = [
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => [],
            'postData' => $postData,
            'requestData' => $requestData
        ];
        if ($response->result) {
            $results['recordsTotal'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['recordsFiltered'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['data'] = isset($response->data->list) ? $response->data->list : [];
        }
        return response()->json($results);
    }

    public function getNegotiationHistoryList()
    {
        $requestData = \Request::all();
        $numberItem = isset($requestData['length']) ? $requestData['length'] : 10;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;
        $requestData['filter']['data.negotiationId'] = isset($requestData['filter']['data.negotiationId']) ? intval($requestData['filter']['data.negotiationId']) : 0;
        $requestData['filter']['data.dealId'] = intval($requestData['filter']['data.dealId']);
        $requestData['filter']['data.statusId'] = intval($requestData['filter']['data.statusId']);
        // $requestData['filter']['data.negotiationPrice'] = doubleval($requestData['filter']['data.negotiationPrice']);
        // $requestData['filter']['data.negotiationPrice'] = floatval(preg_replace("/[^-0-9\.]/","",$requestData['filter']['data.negotiationPrice']));
        $sortColumn = intval($requestData['order'][0]['column']);
        $postData = [
            "dealId" => intval($requestData['filter']['data.dealId']),
            "sort" => [
                "columnName" => $requestData['columns'][$sortColumn]['name'],
                "value" => $requestData['order'][0]['dir']
            ]
        ];
        $filter = [];
        unset($requestData['filter']['createdDateFrom']);
        unset($requestData['filter']['createdDateTo']);
        unset($requestData['filter']['data.dealId']);
        unset($requestData['filter']['negotiationPriceFrom']);
        $filterKeys = array_keys($requestData['filter']);
        for ($i = 0; $i < count($filterKeys); $i++) {
            $temp = $requestData['filter'][$filterKeys[$i]];
            if (!empty($temp)) {
                $filter[] = [
                    'columnName' => $filterKeys[$i],
                    'value' => $temp
                ];
            }
        }
        $postData['filter'] = $filter;

        $response = post_json(sprintf($this->apiList['getNegotiationHistoryList'], $page, $numberItem), $postData);
        $results = [
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => [],
            'postData' => $postData,
            'requestData' => $requestData
        ];
        if ($response->result) {
            $results['recordsTotal'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['recordsFiltered'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['data'] = isset($response->data->list) ? $response->data->list : [];
        }
        return response()->json($results);
    }

    public function updateDeposit()
    {
        $requestData = \Request::json()->all();

        $messages = [
            'required' => 'dữ liệu :attribute yêu cầu bị mất. Vui lòng kiểm tra lại',
        ];

        $validator = Validator::make($requestData, [
            'type' => 'required',
            'depositId' => 'required',
        ], $messages);

        if ($validator->fails()) {
            //throwException($validator) ;
            return response()->json($validator->errors());
        }

        $url = "";
        switch ($requestData['type']) {
            case 1:
                $url = sprintf($this->apiList['setDepositApprove'], $requestData['depositId']);
                break;
            case 2:
                $url = sprintf($this->apiList['setDepositDeny'], $requestData['depositId']);
                break;
            case 3:
                $url = sprintf($this->apiList['setDepositMeeting'], $requestData['depositId']);
                break;
        }

        //unset($requestData, ['type', 'depositId']);
        $response = post_json($url, $requestData);
        return response()->json($response);
    }

    public function updateNegotiation()
    {
        $requestData = \Request::json()->all();

        $messages = [
            'required' => 'dữ liệu :attribute yêu cầu bị mất. Vui lòng kiểm tra lại',
        ];

        $validator = Validator::make($requestData, [
            'negotiationId' => 'required',
            'statusId' => 'required',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $url = $this->apiList['setNegotiationResponse'];

        //unset($requestData, ['type', 'depositId']);
        $response = post_json($url, $requestData);
        return response()->json($response);
    }

    function buildFilterData($requestData)
    {
        $type = intval($requestData['type']);
        $phone = !empty($requestData['phone']) ? $requestData['phone'] : null;
        $sourceId = !empty($requestData['sourceId']) ? $requestData['sourceId'] : null;
        $tcId = !empty($requestData['tcid']) ? $requestData['tcid'] : null;
        $channelTypeIds = !empty($requestData['channelTypeIds']) ? $requestData['channelTypeIds'] : null;
        $address = !empty($requestData['address']) ? $requestData['address'] : null;
        $ownerName = !empty($requestData['ownerName']) ? $requestData['ownerName'] : null;
        $fromAssignedDate = !empty($requestData['fromAssignedDate']) ? $requestData['fromAssignedDate'] : null;
        $toAssignedDate = !empty($requestData['toAssignedDate']) ? $requestData['toAssignedDate'] : null;
        $typeLive = !empty($requestData['liveType']) ? intval($requestData['liveType']) : null;
        $dealStatus = !empty($requestData['dealStatus']) ? $requestData['dealStatus'] : null;
        $scorecardType = !empty($requestData['scorecardType']) ? intval($requestData['scorecardType']) : null;
        $listingTypeId = !empty($requestData['listingTypeId']) ? (int) $requestData['listingTypeId'] : null;
        $propertyTypeIds = !empty($requestData['propertyTypeIds']) ?  (string) $requestData['propertyTypeIds'] : null;
        $mapCode = isset($requestData['mapCode']) ? $requestData['mapCode'] : null;
        $landCode = isset($requestData['landCode']) ? $requestData['landCode'] : null;
        $bpo = isset($requestData['bpo']) ? $requestData['bpo'] : null;
        $arrayIntegerRlistingId = [];
        if (!empty($requestData['rlistingId'])) {
            foreach ($requestData['rlistingId'] as $key => $value) {
                array_push($arrayIntegerRlistingId, intval($value));
            }
        }

        if (!empty($requestData['sort']) && $requestData['sort']['columnName'] == 'formatedPrice') {
            $requestData['sort']['columnName'] = 'price';
        }

        return [
            'type' => $type,
            'phone' => $phone,
            'rlistingId' => !empty($arrayIntegerRlistingId) ? $arrayIntegerRlistingId : null,
            'ownerName' => $ownerName,
            'address' => $address,
            'sort' => !empty($requestData['sort']) ? $requestData['sort'] : null,
            'sourceId' => $sourceId,
            'fromAssignedDate' => $fromAssignedDate,
            'toAssignedDate' => $toAssignedDate,
            'fromReviewedDate' => $fromAssignedDate,
            'toReviewedDate' => $toAssignedDate,
            'dealStatus' => $dealStatus,
            'liveType' => $typeLive,
            'tcid' => $tcId,
            'channelTypeIds' => $channelTypeIds,
            'listingTypeId' => $listingTypeId,
            'propertyTypeIds' => $propertyTypeIds,
            'mapCode' => $mapCode,
            'landCode' => $landCode,
            'scorecardType' => $scorecardType,
            'zoneIds' => !empty($requestData['zoneField']) ? $requestData['zoneField'] : null,
            'teamIds' => !empty($requestData['teamField']) ? $requestData['teamField'] : null,
            'departmentIds' => !empty($requestData['departmentField']) ? $requestData['departmentField'] : null,
            'userIds' => !empty($requestData['memberField']) ? $requestData['memberField'] : null,
            'districtId' => !empty($requestData['districtId']) ? $requestData['districtId'] : null,
            'wardId' => !empty($requestData['wardId']) ? $requestData['wardId'] : null,
            'filterBPOCode' => $bpo
        ];
    }

    public function getDepositRejectReason()
    {
        $response = get_json($this->apiList['getDepositRejectReason']);
        return response()->json($response);
    }

    public function getNegotiationRejectReason()
    {
        $response = get_json($this->apiList['getNegotiationRejectReason']);
        return response()->json($response);
    }

    public function getNegotiationPendingReason()
    {
        $response = get_json($this->apiList['getNegotiationPendingReason']);
        return response()->json($response);
    }

    public function getDepositStatusList()
    {
        $response = get_json($this->apiList['getDepositStatusList']);
        return response()->json($response);
    }
    public function getDepositForm()
    {
        $requestData = \Request::json()->all();
        $depositId = $requestData['depositId'];
        $response = get_json(sprintf($this->apiList['getDepositForm'], $depositId));
        return response()->json($response);
    }
    public function getDepositTaskSupport()
    {
        $requestData = \Request::all();
        $numberItem = isset($requestData['length']) ? $requestData['length'] : $this->numberOfPage;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;

        $postData = [
            'taskId' => !empty($requestData['taskId']) ? $requestData['taskId'] : null,
            'scheduleTimeFrom' => !empty($requestData['scheduleTimeFrom']) ? $requestData['scheduleTimeFrom'] : null,
            'scheduleTimeTo' => !empty($requestData['scheduleTimeTo']) ? $requestData['scheduleTimeTo'] : null,
            "listingTypeId" => !empty($requestData['listingTypeId']) ? $requestData['listingTypeId']  : null,
            "propertyTypeIds" => !empty($requestData['propertyTypeIds']) ? $requestData['propertyTypeIds']  : null,
        ];

        $response = post_json($this->apiList['getDepositTaskSupport'] . '/' . $page . '/' . $numberItem, $postData);

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
    public function getDepositTaskCancel()
    {
        $requestData = \Request::all();
        $numberItem = isset($requestData['length']) ? $requestData['length'] : $this->numberOfPage;
        $page = ((isset($requestData['start']) ? $requestData['start'] : 0) / $numberItem) + 1;

        $postData = [
            'taskId' => !empty($requestData['taskId']) ? $requestData['taskId'] : null,
            "listingTypeId" => !empty($requestData['listingTypeId']) ? $requestData['listingTypeId']  : null,
            "propertyTypeIds" => !empty($requestData['propertyTypeIds']) ? $requestData['propertyTypeIds']  : null,
            //'scheduleTimeFrom' => !empty($requestData['scheduleTimeFrom']) ? $requestData['scheduleTimeFrom'] : null,
            //'scheduleTimeTo' => !empty($requestData['scheduleTimeTo']) ? $requestData['scheduleTimeTo'] : null,
        ];

        $response = post_json($this->apiList['getDepositTaskCancel'] . '/' . $page . '/' . $numberItem, $postData);

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


    public function setDepositTaskSupportDone()
    {
        $requestData = \Request::all();
        $taskId = !empty($requestData['taskId']) ? $requestData['taskId'] : null;
        $response = put_json(sprintf($this->apiList['setDepositTaskSupportDone'], $taskId), []);
        return response()->json($response);
    }

    public function changePhone()
    {
        $requestData = \Request::json()->all();
        $response = $this->getResponseServer('POST', $this->apiList['changePhone'], $requestData);
        return response()->json($response);
    }
    public function deleteSubPhone()
    {
        $requestData = \Request::json()->all();
        $response = $this->getResponseServer('PUT', $this->apiList['deleteSubPhone'], $requestData);
        return response()->json($response);
    }
    public function getTransactionCenter()
    {
        $response = [
            'result' => true,
            'data' => get_transaction_centers(),
            'code' => 200,
            'message' => 'Thao tác thành công'
        ];
        return response()->json($response);
    }
    public function getNegotiationLatest()
    {
        $requestData = \Request::all();
        $rListingId = isset($requestData["rlistingId"]) ? $requestData["rlistingId"] : null;

        $response = $this->getResponseServer('GET', sprintf($this->apiList['getNegotiationLatest'], $rListingId));
        return response()->json($response);
    }

    public function updateInfoImage()
    {

        $request = [
            'rlistingId' =>  \Request::get('rlistingId'),
            'socialUid' => \Request::get('socialUid'),
            'imagesRequestDetails' =>  \Request::get('imagesRequestDetails'),
        ];
        $response = $this->getResponseServer('POST', $this->apiList['update-info-image'], $request);
        return response()->json($response);
    }

    public function getAppraisalInfo()
    {
        $id = \Request::get('rlistingId');
        $response = $this->getResponseServer('GET', sprintf($this->apiList['get-appraisal-info'], $id));
        return response()->json($response);
    }
    public function updateAppraisalInfo()
    {
        $data = [
            'rlistingId' => \Request::get('rlistingId'),
            'company' => \Request::get('company'),
            'type' => \Request::get('type'),
            'file' => \Request::get('file'),
            'price' => \Request::get('price'),
        ];
        $response = $this->getResponseServer('POST', $this->apiList['update-appraisal-info'], $data);
        return response()->json($response);
    }

    public function getListCard()
    {
        $response = $this->getResponseServer('GET', sprintf($this->apiList['get-list-card'], 36));
        return response()->json($response);
    }

    public function updateCardType()
    {
        $data = \Request::json()->all();
        $response = $this->getResponseServer('PUT', $this->apiList['update-score-card'], $data);
        return response()->json($response);
    }

    public function getHistoryScoreCard()
    {
        $id = \Request::get('rId');
        $response = $this->getResponseServer('GET', sprintf($this->apiList['history-change-score-card'], $id));
        return response()->json($response);
    }

    public function getListBpo()
    {
        $response = $this->getResponseServer('GET', sprintf($this->apiList['get-list-bpo'], 62));
        return response()->json($response);
    }
}
