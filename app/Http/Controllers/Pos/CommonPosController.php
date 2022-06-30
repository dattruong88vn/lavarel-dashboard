<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class CommonPosController extends BaseController
{

	protected $tmpLoggedInUser;

	private $apiList = [
		'addNewStreet' => 'streets',
		'loadDepartmentUserList' => 'user/account/list-common',
		'loadDepartmentUserListWithEntity' => 'user/responsible/list',
		'reassignListing' => 'prescreen/listings/re-assign',
		'reassignSAListing' => 'seller/listings/re-assign',
		'getReassignAllListingId' => 'v2/seller/listings/all-ids',
		'getAgentList' => 'agent/short-list',
		'getAgentListV2' => 'agent/short-list',
		'getSourceChild' => 'prescreen/channel-types-child-and-tc/%d/%d', // type, parentId
		'getInformationChannel' => 'prescreen/channel-types-child-and-tc/%d/%d', // type, parentId
		'get-channel-types' => 'channel-types/%d',
		'saCheckDuplicateAddress' => 'seller/listings/check-exists'
	];

	private $numberOfPage = null;


	public function __construct()
	{
		parent::__construct();
		// Logged-in user
		$this->tmpLoggedInUser = getLoggedInUserInfo();
		$tmpLoggedInUser = $this->tmpLoggedInUser;

		// Department ID
		$tmpDepartmentId = isset($tmpLoggedInUser->departments[0]->departmentId)
			? $tmpLoggedInUser->departments[0]->departmentId : 0;

		$this->numberOfPage = 10;
		View::share('tmpDepartmentId', $tmpDepartmentId);

		// Department ID
		$isGroupAdmin = (isset($tmpLoggedInUser->departments[0]->isGroupAdmin) && $tmpLoggedInUser->departments[0]->isGroupAdmin)
			? true : false;
		View::share('isGroupAdmin', $isGroupAdmin);


		View::share('loggedInUser', $this->tmpLoggedInUser);
		// BASE API
		View::share('baseApiLink', BASE_UPLOAD_API);
	}

	/**
	 * API Check Owner is exist by phones or email
	 *
	 * @date 10/11/2017
	 * @return JSON
	 */
	public function checkExistsOwner()
	{
		$requestData = \Request::json()->all();
		$response = post_json("prescreen/owners/check-exists", $requestData);
		return response()->json($response);
	}

	/**
	 * API Check Owner is exist address
	 *
	 * @date 10/11/2017
	 * type = 1 (tin dang hệ thống)
	 * type = 2 (tin dang lso)
	 * @return JSON
	 */
	public function checkDuplicatedAddress()
	{
		$requestData = \Request::json()->all();
		$response = post_json("prescreen/listings/check-exists", $requestData);
		return response()->json($response);
	}
	public function checkSADuplicatedAddress()
	{
		$requestData = \Request::json()->all();
		$response = post_json($this->apiList['saCheckDuplicateAddress'], $requestData);
		return response()->json($response);
	}

	/**
	 * API get status list by type
	 *
	 * @date 10/11/2017
	 * @return JSON
	 */
	public function getStatusList($type)
	{
		$response = get_json("crawler/listings/status/" . $type);
		return response()->json($response);
	}

	/**
	 * Upload image
	 *
	 * @param  Request $request
	 *
	 * @return JSON $data
	 */
	public function uploadPhoto()
	{
		$type = 'listing';
		// Get upload image
		$images = Input::file('files');
		$results = [];
		if (count($images) > 0) {
			foreach ($images as $key => $image) {
				$uploadRs = uploadImageFilesUseApi($image, $type);
				$results = array_add($results, $key, $uploadRs);
			}
		}
		// Upload image via API
		return response()->json($results);
	}

	public function getBuildings()
	{
		$response = get_json("building/list-short-name");
		return response()->json($response);
	}

	public function getBuildingListByDistrictId()
	{
		$requestData = \Request::json()->all();
		$districtId = (isset($requestData['districtId']) ? $requestData['districtId'] : -1);
		$response = get_json("building/list" . '/' . $districtId);
		$response->urlApi = "building/list" . '/' . $districtId;
		return response()->json($response);
	}

	public function getBlocksByBuilding($id)
	{
		if ($id === "null") {
			$id = 0;
		}
		$response = get_json("blocks/list/" . $id);
		return response()->json($response);
	}

	public function lockUnlock($id)
	{
		$response = get_json(sprintf(\Config::get('apis.prescreener.lock-unlock'), $id));
		return response()->json($response);
	}

    public function pushToOwnerList($id)
    {
        $response = get_json(sprintf(\Config::get('apis.prescreener.push-to-owner'), $id));

        return response()->json($response);
    }

	public function userRightTypes()
	{
		$response = get_json(\Config::get('apis.common.use-right-types'));
		return response()->json($response);
	}

	public function resendAccountInfo($ownerId)
	{
		$response = get_json(sprintf(\Config::get('apis.prescreener.resend'), $ownerId));
		return response()->json($response);
	}

	public function addNewStreet()
	{
		$requestData = \Request::json()->all();
		$response = post_json($this->apiList['addNewStreet'], $requestData);
		return response()->json($response);
	}

	public function loadDepartmentUserList()
	{
        $requestData = \Request::input();
        $postData = $requestData;

        if (empty($requestData)) {
            $response = post_json($this->apiList['loadDepartmentUserList'], [
                "searchText" => '',
                "departmentIds" => null,
                "useConfigCurrentUser" => false
            ]);
            return response()->json([
                'recordsTotal' => count($response->data),
                'recordsFiltered' => count($response->data),
                'data' => isset($response->data) ? $response->data : [],
            ]);
        }

        if (!empty($requestData['departmentIds'])) {
            $postData["departmentIds"] = $requestData['departmentIds'];
        }
        if (!empty($requestData['useConfigCurrentUser'])) {
            $postData["useConfigCurrentUser"] = $requestData['useConfigCurrentUser'];
        }
        
		$response = post_json($this->apiList['loadDepartmentUserList'], [
            "searchText" => '',
            "departmentIds" => [(int) $postData["departmentIds"]],
            "useConfigCurrentUser" => $postData["useConfigCurrentUser"]
        ]);
		$response = [
			'recordsTotal' => count($response->data),
			'recordsFiltered' => count($response->data),
			'data' => isset($response->data) ? $response->data : [],
		];
		return response()->json($response);
	}

	public function loadDepartmentUserListWithEntity($entity)
	{
		$api = $this->apiList['loadDepartmentUserListWithEntity'] . "/$entity";
		// $response = get_json($api);
		$response = get_json($api);
		$response = [
			'recordsTotal' => count($response->data),
			'recordsFiltered' => count($response->data),
			'data' => isset($response->data) ? $response->data : [],
		];
		return response()->json($response);
	}

	public function reassignListing()
	{
		$requestData = \Request::json()->all();
		$postData = $requestData;

		$response = post_json($this->apiList['reassignListing'], $postData);
		$response->postData = $postData;
		return response()->json($response);
	}

	public function reassignSAListing()
	{
		$requestData = \Request::json()->all();
		$postData = $requestData;
		$response = post_json($this->apiList['reassignSAListing'], $postData);
		$response->postData = $postData;
		return response()->json($response);
	}

	public function getReassignAllListingId()
	{
		$requestData = \Request::json()->all();
		$postData = $this->buildFilterData($requestData);
		$response = post_json($this->apiList['getReassignAllListingId'], $postData);
		$response->postData = $postData;
		return response()->json($response);
	}

	function buildFilterData($requestData)
  	{
		$type = intval($requestData['type']);
		$phone = !empty($requestData['phone']) ? $requestData['phone'] : null;
		$sourceId = !empty($requestData['sourceId']) ? $requestData['sourceId'] : null;
		$tcId = !empty($requestData['tcid']) ? $requestData['tcid'] : null;
		$channelTypeIds = !empty($requestData['channelTypeIds']) ? $requestData['channelTypeIds'] : null;
		$address = !empty($requestData['address']) ? $requestData['address'] : null;
		$ownerName = !empty($requestData['ownerName']) ? $requestData['ownerName'] : null;
		$rlistingId = !empty($requestData['rlistingId']) ? $requestData['rlistingId'] : null;
		$fromAssignedDate = !empty($requestData['fromAssignedDate']) ? $requestData['fromAssignedDate'] : null;
		$toAssignedDate = !empty($requestData['toAssignedDate']) ? $requestData['toAssignedDate'] : null;
		$typeLive = !empty($requestData['liveType']) ? intval($requestData['liveType']) : null;
		$dealStatus = !empty($requestData['dealStatus']) ? $requestData['dealStatus'] : null;
		$scorecardType = !empty($requestData['scorecardType']) ? intval($requestData['scorecardType']) : null;
		$listingTypeId = !empty($requestData['listingTypeId']) ? (int) $requestData['listingTypeId'] : null;
		$propertyTypeIds = !empty($requestData['propertyTypeIds']) ?  (string) $requestData['propertyTypeIds'] : null;
		$mapCode = isset($requestData['mapCode']) ? $requestData['mapCode'] : null;
		$landCode = isset($requestData['landCode']) ? $requestData['landCode'] : null;

		return [
		'type' => $type,
		'phone' => $phone,
		'rlistingId' => $rlistingId,
		'ownerName' => $ownerName,
		'address' => $address,
		'sourceId' => $sourceId,
		'fromAssignedDate' => $fromAssignedDate,
		'toAssignedDate' => $toAssignedDate,
		'fromReviewedDate' => $fromAssignedDate,
		'toReviewedDate' => $toAssignedDate,
		'dealStatus' => $dealStatus,
		'liveType' => $typeLive,
		'tcid' => $tcId,
		'channelTypeIds' => $channelTypeIds,
		'listingTypeId' => $listingTypeId,
		'propertyTypeIds' => $propertyTypeIds,
		'mapCode' => $mapCode,
		'landCode' => $landCode,
		'scorecardType' => $scorecardType,
		'zoneIds' => !empty($requestData['zoneField']) ? $requestData['zoneField'] : null,
		'teamIds' => !empty($requestData['teamField']) ? $requestData['teamField'] : null,
		'departmentIds' => !empty($requestData['departmentField']) ? $requestData['departmentField'] : null,
		'userIds' => !empty($requestData['memberField']) ? $requestData['memberField'] : null,
		'districtId' => !empty($requestData['districtId']) ? $requestData['districtId'] : null,
		'wardId' => !empty($requestData['wardId']) ? $requestData['wardId'] : null,
		];
  	}

	public function getAgentList()
	{
		$response = get_json($this->apiList['getAgentList']);
		return response()->json($response);
	}

	public function getAgentListV2()
	{
		$requestData = \Request::json()->all();
		$response = post_json($this->apiList['getAgentListV2'], $requestData);
		$response->requestData = $requestData;
		return response()->json($response);
	}

	public function getSourceChild()
	{
		$request = \Request::all();
		$parentId = isset($request['parentId']) && $request['parentId'] > 0 ? $request['parentId'] : 0;
		$response = $this->getResponseServer('GET', sprintf($this->apiList['getSourceChild'], 1, $parentId), ['type' => 1, 'parentId' => $parentId]);
		return response()->json($response);
	}

	public function getInformationChannel()
	{
		// method get

		//$request = \Request::all();
		// with type = 0 get channel type parent
		$type = 0;
		// with type = 0 then we will ignore parent id
		$parentId = 0;
		$response = $this->getResponseServer('GET', sprintf($this->apiList['getInformationChannel'], $type, $parentId), ['type' => $type, 'parentId' => $parentId]);
		return response()->json($response);
	}

	public function getInformationChannelChild()
	{
		// method get
		$request = \Request::all();
		// with type <> 0 get channel type child
		$type = 1;
		// parent id  > 0 get channel type child with parent id. else get all children of all parents.
		$parentId = isset($request['parentId']) && $request['parentId'] > 0 ? $request['parentId'] : 0;
		$response = $this->getResponseServer('GET', sprintf($this->apiList['getInformationChannel'], $type, $parentId), ['type' => $type, 'parentId' => $parentId]);
		return response()->json($response);
	}

	public function channelTypes()
	{
		$request = \Request::all();
		if (isset($request['type'])) {
			$response = $this->getResponseServer('GET', sprintf($this->apiList['get-channel-types'], $request['type']), ['type' => $request['type']]);
		} else {
			$response = $this->getResponseServer('NONE', sprintf($this->apiList['get-channel-types'], ''), ['type' => '']);
		}

		return response()->json($response);
	}

	protected function getResponseServer($method, $url, $data = [])
	{
		$response = collect(
			[
				"additional" => null,
				"code" => 500,
				"data" => [],
				"message" => "Đã có lỗi xảy ra ",
				"result" => false,
				"validatedMessage" => null
			]
		);
		switch ($method) {
			case "GET": {
					$response = get_json($url);
					break;
				}
			case "POST": {
					$response = post_json($url, $data);
					break;
				}
			case "PUT": {
					$response = put_json($url, $data);
					break;
				}
			case "DEL": {
					$response = delete_json($url);
					break;
				}
			case  "NONE": {
					break;
				}
		}

		$response->requestData = $data;
		$response->http = $url;
		return $response;
	}
	protected function getNumberPages($request)
	{
		$items = isset($request['length']) ? $request['length'] : $this->numberOfPage;
		return [
			'items' => $items,
			'pages' => ((isset($request['start']) ? $request['start'] : 0) / $items) + 1
		];
	}
}
