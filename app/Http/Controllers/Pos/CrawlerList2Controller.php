<?php

namespace App\Http\Controllers\Pos;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\ZoneController as Zone;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;
use mysql_xdevapi\Exception;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class CrawlerList2Controller extends CommonPosController
{

    private $API = [
        'crawler-api-mongo' => 'data-filters/bb18ba6d-0128-499a-a367-cbd981aeb0d7?offset=%d&limit=%d&access_token=f3dea0c4-ef3a-48fe-b518-adb8bcbc75d1',
        'crawler-api-update-status'=> 'data-updates/7dffc43d-3231-4f55-a5ac-6d505dffc8c7/%d?access_token=f3dea0c4-ef3a-48fe-b518-adb8bcbc75d1',
        'crawler-api-cancel' => 'data-updates/bb18ba6d-0128-499a-a367-cbd981aeb0d7/%d?access_token=f3dea0c4-ef3a-48fe-b518-adb8bcbc75d1',
        'checkDuplicate' => 'crawler/owners/check-exists',
        'checkAddressDuplicate' => 'crawler/address/check-exists',
        'export-excel' => 'data-exports/bb18ba6d-0128-499a-a367-cbd981aeb0d7?access_token=f3dea0c4-ef3a-48fe-b518-adb8bcbc75d1'
    ];
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $dataView['list_site'] = get_json(\Config::get('apis.crawlerList.getSite'))->data->list;
        $dataView['list_status'] = [
            (object) ['_id'=>1,'name'=>'Mới'],
            (object) ['_id'=>2,'name'=>'Đã chuyển'],
            (object) ['_id'=>3,'name'=>'Hủy'],
        ];

        $dataView['districtList'] = get_json(GET_DISTRICT_LIST_BY_CITY . '/' . 1)->data;
        $dataView['wardList'] = get_json(GET_WARD_LIST . "/" . $dataView['districtList'][0]->districtId)->data;
        return view("pos.crawler.list.index", $dataView);
    }


    public function getListCrawler()
    {
        $request = \Request::all();
        $postData = $this->buildDataPost($request);
        $offset =  isset($request['start']) ? $request['start'] : 0;
        $limit = isset($request['length']) ? $request['length'] : 10;
        $response = null;
        try {
            $response = post_json_external(CRAWLER_API . sprintf($this->API['crawler-api-mongo'], $offset, $limit), $postData);
        } catch (Exception $e) {
            // nothing for exception
        }

        $dataResponse = [
          'total' => 0,
          'data' => []
        ];
        if(isset($response) && $response->code === 200) {
            $dataResponse['total'] = $response->total_records;
            $dataResponse['data'] = isset($response->data) ? $response->data : [];
        }

        $viewData = array(
            //'filterSorts' => $postData['sort'],
           // 'filter' => $postData['filter'],
            'dataPost' => $postData,
            'recordsTotal' => $dataResponse['total'],
            'recordsFiltered' => $dataResponse['total'],
            'data' => $dataResponse['data'],
        );
        return response()->json($viewData);
    }

    public function updateStatusSend() {
        $requestData = \Request::all();
        $id = isset($requestData['id']) ? $requestData['id'] : null;
        $response = post_json_external(CRAWLER_API . sprintf($this->API['crawler-api-update-status'], $id), [
            'idstatus' => 2 // đã chuyển
        ]);
        return response()->json($response);
    }
    public function cancelCrawler() {
        $requestData = \Request::all();
        $id = isset($requestData['id']) ? $requestData['id'] : null;
        $response = post_json_external(CRAWLER_API . sprintf($this->API['crawler-api-cancel'], $id), [
            'idreason' => isset($requestData['idreason']) ? $requestData['idreason'] : null,
            'reasonname' => isset($requestData['reasonname']) ? $requestData['reasonname'] : null,
        ]);
        return response()->json($response);
    }

    public function exportExcel() {
        $requestData = \Request::all();
        $postData = $this->buildDataPost($requestData);
        // change date export

        /*$createDate = array_filter($postData["filter"], function($val) {
            if($val["columnName"] == "createdDate") {
                return $val;
            }
        });

        if(count($createDate) == 0) {
            $today = Carbon::now()->timestamp * 1000;
            $oneMonth = Carbon::now()->subMonth(1)->timestamp * 1000;

            array_push($postData["filter"], [
                "columnName"=> 'createdDate',
                "value" => 'date:'. ($oneMonth).'-date:'. ($today)
            ]);
        }*/
        //if (isset($postData["filter"]))

        if (isset($this->tmpLoggedInUser->departments[0]->isGroupAdmin) && $this->tmpLoggedInUser->departments[0]->isGroupAdmin) {
            $response = post_json_external_stream(CRAWLER_API . $this->API['export-excel'], $postData);
        } else {
            $response =  null;
        }
        ob_end_clean();
        $name = 'crawler_list_'.Carbon::now()->timestamp.'.xlsx';

        Storage::disk('local')->put($name, $response);
        //
        $path = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix() . $name;
        return response()->download($path, $name, [
            'Content-Type' => 'application/vnd.ms-excel; charset=utf-8'
        ])->deleteFileAfterSend(true);
    }



    public function checkDuplicate()
    {
        $requestData = \Request::all();
        $data_post =[
            "email"=> isset($requestData['email']) ? $requestData['email']:null,
            "phones"=> isset($requestData['phone']) ? $requestData['phone']:null,
            "ownerId"=> null,
            "type" => isset($requestData['type']) ? (int) $requestData['type']: 1
        ];
        $response = post_json($this->API['checkDuplicate'],$data_post);
        return response()->json($response);
    }

    public function checkAddressDuplicate() {
        $requestData = \Request::all();
        $data_post = [
              "lsoId"=> null,
              "cityId"=> !empty($requestData['cityId']) ? (int) $requestData['cityId']:null,
              "districtId"=> !empty($requestData['districtId']) ? (int) $requestData['districtId']:null,
              "wardId"=> !empty($requestData['wardId']) ? (int) $requestData['wardId']:null,
              "streetId"=> !empty($requestData['streetId']) ? (int) $requestData['streetId']:null,
              "address"=> $requestData['address'],
              "houseNumber"=> !empty($requestData['houseNumber']) ? (int) $requestData['houseNumber']:null
        ];
        //return response()->json($requestData);
        $response = post_json($this->API['checkAddressDuplicate'],$data_post);
        return response()->json($response);
    }

    public function transferCrawler() {
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
        //return response()->json($dataTransfer);
        //var_dump(\Config::get('apis.crawlerList.transferCrawler')); die();
        $response = post_json(\Config::get('apis.crawlerList.transferCrawler'), $dataTransfer);
        return response()->json($response);
    }

    /*public function cancelCrawler()
    {
        $response = get_json(sprintf(\Config::get('apis.crawlers.statuses') . "/%d", 1));
        return response()->json($response);
    }*/

    /*public function changeStatus(){
        $requestData = $data_post =  \Request::all();
        unset($data_post['id']);
        //return response()->json($data_post);
        $response = put_json('crawler/tool/status-update/'.$requestData['id'],$requestData);
        return response()->json($response);
    }*/

    public function getPropertyTypes(){
        return response()->json([
            0=>['id'=>1,'name'=>'Bán'],
            1=>['id'=>2,'name'=>'Thuê'],
        ]);
    }

    public function getCrawlerListingStatuses()
    {
        $response = get_json(sprintf(\Config::get('apis.crawlers.statuses') . "/%d", 1));
        return response()->json($response);
    }

    private function buildDataPost($requestData) {
        $postData = [
            'address' => !empty($requestData['filter']['address']) ? (string)  $requestData['filter']['address'] : null,
            'type' => !empty($requestData['filter']['type']) ? (int)  $requestData['filter']['type'] : 1,
            'phone' => !empty($requestData['filter']['phone']) ? [$requestData['filter']['phone']] : null,
            'email' => !empty($requestData['filter']['email']) ? $requestData['filter']['email'] : null,
            "filtersort" => [
                [
                    "r_field" => null,
                    "value" => null,
                ]
            ]

        ];
        if(!empty($requestData['filter']['siteId'])) {
            $postData['siteid'] = (int) $requestData['filter']['siteId'];
        }
        if(!empty($requestData['filter']['listingTypeId'])) {
            $postData['listingtypeid'] = (int) $requestData['filter']['listingTypeId'];
        }
        if(!empty($requestData['filter']['propertyTypeId'])) {
            $postData['propertytypeid'] = (int) $requestData['filter']['propertyTypeId'];
        }
        if(!empty($requestData['filter']['statusId'])) {
            $postData['statusid'] = (int) $requestData['filter']['statusId'];
        }
        if(!empty($requestData['filter']['districtId'])) {
            $postData['districtid'] = array_map('intval', $requestData['filter']['districtId']);;
        }
        if(!empty($requestData['filter']['wardId'])) {
            $postData['wardid'] = (int) $requestData['filter']['wardId'];
        }
        if(!empty($requestData['filter']['streetId'])) {
            $postData['streetid'] = (int) $requestData['filter']['streetId'];
        }
        if(!empty($requestData['filter']['initialbudget'])) {
            $postData['initialbudget'] = (double) $requestData['filter']['initialbudget'];
        }
        if(!empty($requestData['filter']['finalbudget'])) {
            $postData['finalbudget'] = (double) $requestData['filter']['finalbudget'];
        }
        if(!empty($requestData['filter']['startdate'])) {
            $postData['startdate'] = (double) $requestData['filter']['startdate'];
        } else {
            $postData['startdate'] = Carbon::createFromDate(2010, 01, 01)->timestamp * 1000;
        }
        if(!empty($requestData['filter']['enddate'])) {
            $postData['enddate'] = (double) $requestData['filter']['enddate'];
        } else {
            $postData['enddate'] = Carbon::createFromDate(2050, 01, 01)->timestamp * 1000;
        }
        if (!empty($requestData['filter']['isDuplicate'])) {
            $postData['duplicate'] = $requestData['filter']['isDuplicate'] == 2 ? true : false;
        }
        $order_column = $requestData['order'][0]['column'];
        $order_value = $requestData['order'][0]['dir'];

        $postData['filtersort'][0]['r_field'] = $requestData['columns'][$order_column]['data'];
        $postData['filtersort'][0]['value'] = $order_value;

        return $postData;
    }
}