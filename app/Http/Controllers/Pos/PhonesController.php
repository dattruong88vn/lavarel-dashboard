<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
use Session;
use View;
use Input;
use Validator;

class PhonesController extends CommonPosController
{

	private $apiList = [
	    'getLiveListingByPhone'=>'seller/listings/by-phone',
        'trackCallSa' => 'seller/listings/%d/track-call',
        'trackCallPre' => 'prescreen/listings/%d//track-call',
        'changePhone' => 'seller/listings/reverse-phone-number',
        'mergeListing'=> 'seller/listings/merge-owner', //{ownerIdFrom}/{ownerIdTo}
        'cancelListingPre'=>'prescreen/listings/cancel',
        'cancelListingSa' => 'seller/listings/cancel'
    ];

	private $numberOfPage;

	public function __construct() {
	    parent::__construct();
	    $this->numberOfPage = 10;
    }

    public function getLiveListingByPhone() {
        $requestData = \Request::all();
        $numberPages = $this->getNumberPages($requestData);

        $data = [
            'type' => isset($requestData['type']) ? $requestData['type'] : null,
            'phone' => isset($requestData['phone']) ? $requestData['phone'] : null,
        ];
        $response = $this->getResponseServer('POST', $this->apiList['getLiveListingByPhone'] . '/' . $numberPages['pages'] . '/' . $numberPages['items'] , $data );
        if ($response->result) {
            $total = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $dataResponse = isset($response->data->list) ? $response->data->list : [];
            $response->recordsTotal = $total;
            $response->recordsFiltered = $total;
            $response->data = $dataResponse;
        }
        return response()->json($response);
	}

	public function trackCall() {
        $request = \Request::all();
        $url3CX = null;
        $id = isset($request['id'])  ?  $request['id'] : null;
        $type = isset($request['department'])  ?  intval($request['department']) : null;
        if (!empty($id)) {
            $url = "";
            switch ($type) {
                case 1 : {
                    // pre
                    $url = sprintf($this->apiList['trackCallPre'], $id);
                    $url3CX = '3cx/update-track-prescreen-history-call';
                    break;
                }
                case  2 : {
                    // sa
                    $url = sprintf($this->apiList['trackCallSa'], $id);
                    $url3CX = '3cx/update-track-seller-history-call';
                    break;
                }
            }
            if(CALL_SERVICES != 2){
                $response = put_json_with_header($url3CX, $request);
            }else{
                $response = $this->getResponseServer('POST', $url , $request );
            }
        } else {
            $response = $this->getResponseServer("NONE");
        }
        $response->url3CX = $url3CX;
        return response()->json($response);
    }

    public function changePhone() {
        $requestData = \Request::json()->all();
        $response = $this->getResponseServer('POST', $this->apiList['changePhone'],$requestData );
        return response()->json($response);
    }

    public function mergeListing() {
        $request = \Request::json()->all();
        $ownerIdFrom = isset($request['ownerIdFromList'])  ?  $request['ownerIdFromList'] : null;
        $ownerIdTo = isset($request['ownerIdTo'])  ?  $request['ownerIdTo'] : null;

        $data = [
            "ownerIdFromList" => $ownerIdFrom,
            "ownerIdTo" => $ownerIdTo
        ];
        if (empty($ownerIdFrom) || empty($ownerIdTo)) {
            $response = $this->getResponseServer('NONE', $this->apiList['mergeListing'],$data );
        } else {
            $response = $this->getResponseServer('POST', $this->apiList['mergeListing'],$data );
        }
        return response()->json($response);
    }

    public function cancelListing() {
        $request = \Request::json()->all();
        $type = isset($request['type'])  ?  $request['type'] : null;

        if ($type == 1) {
            // pre
            $data = [
                "lsoIdList" => isset($request['listIds'])  ?  $request['listIds'] : null,
                "statusId" => isset($request['statusId'])  ?  $request['statusId'] : null,
                "reasonContent" => isset($request['reasonContent'])  ?  $request['reasonContent'] : null,
            ];
            $response = $this->getResponseServer('PUT', $this->apiList['cancelListingPre'],$data );
        } else if ($type == 2) {
            // sa
            $data = [
                "rlistingIdList" => isset($request['listIds'])  ?  $request['listIds'] : null,
                "statusId" => isset($request['statusId'])  ?  $request['statusId'] : null,
                "reasonId" => isset($request['reasonId'])  ?  $request['reasonId'] : null,
                "reasonContent" => isset($request['reasonContent'])  ?  $request['reasonContent'] : null,
            ];
            $response = $this->getResponseServer('PUT', $this->apiList['cancelListingSa'],$data );
        } else {
            $response = $this->getResponseServer('NONE', $this->apiList['cancelListingSa'],$request );
        }

        return response()->json($response);

    }
	
}