<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\ZoneController as Zone;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class MembersController extends CommonPosController
{

    private $API_LIST = [
        'getReason' => "tpa/channel-types",
        "send-sms" => "tpa/send/sms",
        "send-notify" => "tpa/send/notification",
        "get-overview" => "tpa/agent-overview",
        "get-listing-member" => "tpa/listings/%d/%d",
        "get-list-lead" => "agent/leads/%d/%d",
        "get-list-deal" => "agent/deals/%d/%d",
        "update-commission" => "tpa/agent/commission-update",
        'export-excel' => 'tpa/courses/members/export'
    ];
    public function __construct()
    {
        parent::__construct();

    }

    public function index(){
        return view("pos.training.members");
    }


    public function getOverview() {
        $requestData = \Request::all();
        $postData = $postData = $this->buildFilter($requestData);
        $response = $this->getResponseServer('POST', $this->API_LIST['get-overview'], $postData );
        return response()->json($response);
    }

    /**
     * get member list
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMemberList(){
        $requestData = \Request::all();
        $numberPages = $this->getNumberPages($requestData);
        $postData = $postData = $this->buildFilter($requestData);

        $response = $this->getResponseServer('POST', sprintf(\Config::get('apis.training.getListMembers'),$numberPages['pages'],$numberPages['items']), $postData );
        $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
        $dataResponse = isset($response->data->list) ? $response->data->list : [];
        $response->recordsTotal = $total;
        $response->recordsFiltered = $total;
        $response->data = $dataResponse;
        return response()->json($response);
    }

    public function tranferCourse(){
        $requestData = \Request::all();
        $dataPost = [
              "courseId"=> (int) $requestData['courseId'],
              "agentId"=> (int)  $requestData['agentId'],
              "oldCourseId" => (int)  $requestData['oldCourseId'],
        ];
        $response = post_json("/tpa/courses/re-enroll",$dataPost);
        return response()->json($response);
    }

    public function changeStatus(){

        $requestData = \Request::all();

        $response = $this->getResponseServer('NONE', "/tpa/courses/members/status", $requestData );
        if(isset($requestData["typeId"])) {
            switch ($requestData["typeId"]) {
                case 1 : {
                    $dataPost = [
                        "statusId"=> !empty($requestData["statusId"]) ? $requestData["statusId"] : null,
                        "typeId"=> 1,
                        "courseId"=> !empty($requestData["courseId"]) ? $requestData["courseId"] : null,
                        "agentId"=> !empty($requestData["agentId"]) ? $requestData["agentId"] : null,
                        "socialUid"=> !empty($requestData["socialUid"]) ? $requestData["socialUid"] : null,
                        "reasonId"=> !empty($requestData["reasonId"]) ? $requestData["reasonId"] : null,
                        "reasonContent"=> !empty($requestData["reasonContent"]) ? $requestData["reasonContent"] : null,
                        "newCourseId" => !empty($requestData["newCourseId"]) ? $requestData["newCourseId"] : null,
                        "score"=> !empty($requestData["score"]) ? $requestData["score"] : null,
                    ];
                    $response = $this->getResponseServer('POST', "/tpa/courses/members/status", $dataPost );
                    break;
                }
                case 2 : {
                    $dataPost = [
                        "statusId"=> !empty($requestData["statusId"]) ? $requestData["statusId"] : null,
                        "contractStatus"=> !empty($requestData["contractStatus"]) ? $requestData["contractStatus"] : null,
                        "typeId"=> 2,
                        "courseId"=> !empty($requestData["courseId"]) ? $requestData["courseId"] : null,
                        "agentId"=> !empty($requestData["agentId"]) ? $requestData["agentId"] : null,
                        "contractReasonId"=> !empty($requestData["contractReasonId"]) ? $requestData["contractReasonId"] : null,
                        "contractReasonContent"=> !empty($requestData["contractReasonContent"]) ? $requestData["contractReasonContent"] : null,
                    ];
                    $response = $this->getResponseServer('POST', "/tpa/courses/members/status", $dataPost );
                }
            }

        }

        return response()->json($response);
    }

    public function getStatusMember() {
        $result = $this->getResponseServer('GET', \Config::get('apis.training.getStatus'), [] );
        return response()->json($result);
    }
    public function getReason() {
        $result = $this->getResponseServer('GET', $this->API_LIST["getReason"], [] );
        return response()->json($result);
    }

    public function store(){

    }

    public function sendSms() {

        $requestData = \Request::all();
        $data = [
            'phones' => isset($requestData["phones"]) ? $requestData["phones"] : null,
            'content' => isset($requestData["content"]) ? $requestData["content"] : null,
        ];
        $result = $this->getResponseServer('POST', $this->API_LIST["send-sms"], $data);
        return response()->json($result);
    }
    public function sendNotify() {

        $requestData = \Request::all();
        $data = [
            "types" => [
                "socialUids" => isset($requestData["socialUids"]) ? $requestData["socialUids"]: null,
                "agentIds" => [],
            ],
            'content' => isset($requestData["content"]) ? $requestData["content"] : null,
        ];
        $result = $this->getResponseServer('POST', $this->API_LIST["send-notify"], $data);
        return response()->json($result);
    }
    public function getListInfo() {
        $requestData = \Request::all();
        $type = isset($requestData["type"]) ? $requestData["type"] : null;
        $numberPages = $this->getNumberPages($requestData);
        $dataPost = [
            "agentId" => isset($requestData["agentId"]) ? $requestData["agentId"] : null,

        ];
        switch ($type) {
            case 1 : {
                // listing
                $response = $this->getResponseServer('POST', sprintf($this->API_LIST["get-listing-member"],$numberPages['pages'],$numberPages['items']), $dataPost );
                break;
            }
            case 2 : {
                // lead
                $response = $this->getResponseServer('POST', sprintf($this->API_LIST["get-list-lead"],$numberPages['pages'],$numberPages['items']), $dataPost );
                break;
            }
            case 3 : {
                $response = $this->getResponseServer('POST', sprintf($this->API_LIST["get-list-deal"],$numberPages['pages'],$numberPages['items']), $dataPost );
                // deal
                break;
            }
            default :{
                $response = $this->getResponseServer('NONE', "", $dataPost );
                break;
            }

        }


        $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
        $dataResponse = isset($response->data->list) ? $response->data->list : [];
        $response->recordsTotal = $total;
        $response->recordsFiltered = $total;
        $response->data = $dataResponse;
        return response()->json($response);
    }

    public function setCommission() {
        $requestData = \Request::all();
        $data = [
            "agentId" =>  isset($requestData["agentId"]) ? $requestData["agentId"]: null,
            "commissionList" =>  isset($requestData["commissionList"]) ? $requestData["commissionList"]: null,
        ];
        $response = $this->getResponseServer('POST', $this->API_LIST["update-commission"], $data );
        return response()->json($response);
    }

    public function exportExcel() {
        $requestData = \Request::all();
        $postData = $postData = $this->buildFilter($requestData);
        $response = $this->getResponseServer('POST', $this->API_LIST['export-excel'], $postData );
        return response()->json($response);
    }

    private function buildFilter($requestData) {
        $postData = [
            "sort"=> [
                "columnName"=>"createdDate",
                "value"=>"desc"
            ],
            "statusId"=>null,
            "contractStatus"=>null,
            "fromDate"=>null,
            "toDate"=>null,
            "courseIdList"=>null,
            "phone" => null,
            "requestTypeId" => null,
            "userTypeId" => null,
        ];
        if(isset($requestData['order'])) {
            foreach ($requestData['order'] as $key => $item) {
                $postData['sort'] = [
                    "columnName" => $requestData['columns'][$item['column']]['data'],
                    "value" => $item['dir']
                ];
            }
        }

        // Rewrite filter every column to format avirable type
        if(!empty($requestData['statusId']) && $requestData['statusId']!=-1){
            $postData['statusId'] = (int) $requestData['statusId'];
        }

        if(!empty($requestData['contractStatus']) && $requestData['contractStatus']!=-1){
            $postData['contractStatus'] = (int) $requestData['contractStatus'];
        }

        if(!empty($requestData['courseIdList']) && $requestData['courseIdList']!=-1){
            $postData['courseIdList'] = $requestData['courseIdList'];
        }
        $postData['phone'] = !empty($requestData['phone']) ? $requestData['phone'] : null;
        $postData['requestTypeId'] = !empty($requestData['requestTypeId']) ? $requestData['requestTypeId'] : null;
        $postData['userTypeId'] = !empty($requestData['userTypeId']) ? $requestData['userTypeId'] : null;

        return $postData;
    }
}
