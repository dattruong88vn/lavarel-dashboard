<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class AgentController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function search() {
        $term = \Request::input('term');
        $postData = array(
            'keySearch' => $term
        );
        $response = post_json(AGENT_SEARCH, $postData);
        $returnValue = array();
        if ($response->data) {
            $returnValue = $response->data;
        }
        return response()->json($returnValue);
    }

    public function isExisted() {
        $phone = \Request::input("phone");
        $respone = get_json("agent/is-existed/$phone");
        return response()->json($respone);
    }

    public function getExistingAgent(){
        // wiki: http://sc.propzy.vn/root/propzy-dashboard-webservice/wikis/%5Btpa%5D-get-existing-agent-by-phone-or-email
        // date: 03/06/2019
        // author: Jack (JSP)
        // slug: agent/get-existing-agent
        if(\Request::input("autocomplete") !== null){ //case dữ liệu cho autocomplete
            $postData = \Request::input();
            $response = post_json(AGENT_EXIST, $postData);
            return response()->json($response->data);
        }else{
            $postData = \Request::json()->all();
            $response = post_json(AGENT_EXIST, $postData);
            return response()->json($response);
        }
    }

    public function getExistingAgentByCustomerId(){
        // wiki: N/A
        // date: 06/06/2019
        // author: Jack (JSP)
        // slug: agent/get-existing-agent-by-customer-id
        $postData = \Request::json()->all();
        $response = post_json('agent/existing-with-customer', $postData);
        return response()->json($response);
    }

    public function convertCustomerToAgents(){
        // wiki: http://sc.propzy.vn/root/propzy-dashboard-webservice/wikis/convert-customer-to-agents
        // date: 05/06/2019
        // author: Jack (JSP)
        // slug: agent/convert-customer-to-agents
        $postData = \Request::json()->all();
        $response = put_json(CUSTOMER_TO_AGENT, $postData);
        // $respone->DATAPOST = $postData;
        return response()->json($response);
    }

    public function listShortInfo(){
        // wiki: http://sc.propzy.vn/root/propzy-dashboard-webservice/wikis/get-agent-with-code
        // date: 10/06/2019
        // author: Jack (JSP)
        // slug: agent/list-short-info
        $postData = \Request::input();
        $response = post_json(LIST_SHORT_INFO."/-1/-1", $postData);
        return response()->json($response);
    }

    public function updateCustomerInfo(){
        
        // wiki: http://sc.propzy.vn/root/propzy-dashboard-webservice/wikis/update-customer-info-for-deal
        // date: 17/06/2019
        // author: Jack (JSP)
        // slug: agent/update-customer-info
        $postData = \Request::input();
        $response = put_json(AGENT_UPDATE_CUSTOMER_INFO, $postData);
        return response()->json($response);
    }

    public function quickCreate() {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json("agent/quick-create", $postData);
        return response()->json($response);
    }

    public function advanceSearch() {
        $term = \Request::input('term');
        $type = \Request::input('type');
        $postData = array(
            'keySearch' => $term
        );
        $postUrl = str_replace("{type}", $type, REPORT_LIST_USER_TYPE);
        $response = post_json($postUrl, $postData);
        $returnValue = array();
        if ($response->data) {
            $returnValue = $response->data;
        }
        return response()->json($returnValue);
    }

    public function getPreviewForSetTarget() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $postData = array(
            "regionIdsList" => isset($requestData['regionIdsList']) && !empty($requestData['regionIdsList']) && $requestData['regionIdsList'] != "null" ? explode(',', $requestData['regionIdsList']) : NULL,
            "cityIdsList" => isset($requestData['cityIdsList']) && !empty($requestData['cityIdsList']) && $requestData['cityIdsList'] != "null" ? explode(',', $requestData['cityIdsList']) : NULL,
            "districtIdsList" => isset($requestData['districtIdsList']) && !empty($requestData['districtIdsList']) && $requestData['districtIdsList'] != "null" ? explode(',', $requestData['districtIdsList']) : NULL,
            "name" => isset($requestData['name']) && !empty($requestData['name']) && $requestData['name'] != "null" ? $requestData['name'] : NULL
        );
        $postUrl = "am/list/$page/$numberItem";
        $response = post_json($postUrl, $postData);

        //return response()->json($response);
        $data = $response->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function getAmsForSetTarget() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $postData = array(
            "regionIdsList" => isset($requestData['regionIdsList']) && !empty($requestData['regionIdsList']) && $requestData['regionIdsList'] != "null" ? explode(',', $requestData['regionIdsList']) : NULL,
            "cityIdsList" => isset($requestData['cityIdsList']) && !empty($requestData['cityIdsList']) && $requestData['cityIdsList'] != "null" ? explode(',', $requestData['cityIdsList']) : NULL,
            "districtIdsList" => isset($requestData['districtIdsList']) && !empty($requestData['districtIdsList']) && $requestData['districtIdsList'] != "null" ? explode(',', $requestData['districtIdsList']) : NULL,
            "name" => isset($requestData['name']) && !empty($requestData['name']) && $requestData['name'] != "null" ? $requestData['name'] : NULL
        );
        $postUrl = "user/list/am/by_region";
        $response = post_json($postUrl, $postData);

        //return response()->json($response);
        $data = $response->data;
        return response()->json($response);
    }

    public function getAmsAutoComplete() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $numberItem = 10;
        $postData = array(
            "regionIdsList" => isset($requestData['regionIdsList']) && !empty($requestData['regionIdsList']) && $requestData['regionIdsList'] != "null" ? explode(',', $requestData['regionIdsList']) : NULL,
            "cityIdsList" => isset($requestData['cityIdsList']) && !empty($requestData['cityIdsList']) && $requestData['cityIdsList'] != "null" ? explode(',', $requestData['cityIdsList']) : NULL,
            "districtIdsList" => isset($requestData['districtIdsList']) && !empty($requestData['districtIdsList']) && $requestData['districtIdsList'] != "null" ? explode(',', $requestData['districtIdsList']) : NULL,
            "name" => isset($requestData['name']) && !empty($requestData['name']) && $requestData['name'] != "null" ? $requestData['name'] : NULL
        );
        $postUrl = "user/list/am";
        $response = post_json($postUrl, $postData);

        //return response()->json($response);
        $data = $response->data;
        return response()->json($data);
    }

    public function setTarget() {
        return view("agent.set-target");
    }

    public function saveAmsTarget() {
        $postUrl = "am/target";
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json($postUrl, $postData);
        return response()->json($response);
    }

    public function saveSystemCredit() {
        $postUrl = "credit";
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = put_json($postUrl, $postData);
        return response()->json($response);
    }

    public function getSystemCredit() {
        $postUrl = "list/credits";
        $response = get_json($postUrl);
        return response()->json($response);
    }

    public function getSales() {
        $response = get_json(GET_AGENT_SALE_LIST);
        return response()->json($response);
    }

    /**
     * @description get AM by AgentId 
     * @param int $id agentId
     * @return type AM list
     */
    public function getAms($id) {
        $response = get_json(GET_AM_LIST . "/$id");
        return response()->json($response);
    }

    public function getList($type) {
        $response = get_json(GET_AGENT_LIST . "/$type");
        return response()->json($response);
    }

    public function scheduleSuggest() {
        $postData = \Request::input();
        //$postData['scheduleTime'] = df_int($postData['scheduleTime']);
        if (empty($postData['estimatedDate'])) {
            $postData['estimatedDate'] = null;
        }
        //return response()->json($postData);
        $response = post_json(AGENT_SUGGEST_CLIENT_SERVICE, $postData);
        return response()->json($response);
    }

    public function getDealsOfAgent($agentId,$dataPost){
        $resp = post_json("/agent/needs/$agentId",$dataPost);
        // $resp = json_decode('{"result":true,"code":"200","message":"Thao tác thành công","validatedMessage":null,"data":[{"id":"[Chị Phạm Ngọc Uyển Lan]-[Lead]-[161]","dealId":null,"leadId":161,"requestId":168,"customerId":"KM3","statusId":13,"statusName":"Pending","listingTypeId":2,"propertyTypeId":10,"listingTypeName":"Thuê","propertyTypeName":"Phòng cho thuê","email":null,"customerName":"Chị Phạm Ngọc Uyển Lan","name":null,"phone":null,"emails":"lanpham3103@gmail.com","phones":"0918162816","createdDate":1466074686000,"updatedDate":null,"assignedTo":21,"leadAssignedTo":21,"requestAgentId":26,"note":null,"missingInfo":null,"sourceName":null,"finalBudget":5000000,"tmId":null,"tmName":null,"baId":null,"baName":null,"needListingTypeId":null,"needListingTypeName":null,"needPropertyTypeId":null,"needPropertyTypeName":null,"formatPrice":null,"agentName":null,"wardName":null,"districtName":"Quận Tân Phú","initialBudget":5000000,"formatedFinalBudget":"5 triệu","formatedInitialBudget":"5 triệu"},{"id":"[Chị Phạm Ngọc Uyển Lan]-[Lead]-[161]","dealId":null,"leadId":161,"requestId":168,"customerId":"KM3","statusId":13,"statusName":"Pending","listingTypeId":2,"propertyTypeId":10,"listingTypeName":"Thuê","propertyTypeName":"Phòng cho thuê","email":null,"customerName":"Chị Phạm Ngọc Uyển Lan","name":null,"phone":null,"emails":"lanpham3103@gmail.com","phones":"0918162816","createdDate":1466074686000,"updatedDate":null,"assignedTo":21,"leadAssignedTo":21,"requestAgentId":26,"note":null,"missingInfo":null,"sourceName":null,"finalBudget":5000000,"tmId":null,"tmName":null,"baId":null,"baName":null,"needListingTypeId":null,"needListingTypeName":null,"needPropertyTypeId":null,"needPropertyTypeName":null,"formatPrice":null,"agentName":null,"wardName":null,"districtName":"Quận Tân Phú","initialBudget":5000000,"formatedFinalBudget":"5 triệu","formatedInitialBudget":"5 triệu"}],"additional":null}');
        
        $data = [];
        if($resp->result){
            $data = $resp->data;
        }
        return $data;
    }

    public function renderDealsOfAgentModal($agentId){
        $dataPost = \Request::json()->all();
        $viewData['data'] = $this->getDealsOfAgent($agentId,$dataPost);
        // return response()->json($viewData['data']);
        $returnHTML = view('shared.body-modal-deal-of-agent')->with($viewData)->render();
        $resp = (object) ["html"=>$returnHTML,"count"=>count($viewData['data'])];
        return response()->json($resp);
    }
    public function getStatusList() {
        $response = get_json("agent-status");
        return response()->json($response);
    }
    public function getSourceList() {
        $response = get_json("/channel-types/22");
        return response()->json($response);
    }
    public function getReasonCancel() {
        $response = get_json("/tpa/channel-types");
        return response()->json($response);
    }
    public function sendRequestTpa() {
        $postData = \Request::json()->all();
        $response = post_json('agent/request-cooperation', $postData);
        return response()->json($response);
    }
    public function verify() {
        $request = \Request::all();
        $postData = [
            'action' => isset($request['action']) && in_array($request['action'], ['APPROVED', 'REJECTED']) ? $request['action'] : null,
            'agentId' => isset($request['agentId']) ? $request['agentId'] : null,
            'sourceId' => isset($request['sourceId'])  ? $request['sourceId'] : null,
            'reasonId' => isset($request['reasonId'])  ? $request['reasonId'] : null,
            'reasonContent' => isset($request['reasonContent'])  ? $request['reasonContent'] : null,
        ];
        $response = post_json('agent/verify', $postData);
        return response()->json($response);
    }
    public function confirmRequestTpa() {
        $postData = \Request::all();
        $response = post_json('tpa/agent/operation-update', $postData);
        return response()->json($response);
    }
    public function loadInfoOwnerOrCustomer() {
        $postData = \Request::json()->all();
        $response = post_json('/agent/load-owner-customer-info', $postData);
        return response()->json($response);
    }


}
