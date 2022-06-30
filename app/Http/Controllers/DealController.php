<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use View;
use Carbon\Carbon;
use App\Libraries\PropzyCommons;
use App\Repositories\API\RepositoriesFactory;
use App\Repositories\API\CommonsRepository;

class DealController extends BaseController
{
    private $API = [
        'unlock-reasons' => 'deal/get-unlock-reasons',
        'list-cloned-reasons' => 'deal/reason',
        'unlock-deal-lead' => 'deal/unlock'
    ];

    private $leadRepository = null;
    public function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
        $this->leadRepository = RepositoriesFactory::getInstance()->getleadRepo();
    }
    public function index()
    {
        return $this->getList();
    }
    public function meetingAgentForCommmission()
    {
        $res = post_json('deal/send-noti-agent-receive-commission', \Request::input());
        return redirect()->back()->with('message', $res->message);
    }

    public function getListMatchedTabs()
    {
        $data = get_json_search_listing(GET_LIST_MATCHED_TABS_DEAL)->data->tabConfiguration;

        return response()->json($data);
    }

    public function getListMatchedTabsForKyc()
    {
        $data = get_json_search_listing(GET_LIST_MATCHED_TABS_KYC)->data->tabConfiguration;

        return response()->json($data);
    }

    public function generateFilterDealButton()
    {
        $requestData = \Request::input();
        if (count($requestData) > 0) {
            $dataPost = $this->buildDataPost($requestData, []);
            if (empty($requestData['assignes']) || $requestData['assignes'] == "null") {
                $requestData['assignes'] = null;
            }
            $apiDealButtonsResponse = post_json(GET_DEAL_GROUP_STATUS, (object) $dataPost);
        } else {
            $apiDealButtonsResponse = post_json(GET_DEAL_GROUP_STATUS, (object) ['fromDate' => null, 'toDate' => null]);
        }
        if (in_array($apiDealButtonsResponse->code, [401, 403, 404, 503])) {
            abort($apiDealButtonsResponse->code);
        }
        if (count($requestData) > 0) {
            $viewData['deal_buttons'] = $apiDealButtonsResponse->data;
            $returnHTML = view('shared.group-button-deal')->with($viewData)->render();
            return response()->json($returnHTML);
        } else {
            return $apiDealButtonsResponse->data;
        }
    }
    public function getList()
    {
        $dealButtons = $this->generateFilterDealButton();
        $childOfContinueWatchings = [];
        $totalDealOfContinueWatchings = 0;
        $buttonToRemoveIndexs = [];
        $buttonIndex = -1;
        foreach ($dealButtons as $dealButton) {
            $buttonIndex++;
            if (in_array($dealButton->statusId, [17, 20])) {
                $childOfContinueWatchings[] = $dealButton;
                $totalDealOfContinueWatchings += $dealButton->numberOfDeals;
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
            if (in_array($dealButton->statusId, [13])) {
                $buttonToRemoveIndexs[] = $buttonIndex;
            }
        }
        foreach ($buttonToRemoveIndexs as $index) {
            unset($dealButtons[$index]);
        }
        $viewData['deal_buttons'] = $dealButtons;
        $viewData['isGroupAdmin'] = $this->isCurrentAdmin();
        return view('deal.list')->with($viewData);
    }
    function buildDataPost($requestData, $postData)
    {
        if (!empty($requestData['salePipeLineReport'])) {
            $postData["salePipeLineReport"] =  $requestData['salePipeLineReport'] === 'true' ? true : false;
        }
        if (!empty($requestData['progressQuoIDs'])) {
            $postData["progressQuoIDs"] = [
                df_int($requestData['progressQuoIDs'])
            ];
        }
        if (!empty($requestData['fromDate'])) {
            $postData["fromDate"] = $requestData['fromDate'];
        }
        if (!empty($requestData['toDate'])) {
            $postData["toDate"] = $requestData['toDate'];
        }
        // new update
        if (!empty($requestData['listingTypeId'])) {
            $postData["listingTypeId"] = $requestData['listingTypeId'];
        }
        if (!empty($requestData['propertyTypeId'])) {
            $postData["propertyTypeId"] = $requestData['propertyTypeId'];
        }
        if (!empty($requestData['scoreCardType'])) {
            $postData["scoreCardType"] = $requestData['scoreCardType'];
        }
        if (!empty($requestData['zoneField'])) {
            $postData["zoneIds"] =  [$requestData['zoneField']];
        }
        if (!empty($requestData['teamField'])) {
            $postData["teamIds"] =  [$requestData['teamField']];
        }
        if (!empty($requestData['departmentField'])) {
            $postData["departmentIds"] =  [$requestData['departmentField']];
        }
        if (!empty($requestData['districtId'])) {
            $postData["districtIds"] =  [$requestData['districtId']];
        }
        if (!empty($requestData['wardId'])) {
            $postData["wardIds"] =  [$requestData['wardId']];
        }
        if (!empty($requestData['memberField'])) {
            $postData["assignes"] =  $requestData['memberField'];
        }
        if (!empty($requestData['dealId'])) {
            $postData["dealId"] =  $requestData['dealId'];
        }
        return $postData;
    }
    public function getListDeal($statusId)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        if ($sortColumn == 'preferDistrict') {
            $sortColumn = 'preferDistrictId';
        }
        $postData = array(
            'sortColumn' => $sortColumn,
            'sortType' => $sortType,
            "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        );
        $postData = $this->buildDataPost($requestData, $postData);
        $limit = $requestData['length'];
        $resp = post_json(GET_DEAL_LIST_INDIVIDUAL . "/" . $statusId . "/" . $page . "/" . $limit, $postData);
        if (isset($resp->data)) {
            $data = $resp->data;
        } else {
            return response()->json([
                "resp" => $resp,
                "dataPost" => $postData,
                "api" => GET_DEAL_LIST_INDIVIDUAL . "/" . $statusId . "/" . $page . "/" . $limit
            ]);
        }
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = [
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => [],
        ];
        if ($data) {
            $viewData = array(
                'draw' => $draw,
                'recordsTotal' => $data->totalItems,
                'recordsFiltered' => $data->totalItems,
                'data' => $data->list,
            );
        }
        $viewData['dataPost'] = $postData;
        return response()->json($viewData);
    }
    public function create()
    {
        return view('deal.create');
    }
    public function update(Request $request, $id)
    {
        $apiResponse = get_json(GET_DEAL_DETAIL . '-new/' . $id);
        if (in_array($apiResponse->code, [401, 403, 404, 503])) {
            abort($apiResponse->code);
        }
        $deal = $apiResponse->data;
        $deal->positionListRender = [];
        $positionList = $deal->positionList;
        if (count($positionList) > 0) {
            foreach ($positionList as $k => $v) {
                if ($v->positionId == 1) {
                    $deal->positionListRender['matTien'] = $v;
                } else {
                    $deal->positionListRender['hem'] = $v;
                }
            }
        }
        $viewData['wardsHtml'] = LeadController::renderWards($deal->wardList, $deal->districtsList);
        get_json(DEAL_UPDATE_ACTIVATED . '/' . $id);
        $requestDetail = $deal;
        $statusList = get_json(GET_DEAL_STATUS_LIST)->data;
        $listingStatusList = get_json(DEAL_LISTING_STATUS_LIST)->data;
        //return response()->json($listingStatusList);
        $agents = get_json(GET_AGENT_LIST . '/-1')->data;
        $listingAgents = get_json(GET_AGENT_LIST . '/1')->data;
        $sales = get_json(GET_AGENT_SALE_LIST . '/1')->data;
        $amList = get_json(GET_ACCOUNT_LIST . '/8')->data;
        // $propertyTypes = get_json(GET_PROPERTY_TYPE_LIST . '/' . $requestDetail->listingTypeId);
        // $propertyTypes = get_json(GET_PROPERTY_TYPE_LIST_V2 . '/' . $requestDetail->listingTypeId);
        $districts = get_json(GET_DISTRICTS . '/1')->data;
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $customerId = get_json(sprintf(GENERATE_CUSTOMER_ID, $subjects[0]->subjectId))->data->customerId;
        $accounts = post_json(USER_RESPONSIBLES, [
            "dealId" => $id
        ])->data;
        $amenities = array();
        if (!empty($requestDetail->listingTypeId)) {
            $amenities = CommonsRepository::getAmenitiesByListingType($requestDetail->listingTypeId)->data[0]->list;
            //$amenities = get_json(GET_AMENITIES_CHECK . "/" . 2 . "/" . 4 . "/2");
        }
        $currentDistricts = array();
        $isPreferedDistrict = -1;
        foreach ($requestDetail->districtList as $myDistrict) {
            $currentDistricts[] = $myDistrict->districtId;
            if ($myDistrict->isPrefered) {
                $isPreferedDistrict = $myDistrict->districtId;
            }
        }
        $isPreferedWard = -1;
        foreach ($deal->wardList as $myWard) {
            if ($myWard->isPrefered) {
                $isPreferedWard = $myWard->wardId;
            }
        }
        $currentDirections = array();
        $isPreferedDirection = -1;
        foreach ($deal->directionList as $direction) {
            $currentDirections[] = $direction->directionId;
            if ($direction->isPrefered) {
                $isPreferedDirection = $direction->directionId;
            }
        }
        $viewData['isPreferedDirection'] = $isPreferedDirection;
        $viewData['currentDirections'] = $currentDirections;
        $viewData['listingStatusList'] = $listingStatusList;
        $currentAmenities = array();
        foreach ($requestDetail->amenitiesList as $myAmenity) {
            $currentAmenities[] = $myAmenity->id;
        }
        //return response()->json($lead);
        // $deal->customerEvaluate = [
        //     //'expectedClosingDate' => time(),
        //     //'isHot' => true,
        //     //'optionCode' => 'IN_60_DAYS',
        //     //'comments' => ['test1', 'test2']
        // ];
        $viewData['deal'] = $deal;
        $viewData['statusList'] = $statusList;
        $viewData['agents'] = $agents;
        $viewData['listingAgents'] = $listingAgents;
        $viewData['sales'] = $sales;
        $viewData['amList'] = $amList;
        // $viewData['propertyTypes'] = $propertyTypes;
        $viewData['districts'] = $districts;
        $viewData['sources'] = $sources;
        $chanels = get_json('channel-type/4')->data;
        $viewData['chanels'] = $chanels;
        $viewData['subjects'] = $subjects;
        $viewData['customerId'] = $customerId;
        $viewData['accounts'] = $accounts;
        $viewData['userId'] = \Session::get('user')->userId;
        $viewData['userName'] = \Session::get('user')->name;
        $viewData['request'] = $requestDetail;
        $viewData['isPreferedDistrict'] = $isPreferedDistrict;
        $viewData['isPreferedWard'] = $isPreferedWard;
        $viewData['currentDistricts'] = $currentDistricts;
        $viewData['amenities'] = $amenities;
        $viewData['currentAmenities'] = $currentAmenities;
        $viewData['dealTypes'] = get_json("deal/types")->data;
        $viewData['directions'] = get_json(GET_DIRECTIONS)->data;
        $viewData['currentActivePage'] = "detail";
        $viewData['positions'] = CommonsRepository::getPositions();
        $viewData['alleys'] = CommonsRepository::getAlleys();
        $viewData['alleyTypes'] = CommonsRepository::getAlleyTypes();
        $viewData['roadFrontageDistances'] = CommonsRepository::getRoadFrontageDistances();
        $viewData['purposeList'] = join(';', PropzyCommons::getPurposeIdFromDetail(json_decode(json_encode($requestDetail->customerPurpose), true)));
        return view('deal.update')->with($viewData);
    }
    public function listingEmail($leadId)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "dealId" => $leadId,
            "typeListing" => $requestData['typeListing'],
            "sort" => ['sort' => array(
                "columnName" => $sortColumn == "formatPrice" ? "price" : $sortColumn,
                "value" => $sortType
            )]
        );
        if (isset($requestData['filterValuations']) && $requestData['filterValuations'] != 'null') {
            $postData['filter'][] = array(
                'columnName' => 'valuations',
                'value' => $requestData['filterValuations']
            );
        }
        if (isset($requestData['filterSourceBys']) && $requestData['filterSourceBys'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'classify',
                'value' => $requestData['filterSourceBys']
            );
        }
        if (isset($requestData['filterLegals']) && $requestData['filterLegals'] != 'null') {
            $postData['filter'][] = array(
                'columnName' => 'legals ',
                'value' => $requestData['filterLegals']
            );
        }
        // return response()->json($postData);
        $data = post_json("/listing/deal-lead/" . $page . "/10", $postData)->data;
        // return response()->json($data);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        // render NA when null
        $dataList = $data->list;
        foreach ($dataList as $key => $value) {
            $array = (array) $value;
            $keys = array_keys($array);
            if ($array['isMarked'] == true) {
                $array['virtualStatus'] .= ' <i style="color:red" class="fa fa-exclamation" aria-hidden="true"></i>';
            }
            foreach ($keys as $k) {
                if ($array[$k] === null) {
                    $array[$k] = "NA";
                }
            }
            $dataList[$key] = (object) $array;
        }
        // \ render NA when null
        $viewData = array(
            'filterSorts' => $data->filterSorts,
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $dataList,
            'postData' => $postData,
            'isNeedChangeZoom' => isset($data->isNeedChangeZoom) ? $data->isNeedChangeZoom : false
        );
        return response()->json($viewData);
    }
    // requestsByIdCustomer dev by Jack small
    public function requestsByIdCustomer($idCustomer)
    {
        $postData = array(
            'customerId' => $idCustomer,
            'typeName' => 'deal'
        );
        $url = 'customer/get-all-need';
        $response = post_json($url, (object) $postData)->data;
        return $response;
    }
    // \ requestsByIdCustomer dev by Jack small
    public function getStatusOfListings()
    {
        $postData = \Request::json()->all();
        return response()->json(post_json('schedule/validate-listings-pre-book-tour', $postData));
    } // get status of listing before book tour
    // public function leadDealById($type, $id)
    // {
    //     $url = "";
    //     switch ($type) {
    //         case 'lead':
    //             // call api with type is lead
    //             $url = 'lead/detail-new/' . $id;
    //             break;
    //         default:
    //             $url = 'lead/detail-new/' . $id;
    //             break;
    //     }
    //     return $url != "" ? get_json($url) : [];
    // }

    public function fncCustomSearchHistory($districtsID, $arrHisWards = [], $active_wards = [])
    {
        $resp_json = get_json(GET_WARD_LIST . "/" . $districtsID);
        $resp_json = $resp_json->data;
        $display = "";
        foreach ($resp_json as $wards) {
            foreach ($active_wards as $v_active_wards) {
                if ($v_active_wards->type == "wardType" && $v_active_wards->id == $wards->wardId) {
                    $element_first = '<label><input class="ward" type="checkbox" ';
                    $element_checked = "";
                    if ($arrHisWards != NULL) {
                        foreach ($arrHisWards as $v_wards) {
                            if ($v_wards == $wards->wardId) {
                                $element_checked = "checked";
                            }
                        }
                    }
                    $element_last = ' name="wardAdvange[]" value="' . $wards->wardId . '">' . $wards->wardName . '</label>';
                    $display .= $element_first . $element_checked . $element_last;
                }
            }
        }
        return $display;
    }
    public function generateDataPostForCustomsearchSearch($id, $type = "listing", $data = [])
    {
        if ($type != "form") {
            $lead = get_json(GET_DEAL_DETAIL . '-new/' . $id)->data;
        } else {
            $lead = $data;
        }
        // return $lead;
        // $requestsByIdCustomer = $this->requestsByIdCustomer($lead->customers->customerId);
        $leadDealDetail = $lead;
        //         return $leadDealDetail;
        $dataPostForGetListing = ["assignedTo", "listingTypeId", "positionList", "propertyTypeId", "statusId", "statusName", "progressId", "sourceId", "sourceName", "subjectId", "subjectName", "responsiveness", "initialBudget", "finalBudget", "minSize", "maxSize", "bedRooms", "bathRooms", "dealId", "districtsList", "wardsList", "directionsList", "filterParams"];
        $postData = [];
        foreach ($dataPostForGetListing as $key => $value) {
            $postData[$value] = $leadDealDetail->$value;
        }
        $dataPostCustomSearch = [];
        foreach ($dataPostForGetListing as $key => $value) {
            $dataPostCustomSearch[$value] = $leadDealDetail->$value;
        }
        $dataPostCustomSearch['filterParams'] = json_decode($dataPostCustomSearch['filterParams']);
        unset($dataPostCustomSearch['filterParams']->isAdditional);
        $viewData['LISTING_CUSTOM_SEARCH'] = $dataPostCustomSearch;
        //echo json_encode($dataPostCustomSearch); die();
        $response = post_json(LISTING_CUSTOM_SEARCH_VERSION_MATCHING, (object) $dataPostCustomSearch);
        //        return $response;
        if ($response->result) {
            $formdata = $response->data->filterParams;
            $formdatahistory = $response->data->selectedFilterParams;
            // return response()->json($formdatahistory);die;
            // return $formdatahistory;
            $res_alley = ["from" => "", "to" => ""];
            $res_length = ["from" => "", "to" => ""];
            $res_width = ["from" => "", "to" => ""];
            $res_yearbuilt = ["from" => "", "to" => ""];
            if (!empty($formdatahistory->fromTo)) {
                foreach ($formdatahistory->fromTo as $v) {
                    switch ($v->type) {
                        case 'alley':
                            $res_alley['from'] = $v->fromValue;
                            $res_alley['to'] = $v->toValue;
                            break;
                        case 'length':
                            $res_length['from'] = $v->fromValue;
                            $res_length['to'] = $v->toValue;
                            break;
                        case 'yearbuilt':
                            $res_yearbuilt['from'] = $v->fromValue;
                            $res_yearbuilt['to'] = $v->toValue;
                            break;
                        default:
                            $res_width['from'] = $v->fromValue;
                            $res_width['to'] = $v->toValue;
                            break;
                    }
                }
            }
            // return json_encode($formdatahistory);die;
            $wardIds = "";
            $ward_type = '';
            $direction_type = '';
            $district_type = '';
            $CRM_JM_districtType = '<div class="row">
                            <div class="col-md-2">
                                <div><b>Khu vực :</b></div>
                                <a href="#" onclick="JMDetail.showWards();return false;"><small>Bấm để hiển thị <b>PHƯỜNG</b></small></a>
                            </div>
                            <div class="col-md-10">
                                <div class="row">';
            $CRM_JM_directionType = '<div class="row">
                                <div class="col-md-2"><b>Hướng:</b></div>
                                <div class="col-md-10"><div class="row">';
            $CRM_JM_status = '<div class="row">
              <div class="col-md-2"><b>Thêm:</b></div>
              <div class="col-md-10">
                  <div class="row">'; //formdatahistory
            $CRM_JM_STATUS_ARRAY = ["isSentMail" => "Những listing đã giới thiệu", "isLike" => "Những listing đươc yêu thích", "isScheduled" => "Những listing đã đi tour"];
            for ($i = 0; $i < sizeof($formdata); $i++) {
                $form = $formdata[$i];
                if ($form->type == 'wardType') {
                    $ward_type .= '<div class="checkbox col-sm-3"><label class="no-bold"><input value="' . $form->id . '" name="wardAdvange[]" type="checkbox" ' . (isset($wardsCheck[$form->id]) ? $wardsCheck[$form->id] : '') . ' /> ' . $form->name . '</label></div>';
                    $wardIds .= "$form->id,";
                }
                if ($form->type == 'directionType') {
                    $checked = "";
                    if (!empty($formdatahistory->directionsList)) {
                        foreach ($formdatahistory->directionsList as $direc) {
                            if ($direc == $form->id) {
                                $checked = "checked";
                                break;
                            }
                        }
                    }
                    $CRM_JM_directionType .= '
                          <div class="col-md-4">
                              <div class="checkbox">
                                <label class="no-bold"><input class="directionsAdvange" value="' . $form->id . '" name="directionsAdvange[]" ' . $checked . ' type="checkbox" ' . (isset($directionsCheck[$form->id]) ? $directionsCheck[$form->id] : '') . '> ' . $form->name . '</label>
                              </div>
                          </div>';
                    $direction_type .= '<div class="checkbox col-sm-3"><label class="no-bold"><input value="' . $form->id . '" name="directionsAdvange[]" ' . $checked . ' type="checkbox" ' . (isset($directionsCheck[$form->id]) ? $directionsCheck[$form->id] : '') . '> ' . $form->name . '</label></div>';
                }
                $arr_wardsList = [];
                if (!empty($formdatahistory->wardsList)) {
                    $arr_wardsList = $formdatahistory->wardsList;
                }
                $arr_districtsList = [];
                if (!empty($formdatahistory->districtsList)) {
                    $arr_districtsList = $formdatahistory->districtsList;
                }
                if ($form->type == 'districtType') {
                    $check_dis = "";
                    if (in_array($form->id, $arr_districtsList) == TRUE)
                        $check_dis = "checked";
                    $CRM_JM_districtType .= '<div class="col-md-4">
                                            <div class="checkbox">
                                               <label>
                                                <input class="districtsList" value="' . $form->id . '" name="districtIdAdvange[]"' . $check_dis . ' type="checkbox" ' . (isset($districtIdCheck[$form->id]) ? $districtIdCheck[$form->id] : '') . ' /> ' . $form->name . '
                                                </label>
                                            </div>
                                            <div class="crm_jm_wards">
                                                <div class="checkbox">
                                                  ' . $this->fncCustomSearchHistory($form->id, $arr_wardsList, $formdata) . '
                                                </div>
                                            </div>
                                        </div>';
                    $district_type .= '<div class="checkbox col-sm-3 district-wrapper"><label class="no-bold districts-selector"><input value="' . $form->id . '" name="districtIdAdvange[]"' . $check_dis . ' type="checkbox" ' . (isset($districtIdCheck[$form->id]) ? $districtIdCheck[$form->id] : '') . ' /> <b>' . $form->name . '</b></label><div class="wards">' . $this->fncCustomSearchHistory($form->id, $arr_wardsList, $formdata) . '</div></div>';
                }
            }
            foreach ($CRM_JM_STATUS_ARRAY as $key => $value) {
                $check = isset($formdatahistory->$key) && $formdatahistory->$key ? 'checked' : '';
                $CRM_JM_status .= '<div class="col-md-4">
                        <div class="checkbox">
                          <label>
                            <input class="status" ' . $check . ' statusName="' . $key . '" type="checkbox"> ' . $value . '
                          </label>
                        </div>
                    </div>';
            }
            $CRM_JM_status .= '</div></div></div>';
            $CRM_JM_districtType .= '</div></div></div>';
            $CRM_JM_directionType .= '</div></div></div>';
            $alley_from_to = '<input name="alleyFromTo" class="form-control" placeholder="từ ..." value="' . $res_alley['from'] . '" type="text">';
            $alley_to_value = '<input name="alleyToValue" class="form-control" placeholder="đến ..." value="' . $res_alley['to'] . '" type="text">';
            $length_from_to = '<input name="lengthFromTo" class="form-control" placeholder="từ ..." value="' . $res_length['from'] . '" type="text">';
            $length_to_value = '<input name="lengthToValue" class="form-control" placeholder="đến ..." value="' . $res_length['to'] . '" type="text">';
            $width_from_to = '<input name="widthFromTo" class="form-control" placeholder="từ ..." value="' . $res_width['from'] . '" type="text">';
            $width_to_value = '<input name="widthToValue" class="form-control" placeholder="đến ..." value="' . $res_width['to'] . '" type="text">';
            $year_built_from_to = '<input name="yearBuiltFromTo" class="form-control" placeholder="năm xây dựng ..." value="' . $res_yearbuilt['from'] . '" type="text">';
            $year_built_to_value = '<input name="yearBuiltToValue" class="form-control" placeholder="" value="' . $res_yearbuilt['to'] . '" type="text">';
            if (!empty($formdatahistory->privateListing)) {
                $check_privateListing = $formdatahistory->privateListing;
            } else {
                $check_privateListing = 0;
            }
            $CRM_JM_privateListing = '<div class="row">
                                <div class="col-md-2"><b>Loại:</b></div>
                                <div class="col-md-10">
                                    <div class="row">
                                      <div class="col-md-4">
                                          <div class="checkbox">
                                            <label style="padding-left:0px;">
                                              <input class="privateListing" name="privateListing" value="2" type="radio" ' . ($check_privateListing == '2' ? 'checked="checked"' : '') . '> Chưa xác thực
                                            </label>
                                          </div>
                                      </div>
                                      <div class="col-md-4">
                                          <div class="checkbox">
                                            <label style="padding-left:0px;">
                                              <input class="privateListing" name="privateListing" value="1" type="radio" ' . ($check_privateListing == '1' ? 'checked="checked"' : '') . '> Đã xác thực
                                            </label>
                                          </div>
                                      </div>
                                    </div>
                                </div>
                            </div>';
            // $formdatahistory->positionsList = [1,2];
            // if (!empty($formdatahistory->positionsList)) {
            //     $CRM_JM_privateListing .= '<div class="row">
            //                     <div class="col-md-2"><b>Vị trí</b></div>
            //                     <div class="col-md-10">
            //                         <div class="row">
            //                           <div class="col-md-4">
            //                               <div class="checkbox">
            //                                 <label style="">
            //                                   <input class="positionsList" ' . (in_array(2, $formdatahistory->positionsList) ? 'checked' : '') . ' name="positionsList" value="2" type="checkbox" > Hẻm
            //                                 </label>
            //                               </div>
            //                           </div>
            //                           <div class="col-md-4">
            //                               <div class="checkbox">
            //                                 <label style="">
            //                                   <input class="positionsList" ' . (in_array(1, $formdatahistory->positionsList) ? "checked" : "") . ' name="positionsList" value="1" type="checkbox"> Mặt tiền
            //                                 </label>
            //                               </div>
            //                           </div>
            //                         </div>
            //                     </div>
            //                 </div>';
            // } else {
            //     $CRM_JM_privateListing .= '<div class="row">
            //         <div class="col-md-2"><b>Vị trí</b></div>
            //         <div class="col-md-10">
            //             <div class="row">
            //               <div class="col-md-4">
            //                   <div class="checkbox">
            //                     <label style="">
            //                       <input class="positionsList" name="positionsList" value="2" type="checkbox" > Hẻm
            //                     </label>
            //                   </div>
            //               </div>
            //               <div class="col-md-4">
            //                   <div class="checkbox">
            //                     <label style="">
            //                       <input class="positionsList" name="positionsList" value="1" type="checkbox"> Mặt tiền
            //                     </label>
            //                   </div>
            //               </div>
            //             </div>
            //         </div>
            //     </div>';
            // }
            $private_listing = '<label class="radio-inline"><input name="privateListing" value="1" type="radio" ' . ($check_privateListing == '1' ? 'checked="checked"' : '') . '> Đã xác thực</label><label class="radio-inline"><input name="privateListing" value="2" type="radio" ' . ($check_privateListing == '2' ? 'checked="checked"' : '') . '> Chưa xác thực</label>';
            $location_map = $response->data->filterDrawed ? json_encode($response->data->filterDrawed) : '';
            $location_map = '<textarea id="location_map" name="location_map" class="hidden" style="width: 100%; height:200px">' . $location_map . '</textarea>';
            $form_custom_search = array(
                'location_map' => $location_map,
                'wardType' => $ward_type,
                'wardIds' => $wardIds,
                'directionType' => $CRM_JM_directionType,
                'districtType' => $CRM_JM_districtType,
                'alleyFromTo' => $alley_from_to,
                'alleyToValue' => $alley_to_value,
                'lengthFromTo' => $length_from_to,
                'lengthToValue' => $length_to_value,
                'widthFromTo' => $width_from_to,
                'widthToValue' => $width_to_value,
                'yearBuiltFromTo' => $year_built_from_to,
                'CRM_JM_status' => $CRM_JM_status,
                'privateListing' => $CRM_JM_privateListing,
                'classify' => '<div class="row"> <div class="col-md-2"></div> <div class="col-md-10"> <div class="row"> <div class="col-md-4"> <label class="checkbox-inline"><input type="checkbox" name="classifyList[]" value="3" ' . (!empty($formdatahistory->classifyList) && in_array(3, $formdatahistory->classifyList) ? "checked" : "") . '>Môi giới</label> <div style="padding-left: 10%"> <label class="checkbox-inline"><input name="isOwner" type="checkbox" ' . (!empty($formdatahistory->isOwner) && $formdatahistory->isOwner ? "checked" : "") . ' value="1">Chính chủ</label> </div> </div> <div class="col-md-4"> <label class="checkbox-inline"><input name="classifyList[]" type="checkbox" value="2" ' . (!empty($formdatahistory->classifyList) && in_array(2, $formdatahistory->classifyList) ? "checked" : "") . '>Chủ nhà</label> </div> </div> </div> </div>'
            );
            // return response()->json($form_custom_search);
        }
        unset($formdatahistory->isAdditional);
        $postData['filterParams'] = $formdatahistory;
        $postData['filterDrawed'] = $response->data->filterDrawed;
        $postData['filterParamsHistory'] = $postData['filterParams'];
        //var_dump($postData); die();
        if ($type == 'form') {
            return $form_custom_search;
        } else {
            return $postData;
        }
    }
    public function getPin($id)
    {
        $postData = $this->generateDataPostForCustomsearchSearch($id);
        $requestData = \Request::input();
        if (!empty($requestData['areaZoning'])) {
            $postData['areaZoning'] = $requestData['areaZoning'];
        } else {
            $postData['areaZoning'] = null;
        }
        if (!empty($requestData['districtsList'])) {
            $postData['districtsList'] = $requestData['districtsList'];
        } else {
            $postData['districtsList'] = $postData['districtsList'];
        }
        $data = post_json("listing/search/map", $postData)->data;
        return response()->json($data);
    }
    public function resetFilter($id)
    {
        $requestData = \Request::input();
        $data = get_json("/listing/search/deal/" . $id . "/reset/" . $requestData['type']);
        return response()->json($data);
    }
    public function getPostDataForMarketReport($id)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        //        $searchKeywords = !empty($requestData['search']) ? $requestData['search']['value'] : null;
        //        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        //        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        //        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = $this->generateDataPostForCustomsearchSearch($id);
        $postData['sort'] = [
            "sort" => ["columnName" => "price", "value" => 'desc'],
            "keySearch" => (!empty($searchKeywords) ? $searchKeywords : null)
        ];
        // $postData = array_merge($postData, array(
        //     'sortColumn' => "price",
        //     'sortType' => $sortType,
        //     "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        // ));
        // return response()->json($postData);
        // ************************** JACK SMALL *************************************
        // xỬ LÝ FROMTO FILTERPARAMS
        if (isset($requestData['fromTo'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object) ['fromTo' => json_decode($requestData['fromTo'])];
            } else {
                $postData['filterParams']->fromTo = json_decode($requestData['fromTo']);
            }
        }
        // ************************** JACK SMALL *************************************
        // XỬ LÝ PHƯỜNG QUẬN FILTERARRAMS
        if (isset($requestData['locations'])) {
            $postData['isActionProgress'] = true;
            $locations = json_decode($requestData['locations']);
            foreach ($locations as $key => $value) {
                $dataRes = $value == '' ? null : $value;
                if ($postData['filterParams'] == null) {
                    $postData['filterParams'] = (object) [$key => $dataRes];
                } else {
                    $postData['filterParams']->$key = $dataRes;
                }
            }
        } else {
            $postData['isActionProgress'] = false;
        }
        if (isset($requestData['filterValuations']) && $requestData['filterValuations'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'valuationType',
                'value' => $requestData['filterValuations']
            );
        }
        if (isset($requestData['filterSourceBys']) && $requestData['filterSourceBys'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'sourceBy',
                'value' => $requestData['filterSourceBys']
            );
            // return response()->json($postData);
        }
        if (isset($requestData['filterLegals']) && $requestData['filterLegals'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'legal',
                'value' => $requestData['filterLegals']
            );
        }
        // $postData['fromTo'] = $fromTo;
        return response()->json($postData);
    }
    public function listingPlanning($id)
    { // lấy listing cho quy hoạch - dùng lại datapost của tabfiltersearch
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = isset($requestData['search']) ? $requestData['search']['value'] : null;
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = isset($requestData['columns']) ? $requestData['columns'][$sortColumnIndex]['data'] : null;
        if ($sortColumn == 'formatPrice') {
            $sortColumn = 'price';
        }
        $sort = ["columnName" => $sortColumn, "value" => $sortType];
        if (isset($requestData['order']) && count($requestData['order']) > 1) {
            $sort = ["columnName" => 'liveDate', "value" => $sortType];
        }
        $postData = $this->generateDataPostForCustomsearchSearch($id);
        $postData['filterParams'] = null;
        $postData['sort'] = [
            "sort" => $sort,
            "keySearch" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        ];
        if (isset($requestData['fromTo'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object) ['fromTo' => json_decode($requestData['fromTo'])];
            } else {
                $postData['filterParams']->fromTo = json_decode($requestData['fromTo']);
            }
        }
        if (isset($requestData['classifyList'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object) ['classifyList' => json_decode($requestData['classifyList'])];
            } else {
                $postData['filterParams']->classifyList = json_decode($requestData['classifyList']);
            }
        }
        if (isset($requestData['isOwner'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object) ['isOwner' => $requestData['isOwner']];
            } else {
                $postData['filterParams']->isOwner = $requestData['isOwner'];
            }
        }
        if (isset($requestData['locations'])) {
            $postData['isActionProgress'] = true;
            $locations = json_decode($requestData['locations']);
            foreach ($locations as $key => $value) {
                $dataRes = $value == '' ? null : $value;
                if ($postData['filterParams'] == null) {
                    $postData['filterParams'] = (object) [$key => $dataRes];
                } else {
                    $postData['filterParams']->$key = $dataRes;
                }
            }
        } else {
            $postData['isActionProgress'] = false;
        }
        if (isset($requestData['filterValuations']) && $requestData['filterValuations'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'valuationType',
                'value' => $requestData['filterValuations']
            );
        }
        if (isset($requestData['filterSourceBys']) && $requestData['filterSourceBys'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'sourceBy',
                'value' => $requestData['filterSourceBys']
            );
        }
        if (isset($requestData['filterLegals']) && $requestData['filterLegals'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'legal',
                'value' => $requestData['filterLegals']
            );
        }
        if (!empty($requestData['data_localtion'])) {
            $postData['areaZoning'] = $requestData['data_localtion'];
        } else {
            if (!empty($postData["filterDrawed"]))
                $postData['areaZoning'] = $postData["filterDrawed"];
            else
                $postData['areaZoning'] = null;
        }
        // keySearch
        if (!empty($requestData['keySearch'])) {
            $postData['keySearch'] = $requestData['keySearch'];
        } else {
            $postData['keySearch'] = null;
        }
        $postData["typeListing"] = "like";
        $resp = post_json("/listing/search-by-types", $postData);
        $list = $resp->data->list;
        $data = [];
        foreach ($list as $listing) {
            $data[] = ["value" => $listing->rlistingId, "label" => $listing->rlistingId];
        }
        return response()->json($data);
    }
    public function submitPlanning()
    {
        $postData = \Request::json()->all();
        $resp = post_json("/deal/deal-check-planning-note", $postData);
        return response()->json($resp);
    }
    public function getPlanningDetail($dealId)
    {
        $resp = get_json("/deal/planning/$dealId");
        return response()->json($resp);
    }
    public function getListingForFilterSearch($id)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        // sort
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : null;
        $sortColumn = null;
        $sortType = null;
        if ($sortColumnIndex) {
            $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
            if ($sortColumn == 'formatPrice') {
                $sortColumn = 'priceVnd';
            }
            $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        }
        $sort = ["columnName" => $sortColumn, "value" => $sortType];

        // search
        $searchKeywords = !empty($requestData['searchKeywords']) ? $requestData['searchKeywords'] : null;
        $postData = $this->generateDataPostForCustomsearchSearch($id);
        $postData['activeMatchingTab'] = !empty($requestData['activeMatchingTab']) ? $requestData['activeMatchingTab'] : null;
        $postData['filterParams'] = null;
        $postData['sort'] = [
            "sort" => $sort,
            "keySearch" => $searchKeywords
        ];
        // $postData = array_merge($postData, array(
        //     'sortColumn' => "price",
        //     'sortType' => $sortType,
        //     "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        // ));
        // return response()->json($postData);
        // ************************** JACK SMALL *************************************
        // xỬ LÝ FROMTO FILTERPARAMS
        if (isset($requestData['fromTo'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object) ['fromTo' => json_decode($requestData['fromTo'])];
            } else {
                $postData['filterParams']->fromTo = json_decode($requestData['fromTo']);
            }
        }
        if (isset($requestData['classifyList'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object) ['classifyList' => json_decode($requestData['classifyList'])];
            } else {
                $postData['filterParams']->classifyList = json_decode($requestData['classifyList']);
            }
        }
        if (isset($requestData['isOwner'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object) ['isOwner' => $requestData['isOwner']];
            } else {
                $postData['filterParams']->isOwner = $requestData['isOwner'];
            }
        }
        // ************************** JACK SMALL *************************************
        // XỬ LÝ PHƯỜNG QUẬN FILTERARRAMS
        if (isset($requestData['locations'])) {
            $postData['isActionProgress'] = true;
            $locations = json_decode($requestData['locations']);
            foreach ($locations as $key => $value) {
                $dataRes = $value == '' ? null : $value;
                if ($postData['filterParams'] == null) {
                    $postData['filterParams'] = (object) [$key => $dataRes];
                } else {
                    $postData['filterParams']->$key = $dataRes;
                }
            }
        } else {
            $postData['isActionProgress'] = false;
        }
        if (isset($requestData['filterValuations']) && $requestData['filterValuations'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'valuationType',
                'value' => $requestData['filterValuations']
            );
        }
        if (isset($requestData['filterSourceBys']) && $requestData['filterSourceBys'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'sourceBy',
                'value' => $requestData['filterSourceBys']
            );
        }
        if (isset($requestData['filterLegals']) && $requestData['filterLegals'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'legal',
                'value' => $requestData['filterLegals']
            );
        }
        if (isset($requestData['filterBPOs']) && $requestData['filterBPOs'] != 'null') {
            $postData['sort']['filter'][] = array(
                'columnName' => 'bpoCloseGrade',
                'value' => $requestData['filterBPOs']
            );
        }
        if (!empty($requestData['data_localtion'])) {
            $postData['areaZoning'] = $requestData['data_localtion'];
        } else {
            if (!empty($postData["filterDrawed"])) {
                $postData['areaZoning'] = $postData["filterDrawed"];
            } else {
                $postData['areaZoning'] = null;
            }
        }

        $currentUser = \Session::get('user');
        $postData['currentUserId'] = $currentUser->userId;

        $data = null;
        if (empty($requestData['initSearch'])) {
            $data = post_json_search_listing('listing/filter/' . $page . '/10', $postData);
        } else {
            $data = post_json_search_listing(SEARCH_LISTING_V2 . '/' . $page . '/10', $postData);
        }
        if ($data->result == false) {
            return response()->json(['postdata' => $postData, 'respone' => $data]);
        } else {
            $data = $data->data;
        }
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        // render NA when null
        $dataList = $data->list;
        foreach ($dataList as $key => $value) {
            $array = (array) $value;
            $keys = array_keys($array);
            if ($array['isMarked'] == true) {
                $array['virtualStatus'] .= ' <i style="color:red" class="fa fa-exclamation" aria-hidden="true"></i>';
            }
            foreach ($keys as $k) {
                if ($array[$k] === null) {
                    $array[$k] = "NA";
                }
            }
            $dataList[$key] = (object) $array;
        }

        // \ render NA when null
        $dataFilter = get_json_search_listing(FILTER_LISTING, null);
        $data->filterSorts = $dataFilter->data->filterSorts;
        $viewData = array(
            'filterSorts' => $data->filterSorts,
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $dataList,
            'setting' => $data->setting,
            'post' => $postData,
            'api' => empty($requestData['initSearch']) ? "listing/filter" : "listing/search",
            'tabValue' => array(
                'lessMatchedTab' => $data->lessMatchedTab,
                'matchedTab' => $data->matchedTab,
                'mostMatchedTab' => $data->mostMatchedTab,
            ),
            'isNeedChangeZoom' => isset($data->isNeedChangeZoom) ? $data->isNeedChangeZoom : false
        );
        // if(isset($requestData['filterSourceBys'])){
        // return response()->json($requestData);
        // }
        return response()->json($viewData);
    }
    public function proccessSlideNeedList($id, $needList)
    {
        // start line update for fix bug https://propzy.atlassian.net/browse/TSAM-302
        if (count($needList) == 1 && $needList[0]->id != $id)
            $needList = []; //reset needlist
        // end line TSAM-302
        if ((count($needList) == 1 && $needList[0]->id == $id) || count($needList) == 0) { // trường hợp happy case (chỉ có 1 nhu cầu)
            return '<h2 class="title-with-line"><span>THÔNG TIN NHU CẦU</span></h2>';
        } else {
            $needListFilterId = [];
            foreach ($needList as $key => $value) {
                if ($value->typeName == 'deal') {
                    $needListFilterId[] = $value->id;
                }
            }
            $key = array_search($id, $needListFilterId);
            $offset = array_search($key, array_keys($needListFilterId)) + 1;
            if ($offset == 1 && $offset < count($needListFilterId)) {
                return '<h2 class="title-with-line"><span>THÔNG TIN NHU CẦU&nbsp;<a href="' . $needListFilterId[$offset] . '"><i class="fa fa-chevron-right"></i></a></span></h2>';
            } elseif ($offset > 1 && $offset < count($needListFilterId)) {
                // hiện cả 2 bên
                return '<h2 class="title-with-line"><span><a href="/deal/detail/' . $needListFilterId[$offset - 2] . '"><i class="fa fa-chevron-left"></i></a>&nbsp;THÔNG TIN NHU CẦU&nbsp;<a href=/deal/detail/' . $needListFilterId[$offset] . '><i class="fa fa-chevron-right"></i></a></span></h2>';
            } else {
                // hiện bên trái
                return '<h2 class="title-with-line"><span><a href="/deal/detail/' . $needListFilterId[$offset - 2] . '"><i class="fa fa-chevron-left"></i></a>&nbsp;THÔNG TIN NHU CẦU</span></h2>';
            }
        }
    }
    public function touredTab($id)
    {
        $dataPost = [
            "dealId" => $id,
            "typeListing" => "scheduled"
        ];
        return post_json('listing/deal-lead/1/50', (object) $dataPost)->data;
    }

    public function getBookTourPermissionFn($lead)
    {
        $add_tour_permission = get_json_user_role('permission/has-permission/cs_schedule/add')->result;
        $deal_update_permission = post_json_user_role('permission/has-deal-update-permission', ["recordId" => $lead->dealId])->result;        
        return $add_tour_permission && $deal_update_permission;
    }

    public function getBookTourPermission()
    {
        $dealId = \Request::input("dealId");
        $lead = get_json(GET_DEAL_DETAIL . '-new/' . $dealId)->data;
        return response()->json((object) array('data' => (object) array(
            "addTour" => $this->getBookTourPermissionFn($lead),
            "dealStatus" => $this->getDealStatus($lead),
            "isPendingDeal" => $this->isPendingDeal($lead)
        )));
    }

    public function detail(Request $request, $id)
    {
        $lead = get_json(GET_DEAL_DETAIL . '-new/' . $id);
        if (isset($lead->code) && in_array($lead->code, [401, 403])) {
            abort($lead->code);
        }

        $viewData['deal'] = (object) ['dealId' => $id];
        $viewData['currentActivePage'] = "detail";
        
        get_json(DEAL_UPDATE_ACTIVATED . '/' . $id);
        $lead = $lead->data;
        
        // get list BA / BSA of a group deal
        $viewData['listBaBsa'] = get_json("deal/get-group-deal-assignedTos/$id")->data;
        
        // return response()->json($lead);
        $accounts = post_json(USER_RESPONSIBLES, ["dealId" => $id])->data;
        $viewData["accounts"] = $accounts;
        $requestsByIdCustomer = $this->requestsByIdCustomer($lead->customers->customerId);
        $viewData["cancelReasons"] = get_json('cancel-reason/list')->data;
        
        $viewData['neadListTitle'] = $this->proccessSlideNeedList($lead->dealId, $requestsByIdCustomer->needList);
        // return response()->json($this->proccessSlideNeedList($lead->dealId,$requestsByIdCustomer->needList));
        // $viewData['neadListTitle'] = $this->proccessSlideNeedList($lead->dealId, $requestsByIdCustomer->needList);
        $viewData['customer'] = $requestsByIdCustomer->customer;
        $customerEmails = "";
        $emailIndex = 1;
        foreach ($lead->customers->emailList as $email) {
            $customerEmails .= $email->email;
            if ($emailIndex <= count($lead->customers->emailList) - 1) {
                $customerEmails .= ",";
            }
            $emailIndex++;
        }
        $viewData['customerEmails'] = $customerEmails;
        $customerPhones = "";
        $phoneIndex = 1;
        foreach ($lead->customers->phoneList as $phone) {
            $customerPhones .= $phone->phone;
            if ($phoneIndex <= count($lead->customers->phoneList) - 1) {
                $customerPhones .= ",";
            }
            $phoneIndex++;
        }
        $viewData['customerPhones'] = $customerPhones;

        $viewData['neadList'] = $requestsByIdCustomer->needList;
        $viewData['leadDealDetail'] = $lead;

        $viewData['touredTab'] = $this->touredTab($lead->dealId);

        // return get_transaction_centers();
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $viewData['sources'] = $sources;
        $viewData['subjects'] = $subjects;
        // return response()->json($viewData['touredTab']);
        $viewData['form_custom_search'] = $this->generateDataPostForCustomsearchSearch($lead->dealId, 'form', $lead);
        //         return response()->json($viewData['form_custom_search']);
        $countListing = post_json('listing/deal-lead', (object) ['dealId' => $lead->dealId])->data;
        $sortForCountListing = [];
        foreach ($countListing as $key => $value) {
            $sortForCountListing[$value->typeListing] = $value->count;
        }
        $viewData['countListing'] = $sortForCountListing;
        $currentUser = \Session::get('user');        
        // return response()->json($lead); //userId assignedTo
        $viewData['permissionDoAction'] = $currentUser->userId == $lead->assignedTo ? true : false;
        $viewData['currentUserName'] = $currentUser->name;
        if (isset($lead->wardList)) {
            $districtWards = [];
            foreach ($lead->wardList as $key => $ward) {
                $districtWards[$ward->districtId]['wards'][$key] = $ward;
                $districtWards[$ward->districtId]['districtName'] = $ward->districtName;
                $districtWards[$ward->districtId]['districtId'] = $ward->districtId;
            }
            $lead->wardList = $districtWards;
        }
        $viewData['leadDealDetail']->listUnlockReasons = null;
        if ($viewData['leadDealDetail']->progressQuoId == 3 || $viewData['leadDealDetail']->progressQuoId == 4) {
            $viewData['leadDealDetail']->listUnlockReasons = get_json('/lead-deal-type/1')->data;
        }
        $viewData['list_group_question'] = get_json('deal/deposit/question-groups')->data;
        $viewData['list_result_question'] = get_json('/deal/deposit/get-form-result/' . $id)->data;
        $viewData['reason_deposite'] = get_json('/deal-reasons/get-by-type/5')->data;
        $viewData['depositId'] = !empty($viewData['leadDealDetail']->depositId) ? $viewData['leadDealDetail']->depositId : false;
        $viewData['contract_info'] = get_json("deal/$id/get-contract")->data;
        $viewData['purpose'] = join(', ', PropzyCommons::getPurposeTextFromDetail(json_decode(json_encode($lead->customerPurpose), true)));
        $viewData['add_tour_permission'] = $this->getBookTourPermissionFn($lead);
        $viewData['is_pending_deal'] = $this->isPendingDeal($lead);
        $viewData['deal_status'] = $this->getDealStatus($lead);

        return view('deal.detailv2')->with($viewData);
    }

    public function getDealStatus($lead) {
        if($lead->statusId == 28 && in_array($lead->progressQuoId, [3, 4])) {
            if($lead->progressQuoId == 3) {
                return "Pending - Hủy";
            } else {
                return "Pending - Đang theo dõi";
            }
        } else {
            return $lead->statusName;
        }
    }

    public function isPendingDeal($lead)
    {
        return in_array($lead->statusId, [27, 30]) || ($lead->statusId == 28 && in_array($lead->progressQuoId, [3, 4])); // Check if deal is Đóng Deal, Group Closed, Pending-Hủy, Pending-Đang theo dõi
    }

    public function detailInGroup(Request $request, $id)
    {
        $lead = get_json('deal/detail-in-group/' . $id);
        if (in_array($lead->code, [401, 403])) {
            abort($lead->code);
        }

        $viewData['deal'] = (object) ['dealId' => $id];
        $viewData['currentActivePage'] = "detail";

        get_json(DEAL_UPDATE_ACTIVATED . '/' . $id);
        $lead = $lead->data;

        $accounts = post_json(USER_RESPONSIBLES, [
            "dealId" => $id
        ])->data;
        $viewData["accounts"] = $accounts;
        $requestsByIdCustomer = $this->requestsByIdCustomer($lead->customers->customerId);
        $viewData["cancelReasons"] = get_json('cancel-reason/list')->data;
        $viewData['neadListTitle'] = '<h2 class="title-with-line"><span>THÔNG TIN NHU CẦU</span></h2>';

        $viewData['customer'] = $requestsByIdCustomer->customer;
        $customerEmails = "";
        $emailIndex = 1;
        foreach ($lead->customers->emailList as $email) {
            $customerEmails .= $email->email;
            if ($emailIndex <= count($lead->customers->emailList) - 1) {
                $customerEmails .= ",";
            }
            $emailIndex++;
        }
        $viewData['customerEmails'] = $customerEmails;
        $customerPhones = "";
        $phoneIndex = 1;
        foreach ($lead->customers->phoneList as $phone) {
            $customerPhones .= $phone->phone;
            if ($phoneIndex <= count($lead->customers->phoneList) - 1) {
                $customerPhones .= ",";
            }
            $phoneIndex++;
        }
        $viewData['customerPhones'] = $customerPhones;

        $viewData['neadList'] = $requestsByIdCustomer->needList;
        $viewData['leadDealDetail'] = $lead;

        $viewData['touredTab'] = $this->touredTab($lead->dealId);

        // return get_transaction_centers();
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $viewData['sources'] = $sources;
        $viewData['subjects'] = $subjects;

        $countListing = post_json('listing/deal-lead', (object) ['dealId' => $lead->dealId])->data;
        $sortForCountListing = [];
        foreach ($countListing as $key => $value) {
            $sortForCountListing[$value->typeListing] = $value->count;
        }
        $viewData['countListing'] = $sortForCountListing;
        $currentUser = \Session::get('user');
        // return response()->json($lead); //userId assignedTo
        $viewData['permissionDoAction'] = $currentUser->userId == $lead->assignedTo ? true : false;
        if (isset($lead->wardList)) {
            $districtWards = [];
            foreach ($lead->wardList as $key => $ward) {
                $districtWards[$ward->districtId]['wards'][$key] = $ward;
                $districtWards[$ward->districtId]['districtName'] = $ward->districtName;
                $districtWards[$ward->districtId]['districtId'] = $ward->districtId;
            }
            $lead->wardList = $districtWards;
        }
        $viewData['leadDealDetail']->listUnlockReasons = null;
        if ($viewData['leadDealDetail']->progressQuoId == 3 || $viewData['leadDealDetail']->progressQuoId == 4) {
            $viewData['leadDealDetail']->listUnlockReasons = get_json('/lead-deal-type/1')->data;
        }
        //var_dump($viewData['leadDealDetail']->listUnlockReasons); die();
        $viewData['list_group_question'] = get_json('deal/deposit/question-groups')->data;
        // $viewData['list_question'] = get_json('/deal/deposit/form')->data;
        $viewData['list_result_question'] = get_json('/deal/deposit/get-form-result/' . $id)->data;
        $viewData['reason_deposite'] = get_json('/deal-reasons/get-by-type/5')->data;
        $viewData['depositId'] = !empty($viewData['leadDealDetail']->depositId) ? $viewData['leadDealDetail']->depositId : false;
        //var_dump($viewData['list_question']->buyerQuestion[0]->questionItems);
        //var_dump($viewData['list_question']->ownerQuestion[0]->questionItems); die();
        $viewData['contract_info'] = get_json("deal/$id/get-contract")->data;

        return view('deal.detailv2InGroup')->with($viewData);
    }

    public function getDetailJson($id)
    {
        $response = get_json(GET_DEAL_DETAIL . '-new/' . $id);
        return response()->json($response);
    }
    public function getSales()
    {
        $id = \Request::input("type");
        $sales = get_json("agent/sale/list/$id");
        return response()->json($sales);
    }
    public function generateRequestJson()
    {
        $postData = \Request::input();
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
        if (isset($postData['moveInDate']) && trim($postData['moveInDate']) != '') {
            $postData['moveInDate'] = Carbon::createFromFormat('m/d/Y', $postData['moveInDate'])->timestamp * 1000;
        } else {
            $postData['moveInDate'] = NULL;
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
        $postData['dealFinalBudget'] = trim(str_replace(',', '', $postData['dealFinalBudget']));
        if ($postData['dealFinalBudget'] == '') {
            $postData['dealFinalBudget'] = NULL;
        }
        if (!isset($postData['initialBudgetFixed']) || trim($postData['initialBudgetFixed']) == '') {
            $postData['initialBudgetFixed'] = NULL;
        } else {
            $postData['initialBudgetFixed'] = str_replace(",", "", $postData['initialBudgetFixed']);
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
        /*
          if (trim($postData['leadReassignReason']) == '') {
          $postData['leadReassignReason'] = NULL;
          }
         */
        if (empty($postData['saleId'])) {
            $postData['saleId'] = NULL;
        }
        if (!isset($postData['typeId']) || trim($postData['typeId']) == '') {
            $postData['typeId'] = NULL;
        }
        $customers = array(
            'customerId' => $postData['customerId'],
            'name' => $postData['customerName'] ? trim($postData['customerName']) : NULL,
            'email' => $postData['customerEmail'] ? trim($postData['customerEmail']) : NULL,
            'phone' => $postData['customerPhone'] ? trim($postData['customerPhone']) : NULL,
            'isDeleted' => FALSE
        );
        $postData['customers'] = $customers;
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['_token']);
        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        return response()->json($postData);
    }
    /**
     * Update deal
     * @param Request $request
     * @return Json
     */
    public function doUpdate(Request $request)
    {
        $postData = $this->leadRepository->preparePostData($request->input());
        $postData = \App\Http\Controllers\RequestController::setNullChanelCondition($postData);
        if (isset($postData["isBuyForCustomer"])) {
            $postData["isBuyForCustomer"] = $postData["isBuyForCustomer"] == 1 ? true : false;
        }
        $arr = explode(';', $postData['txtPurposeList']);
        unset($postData['txtPurposeList']);
        $postData['purposeList'] = [];
        foreach ($arr as $item) {
            if (!empty($item)) {
                $postData['purposeList'][] = intval($item);
            }
        }
        $postData['isHot'] = false;
        $postData['optionCode'] = '';
        $postData['expectedClosingDate'] =  null;
        $postData['comments'] = [];

        if (intval($postData['listingTypeId']) == 1) {
            $postData['isHot'] = boolval($postData['chkIsHot'] ?? false);
            $postData['optionCode'] = $postData['customerEvaluateCode'] ?? '';
            $postData['expectedClosingDate'] = $postData['customerEvaluateDate'] ?? null;
            $postData['comments'] = $postData['customerEvaluateDateReasons'] ? explode(';', $postData['customerEvaluateDateReasons']) : [];
        }

        //print_r(json_encode($postData));die;

        unset($postData['chkIsHot']);
        unset($postData['customerEvaluateCode']);
        unset($postData['customerEvaluateDate']);
        unset($postData['customerEvaluateDateReasons']);
        // print_r($postData);die;
        $response = put_json(UPDATE_DEAL, $postData);
        $response->dataPost = $postData;
        return response()->json($response);
    }
    public function findListing(Request $request, $dealId)
    {
        $deal = get_json(GET_DEAL_DETAIL . '/' . $dealId)->data;
        $postData = $deal->request;
        $postData->dealId = $dealId;
        $districtsList = NULL;
        if (isset($postData->districtsList)) {
            $districtsList = array();
            foreach ($postData->districtsList as $district) {
                $item = array(
                    'districtId' => $district->districtId,
                    'isPrefered' => $district->isPrefered
                );
                $districtsList[] = $item;
            }
        }
        $directionsList = NULL;
        if (isset($deal->directionList)) {
            $directionsList = array();
            foreach ($deal->directionList as $direction) {
                $item = array(
                    'directionId' => $direction->directionId,
                    'isPrefered' => $direction->isPrefered
                );
                $directionsList[] = $item;
            }
        }
        $postData->directionsList = $directionsList;
        unset($postData->requestId);
        unset($postData->requestId);
        unset($postData->listingType);
        unset($postData->propertyType);
        unset($postData->rlistingsList);
        unset($postData->leadFinalBudget);
        unset($postData->leadFinalBudget);
        unset($postData->leadNote);
        unset($postData->createdBy);
        unset($postData->updatedBy);
        unset($postData->createdDate);
        unset($postData->createdDate);
        unset($postData->isDeleted);
        unset($postData->purposeId);
        $postData->customers = NULL;
        $postData->amenitiesList = NULL;
        $postData->districtsList = $districtsList;
        return response()->json($postData);
        //return response()->json($deal);
        $response = post_json_search_listing(SEARCH_LISTING_V2 . '/1/10000', $postData);
        $listings = array();
        if ($response->result && isset($response->data->list)) {
            $listings = $response->data->list;
        }
        //return response()->json($response);
        //return response()->json($listings);
        $viewData['listings'] = $listings;
        return view('deal.find-listing')->with($viewData);
    }
    public function customSearchForm()
    {
        $postData = \Request::input();
        // response()->json($postData);
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
        if (isset($postData['moveInDate']) && trim($postData['moveInDate']) != '') {
            $postData['moveInDate'] = Carbon::createFromFormat('m/d/Y', $postData['moveInDate'])->timestamp * 1000;
        } else {
            $postData['moveInDate'] = NULL;
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
        if (!empty($postData['dealFinalBudget'])) {
            $postData['dealFinalBudget'] = trim(str_replace(',', '', $postData['dealFinalBudget']));
        } else {
            $postData['dealFinalBudget'] = NULL;
        }
        if (!isset($postData['initialBudgetFixed']) || trim($postData['initialBudgetFixed']) == '') {
            $postData['initialBudgetFixed'] = NULL;
        } else {
            $postData['initialBudgetFixed'] = str_replace(",", "", $postData['initialBudgetFixed']);
        }
        if (!isset($postData['leadFinalBudget']) || trim($postData['leadFinalBudget']) == '') {
            $postData['leadFinalBudget'] = NULL;
        } else {
            $postData['leadFinalBudget'] = str_replace(",", "", $postData['leadFinalBudget']);
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
        /*
          if (trim($postData['leadReassignReason']) == '') {
          $postData['leadReassignReason'] = NULL;
          }
         */
        if (empty($postData['saleId'])) {
            $postData['saleId'] = NULL;
        }
        if (!isset($postData['typeId']) || trim($postData['typeId']) == '') {
            $postData['typeId'] = NULL;
        }
        $customers = array(
            'customerId' => $postData['customerId'],
            'name' => $postData['customerName'] ? trim($postData['customerName']) : NULL,
            'email' => $postData['customerEmail'] ? trim($postData['customerEmail']) : NULL,
            'phone' => $postData['customerPhone'] ? trim($postData['customerPhone']) : NULL,
            'isDeleted' => FALSE
        );
        $postData['customers'] = $customers;
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['_token']);
        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        $ward_type = '';
        $direction_type = '';
        $district_type = '';
        $response = post_json(LISTING_CUSTOM_SEARCH, $postData);
        //return response()->json($postData);
        //return response()->json($response);
        if ($response->result) {
            $formdata = $response->data->filterParams;
            $formdatahistory = $response->data->selectedFilterParams;
            // return response()->json($response);die;
            $res_alley = ["from" => "", "to" => ""];
            $res_length = ["from" => "", "to" => ""];
            $res_width = ["from" => "", "to" => ""];
            $res_yearbuilt = ["from" => "", "to" => ""];
            if (!empty($formdatahistory->fromTo)) {
                foreach ($formdatahistory->fromTo as $v) {
                    switch ($v->type) {
                        case 'alley':
                            $res_alley['from'] = $v->fromValue;
                            $res_alley['to'] = $v->toValue;
                            break;
                        case 'length':
                            $res_length['from'] = $v->fromValue;
                            $res_length['to'] = $v->toValue;
                            break;
                        case 'yearBuilt':
                            $res_yearbuilt['from'] = $v->fromValue;
                            $res_yearbuilt['to'] = $v->toValue;
                            break;
                        default:
                            $res_width['from'] = $v->fromValue;
                            $res_width['to'] = $v->toValue;
                            break;
                    }
                }
            }
            // return json_encode($formdatahistory);die;
            $wardIds = "";
            for ($i = 0; $i < sizeof($formdata); $i++) {
                $form = $formdata[$i];
                if ($form->type == 'wardType') {
                    $ward_type .= '<div class="checkbox col-sm-3"><label class="no-bold"><input value="' . $form->id . '" name="wardAdvange[]" type="checkbox" ' . (isset($wardsCheck[$form->id]) ? $wardsCheck[$form->id] : '') . ' /> ' . $form->name . '</label></div>';
                    $wardIds .= "$form->id,";
                }
                if ($form->type == 'directionType') {
                    $checked = "";
                    if (!empty($formdatahistory->directionsList)) {
                        foreach ($formdatahistory->directionsList as $direc) {
                            if ($direc == $form->id) {
                                $checked = "checked";
                                break;
                            }
                        }
                    }
                    $direction_type .= '<div class="checkbox col-sm-3"><label class="no-bold"><input value="' . $form->id . '" name="directionsAdvange[]" ' . $checked . ' type="checkbox" ' . (isset($directionsCheck[$form->id]) ? $directionsCheck[$form->id] : '') . '> ' . $form->name . '</label></div>';
                }
                $arr_wardsList = [];
                if (!empty($formdatahistory->wardsList)) {
                    $arr_wardsList = $formdatahistory->wardsList;
                }
                $arr_districtsList = [];
                if (!empty($formdatahistory->districtsList)) {
                    $arr_districtsList = $formdatahistory->districtsList;
                }
                if ($form->type == 'districtType') {
                    $check_dis = "";
                    if (in_array($form->id, $arr_districtsList) == TRUE)
                        $check_dis = "checked";
                    $district_type .= '<div class="checkbox col-sm-3 district-wrapper"><label class="no-bold districts-selector"><input value="' . $form->id . '" name="districtIdAdvange[]"' . $check_dis . ' type="checkbox" ' . (isset($districtIdCheck[$form->id]) ? $districtIdCheck[$form->id] : '') . ' /> <b>' . $form->name . '</b></label><div class="wards">' . $this->fncCustomSearchHistory($form->id, $arr_wardsList, $formdata) . '</div></div>';
                }
            }
            $alley_from_to = '<input name="alleyFromTo" class="form-control" placeholder="m" value="' . $res_alley['from'] . '" type="number">';
            $alley_to_value = '<input name="alleyToValue" class="form-control" placeholder="m" value="' . $res_alley['to'] . '" type="number">';
            $length_from_to = '<input name="lengthFromTo" class="form-control" placeholder="m" value="' . $res_length['from'] . '" type="number">';
            $length_to_value = '<input name="lengthToValue" class="form-control" placeholder="m" value="' . $res_length['to'] . '" type="number">';
            $width_from_to = '<input name="widthFromTo" class="form-control" placeholder="m" value="' . $res_width['from'] . '" type="number">';
            $width_to_value = '<input name="widthToValue" class="form-control" placeholder="m" value="' . $res_width['to'] . '" type="number">';
            $year_built_from_to = '<input name="yearBuiltFromTo" class="form-control" placeholder="" value="' . $res_yearbuilt['from'] . '" type="number">';
            $year_built_to_value = '<input name="yearBuiltToValue" class="form-control" placeholder="" value="' . $res_yearbuilt['to'] . '" type="number">';
            if (!empty($formdatahistory->privateListing)) {
                $check_privateListing = $formdatahistory->privateListing;
            } else {
                $check_privateListing = 0;
            }
            $private_listing = '<label class="radio-inline"><input name="privateListing" value="1" type="radio" ' . ($check_privateListing == '1' ? 'checked="checked"' : '') . '> Đã xác thực</label><label class="radio-inline"><input name="privateListing" value="2" type="radio" ' . ($check_privateListing == '2' ? 'checked="checked"' : '') . '> Chưa xác thực</label>';
            $form_custom_search = array(
                'wardType' => $ward_type,
                'wardIds' => $wardIds,
                'directionType' => $direction_type,
                'districtType' => $district_type,
                'alleyFromTo' => $alley_from_to,
                'alleyToValue' => $alley_to_value,
                'lengthFromTo' => $length_from_to,
                'lengthToValue' => $length_to_value,
                'widthFromTo' => $width_from_to,
                'widthToValue' => $width_to_value,
                'yearBuiltFromTo' => $year_built_from_to,
                'yearBuiltToValue' => $year_built_to_value,
                'privateListing' => $private_listing
            );
            return response()->json($form_custom_search);
        }
    }
    public function findAdvangeListing()
    {
        //$requestData = \Request::input();
        $filterData = \Request::input();
        //return response()->json($filterData);
        $fromTo = [];
        if (!empty($filterData['alleyFromTo']) || !empty($filterData['alleyToValue'])) {
            $alleyFilter = ['type' => "alley"];
            if (!empty($filterData['alleyFromTo'])) {
                $alleyFilter['fromValue'] = $filterData['alleyFromTo'];
            }
            if (!empty($filterData['alleyToValue'])) {
                $alleyFilter['toValue'] = $filterData['alleyToValue'];
            }
            $fromTo[] = count($alleyFilter) > 0 ? $alleyFilter : null;
        }
        if (isset($filterData['lengthFromTo']) && $filterData['lengthFromTo'] > 0 && isset($filterData['lengthToValue']) && $filterData['lengthToValue'] > 0) {
            $lengthFromTo = $filterData['lengthFromTo'];
            $lengthToValue = $filterData['lengthToValue'];
            $fromTo[] = array(
                'fromValue' => $lengthFromTo,
                'toValue' => $lengthToValue,
                'type' => "length"
            );
        }
        if (isset($filterData['widthFromTo']) && $filterData['widthFromTo'] > 0 && isset($filterData['widthToValue']) && $filterData['widthToValue'] > 0) {
            $widthFromTo = $filterData['widthFromTo'];
            $widthToValue = $filterData['widthToValue'];
            $fromTo[] = array(
                'fromValue' => $widthFromTo,
                'toValue' => $widthToValue,
                'type' => "width"
            );
        }
        if (isset($filterData['yearBuiltFromTo']) && $filterData['yearBuiltFromTo'] > 0 && isset($filterData['yearBuiltToValue']) && $filterData['yearBuiltToValue'] > 0) {
            $fromTo[] = array(
                'fromValue' => $filterData['yearBuiltFromTo'],
                'toValue' => $filterData['yearBuiltToValue'],
                'type' => "yearBuilt"
            );
            \Session::put('yearBuiltFromToDeal', $filterData['yearBuiltFromTo']);
            \Session::put('yearBuiltToValueDeal', $filterData['yearBuiltToValue']);
        } else {
            \Session::forget('yearBuiltFromToDeal');
            \Session::forget('yearBuiltToValueDeal');
        }
        unset($filterData['yearBuiltFromTo']);
        unset($filterData['yearBuiltToValue']);
        //end fromTo
        $postData = null;
        if (!empty($filterData['dealId'])) {
            $dealId = $filterData['dealId'];
            $deal = get_json(GET_DEAL_DETAIL . '/' . $dealId)->data;
            $deal->request->directionsList = $deal->directionList;
            $postData = $deal->request;
            $postData->dealId = $dealId;
        } else {
            $leadId = $filterData['leadId'];
            $lead = get_json(GET_LEAD_DETAIL . '/' . $leadId)->data;
            $postData = $lead->request;
            $postData->leadId = $leadId;
            $postData->dealId = null;
        }
        //return response()->json($postData);
        unset($postData->requestId);
        unset($postData->requestId);
        unset($postData->listingType);
        unset($postData->propertyType);
        unset($postData->rlistingsList);
        unset($postData->leadFinalBudget);
        unset($postData->leadFinalBudget);
        unset($postData->leadNote);
        unset($postData->createdBy);
        unset($postData->updatedBy);
        unset($postData->createdDate);
        unset($postData->createdDate);
        unset($postData->isDeleted);
        unset($postData->purposeId);
        $postData->customers = NULL;
        $postData->amenitiesList = NULL;
        $districtsList = NULL;
        $districtsListResetFilter = NULL;
        // có chọn filter
        if (!empty($filterData['districtIdAdvange'])) {
            $districtsList = array();
            foreach ($filterData['districtIdAdvange'] as $districtIdAdvange) {
                $item = array(
                    'districtId' => $districtIdAdvange,
                );
                $districtsList[] = $item;
            }
            $districtsListResetFilter = $districtsList;
        } else { // không chọn filter
            if (isset($postData->districtsList)) {
                $districtsList = array();
                foreach ($postData->districtsList as $district) {
                    $item = array(
                        'districtId' => $district->districtId,
                        'isPrefered' => $district->isPrefered
                    );
                    $districtsList[] = $item;
                }
            }
        }
        $postData->districtsList = $districtsList;
        $directionsList = NULL;
        if (isset($filterData['directionsAdvange'])) {
            $directionsList = array();
            foreach ($filterData['directionsAdvange'] as $directionIdAdvange) {
                $item = array(
                    'directionId' => $directionIdAdvange,
                );
                $directionsList[] = $item;
            }
            \Session::put('directionsAdvangeDeal', $filterData['directionsAdvange']);
        } else {
            if (isset($postData->directionsList)) {
                $directionsList = array();
                foreach ($postData->directionsList as $direction) {
                    $item = array(
                        'directionId' => $direction->directionId,
                        'isPrefered' => $direction->isPrefered
                    );
                    $directionsList[] = $item;
                }
            }
        }
        $postData->directionsList = count($directionsList) > 0 ? $directionsList : null;
        if (isset($filterData['wardAdvange'])) {
            $wardsList = array();
            foreach ($filterData['wardAdvange'] as $wardAdvangeId) {
                $wardsList[] = (int) $wardAdvangeId;
            }
            $postData->wardsList = $wardsList;
        } else {
            unset($postData->wardsList);
        }
        if (count($fromTo) > 0) {
            $postData->fromTo = $fromTo;
        } else {
            unset($postData->fromTo);
        }
        if (!empty($filterData['privateListing']) && $filterData['privateListing'] > 0) {
            $postData->privateListing = $filterData['privateListing'];
        } else {
            unset($postData->privateListing);
        }
        $sortColumnIndex = isset($filterData['order']) ? $filterData['order'][0]['column'] : 0;
        $sortColumn = !empty($filterData['columns']) ? $filterData['columns'][$sortColumnIndex]['data'] : 'rlistingId';
        switch ($sortColumn) {
            case 'formatPrice':
                $sortColumn = 'price';
                break;
            case 'licensePhotos':
                $sortColumn = 'pinkBook';
                break;
            case 'formatSize':
                $sortColumn = 'floorSize';
                break;
            case 'sourceBy':
                $sortColumn = 'userTypeId';
                break;
            case 'districtName':
                $sortColumn = 'districtId';
                break;
            case 'wardName':
                $sortColumn = 'wardId';
                break;
            case 'directionName':
                $sortColumn = 'directionId';
                break;
            case 'incompatible':
            case 'licensePhotos':
            case 'sourceAdd':
                $sortColumn = 'rlistingId';
                break;
        }
        $postData->sortType = isset($filterData['order']) ? $filterData['order'][0]['dir'] : 'asc';
        $postData->sortColumn = $sortColumn;
        $page = get_current_page($filterData);
        $numberItem = 10000;
        $draw = isset($filterData['draw']) ? $filterData['draw'] : 1;
        //return response()->json($filterData['columns']);
        //return response()->json($postData);
        $districtsList_onlyvalue = [];
        foreach ($postData->districtsList as $v) {
            $districtsList_onlyvalue[] = $v['districtId'];
        }
        $directionsList_onlyvalue = [];
        //if (!empty($filterData['directionsAdvange']) && !empty($postData->directionsList)) {
        if (!empty($postData->directionsList)) {
            foreach ($postData->directionsList as $v) {
                $directionsList_onlyvalue[] = $v['directionId'];
            }
        }
        $filterParams = [
            "keySearch" => !empty($postData->keySearch) ? $postData->keySearch : NULL,
            "fromTo" => !empty($postData->fromTo) ? $postData->fromTo : Null,
            "privateListing" => !empty($postData->privateListing) ? $postData->privateListing : NULL,
            "sortColumn" => !empty($postData->sortColumn) ? $postData->sortColumn : NULL,
            "sortType" => !empty($postData->sortType) ? $postData->sortType : NULL,
            "wardsList" => !empty($postData->wardsList) ? $postData->wardsList : NULL,
            "districtsList" => !empty($districtsList_onlyvalue) ? $districtsList_onlyvalue : NULL,
            "directionsList" => !empty($directionsList_onlyvalue) ? $directionsList_onlyvalue : NULL
        ];
        $filterParamsHistory = [
            "keySearch" => !empty($postData->keySearch) ? $postData->keySearch : NULL,
            "fromTo" => !empty($postData->fromTo) ? $postData->fromTo : Null,
            "privateListing" => !empty($postData->privateListing) ? $postData->privateListing : NULL,
            "sortColumn" => !empty($postData->sortColumn) ? $postData->sortColumn : NULL,
            "sortType" => !empty($postData->sortType) ? $postData->sortType : NULL,
            "wardsList" => !empty($postData->wardsList) ? $postData->wardsList : NULL,
            "districtsList" => $districtsListResetFilter != NULL ? $districtsList_onlyvalue : NULL,
            "directionsList" => !empty($directionsList_onlyvalue) ? $directionsList_onlyvalue : NULL
        ];
        if (\Request::input('loadtime') == 1) {
            $filterParams = NULL;
        }
        $postData->historyType = !empty($filterData['historyType']) ? df_int($filterData['historyType']) : null;
        $postData->filterParams = $filterParams;
        $postData->filterParamsHistory = $filterParamsHistory;
        $response = post_json_search_listing(SEARCH_LISTING_V2 . "/$page/$numberItem", $postData);
        // return response()->json($response); die;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        // return response()->json($postData);
        return response()->json($viewData);
        //return response()->json($listings);
        $viewData['listings'] = $listings;
        return view('deal.find-listing')->with($viewData);
    }
    public function countAdvangeListing()
    {
        //$requestData = \Request::input();
        $filterData = \Request::input();
        //return response()->json($requestData);
        $fromTo = [];
        if (!empty($filterData['alleyFromTo']) || !empty($filterData['alleyToValue'])) {
            $alleyFilter = ['type' => "alley"];
            if (!empty($filterData['alleyFromTo'])) {
                $alleyFilter['fromValue'] = $filterData['alleyFromTo'];
            }
            if (!empty($filterData['alleyToValue'])) {
                $alleyFilter['toValue'] = $filterData['alleyToValue'];
            }
            $fromTo[] = count($alleyFilter) > 0 ? $alleyFilter : null;
        }
        if (isset($filterData['lengthFromTo']) && $filterData['lengthFromTo'] > 0 && isset($filterData['lengthToValue']) && $filterData['lengthToValue'] > 0) {
            $lengthFromTo = $filterData['lengthFromTo'];
            $lengthToValue = $filterData['lengthToValue'];
            $fromTo[] = array(
                'fromValue' => $lengthFromTo,
                'toValue' => $lengthToValue,
                'type' => "length"
            );
        }
        if (isset($filterData['widthFromTo']) && $filterData['widthFromTo'] > 0 && isset($filterData['widthToValue']) && $filterData['widthToValue'] > 0) {
            $widthFromTo = $filterData['widthFromTo'];
            $widthToValue = $filterData['widthToValue'];
            $fromTo[] = array(
                'fromValue' => $widthFromTo,
                'toValue' => $widthToValue,
                'type' => "width"
            );
        }
        if (isset($filterData['yearBuiltFromTo']) && $filterData['yearBuiltFromTo'] > 0 && isset($filterData['yearBuiltToValue']) && $filterData['yearBuiltToValue'] > 0) {
            $fromTo[] = array(
                'fromValue' => $filterData['yearBuiltFromTo'],
                'toValue' => $filterData['yearBuiltToValue'],
                'type' => "yearBuilt"
            );
            \Session::put('yearBuiltFromToDeal', $filterData['yearBuiltFromTo']);
            \Session::put('yearBuiltToValueDeal', $filterData['yearBuiltToValue']);
        } else {
            \Session::forget('yearBuiltFromToDeal');
            \Session::forget('yearBuiltToValueDeal');
        }
        unset($filterData['yearBuiltFromTo']);
        unset($filterData['yearBuiltToValue']);
        //end fromTo
        $postData = null;
        if (!empty($filterData['dealId'])) {
            $dealId = $filterData['dealId'];
            $deal = get_json(GET_DEAL_DETAIL . '/' . $dealId)->data;
            $postData = $deal->request;
            $postData->dealId = $dealId;
        } else {
            $leadId = $filterData['leadId'];
            $lead = get_json(GET_LEAD_DETAIL . '/' . $leadId)->data;
            $postData = $lead->request;
            $postData->leadId = $leadId;
            $postData->dealId = null;
        }
        unset($postData->requestId);
        unset($postData->requestId);
        unset($postData->listingType);
        unset($postData->propertyType);
        unset($postData->rlistingsList);
        unset($postData->leadFinalBudget);
        unset($postData->leadFinalBudget);
        unset($postData->leadNote);
        unset($postData->createdBy);
        unset($postData->updatedBy);
        unset($postData->createdDate);
        unset($postData->createdDate);
        unset($postData->isDeleted);
        unset($postData->purposeId);
        $postData->customers = NULL;
        $postData->amenitiesList = NULL;
        $districtsList = NULL;
        if (isset($filterData['districtIdAdvange'])) {
            $districtsList = array();
            foreach ($filterData['districtIdAdvange'] as $districtIdAdvange) {
                $item = array(
                    'districtId' => $districtIdAdvange,
                );
                $districtsList[] = $item;
            }
        } else {
            if (isset($postData->districtsList)) {
                $districtsList = array();
                foreach ($postData->districtsList as $district) {
                    $item = array(
                        'districtId' => $district->districtId,
                        'isPrefered' => $district->isPrefered
                    );
                    $districtsList[] = $item;
                }
            }
        }
        $postData->districtsList = $districtsList;
        $directionsList = NULL;
        if (isset($filterData['directionsAdvange'])) {
            $directionsList = array();
            foreach ($filterData['directionsAdvange'] as $directionIdAdvange) {
                $item = array(
                    'directionId' => $directionIdAdvange,
                );
                $directionsList[] = $item;
            }
            \Session::put('directionsAdvangeDeal', $filterData['directionsAdvange']);
        } else {
            if (isset($postData->directionsList)) {
                $directionsList = array();
                foreach ($postData->directionsList as $direction) {
                    $item = array(
                        'directionId' => $direction->directionId,
                        'isPrefered' => $direction->isPrefered
                    );
                    $directionsList[] = $item;
                }
            }
        }
        $postData->directionsList = count($directionsList) > 0 ? $directionsList : null;
        if (isset($filterData['wardAdvange'])) {
            $wardsList = array();
            foreach ($filterData['wardAdvange'] as $wardAdvangeId) {
                $wardsList[] = (int) $wardAdvangeId;
            }
            $postData->wardsList = $wardsList;
        } else {
            unset($postData->wardsList);
        }
        if (count($fromTo) > 0) {
            $postData->fromTo = $fromTo;
        } else {
            unset($postData->fromTo);
        }
        if (!empty($filterData['privateListing']) && $filterData['privateListing'] > 0) {
            $postData->privateListing = $filterData['privateListing'];
        } else {
            unset($postData->privateListing);
        }
        $sortColumnIndex = isset($filterData['order']) ? $filterData['order'][0]['column'] : 0;
        $sortColumn = !empty($filterData['columns']) ? $filterData['columns'][$sortColumnIndex]['data'] : 'rlistingId';
        switch ($sortColumn) {
            case 'formatPrice':
                $sortColumn = 'price';
                break;
            case 'licensePhotos':
                $sortColumn = 'pinkBook';
                break;
            case 'formatSize':
                $sortColumn = 'floorSize';
                break;
            case 'sourceBy':
                $sortColumn = 'userTypeId';
                break;
            case 'districtName':
                $sortColumn = 'districtId';
                break;
            case 'wardName':
                $sortColumn = 'wardId';
                break;
            case 'directionName':
                $sortColumn = 'directionId';
                break;
            case 'incompatible':
            case 'licensePhotos':
            case 'sourceAdd':
                $sortColumn = 'rlistingId';
                break;
        }
        $postData->sortType = isset($filterData['order']) ? $filterData['order'][0]['dir'] : 'asc';
        $postData->sortColumn = $sortColumn;
        $districtsList_onlyvalue = [];
        foreach ($postData->districtsList as $v) {
            $districtsList_onlyvalue[] = $v['districtId'];
        }
        $directionsList_onlyvalue = [];
        if (!empty($postData->directionsList)) {
            //if (!empty($filterData['directionsAdvange']) && !empty($postData->directionsList)) {
            foreach ($postData->directionsList as $v) {
                $directionsList_onlyvalue[] = $v['directionId'];
            }
        }
        $filterParams = [
            "keySearch" => !empty($postData->keySearch) ? $postData->keySearch : NULL,
            "fromTo" => !empty($postData->fromTo) ? $postData->fromTo : Null,
            "privateListing" => !empty($postData->privateListing) ? $postData->privateListing : NULL,
            "sortColumn" => !empty($postData->sortColumn) ? $postData->sortColumn : NULL,
            "sortType" => !empty($postData->sortType) ? $postData->sortType : NULL,
            "wardsList" => !empty($postData->wardsList) ? $postData->wardsList : NULL,
            "districtsList" => !empty($districtsList_onlyvalue) ? $districtsList_onlyvalue : NULL,
            "directionsList" => !empty($directionsList_onlyvalue) ? $directionsList_onlyvalue : NULL
        ];
        $postData->filterParams = $filterParams;
        //return response()->json($postData);
        $response = post_json_search_listing(SEARCH_LISTING_V2, $postData);
        return response()->json($response);
    }
    public function deactivateListing(Request $request)
    {
        $postData = $request->json()->all();
        $response = post_json(DEACTIVATE_DEAL_LISTING, $postData);
        return response()->json($response);
    }
    public function addEmailListings(Request $request)
    {
        $postData = $request->json()->all();
        $response = post_json(ADD_DEAL_EMAIL_LISTING, $postData);
        $listings = array();
        if ($response->result) {
            $listings = get_json(GET_DEAL_LISTINGS . '/' . $postData['dealId'])->data;
        }
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        return view('deal.email-listings')->with($viewData);
    }
    public function removeEmailListing(Request $request, $dealId, $rlistingId)
    {
        $response = delete_json(REMOVE_DEAL_EMAIL_LISTING . '/' . $dealId . '/' . $rlistingId);
        $listings = array();
        if ($response->result) {
            $listings = get_json(GET_DEAL_LISTINGS . '/' . $dealId)->data;
        }
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        return view('deal.email-listings')->with($viewData);
    }
    public function addListingCart()
    {
        $postData = \Request::input();
        $postData['rlistingIds'] = explode(',', $postData['rlistingIds']);
        if ($postData['rlistingIds']) {
            $rlistingIdCount = count($postData['rlistingIds']);
            for ($i = 0; $i < $rlistingIdCount; $i++) {
                $postData['rlistingIds'][$i] = df_int($postData['rlistingIds'][$i]);
            }
        }
        //return response()->json($postData);
        $response = post_json(CRM_LISTING_CART, $postData);
        return response()->json($response);
    }
    public function removeListingCart()
    {
        $postData = \Request::input();
        $cartId = $postData['noteMyListingCartId'];
        $reason = $postData['noteDeleteListingMyCart'];
        $requestData = array(
            'id' => $cartId,
            'reason' => $reason,
        );
        $response = post_json(CRM_LISTING_CART_DELETE, $requestData);
        return response()->json($response);
    }
    public function selectCustomerListing(Request $request)
    {
        $postData = $request->json()->all();
        //return response()->json($postData);
        $response = post_json(SELECT_DEAL_LISTING, $postData);
        $listings = array();
        if ($response->result) {
            $listings = get_json(GET_DEAL_LISTINGS . '/' . $postData['dealId'])->data;
        }
        $statusList = get_json(GET_DEAL_STATUS_LIST)->data;
        $listingStatusList = get_json(DEAL_LISTING_STATUS_LIST)->data;
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        $viewData['statusList'] = $statusList;
        $viewData['listingStatusList'] = $listingStatusList;
        return view('deal.customer-listings')->with($viewData);
    }
    public function selectedCustomerListings($id)
    {
        $listings = get_json(GET_DEAL_LISTINGS . '/' . $id)->data;
        $statusList = get_json(GET_DEAL_STATUS_LIST)->data;
        $listingStatusList = get_json(DEAL_LISTING_STATUS_LIST)->data;
        //return response()->json($listings);
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        $viewData['statusList'] = $statusList;
        $viewData['listingStatusList'] = $listingStatusList;
        return view('deal.customer-listings')->with($viewData);
    }
    public function getContractEmailTemplate($id)
    {
        $viewData = array();
        $currentUser = \Session::get('user');
        //return response()->json($currentUser);
        $viewData['currentUser'] = $currentUser;
        $deal = get_json(GET_DEAL_DETAIL . '/' . $id)->data;
        $viewData['deal'] = $deal;
        return view('deal.customer-contact-email-template')->with($viewData);
    }
    public function getCustomerEmailTemplate()
    {
        $rlistingIds = \Request::input('rlistingIds');
        $viewData = [];
        $currentUser = \Session::get('user');
        // return response()->json($currentUser);
        $viewData['currentUser'] = $currentUser;
        $leadDeal = null;
        if (!empty(\Request::input('leadId'))) {
            $id = \Request::input('leadId');
            $leadDeal = get_json(GET_LEAD_DETAIL . '-new/' . $id)->data;
        } else if (\Request::input('dealId')) {
            $id = \Request::input('dealId');
            $leadDeal = get_json(GET_DEAL_DETAIL . '-new/' . $id)->data;
        }
        $viewData['leadDeal'] = $leadDeal;
        $listings = post_json(FIND_LISTING_BY_IDS, [
            'rlistingIds' => $rlistingIds
        ]);
        $viewData['listings'] = $listings->data;

        $id_account = $currentUser->userId;
        $viewData['account'] = get_json(GET_DETAIL_ACCOUNT . '/' . $id_account)->data;
        // return response()->json($viewData);
        $string = $currentUser->name;
        $pieces = explode(' ', $string);
        $last_word_name = array_pop($pieces);
        $last_word_name = $last_word_name ? $last_word_name : "N/A";
        $viewData['baName'] = $last_word_name;
        $viewData['voIp'] = $currentUser->voipId != null ? $currentUser->voipId : 'N/A';
        $viewData['baMobile'] = $currentUser->phone != null ? $currentUser->phone : 'N/A';

        return view('deal.customer-email-listing-template-final')->with($viewData);
    }

    public function noListingEmail()
    {
        $viewData = array();
        $currentUser = \Session::get('user');
        $viewData['currentUser'] = $currentUser;
        $leadId = null;
        $dealId = null;
        $leadDeal = null;
        if (!empty(\Request::input('leadId'))) {
            $id = \Request::input('leadId');
            $leadDeal = get_json(GET_LEAD_DETAIL . '-new/' . $id)->data;
        } else if (\Request::input('dealId')) {
            $id = \Request::input('dealId');
            $leadDeal = get_json(GET_DEAL_DETAIL . '-new/' . $id)->data;
        }
        $viewData['leadDeal'] = $leadDeal;

        $viewData['listingType'] = $leadDeal->listingType->typeName;
        $viewData['propertyType'] = $leadDeal->propertyType->typeName;
        $districts = $leadDeal->districtsList;
        $districtFiltered = null;
        foreach ($districts as $district) {
            if ($district->isPrefered) {
                $districtFiltered = $district;
                break;
            }
        }
        $viewData['districtName'] = $districtFiltered->name ?? '';

        $viewData['budget'] = $leadDeal->formatInitialBudget;
        return view('deal.no-listing-email-final')->with($viewData);
    }

    public function notContactedEmailTemplate()
    {
        $viewData = array();
        $currentUser = \Session::get('user');
        $viewData['currentUser'] = $currentUser;
        $leadId = null;
        $dealId = null;
        $leadDeal = null;
        if (!empty(\Request::input('leadId'))) {
            $id = \Request::input('leadId');
            $leadDeal = get_json(GET_LEAD_DETAIL . '-new/' . $id)->data;
        } else if (\Request::input('dealId')) {
            $id = \Request::input('dealId');
            $leadDeal = get_json(GET_DEAL_DETAIL . '-new/' . $id)->data;
        }
        $viewData['leadDeal'] = $leadDeal;
        //return response()->json($leadDeal);
        $viewData['voIp'] = $currentUser->voipId != null ? $currentUser->voipId : 'N/A';
        $viewData['baMobile'] = $currentUser->phone != null ? $currentUser->phone : 'N/A';
        $string = $currentUser->name;
        $pieces = explode(' ', $string);
        $last_word_name = array_pop($pieces);
        $last_word_name = $last_word_name ? $last_word_name : "N/A";
        $viewData['baName'] = $last_word_name;
        $viewData['customerPhone'] = $leadDeal->customers->phone;
        //$viewData['lastMsg'] = "*4663 nhan phim " . $currentUser->voipId . " hoac " . $currentUser->phone . " gap " . $this->stripVN($last_word_name) . ".";
        return view('deal.not-contacted-email-template-final')->with($viewData);
    }

    public function otherEmailTemplate()
    {
        $viewData = array();
        $currentUser = \Session::get('user');
        $viewData['currentUser'] = $currentUser;
        return view('deal.other-email-templatel')->with($viewData);
    }
    public function addNumberOfListingView()
    {
        $postData = \Request::json()->all();
        $response = post_json(ADD_NUMBER_OF_LISTING_VIEW, $postData);
        return response()->json($response);
    }
    public function makeCallReminder()
    {
        $postData = \Request::input();
        $hour = $postData['hour'];
        $minute = $postData['minute'];
        $postData['reminderDate'] = Carbon::createFromFormat('m/d/Y H:i', $postData['whenDate'] . ' ' . $hour . ':' . $minute)->timestamp * 1000;
        $postData['reminderType'] = array("reminderTypeId" => $postData['reminderTypeId']);
        $postData['reminderStatus'] = array("statusId" => $postData['statusId']);
        $postData['reminderPriority'] = array("priorityId" => $postData['priorityId']);
        unset($postData['hour']);
        unset($postData['minute']);
        unset($postData['whenDate']);
        unset($postData['statusId']);
        unset($postData['priorityId']);
        unset($postData['reminderTypeId']);
        $postUrl = DEAL_REMINDER;
        $userId = isset($postData['userId']) ? $postData['userId'] : NULL;
        if (!empty($userId)) {
            $currentUser = \Session::get("user");
            if ($currentUser->userId != $userId) {
                $postUrl = DEAL_SALE_REMINDER;
                $postData['saleId'] = $postData['userId'];
                unset($postData['userId']);
            }
        }
        //return response()->json($postData);
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }
    public function makeMeetingReminder()
    {
        $postData = \Request::input();
        $hour = $postData['hour'];
        $minute = $postData['minute'];
        $postData['reminderDate'] = Carbon::createFromFormat('m/d/Y H:i', $postData['whenDate'] . ' ' . $hour . ':' . $minute)->timestamp * 1000;
        //$postData['reminderType'] = array("reminderTypeId" => $postData['reminderTypeId']);
        $postData['reminderStatus'] = array("statusId" => $postData['statusId']);
        $postData['reminderPriority'] = array("priorityId" => $postData['priorityId']);
        unset($postData['hour']);
        unset($postData['minute']);
        unset($postData['whenDate']);
        unset($postData['statusId']);
        unset($postData['priorityId']);
        unset($postData['reminderTypeId']);
        $postUrl = MAKE_DEAL_MEETING_REMINDER;
        //return response()->json($postData);
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }
    public function makeEventReminder()
    {
        $postData = \Request::input();
        $hour = $postData['hour'];
        $minute = $postData['minute'];
        $postData['reminderDate'] = Carbon::createFromFormat('m/d/Y H:i', $postData['whenDate'] . ' ' . $hour . ':' . $minute)->timestamp * 1000;
        //$postData['reminderType'] = array("reminderTypeId" => $postData['reminderTypeId']);
        $postData['reminderStatus'] = array("statusId" => $postData['statusId']);
        $postData['reminderPriority'] = array("priorityId" => $postData['priorityId']);
        unset($postData['hour']);
        unset($postData['minute']);
        unset($postData['whenDate']);
        unset($postData['statusId']);
        unset($postData['priorityId']);
        unset($postData['reminderTypeId']);
        $postUrl = MAKE_DEAL_EVENT_REMINDER;
        //return response()->json($postData);
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }
    public function listingStatusChecked()
    {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json(DEAL_LISTING_STATUS, $postData);
        return response()->json($response);
    }
    public function sendEmailListing()
    {
        $postData = \Request::input();
        //$postData['rlistingIds'] = array();
        unset($postData['_token']);
        $postData['emailsTo'] = explode(',', $postData['emailsTo']);
        if (!empty($postData['emailsCc'])) {
            $postData['emailsCc'] = explode(',', $postData['emailsCc']);
        } else {
            $postData['emailsCc'] = NULL;
        }
        $postData['attacheLinks'] = NULL;
        if (!empty($postData['photos'])) {
            //$postData['attacheLinks'] = explode(',', $postData['photos']);
            unset($postData['photos']);
        }
        unset($postData['photos']);
        //return response()->json($lead->rlistingsList);
        if (!empty($postData['rlistingIds'])) {
            //$postData['historyType'] = 25;
            $postData['rlistingIds'] = explode(',', $postData['rlistingIds']);
            if ($postData['rlistingIds']) {
                $rlistingIdCount = count($postData['rlistingIds']);
                for ($i = 0; $i < $rlistingIdCount; $i++) {
                    $postData['rlistingIds'][$i] = df_int($postData['rlistingIds'][$i]);
                }
            }
        } else {
            $postData['rlistingIds'] = NULL;
            //$postData['historyType'] = 23;
        }
        if (empty($postData["dealId"])) {
            unset($postData['dealId']);
        }
        if (empty($postData["leadId"])) {
            unset($postData['leadId']);
        }
        // $postDataCollection = [
        //     'description' => null,
        //     'relatedListings' => $postData['rlistingIds']
        // ];
        // if(isset($postData['dealId'])){
        //     $postDataCollection['dealId'] = (int) $postData['dealId'];
        //     $postDataCollection['leadId'] = null;
        // }
        // if(isset($postData['leadId'])){
        //     $postDataCollection['leadId'] = (int) $postData['leadId'];
        //     $postDataCollection['dealId'] = null;
        // }
        // // return response()->json($postDataCollection);
        // post_json("crm/basket", $postDataCollection);
        $response = post_json(LEAD_EMAIL_LISTING_TO_CUSTOMER, $postData);
        return response()->json($response);
    }
    public function sendEmailListingAndSaveEnt()
    {
        $postData = \Request::input();
        //$postData['rlistingIds'] = array();
        unset($postData['_token']);
        $postData['emailsTo'] = explode(',', $postData['emailsTo']);
        if (!empty($postData['emailsCc'])) {
            $postData['emailsCc'] = explode(',', $postData['emailsCc']);
        } else {
            $postData['emailsCc'] = NULL;
        }
        $postData['attacheLinks'] = NULL;
        if ($postData['photos']) {
            //$postData['attacheLinks'] = explode(',', $postData['photos']);
            unset($postData['photos']);
        }
        //return response()->json($lead->rlistingsList);
        if ($postData['isGoodsAvailable']) {
            $postData['rlistingIds'] = explode(',', $postData['rlistingIds']);
            if ($postData['rlistingIds']) {
                $rlistingIdCount = count($postData['rlistingIds']);
                for ($i = 0; $i < $rlistingIdCount; $i++) {
                    $postData['rlistingIds'][$i] = df_int($postData['rlistingIds'][$i]);
                }
            }
        } else {
            $postData['rlistingIds'] = NULL;
        }
        if (empty($postData["dealId"])) {
            unset($postData['dealId']);
        }
        if (empty($postData["leadId"])) {
            unset($postData['leadId']);
        }
        $postData['historyType'] = 23;
        $param = $postData;
        $requestEnt = json_decode($postData["requestJson"]);
        unset($param["requestJson"]);
        $postData = [];
        $postData["request"] = $requestEnt;
        $postData["params"] = $param;
        // return response()->json($postData);
        $response = post_json(EMAIL_LISTING_AND_UPDATE_LEAD_DEAL, $postData);
        return response()->json($response);
    }
    public function getActivities($type, $dealId)
    {
        $requestData = \Request::input();
        $page = 1;
        $numberItem = 1000;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = get_json(DEAL_ACTIVITIES_LIST . "/$type/$dealId/$page/$numberItem");
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => array()
        );
        if ($response->data) {
            $viewData['recordsTotal'] = count($response->data->list);
            $viewData['recordsFiltered'] = count($response->data->list);
            $viewData['data'] = $response->data->list;
        }
        return response()->json($viewData);
    }
    public function notify()
    {
        $response = get_json(DEAL_NOTIFY);
        return response()->json($response);
    }
    public function setNotifyRead()
    {
        $postData = \Request::json()->all();
        $response = post_json("notification/deal/read", $postData);
        return response()->json($response);
    }
    public function getEmailListings($id)
    {
        $listings = get_json(GET_DEAL_LISTINGS . '/' . $id)->data;
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        return view('deal.email-listings')->with($viewData);
    }
    public function listBriefForm($id)
    {
    }
    public function briefFormOverview()
    {
        return view('deal.brief-form-overview');
    }
    public function ajaxListBriefForm($id = -1)
    {
        $requestData = \Request::input();
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = get_current_page($requestData);
        $data = get_json(DEAL_LIST_BRIEF_FORM . "/$id/$page/$numberItem")->data;
        //return response()->json($data);
        if (!$data->totalItems) {
            $data->totalItems = count($data->list);
        }
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    /**
     * @description departmentId = 5 là tm
     * @param type $id
     * @return view
     */
    public function briefFormDetail($id)
    {
        $user = Session::get('user');
        //return response()->json($user->departments->departmentId);
        $allowedGroupIds = array(5, 6);
        $isAllowed = false;
        foreach ($user->departments as $department) {
            if (in_array($department->departmentId, $allowedGroupIds)) {
                $isAllowed = true;
                break;
            }
        }
        if (!$isAllowed) {
            return response('Bạn không có quyền.', 401);
        }
        $response = get_json(DEAL_BRIEFT_FORM . "/$id");
        //return response()->json($response);
        $viewData = array(
            'data' => $response->data
        );
        return view("deal.brief-form-detail")->with($viewData);
    }
    public function saveBriefForm()
    {
        $postData = \Request::input();
        if (empty($postData['photo'])) {
            $postData['photo'] = null;
        }
        if ($postData['isTransferToLs'] == 'true') {
            $postData['isTransferToLs'] = true;
        } else {
            $postData['isTransferToLs'] = false;
        }
        //return response()->json($postData);
        $response = put_json(DEAL_BRIEFT_FORM, $postData);
        return response()->json($response);
    }
    public function listNotes($id)
    {
        $page = 1;
        $numberItem = 1000;
        $response = get_json(DEAL_NOTES_LIST . "/$id/$page/$numberItem");
        return response()->json($response);
    }
    public function addNote()
    {
        $postData = \Request::json()->all();
        $response = post_json(DEAL_NOTE, $postData);
        return response()->json($response);
    }
    public function meetingCalendar()
    {
        $viewData = array();
        return view("deal.meeting-calendar")->with($viewData);
    }
    public function meetingCalendarData()
    {
        $carbon = new Carbon();
        $requestData = \Request::input();
        $postData = array(
            "fromDate" => df_int($requestData['start']) * 1000,
            "toDate" => df_int($requestData['end']) * 1000,
            "saleIds" => isset($requestData['saleIds']) ? $requestData['saleIds'] : NULL
        );
        //return response()->json($postData);
        $response = post_json(DEAL_MEETING_LIST, $postData);
        return response()->json($response);
    }
    public function listReminders()
    {
        $response = get_json(DEAL_REMINDERS_LIST);
        return response()->json($response);
    }
    public function setReminderRead($id)
    {
        $response = get_json(DEAL_REMINDER_READ . "/$id");
        return response()->json($response);
    }
    public function contracts()
    {
        return view('deal.contracts');
    }
    public function contractsData($id)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        $post_data = array("searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null));
        $data = post_json(DEAL_CONTRACTS . "/" . $id . "/" . $page . "/10", $post_data)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    public function uploadContract($id)
    {
        $directory = "contracts/";
        $file = \Request::file('file_data');
        //$fileId = md5($file->getClientSize() . time()) . '_file';
        $fileName = $file->getClientOriginalName();
        $file->move(UPLOAD_PATH . $directory, $fileName);
        $postData = array(
            'dealId' => df_int($id),
            'contractFile' => UPLOAD_URL . $directory . $fileName
        );
        $response = post_json(DEAL_CONTRACTS, $postData);
        return redirect("deal/update/$id");
    }
    public function sendEmailContract($id)
    {
        $postData = \Request::input();
        //$deal = get_json(GET_DEAL_DETAIL . '/' . $id)->data;
        unset($postData['_token']);
        $postData['emailsTo'] = explode(',', $postData['emailsTo']);
        if (!empty($postData['emailsCc'])) {
            $postData['emailsCc'] = explode(',', $postData['emailsCc']);
        } else {
            $postData['emailsCc'] = NULL;
        }
        $postData['dealId'] = df_int($postData['dealId']);
        if ($postData['rlistingIds']) {
            foreach ($postData['rlistingIds'] as $key => $value) {
                $postData['rlistingIds'][$key] = df_int($value);
            }
        }
        $dataToPost = [
            'request' => json_decode($postData['dealJson'])
        ];
        unset($postData['dealJson']);
        $postData['historyType'] = 25;
        $dataToPost['params'] = $postData;
        //return response()->json($dataToPost);
        //$response = post_json(DEAL_SEND_CONTRACTS, $dataToPost);
        $response = post_json('deal/contracts-send-and-update-deal', $dataToPost);
        return response()->json($response);
    }
    public function getHistory($id)
    {
        $requestData = \Request::input();
        $numberItem = 10;
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = get_json(DEAL_HISTORIES . "/$id/$page/$numberItem");
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }
    public function paymentRequest()
    {
        return view("deal.form-payment-request");
    }
    public function savePaymentRequest()
    {
        //$postUrl = "deal/payment/";
        $postUrl = "deal/payment-and-update-deal";
        $postData = \Request::json()->all();
        $isDraft = $postData['isDraft'];
        //return response()->json($postData);
        if ($isDraft) {
            $postUrl = "deal/payment/draft/";
        }
        unset($postData['isDraft']);
        //return $postUrl;
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }
    public function paymentRequestDetail()
    {
        $dealId = \Request::input("dealId");
        $response = get_json("deal/payments/$dealId");
        return response()->json($response);
    }
    public function delete($id)
    {
        $response = delete_json("deal/$id");
        return response()->json($response);
    }
    public function deleteMeeting($id)
    {
        $postData = ['id' => $id];
        return response()->json(put_json("deal/cancel/meeting", $postData));
    }
    public function deleteMeetingForBa()
    {
        $postdata = \Request::except('_token');
        $response = put_json("deal/cancel/meeting", $postdata);
        return redirect()->back()->with('msg', $response->message);
    }

    public function makeSchedule()
    {
        $postData = \Request::json()->all();
        $response = null;
        $response = post_json(DEAL_SCHEDULE, $postData);
        return response()->json($response);
    }
    public function scheduleDetail($id)
    {
        $response = get_json('deal/schedule/' . $id);
        return response()->json($response);
    }
    public function changeScheduleTime()
    {
        $postData = \Request::json()->all();
        $response = put_json("schedule/change-time-tour", $postData);
        return response()->json($response);
    }
    /**
     *
     * @param Int $id dealId
     * @return view
     */
    public function chat($id)
    {
        $deal = get_json(GET_DEAL_DETAIL . '/' . $id)->data;
        $viewData['deal'] = $deal;
        $viewData['currentActivePage'] = "chat";
        return view('deal.chat')->with($viewData);
    }
    /**
     *
     * @param Int $id dealId
     * @return view
     */
    public function order($id)
    {
        $deal = get_json(GET_DEAL_DETAIL . '/' . $id)->data;
        $response = get_json("order/lead/$deal->leadId");
        $viewData['deal'] = $deal;
        $viewData['order'] = $response->data;
        $viewData['currentActivePage'] = "order";
        //return response()->json($response);
        return view('deal.order-detail')->with($viewData);
    }
    public function getOrderResponseData()
    {
        $postData = \Request::json()->all();
        $response = post_json(ORDER_LIST_RESPONDED, $postData);
        return response()->json($response);
    }
    /**
     *
     * @param type $id dealId
     * @return view
     */
    public function events($id)
    {
        $deal = get_json(GET_DEAL_DETAIL . '/' . $id)->data;
        $viewData['deal'] = $deal;
        $viewData['types'] = get_json(EVENT_ITEMS . "/1")->data;
        $viewData['authors'] = get_json(EVENT_ITEMS . "/2")->data;
        $viewData['participants'] = get_json(EVENT_ITEMS . "/3")->data;
        $viewData['currentActivePage'] = "events";
        return view('deal.events')->with($viewData);
    }
    public function eventsData($id)
    {
        $requestData = \Request::input();
        $orderedColumns = array(
            '0' => 'typeName',
            '1' => 'time',
            '2' => 'createdDate',
            '3' => 'creater',
            '4' => 'participant',
            '5' => 'content',
            '6' => 'note',
            '7' => 'address'
        );
        $orders = \Request::input('order');
        $numberItem = 10;
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $postData = array(
            "leadId" => $requestData['leadId'],
            "dealId" => df_int($id),
            "sort" => array(
                'columnName' => $orders[0]['column'] ? $orderedColumns[$orders[0]['column'] . ''] : 'createdDate',
                'value' => $orders[0]['dir']
            ),
            "filter" => array()
        );
        if (!empty($requestData['TypeName']) && $requestData['TypeName'] != 'null') {
            $postData['filter'][] = array(
                'columnName' => 'TypeName',
                'value' => $requestData['TypeName']
            );
        }
        if (!empty($requestData['Creater']) && $requestData['Creater'] != 'null') {
            $postData['filter'][] = array(
                'columnName' => 'Creater',
                'value' => $requestData['Creater']
            );
        }
        if (!empty($requestData['Participant']) && $requestData['Participant'] != 'null') {
            $arrTemps = explode(',', $requestData['Participant']);
            $i = 0;
            foreach ($arrTemps as $str) {
                $arrTemps[$i++] = "'$str'";
            }
            $requestData['Participant'] = implode(',', $arrTemps);
            $postData['filter'][] = array(
                'columnName' => 'Participant',
                'value' => $requestData['Participant']
            );
        }
        if (!$postData['filter']) {
            $postData['filter'] = null;
        }
        if (!$postData['sort']) {
            $postData['sort'] = null;
        }
        //return response()->json($postData);
        $response = post_json(EVENT_LOGS . "/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }
    public function product($id)
    {
        $deal = get_json(GET_DEAL_DETAIL . '/' . $id)->data;
        $requestDetail = $deal->request;
        $viewData['deal'] = $deal;
        $viewData['request'] = $requestDetail;
        $viewData['currentActivePage'] = "product";
        $user = Session::get('user');
        $viewData['currentUserWebAccessToken'] = isset($user->socialUser) ? $user->socialUser->accessToken : "";
        //return response()->json($viewData);
        return view('deal.product')->with($viewData);
    }
    public function redirectAgentSite($basketId, $dealId)
    {
        $defineVariable = isset($_GET['type']) ? "leadId=$dealId&dealId=" : "leadId=&dealId=$dealId";
        $user = Session::get('user');
        $accessToken = isset($user->socialUser) ? $user->socialUser->accessToken : "";
        // transfer-collection?accessToken=a81cd64dc0b58f9fb98435373384ae366ce35260b423ce33e6a59159fc3961f7&basketId=2486&dealId=5382&dashboardAction=dashboard-basket-detail
        // $url = AGENT_SITE_URL . "?accessToken=$accessToken&basketId=$basketId&$defineVariable&dashboardAction=dashboard-basket-detail";
        // http://domain.com/transfer-collection?accessToken=a81cd64dc0b58f9fb98435373384ae366ce35260b423ce33e6a59159fc3961f7&basketId=2486&dealId=5382&dashboardAction=dashboard-basket-detail
        $url = AGENT_SITE_URL . "transfer-collection?accessToken=$accessToken&basketId=$basketId&$defineVariable&dashboardAction=dashboard-basket-detail";
        // return $url;
        return redirect($url);
    }
    public function productListingsData($id)
    {
        $type = \Request::input('type');
        $response = get_json(GET_DEAL_LISTINGS . "/$type/$id");
        if (!$response->data) {
            $response->data = [];
        }
        return response()->json($response);
    }
    public function sentListingsData($id)
    {
        $response = get_json(GET_DEAL_LISTINGS . "/sentmail/$id");
        if (!$response->data) {
            $response->data = [];
        }
        return response()->json($response);
    }
    public function customerSelectedListingsData($id)
    {
        $postData = array(
            "dealId" => $id,
        );
        $response = get_json(SELECT_DEAL_LISTING, $postData);
        if (!$response->data) {
            $response->data = [];
        }
        return response()->json($response);
    }
    /**
     *
     * @param type $id dealId
     * @return view
     */
    public function history($id)
    {
        $deal = get_json(GET_DEAL_DETAIL . '-new/' . $id)->data;
        $viewData['deal'] = $deal;
        $viewData['currentActivePage'] = "history";
        return view('deal.history')->with($viewData);
    }
    public function historyData($id)
    {
        $requestData = \Request::input();
        $numberItem = 10;
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $sortColumn = "createdDate";
        $orders = \Request::input("order");
        $postData = array(
            "leadId" => null,
            "dealId" => df_int($id),
            "type" => df_int(\Request::input('type', 0)),
            "sortColumn" => $sortColumn,
            "sortType" => $orders[0]['dir']
        );
        //return response()->json($postData);
        $response = post_json(REPORT_HISTORY . "/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }
    public function changeListingsStatus()
    {
        $postData = \Request::json()->all();
        $response = post_json('deal/listing/status', $postData);
        return response()->json($response);
    }
    public function requestFeedback()
    {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json(DEAL_REQUEST_FEEDBACK, $postData);
        return response()->json($response);
    }
    public function feedBacks($id = "")
    {
        if (!empty($id)) {
            $deal = get_json(GET_DEAL_DETAIL . '/' . $id)->data;
            $viewData['deal'] = $deal;
            $viewData['currentActivePage'] = "feedbacks";
        }
        $statusList = get_json(GET_DEAL_STATUS_LIST)->data;
        $viewData['statusList'] = $statusList;
        $amList = get_json(GET_ACCOUNT_LIST . '/8')->data;
        $viewData['amList'] = $amList;
        $tms = get_json(RESPONSIBLE_LIST)->data;
        $viewData['tms'] = $tms;
        $csList = get_json(GET_AGENT_LIST . "/5")->data;
        $viewData['csList'] = $csList;
        $viewData['dealId'] = $id;
        //return response()->json($viewData);
        return view('deal.feedbacks')->with($viewData);
    }
    /**
     *
     * @param type $id
     * @return type
     * {
     * "searchKeywords": "hoa",
     * "sortColumn": "tmName",
     * "sortType": "desc"
     * "tmName": '1,2,3,4,5,6',
     * "csName": '1,2,3,4,5,6',
     * "statusName": "1,2,3,4,5,6",
     * }
     */
    public function feedBacksData()
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeyWords = !empty($requestData['searchKeywords']) ? $requestData['searchKeywords'] : '';
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : null;
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 0;
        $sortColumn = !empty($requestData['columns']) ? $requestData['columns'][$sortColumnIndex]['data'] : null;
        $postData = array(
            "dealId" => !empty($requestData['dealId']) ? $requestData['dealId'] : null,
            "searchKeywords" => $searchKeyWords,
            "sortType" => $sortType,
            "sortColumn" => $sortColumn,
            "tmName" => !empty($requestData['tmName']) ? $requestData['tmName'] : null,
            "csName" => !empty($requestData['csName']) ? $requestData['csName'] : null,
            "statusName" => !empty($requestData['statusName']) ? $requestData['statusName'] : null,
        );
        //return response()->json($postData);
        $response = post_json(DEAL_FEEDBACKS . "/$page/10", $postData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'totalItems' => $response->data->totalItems
        );
        return response()->json($viewData);
    }
    public function feedbackResultDetail($id = "")
    {
        $response = get_json(DEAL_FEEDBACK . "/$id");
        //return response()->json($response);
        $viewData['feedback'] = $response->data;
        return view('deal/feedback-result-detail')->with($viewData);
    }
    public function tours()
    {
        return view('deal/tours');
    }
    public function toursData()
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $response = get_json("schedule/list/$page/10");
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'totalItems' => $response->data->totalItems
        );
        return response()->json($viewData);
    }
    public function latedStartedToursData()
    {
        return $this->getToursData(SCHEDULE_LATE_STARTED);
    }
    public function latedToursData()
    {
        return $this->getToursData(SCHEDULE_LATE);
    }
    public function getCancelToursData()
    {
        return $this->getToursData(SCHEDULE_CANCEL);
    }
    public function getGoingToursData()
    {
        return $this->getToursData(SCHEDULE_GOING);
    }
    public function getEndToursData()
    {
        return $this->getToursData(SCHEDULE_END);
    }
    public function getIncorrectLocation()
    {
        return $this->getToursData(SCHEDULE_WRONG_LOCATION);
    }
    public function getDetailEndToursData($id)
    {
        $response = get_json(SCHEDULE_DETAIL_END . "/$id");
        $viewData = array(
            'recordsTotal' => count($response->data),
            'recordsFiltered' => count($response->data),
            'data' => $response->data
        );
        return response()->json($viewData);
    }
    private function getToursData($api)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $postData = array('keySearch' => isset($requestData['keySearch']) ? $requestData['keySearch'] : null);
        $response = post_json($api . "/$page/10", $postData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'totalItems' => $response->data->totalItems
        );
        return response()->json($viewData);
    }
    public function solvedTour()
    {
        $postData = \Request::json()->all();
        $response = post_json('schedule/solved', $postData);
        return response()->json($response);
    }
    public function adminTours()
    {
        return view('deal/admin-tours');
    }
    /*
      public function adminToursData() {
      $requestData = \Request::input();
      $page = get_current_page($requestData);
      $response = get_json("schedule/list/$page/10");
      $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
      $viewData = array(
      'draw' => $draw,
      'recordsTotal' => $response->data->totalItems,
      'recordsFiltered' => $response->data->totalItems,
      'data' => $response->data->list,
      'totalItems' => $response->data->totalItems
      );
      return response()->json($viewData);
      }
     */
    public function schedulePing($id)
    {
        $response = get_json("schedule/ping/$id");
        return response()->json($response);
    }
    public function pingManager()
    {
        $postData = \Request::json()->all();
        $response = post_json('schedule/ping', $postData);
        return response()->json($response);
    }
    public function tour($id)
    {
        $read_deal_permission = post_json_user_role('permission/has-deal-read-permission', ["recordId" => $id])->data;
        if(!$read_deal_permission) {
            abort(401);
        }
        $schedule = get_json_agent_tour("schedule/$id")->data;
        $deal = get_json(GET_DEAL_DETAIL . '-new/' . $id)->data;
        $viewData['deal'] = $deal;
        $viewData['schedule'] = $schedule;
        $viewData['currentActivePage'] = "tour";
              
        $viewData['tourPermission'] = (object) array('update' => post_json_user_role('permission/has-tour-update-permission', ["recordId" => $id])->result, 'read' => post_json_user_role('permission/has-tour-read-permission', ["recordId" => $id])->result);
        $viewData['supportId'] = \Request::input("supportId") ? \Request::input("supportId") : null;

        $viewData['isTMUser'] = $this->isTmUserFn();

        return view('deal/tour')->with($viewData);
    }
    public function cancelSchedule()
    {
        $postData = \Request::json()->all();
        $response = post_json('schedule/cancel', $postData);
        return response()->json($response);
    }
    public function updateSchedule()
    {
        $postData = \Request::json()->all();
        $response = post_json('schedule/update', $postData);
        return response()->json($response);
    }
    public function scheduleFeedback($id, $type = 1)
    {
        //echo "$id, $type"; die();
        $response = get_json("schedule/question/$type/$id");
        return response()->json($response);
    }
    public function scheduleFeedbacks($id, $rlistingId = -1, $type = 1)
    {
        //echo "$id, $type"; die();
        //echo "schedule/questions/$type/$id/$rlistingId";
        $response = get_json("schedule/questions/$type/$id/$rlistingId");
        return response()->json($response);
    }
    public function getReport($type = null)
    {
        if (empty($type)) {
            return false;
        }
        $requestData = \Request::input();
        $postData = array('keySearch' => isset($requestData['keySearch']) ? $requestData['keySearch'] : null);
        $url = "";
        switch ($type) {
            case 'lated-start-for-tour':
                $url = "export/schedule/lated-start";
                break;
            case 'lated':
                $url = "export/schedule/late";
                break;
            case 'cancel':
                $url = "export/schedule/cancel";
                break;
            case 'incorrect-location':
                $url = "export/schedule/incorrect-location";
                break;
            default:
                break;
        }
        if (empty($url)) {
            return false;
        }
        $response = post_json($url, $postData);
        return response()->json($response);
    }
    public function findCrms()
    {
        $postData = \Request::json()->all();
        $response = post_json("user/crm/account/list", $postData);
        return response()->json($response);
    }
    public function createMeeting()
    {
        $postData = \Request::json()->all();
        // return response()->json($postData);
        $response = post_json("deal/meeting", $postData);
        return response()->json($response);
    }
    public function updateMeeting()
    {
        $postData = \Request::json()->all();
        // return response()->json($postData);
        if (isset($postData['type'])) {
            $response = put_json("crm/update-meeting", $postData);
        } else {
            $response = put_json("deal/meeting", $postData);
        }
        return response()->json($response);
    }
    public function changeMeetingStatus()
    {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json("deal/meeting/change-status", $postData);
        return response()->json($response);
    }
    public function meetingDetail($id)
    {
        $response = get_json("deal/meeting/$id");
        return response()->json($response);
    }
    public function getListingCartList()
    {
        $currentGroup = \Session::get('currentGroup');
        /*
          $postData = json_decode('{
          "leadId": 5308,
          "keySearch": "",
          "sortType": "asc",
          "sortColumn": "updatedDate"
          }');
          $response = post_json(CRM_LISTING_CART.'/1/500', $postData);
          return response()->json($response);
         */
        $postData = \Request::input();
        $leadId = $postData['leadId'] ? $postData['leadId'] : null;
        if (!$leadId) {
            $dealId = $postData['dealId'] ? $postData['dealId'] : null;
            $deal = get_json(GET_DEAL_DETAIL . '/' . $dealId)->data;
            $leadId = $deal->leadId;
        }
        $keySearch = '';
        $sortType = 'desc';
        $sortColumn = 'rlistingId';
        ////////////////////////////////////////
        $numberItem = 10000;
        $draw = isset($postData['draw']) ? $postData['draw'] : 1;
        $page = get_current_page($postData);
        $sortType = isset($postData['order']) ? $postData['order'][0]['dir'] : null;
        $sortColumnIndex = isset($postData['order']) ? $postData['order'][0]['column'] : 0;
        $sortColumn = !empty($postData['columns']) ? $postData['columns'][$sortColumnIndex]['data'] : null;
        switch ($sortColumn) {
            case 'formatPrice':
                $sortColumn = 'price';
                break;
            case 'licensePhotos':
                $sortColumn = 'pinkBook';
                break;
            case 'formatSize':
                $sortColumn = 'floorSize';
                break;
            case 'sourceBy':
                $sortColumn = 'userTypeId';
                break;
            case 'districtName':
                $sortColumn = 'districtId';
                break;
            case 'wardName':
                $sortColumn = 'wardId';
                break;
            case 'directionName':
                $sortColumn = 'directionId';
                break;
            case 'incompatible':
            case 'licensePhotos':
            case 'sourceAdd':
                $sortColumn = 'rlistingId';
                break;
        }
        $requestData = array(
            'leadId' => df_int($leadId),
            'keySearch' => $keySearch,
            'sortType' => $sortType,
            'sortColumn' => $sortColumn,
        );
        $response = post_json(CRM_LISTING_CART . '/' . $page . '/' . $numberItem, $requestData);
        $viewDataTable = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'basketId' => $response->data->basketId
        );
        return response()->json($viewDataTable);
    }
    public function transferPs()
    {
        $postData = \Request::input();
        $services = array();
        foreach ($postData['services'] as $id => $service) {
            $services[] = array(
                'id' => df_int($id),
                'name' => $service,
            );
        }
        $rlistingId = !empty($postData['rlistingIdsToPS']) ? df_int($postData['rlistingIdsToPS']) : null;
        $requestData = array(
            "rlistingId" => $rlistingId,
            "content" => $postData['content'],
            "dealId" => df_int($postData['dealId']),
            "services" => $services,
        );
        $response = post_json('crm/transfer-to-ps', $requestData);
        return response()->json($response);
    }
    public function getListServiceType()
    {
        $rlistingId = \Request::input("rlistingId");
        $apiUrl = str_replace("{rlistingId}", $rlistingId, LISTING_SERVICES);
        $response = get_json($apiUrl);
        $services = array();
        if ($response->result) {
            foreach ($response->data as $service) {
                $services[] = array('id' => $service->typeId, 'name' => $service->name);
            }
        }
        return response()->json(array('result' => true, 'data' => $services));
    }
    public function getLogForListing($rlistingId)
    {
        $requestData = \Request::input();
        $numberItem = 10;
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = get_json(LISTING_LOG . '/' . $rlistingId . '/' . $page . '/' . $numberItem);
        if ($response->data) {
            $listings = $response->data;
            $viewData = array();
            foreach ($listings->list as $listing) {
                $createdDate = date('H:i:s d-m-Y', $listing->createdDate / 1000);
                $customerFeedback = "N/A";
                $investigate = "N/A";
                if ($listing->type != 'updateNoteOfStaff') {
                    if ($listing->customerFeedback == true) {
                        $customerFeedback = 'Thích';
                    } else {
                        $customerFeedback = 'Không thích';
                    }
                    if ($listing->investigate == '1') {
                        $investigate = 'Có';
                    } else {
                        $investigate = 'Không';
                    }
                }
                $item = array(
                    'type' => $listing->type,
                    'createdDate' => $createdDate,
                    'typeName' => $listing->typeName,
                    'name' => $listing->userName,
                    'reason' => $listing->reason,
                    'investigate' => $investigate,
                    'customerFeedback' => $customerFeedback,
                );
                if ($listing->type == 'feedbackOfCustomer') {
                    $item["reason"] .= "<label>Lý do: </label>" . $listing->reason . "</div>";
                }
                $viewData[] = $item;
            }
            $viewDataTable = array(
                'draw' => $draw,
                'recordsTotal' => $listings->totalItems,
                'recordsFiltered' => $listings->totalItems,
                'data' => $viewData,
            );
            return response()->json($viewDataTable);
        }
        return response()->json(array(
            'draw' => $draw,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => [],
        ));
    }
    public function customerCartData()
    {
        $request = \Request::all();
        $numberItem = 10000;
        $page = get_current_page($request);
        $draw = isset($request['draw']) ? $request['draw'] : 1;
        $postData = array(
            "leadId" => !empty($request["leadId"]) ? df_int($request["leadId"]) : null,
            "dealId" => !empty($request["dealId"]) ? df_int($request["dealId"]) : null,
            "typeListing" => 'liked',
            "sort" => null,
            "rListingIdsExistsInTour" => !empty($request["listingIds"]) ? $request["listingIds"] : [],
            // add filter listing: filterInCart
            "logicRequirements" => ['filterInCart']
        );

         // convert rListingIdsExistsInTour from string[] to number[]
        if ($postData['rListingIdsExistsInTour']) {
            $rlistingIdCount = count($postData['rListingIdsExistsInTour']);
            for ($i = 0; $i < $rlistingIdCount; $i++) {
                $postData['rListingIdsExistsInTour'][$i] = df_int($postData['rListingIdsExistsInTour'][$i]);
            }
        }

        $response = (object) [];
        $response->data = post_json("/listing/deal-lead/" . $page . "/10000", $postData)->data;

        $dataList = $response->data->list;
        foreach ($dataList as $key => $value) {
            $array = (array) $value;
            $keys = array_keys($array);
            if ($array['isMarked'] == true) {
                $array['virtualStatus'] .= ' <i style="color:red" class="fa fa-exclamation" aria-hidden="true"></i>';
            }
            foreach ($keys as $k) {
                if ($array[$k] === null) {
                    $array[$k] = "NA";
                }
            }
            $dataList[$key] = (object) $array;
        }
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $dataList,
        );
        return response()->json($viewData);
    }
    public function sentEmailListingsData()
    {
        $request = \Request::input();
        $numberItem = 10000;
        $page = get_current_page($request);
        $draw = isset($request['draw']) ? $request['draw'] : 1;
        $postData = [
            "leadId" => !empty($request["leadId"]) ? df_int($request["leadId"]) : null,
            "dealId" => !empty($request["dealId"]) ? df_int($request["dealId"]) : null,
            "scheduleId" => !empty($request["scheduleId"]) ? df_int($request["scheduleId"]) : null,
        ];
        $response = post_json("deal/listing/sent-mail/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
        );
        return response()->json($viewData);
    }
    public function visitedListings()
    {
        $request = \Request::input();
        $numberItem = 10000;
        $page = get_current_page($request);
        $draw = isset($request['draw']) ? $request['draw'] : 1;
        $postData = [
            "dealId" => !empty($request["dealId"]) ? df_int($request["dealId"]) : null,
            "sortType" => "desc",
            "sortColumn" => "scheduleTime"
        ];
        $response = post_json("deal/listing/visited/$page/$numberItem", $postData);
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
        );
        return response()->json($viewData);
    }
    public function addListingsToCustomerCart()
    {
        $postData = \Request::json()->all();
        $response = post_json("crm/add-listing-to-cart-customer", $postData);
        return response()->json($response);
    }
    public function addListingsToSchedule()
    {
        $postData = \Request::json()->all();
        $response = post_json("schedule/listing/add", $postData);
        return response()->json($response);
    }
    public function searchListingHistory($id)
    {
        // $response = get_json(GET_DEAL_DETAIL . '/' . $id);
        // return response()->json($response);
    }
    public function searchListingsResultOverView()
    {
        $filterData = \Request::json()->all();
        $page = 1;
        $numberItem = 10000;
        $response = post_json("listing/overview-listing-search/$page/$numberItem", $filterData);
        return response()->json($response);
    }
    public function searchListingsRecentTransactions()
    {
        $requestData = \Request::input();
        $filterData = \Request::json()->all();
        $draw = isset($request['draw']) ? $request['draw'] : 1;
        $page = get_current_page($filterData);
        $numberItem = 10000;
        $filterData['toDate'] = $requestData['toDate'];
        $filterData['fromDate'] = $requestData['fromDate'];
        $response = post_json("listing/lastest-transaction-listing/$page/$numberItem", $filterData);
        if ($response->data && $response->data->totalItems) {
            $viewData = array(
                'draw' => $draw,
                'recordsTotal' => $response->data->totalItems,
                'recordsFiltered' => $response->data->totalItems,
                'data' => $response->data->list,
            );

            return response()->json($viewData);
        }

        return response()->json($response);
    }
    public function addCustomerPhoneOrEmail()
    {
        $postData = \Request::json()->all();
        $response = post_json("customer/create-phone-or-email", $postData);
        return response()->json($response);
    }
    public function searchCustomerByPhone()
    {
        $phone = \Request::input('phone');
        $response = get_json(SEARCH_CUSTOMER_BY_PHONE . '/' . $phone);
        return response()->json($response);
    }

    function stripVN($str)
    {
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
        $str = preg_replace("/(đ)/", 'd', $str);

        $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
        $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
        $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
        $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
        $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
        $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
        $str = preg_replace("/(Đ)/", 'D', $str);
        return $str;
    }

    public function getSmsTemplate()
    {
        $type = \Request::input("type");
        $viewData["type"] = $type;
        if ($type == 1) {
            $isDeal = 0;
            $id = null;
            if (!empty(\Request::input("dealId"))) {
                $id = \Request::input("dealId");
                $isDeal = 1;
            } else {
                $id = \Request::input("leadId");
                $isDeal = 0;
            }
            $rlistingIds = \Request::input("rlistingIds");
            $postData = [
                "id" => df_int($id),
                "isDeal" => $isDeal,
                "rlistingIds" => $rlistingIds
            ];
            $response = post_json("customer/email-and-phone-by-lead-deal", $postData);
            $viewData['code'] = $response->result ? $response->data->code : NULL;
        }
        $currentUser = \Session::get('user');

        $currentUser->voipId = $currentUser->voipId != null ? $currentUser->voipId : 'N/A';
        $currentUser->phone = $currentUser->phone != null ? $currentUser->phone : 'N/A';
        // $currentUser->name = $currentUser->name != null ? $currentUser->name : 'N/A';
        // $viewData['lastMsg'] = "(028)73066099 nhan " . $currentUser->voipId . " hoac " . $currentUser->phone . " gap " . $currentUser->name . ".";

        $string = $currentUser->name;
        $pieces = explode(' ', $string);
        $last_word_name = array_pop($pieces);
        $last_word_name = $last_word_name ? $last_word_name : "N/A";

        $viewData['lastMsg'] = "*4663 nhan phim " . $currentUser->voipId . " hoac " . $currentUser->phone . " gap " . $this->stripVN($last_word_name) . ".";
        // return response()->json($currentUser);
        return view('deal.sms-template')->with($viewData);
    }
    public function sendSms()
    {
        $postData = \Request::json()->all();
        $response = post_json("customer/send-sms", $postData);
        return response()->json($response);
    }
    public function sendNegotiate()
    {
        $postData = \Request::json()->all();
        if (isset($postData['negotiationId']))
            $response = put_json("deal/negotiation", $postData);
        else
            $response = post_json("deal/negotiation", $postData);
        return response()->json($response);
    }
    public function sendDeposit()
    {
        $postData = \Request::json()->all();
        if (isset($postData['depositId']) && $postData['depositId'])
            $response = put_json("deal/deposit", $postData);
        else
            $response = post_json("deal/deposit", $postData);
        return response()->json($response);
    }
    public function getListReason()
    {
        $response = get_json($this->API['unlock-reasons']);

        return response()->json($response);
    }
    public function getListClonedReasons()
    {
        $postData = \Request::json()->all();
        $response = get_json($this->API['list-cloned-reasons'] . '/' . $postData['reasonType']);

        return response()->json($response);
    }
    public function unlockDealLead()
    {
        $postData = \Request::json()->all();

        $response = post_json($this->API['unlock-deal-lead'], $postData);
        return response()->json($response);
    }
    public function deleteListing()
    {
        $postData = \Request::input();
        $response = post_json("basket/remove-listings", $postData);
        return response()->json($response);
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
    public function changeStatusNegotate()
    {
        $postData = \Request::json()->all();
        $response = post_json("deal/negotiation/change-status", $postData);
        return response()->json($response);
    }
    public  function closeDeposit()
    {
        $postData = \Request::json()->all();
        $response = post_json("deal/deposit/cancel", $postData);
        return response()->json($response);
    }
    public  function finishDeposit()
    {
        $postData = \Request::json()->all();
        $response = post_json("deal/deposit/done", $postData);
        return response()->json($response);
    }
    public  function setDeposit()
    {
        $postData = \Request::json()->all();
        $response = post_json("deal/deposit/calendar", $postData);
        return response()->json($response);
    }
    public  function lastNegotiation($dealId, $rlistingId)
    {
        $response = get_json("deal/last-negotiation/" . $dealId . "/" . $rlistingId);
        return response()->json($response);
    }
    public  function closeDeal($dealId)
    {
        $postData = \Request::json()->all();
        $response = post_json("deal/close/" . $dealId, $postData);
        return response()->json($response);
    }
    public  function typeDeal()
    {
        $postData = \Request::json()->all();
        $response = put_json("deal/closed-by", $postData);
        return response()->json($response);
    }
    public  function getQuestionDepositByGroup($id)
    {
        $response = get_json("deal/deposit/form/" . $id);
        $result = array(
            'error' => false,
            'content' => ''
        );
        if ($response->result) {
            $viewData['list_question'] = $response->data;
            $view = view('deal.list-question')->with($viewData);
            $result['content'] = $view->render();
        } else {
            $result['error'] = true;
            $result['content'] = 'Đã có lỗi từ server';
        }
        return response()->json($result);
    }
    public function updateContract()
    {
        $postData = \Request::json()->all();
        $resp = post_json('deal/set-contract', $postData);
        return \response()->json($resp);
    }
    public function saveChangeCardType()
    {
        $postData = \Request::json()->all();
        $resp = put_json("deal/scorecard", $postData);
        return \response()->json($resp);
    }
    public function getBookTourTime()
    {
        $postData = \Request::json()->all();
        $resp = post_json_agent_tour("schedule-processed/schedule/get-day-schedules-by-customer", $postData);
        return \response()->json($resp);
    }

    /**
     * Get collected money deal modal details
     * @param depositeId
     * @Author: thu.tran@propzy.com
     * @Date 2020/08/06
     */
    public function getCollectedMoneyDetails()
    {
        $depositeId = \Request::input('depositeid');
        $url = 'bsa/deal-deposit-collect/' . $depositeId;
        $result = get_json($url);
        return \response()->json($result);
    }

    /**
     * Post collected money action
     */
    public function postBsaMoneyCollect()
    {
        $postData = \Request::all();
        $url = 'bsa/deal-deposit-collect';
        $result = post_json($url, $postData);
        return \response()->json($result);
    }

    public function checkDuplicatedTour()
    {
        $postData = \Request::json()->all();
        $response = post_json_agent_tour('schedule-processed/schedule/check-time-duplicate', $postData);
        return response()->json($response);
    }

    public function getDuplicatedTourList()
    {
        $postData = \Request::json()->all();    
        // var_dump((object) $postData['addional']);
        $response = post_json_agent_tour('schedule-processed/schedule/cs-deal-duplicate-time', $postData['main']);
        $viewData['detail'] = (object) array('listing' => $response->data, 'info' => (object) $postData['addional']);

        $returnHTML = view('deal.same-tours-details')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    public function getAssignUserList()
    {
        $response = get_json_agent_tour('user/active');
        return response()->json($response);
    }

    public function assignTour()
    {
        $postData = \Request::json()->all();
        $response = put_json_agent_tour('schedule/assign', $postData);
        return response()->json($response);
    }

    public function isTmUserFn()
    {
        $data = Session::get("user");
        return isset($data->departmentIds) && array_search(5,$data->departmentIds) !== false;
    }


    public function isTmUser()
    {
        $data = Session::get("user");
        return response()->json((object) array('data' => $this->isTmUserFn()));
    }

    public function getCurrentUserId()
    {
        return response()->json((object) array('data' => Session::get("user")->userId));
    }
}
