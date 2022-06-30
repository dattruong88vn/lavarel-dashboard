<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class CrmManagerController extends BaseController
{

  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
  }

  public function reassignDeals()
  {
    $districts = get_json(GET_DISTRICT_LIST . "/1")->data;
    $status = get_json('deal/status/list')->data;
    $quos = get_json('progress-quo')->data;
    // return response()->json($quos);
    return view("crm-manager.reassign-deals", ['districts' => $districts, 'status' => $status, 'quos' => $quos]);
  }

  public function getDealsByCrms()
  {
    $requestData = \Request::all();
    // return response()->json($requestData);
    $page = get_current_page($requestData);

    $searchKeywords = !empty($requestData['searchKeywords']) ? $requestData['searchKeywords'] : null;
    $draw = !empty($requestData["draw"]) ? $requestData["draw"] : 0;
    $postData = [];
    if (!empty($requestData["assignedTos"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['assignedTos'] = $requestData["assignedTos"];
    }
    if (!empty($requestData["statusIds"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['statusIds'] = $requestData["statusIds"];
    }
    if (!empty($requestData["progressQuoId"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['progressQuoIds'] = $requestData["progressQuoId"];
    }
    if (!empty($requestData["strNeedIds"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['strNeedIds'] = $requestData["strNeedIds"];
    }
    if (!empty($requestData["progressId"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['progressIds'] = $requestData["progressId"];
    }

    $postData['zoneIds'] = !empty($requestData["zoneField"]) ? $requestData["zoneField"] : null;
    $postData['teamIds'] = !empty($requestData["teamField"]) ? $requestData["teamField"] : null;
    $postData['departmentIds'] = !empty($requestData["departmentField"]) ? $requestData["departmentField"] : null;
    $postData['assignedTos'] = !empty($requestData["memberField"]) ? $requestData["memberField"] : null;
    $postData['districts'] = !empty($requestData["districtId"]) ? $requestData["districtId"] : null;
    $postData['wardId'] = !empty($requestData["wardId"]) ? $requestData["wardId"] : null;
    $postData["searchKeywords"] = $searchKeywords;

    $data = (object) [
      "totalItems" => 0,
      "list" => []
    ];

    $limit = 10;
    if (!empty($requestData['length']))
      $limit = $requestData['length'];

    // return response()->json($postData);

    if (!empty($postData)) {
      $response = post_json("deal/get-deal-with-customer/" . $page . "/" . $limit, $postData);
      $data = $response->data;
    }

    $viewData = array(
      'draw' => $draw,
      'recordsTotal' => $data->totalItems,
      'recordsFiltered' => $data->totalItems,
      'data' => $data->list,
      'postData' => $postData
    );
    return response()->json($viewData);
  }

  public function doReassignDeals()
  {
    $postData = \Request::json()->all();
    $response = post_json("lead/assign-all-deal", $postData);
    return response()->json($response);
  }

  /* cmr magaer for lead */

  public function reassignLeads()
  {
    $districts = get_json(GET_DISTRICT_LIST . "/1")->data;
    $status = get_json('lead/status/list')->data;
    $quos = get_json('progress-quo')->data;
    // return response()->json($status);
    return view("crm-manager.reassign-leads", ['districts' => $districts, 'status' => $status, 'quos' => $quos]);
    // return view("crm-manager.reassign-leads");
  }

  public function getLeadsByCrms()
  {
    $requestData = \Request::input();
    $page = get_current_page($requestData);
    $searchKeywords = !empty($requestData['searchKeywords']) ? $requestData['searchKeywords'] : null;
    $draw = !empty($requestData["draw"]) ? $requestData["draw"] : 0;
    $postData = [];
    if (!empty($requestData["assignedTos"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['assignedTos'] = $requestData["assignedTos"];
    }
    if (!empty($requestData["districts"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['districts'] = $requestData["districts"];
    }
    if (!empty($requestData["statusIds"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['statusIds'] = $requestData["statusIds"];
    }
    if (!empty($requestData["strNeedIds"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['strNeedIds'] = $requestData["strNeedIds"];
    }
    if (!empty($requestData["progressId"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['progressIds'] = $requestData["progressId"];
    }
    if (!empty($requestData["progressQuoId"])) {
      // $crms = explode(",", $requestData["crms"]);
      $postData['progressQuoIds'] = $requestData["progressQuoId"];
    }
    $postData["searchKeywords"] = $searchKeywords;
    // $draw = !empty($requestData["draw"])? $requestData["draw"]: 0;
    // $postData = [];
    // if(!empty($requestData["crms"])){
    //     $crms = explode(",", $requestData["crms"]);
    //     $postData=$crms;
    // }

    $limit = 10;
    if (!empty($requestData['length']))
      $limit = $requestData['length'];

    $data = (object) [
      "totalItems" => 0,
      "list" => []
    ];

    // return response()->json($postData);
    if (!empty($postData)) {
      $response = post_json("lead/get-lead-with-customer/$page/$limit", $postData);
      $data = $response->data;
    }
    // return response()->json($data);

    $viewData = array(
      'draw' => $draw,
      'recordsTotal' => $data->totalItems,
      'recordsFiltered' => $data->totalItems,
      'data' => $data->list
    );
    return response()->json($viewData);
  }

  public function doReassignLeads()
  {
    $postData = \Request::json()->all();
    //return response()->json($postData);
    $response = post_json("lead/assign-all-lead", $postData);
    return response()->json($response);
  }
}
