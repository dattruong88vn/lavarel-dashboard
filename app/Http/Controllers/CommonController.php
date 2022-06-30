<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use \Cache;
use App\Repositories\API\CommonsRepository;
use Illuminate\Support\Facades\Storage;

class CommonController extends Controller
{

    public function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function checkClosedBy($dealId)
    {
        $resp = get_json("deal/$dealId/check-closed-by");
        return response()->json($resp);
    }

    public function getDefineIds()
    {
        $dataPost = \Request::json()->all();
        //        $dataPost = ['deparmentId'=>12];
        $result = post_json('task/definitions', $dataPost);
        return response()->json($result->data);
    }

    public function getDistrict($cityId)
    {
        $districtList = get_json(GET_DISTRICT_LIST . "/" . $cityId)->data;
        return response()->json($districtList);
    }

    public function chanelChild($idChanel)
    {
        $chanelChild = get_json("channel-sub-type" . "/" . $idChanel)->data;
        return response()->json($chanelChild);
    }

    public function getProgress($type)
    {
        $dataPost = \Request::json()->all();
        $result = post_json($type . '/progress/list', $dataPost);
        return response()->json($result->data);
    }

    public function covertToTpa($customerId)
    {
        // return "customer/$customerId/send-tpa";
        return response()->json(get_json("customer/$customerId/send-tpa"));
    }

    public function getWard($districtId)
    {
        $wardList = get_json(GET_WARD_LIST . "/" . $districtId)->data;
        return response()->json($wardList);
    }

    public static function getWardStatic($districtId)
    {
        $wardList = get_json(GET_WARD_LIST . "/" . $districtId)->data;
        return $wardList;
    }

    public function getCities()
    {
        $items = get_json(GET_CITIES);
        return response()->json($items);
    }

    public function getDistricts($cityId)
    {
        $districtList = get_json(GET_DISTRICT_LIST . "/" . $cityId);
        return response()->json($districtList);
    }

    public function getWards($districtId)
    {
        $wardList = get_json(GET_WARD_LIST . "/" . $districtId);
        return response()->json($wardList);
    }
    public function getWardsByZoneTeamDistrict()
    {
        $postData = \Request::json()->all();
        $response = post_json(GET_WARD_BY_ZONE_TEAM_DISTRICT, $postData);
        return response()->json($response);
    }
    public function getCitiesByZoneTeam()
    {
        $postData = \Request::json()->all();

        $response = post_json(GET_CITIES_BY_ZONE_TEAM, $postData);
        return response()->json($response);
    }

    public function getTeamByZone()
    {
        $postData = \Request::json()->all();
        $response = post_json(GET_TEAM_BY_ZONE, $postData);
        return response()->json($response);
    }
    public function getDistrictsByZoneTeam()
    {
        $postData = \Request::json()->all();
        $response = post_json(GET_DISTRICT_BY_ZONE_TEAM, $postData);
        return response()->json($response);
    }
    public function getPositions($departmentId)
    {
        $positionList = get_json(GET_POSITION_V2 . "/" . $departmentId);
        return response()->json($positionList);
    }
    public function getListParents($parentId)
    {
        $listParents = get_json(GET_LIST_DEPARTMENTS_V2 . '/' . explode('-', $parentId)[1]);
        return response()->json($listParents);
    }

    public function getZoneDetail($departmentId)
    {
        $detailDepartment = get_json(DETAIL_DEPARTMENT . '/' . $departmentId);
        return response()->json($detailDepartment);
    }
    public function editDepartment($departmentId)
    {
        $listDepartments = get_json(GET_ALL_DEPARTMENTS);
        if ($listDepartments->code == 200)
            $viewData['listDepartments'] = $listDepartments->data;

        $listDepartmentTypes = get_json(GET_DEPARTMENT_TYPE);
        if ($listDepartmentTypes->code == 200)
            $viewData['listDepartmentTypes'] = $listDepartmentTypes->data;

        $detailDepartment = get_json(DETAIL_DEPARTMENT . '/' . $departmentId);
        if ($detailDepartment->code == 200) {
            $viewData['detailDepartment'] = $detailDepartment->data;
        }

        $getCitiesPost = new \stdClass();
        $getCitiesPost->departmentIds = array($detailDepartment->data->parentId);

        $cities = array();
        $response = post_json(CITIES, $getCitiesPost);
        if ($response->result) {
            $cities = $response->data->list;
        }
        $viewData['listCities'] = $cities;


        $requestDetail = $detailDepartment->data;
        $currentDistricts = array();
        $isPreferedDistrict = -1;
        foreach ($requestDetail->departmentDistricts as $myDistrict) {
            $currentDistricts[] = $myDistrict->districtId;
            if ($myDistrict->isPrimary) {
                $isPreferedDistrict = $myDistrict->districtId;
            }
        }
        $districts = get_json(GET_DISTRICTS . '/1')->data;
        $viewData['districts'] = $districts;
        $viewData['currentDistricts'] = $currentDistricts;
        $viewData['isPreferedDistrict'] = $isPreferedDistrict;

        return response()->json($viewData);
    }

