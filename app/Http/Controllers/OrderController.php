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

class OrderController extends BaseController {

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
    }

    public function getList() {
        $response = get_json(ORDER_COUNT_RESPONDED_STATUS);
        //return response()->json($response);
        $viewData = array(
            "data" => $response->data
        );
        return view("order.list")->with($viewData);
    }

    public function detail(Request $request, $id) {

        $orderDetail = get_json(ORDER . "/" . $id)->data;
        $requestDetail = $orderDetail->lead->request;

        //return response()->json($orderDetail);
        $statusList = get_json(GET_REQUEST_STATUS_LIST)->data;
        $agents = get_json(GET_AGENT_LIST . '/-1')->data;
        $propertyTypes = get_json(GET_PROPERTY_TYPE_LIST . '/' . $requestDetail->listingTypeId);
        $districts = get_json(GET_DISTRICTS . '/1');
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $customerId = get_json(sprintf(GENERATE_CUSTOMER_ID, $subjects[0]->subjectId))->data->customerId;
        $accounts = get_json(GET_ACCOUNT_LIST)->data;
        $directions = get_json(GET_DIRECTIONS)->data;
//return response()->json($requestDetail);
        $amenities = array();
        if ($requestDetail->propertyTypeId) {
            $amenities = get_json(GET_AMENITIES_CHECK . "/" . $requestDetail->listingTypeId . "/" . $requestDetail->propertyTypeId . "/2");
            //$amenities = get_json(GET_AMENITIES_CHECK . "/" . 2 . "/" . 4 . "/2");
        }
        $currentDistricts = array();
        $isPreferedDistrict = -1;
        if ($requestDetail->districtsList) {
            foreach ($requestDetail->districtsList as $myDistrict) {
                $currentDistricts[] = $myDistrict->districtId;
                if ($myDistrict->isPrefered) {
                    $isPreferedDistrict = $myDistrict->districtId;
                }
            }
        }

        $currentAmenities = array();
        if ($requestDetail->amenitiesList) {
            foreach ($requestDetail->amenitiesList as $myAmenity) {
                $currentAmenities[] = $myAmenity->id->amenityId;
            }
        }

        $currentDirections = array();
        $isPreferedDirection = -1;
        if ($requestDetail->directionsList) {
            foreach ($requestDetail->directionsList as $direction) {
                $currentDirections[] = $direction->directionId;
                if ($direction->isPrefered) {
                    $isPreferedDirection = $direction->directionId;
                }
            }
        }


        //return response()->json($amenities);
        $viewData['statusList'] = $statusList;
        $viewData['agents'] = $agents;
        $viewData['propertyTypes'] = $propertyTypes;
        $viewData['districts'] = $districts;
        $viewData['sources'] = $sources;
        $viewData['subjects'] = $subjects;
        $viewData['customerId'] = $customerId;
        $viewData['accounts'] = $accounts;
        $viewData['userId'] = \Session::get('user')->userId;
        $viewData['userName'] = \Session::get('user')->name;
        $viewData['request'] = $requestDetail;
        $viewData['isPreferedDistrict'] = $isPreferedDistrict;
        $viewData['currentDistricts'] = $currentDistricts;
        $viewData['isPreferedDirection'] = $isPreferedDirection;
        $viewData['currentDirections'] = $currentDirections;
        $viewData['amenities'] = $amenities;
        $viewData['currentAmenities'] = $currentAmenities;
        $viewData['directions'] = $directions;
        $viewData['notesList'] = $orderDetail->notesList;
        $viewData['orderId'] = $orderDetail->orderId;
        return view("order.detail")->with($viewData);
    }

    public function getListData($status = "") {
        $requestData = \Request::input();
        $start = isset($requestData['start']) ? df_int($requestData['start']) : 0;
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = ($start / $numberItem) + 1;
        $items = NULL;
        if ($status == "") {
            $items = get_json(LIST_ORDER . "/$page/$numberItem");
        } else {
            if ($status == 3) {
                $items = get_json(ORDER_LIST_RESPONDED_LISTING . "/$status/$page/$numberItem");
            } else if ($status == 4) {
                $items = get_json(ORDER_LIST_RESPONDED_CONTACT . "/$page/$numberItem");
            }
        }
        //return response()->json($items);
        $items = $items->data;
        //return response()->json($items);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $data = array();
        foreach ($items->list as $key => $item) {
            $data[$key] = $item;
            $link = "<a href='/order/get-status-detail/" . $item->orderId . "/%d' >%s</a>";
            //return response()->json($data[$key]);
            $status = $this->getStatusData($item->status, 1);
            $data[$key]->{'statusReceived'} = $status->countAll . " ( " . $status->countCurentDate . " New )";

            $status = $this->getStatusData($item->status, 2);
            $data[$key]->{'statusOpened'} = sprintf($link, $status->statusId, $status->countAll . " ( " . $status->countCurentDate . " New )");

            $status = $this->getStatusData($item->status, 3);
            $data[$key]->{'statusResponseWithListing'} = sprintf($link, $status->statusId, $status->countAll . " ( " . $status->countCurentDate . " New )");

            /*
              $status = $this->getStatusData($item->status, 4);
              $data[$key]->{'statusResponseWithContact'} = sprintf($link, $status->statusId, $status->countAll . " ( " . $status->countCurentDate . " New )");
             * 
             */

            $status = $this->getStatusData($item->status, -1);
            $data[$key]->{'statusResponseWithContact'} = sprintf($link, 5, $status->countAll . " ( " . $status->countCurentDate . " New )");
            //unset($data[$key]->status);
        }
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $items->totalItems,
            'recordsFiltered' => $items->totalItems,
            'data' => $data
        );
        return response()->json($viewData);
    }

    public function getStatusData($status, $statusId) {
        foreach ($status as $k => $v) {
            if ($v->statusId == $statusId) {
                return $v;
            }
        }
        return NULL;
    }

    public function getStatusDetail($orderId, $statusId) {
        $postData = array(
            "orderId" => $orderId,
            //"dealId" => $dealId != -1 ? $dealId : NULL,
            //"leadId" => $leadId,
            "statusId" => $statusId
        );
        if (\Request::ajax()) {
            return $this->getStatusDetailAjax($postData, $orderId, $statusId);
        } else {
            if ($statusId == 5) {
                $response = get_json("order/reponded/contacts/$orderId");
                if ($response->data) {
                    $postData['note'] = $response->data->note;
                }
                //return response()->json($response);
            }
            return view("order.get-status-detail-" . $statusId)->with($postData);
        }
    }

    private function getStatusDetailAjax($postData, $orderId, $statusId) {
        $requestData = \Request::input();
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $start = isset($requestData['start']) ? df_int($requestData['start']) : 0;
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = ($start / $numberItem) + 1;
        //return response()->json($items);
        $viewData = array();
        $items = NULL;
        if ($statusId == 5) { // cột cuối
            $response = get_json("order/reponded/contacts/$orderId");
            $items = new \stdClass();
            $items->list = $response->data->userList;
            $items->totalItems = count($items->list);
            //return response()->json($response);
        } else {
            $items = post_json(LIST_ORDER . "/$page/$numberItem", $postData)->data;
        }
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $items->totalItems,
            'recordsFiltered' => $items->totalItems,
            'data' => $items->list
        );
        return response()->json($viewData);
    }

    public function broadcast() {
        $postData = \Request::json()->all();
        $postData['leadId'] = df_int($postData['leadId']);
        if (isset($postData['dealId'])) {
            $postData['dealId'] = df_int($postData['dealId']);
        }
        //return response()->json($postData);
        $response = post_json(BROADCAST, $postData);
        return response()->json($response);
    }

    public function contact($orderId, $contactId) {
        $response = get_json(ORDER_RESPONDED_CONTACT . '/' . $contactId);
        $viewData = array(
            "orderId" => $orderId,
            "data" => $response
        );
        return view("order.contact")->with($viewData);
    }

    public function call() {
        $postData = \Request::json()->all();
        $response = post_json(ORDER_CALL, $postData);
        return response()->json($response);
    }

    public function listing($orderId, $listingId) {
        $response = get_json(ORDER_LISTING_DETAIL . "/$orderId/$listingId");
        //return response()->json($response);
        $viewData = array();
        $viewData['item'] = $response->data->rlisting[0];
        $viewData['customer'] = $response->data->customer;
        $viewData['orderId'] = $orderId;
        //return response()->json($response->data->rlisting[0]);
        return view("order.listing")->with($viewData);
    }

    public function getEmailContent($orderId, $listingId) {
        $response = get_json(ORDER_LISTING_DETAIL . "/$orderId/$listingId");
        $viewData['currentUser'] = \Session::get('user');
        $viewData['customer'] = $response->data->customer;
        $viewData['items'] = $response->data->rlisting;
        //return response()->json($viewData);
        return view("order.email-content")->with($viewData);
    }

    public function sendMailToCustomer($id) {
        $postData = \Request::input();
        $postData['emailsTo'] = explode(',', $postData['emailsTo']);
        if (!empty($postData['emailsCc'])) {
            $postData['emailsCc'] = explode(',', $postData['emailsCc']);
        } else {
            $postData['emailsCc'] = NULL;
        }
        $postData['historyType'] = 25;

        $response = post_json(ORDER_EMAIL_LS_CREATE_LISTING . "/$id", $postData);
        return response()->json($response);
    }

    public function updateReadStatus($id, $status) {
        $response = null;
        $postUrl = "";
        switch ($status) {
            case 3:
                $postUrl = "order/responded/listing/update/activity";
                break;
            case 4:
                $postUrl = "order/responded/contact/update/activity";
                break;
        }
        $response = get_json($postUrl . '/' . $id);
        return response()->json($response);
    }

    public function createNote() {
        $postData = \Request::json()->all();
        $response = post_json(DEAL_BRIEFT_FORM, $postData);
        return response()->json($response);
    }

    public function notifyLsContact($id) {
        $response = get_json(ORDER_EMAIL_LS_CONTACT . "/$id");
        return response()->json($response);
    }

    public function notifyListingMismatch() {
        $postData = \Request::json()->all();
        $postData['orderId'] = df_int($postData['orderId']);
        $response = post_json(ORDER_EMAIL_LS_CONTACT_LISTING_MISMATCH, $postData);
        return response()->json($response);
    }

    public function addNote() {
        $postData = \Request::json()->all();
        $response = post_json(ORDER_NOTE, $postData);
        return response()->json($response);
    }

    /**
     * 
     * @param Int $id orderId
     * @return json note list
     */
    public function listNotes($id) {
        $response = get_json(ORDER_NOTE . "/$id");
        return response()->json($response);
    }

}
