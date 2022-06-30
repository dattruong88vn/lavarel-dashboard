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

class DealHistoryController extends BaseController {
	public function __construct() {
	    parent::__construct();
	    //
	}

	public function requests($leadId,$dealId){
		// cái này dành cho menu tab deal/header.nav.blade
		$viewData['deal'] = get_json(GET_DEAL_DETAIL . '-new/' . $dealId)->data;
		$viewData['currentActivePage'] = "history";

		// $postData = (object) array("parentTypeId" => 11,
		// 	"dealId" => $dealId,
		//     "sort" => array(
		//     	"columnName" => null,
		//     	"value" => null
		//     	)
		//     );
		// $data = post_json(HISTORY_PROFILE . "/1/10" , $postData);
		// return response()->json($postData);
		$postDataQuestion = [
			"leadId" => $leadId,
			"questionId" => 0
		];
		$viewData['questionModalView'] = post_json(QUESTION_MODAL_VIEW,$postDataQuestion)->data;
		// $viewData['questionModalView'] = get_json(QUESTION_MODAL_VIEW.$leadId."/0")->data;
		// return response()->json($viewData['countHistories']);
		return View::make('deal-history.index')->with($viewData);
	}

	public function renderProfile(){

		$requestData = \Request::input();
		$viewData['resultQuestion'] = json_decode( $requestData['resultQuestion'] );
		// return response()->json($viewData);
		$returnHTML = view('deal-history.renderProfile')->with($viewData)->render();
		return response()->json($returnHTML);
	}


	public function detail($leadId,$dealId){
		$viewData['deal'] = get_json(GET_DEAL_DETAIL . '-new/' . $dealId)->data;
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
		return View::make('deal-history.detail')->with($viewData);
	}