    public function getAreasByDepartment()
    {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json(GET_AREAS_BY_DEPARTMENT, $postData);
        return response()->json($response);
    }

    public function getBlockList($buildingId)
    {
        $blockList = get_json(GET_BLOCK_LIST . "/" . $buildingId);
        return response()->json($blockList);
    }

    public function projectDetail($projectId)
    {
        $projectDetail = get_json(GET_DETAIL_PROJECT . "/" . $projectId);
        return response()->json($projectDetail);
    }

    public function getAmenities($listingTypeId, $propertyTypeId, $level)
    {
        $getAmenities = get_json(GET_AMENITIES_CHECK . "/" . $listingTypeId . "/" . $propertyTypeId . "/" . $level);
        return response()->json($getAmenities);
    }

    public function getAmenitiesByListingType()
    {
        $amenities = CommonsRepository::getAmenitiesByListingType(\Request::input("listingTypeId"));
        return response()->json($amenities);
    }

    public function getPropertyType($listingTypeId = "")
    {
        $getPropertyType = get_json(GET_PROPERTY_TYPE_LIST . "/" . $listingTypeId);
        return response()->json($getPropertyType);
    }

    public function agentList($listingTypeId, $purposeId, $districtId)
    {
        $agentList = get_json(GET_AGENT_LIST . "/" . $listingTypeId . "/" . $purposeId . "/" . $districtId);
        return response()->json($agentList);
    }

    public function getBuidingList()
    {
        $buildingList = get_json(GET_BUILDINGS)->data;
        return response()->json($buildingList);
    }

    public function getBuidingDetail($buildingId)
    {
        $buildingDetail = get_json(GET_BUILDING_DETAIL . "/" . $buildingId)->data;
        return response()->json($buildingDetail);
    }

    public function getBlockDetail($blockId)
    {
        $blockDetail = get_json(GET_BLOCK_DETAIL . "/" . $blockId)->data;
        return response()->json($blockDetail);
    }

    public function getDraftDetail($draftId)
    {
        $blockDetail = get_json(GET_DRAFT_DETAIL . "/" . $draftId)->data;
        return response()->json($blockDetail);
    }

    public function getUser($source)
    {
        $userList = get_json(GET_USER_LIST . "/" . $source);
        return response()->json($userList);
    }

    public function getUserBySource()
    {
        $dataPost = \Request::input();
        $result = post_json(GET_USER_BY_SOURCE, $dataPost);
        return response()->json($result->data);
    }

    public function getTuTrach($type = "")
    {
        $tuTrach = unserialize(TU_TRACH);
        $returnVal = array();
        if ($type == "") {
            $returnVal = $tuTrach;
        } else {
            if (isset($tuTrach[$type])) {
                $returnVal = array($type => $tuTrach[$type]);
            }
        }
        return response()->json($returnVal);
    }

    public function getTaskDefinitions()
    {
        $response = get_json(TASK_DEFINITIONS);
        return response()->json($response);
    }

    public function getMeetingReasons()
    {
        $response = get_json("meeting-reasons");
        return response()->json($response);
    }

