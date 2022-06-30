<?php

namespace App\Http\Services;

use \Cache;
use Validator;
use App\Http\Services\CommonService;
use Illuminate\Support\Facades\Log;

class LsoService {

  private $commonService;

  public function __construct(CommonService $commonService) {
    $this->commonService = $commonService;
  }

  /**
   * Lấy danh sách (Quản lý chủ nhà)
   *
   * @param  array $requestData
   * @return array $viewData
   */
  public function getListings($requestData) {
    try {
      $page = get_current_page($requestData);
      $postData = [
            "address" =>  checkInputData($requestData['address']),
            "name" =>  checkInputData($requestData['name']),
            "phone" =>  checkInputData($requestData['phone']),
            "statusId" =>  checkInputData($requestData['statusId']),
            "cityId" =>  checkInputData($requestData['cityId']),
            "districtId" =>  checkInputData($requestData['cityId']),
            "wardId" =>  checkInputData($requestData['wardId']),
            "streetId" =>  checkInputData($requestData['streetId']),
            "sourceId" =>  checkInputData($requestData['sourceId']),
            "lsoSourceId" =>  checkInputData($requestData['lsoSourceId']),
        ];
      $response = post_json(\Config::get('apis.lso.list') . "$page/".NUMBER_ITEMS, $postData);
      $viewData = [
            'recordsTotal' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
            'recordsFiltered' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
            'data' => isset($response->data->list) ? $response->data->list : [],
            'totalItems' => isset($response->data->totalItems) ? $response->data->totalItems : 0
        ];
      return $viewData;
    } catch (Exception $e) {
      return [];
    }
  }

  /**
   * Lấy danh sách (Yêu cầu nội bộ)
   *
   * @param  array $requestData
   * @return array $viewData
   */
  public function getInternalListings($requestData) {
    try {
      $rListingId = is_numeric($requestData['rListingId']) ? $requestData['rListingId'] : -1;
      $response = get_json(\Config::get('apis.lso.listInternal') . $rListingId);
      $viewData = [
            'recordsTotal' => isset($response->data->totalItems) ? count($response->data) : 0,
            'recordsFiltered' => isset($response->data->totalItems) ? count($response->data) : 0,
            'data' => isset($response->data) ? $response->data : [],
            'totalItems' => isset($response->data) ? count($response->data) : 0
        ];
      return $viewData;
    } catch (Exception $e) {
      return [];
    }
  }

