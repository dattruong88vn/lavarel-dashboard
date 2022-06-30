<?php

namespace App\Http\Controllers\Pos;

use Storage;
use Session;
use View;
use Input;
use Validator;


class AgentController extends CommonPosController
{

    private $API_LIST = [
        "agent-list" => "agent/short-list",
        "send-app" => "agent/send-app/%d", //agent/send-app/{agentId}
        "edit-owner" => "seller/edit-owner/%d/%d",//{page}/{numberItem}
        "edit-owner-resolve" => "seller/edit-owner/resolve/%d/%d"//{rlistingId}/{agentId}"
    ];
	public function __construct() {
		parent::__construct();
	}


    /**
     * getAgentList
     * @return \Illuminate\Http\JsonResponse
     */
	public function getAgentList() {
        $requestData = \Request::json()->all();
        $response = $this->getResponseServer('POST', $this->API_LIST['agent-list'] , $requestData );
        return response()->json($response);
    }

    /**
     * sendApp
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendApp() {
        $requestData = \Request::all();
        $response = $this->getResponseServer('GET', sprintf($this->API_LIST['agent-list'], $requestData["agentId"]) , $requestData );
        return response()->json($response);
    }
    public function editOwner() {
        return view("pos.agent.index");
        //return redirect('/404-not-found');
    }
    public function editOwnerList() {
        $requestData = \Request::all();
        $numberPages = $this->getNumberPages($requestData);
        $data = [
            "rlistingId" => isset($requestData['rlistingId']) ? $requestData['rlistingId'] : null,
            "agentName"=> isset($requestData['agentName']) ? $requestData['agentName'] : null,
            "ownerName"=> isset($requestData['ownerName']) ? $requestData['ownerName'] : null,
            "email"=> isset($requestData['email']) ? $requestData['email'] : null,
            "newPhone"=> isset($requestData['newPhone']) ? $requestData['newPhone'] : null,
            "currentPhone"=> isset($requestData['currentPhone']) ? $requestData['currentPhone'] : null,
            "fromCreatedDate"=> isset($requestData['fromCreatedDate']) ? $requestData['fromCreatedDate'] : null,
            "toCreatedDate"=> isset($requestData['toCreatedDate']) ? $requestData['toCreatedDate'] : null,
            "isResolved"=> 0,
            "fromResolvedDate"=> isset($requestData['fromResolvedDate']) ? $requestData['fromResolvedDate'] : null,
            "toResolvedDate"=> isset($requestData['toResolvedDate']) ? $requestData['toResolvedDate'] : null,
            "sort"=> isset($requestData['sort']) ? $requestData['sort'] : null,
            ];
        $response = $this->getResponseServer('POST', sprintf($this->API_LIST['edit-owner'],$numberPages['pages'], $numberPages['items']) , $data );
        if ($response->result) {
            $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $dataResponse = isset($response->data->list) ? $response->data->list : [];
            $response->recordsTotal = $total;
            $response->recordsFiltered = $total;
            $response->data = $dataResponse;
        }
        return response()->json($response);
    }
    public function editOwnerResolve() {
        $requestData = \Request::all();
        $data = [
            "rlistingId" => isset($requestData['rlistingId']) ? $requestData['rlistingId'] : null,
            "agentId" => isset($requestData['agentId']) ? $requestData['agentId'] : null,
        ];
        $response = $this->getResponseServer('GET', sprintf($this->API_LIST['edit-owner-resolve'], $data["rlistingId"], $data["agentId"]) , $data );
        return response()->json($response);
    }

}
