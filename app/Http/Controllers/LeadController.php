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
use App\Repositories\API\RepositoriesFactory;
use App\Repositories\API\LeadRepository;
use App\Repositories\API\CommonsRepository;

class LeadController extends BaseController
{
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

    public function getListMatchedTabs()
    {
        $data = get_json_search_listing(GET_LIST_MATCHED_TABS_LEAD)->data->tabConfiguration;

        return response()->json($data);
    }

    public function generateFilterDealButton()
    {
        $requestData = \Request::input();
        if (count($requestData) > 0) {
            if (empty($requestData['assignes'])) {
                $requestData['assignes'] = null;
            }
            $apiDealButtonsResponse = post_json(GET_LEAD_GROUP_STATUS, $requestData);
            //             return response()->json($requestData);
        } else {
            $apiDealButtonsResponse = post_json(GET_LEAD_GROUP_STATUS, (object) ['fromDate' => null, 'toDate' => null]);
        }
        if (in_array($apiDealButtonsResponse->code, [401, 403, 404, 503])) {
            abort($apiDealButtonsResponse->code);
        }
        if (count($requestData) > 0) {
            $viewData['lead_buttons'] = $apiDealButtonsResponse->data;
            $returnHTML = view('shared.group-button-lead')->with($viewData)->render();
            return response()->json($returnHTML);
        } else {
            return $dealButtons = $apiDealButtonsResponse->data;
        }
    }
    public function getList()
    {
        $viewData['lead_buttons'] = $this->generateFilterDealButton();
        $viewData['isGroupAdmin'] = $this->isCurrentAdmin();
        return view('lead.list')->with($viewData);
    }
    public function getListLead($statusId)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : null;
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $searchKeyWords = $requestData['search']['value'];
        $postData = array(
            'sortColumn' => !empty($sortColumn) ? $sortColumn : "createdDate",
            'sortType' => $sortType,
            "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
        );
        //return response()->json($postData);
        $post_data = array("searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null));
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
        if (!empty($requestData['assignedTos'])) {
            $postData["assignes"] = $requestData['assignedTos'];
        }
        // new update
        if (!empty($requestData['listingTypeId'])) {
            $postData["listingTypeId"] = $requestData['listingTypeId'];
        }
        if (!empty($requestData['propertyTypeId'])) {
            $postData["propertyTypeId"] = $requestData['propertyTypeId'];
        }
        $limit = $requestData['length'];
        $data = post_json(GET_LEAD_LIST_INDIVIDUAL . "/" . $statusId . "/" . $page . "/" . $limit, $postData)->data;
        // return response()->json( $postData );
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }
    public function create()
    {
        $statusList = get_json(GET_REQUEST_STATUS_LIST)->data;
        $agents = get_json(GET_AGENT_LIST . '/-1')->data;
        $propertyTypes = get_json(GET_PROPERTY_TYPE_LIST);
        $districts = get_json(GET_DISTRICTS . '/1');
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $customerId = get_json(sprintf(GENERATE_CUSTOMER_ID, $subjects[0]->subjectId))->data->customerId;
        $accounts = get_json(USER_RESPONSIBLES)->data;
        //return response()->json(\Session::get('user'));
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
        return view('lead.create')->with($viewData);
    }
    public static function renderWards($wardsList, $districtsList)
    {
        // return response()->json($wardsList);
        $groupByDistrict = [];
        foreach ($wardsList as $key => $value) {
            $groupByDistrict[$value->districtName . '-' . $value->districtId][] = $value;
        }
        // return $groupByDistrict;
        $html = '';
        foreach ($groupByDistrict as $key => $value) {
            $nameDistrict = explode('-', $key)[0];
            $idDistrict = explode('-', $key)[1];
            $html .= '<input class="idDistrict" type="hidden" value="' . $idDistrict . '"><div districtname="' . $nameDistrict . '" class="col-md-6"><h5 style="text-align: center;background-color: darkgray;color: white;font-weight: bold;margin-bottom: 0px;">' . $nameDistrict . '</h5><select class="wardIds" id="wardId' . $idDistrict . '" name="wardIds[]" multiple="multiple"">';
            $wardList = CommonController::getWardStatic($idDistrict);
            // $wardList = json_decode($wardList);
            foreach ($wardList as $k => $v) {
                $selected = "";
                foreach ($value as $select) {
                    if (isset($select->id)) {
                        if ($v->wardId == $select->id) {
                            $selected = "selected='selected'";
                        }
                    } else {
                        if ($v->wardId == $select->wardId) {
                            $selected = "selected='selected'";
                        }
                    }
                }
                $html .= '<option ' . $selected . '  value="' . $v->wardId . '">' . $v->wardName . '</option>';
            }
            $html .= '</select></div>';
        }
        return $html;
    }
    public function update(Request $request, $id)
    {
        $lead = get_json(GET_LEAD_DETAIL . '-new/' . $id);
        if (in_array($lead->code, [401, 403])) {
            abort($lead->code);
        }
        $lead = $lead->data;
        $lead->positionListRender = [];
        $positionList = $lead->positionList;
        if (count($positionList) > 0) {
            foreach ($positionList as $k => $v) {
                if ($v->positionId == 1) {
                    $lead->positionListRender['matTien'] = $v;
                } else {
                    $lead->positionListRender['hem'] = $v;
                }
            }
        }
        $viewData['meetingReason'] = get_json('/lead-deal-type/3')->data;
        $viewData['wardsHtml'] = $this->renderWards($lead->wardsList, $lead->districtsList);
        $historyId = $request->input("historyId");
        if (!empty($historyId)) {
            $history = get_json(LEAD_HISTORIES . "/$historyId");
            if ($history->result) {
                $lead->request = $history->data;
            }
        }
        get_json(LEAD_UPDATE_ACTIVATED . '/' . $id);
        $statusList = get_json(GET_LEAD_STATUS_LIST)->data;
        $agents = get_json(GET_AGENT_LIST . '/-1')->data;
        $propertyTypes = get_json(GET_PROPERTY_TYPE_LIST . '/' . $lead->listingTypeId);
        $districts = get_json(GET_DISTRICTS . '/1')->data;
        $chanels = get_json('channel-type/4')->data;
        $sources = get_json(GET_REQUEST_SOURCE_LIST)->data;
        $subjects = get_json(GET_REQUEST_SUBJECT_LIST)->data;
        $customerId = get_json(sprintf(GENERATE_CUSTOMER_ID, $subjects[0]->subjectId))->data->customerId;
        $accounts = post_json(USER_RESPONSIBLES, [
            "leadId" => $id
        ])->data;
        $directions = get_json(GET_DIRECTIONS)->data;
        $amenities = array();
        if (!empty($lead->listingTypeId)) {
            $amenities = CommonsRepository::getAmenitiesByListingType($lead->listingTypeId)->data[0]->list;
        }
        $currentDistricts = array();
        $isPreferedDistrict = -1;
        foreach ($lead->districtsList as $myDistrict) {
            $currentDistricts[] = $myDistrict->id;
            if ($myDistrict->isPrefered) {
                $isPreferedDistrict = $myDistrict->id;
            }
        }
        $isPreferedWard = -1;
        foreach ($lead->wardsList as $myWard) {
            if ($myWard->isPrefered) {
                $isPreferedWard = $myWard->id;
            }
        }
        $currentDirections = array();
        $isPreferedDirection = -1;
        if ($lead->directionsList) {
            foreach ($lead->directionsList as $direction) {
                $currentDirections[] = $direction->id;
                if ($direction->isPrefered) {
                    $isPreferedDirection = $direction->id;
                }
            }
        }
        $banks = get_json("/bank/list-new/-1");
        $servicePackages = get_json("channel-sub-type/4000") -> data;
        
        $viewData['isPreferedDirection'] = $isPreferedDirection;
        $viewData['currentDirections'] = $currentDirections;
        $viewData['directions'] = $directions;
        $currentAmenities = array();
        if ($lead->amenitiesList) {
            foreach ($lead->amenitiesList as $myAmenity) {
                $currentAmenities[] = $myAmenity->id;
            }
        }
        $viewData['lead'] = $lead;
        $viewData['statusList'] = $statusList;
        $viewData['agents'] = $agents;
        $viewData['propertyTypes'] = $propertyTypes;
        $viewData['districts'] = $districts;
        $viewData['sources'] = $sources;
        $viewData['chanels'] = $chanels;
        $viewData['subjects'] = $subjects;
        $viewData['customerId'] = $customerId;
        $viewData['accounts'] = $accounts;
        $viewData['userId'] = \Session::get('user')->userId;
        $viewData['userName'] = \Session::get('user')->name;
        $viewData['isPreferedDistrict'] = $isPreferedDistrict;
        $viewData['isPreferedWard'] = $isPreferedWard;
        $viewData['currentDistricts'] = $currentDistricts;
        $viewData['amenities'] = $amenities;
        $viewData['currentAmenities'] = $currentAmenities;
        $viewData['dealTypes'] = get_json("deal/types")->data;
        $sales = get_json(GET_AGENT_SALE_LIST)->data;
        $viewData['sales'] = $sales;
        $viewData['currentActivePage'] = "detail";
        $viewData['reportMeetingToTmTypes'] = [
            1 => "Generate please",
            2 => "Reschedule please"
        ];
        $viewData['positions'] = CommonsRepository::getPositions();
        $viewData['alleys'] = CommonsRepository::getAlleys();
        $viewData['alleyTypes'] = CommonsRepository::getAlleyTypes();
        $viewData['roadFrontageDistances'] = CommonsRepository::getRoadFrontageDistances();
        $viewData['purposeList'] = join(';', PropzyCommons::getPurposeIdFromDetail(json_decode(json_encode($lead->customerPurpose), true)));
        $viewData['banks'] = $banks;
        $viewData['servicePackages'] = $servicePackages;
                
        return view('lead.update')->with($viewData);
    }
    public function listingEmail($leadId)
    {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $searchKeywords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "leadId" => $leadId,
            "typeListing" => $requestData['typeListing'],
            "sort" => array(
                "columnName" => $sortColumn,
                "value" => $sortType
            )
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
        $data = post_json("/listing/deal-lead/" . $page . "/10", $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
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
        $viewData = array(
            'filterSorts' => $data->filterSorts,
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $dataList
        );
        return response()->json($viewData);
    }
    public function requestsByIdCustomer($idCustomer)
    {
        $postData = array(
            'customerId' => $idCustomer,
            'typeName' => 'lead'
        );
        $url = 'customer/get-all-need';
        return $response = post_json($url, (object) $postData)->data;
    }
    // public function leadDealById($type, $id)
    // {
    //     $url = "";
    //     switch ($type) {
    //         case 'lead':
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
        // $resp_json = get_json(GET_WARD_LIST . "/" . $districtsID);
        // $resp_json = $resp_json->data;
        $resp_json = $this->getWardsFromFormData($active_wards,$districtsID);
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
            $lead = get_json(GET_LEAD_DETAIL . '-new/' . $id)->data;
        } else {
            $lead = $data;
        }
        $requestsByIdCustomer = $this->requestsByIdCustomer($lead->customers->customerId);
        $leadDealDetail = $lead;
        $dataPostForGetListing = ["leadId", "assignedTo", "positionList", "listingTypeId", "propertyTypeId", "statusId", "statusName", "progressId", "sourceId", "sourceName", "subjectId", "subjectName", "responsiveness", "initialBudget", "finalBudget", "minSize", "maxSize", "bedRooms", "bathRooms", "districtsList", "wardsList", "directionsList", "formatFilterParams"];
        $postData = [];
        foreach ($dataPostForGetListing as $key => $value) {
            $postData[$value] = $leadDealDetail->$value;
        }
        $dataPostCustomSearch = [];
        foreach ($dataPostForGetListing as $key => $value) {
            $dataPostCustomSearch[$value] = $leadDealDetail->$value;
        }
        unset($dataPostCustomSearch['formatFilterParams']->isAdditional);
        // return $dataPostCustomSearch;
        // return $dataPostCustomSearch['formatFilterParams'];
        // return response()->json($dataPostCustomSearch['formatFilterParams']);
        $dataPostCustomSearch['filterParams'] = $dataPostCustomSearch['formatFilterParams'];
        unset($dataPostCustomSearch['formatFilterParams']);
        $viewData['LISTING_CUSTOM_SEARCH'] = $dataPostCustomSearch;
        $response = post_json(LISTING_CUSTOM_SEARCH_VERSION_MATCHING, (object) $dataPostCustomSearch);
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
                            </div> ';
            // $formdatahistory->positionsList = [1,2];
            // if (!empty($formdatahistory->positionsList)) {
            //     $CRM_JM_privateListing .= '<div class="row">
            //                     <div class="col-md-2"><b>Vị trí</b></div>
            //                     <div class="col-md-10">
            //                         <div class="row">
            //                           <div class="col-md-4">
            //                               <div class="checkbox">
            //                                 <label style="">
            //                                   <input class="positionsList" '.(in_array(2, $formdatahistory->positionsList) ? 'checked' : '' ).' name="positionsList" value="2" type="checkbox" > Hẻm
            //                                 </label>
            //                               </div>
            //                           </div>
            //                           <div class="col-md-4">
            //                               <div class="checkbox">
            //                                 <label style="">
            //                                   <input class="positionsList" '.(in_array(1, $formdatahistory->positionsList) ? "checked" : "" ).' name="positionsList" value="1" type="checkbox"> Mặt tiền
            //                                 </label>
            //                               </div>
            //                           </div>
            //                         </div>
            //                     </div>
            //                 </div>';
            // }else{
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
        unset($postData['formatFilterParams']);
        if ($type == 'form') {
            return [
                "htmlForm" => $form_custom_search,
                "requestsByIdCustomer" => $requestsByIdCustomer
            ];
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
        $data = get_json("/listing/search/lead/" . $id . "/reset/" . $requestData['type']);
        return response()->json($data);
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
                $postData['filterParams'] = (object)['classifyList' => json_decode($requestData['classifyList'])];
            } else {
                $postData['filterParams']->classifyList = json_decode($requestData['classifyList']);
            }
        }
        if (isset($requestData['isOwner'])) {
            if ($postData['filterParams'] == null) {
                $postData['filterParams'] = (object)['isOwner' => $requestData['isOwner']];
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
            // return response()->json($postData);
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
        // $postData['fromTo'] = $fromTo;
        // return response()->json($requestData);
        //$data = post_json(SEARCH_LISTING_V2 . "/" . $page . "/10", $postData);
        // $data = post_json_search_listing(SEARCH_LISTING_V2 . '/' . $page . '/10', $postData);

        $currentUser = \Session::get('user');
        $postData['currentUserId'] = $currentUser->userId;

        if(empty($requestData['initSearch'])){
            $data = post_json_search_listing('listing/filter/' . $page . '/10', $postData);
        }else{
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
        $dataFilter = get_json_search_listing(FILTER_LISTING, null);
        // \ render NA when null
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
        //     return response()->json($requestData);
        // }
        return response()->json($viewData);
    }
    public function proccessSlideNeedList($id, $needList)
    {
        // needList: [
        //     {
        //     id: 8557,
        //     typeName: "lead",
        //     createdDate: 1507017386000,
        //     primary: true
        //     }
        // ]
        if (count($needList) == 1 && $needList[0]->id == $id || count($needList) == 0) { // trường hợp happy case (chỉ có 1 nhu cầu)
            return '<h2 class="title-with-line"><span>THÔNG TIN NHU CẦU</span></h2>';
        } else {
            $needListFilterId = [];
            foreach ($needList as $key => $value) {
                if ($value->typeName == 'lead') {
                    $needListFilterId[] = $value->id;
                }
            }
            $key = array_search($id, $needListFilterId);
            $offset = array_search($key, array_keys($needListFilterId)) + 1;
            if ($offset == 1 && $offset < count($needListFilterId)) {
                return '<h2 class="title-with-line"><span>THÔNG TIN NHU CẦU&nbsp;<a href="/lead/detail/' . $needListFilterId[$offset] . '"><i class="fa fa-chevron-right"></i></a></span></h2>';
            } elseif ($offset > 1 && $offset < count($needListFilterId)) {
                // hiện cả 2 bên
                return '<h2 class="title-with-line"><span><a href="/lead/detail/' . $needListFilterId[$offset - 2] . '"><i class="fa fa-chevron-left"></i></a>&nbsp;THÔNG TIN NHU CẦU&nbsp;<a href="/lead/detail/' . $needListFilterId[$offset] . '"><i class="fa fa-chevron-right"></i></a></span></h2>';
            } else {
                // hiện bên trái
                return '<h2 class="title-with-line"><span><a href="/lead/detail/' . $needListFilterId[$offset - 2] . '"><i class="fa fa-chevron-left"></i></a>&nbsp;THÔNG TIN NHU CẦU</span></h2>';
            }
        }
    }
    public function meetingNotCreated()
    {
        $requestData = \Request::except('_token');
        // return response()->json($requestData);
        $data = post_json('deal/meeting-not-created', $requestData);
        return redirect()->back()->with('message', $data->message);
    }
    // detail dev by Jack small
    public function detail(Request $request, $id)
    {
        $viewData['lead'] = (object) ['leadId' => $id];
        $viewData['currentActivePage'] = "detail";
        $lead = get_json(GET_LEAD_DETAIL . '-new/' . $id);        
        if(isset($lead->code) && in_array($lead->code, [401, 403])) {
            abort($lead->code);
        }
        $lead = $lead->data;
        $currentUser = \Session::get('user');
        $viewData['currentUserName'] = $currentUser->name;
        $need_active = get_json("/customer/need-active/" . $lead->customers->customerId)->data;
        // lọc nếu có nhiều lead thì check xem có lead nào chưa hoàn thành đánh giá khách hàng không. Nếu có lead chưa đánh giá khách hàng thì không cho tạo meeting và thông báo ở view leadid dẫn về lead detail đó để hoàn thành form DGKH rồi mới cho chuyển
        // $lead->crmAssignedList = [
        //     (object) [
        //         "userId" => 126,
        //         "name" => "Trí Võ",
        //     ]
        // ];
        $filterDGKH = true;
        if (count($need_active) > 0) {
            foreach ($need_active as $key => $filterFlag) {
                if (!$filterFlag->questionFrom) {
                    $filterDGKH = !$filterDGKH;
                    break;
                }
            }
        }
        $viewData['filterDGKH'] = $filterDGKH;
        $viewData['need_active'] = $need_active;
        // return response()->json($lead);
        if (!empty($lead->dealId)) {
            if ($currentUser->userId == $lead->crmAssignedList[0]->userId) {
                return redirect()->to('/deal/detail/' . $lead->dealId);
            }
        }
        get_json(LEAD_UPDATE_ACTIVATED . '/' . $id);
        // $viewData['meetingReason'] = get_json('/lead-deal-type/3')->data;
        // $viewData["cancelReasons"] = get_json('cancel-reason/list')->data;
        
        $_generateDataPostForCustomsearchSearch = $this->generateDataPostForCustomsearchSearch($lead->leadId, 'form', $lead);
        $viewData['form_custom_search'] = $_generateDataPostForCustomsearchSearch["htmlForm"];
        $requestsByIdCustomer = $_generateDataPostForCustomsearchSearch["requestsByIdCustomer"];
        $viewData['neadListTitle'] = $this->proccessSlideNeedList($lead->leadId, $requestsByIdCustomer->needList);
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
        // $viewData['leadDealDetail'] = $requestsByIdCustomer->needList;
        $viewData['neadList'] = $requestsByIdCustomer->needList;
        // return $lead->lastUpdatedDate;
        // $lead->lastUpdatedDate = Carbon::createFromFormat('m/d/Y',$lead->lastUpdatedDate);
        $viewData['leadDealDetail'] = $lead;

        $countListing = post_json('listing/deal-lead', (object) ['leadId' => $lead->leadId])->data;
        $sortForCountListing = [];
        foreach ($countListing as $key => $value) {
            $sortForCountListing[$value->typeListing] = $value->count;
        }
        $viewData['countListing'] = $sortForCountListing;
        $viewData['curentUser'] = $currentUser;
        $viewData['permissionDoAction'] = $currentUser->userId == $lead->assignedTo ? true : false;
        if (isset($lead->wardsList)) {
            $districtWards = [];
            foreach ($lead->wardsList as $key => $ward) {
                $districtWards[$ward->districtId]['wards'][$key] = $ward;
                $districtWards[$ward->districtId]['districtName'] = $ward->districtName;
                $districtWards[$ward->districtId]['districtId'] = $ward->districtId;
            }
            $lead->wardsList = $districtWards;
        }
        $viewData['leadDealDetail']->listUnlockReasons = null;
        if ($viewData['leadDealDetail']->progressQuoId == 3 || $viewData['leadDealDetail']->progressQuoId == 4) {
            $viewData['leadDealDetail']->listUnlockReasons = get_json('/lead-deal-type/2')->data;
        }
        $viewData['purpose'] = join(', ', PropzyCommons::getPurposeTextFromDetail(json_decode(json_encode($lead->customerPurpose), true)));
        // die;
        return view('lead.detailv2')->with($viewData);
    }
    // \ detail dev by Jack small
    /**
     * Update lead
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
        $response = put_json(UPDATE_LEAD, $postData);
        $response->dataPost = $postData;
        return response()->json($response);
    }
    public function getDetailJson($id)
    {
        $response = get_json(GET_LEAD_DETAIL . '-new/' . $id);
        return response()->json($response);
    }
    public function product($id)
    {
        $lead = get_json(GET_LEAD_DETAIL . '/' . $id)->data;
        $rejectReasons = get_json('listing/get-list-rejected-reason-schedule')->data;
        $viewData['lead'] = $lead;
        $viewData['currentActivePage'] = "product";
        $viewData['rejectReasons'] = $rejectReasons;
        $user = Session::get('user');
        $viewData['currentUserWebAccessToken'] = isset($user->socialUser) ? $user->socialUser->accessToken : "";
        return view('lead.product')->with($viewData);
    }
    public function productListingsData($id)
    {
        $type = \Request::input('type');
        $response = get_json(GET_LEAD_LISTINGS . "/$type/$id");
        if (!$response->data) {
            $response->data = [];
        }
        return response()->json($response);
    }
    public function sentListingsData($id)
    {
        $response = get_json(GET_LEAD_LISTINGS . "/sentmail/$id");
        return response()->json($response);
    }
    public function generateDeal(Request $request)
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
        if (trim($postData['sourceOther']) == '') {
            $postData['sourceOther'] = NULL;
        }
        $postData['initialBudget'] = trim(str_replace(',', '', $postData['initialBudget']));
        if ($postData['initialBudget'] == '') {
            $postData['initialBudget'] = NULL;
        }
        $postData['finalBudget'] = trim(str_replace(',', '', $postData['finalBudget']));
        if ($postData['finalBudget'] == '') {
            $postData['finalBudget'] = NULL;
        }
        if (!isset($postData['initialBudgetFixed']) || trim($postData['initialBudgetFixed']) == '') {
            $postData['initialBudgetFixed'] = NULL;
        } else {
            $postData['initialBudgetFixed'] = str_replace(",", "", $postData['initialBudgetFixed']);
        }
        $postData['leadFinalBudget'] = trim(str_replace(',', '', $postData['leadFinalBudget']));
        if ($postData['leadFinalBudget'] == '') {
            $postData['leadFinalBudget'] = NULL;
        }
        /*
          if (trim($postData['leadReassignReason']) == '') {
          $postData['leadReassignReason'] = NULL;
          }
         *
         */
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['_token']);
        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        $postData['customers'] = $customers;
        //return response()->json($postData);
        $response = post_json(GENERATE_DEAL, $postData);
        return response()->json($response);
    }
    public function findListing(Request $request)
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
        $postData['initialBudgetFixed'] = NULL;
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
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['_token']);
        unset($postData['leadFinalBudget']);
        unset($postData['leadResponsiveness']);
        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        $postData['customers'] = $customers;
        //return response()->json($postData);
        $response = post_json_search_listing(SEARCH_LISTING_V2 . '/1/10000', $postData);
        //return response()->json($response);
        $listings = array();
        if ($response->result && isset($response->data->list)) {
            $listings = $response->data->list;
        }
        //return response()->json($listings);
        $viewData['listings'] = $listings;
        return view('lead.find-listing')->with($viewData);
    }
    public function customSearchForm()
    {
        $postData = \Request::input();
        $postData['dealId'] = NULL;
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
        $postData['initialBudgetFixed'] = NULL;
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
        unset($postData['amenityId']);
        unset($postData['isPrefered']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['_token']);
        unset($postData['leadFinalBudget']);
        unset($postData['leadResponsiveness']);
        //
        unset($postData['agentServe']);
        unset($postData['amOfAgentPresenter']);
        unset($postData['amOfAgentServe']);
        unset($postData['saleId']);
        unset($postData['typeId']);
        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        $postData['customers'] = $customers;
        $postData['statusName'] = "";
        $postData['leadReassignReason'] = "";
        //return response()->json($postData);
        $districtIdCheck = array();
        $districtIdAdvange_selected = \Session::get('districtIdAdvange');
        if (!empty($districtIdAdvange_selected)) {
            foreach ($districtIdAdvange_selected as $districtId_selected) {
                $districtIdCheck[$districtId_selected] = 'checked';
            }
        }
        $directionsCheck = array();
        $directionsAdvange_selected = \Session::get('directionsAdvange');
        if (!empty($directionsAdvange_selected)) {
            foreach ($directionsAdvange_selected as $directions_selected) {
                $directionsCheck[$directions_selected] = 'checked';
            }
        }
        $wardsCheck = array();
        $wardsAdvange_selected = \Session::get('wardAdvange');
        if (!empty($wardsAdvange_selected)) {
            foreach ($wardsAdvange_selected as $wards_selected) {
                $wardsCheck[$wards_selected] = 'checked';
            }
        }
        $ward_type = '';
        $direction_type = '';
        $district_type = '';
        $response = post_json(LISTING_CUSTOM_SEARCH, $postData);
        if ($response->result) {
            $formdata = $response->data;
            for ($i = 0; $i < sizeof($formdata); $i++) {
                $form = $formdata[$i];
                if ($form->type == 'wardType') {
                    $ward_type .= '<div class="checkbox col-sm-4"><label class="no-bold"><input value="' . $form->id . '" name="wardAdvange[]" type="checkbox" ' . (isset($wardsCheck[$form->id]) ? $wardsCheck[$form->id] : '') . '> ' . $form->name . '</label></div>';
                }
                if ($form->type == 'directionType') {
                    $direction_type .= '<div class="checkbox col-sm-2"><label class="no-bold"><input value="' . $form->id . '" name="directionsAdvange[]" type="checkbox" ' . (isset($directionsCheck[$form->id]) ? $directionsCheck[$form->id] : '') . '> ' . $form->name . '</label></div>';
                }
                if ($form->type == 'districtType') {
                    $district_type .= '<div class="checkbox col-sm-4"><label class="no-bold"><input value="' . $form->id . '" name="districtIdAdvange[]" type="checkbox" ' . (isset($districtIdCheck[$form->id]) ? $districtIdCheck[$form->id] : '') . '> ' . $form->name . '</label></div>';
                }
            }
            $alley_from_to = '<input name="alleyFromTo" class="form-control" placeholder="m" value="' . \Session::get('alleyFromTo') . '" type="number">';
            $alley_to_value = '<input name="alleyToValue" class="form-control" placeholder="m" value="' . \Session::get('alleyToValue') . '" type="number">';
            $length_from_to = '<input name="lengthFromTo" class="form-control" placeholder="m" value="' . \Session::get('lengthFromTo') . '" type="number">';
            $length_to_value = '<input name="lengthToValue" class="form-control" placeholder="m" value="' . \Session::get('lengthToValue') . '" type="number">';
            $width_from_to = '<input name="widthFromTo" class="form-control" placeholder="m" value="' . \Session::get('widthFromTo') . '" type="number">';
            $width_to_value = '<input name="widthToValue" class="form-control" placeholder="m" value="' . \Session::get('widthToValue') . '" type="number">';
            $year_built_from_to = '<input name="yearBuiltFromTo" class="form-control" placeholder="" value="' . \Session::get('yearBuiltFromTo') . '" type="number">';
            $year_built_to_value = '<input name="yearBuiltToValue" class="form-control" placeholder="" value="' . \Session::get('yearBuiltToValue') . '" type="number">';
            $private_listing = '<label class="radio-inline"><input name="privateListing" value="1" type="radio" ' . (\Session::get('privateListing') == '1' ? 'checked' : '') . '> Đã xác thực</label><label class="radio-inline"><input name="privateListing" value="2" type="radio" ' . (\Session::get('privateListing') == '2' ? 'checked' : '') . '> Chưa xác thực</label>';
            $form_custom_search = array(
                'wardType' => $ward_type,
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
        $postData = \Request::input();
        $postData['dealId'] = NULL;
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
        unset($postData['amenityId']);
        $districtsList = NULL;
        if (isset($postData['districtIdAdvange'])) {
            $districtsList = array();
            foreach ($postData['districtIdAdvange'] as $districtIdAdvange) {
                $item = array(
                    'districtId' => $districtIdAdvange,
                );
                $districtsList[] = $item;
            }
            \Session::put('districtIdAdvange', $postData['districtIdAdvange']);
        } else {
            \Session::forget('districtIdAdvange');
        }
        unset($postData['districtIdAdvange']);
        $directionsList = NULL;
        if (isset($postData['directionsAdvange'])) {
            $directionsList = array();
            foreach ($postData['directionsAdvange'] as $directionIdAdvange) {
                $item = array(
                    'directionId' => $directionIdAdvange,
                );
                $directionsList[] = $item;
            }
            \Session::put('directionsAdvange', $postData['directionsAdvange']);
        } else {
            \Session::forget('directionsAdvange');
        }
        unset($postData['directionsAdvange']);
        $wardsList = NULL;
        if (isset($postData['wardAdvange'])) {
            $wardsList = array();
            foreach ($postData['wardAdvange'] as $wardAdvangeId) {
                $wardsList[] = (int) $wardAdvangeId;
            }
            \Session::put('wardAdvange', $postData['wardAdvange']);
        } else {
            \Session::forget('wardAdvange');
        }
        unset($postData['wardAdvange']);
        //fromTo
        $fromTo = array();
        if (isset($postData['alleyFromTo']) && isset($postData['alleyToValue'])) {
            $fromTo[] = array(
                'fromValue' => $postData['alleyFromTo'],
                'toValue' => $postData['alleyToValue'],
                'type' => "alley"
            );
            \Session::put('alleyFromTo', $postData['alleyFromTo']);
            \Session::put('alleyToValue', $postData['alleyToValue']);
        } else {
            \Session::forget('alleyFromTo');
            \Session::forget('alleyToValue');
        }
        unset($postData['alleyFromTo']);
        unset($postData['alleyToValue']);
        $lengthFromTo = NULL;
        $lengthToValue = NULL;
        if (isset($postData['lengthFromTo']) && $postData['lengthFromTo'] > 0 && isset($postData['lengthToValue']) && $postData['lengthToValue'] > 0) {
            $lengthFromTo = $postData['lengthFromTo'];
            $lengthToValue = $postData['lengthToValue'];
            \Session::put('lengthFromTo', $postData['lengthFromTo']);
            \Session::put('lengthToValue', $postData['lengthToValue']);
        } else {
            \Session::forget('lengthFromTo');
            \Session::forget('lengthToValue');
        }
        unset($postData['lengthFromTo']);
        unset($postData['lengthToValue']);
        $fromTo[] = array(
            'fromValue' => $lengthFromTo,
            'toValue' => $lengthToValue,
            'type' => "length"
        );
        $widthFromTo = NULL;
        $widthToValue = NULL;
        if (isset($postData['widthFromTo']) && $postData['widthFromTo'] > 0 && isset($postData['widthToValue']) && $postData['widthToValue'] > 0) {
            $widthFromTo = $postData['widthFromTo'];
            $widthToValue = $postData['widthToValue'];
            \Session::put('widthFromTo', $postData['widthFromTo']);
            \Session::put('widthToValue', $postData['widthToValue']);
        } else {
            \Session::forget('widthFromTo');
            \Session::forget('widthToValue');
        }
        unset($postData['widthFromTo']);
        unset($postData['widthToValue']);
        $fromTo[] = array(
            'fromValue' => $widthFromTo,
            'toValue' => $widthToValue,
            'type' => "width"
        );
        if (isset($postData['yearBuiltFromTo']) && $postData['yearBuiltFromTo'] > 0 && isset($postData['yearBuiltToValue']) && $postData['yearBuiltToValue'] > 0) {
            $fromTo[] = array(
                'fromValue' => $postData['yearBuiltFromTo'],
                'toValue' => $postData['yearBuiltToValue'],
                'type' => "yearBuilt"
            );
            \Session::put('yearBuiltFromTo', $postData['yearBuiltFromTo']);
            \Session::put('yearBuiltToValue', $postData['yearBuiltToValue']);
        } else {
            \Session::forget('yearBuiltFromTo');
            \Session::forget('yearBuiltToValue');
        }
        unset($postData['yearBuiltFromTo']);
        unset($postData['yearBuiltToValue']);
        //end fromTo
        $privateListing = NULL;
        if (isset($postData['privateListing']) && $postData['privateListing'] > 0) {
            $privateListing = $postData['privateListing'];
            \Session::put('privateListing', $postData['privateListing']);
        } else {
            \Session::forget('privateListing');
        }
        if (isset($postData['moveInDate']) && trim($postData['moveInDate']) != '') {
            $postData['moveInDate'] = Carbon::createFromFormat('m/d/Y', $postData['moveInDate'])->timestamp * 1000;
        } else {
            $postData['moveInDate'] = NULL;
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
        $postData['initialBudgetFixed'] = NULL;
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
        unset($postData['isPrefered']);
        unset($postData['wardAdvange']);
        unset($postData['customerName']);
        unset($postData['customerEmail']);
        unset($postData['customerPhone']);
        unset($postData['districtId']);
        unset($postData['_token']);
        unset($postData['leadFinalBudget']);
        unset($postData['leadResponsiveness']);
        $postData['amenitiesList'] = $amenitiesList;
        $postData['districtsList'] = $districtsList;
        $postData['directionsList'] = $directionsList;
        $postData['wardsList'] = $wardsList;
        //$postData['customers'] = $customers;
        $postData['fromTo'] = $fromTo;
        $postData['privateListing'] = $privateListing;
        //return response()->json($postData);
        $response = post_json_search_listing(SEARCH_LISTING_V2 . '/1/10000', $postData);
        //return response()->json($response);
        $listings = array();
        if ($response->result && isset($response->data->list)) {
            $listings = $response->data->list;
        }
        //return response()->json($listings);
        $viewData['listings'] = $listings;
        return view('lead.find-listing')->with($viewData);
    }
    public function removeEmailListing(Request $request, $leadId, $rlistingId)
    {
        $response = delete_json(REMOVE_EMAIL_LISTING . '/' . $leadId . '/' . $rlistingId);
        $listings = array();
        if ($response->result) {
            $listings = get_json(GET_LEAD_LISTINGS . '/' . $leadId)->data;
        }
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        return view('lead.email-listings')->with($viewData);
    }
    public function getEmailListings($leadId)
    {
        $listings = get_json(GET_LEAD_LISTINGS . '/' . $leadId)->data;
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        //return response()->json($listings);
        return view('lead.email-listings')->with($viewData);
    }
    public function addEmailListings(Request $request)
    {
        $postData = $request->json()->all();
        //return response()->json($postData);
        $response = post_json(ADD_EMAIL_LISTING, $postData);
        //return response()->json($response);
        $listings = array();
        if ($response->result) {
            $listings = get_json(GET_LEAD_LISTINGS . '/' . $postData['leadId'])->data;
        }
        //return $listings;
        $viewData = array(
            'listings' => $listings
        );
        return view('lead.email-listings')->with($viewData);
    }
    public function deactivateListing(Request $request)
    {
        $postData = $request->json()->all();
        $response = post_json(DEACTIVATE_LEAD_LISTING, $postData);
        return response()->json($response);
    }
    public function selectCustomerListing(Request $request)
    {
        $postData = $request->json()->all();
        //return response()->json($postData);
        $response = post_json(SELECT_LEAD_LISTING, $postData);
        return response()->json($response);
    }
    public function testGetData()
    {
        $data['userTypeList'] = get_json(GET_LISTING_USER_TYPE);
        return response()->json($data['userTypeList']);
    }
    public function getCustomerEmailTemplate($leadId)
    {
        $rlistingIds = \Request::input('rlistingIds');
        $viewData = array();
        $currentUser = \Session::get('user');
        // return response()->json($currentUser);
        $viewData['currentUser'] = $currentUser;
        $lead = get_json(GET_LEAD_DETAIL . '-new/' . $leadId)->data;
        $listings = post_json(FIND_LISTING_BY_IDS, array(
            'rlistingIds' => $rlistingIds
        ));
        $viewData['lead'] = $lead;
        $viewData['listings'] = $listings->data;
        $id_account = $currentUser->userId;
        $viewData['account'] = get_json(GET_DETAIL_ACCOUNT . '/' . $id_account)->data;
        // return response()->json($listings->data);
        return view('customer-email-listing-template')->with($viewData);
    }
    public function noListingEmail($id)
    {
        $viewData = array();
        $currentUser = \Session::get('user');
        //return response()->json($currentUser);
        $viewData['currentUser'] = $currentUser;
        $lead = get_json(GET_LEAD_DETAIL . '/' . $id)->data;
        $viewData['lead'] = $lead;
        //return response()->json($viewData);
        //var_dump($deal);
        //return response()->json($deal);
        return view('lead.no-listing-email')->with($viewData);
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
        //return response()->json($requestData);
        $response = post_json(CRM_LISTING_CART_DELETE, $requestData);
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
        $response = post_json(LEAD_REMINDER, $postData);
        return response()->json($response);
    }
    public function getActivities($type, $leadId)
    {
        $requestData = \Request::input();
        $page = 1;
        $numberItem = 1000;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = get_json(LEAD_ACTIVITIES_LIST . "/$type/$leadId/$page/$numberItem");
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => count($response->data->list),
            'recordsFiltered' => count($response->data->list),
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }
    public function listReminders()
    {
        $response = get_json(LEAD_REMINDERS_LIST);
        return response()->json($response);
    }
    public function setReminderRead($id)
    {
        $response = get_json(LEAD_REMINDER_READ . "/$id");
        return response()->json($response);
    }
    public function getHistory($id)
    {
        $requestData = \Request::input();
        $numberItem = 10;
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = get_json(LEAD_HISTORIES . "/$id/$page/$numberItem");
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }
    public function getHistoryDetail($id)
    {
        $response = get_json(LEAD_HISTORIES . "/$id");
        return response()->json($response);
    }
    public function delete($id)
    {
        $response = delete_json("lead/$id");
        return response()->json($response);
    }
    public function makeSchedule()
    {
        $postData = \Request::input();
        $hour = $postData['hour'];
        $minute = $postData['minute'];
        $postData['scheduleTime'] = Carbon::createFromFormat('m/d/Y H:i', $postData['whenDate'] . ' ' . $hour . ':' . $minute)->timestamp * 1000;
        $listingsList = array();
        if ($postData['listingIds']) {
            $listingIds = explode(';', $postData['listingIds']);
            $itemsCount = count($listingIds);
            foreach ($listingIds as $listingId) {
                $listingsList[] = array(
                    "id" => array("rlistingId" => df_int($listingId))
                );
            }
        }
        $postData['listingsList'] = $listingsList;
        unset($postData['hour']);
        unset($postData['minute']);
        unset($postData['whenDate']);
        unset($postData['listingIds']);
        unset($postData['dealId']);
        unset($postData['briefFormIds']);
        //return response()->json($postData);
        $response = null;
        if (empty($postData['scheduleId'])) {
            unset($postData['scheduleId']);
            $response = post_json(LEAD_SCHEDULE, $postData);
        } else {
            $response = put_json(LEAD_SCHEDULE, $postData);
        }
        return response()->json($response);
    }
    public function scheduleDetail($id)
    {
        $response = get_json('lead/schedule/' . $id);
        return response()->json($response);
    }
    public function reassignResponsiblePerson()
    {
        $postData = \Request::json()->all();
        $response = post_json('lead/assign', $postData);
        return response()->json($response);
    }
    /**
     *
     * @param Int $id leadId
     * @return view
     */
    public function order($id)
    {
        $response = get_json("order/lead/$id");
        $lead = get_json(GET_LEAD_DETAIL . '/' . $id)->data;
        $viewData['lead'] = $lead;
        $viewData['order'] = $response->data;
        //return response()->json($response);
        $viewData['currentActivePage'] = "order";
        return view('lead.order-detail')->with($viewData);
    }
    public function getOrderResponseData()
    {
        $postData = \Request::json()->all();
        $response = post_json(ORDER_LIST_RESPONDED, $postData);
        return response()->json($response);
    }
    /**
     *
     * @param Int $id leadId
     * @return json note list
     */
    public function listNotes($id)
    {
        $page = 1;
        $numberItem = 1000;
        $response = get_json(LEAD_NOTES_LIST . "/$id/$page/$numberItem");
        return response()->json($response);
    }
    public function addNote()
    {
        $postData = \Request::json()->all();
        $response = post_json(LEAD_NOTE, $postData);
        return response()->json($response);
    }
    /**
     *
     * @param Int $id leadId
     * @return view
     */
    public function chat($id)
    {
        $lead = get_json(GET_LEAD_DETAIL . '/' . $id)->data;
        $viewData['lead'] = $lead;
        $viewData['currentActivePage'] = "chat";
        return view('lead.chat')->with($viewData);
    }
    /**
     *
     * @param type $id leadId
     * @return view
     */
    public function events($id)
    {
        $lead = get_json(GET_LEAD_DETAIL . '/' . $id)->data;
        $viewData['lead'] = $lead;
        $viewData['types'] = get_json(EVENT_ITEMS . "/1")->data;
        $viewData['authors'] = get_json(EVENT_ITEMS . "/2")->data;
        $viewData['participants'] = get_json(EVENT_ITEMS . "/3")->data;
        $viewData['currentActivePage'] = "events";
        return view('lead.events')->with($viewData);
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
            "leadId" => df_int($id),
            "dealId" => null,
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
    /**
     *
     * @param type $id leadId
     * @return view
     */
    public function history($id)
    {
        $lead = get_json(GET_LEAD_DETAIL . '/' . $id)->data;
        $viewData['lead'] = $lead;
        $viewData['currentActivePage'] = "history";
        return view('lead.history')->with($viewData);
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
            "leadId" => df_int($id),
            "dealId" => null,
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
    /**
      public function changeListingsStatus() {
      $postData = \Request::json()->all();
      $response = post_json('/lead/listing/status', $postData);
      return response()->json($response);
      }
     *
     */
    public function changeScheduleStatus()
    {
        $postData = \Request::json()->all();
        $response = post_json('lead/schedule/change-status', $postData);
        return response()->json($response);
    }
    public function reportMeetingToTm()
    {
        $postData = \Request::json()->all();
        $response = post_json('crm/report-to-tm', $postData);
        return response()->json($response);
    }
    public function setSuitableSchedule()
    {
        $postData = \Request::json()->all();
        $response = post_json('lead/schedule/set-suitable', $postData);
        return response()->json($response);
    }
    public function tmGenerateDeal()
    {
        $postData = \Request::json()->all();
        $response = post_json('deal/tm-generate-deal', $postData);
        return response()->json($response);
    }
    public function getListingCartList()
    {
        $currentGroup = \Session::get('currentGroup');
        /*
          $postData = json_decode('{
          "leadId": 5299,
          "keySearch": "",
          "sortType": "desc",
          "sortColumn": "rlistingId"
          }');
          $response = post_json(CRM_LISTING_CART.'/1/500', $postData);
          return response()->json($response);
         */
        $postData = \Request::input();
        $keySearch = '';
        $sortType = 'desc';
        $sortColumn = 'rlistingId';
        ////////////////////////////////////////
        $numberItem = 10;
        $draw = isset($postData['draw']) ? $postData['draw'] : 1;
        $page = get_current_page($postData);
        $sortType = isset($postData['order']) ? $postData['order'][0]['dir'] : null;
        $sortColumnIndex = isset($postData['order']) ? $postData['order'][0]['column'] : 0;
        $sortColumn = !empty($postData['columns']) ? $postData['columns'][$sortColumnIndex]['data'] : null;
        switch ($sortColumn) {
            case 'formatPrice':
                $sortColumn = 'priceVnd';
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
        //////////////////////////////////////////
        $requestData = array(
            'leadId' => $postData['leadId'],
            'keySearch' => $keySearch,
            'sortType' => $sortType,
            'sortColumn' => $sortColumn,
        );
        $response = post_json(CRM_LISTING_CART . '/' . $page . '/' . $numberItem, $requestData);
        //return response()->json($response);
        if ($response->data) {
            $listings = $response->data;
            $viewData = array();
            foreach ($listings->list as $listing) {
                $licensePhotos = '';
                $cartId = '';
                if (!empty($listing->cartId)) {
                    $cartId = $listing->cartId;
                }
                if (!empty($listing->redBookPhotos)) {
                    $licensePhotos .= '<img class="redBookPhoto" style="width:48px;height: auto;" src="' . $listing->redBookPhotos[0] . '" />';
                    $licensePhotos .= "<input type='hidden' class='redBookPhotos' value='" . json_encode($listing->redBookPhotos) . "' />";
                }
                if (!empty($listing->pinkBookPhotos)) {
                    $licensePhotos .= '<img class="pinkBookPhoto" style="width:48px;height: auto;" src="' . $listing->pinkBookPhotos[0] . '" />';
                    $licensePhotos .= "<input type='hidden' class='pinkBookPhotos' value='" . json_encode($listing->pinkBookPhotos) . "' />";
                }
                $photo = '';
                if (!empty($listing->photo->link)) {
                    $photo .= '<img class="photo" style="width:48px;height: auto;" src="' . $listing->photo->link . '" />';
                }
                if (!empty($listing->link)) {
                    if (!empty($listing->departmentId) && $listing->departmentId == $currentGroup['departmentId']) {
                        $rlistingId = '<a href="' . $listing->link . '" target="_blank">' . $listing->rlistingId . '</a> <span class="fa fa-minus-circle pull-right btnRed" id="myCart' . $cartId . '" onclick="deletebListingMyCart(' . $cartId . ');"></span>';
                    } else {
                        $rlistingId = '<a href="' . $listing->link . '" target="_blank">' . $listing->rlistingId . '</a>';
                    }
                } else {
                    $rlistingId = $listing->rlistingId;
                }
                //statusID= 7 là mờ
                $check_sold = '';
                if ($listing->statusId == '7') {
                    $check_sold = 'disabled';
                }
                $viewData[] = array(
                    'choice' => '<input type="checkbox" class="selected-email-listing selected-listing-' . $listing->rlistingId . '" value="' . $listing->rlistingId . '" ' . $check_sold . '/>',
                    'rlistingId' => $rlistingId,
                    'photo' => $photo,
                    'licensePhotos' => $licensePhotos,
                    'formatPrice' => $listing->formatPrice,
                    'formatSize' => $listing->formatSize,
                    'size' => $listing->sizeLength . ' x ' . $listing->sizeWidth,
                    'incompatible' => " ",
                    'address' => $listing->address,
                    'createdBy' => $listing->createdByName . '<br />' . $listing->createdByphone,
                    'sourceBy' => $listing->sourceBy,
                    'districtName' => $listing->districtName,
                    'wardName' => $listing->wardName,
                    'directionName' => $listing->directionName,
                    'updatedDate' => '<span class="btnUpdatedDate" onclick="noteMyCart(' . $cartId . ')">' . date('d-m-Y', $listing->updatedDate / 1000) . '</span>',
                    'liveDate' => date('d-m-Y', $listing->liveDate / 1000),
                    'sourceAdd' => 'N/A'
                );
            }
            $viewDataTable = array(
                'draw' => $draw,
                'recordsTotal' => $listings->totalItems,
                'recordsFiltered' => $listings->totalItems,
                'data' => $viewData,
            );
        }
        return response()->json($viewDataTable);
    }
    public function getListingQuickCheck($id)
    {
        $rlistingIds = \Request::input('rlistingIds');
        $response = post_json("lead/$id/get-form-listing-quick-check", array(
            'rlistingIds' => $rlistingIds
        ));
        return response()->json($response); 
    }
    public function updateStatusPending()
    {
        $postData = \Request::json()->all();
        $response = post_json("lead/status-pending", $postData);
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


    // block function optimize for lead detail
    // author: JSP
    // date: 18.12.20
    public function getWardsFromFormData($formdata,$districtId){
        // proplem: dublicate call api get wards when init detail page
        $wards= [];
        foreach($formdata as $key => $value){
            if($value->type == "wardType" && $value->parentId == $districtId){
                $wards[] = (object)[
                    "wardId" => $value->id,
                    "wardName" => $value->name
                ];
            }
        }
        return $wards;
    }
    // \\block function optimize for lead detail
}