    public function openModalListingDetail($type = 'modal')
    {
        $postData = \Request::json()->all();
        if (isset($postData['more']) && $postData['more'] != '') {
            $dataReqquest = ['dealId' => null, explode('|', $postData['more'])[0] => explode('|', $postData['more'])[1]];
        } else {
            $dataReqquest = ['dealId' => null];
        }
        $listingDetail = post_json('relatelisting/' . $postData['listingId'], $dataReqquest)->data;
        //$listingDetail->percentCommissionText = $listingDetail->commissionFrom . '% - ' . $listingDetail->commissionTo . '%';
        // if ($listingDetail->commissionPrice == null) {
        //     if ($listingDetail->commissionFrom == $listingDetail->commissionTo) {
        //         $listingDetail->percentCommissionText = $listingDetail->commissionFrom . '%';
        //     }
        // }
        // return response()->json($listingDetail);
        switch ($listingDetail->statusId) {
            case 1:
                $listingDetail->JMStatusId = 'Còn trống';
                break;
            case 2:
                $listingDetail->JMStatusId = 'Không còn trống';
                break;
            case 3:
                $listingDetail->JMStatusId = 'Không liên lạc được';
                break;

            default:
                $listingDetail->JMStatusId = 'N/A';
                break;
        }

        if (isset($listingDetail->pinkBookPhotos) && $listingDetail->pinkBookPhotos != null) {
            foreach ($listingDetail->pinkBookPhotos as $val) {
                $listingDetail->photos[] = (object) ['link' => $val];
            }
        }

        if (isset($listingDetail->redBookPhotos) && $listingDetail->redBookPhotos != null) {
            foreach ($listingDetail->redBookPhotos as $val) {
                $listingDetail->photos[] = (object) ['link' => $val];
            }
        }
        $listingDetail->photo360s = [];
        if (isset($listingDetail->virtualTour360s) && $listingDetail->virtualTour360s != null) {
            foreach ($listingDetail->virtualTour360s as $val) {
                $listingDetail->photo360s[] = (object) ['link' => $val];
            }
        }
        // statusId (1: Còn trống, 2 Không còn trống, 3 Không liên lạc được)
        if (!isset($listingDetail->review)) {
            $json = '[{"Đường đi vào":[{"reasonName":"Hẻm quá nhỏ, khó đi lại","number":5,"reasonContent": null},{"reasonName":"Hẻm không an ninh","number":5,"reasonContent": "Quang"}]},{"Kiến trúc nhà":[{"reasonName":"Nhà đang xuống cấp","number":4,"reasonContent": null}]}]';
            $listingDetail->review = json_decode($json);
        } else {
            $array = get_object_vars($listingDetail->review);
            $properties = array_keys($array);

            $tmpReviewArray = [];
            foreach ($properties as $key => $value) {
                $tmpReviewArray[$key] = (object) [$value => $listingDetail->review->$value];
            }
            $listingDetail->review = $tmpReviewArray;
        }

        // return response()->json( $tmpReviewArray );
        $viewData['listingDetail'] = $listingDetail;
        if (isset($postData['more']) && $postData['more'] != '') {

            $resData = [
                'rlistingId' => $postData['listingId'],
                explode('|', $postData['more'])[0] => explode('|', $postData['more'])[1]
            ];

            if (isset($postData['filterValuations']) && $postData['filterValuations'] != 'null') {
                $resData['sort']['filter'][] = array(
                    'columnName' => 'valuationType',
                    'value' => $postData['filterValuations']
                );
            }

            if (isset($postData['filterSourceBys']) && $postData['filterSourceBys'] != 'null') {
                $resData['sort']['filter'][] = array(
                    'columnName' => 'sourceBy',
                    'value' => $postData['filterSourceBys']
                );
                // return response()->json($postData);
            }

            if (isset($postData['filterLegals']) && $postData['filterLegals'] != 'null') {
                $resData['sort']['filter'][] = array(
                    'columnName' => 'legal',
                    'value' => $postData['filterLegals']
                );
            }
            // return $resData;
            $viewData['listingDetailCompare'] = post_json('relatelisting/avg', $resData)->data;
        } else {
            $viewData['listingDetailCompare'] = get_json('relatelisting/avg/' . $postData['listingId'])->data;
        }
        if (empty($type) || $type == 'modal') {
            $returnHTML = view('commons.listingDetailModal')->with($viewData)->render();
            return response()->json($returnHTML);
        }
        return response()->json($viewData);
    }

