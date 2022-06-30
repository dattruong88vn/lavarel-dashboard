<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class BuildingController extends BaseController
{

	public function __construct()
	{
		parent::__construct();
		View::share('propertyTypeList', get_json(GET_PROPERTY_TYPE_LIST));
	}

	public function index()
	{
		$data['page_title'] = "Quản lý tòa nhà";
		//$data['buildings'] = get_json(GET_BUILDINGS)->data;
		return view('building.building');
	}

	public function buildingList(Request $request) {
	    $keyword = $request->get('keyword');
	    $length = $request->get('length');
        $start = $request->get('start');
        $sortColumn = $request->get('sortColumnName');
        $sortValue = $request->get('sortValue');
        $numberItem = isset($length) ? $length: 10;
        $page = ((isset($start) ? $start : 0) / $numberItem) + 1;
        $postData = ['keyword' => $keyword, 'sortColumnName' => $sortColumn, 'sortValue' => $sortValue];
	    $response =  post_json(GET_BUILDINGS . '/' . $page . '/' . $numberItem, $postData);
        $results = [
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => [],
            'postData' => $postData,
        ];
        if ($response->result) {
            $results['recordsTotal'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['recordsFiltered'] = isset($response->data->totalItems) ? $response->data->totalItems : 0;
            $results['data'] = isset($response->data->list) ? $response->data->list : [];
        }
        return response()->json($results);
    }

	/*public function buildingDetail($slug)
	{
		$buildingId = last_slug_indexof($slug, 1);
		$propertyTypeId = last_slug_indexof($slug, 2);
		$listingType = $propertyTypeId === 8 || $propertyTypeId === 9 || $propertyTypeId === 11 ? 1 : 2;
		$data['buildingAmenities'] = get_json(GET_AMENITIES . "/" . $listingType . "/" . $propertyTypeId . "/1");
		$data['page_title'] = $buildingId == "new" ? "Tạo mới tòa nhà" : "Sửa tòa nhà";
		return view('building-detail')->with($data);
	}*/

	public function newBuilding($listingType, $propertyType, $level)
	{
		$data['building'] = array();
		//$data['cities'] = get_json(GET_CITIES);
		$data['districts'] = get_json(GET_DISTRICTS . "/1");
		$data['buildingFeesTypeList'] = get_json(GET_FEES_TYPE_LIST);
		$data['propertyTypeId'] = $propertyType;
		$data['listingTypeId'] = $listingType;
		$data['page_title'] = "Thêm tòa nhà";
		$buildingAmenities = get_json('channel-types/15')->data;
        if (isset($buildingAmenities)) {
            $buildingAmenities = $buildingAmenities[0]->list;
            $order = [];
            $noChilds = [];
            $child = [];
            foreach ($buildingAmenities as $amenities) {
                if (count($amenities->childs) > 0) {
                    array_push($child, $amenities);
                } else if ($amenities->control != 'checkbox') {
                    array_push($order, $amenities);
                } else {
                    array_push($noChilds, $amenities);
                }
            }
            $buildingAmenities = array_merge($noChilds, $child, $order);
        } else {
            $buildingAmenities = [];
        }
        $data['buildingAmenities']  = $buildingAmenities;
        $data['includedAmenityIds'] = [];
        $data['page_type'] = 'CREATE';
        return view('building.building-create-edit')->with($data);
	}

	public function editBuildingPage($id)
	{
		$buildingId = $id;
        $data['building'] = [];
		$building = get_json(GET_BUILDING_DETAIL . "/" . $buildingId);

		if(!$building->result) {
            return redirect('/404-not-found');
        } else {
            $data['building'] = $building->data;
        }
//

        //$data['cities'] = get_json(GET_CITIES);
        $data['districts'] = get_json(GET_DISTRICTS . "/1");
        $data['buildingFeesTypeList'] = get_json(GET_FEES_TYPE_LIST);
        $data['listingTypeId'] = !empty($data['building']->listingType) ? $data['building']->listingType->listingTypeID : null;
        $data['listingType'] =!empty($data['building']->listingType) ? $data['building']->listingType->listingTypeID : null;
        $data['propertyTypeId'] = !empty($data['building']->propertyType) ? $data['building']->propertyType->propertyTypeID : null;
        $buildingAmenities = get_json('channel-types/15')->data;
        if (isset($buildingAmenities)) {
            $buildingAmenities = $buildingAmenities[0]->list;
            $noChilds = [];
            $child = [];
            foreach ($buildingAmenities as $amenities) {
                if (count($amenities->childs) > 0) {
                    array_push($child, $amenities);
                } else {
                    array_push($noChilds, $amenities);
                }
            }
            $buildingAmenities = array_merge($noChilds, $child);
        } else {
            $buildingAmenities = [];
        }

       // dd($data['building']);

        $data['buildingAmenities']  = $buildingAmenities;
        $data['includedAmenityIds'] = [];
        if (isset($data['building']->amenitiesList)) {
            foreach ($data['building']->amenitiesList as $key => $amenity) {
                if(isset($amenity->value)) {
                    $data['includedAmenityIds'][$amenity->id->amenityId] = $amenity->value;
                } else {
                    $data['includedAmenityIds'][$amenity->id->amenityId] = null;
                }
            };
        }
		$data['page_title'] = "Sửa tòa nhà";
        $data['page_type'] = 'EDIT';
		return view('building.building-create-edit')->with($data);
	}

	/**
	 * Upload image
	 *
	 * @param  Request $request
	 * @return JSON $data
	 */
	public function imageBuildingUploader(Request $request)
	{
		$type = $request->input('dir') ? ($request->input('dir') == 'use_right_type' ? 'useright' : 'listing') : 'listing';
		// Get upload image
		$image = Input::file('file_data');
		$fileId = md5($image->getClientSize() . time()) . '_image';
		$fileName = $fileId . '.' . $image->getClientOriginalExtension();

		// Upload image via API
		$uploadRs = uploadImageFilesUseApi($image, $type);
		$data = ["initialPreview" => ["<img src='" . UPLOAD_URL . $uploadRs['data']['file_name'] . "' data-src='" . $uploadRs['data']['file_name'] . "' class='file-preview-image' fileid='" . $fileId . "' alt='" . $fileName . "' title='" . $fileName . "'>"], "initialPreviewConfig" => ["caption" => "", "key" => $fileName]];

		return json_encode($data);
	}

	public function imageBuildingRemover(Request $request)
	{
		$filename = $request->get("key");
		if (file_exists(UPLOAD_PATH . 'images/' . $filename)) {
			unlink(UPLOAD_PATH . 'images/' . $filename);
		}
		if (file_exists(UPLOAD_PATH . 'thumbnail_for_gridview/' . $filename)) {
			unlink(UPLOAD_PATH . 'thumbnail_for_gridview/' . $filename);
		}
		if (file_exists(UPLOAD_PATH . 'thumbnail_for_similar/' . $filename)) {
			unlink(UPLOAD_PATH . 'thumbnail_for_similar/' . $filename);
		}
		if (file_exists(UPLOAD_PATH . 'thumbnail_for_mapview/' . $filename)) {
			unlink(UPLOAD_PATH . 'thumbnail_for_mapview/' . $filename);
		}
		$data = array();
		return json_encode($data);
	}

	public function videoBuildingUploader(Request $request)
	{
		$videoDocument = Input::file('file_data');
		$fileId = time() . '_video';
		$filename = $fileId . '.' . $videoDocument->getClientOriginalExtension();
		$file = move_uploaded_file($videoDocument->getRealPath(), UPLOAD_PATH . 'videos/' . $filename);

		$data["initialPreview"] = array(0 => "<video width='213px' height='160px' controls title='" . $filename . "'><source name='" . $fileId . "' title='" . $filename . "' src='" . UPLOAD_URL . "videos/" . $filename . "' type='video/mp4'><div class='file-preview-other'><span class='file-icon-4x'><i class='glyphicon glyphicon-file'></i></span></div></video>");
		$data["initialPreviewConfig"] = array(array("caption" => "", "key" => $filename));
		return json_encode($data);
	}

	public function videoBuildingRemover(Request $request)
	{
		$filename = $request->get("key");
		if (file_exists(UPLOAD_PATH . 'videos/' . $filename)) {
			unlink(UPLOAD_PATH . 'videos/' . $filename);
		}
		$data = array();
		return json_encode($data);
	}

	// Handle create building from JSON
	public function createBuilding(Request $request)
	{
		$data = $request->json()->all();
		if (!empty($data['building']['buildingName'])) {
			$data['building']['buildingName'] = htmlspecialchars($data['building']['buildingName'], ENT_QUOTES);
        }

		$response = post_json(CREATE_BUILDING, $data);
		return json_encode($response);
	}

	public function editBuilding(Request $request)
	{
		$data = $request->json()->all();
		if (!empty($data['building']['buildingName'])) {
			$data['building']['buildingName'] = htmlspecialchars($data['building']['buildingName'], ENT_QUOTES);
        }

		$response = put_json(EDIT_BUILDING, $data);
		return json_encode($response);
	}

	public function json()
	{
		return response()->json(['name' => 'Abigail', 'state' => 'CA']);
	}

	public function searchBuilding(Request $request) {
        $params = $request->only(['key', 'limit', 'cityId', 'districtId']);
        $params = [
            'key' => isset($params['key']) ? (string)$params['key'] : null,
            'limit' => isset($params['key']) ? (int)$params['limit'] : null,
            'districtId' => isset($params['districtId']) ? (int)$params['districtId'] : null,
            'cityId' => isset($params['cityId']) ? (int)$params['cityId'] : null,
        ];
        $response = post_json('building/like-name', $params);
        return json_encode($response);
    }
}
