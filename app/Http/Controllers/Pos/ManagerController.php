<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Session;
use View;
use Validator;

class ManagerController extends CommonPosController {

	private $api = [
		'getListReport' => 'seller/manager-report/%d/%d', // page/numberItems
		'getExport' => 'seller/manager-report/genrate-excel',
		'getSpecialListingExport' => 'export/guaranteed/manager-report',
		'getUserList' => 'user/lists/%d', // departmentId (17)
		'getDistrictByUser' => 'district/user/%d' // userId
	];

	public function __construct() {
		parent::__construct();
	}

	public function report() {
		return view("pos.manager.report");
	}
	public function getUserList() {
		$response = get_json(sprintf($this->api['getUserList'], 17));
		return response()->json($response);
	}
	public function getDistrictByUser() {
		$requestData = \Request::all();
		$id = $requestData['userId'];
		$response = get_json(sprintf($this->api['getDistrictByUser'], $id));
		return response()->json($response);
	}
	public function getListReport() {

		$requestData = \Request::all();

		$numberItems = isset($requestData['length']) ? $requestData['length'] : 10;
		$page = ($requestData['start'] / $numberItems) + 1;

        $dataPost = $this->builDataPost($requestData);
		
		$response = post_json(sprintf($this->api['getListReport'], $page, $numberItems), ($dataPost));
		$response = $this->builDataTable($response->data, $dataPost);

		return response()->json($response);
	}
	public function getExport() {
		$requestData = \Request::all();

		$dataPost = $this->builDataPost($requestData);

		$response = post_json_export($this->api['getExport'], ($dataPost));

		return response()->json($response);
	}
	public function getSpecialListingExport() {
		$dataPost = (object) [];
		$response = post_json_export($this->api['getSpecialListingExport'], $dataPost);

		return response()->json($response);
	}
	private function builDataTable($data, $dataPost) {
		$response = [
			'recordsTotal' => isset($data->totalItems) ? $data->totalItems : 0, 
			'recordsFiltered' => isset($data->totalItems) ? $data->totalItems : 0,
            'dataRequest' =>  $dataPost,
			'data' => isset($data->list) ? $data->list : [], 
		];
		return $response;
	}
	private function builDataPost($requestData) {
		$dataPost = [
		    "deptId" => !empty($requestData['deptId']) ? $requestData['deptId'] : null,
			"dateFrom"=> !empty($requestData['dateFrom']) ? $requestData['dateFrom'] : null,
	        "dateTo"=> !empty($requestData['dateTo']) ? $requestData['dateTo'] : null,
	        "ownerType"=> !empty($requestData['ownerType']) ? intval($requestData['ownerType']) : null,
	        "listingTypeId"=> !empty($requestData['listingTypeId']) ? intval($requestData['listingTypeId']) : null,
	        "propertyTypeId"=> !empty($requestData['propertyTypeId']) ? intval($requestData['propertyTypeId']) : null,
	        "sourceIds"=> !empty($requestData['sourceIds']) ? $requestData['sourceIds'] : null,
            "tcid"=> !empty($requestData['tcid']) ? $requestData['tcid'] : null,
            "channelTypeIds"=> !empty($requestData['channelTypeIds']) ? $requestData['channelTypeIds'] : null,
	        "priceFrom"=> !empty(floatval($requestData['priceFrom'])) ? floatval($requestData['priceFrom']) : null,
	        "priceTo"=> !empty(floatval($requestData['priceTo'])) ? floatval($requestData['priceTo']) : null,
	        "statusId"=> !empty($requestData['statusId']) ? intval($requestData['statusId']) : null,
	        "userId"=> !empty($requestData['userId']) ? $requestData['userId'] : null,
            "preUserId"=> !empty($requestData['preUserId']) ? intval($requestData['preUserId']) : null,
            "preStatusId"=> !empty($requestData['preStatusId']) ? $requestData['preStatusId'] : null,
	        "liveType"=> !empty($requestData['liveType']) ? intval($requestData['liveType']) : null,
	        "districtIds"=> !empty($requestData['districtIds']) ? implode(',', $requestData['districtIds']) : null,
	        "updateStatus" => !empty($requestData['updateStatus']) ? 1 : 0,
            "diyBonus" => !empty($requestData['diyBonus']) ? 1 : 0,
            "position" => !empty($requestData['position']) ? intval($requestData['position']) : null
		];

		if ($dataPost['listingTypeId'] == 1) {
			// ban (ty)
			if (isset($dataPost['priceFrom'])) {
				$dataPost['priceFrom'] *= 1000000000;
			}
			if (isset($dataPost['priceTo'])) {
				$dataPost['priceTo'] *= 1000000000;
            }
            
		} else if ($dataPost['listingTypeId'] == 2) {
			// thue (trieu)
			if (isset($dataPost['priceFrom'])) {
				$dataPost['priceFrom'] *= 1000000;
			}
			if (isset($dataPost['priceTo'])) {
				$dataPost['priceTo'] *= 1000000;
			}
		}



		return $dataPost;
	}
           
      

}