    public function openModalEndTour()
    {
        $postData = \Request::json()->all();
        $json = json_decode($postData['json']);
        $viewData['listings'] = $json;
        $returnHTML = view('commons.endTourModal')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    // Author: JackSmall
    // Date: 01.03.2018
    // Des: get lat long listings for map
    public function getLatLongByListing()
    {

        $response = [];
        $postData = \Request::json()->all();
        $arrayListings = json_decode($postData['listings']);
        foreach ($arrayListings as $v) {
            // API Method is POST. Some one using GET method here.
            // ["dummy_data"=>true] => Just for hot fix. Nothing special. I don't know what to POST so I use this :))
            // Change to your object whenever you want to.
            // $listingDetail = get_json('relatelisting/' . $v)->data;
            $listingDetail = post_json('relatelisting/' . $v, ["dummy_data" => true])->data;

            $response[] = ['address' => $listingDetail->address, 'listings' => $v, 'lat' => $listingDetail->latitude, 'long' => $listingDetail->longitude];
        }
        return response()->json($response);
    }

    public function getChangeScheduleTimeReasons()
    {
        $response = get_json("schedule/get-reason-change-time-tour");
        return response()->json($response);
    }

    public function getChannelTypes($type)
    {
        $response = get_json(sprintf(CHANNEL_TYPES, $type));
        return response()->json($response);
    }

    public function getPriceRanges()
    {
        $response = get_json(PRICE_RANGES);
        return response()->json($response);
    }

    public function getAlleyType()
    {
        $response = get_json(ALLEY_TYPE);
        return response()->json($response);
    }

    public function getDirections()
    {
        // $response = get_json(GET_DIRECTIONS);
        // //addition direction
        // array_unshift($response->data, [post_json_external
        //     "dId" => 9,
        //     "directionName" => "Đông Tứ Trạch:",
        //     "isDeleted" => false,
        //     "did" => 9
        // ]);

        // array_unshift($response->data, [
        //     "dId" => 10,
        //     "directionName" => "Tây Tứ Trạch:",
        //     "isDeleted" => false,
        //     "did" => 10

        // ]);
        // return response()->json($response);



        $response = get_json(GET_DIRECTIONS2);
        //return response()->json($response->data->list[0]->directions);
        //return response()->json($response->data);

        //addition direction
        // array_unshift($response->data, [
        //     "dId" => 9,
        //     "directionName" => "Đông Tứ Trạch:",
        //     "isDeleted" => false,
        //     "did" => 9
        // ]);

        // array_unshift($response->data, [
        //     "dId" => 10,
        //     "directionName" => "Tây Tứ Trạch:",
        //     "isDeleted" => false,
        //     "did" => 10

        // ]);



        $dongTuTrach = [
            "dId" => $response->data->list[0]->code,
            "directionName" => "Đông Tứ Trạch:",
            "isDeleted" => false,
            "did" => $response->data->list[0]->code
        ];

        array_unshift($response->data->list[0]->directions, $dongTuTrach);

        $tayTuTrach = [
            "dId" => $response->data->list[1]->code,
            "directionName" => "Tây Tứ Trạch:",
            "isDeleted" => false,
            "did" => $response->data->list[1]->code
        ];

        array_unshift($response->data->list[1]->directions, $tayTuTrach);

        for ($i = 0; $i < sizeof($response->data->list[1]->directions); $i++) {
            array_push($response->data->list[0]->directions, $response->data->list[1]->directions[$i]);
        }
        $response->data = $response->data->list[0]->directions;
        return response()->json($response);
    }

    public function getDirectionsDashboard() {
        $response = get_json(GET_DIRECTIONS);
        return response()->json($response);
    }

    public function getChannelType($id)
    {
        $response = get_json("channel-types");
        return response()->json($response);
    }

    public function timeCounterTrackTimeLead()
    {
        $postData = \Request::json()->all();
        if($this->checkDublicateReq($postData)){
            $response = post_json("time-counter/track-time/open-lead", $postData);
            return response()->json($response);
        }
            
        return "DUBLICATE";
    }

    public function timeCounterTrackTimeDeal()
    {
        $postData = \Request::json()->all();
        
        if($this->checkDublicateReq($postData)){
            $response = post_json("time-counter/track-time/open-deal", $postData);
            return response()->json($response);
        }
        
        return "DUBLICATE";
    }

    // public function checkDublicateReq($postData) 
    // {
    //     $fileName = 'time_counter_tracking.txt';
    //     $postDataJson = json_encode($postData);
    //     $this->writeLogs($postDataJson);
    //     $this->logsReq($postDataJson);
    //     if( Storage::disk()->exists($fileName) ){
    //         $postDataBefore = Storage::get($fileName);
    //         if($postDataJson == $postDataBefore)
    //             return false;
    //     }
    //     Storage::put($fileName, $postDataJson);
    //     return true;
    // }

    public function checkLogs($searchString, $nameFile)
    {
        if( Storage::disk()->exists($nameFile) ){
            $arrReq = explode(PHP_EOL,Storage::get($nameFile)); 
            $resultSearch = array_search($searchString, $arrReq);
            if($resultSearch === false){ //false is not found, pass case
                return false;
            }
            return true;
        }else{
            return false;
        }
    }

    public function getZones()
    {
        $requestData = \Request::json()->all();
        $entity = $requestData['entity'];
        $action = $requestData['action'];
        $permissionId = $requestData['permissionId'];

        $response = post_json(GET_LIST_ZONE . '/' . $entity . '/' . $action . '/' . $permissionId, ["" => ""]);

        return response()->json($response);
    }

    public function getTeams()
    {
        $requestData = \Request::json()->all();
        $entity = $requestData['entity'];
        $action = $requestData['action'];
        $permissionId = $requestData['permissionId'];
        $zoneIds = !empty($requestData['zoneIds']) ? $requestData['zoneIds'] : null;
        $response = post_json(GET_LIST_TEAM . '/' . $entity . '/' . $action . '/' . $permissionId, ['zoneIds' => $zoneIds]);

        return response()->json($response);
    }

    public function getDepartments()
    {
        $requestData = \Request::json()->all();
        $entity = $requestData['entity'];
        $action = $requestData['action'];
        $permissionId = $requestData['permissionId'];
        // $zoneIds = $requestData['zoneIds'];
        $response = post_json(GET_LIST_DEPARTMENT . '/' . $entity . '/' . $action . '/' . $permissionId, ['' => '']);

        return response()->json($response);
    }
    public function getMembers()
    {
        $requestData = \Request::json()->all();
        $entity = $requestData['entity'];
        $action = $requestData['action'];
        $permissionId = $requestData['permissionId'];
        $zoneIds = !empty($requestData['zoneIds']) ? $requestData['zoneIds'] : null;
        $teamIds = !empty($requestData['teamIds']) ? $requestData['teamIds'] : null;
        $districtIds = !empty($requestData['districtIds']) ? $requestData['districtIds'] : null;
        $wardIds = !empty($requestData['wardIds']) ? $requestData['wardIds'] : null;
        $departmentIds = !empty($requestData['departmentIds']) ? $requestData['departmentIds'] : null;

        $response = post_json(GET_LIST_MEMBER . '/' . $entity . '/' . $action . '/' . $permissionId, [
            'zoneIds' => $zoneIds,
            'teamIds' => $teamIds,
            'districtIds' => $districtIds,
            'wardIds' => $wardIds,
            'departmentIds' => $departmentIds,
        ]);

        return response()->json($response);
    }
    public function getDistrictsByPermission()
    {
        $requestData = \Request::json()->all();
        $entity = $requestData['entity'];
        $action = $requestData['action'];
        $permissionId = $requestData['permissionId'];
        $zoneIds = !empty($requestData['zoneIds']) ? $requestData['zoneIds'] : null;
        $teamIds = !empty($requestData['teamIds']) ? $requestData['teamIds'] : null;

        $response = post_json(
            GET_DISTRICTS_BY_PERMISSION . '/' . $entity . '/' . $action . '/' . $permissionId,
            ["zoneIds" => $zoneIds, "teamIds" => $teamIds]
        );

        return response()->json($response);
    }
    public function getWardsByPermission()
    {
        $requestData = \Request::json()->all();
        $entity = $requestData['entity'];
        $action = $requestData['action'];
        $permissionId = $requestData['permissionId'];
        $districtIds = !empty($requestData['districtIds']) ? $requestData['districtIds'] : null;
        $zoneIds = !empty($requestData['zoneIds']) ? $requestData['zoneIds'] : null;
        $teamIds = !empty($requestData['teamIds']) ? $requestData['teamIds'] : null;

        $response = post_json(
            GET_WARDS_BY_PERMISSION . '/' . $entity . '/' . $action . '/' . $permissionId,
            ["districtIds" => $districtIds, "zoneIds" => $zoneIds, "teamIds" => $teamIds]
        );

        return response()->json($response);
    }
    public function checkDublicateReq($data){
        $dataJson = \json_encode($data);
        if(Session::has("user")){
            $currentUser = Session::get("user");
            $nameFile = "logs/".$currentUser->userId.".txt";
            if( !$this->checkLogs($dataJson,$nameFile) ){ //false is not request like $data before
                Storage::disk()->append($nameFile, $dataJson); // add data to file
                return true; // hire
            }
        }
        return false; //reject
    }

    public function test(){
        if(Session::has("user")){
            dd(Session::get("user"));
        }
    }

    /**
     * Get notification number of commission deals needed collected cmoney
     */
    public function getCommissionNotification() {
        $url = '/commission/deposit/notifications';
        $result = get_json($url);
        return response()->json($result);
    }

    public function getTrackingBaViewInfo()
    {
        $postData = \Request::json()->all();
        $response = post_json(DO_TRACKING_BA_VIEW_INFO, $postData);
        return response()->json($response);
    }

    public function realEstateGroup()
    {
        $response = get_json(GET_REAL_ESTATE_GROUP);
        return response()->json($response);
    }

    public function propertyTypeListV2($groupId, $listingTypeId)
    {
        $response = get_json(sprintf(GET_PROPERTY_TYPE_LIST_V2, $groupId, $listingTypeId));
        return response()->json($response);
    }

    public function getAssignedPhoneFromRlisting($rListingId)
    {
        $response = get_json_back_office('user-phone/related-listing/' . $rListingId);
        return response()->json($response);
    }
}
