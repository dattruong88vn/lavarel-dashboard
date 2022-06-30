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

class DiyController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $sources = array(
            1 => "Porttal",
            2 => "Diy"
        );
        $viewData['sources'] = $sources;

        $sentStatusList = array(
            0 => "Chưa gửi",
            1 => "Đã gửi"
        );
        $viewData['sentStatusList'] = $sentStatusList;

        $statusList = array(
            1 => "Unlocked",
            2 => "Locked"
        );

        $viewData['statusList'] = $statusList;

        return view("diy.list")->with($viewData);
    }

    public function getListData() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'];
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : null;
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            'sortColumn' => $sortColumn,
            'sortType' => $sortType,
            "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : "")
        );
        //return response()->json($postData);
        $data = post_json(DIY_LIST . "/" . $page . "/10", $postData)->data;
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function updateStatus() {
        $postData = \Request::json()->all();
        $response = post_json("diy/update-status", $postData);
        return response()->json($response);
    }

    public function updateSent() {
        $postData = \Request::json()->all();
        $response = post_json("diy/update-send", $postData);
        return response()->json($response);
    }

    public function detail($id) {
        $vats = [
            0 => "Không bao gồm VAT",
            1 => "Bao gồm VAT"
        ];
        $viewData['vats'] = $vats;
        $useRightTypes = [
            1 => "Sổ đỏ",
            2 => "Sổ hồng",
            4 => "Giấy tay",
            3 => "Khác"
        ];
        $viewData['useRightTypes'] = $useRightTypes;

        $propertyTypes = [
            1 => "Bán",
            2 => "Thuê"
        ];
        $viewData['propertyTypes'] = $propertyTypes;
        $requestData = \Request::input();
        $sourceType = $requestData['sourceType'];
        $viewData['sourceType'] = $requestData['sourceType'];
        $response = get_json("diy/$sourceType/$id");
        $item = $response->data;
        /*
          if (isset($item->relatedListing) && $item->relatedListing != null) {
          $item->alley = $item->relatedListing->alley;
          $item->lotSize = $item->relatedListing->lotSize;
          $item->sizeLength = $item->relatedListing->sizeLength;
          $item->sizeWidth = $item->relatedListing->sizeWidth;
          $item->floorSize = $item->relatedListing->floorSize;
          $item->bedRooms = $item->relatedListing->bedRooms;
          $item->bathRooms = $item->relatedListing->bathRooms;
          $item->isGuaranteed = $item->relatedListing->isGuaranteed;
          }
         * 
         */
        $viewData['item'] = $item;
        $viewData['relatedListing'] = isset($response->data->relatedListing) ? $response->data->relatedListing : null;

        //return response()->json($response);
        return view("diy.detail")->with($viewData);
    }

    public function createListing() {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json("listing/quick", $postData);
        return response()->json($response);
    }

    public function createDiyAccount() {
        $postData = \Request::json()->all();
        $response = post_json("user/create-diy-account", $postData);
        return response()->json($response);
    }

    public function updateOwner() {
        $postData = \Request::json()->all();
        //$response = post_json("diy/update-owner", $postData);
        $response = post_json("diy/update-owner", $postData);
        return response()->json($response);
    }

    public function delete() {
        $postData = \Request::json()->all();
        $response = post_json("diy/delete", $postData);
        return response()->json($response);
    }

    public function save() {
        $postData = \Request::json()->all();
        $response = put_json("diy", $postData);
        return response()->json($response);
    }

}