  public function createRequestInternal() {
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
        "lsoId" => "required|numeric",
        "content" => "required"
      ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => "Xin kiểm tra lại dữ liệu"];
      } else {
        $response = post_json(\Config::get('apis.lso.createInternalRequest'), $requestData);
      }
      return $response;
    } catch (\Exception $e) {
      return [];
    }
  }

  /**
   * Lịch sử hoạt động
   *
   * @param  array $requestData
   * @return array $viewData
   */
  public function getHistories($requestData) {
    try {
      $page = get_current_page($requestData);
      $response = get_json(\Config::get('apis.lso.histories') . $requestData['id'] . '/' . $page . '/' . NUMBER_ITEMS);
      $viewData = [
          'recordsTotal' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
          'recordsFiltered' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
          'data' => isset($response->data->list) ? $response->data->list : [],
          'totalItems' => isset($response->data->totalItems) ? $response->data->totalItems : 0
      ];
      return $viewData;
    } catch (Exception $e) {
      return [];
    }
  }

  /**
   * Get Listing By Owner
   *
   * @param  array $requestData
   * @return array $viewData
   */
  public function getListingByOwner($requestData) {
    try {
      $page = get_current_page($requestData);
      $response = get_json(\Config::get('apis.lso.listingOwner') . $requestData['id'] . '/' . $page . '/' . NUMBER_ITEMS);
      $viewData = [
          'recordsTotal' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
          'recordsFiltered' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
          'data' => isset($response->data->list) ? $response->data->list : [],
          'totalItems' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
      ];
      return $viewData;
    } catch (Exception $e) {
      return [];
    }
  }

  /**
   * Lấy chi tiết tin đăng
   *
   * @param string $value [description]
   */
  public function getListingDetail($id = '') {
    try {
      $response = get_json(\Config::get('apis.lso.detail') .$id);
      $listing = $response->data;
      return $listing;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Assign cho nhân viên LSO
   *
   * [function description]
   * @var [type]
   */
  public function reassignLso($requestData) {
    try {
      $response = post_json(\Config::get('apis.lso.reassign'), $requestData);
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Tạo note
   *
   * @param  [type] $requestData [description]
   * @return [type]              [description]
   */
  public function createListingNote($requestData) {
    try {
      $response = post_json(\Config::get('apis.lso.note'), $requestData);
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Danh sách tình trạng
   *
   * @return [type] [description]
   */
  public function getStatusList() {
    try {
      $response = Cache::remember('lsoStatuses', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.statuses'));
      });

      // In case response data is empty
      if (!isset($response->data) || empty($response->data)) {
        $response = get_json(\Config::get('apis.lso.statuses'));
      }

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Danh sách loại BĐS
   *
   * @param  [type] $typeId [description]
   * @return [type]         [description]
   */
  public function getPropertyTypeList($typeId) {
    try {
      $response = Cache::remember('lsoPropertyTypes_'. $typeId, \Config::get('constant.expiredAt'), function() use ($typeId) {
        return get_json(\Config::get('apis.lso.propertyTypes').$typeId);
      });

      if (empty($response)) {
        $response = get_json(\Config::get('apis.lso.propertyTypes').$typeId);
      }

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function getPropertyTypeListV2($groupId, $typeId) {
    try {
      $response = Cache::remember('lsoPropertyTypes_'.$groupId . '_'.$typeId, \Config::get('constant.expiredAt'), function() use ($groupId, $typeId) {
        return get_json(\Config::get('apis.lso.propertyTypesV2') . $groupId.'/' . $typeId);
      });

      if (empty($response)) {
        $response = get_json(\Config::get('apis.lso.propertyTypesV2') . $groupId . '/' . $typeId);
      }

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function getPropertyTypeListPrefix($typeId) {
    try {
      $response = Cache::remember('lsoPropertyTypes_byListingTypes'.$typeId, \Config::get('constant.expiredAt'), function() use ($typeId) {
        return get_json(\Config::get('apis.lso.propertyTypesV2') . $typeId);
      });

      if (empty($response)) {
        $response = get_json(\Config::get('apis.lso.propertyTypesV2') . '/' . $typeId);
      }

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function getPropertyGroupList(){
    try {
      $response = Cache::remember('lsoPropertyTypeGroup', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.propertyTypeGroup'));
      });

      if (empty($response)) {
        $response = get_json(\Config::get('apis.lso.propertyTypeGroup'));
      }

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }
  /**
   * TO-DO: Function is not used
   * API lấy danh sách nguồn
   *
   * @return [type] [description]
   */
  public function getSourceTypes() {
    try {
      $response = Cache::remember('lsoSourceTypes', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.sourceTypes'));
      });      

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Danh sách chủ quyền
   *
   * @param string $value [description]
   */
  public function getRightTypes() {
    try {
      $response = Cache::remember('lsoRightTypes', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.rightTypes'));
      });

      if (!isset($response->data) || empty($response->data)) {
        $response = get_json(\Config::get('apis.lso.rightTypes'));
      }

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * TO-DO: This function is not used
   * Loại nhà
   *
   * @return [type] [description]
   */
  public function getHouseTypes() {
    try {
      $response = Cache::remember('lsoHouseTypes', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.houseTypes'));
      });

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * TO-DO: This function is not used
   * Danh sách ưu điểm
   *
   */
  public function getAdvantages() {
    try {
      $response = Cache::remember('lsoAdvantages', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.advantages'));
      });

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * TO-DO: This function is not used.
   * Danh sách nhược điểm
   *
   * @param string $value [description]
   */
  public function getDisadvantages() {
    try {
      $response = Cache::remember('lsoDisadvantages', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.disadvantages'));
      });

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * TO-DO: This function is not used.
   * Danh sách loại công trình
   *
   * @return [type] [description]
   */
  public function getConstructionTypes() {
    try {
      $response = Cache::remember('lsoContructionTypes', \Config::get('constant.expiredAt'), function() {
        return get_json(\Config::get('apis.lso.constructionTypes'));
      });

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function getLsoMembers() {
    try {
      // $response = Cache::remember('listlsoMembers', \Config::get('constant.expiredAt'), function() {
      //   return get_json("user/responsible/list");
      // });

      $response = get_json("user/responsible/list");

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function stopListing() {
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
        "lsoId" => "required|numeric",
        "reason" => "required"
      ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => "Xin kiểm tra lại dữ liệu"];
      } else {
        $response = post_json(\Config::get('apis.lso.stopLs'), $requestData);
      }
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function rejectListing() {
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
        "lsoId" => "required|numeric",
        "reasonId" => "required|numeric"
      ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => "Xin kiểm tra lại dữ liệu"];
      } else {
        $response = post_json(\Config::get('apis.lso.rejectLs'), $requestData);
      }
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function soldRentListing() {
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
        "lsoId" => "required|numeric",
        "type" => "required|numeric",
        "source" => "required"
      ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => "Xin kiểm tra lại dữ liệu"];
      } else {
        $response = post_json(\Config::get('apis.lso.rentSoldLs'), $requestData);
      }
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function sendRequestListing() {
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
        "lsoId" => "required|numeric",
        "content" => "required",
      ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => "Xin kiểm tra lại dữ liệu"];
      } else {
        $response = post_json(\Config::get('apis.lso.sendRequestLS'), $requestData);
      }
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  public function resend($ownerId) {
    try {
      if (!is_numeric($ownerId)) {
        throw new Exception("OwnerId không hợp lệ !");
      }

      $response = get_json(\Config::get('apis.lso.resend') . $ownerId);
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * PS
   * Get LSO Service
   */
  public function getLsoServices() {        
    try {
      $requestData = \Request::input();

      if (!is_numeric($requestData['lsoId'])) {
        throw new Exception(\Config::get('errorMessage.lso.id'));
      }

      return get_json(\Config::get('apis.lso.getLsoServices') . $requestData['lsoId']);
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Delay LSO Service 
   * 
   * @return [type] [description]
   */
  public function delayLsoServices() {
    try {
      $requestData = \Request::json()->all();
      $validator = Validator::make($requestData, [
          "psId" => "required|numeric",
          "deadline" => "required",          
        ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => \Config::get('errorMessage.lso.common')];
      } else {
        $response = post_json(\Config::get('apis.lso.delayLsoServices'), $requestData);
      }
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Done LSO Services
   * 
   * @return [type] [description]
   */
  public function doneLsoServices() {
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
          'psIds' => 'required|array'
        ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => \Config::get('errorMessage.lso.common')];
      } else {
        $response = post_json(\Config::get('apis.lso.doneLsoServices'), $requestData);
      }

      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * 
   * 
   * @param  [type] $lsoId [description]
   * @return [type]        [description]
   */
  public function getSentLsoServices() {
    try {
      $requestData = \Request::input();

      if (!is_numeric($requestData['lsoId'])) {
        throw new Exception(\Config::get('errorMessage.lso.id'));
      }

      return get_json(\Config::get('apis.lso.getSentLsoServices') . $requestData['lsoId']);
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * [sentLsoServices description]
   * 
   * @return [type] [description]
   */
  public function sentLsoServices() {
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
          "lsoId" => "required|numeric",
          "typeIds" => "required|array"
        ]);

      if ($validator->fails()) {
        $response = ["result" => FALSE, "message" => $validator->errors()->all()];
      } else {
        $response = post_json(\Config::get('apis.lso.sentLsoServices'), $requestData);
      }
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Get total PS Services
   * 
   * @return [type] [description]
   */
  public function getTotalPsServices() {
    try {
      $requestData = \Request::input();

      if (!is_numeric($requestData['lsoId'])) {
        throw new Exception(\Config::get('errorMessage.lso.id'));
      }

      $response = get_json(\Config::get('apis.lso.totalServices') . $requestData['lsoId']);
      return isset($response->data->total) ? $response->data->total : 0;
    } catch (Exception $e) {
      return FALSE;
    }
  }


  /**
   * Get valuation of real estate
   *
   * @return Array Valuation Info
   */
  public function getValuationOfRealEstate() {
    try {
      $requestData = \Request::input();
      $response = get_json(sprintf(\Config::get('apis.lso.valuation'), $requestData['lsoId']));
      return $response;
    } catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Danh sách tin đăng hệ thống
   * 
   * @param  integer $userId
   * @return array
   */
  public function getFullListings($userId) {
    $result = [];
    try {      
      $requestData = \Request::input();
      $postData = [
        "userId" => $userId,
        "classify" => null,
        "fromDate" => null,
        "toDate" => null,
        "districtId" => null,
        "sourceId" => null,
        "type" => null,
        "statusId" => null
      ];
      
      $result = $this->commonService->getResult(\Config::get('apis.lso.systemtransfer'), "/lso/get-full-listings", $postData, $requestData, "dataList");      
    } catch (\Exception $e) {
        return $e->getMessage();
        Log::error($e->getMessage());
    }
    return $result;
  }

  /**
   * Báo cáo kết hợp
   * 
   */
  public function getReportCombined($userId) {
    $result = [];
    try {
      $requestData = \Request::input();

      $postData = [
        "userId" => $userId,
        "fromDate" => null,
        "toDate" => null,
        "districtId" => null,
        "priceFrom" => null,
        "priceTo" => null
      ];

      $result = $this->commonService->getResult(\Config::get('apis.lso.reportCombined'), "/lso/get-report-combined", $postData, $requestData, "dataListWithTotal");
    } catch (Exception $e) {
      Log::error($e->getMessage());
    }
    return $result;
  }

  /**
   * Get report result work
   * 
   * @param  [type] $userId [description]
   * @return [type]         [description]
   */
  public function getReportResultWork($userId) {
    $result = [];
    try {
      $requestData = \Request::input();

      $postData = [
        "userId" => $userId,
        "fromDate" => null,
        "toDate" => null,
        "districtId" => null,
        "priceFrom" => null,
        "priceTo" => null
      ];

      $result = $this->commonService->getResult(\Config::get('apis.lso.reportResultWork'), "/lso/get-report-result-work", $postData, $requestData, "dataList");
    } catch (Exception $e) {
      Log::error($e->getMessage());
    }
    return $result;
  }

  public function getExportExcelResultWork($userId) {
    $result = [];
    try {
      $requestData = \Request::input();

      $postData = [
        "userId" => $userId,
        "fromDate" => null,
        "toDate" => null,
        "districtId" => null,
        "priceFrom" => null,
        "priceTo" => null
      ];

      $result = $this->commonService->getResult(\Config::get('apis.lso.exportExcelResultWork'), "/lso/get-export-excel-result-work", $postData, $requestData, "report");
    } catch (Exception $e) {
      Log::error($e->getMessage());
      return $e->getMessage();
    }
    return $result;
  }

  public function createStreet() {
    $result = [];
    try {
      $requestData = \Request::json()->all();

      $validator = Validator::make($requestData, [
          'wardId' => 'required|integer',
          'streetName' => 'required'
      ]);

      if ($validator->fails()) {
        throw new Exception("Error validating Request", $validator->errors());
      }

      $result = post_json(\Config::get('apis.dashboard.createstreet'), $requestData);
    } catch (Exception $e) {
      Log::error($e->getMessage());
    }
    return $result;
  }

  public function getProfileDetail() {
    $result = [];
    try {
      $requestData = \Request::input();
      $result = get_json(sprintf(\Config::get('apis.lso.profileDetail'), $requestData['ownerId']));
    } catch (Exception $e) {
      Log::error($e->getMessage());
      return $e->getMessage();
    }
    return $result;
  }

  public function updateProfile() {
    $result = [];
    try {
      $requestData = \Request::json()->all();
      $result = put_json(\Config::get('apis.lso.updateProfile'), $requestData);
    } catch (Exception $e) {
      Log::error($e->getMessage());
      return $e->getMessage();
    }
    return $result;
  }  
}
?>