	public function listHistoriesDetail($dealId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"dealId" => $dealId,
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


	public function listEventHistory()
	{
		$data = get_json(HISTORY_LIST_EVENT_HISTORY);
		return response()->json($data->data);
	}


	public function tour($leadId,$dealId){
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
		$viewData['deal'] = get_json(GET_DEAL_DETAIL . '-new/' . $dealId)->data;
		$viewData['currentActivePage'] = "history";
		return view("deal-history.tour")->with($viewData);
	}


	public function email($leadId,$dealId){
		$viewData = [];
		$viewData['deal'] = get_json(GET_DEAL_DETAIL . '-new/' . $dealId)->data;
		$viewData['currentActivePage'] = "history";
		return View::make('deal-history.email')->with($viewData);
	}


	public function call($leadId,$dealId){
		// $postData = (object) array('parentTypeId'=>10,'dealId'=>1218);
		// $data = post_json(HISTORY_PROFILE . "/1/10" , $postData);
		// return response()->json($data);
		$viewData = [];
		$viewData['deal'] = get_json(GET_DEAL_DETAIL . '-new/' . $dealId)->data;
		$viewData['currentActivePage'] = "call";
		return View::make('deal-history.call')->with($viewData);
	}


	public function listTourBooked($dealId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"dealId" => $dealId,
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


	public function getQuestionLog($logId){
		$data = get_json('profile/question-log/'.$logId);
		return response()->json($data);
	}

	public function listHistoriesQuestion($dealId)
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
			"dealId" => $dealId,
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


	public function listTourGone($dealId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"dealId" => $dealId,
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

	public function listTourCancled($dealId)
	{
		$requestData = \Request::input();
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"dealId" => $dealId,
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


	public function listHistoriesEmail($dealId)
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
			"dealId" => $dealId,
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

	public function listHistoriesCall($dealId)
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
			"dealId" => $dealId,
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

	public function index($dealId){

		$viewData = ['type' => 'DEAL', 'id' => $dealId];
		// $viewData = ['dealId' => $dealId, 'listings' => json_decode('[{"statusIdOfListingInSchedule":2,"csFeedbackForListing":" - M\u1ee9c \u0111\u1ed9 h\u1ee3p t\u00e1c c\u1ee7a ch\u1ee7 nh\u00e0:H\u1eddi h\u1ee3t <\/br>   - C\u00e1ch h\u1ebbm xe h\u01a1i (m):100-200 <\/br>   - Khu v\u1ef1c s\u1ed1ng:Ph\u1ee9c t\u1ea1p <\/br>   - Th\u00f4ng tin kh\u00e1c:Sai th\u00f4ng tin","strCustomerFeedbackForListing":"{\"reason\": \"qwe\", \"investigate\": 1, \"customerFeedback\": 1}","statusNameForListing":"Available","rlistingId":16367,"address":"13 \u0110\u01b0\u1eddng S\u1ed1 42, Ph\u01b0\u1eddng T\u00e2n T\u1ea1o, Qu\u1eadn B\u00ecnh T\u00e2n, H\u1ed3 Ch\u00ed Minh. ","percentValue":60,"customerFeedbackForListing":{"_id":null,"customerFeedback":1,"reason":"qwe","investigate":1},"strInfoListing":"{\"price\": 5500000000, \"deposit\": null, \"lotSize\": 81, \"floorSize\": 217.8000030517578, \"purposeId\": 3, \"sizeWidth\": 4.5, \"sizeLength\": 18.829999923706055, \"listingTypeId\": 1, \"propertyTypeId\": 11}","formatPrice":"5,5 t\u1ef7 "},{"statusIdOfListingInSchedule":2,"csFeedbackForListing":" - M\u1ee9c \u0111\u1ed9 h\u1ee3p t\u00e1c c\u1ee7a ch\u1ee7 nh\u00e0:H\u1eddi h\u1ee3t <\/br>   - C\u00e1ch h\u1ebbm xe h\u01a1i (m):100-200 <\/br>   - Khu v\u1ef1c s\u1ed1ng:Ph\u1ee9c t\u1ea1p <\/br>   - Th\u00f4ng tin kh\u00e1c:Sai th\u00f4ng tin","strCustomerFeedbackForListing":"{\"reason\": \"wqewq\", \"investigate\": 1, \"customerFeedback\": 1}","statusNameForListing":"Available","rlistingId":17400,"address":"377\/1A \u0110\u01b0\u1eddng Phan V\u0103n Tr\u1ecb, Ph\u01b0\u1eddng 11, Qu\u1eadn B\u00ecnh Th\u1ea1nh, H\u1ed3 Ch\u00ed Minh. ","percentValue":72,"customerFeedbackForListing":{"_id":null,"customerFeedback":1,"reason":"wqewq","investigate":1},"strInfoListing":"{\"price\": 5500000000, \"deposit\": null, \"lotSize\": 59.79999923706055, \"floorSize\": 197.3800048828125, \"purposeId\": 3, \"sizeWidth\": 4.130000114440918, \"sizeLength\": 16.90999984741211, \"listingTypeId\": 1, \"propertyTypeId\": 11}","formatPrice":"5,5 t\u1ef7 "},{"statusIdOfListingInSchedule":2,"csFeedbackForListing":" - M\u1ee9c \u0111\u1ed9 h\u1ee3p t\u00e1c c\u1ee7a ch\u1ee7 nh\u00e0:H\u1eddi h\u1ee3t <\/br>   - C\u00e1ch h\u1ebbm xe h\u01a1i (m):100-200 <\/br>   - Khu v\u1ef1c s\u1ed1ng:Ph\u1ee9c t\u1ea1p <\/br>   - Th\u00f4ng tin kh\u00e1c:Sai th\u00f4ng tin","strCustomerFeedbackForListing":"{\"reason\": \"qweq\", \"investigate\": 0, \"customerFeedback\": 0}","statusNameForListing":"Available","rlistingId":17419,"address":"5\/109\/22 \u0110\u01b0\u1eddng N\u01a1 Trang Long, Ph\u01b0\u1eddng 7, Qu\u1eadn B\u00ecnh Th\u1ea1nh, H\u1ed3 Ch\u00ed Minh.","percentValue":52,"customerFeedbackForListing":{"_id":null,"customerFeedback":0,"reason":"qweq","investigate":0},"strInfoListing":"{\"price\": 5500000000, \"deposit\": null, \"lotSize\": 56.29999923706055, \"floorSize\": 177.8000030517578, \"purposeId\": 3, \"sizeWidth\": 5.519999980926514, \"sizeLength\": 12.069999694824219, \"listingTypeId\": 1, \"propertyTypeId\": 11}","formatPrice":"5,5 t\u1ef7 "},{"statusIdOfListingInSchedule":2,"csFeedbackForListing":" - M\u1ee9c \u0111\u1ed9 h\u1ee3p t\u00e1c c\u1ee7a ch\u1ee7 nh\u00e0:H\u1eddi h\u1ee3t <\/br>   - C\u00e1ch h\u1ebbm xe h\u01a1i (m):100-200 <\/br>   - Khu v\u1ef1c s\u1ed1ng:Ph\u1ee9c t\u1ea1p <\/br>   - Th\u00f4ng tin kh\u00e1c:Sai th\u00f4ng tin","strCustomerFeedbackForListing":"{\"reason\": \"sss\", \"investigate\": 1, \"customerFeedback\": 1}","statusNameForListing":"Available","rlistingId":17873,"address":"171\/3 Khu Ph\u1ed1 2, G\u00f2 Xo\u00e0i, B\u00ecnh H\u01b0ng H\u00f2a A, H\u1ed3 Ch\u00ed Minh, Qu\u1eadn B\u00ecnh T\u00e2n, Vi\u1ec7t Nam","percentValue":100,"customerFeedbackForListing":{"_id":null,"customerFeedback":1,"reason":"sss","investigate":1},"strInfoListing":"{\"price\": 5500000000, \"deposit\": null, \"lotSize\": 136.3000030517578, \"floorSize\": 171.8000030517578, \"purposeId\": 3, \"sizeWidth\": 8.09000015258789, \"sizeLength\": 16.290000915527344, \"listingTypeId\": 1, \"propertyTypeId\": 11}","formatPrice":"5,5 t\u1ef7 "},{"statusIdOfListingInSchedule":3,"strCustomerFeedbackForListing":"{\"reason\": \"qweq\", \"investigate\": 0, \"customerFeedback\": 0}","statusNameForListing":"Available","rlistingId":19710,"address":"155\/14 L\u00ea \u0110\u00ecnh C\u1ea9n, T\u00e2n T\u1ea1o, S\u00e0i G\u00f2n, Qu\u1eadn B\u00ecnh T\u00e2n, H\u1ed3 Ch\u00ed Minh, Vi\u1ec7t Nam","percentValue":0,"customerFeedbackForListing":{"_id":null,"customerFeedback":0,"reason":"qweq","investigate":0},"strInfoListing":"{\"price\": 5500000000, \"deposit\": null, \"lotSize\": 147, \"floorSize\": 116.4000015258789, \"purposeId\": 3, \"sizeWidth\": 8, \"sizeLength\": 20.40999984741211, \"listingTypeId\": 1, \"propertyTypeId\": 11}","formatPrice":"5,5 t\u1ef7 ","reasonDismiss":"Tin \u0111\u0103ng \u0111\u00e3 \u0111\u01b0\u1ee3c \u0111\u1eb7t c\u1ecdc","reasonValue":"B\u1ecf qua(Dashboard)"}]')];
		return View::make('deal-history.indexv2')->with($viewData);
	}

	public function storeHistories($id,$type="DEAL"){
		
		// XEM HÀM NÀY listHistoriesCall()
		// $data = '[{"dealId":1824,"scheduleTime":1514978040000,"scheduleId":1232,"conciergeId":17357736597986,"conciergeName":"CC - Hiếu Phạm","note":"hello ","customerId":"KM7332","customerName":"Nguyễn Thanh Thức","compares":[{"olds":[{"id":12417,"value":1514978040000,"note":"gi do 2"},{"id":13982,"value":1514978040000,"note":"gi do 1"}],"news":[{"id":13982,"value":1514978040000,"note":"gi do 1"},{"id":12417,"value":1514978040000,"note":"gi do 2"}]}],"action":"update","typeId":14,"typeName":"Thay đổi thứ tự Listing(Giờ Đi Xem) Trong Tour","source":"prop","entity":"tour","createdBy":1,"createdByName":"Admin","createdByDepartmentId":6,"createdByDepartmentName":"Admin","contentType":1,"createdDate":1514978040000}]';

		$requestData = \Request::input();
		// $dealId = 1855; //1825
		$page = get_current_page($requestData);

		$searchKeywords = $requestData['search']['value'];
		//$searchKeyWords = $requestData['search']['value'];
		$sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
		$sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
		$sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
		$postData = array(
			"filter" => [
				// (object) [
				// 	"columnName" => "dealId",
				// 	"value" => [$dealId]
				// ]
			],
		    "sort" => array(
		    	"columnName" => $sortColumn,
		    	"value" => $sortType
		    	),
		    // "searchKeywords" => (strlen($searchKeywords) > 0 ? $searchKeywords : null)
		);

		if($type == 'DEAL'){
			$postData["dealId"] = $id;
		}elseif($type == 'LEAD'){
			$postData['leadId'] = $id;
		}elseif($type == 'REQUEST'){
			$postData['requestId'] = $id;
		}
		

		if (!empty($requestData['actionFilter']) && $requestData['actionFilter'] != 'null') {
			$actionFilter = json_decode( $requestData['actionFilter'] );
			
			$postData['filter'][] = (object) [
		        'columnName' => 'action',
		        'value' => $actionFilter
		    ];
		}

        if (!empty($requestData['typeNameFiler']) && $requestData['typeNameFiler'] != 'null') {
            $typeNameFiler = json_decode( $requestData['typeNameFiler'] );
            $postData['filter'][] = (object) [
                'columnName' => 'typeId',
                'value' => $typeNameFiler
            ];
        }

		// return response()->json($postData); 

		// $response = post_json(HISTORY . $page . "/10", $postData);
		$response = post_json_deal_service(HISTORY . $page . "/10", $postData);
		$draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

		$viewData = array(
		    'draw' => $draw,
		    'recordsTotal' => $response->data->totalItems,
		    'recordsFiltered' => $response->data->totalItems,
		    'data' => $response->data->list,
		    'postData' => $postData,
		    'response' => $response,
		    'api' => HISTORY . $page . "/10"
		);
		return response()->json($viewData);

		// $postData = array(
		// 	"dealId" => $dealId,
		//     "sort" => array(
		//     	"columnName" => "createdDate",
		//     	"value" => "DESC"
		//     	),
		//     	"filter" => []
		// );
		// $response = post_json(HISTORY . "/deal/" . $page . "/10", $postData);
		// $data = $response->data;


		// $data = json_decode($data);
		// $viewData = array(
		//     'draw' => 1,
		//     'recordsTotal' => 5,
		//     'recordsFiltered' => 5,
		//     'data' => $data
		// );
		// return response()->json($viewData);
	}
}