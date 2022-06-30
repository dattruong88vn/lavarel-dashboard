<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use mysql_xdevapi\Exception;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class AgentManagerController extends BaseController {

    private $API = [
        'agent-detail' => 'agent/%d', //$agentId
        'agent-change-status' => 'agent/change_status',
        'agent' => 'agent',
        'agent-list' => 'agent/list/v3/%d/%d', //{pageNumber}/{numberItem}
        "get-listing-request" => "tpa/agent/cooperation-list/%d/%d",
        "update-request" => "tpa/agent/operation-update",
    ];
    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return $this->show();
    }
    // quản lý agents
    public function show() {
        return view('agent-manager.show');
    }
    // quản lý request from of tpa
    public function managementRequests() {
        return view('agent-manager.agent-management-requests');
    }

    public function getAgentList() {
        $requestData = \Request::all();
        $numberPage = $this->numberPageFromRequest($requestData);
        $dataPost = [
            'statusId' => !empty($requestData['statusId']) ? $requestData['statusId'] : null,
            'searchKeywords' => isset($requestData['searchKeywords']) ? $requestData['searchKeywords'] : null,
            'sortType' => isset($requestData['sortType']) ? $requestData['sortType'] : 'desc',
            'sortColumn' => isset($requestData['sortColumn']) ? $requestData['sortColumn'] : 'createdDate',
        ];



        $results = [
            'data' => [],
            'totalItems' => 0,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'overview' => [
                [
                    'statusId' => 7,
                    'value' => 0
                ],
                [
                    'statusId' => 1,
                    'value' => 0
                ]
            ],
        ];
        try {
            $response = post_json(sprintf($this->API['agent-list'], $numberPage['pages'], $numberPage['items']), $dataPost);
            if ($response->result && isset($response->data)) {
                $results['data'] = $response->data->list;
                $results['totalItems'] = $response->data->totalItems;
                $results['recordsTotal'] = $response->data->totalItems;
                $results['recordsFiltered'] = $response->data->totalItems;
                $results['overview'] = $response->data->overview;
            }
        } catch (\Exception $e) {

        }

        return response()->json($results);

    }
    // detail agent
    public function create() {
        $data = [
            'pageTypeAgent' => 'CREATE',
            'detail' => json_encode([]),
        ];
        return view('agent-manager.agent-create-edit')->with($data);

    }
    public function detail($agentId) {
        $result = get_json(sprintf($this->API['agent-detail'],$agentId ));
        if (!$result->result) {
            return abort(404);
        }
        $data = [
            'pageTypeAgent' => 'EDIT',
            'detail' => json_encode($result->data)
        ];
        return view('agent-manager.agent-create-edit')->with($data);
    }

   /* public function changeAgentStatus() {
        $data = \Request::all();
        $dataPost = [
            'agentId' => (int) $data['agentId'],
            'statusId' => (int) $data['statusId'],
            'note' => $data['note'],
        ];
        $response = post_json($this->API['agent-change-status'], $dataPost);
        return json_encode($response);
    }*/
    public function agentCreateJson() {
        $data = \Request::json()->all();
        $response = post_json($this->API['agent'], $data);
        return json_encode($response);
    }
    public function agentUpdateJson() {
        $data = \Request::json()->all();
        $response = put_json($this->API['agent'], $data);
        return json_encode($response);
    }


    // request tpa
    public function getListRequest() {
        $requestData = \Request::all();
        $numberPages = $this->numberPageFromRequest($requestData);

        $postData = [
            'name' => isset($requestData['name']) ? $requestData['name'] : null,
            'email' => isset($requestData['email']) ? $requestData['email'] : null,
            'phone' => isset($requestData['phone']) ? $requestData['phone'] : null,
            'sourceId' => isset($requestData['sourceId']) ? (int)$requestData['sourceId'] : null,
            'requestTypeId' => isset($requestData['requestTypeId']) ? (int)$requestData['requestTypeId'] : null,
            'fromDate' => isset($requestData['fromDate']) ? $requestData['fromDate'] : null,
            'toDate' => isset($requestData['toDate']) ? $requestData['toDate'] : null,
            'sort' => isset($requestData['sort']) ? $requestData['sort'] : ['columnName' => 'requestDate', 'value' => 'desc'],
        ];

        $response = post_json(sprintf($this->API['get-listing-request'],$numberPages['pages'],$numberPages['items']), $postData );
        $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
        $dataResponse = isset($response->data->list) ? $response->data->list : [];
        $response->recordsTotal = $total;
        $response->recordsFiltered = $total;
        $response->data = $dataResponse;
        return response()->json($response);
    }

    public function setRequestAgent() {
        $requestData = \Request::all();
        $data = [
            "agentId" =>  isset($requestData["agentId"]) ? $requestData["agentId"]: null,
            "requestTypeId" =>  isset($requestData["requestTypeId"]) ? $requestData["requestTypeId"]: null,
            "statusId" =>  isset($requestData["statusId"]) ? $requestData["statusId"]: null,
        ];
        $response = $this->getResponseServer('POST', $this->API_LIST["update-request"], $data );
        return response()->json($response);
    }

   /* public function create() {
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1")->data;
        $data['agentStatusList'] = get_json("agent-status")->data;
        $data['emplyementTypes'] = get_json("agent/employment-types")->data;
        $data['agentPropertyTypes'] = get_json("property_type/list");
        return view('agent-manager.agent-create')->with($data);
    }*/

    // Functions for AS team
   /* public function detail($agentId) {

        $data['results'] = get_json(GET_AGENT_DETAIL . "/" . $agentId);

        //return response()->json($data['results']);
        // var_dump(get_json(GET_AGENT_DETAIL."/".$agentId));
        // exit();
        $data['agentStatusList'] = get_json("agent-status")->data;
        $data['emplyementTypes'] = get_json("agent/employment-types")->data;
        $data['agentPropertyTypes'] = get_json("property_type/list");
        $data['districtList'] = get_json(GET_DISTRICT_LIST . "/1")->data;
        if ($data['results']->data->agentSettings) {
            foreach ($data['results']->data->agentSettings as $key => $agentSettingsValue) {
                $data['listingTypeId' . $agentSettingsValue->id->listingTypeId] = "checked";
            }
        }
        $data['acManagersList'] = get_json(GET_ACCOUNT_MANAGER . "/8");
        $data['html_brokerage_firm_list'] = $this->getHtmlBrokerageFirmList(true);
        return view('agent-manager.agent-detail')->with($data);
    }*/

  /*  public function blackList() {
        $data['results'] = get_json(GET_BLACK_LIST);
        return view('agent-manager.black-list')->with($data);
    }

    public function warningList() {
        $data['results'] = get_json(GET_WARNING_LIST);
        return view('agent-manager.warning-list')->with($data);
    }

    public function agentVieweds($agentId) {
        $data['results'] = get_json(GET_AGENT_VIEWED_LIST . "/" . $agentId);
        return view('agent-manager.agent-viewed')->with($data);
    }

    public function onlineRequests() {
        return view('operation.as-online-requests');
    }

    public function offlineRequests() {
        return view('operation.as-offline-requests');
    }

    public function agentLock($agentId) {
        $results = get_json(GET_LOCK_AGENT . "/" . $agentId);
        return response()->json($results);
    }

    public function agentUnLock($agentId) {
        $results = get_json(GET_UNLOCK_AGENT . "/" . $agentId);
        return response()->json($results);
    }



    public function agentUpdateJson() {
        $data = \Request::json()->all();
        $response = put_json(AGENT_UPDATE, $data);
        return json_encode($response);
    }

    public function agentChangeStatusJson() {
        $data = \Request::json()->all();
        $response = post_json(AGENT_CHANGE_STATUS, $data);
        return json_encode($response);
    }

    public function agentReport($agentId, $reasonId) {
        $response = get_json(AGENT_REPORT . "/" . $agentId . "/" . $reasonId);
        return json_encode($response);
    }

    public function agenAssignBrokerageFirm($agentId, $brokerageId) {
        $response = get_json(AGENT_ASSIGN_BROKERAGE_FIRM . "/" . $agentId . "/" . $brokerageId);
        return json_encode($response);
    }

    public function resetPasswordJson() {
//        $data = $request->json()->all();
        $data = \Request::json()->all();
        $response = post_json(AGENT_CHANGE_STATUS, $data);
        return json_encode($response);
    }

    public function imageAgentAvatarUploader() {
        $image = Input::file('file_data');
        $fileId = md5($image->getClientSize() . time()) . '_image';
        $fileName = $fileId . '.' . $image->getClientOriginalExtension();

        // Upload image via API
        $uploadRs = uploadImageFilesUseApi($image, "avatar");
        $data = [
            "initialPreview" => ["<img src='" . UPLOAD_URL . $uploadRs['data']['file_name'] . "' data-src='" . $uploadRs['data']['file_name'] . "' class='agent-avatar file-preview-image' fileid='" . $fileId . "' alt='" . $fileName . "' title='" . $fileName . "'>"],
            "initialPreviewConfig" => ["caption" => "","key" => $fileName]
        ];
        return json_encode($data);
    }

    public function imageAgentAvatarRemover() {
        $filename = UPLOAD_PATH . 'images/' . \Request::input("key");
        if (file_exists($filename) && is_file($filename)) {
            unlink($filename);
        }
        $data = array();
        return json_encode($data);
    }

    public function imageAgentCompanyLogoUploader() {
        $image = Input::file('file_data');
        $fileId = md5($image->getClientSize() . time()) . '_image';
        // var_dump($fileId);
        // exit();
        $filename = $fileId . '.' . $image->getClientOriginalExtension();

        $img = Image::make($image->getRealPath())
            ->save(UPLOAD_PATH . 'images/' . $filename);
        $data["initialPreview"] = array("<img class='agent-companylogo file-preview-image' src='" . UPLOAD_URL . "images/" . $filename . "'  fileid='" . $fileId . "' alt='" . $filename . "' title='" . $filename . "'>");
        $data["initialPreviewConfig"] = array(
            array("caption" => "", "key" => $filename)
        );
        return json_encode($data);
    }

    public function imageAgentCompanyLogoRemover() {
        $filename = UPLOAD_PATH . 'images/' . \Request::input("key");
        if (file_exists($filename) && is_file($filename)) {
            unlink($filename);
        }
        $data = array();
        return json_encode($data);
    }

    public function sendContactToAm() {
        $postData = \Request::json()->all();
        $response = post_json("user/as/send-contact-for-am", $postData);
        return response()->json($response);
    }

    public function contactSentToAm() {
        return view("agent-manager.contact-sent-to-am");
    }

    public function contactSentToAmData() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $search = \Request::input('search');
        $postData = [
            "term" => $search['value'] ? $search['value'] : NULL
        ];
        $response = post_json("user/list/contact-to-send-am/$page/10", $postData);
        //return response()->json($response);
        $returnObject = array(
            'draw' => \Request::get('draw') ? \Request::get('draw') : 1,
            "recordsTotal" => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($returnObject);
    }

    public function updateContactComment() {
        $postData = \Request::json()->all();
        $response = post_json("user/comment-for-contact", $postData);
        return response()->json($response);
    }

    public function quickCreateAgent() {
        $postData = \Request::json()->all();
        $response = post_json("agent/quick-create", $postData);
        return response()->json($response);
    }

    public function getAmList() {
        $amList = get_json(GET_ACCOUNT_MANAGER . "/8");
        return response()->json($amList);
    }

    public function exportAgents() {
        $statusId = \Request::input("status_id");
        $response = get_json("export/report/active_list/$statusId");
        return response()->json($response);
    }*/

}
