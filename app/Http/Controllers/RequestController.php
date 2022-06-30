<?php

namespace App\Http\Controllers;

use App\Libraries\PropzyCommons;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Repositories\API\RepositoriesFactory;
use App\Repositories\API\CommonsRepository;

class RequestController extends BaseController
{

    public function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
        $this->leadRepository = RepositoriesFactory::getInstance()->getleadRepo();
    }

    public function index()
    {
    }

    public function listRequest()
    {
        $viewData['isGroupAdmin'] = $this->isCurrentAdmin();
        return view("request.list")->with($viewData);
    }

    public function detail($id)
    {
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $res = get_json('request/detail-new/' . $id);
        $res->data->requestId = $id;
        $viewData['leadDealDetail'] = $res->data;
        $viewData['customer'] = $res->data->customers;

        $viewData['sources'] = $sources;
        $viewData['subjects'] = $subjects;
        $customerEmails = "";
        $emailIndex = 1;
        foreach ($res->data->customers->emailList as $email) {
            $customerEmails .= $email->email;
            if ($emailIndex <= count($res->data->customers->emailList) - 1) {
                $customerEmails .= ",";
            }
            $emailIndex++;
        }
        $viewData['customerEmails'] = $customerEmails;

        $customerPhones = "";
        $phoneIndex = 1;
        foreach ($res->data->customers->phoneList as $phone) {
            $customerPhones .= $phone->phone;
            if ($phoneIndex <= count($res->data->customers->phoneList) - 1) {
                $customerPhones .= ",";
            }
            $phoneIndex++;
        }
        $viewData['customerPhones'] = $customerPhones;

        if (isset($res->data->wardsList)) {
            $districtWards = [];
            foreach ($res->data->wardsList as $key => $ward) {
                $districtWards[$ward->districtId]['wards'][$key] = $ward;
                $districtWards[$ward->districtId]['districtName'] = $ward->districtName;
                $districtWards[$ward->districtId]['districtId'] = $ward->districtId;
            }
            $res->data->wardsList = $districtWards;
        }
        $viewData['purpose'] = join(', ', PropzyCommons::getPurposeTextFromDetail(json_decode(json_encode($res->data->customerPurpose), true)));

        return view('request.detail')->with($viewData);
    }

    public function listRequestData()
    {
        $requestData = \Request::input();
        $sortColumnIndex = $requestData['order'][0]['column'];
        $sortType = $requestData['order'][0]['dir'];
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $searchKeyWords = $requestData['search']['value'];
        $postData = array(
            'sortColumn' => $sortColumn == 'formatPrice' ? 'finalBudget' : $sortColumn,
            'sortType' => $sortType,
            'searchKeywords' => !empty($searchKeyWords) ? $searchKeyWords : null
        );
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = post_json(LIST_REQUEST . "/$page/10", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }

    public function listings()
    {
        $viewData['isGroupAdmin'] = $this->isCurrentAdmin();
        return view("request.listings")->with($viewData);
    }

    public function listingsData()
    {
        $requestData = \Request::input();
        $sortColumnIndex = $requestData['order'][0]['column'];
        $sortType = $requestData['order'][0]['dir'];
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $searchKeyWords = $requestData['search']['value'];
        $postData = array(
            'sortColumn' => $sortColumn == 'formatPrice' ? 'finalBudget' : $sortColumn,
            'sortType' => $sortType,
            'searchKeywords' => !empty($searchKeyWords) ? $searchKeyWords : '',
            'dataFilter' => [
                'statusNameList' => !empty($requestData['statusNameList']) ? $requestData['statusNameList'] : NULL
            ],
            'fromDate' => !empty($requestData['fromDate']) ? ($requestData['fromDate']) : 0,
            'toDate' => !empty($requestData['toDate']) ? ($requestData['toDate']) : NULL,
        );
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = post_json("listing/list/cs-crawler/$page/10", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'statusNames' => $response->data->dataFilter->statusNameList,
            'postData' => $postData
        );
        return response()->json($viewData);
    }

    public function exportRequestListings()
    {
        $requestData = \Request::json()->all();
        $response = post_json_export("export/listing/list/cs-crawler", $requestData);
        $response->postData = $requestData;
        return response()->json($response);
    }

    public function create()
    {
        $chanels = get_json('channel-type/4')->data;
        $statusList = get_json(GET_REQUEST_STATUS_LIST)->data;
        $agents = get_json(GET_AGENT_LIST . '/-1')->data;
        // $propertyTypes = get_json(GET_PROPERTY_TYPE_LIST);
        $districts = get_json(GET_DISTRICTS . '/1')->data;
        $wards = get_json(GET_WARD_LIST . '/1')->data;
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $customerId = get_json(sprintf(GENERATE_CUSTOMER_ID, $subjects[0]->subjectId))->data->customerId;
        $accounts = get_json(RESPONSIBLE_LIST)->data;
        $directions = get_json(GET_DIRECTIONS)->data;
        $banks = get_json("/bank/list-new/-1");
        $servicePackages = get_json("channel-sub-type/4000") -> data;

        $viewData['statusList'] = $statusList;
        $viewData['agents'] = $agents;
        // $viewData['propertyTypes'] = $propertyTypes;
        $viewData['districts'] = $districts;
        $viewData['wards'] = $wards;
        $viewData['sources'] = $sources;
        $viewData['chanels'] = $chanels;
        $viewData['subjects'] = $subjects;
        $viewData['customerId'] = $customerId;
        $viewData['accounts'] = $accounts;
        $viewData['directions'] = $directions;
        $viewData['userId'] = \Session::get('user')->userId;
        $viewData['userName'] = \Session::get('user')->name;
        $viewData['positions'] = CommonsRepository::getPositions();
        $viewData['alleys'] = CommonsRepository::getAlleys();
        $viewData['alleyTypes'] = CommonsRepository::getAlleyTypes();
        $viewData['roadFrontageDistances'] = CommonsRepository::getRoadFrontageDistances();
        $viewData['banks'] = $banks;
        $viewData['servicePackages'] = $servicePackages;
        return view('request.create')->with($viewData);
    }

    public function getPurposes()
    {
        $data = \Request::input();
        if (intval($data['listingTypeId']) < 1 && intval($data['listingTypeId']) > 2) {
            return response()->json([]);
        }
        $data = get_json('request/purpose/list/' . $data['listingTypeId']);
        return response()->json($data);
    }

    public function insert(Request $request)
    {
        $postData = $request->input();
        $isPrefered = isset($postData['isPrefered']) ? $postData['isPrefered'] : -1;
        $amenitiesList = NULL;
        if (isset($postData['amenityId'])) {
            $amenitiesList = array();
            foreach ($postData['amenityId'] as $amenity) {
                $item['id'] = array(
                    "amenityId" => $amenity
                );
                $amenitiesList[] = $item;
            }
        }

        $districtsList = NULL;
        if (isset($postData['districtId'])) {
            $districtsList = array();
            foreach ($postData['districtId'] as $districtId) {
                $item = array(
                    'districtId' => $districtId,
                    'isPrefered' => ($districtId == $isPrefered)
                );
                $districtsList[] = $item;
            }
        }

        $isPreferedDirection = isset($postData['isPreferedDirection']) ? $postData['isPreferedDirection'] : -1;
        $directionsList = NULL;
        if (isset($postData['directions'])) {
            $directionsList = array();
            foreach ($postData['directions'] as $directionId) {
                $item = array(
                    'directionId' => $directionId,
                    'isPrefered' => ($directionId == $isPreferedDirection)
                );
                $directionsList[] = $item;
            }
        }
        $customers = array(
            'customerId' => $postData['customerId'],
            'name' => $postData['customerName'] ? trim($postData['customerName']) : NULL,
            'email' => $postData['customerEmail'] ? trim($postData['customerEmail']) : NULL,
            'phone' => $postData['customerPhone'] ? trim($postData['customerPhone']) : NULL,
            'isDeleted' => FALSE
        );
        if (isset($postData['moveInDate']) && trim($postData['moveInDate']) != '') {
            $postData['moveInDate'] = Carbon::createFromFormat('m/d/Y', $postData['moveInDate'])->timestamp * 1000;
        } else {
            $postData['moveInDate'] = NULL;
        }
        if (isset($postData['customerIdCardIssueDate']) && trim($postData['customerIdCardIssueDate']) != '') {
            $postData['customerIdCardIssueDate'] = Carbon::createFromFormat('m/d/Y', $postData['customerIdCardIssueDate'])->timestamp * 1000;
        } else {
            $postData['customerIdCardIssueDate'] = NULL;
        }
        if (isset($postData['customerPartnerIdCardIssueDate']) && trim($postData['customerPartnerIdCardIssueDate']) != '') {
            $postData['customerPartnerIdCardIssueDate'] = Carbon::createFromFormat('m/d/Y', $postData['customerPartnerIdCardIssueDate'])->timestamp * 1000;
        } else {
            $postData['customerPartnerIdCardIssueDate'] = NULL;
        }
        if (trim($postData['sourceOther']) == '') {
            $postData['sourceOther'] = NULL;
        }
        if (trim($postData['minSize']) == '') {
            $postData['minSize'] = NULL;
        }
        if (trim($postData['maxSize']) == '') {
            $postData['maxSize'] = NULL;
        }
        if (trim($postData['agentId']) == '') {
            $postData['agentId'] = NULL;
            $postData['agentName'] = NULL;
        }
        $postData['initialBudget'] = trim(str_replace(',', '', $postData['initialBudget']));
        if ($postData['initialBudget'] == '') {
            $postData['initialBudget'] = NULL;
        }
        $postData['finalBudget'] = trim(str_replace(',', '', $postData['finalBudget']));
        if ($postData['finalBudget'] == '') {
            $postData['finalBudget'] = NULL;
        }
        $postData['initialBudgetFixed'] = trim(str_replace(',', '', $postData['initialBudgetFixed']));
        if ($postData['initialBudgetFixed'] == '') {
            $postData['initialBudgetFixed'] = NULL;
        }
        if (trim($postData['responsiveness']) == '') {
            $postData['responsiveness'] = NULL;
        }
        if (trim($postData['bedRooms']) == '') {
            $postData['bedRooms'] = NULL;
        }
        if (trim($postData['bathRooms']) == '') {
            $postData['bathRooms'] = NULL;
        }
        if (trim($postData['note']) == '') {
            $postData['note'] = NULL;
        }
        if (trim($postData['missingInfo']) == '') {
            $postData['missingInfo'] = NULL;
        }
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['directions']);
        unset($postData['isPreferedDirection']);
        unset($postData['_token']);

        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        $postData['directionsList'] = $directionsList;
        $postData['customers'] = $customers;

        $reponse = post_json(INSERT_REQUEST, $postData);
        return response()->json($reponse);
    }

    public function update(Request $request, $id)
    {
        $requestDetail = get_json(GET_REQUEST_DETAIL_V2 . '/' . $id)->data;
        $statusList = get_json(GET_REQUEST_STATUS_LIST)->data;
        $agents = get_json(GET_AGENT_LIST . '/-1')->data;
        $propertyTypes = get_json(GET_PROPERTY_TYPE_LIST . '/' . $requestDetail->listingTypeId);
        $districts = get_json(GET_DISTRICTS . '/1');
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $customerId = get_json(sprintf(GENERATE_CUSTOMER_ID, $subjects[0]->subjectId))->data->customerId;
        $accounts = get_json(RESPONSIBLE_LIST)->data;
        $directions = get_json(GET_DIRECTIONS)->data;
        $amenities = array();
        if ($requestDetail->propertyTypeId) {
            $amenities = get_json(GET_AMENITIES_CHECK . "/" . $requestDetail->listingTypeId . "/" . $requestDetail->propertyTypeId . "/2");
        }
        $currentDistricts = array();
        $isPreferedDistrict = -1;
        foreach ($requestDetail->districtsList as $myDistrict) {
            $currentDistricts[] = $myDistrict->districtId;
            if ($myDistrict->isPrefered) {
                $isPreferedDistrict = $myDistrict->districtId;
            }
        }

        $currentAmenities = array();
        foreach ($requestDetail->amenitiesList as $myAmenity) {
            $currentAmenities[] = $myAmenity->id->amenityId;
        }

        $currentDirections = array();
        $isPreferedDirection = -1;
        foreach ($requestDetail->directionsList as $direction) {
            $currentDirections[] = $direction->directionId;
            if ($direction->isPrefered) {
                $isPreferedDirection = $direction->directionId;
            }
        }


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
        return view('request.update')->with($viewData);
    }

    public function doUpdate(Request $request)
    {
        $postData = $request->input();
        $isPrefered = isset($postData['isPrefered']) ? $postData['isPrefered'] : -1;
        $amenitiesList = NULL;
        if (isset($postData['amenityId'])) {
            $amenitiesList = array();
            foreach ($postData['amenityId'] as $amenity) {
                $item['id'] = array(
                    "amenityId" => $amenity
                );
                $amenitiesList[] = $item;
            }
        }

        $districtsList = NULL;
        if (isset($postData['districtId'])) {
            $districtsList = array();
            foreach ($postData['districtId'] as $districtId) {
                $item = array(
                    'districtId' => $districtId,
                    'isPrefered' => ($districtId == $isPrefered)
                );
                $districtsList[] = $item;
            }
        }



        $isPreferedDirection = isset($postData['isPreferedDirection']) ? $postData['isPreferedDirection'] : -1;
        $directionsList = NULL;
        if (isset($postData['directions'])) {
            $directionsList = array();
            foreach ($postData['directions'] as $directionId) {
                $item = array(
                    'directionId' => $directionId,
                    'isPrefered' => ($directionId == $isPreferedDirection)
                );
                $directionsList[] = $item;
            }
        }


        unset($postData['directions']);
        unset($postData['isPreferedDirection']);
        $postData['directionsList'] = $directionsList;

        $customers = array(
            'customerId' => $postData['customerId'],
            'name' => $postData['customerName'],
            'email' => $postData['customerEmail'],
            'phone' => $postData['customerPhone'],
            'isDeleted' => FALSE
        );
        if (isset($postData['moveInDate']) && trim($postData['moveInDate']) != '') {
            $postData['moveInDate'] = Carbon::createFromFormat('m/d/Y', $postData['moveInDate'])->timestamp * 1000;
        } else {
            $postData['moveInDate'] = NULL;
        }
        if (isset($postData['customerIdCardIssueDate']) && trim($postData['customerIdCardIssueDate']) != '') {
            $postData['customerIdCardIssueDate'] = Carbon::createFromFormat('m/d/Y', $postData['customerIdCardIssueDate'])->timestamp * 1000;
        } else {
            $postData['customerIdCardIssueDate'] = NULL;
        }
        if (isset($postData['customerPartnerIdCardIssueDate']) && trim($postData['customerPartnerIdCardIssueDate']) != '') {
            $postData['customerPartnerIdCardIssueDate'] = Carbon::createFromFormat('m/d/Y', $postData['customerPartnerIdCardIssueDate'])->timestamp * 1000;
        } else {
            $postData['customerPartnerIdCardIssueDate'] = NULL;
        }
        if (trim($postData['sourceOther']) == '') {
            $postData['sourceOther'] = NULL;
        }
        if (trim($postData['minSize']) == '') {
            $postData['minSize'] = NULL;
        }
        if (trim($postData['maxSize']) == '') {
            $postData['maxSize'] = NULL;
        }
        if (trim($postData['agentId']) == '') {
            $postData['agentId'] = NULL;
            $postData['agentName'] = NULL;
        }
        $postData['initialBudget'] = trim(str_replace(',', '', $postData['initialBudget']));
        if ($postData['initialBudget'] == '') {
            $postData['initialBudget'] = NULL;
        }
        $postData['finalBudget'] = trim(str_replace(',', '', $postData['finalBudget']));
        if ($postData['finalBudget'] == '') {
            $postData['finalBudget'] = NULL;
        }
        $postData['initialBudgetFixed'] = trim(str_replace(',', '', $postData['initialBudgetFixed']));
        if ($postData['initialBudgetFixed'] == '') {
            $postData['initialBudgetFixed'] = NULL;
        }
        if (trim($postData['responsiveness']) == '') {
            $postData['responsiveness'] = NULL;
        }
        if (trim($postData['bedRooms']) == '') {
            $postData['bedRooms'] = NULL;
        }
        if (trim($postData['bathRooms']) == '') {
            $postData['bathRooms'] = NULL;
        }
        if (trim($postData['note']) == '') {
            $postData['note'] = NULL;
        }
        if (trim($postData['missingInfo']) == '') {
            $postData['missingInfo'] = NULL;
        }
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['_token']);
        unset($postData['initialBudgetPriceBox']);

        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        $postData['customers'] = $customers;

        $reponse = post_json(UPDATE_REQUEST, $postData);
        return response()->json($reponse);
    }

    public function createLead(Request $request)
    {
        $postData = $this->leadRepository->preparePostData($request->input(), false);
        $postData = \App\Http\Controllers\RequestController::setNullChanelCondition($postData);
        $postData['wardList'] = $postData['wardsList'];
        unset($postData['wardsList']);

        if (isset($postData['isAgent'])) {
            if ($postData['isAgent'] == '1') {
                $postData['isAgent'] = true;
            } else {
                $postData['isAgent'] = false;
            }
        }
        if (isset($postData['isBuyForCustomer'])) {
            if ($postData['isBuyForCustomer'] == '1') {
                $postData['isBuyForCustomer'] = true;
            } else {
                $postData['isBuyForCustomer'] = false;
            }
        }
        $arr = explode(';', $postData['txtPurposeList']);
        unset($postData['txtPurposeList']);
        $postData['purposeList'] = [];
        foreach ($arr as $item) {
            if (!empty($item)) {
                $postData['purposeList'][] = intval($item);
            }
        }
        $reponse = post_json(CREATE_LEAD, $postData);
        $reponse->postData = $postData;
        return response()->json($reponse);
    }

    public static function setNullChanelCondition($dataPost)
    {
        if (empty($dataPost['tCId']))
            $dataPost['tCId'] = null;
        if (empty($dataPost['channelSubType']))
            $dataPost['channelSubType'] = null;
        if (empty($dataPost['campaignId']))
            $dataPost['campaignId'] = null;
        return $dataPost;
    }

    public function checkPhone(Request $request, $phone)
    {
        $response = get_json(SEARCH_CUSTOMER_BY_PHONE . '/' . $phone);
        $viewData['phone'] = $phone;
        if ($response->result) {
            $viewData['customers'] = $response->data;
            //return response()->json($viewData);
        }
        return view('request.check-phone')->with($viewData);
    }

    public function checkEmail(Request $request, $email)
    {
        $response = get_json(CHECK_AGENT_EMAIL . '/' . $email);
        $viewData['email'] = $email;
        if ($response->result) {
            $viewData['agents'] = $response->data->agentList;
            $viewData['custmers'] = $response->data->custmerList;
            //return response()->json($viewData);
        }
        return view('request.check-email')->with($viewData);
    }

    public function delete($id)
    {
        $response = delete_json("request/$id");
        return response()->json($response);
    }

    public function matchRequest()
    {
        $postData = \Request::input();
        $postData = $this->leadRepository->preparePostData($postData, false);
        $postData['wardList'] = $postData['wardsList'];
        unset($postData['wardsList']);
        $postData = \App\Http\Controllers\RequestController::setNullChanelCondition($postData);

        if (isset($postData['isAgent'])) {
            if ($postData['isAgent'] == '1') {
                $postData['isAgent'] = true;
            } else {
                $postData['isAgent'] = false;
            }
        }
        $arr = explode(';', $postData['txtPurposeList']);
        unset($postData['txtPurposeList']);
        $postData['purposeList'] = [];
        foreach ($arr as $item) {
            if (!empty($item)) {
                $postData['purposeList'][] = intval($item);
            }
        }
        $response = post_json(MATCH_REQUEST, $postData);
        if (!$response->result) {
            $response->postData = $postData;
        }

        $response->postData = $postData;
        return response()->json($response);
    }

    public function matchListings()
    {
        $postData = \Request::json()->all();
        $reponse = post_json(MATCH_LISTING, $postData);
        return response()->json($reponse);
    }

    public function addNewInfosCustomer()
    {
        $postData = \Request::json()->all();
        $response = post_json("customer/convert-agent", $postData);
        return response()->json($response);
    }

    public function customerMainPhone($customerId = "")
    {
        $getListPhone = get_json(GET_LIST_PHONE . '/' . $customerId);
        return response()->json($getListPhone);
    }
}
