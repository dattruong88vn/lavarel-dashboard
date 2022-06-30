<?php

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Task;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Carbon\Carbon;
use Session;
use View;
use DB;

class CrawlerListController extends CommonPosController
{

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return view("pos.crawler.list.index2");
    }

    public function getCrawlerList() {
        $data = \Request::json()->all();
        $response = post_json('crawler/tool/list/' . $data['pagination']['page'] . '/' . $data['pagination']['limit'], $data['dataPost']);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getSiteList() {
        $response = get_json('crawler/tool/sitelist');
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getDefaultList($define) {
        $url = 'crawler/util/code/' . $define;
        $response = get_json($url);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getPropertyList($id) {
        $response = get_json('crawler/property-type/list/' . $id);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getPropertyListPrefix($id) {
        $response = get_json(\Config::get('apis.lso.propertyTypesV2') . $id);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getDistrictList() {
        $userInfo = getLoggedInUserInfo();
        $userIdParam = $userInfo->userId;
        if($userInfo->userId == 159) { //159 là userId của pos manager
            $userIdParam = 0;
        }
        $response = get_json('district/config/user/' . $userIdParam);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getWardList($districtId) {
        $response = get_json('get_wards/' . $districtId);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getStreetList($wardId) {
        $response = get_json('streets/' . $wardId);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function createPreListings() {
        $postData = \Request::json()->all();
        $phomes = [];
        if (!empty($postData['phones'])) {
            foreach ($postData['phones'] as $key => $item) {
                $phomes[] = [
                    "phoneSub" => $item,
                    "isNew" => true,
                    "noteForPhone" => "Số phụ " . (++$key)
                ];
            }
        }
        $userInfo = getLoggedInUserInfo();
        //return response()->json($postData);
        $dataTransfer = [
            "id"=> null,
            "crawlerAdsId" => isset($postData['id']) ? $postData['id']:null,
            "ownerId"=> null,
            "fromId"=> null,
            "sourceId"=> 176, // Cào tự động
            "createdBy"=> $userInfo->userId, // Xem lại lấy user curent
            "updatedBy"=> $userInfo->userId, // Xem lại lấy user curent
            "assignedTo"=> $userInfo->userId, // Xem lại lấy user curent
            "assignedDate"=> time(),
            "cityId"=> $postData['cityId'],
            "districtId"=> $postData['districtId'],
            "wardId"=> $postData['wardId'],
            "streetId"=> $postData['streetId'],
            "houseNumber"=> isset($postData['houseNumber']) ? $postData['houseNumber']:null,
            "oldAddress"=> $postData['address'],
            "address"=> $postData['address'],
            "latitude"=> null,
            "longitude"=> null,
            "lotSize"=> null,
            "floorSize"=> null,
            "sizeLength"=> null,
            "sizeWidth"=> null,
            "bathRooms"=> null,
            "bedRooms"=> null,
            "floor"=> null,
            "isMezzanine"=> false,
            "isRooftop"=> false,
            "isPenhouse"=> false,
            "isAttic"=> false,
            "depositText"=> null,
            "isGuaranteed"=> null,
            "isVAT"=> null,
            "listingTypeId"=> $postData['listingTypeId'],
            "minContractDeadline"=> null,
            "minPrice"=> null,
            "moveInDate"=> null,
            "noteForLs"=> null,
            "noteFromLsCall"=> null,
            "diyRequestEdit"=> null,
            "diyRequestedDate"=> null,
            "isDoneForDiy"=> null,
            "suggestToDiy"=> null,
            "numberFloor"=> null,
            "statusId"=> null,
            "statusDate"=> null,
            "diyStatusId"=> null,
            "diyStatusDate"=> null,
            "rListingStatusId"=> null,
            "diyStatusName"=> null,
            "diyRequestLive"=> null,
            "diyStop"=> null,
            "photo"=> null,
            "photoGcn"=> null,
            "price"=> $postData['price'],
            "newPrice"=> $postData['price'],
            "currency"=> "VND",
            "propertyTypeId"=> $postData['propertyTypeId'],
            "roadFrontageDistanceFrom"=> null,
            "roadFrontageDistanceTo"=> null,
            "createdDate"=> time(),
            "updatedDate"=> time(),
            "useRightTypeId"=> null,
            "rlistingId"=> null,
            "isLocked"=> null,
            "isDeleted"=> null,
            "deletedBy"=> null,
            "deletedDate"=> null,
            "reasonId"=> null,
            "reasonContent"=> null,
            "roadPrice"=> null,
            "oldHouse"=> null,
            "valuationType"=> null,
            "yearBuilt"=> null,
            "yearFixed"=> null,
            "sellFolding"=> false,
            "buyNewHouse"=> false,
            "crawlerStatus"=> 2,
            "useDiy"=> null,
            "reasonNotUseDiy"=> null,
            "privacy"=> 2,
            "houseCastings"=> null,
            "valuationPriceFormat"=> null,
            "buildingId"=> null,
            "blockId"=> null,
            "owner"=> [
                "email"=> $postData['email'],
                "name"=> $postData['name'],
                "phone"=> $postData['phones'][0],
                "sourceId"=> 176,
                "phones"=> $phomes
            ],
            "agent" => null,
            "position" => null,
            "title" => "Xem lại tiêu đề này",
            "description" => "<p>Xem lại mô tả</p>",
            "statusQuoId" => null,
            "priceForStatusQuo" => null,
            "crawlerLink" => $postData['link'],
        ];
        $response = post_json(\Config::get('apis.crawlerList.transferCrawler'), $dataTransfer);
        return response()->json($response);
    }

    public function updateStatus() {
        $data = \Request::json()->all();
        $response = put_json('crawler/tool/update-status-list', $data);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function moveCrawler() {
        $data = \Request::json()->all();
        $response = put_json('crawler/tool/update-ownertype-list', $data);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getListByIdsPhones() {
        $data = \Request::json()->all();
        $response = post_json('/crawler/listings/relItem', $data);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getDuplicatePhones() {
        $data = \Request::json()->all();
        $response = post_json('crawler/owners/check-exists', $data);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getDuplicateEmails() {
        $data = \Request::json()->all();
        $response = post_json('crawler/owners/check-exists', $data);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function getDuplicateAddress() {
        $data = \Request::json()->all();
        $response = post_json('crawler/address/check-exists', $data);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function updateDuplicateItem() {
        $data = \Request::json()->all();
        $response = post_json('crawler/tool/update-duplicate-items', $data);
        if(!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }
}

