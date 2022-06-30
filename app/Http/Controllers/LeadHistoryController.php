<?php

namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Storage;

class LeadHistoryController extends BaseController {
	public function __construct() {
	    parent::__construct();
	    //
	}

	public function requests($leadId){
		// cái này dành cho menu tab deal/header.nav.blade
		$viewData['lead'] = get_json(GET_LEAD_DETAIL . '-new/' . $leadId)->data;
		$viewData['currentActivePage'] = "history";

		// $postData = (object) array("parentTypeId" => 10,
		// 	"leadId" => $leadId,
		//     "sort" => array(
		//     	"columnName" => null,
		//     	"value" => null
		//     	),
		//     "searchKeywords" => null
		//     );
		// $data = post_json(HISTORY_PROFILE . "/1/10" , $postData);
		// return response()->json($viewData['lead']);

		$postDataQuestion = [
			"leadId" => $leadId,
			"questionId" => 0,
			"source" => "history-lead"
		];
		$viewData['questionModalView'] = post_json(QUESTION_MODAL_VIEW,$postDataQuestion)->data;
		// return response()->json($viewData['questionModalView']);
		return View::make('lead-history.index')->with($viewData);
	}

	public function tour($leadId){
		$viewData = [];
		$viewData['countHistories'] = get_json('histories/get-count-tour-booked-finish-cancle/'.$dealId)->data;
		// $postData = (object) array(
		// 	"dealId" => 1149,
		//     "sort" => array(
		//     	"columnName" => "scheduleTime",
		//     	"value" => "desc",
		//     	));
		// $data = post_json(HISTORY_TOUR_CANCLED . "/1/10" , $postData);
		// return response()->json($data);
		$viewData['lead'] = get_json(GET_LEAD_DETAIL . '-new/' . $leadId)->data;
		$viewData['currentActivePage'] = "history";
		return view("lead-history.tour")->with($viewData);
	}


	public function detail($leadId){
		$viewData['lead'] = get_json(GET_LEAD_DETAIL . '-new/' . $leadId)->data;
		$viewData['currentActivePage'] = "history";
		$viewData['listEventHistory'] = get_json(HISTORY_LIST_EVENT_HISTORY)->data;
		// $postData = (object) array(
		// 	"dealId" => $dealId,
		//     "sort" => array(
		//     	"columnName" => null,
		//     	"value" => null
		//     	)
		// );
		// $data = post_json(HISTORY_DETAIL . "/1/10" , $postData);
		// return response()->json($viewData['listEventHistory']);
		return View::make('lead-history.detail')->with($viewData);
	}


	public function listHistoriesDetail($leadId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"leadId" => $leadId,
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	)
		);
		if (!empty($requestData['historyTypeId']) && $requestData['historyTypeId'] != 'null') {
		    $postData['filter'][] = array(
		        'columnName' => 'historyTypeId',
		        'value' => $requestData['historyTypeId']
		    );

		    // $data = post_json(HISTORY_DETAIL . "/" . $page . "/10", $postData);
		    // return response()->json($data);
		}
		// return response()->json($postData);
		$data = post_json(HISTORY_DETAIL . "/" . $page . "/10", $postData)->data;
		// return response()->json($data);
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $data->totalItems,
		    'recordsFiltered' => $data->totalItems,
		    'data' => $data->list
		);
		return response()->json($viewData);
	}


	public function email($leadId){
		$viewData = [];
		$viewData['lead'] = get_json(GET_LEAD_DETAIL . '-new/' . $leadId)->data;
		$viewData['currentActivePage'] = "history";
		return View::make('lead-history.email')->with($viewData);
	}


	public function call($leadId){
		// $postData = (object) array('parentTypeId'=>10,'dealId'=>1218);
		// $data = post_json(HISTORY_PROFILE . "/1/10" , $postData);
		// return response()->json($data);
		$viewData = [];
		$viewData['lead'] = get_json(GET_LEAD_DETAIL . '-new/' . $leadId)->data;
		$viewData['currentActivePage'] = "call";
		return View::make('lead-history.call')->with($viewData);
	}


	public function listTourBooked($leadId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"leadId" => $leadId,
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	),
		    "filter" => array()
			// "parentTypeId" => 11
			// "leadId" => $leadId,
		 //    'sortColumn' => $sortColumn,
		 //    'sortType' => $sortType,
		 //    "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
		);
		if (!empty($requestData['statusBook']) && $requestData['statusBook'] != 'null') {
		    $postData['filter'][] = array(
		        'columnName' => 'statusBook',
		        'value' => $requestData['statusBook']
		    );
		}

		$data = post_json(HISTORY_TOUR_BOOKED . "/" . $page . "/10", $postData)->data;
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $data->totalItems,
		    'recordsFiltered' => $data->totalItems,
		    'data' => $data->list
		);
		return response()->json($viewData);
	}

	public function listHistoriesQuestion($leadId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"parentTypeId" => 11,
			"leadId" => $leadId,
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	),
		    "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
		);
		$data = post_json(HISTORY_PROFILE . "/" . $page . "/10", $postData)->data;
		// return response()->json($data);
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $data->totalItems,
		    'recordsFiltered' => $data->totalItems,
		    'data' => $data->list
		);
		return response()->json($viewData);
	}


	public function listTourGone($leadId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"leadId" => $leadId,
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	)
		);
		$data = post_json(HISTORY_TOUR_GONE . "/" . $page . "/10", $postData)->data;
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $data->totalItems,
		    'recordsFiltered' => $data->totalItems,
		    'data' => $data->list
		);
		return response()->json($viewData);
	}

	public function listTourCancled($leadId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"leadId" => $leadId,
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	)
		);
		$data = post_json(HISTORY_TOUR_CANCLED . "/" . $page . "/10", $postData)->data;
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $data->totalItems,
		    'recordsFiltered' => $data->totalItems,
		    'data' => $data->list
		);
		return response()->json($viewData);
	}


	public function listHistoriesEmail($leadId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"parentTypeId" => 8,
			"leadId" => $leadId,
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	),
		    "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
		);
		$data = post_json(HISTORY_PROFILE . "/" . $page . "/10", $postData)->data;
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $data->totalItems,
		    'recordsFiltered' => $data->totalItems,
		    'data' => $data->list
		);
		return response()->json($viewData);
	}

	public function listHistoriesCall($leadId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"parentTypeId" => 10,
			"leadId" => $leadId,
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	)
		);
		$data = post_json(HISTORY_PROFILE . "/" . $page . "/10", $postData)->data;
		// return response()->json($postData);
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $data->totalItems,
		    'recordsFiltered' => $data->totalItems,
		    'data' => $data->list
		);
		return response()->json($viewData);
	}

	public function index($leadId){
		
		$viewData = ['type' => 'LEAD', 'id' => $leadId];
		return View::make('deal-history.indexv2')->with($viewData);
	}

	
}