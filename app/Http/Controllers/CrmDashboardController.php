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

class CrmDashboardController extends BaseController {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $reassignReasons = [
            1 => "meeting",
            2 => "cá nhân"
        ];
        $currentUser = \Session::get("user");
        if (!\Request::ajax() && !empty($currentUser)) {
            View::share("callPurposes", parent::getCallPurpose());
            View::share("reassignReasons", $reassignReasons);
        }
        // View::share('propertyTypeList', get_json(GET_PROPERTY_TYPE_LIST));
    }

    public function index() {
        // return \redirect('crm-dashboard/default-screen');
        $viewData = [];
        return view("crm-dashboard.index")->with($viewData);
    }

    public function getLpl(){
        $requestData = \Request::input();
        // $dealId = 1855; //1825
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'];
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "fromDate" => 0,
            "toDate" => (float) $requestData['toDate'],
        );

        // return response()->json($postData);
        $response = post_json('report/ba/lead/listingByDeal/'.$requestData['dealId'].'/'.$page.'/10', $postData);
        // return response()->json($response);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'postData' => $postData,
            'response' => $response,
            'api' => 'report/ba/lead/listingByDeal/'.$requestData['dealId'].'/'.$page.'/10'
        );
        return response()->json($viewData);
    }

    public function getLpd(){
        $requestData = \Request::input();
        // $dealId = 1855; //1825
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'];
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "fromDate" => 0,
            "toDate" => (float) $requestData['toDate'],
        );

        // return response()->json($postData);
        $response = post_json('report/ba/deal/listings/'.$requestData['dealId'].'/'.$page.'/10', $postData);
        // return response()->json($response);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'postData' => $postData,
            'response' => $response,
            'api' => 'report/ba/deal/listings/'.$requestData['dealId'].'/'.$page.'/10'
        );
        return response()->json($viewData);
    }

    public function getViewed(){
        $requestData = \Request::input();
        // $dealId = 1855; //1825
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'];
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "fromDate" => 0,
            "toDate" => (float) $requestData['toDate'],
        );

        // return response()->json($postData);
        $response = post_json('report/ba/deal/viewedListings/'.$requestData['dealId'].'/'.$page.'/10', $postData);
        // return response()->json($response);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'postData' => $postData,
            'response' => $response,
            'api' => 'report/ba/deal/viewedListings/'.$requestData['dealId'].'/'.$page.'/10'
        );
        return response()->json($viewData);
    }


    public function getTableSaleFunel() {
        $requestData = \Request::input();
        // $dealId = 1855; //1825
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'];
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "status" => (int) $requestData['status'],
            "sort" => [
                [
                    "columnName" => $sortColumn,
                    "value" => $sortType
                ]
            ]
        );

        $todaterequest = (float) $requestData['toDate'];

        $postData["fromDate"] = (float) $requestData['fromDate'];
        $postData["toDate"] = $todaterequest;

        //return response()->json($postData);
        $response = post_json('report/ba/deals/'.$page.'/10', $postData);
        // return response()->json($response);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'postData' => $postData,
            'response' => $response,
            'api' => 'report/ba/deals/'.$page.'/10'
        );
        return response()->json($viewData);
    }

    public function getTableSalePineline() {
        $requestData = \Request::input();
        // $dealId = 1855; //1825
        $page = get_current_page($requestData);

        $searchKeywords = $requestData['search']['value'];
        //$searchKeyWords = $requestData['search']['value'];
        $sortColumnIndex = isset($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            "listingTypeId" => (int) $requestData['listingTypeId'],
            "sort" => [
                [
                    "columnName" => $sortColumn,
                    "value" => $sortType
                ]
            ],
            "listUserIds" => array_map('intval', explode(',',$requestData['listUserIds'])),
            "scoreCardType" => (int) $requestData['scoreCardType'] != 0 ? (int) $requestData['scoreCardType'] : null
        );
        $status = (int) $requestData['status'];
        $fromDate = $requestData['fromDate'];
        $toDate = $requestData['toDate'];

//        return response()->json($postData); /ba/deals/realtime/{statusId}/{from}/{to}/{page}/{numberItem}?access_token={access_token}
        $post_url = "report/ba/deals/realtime/$status/$fromDate/$toDate/$page/10";
        $response = post_json($post_url, $postData);
        // return response()->json($postData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list,
            'postData' => $postData,
            'response' => $response,
            'api' => $post_url
        );
        return response()->json($viewData);
    }

    public function salePipeline(){
        $viewData = [];
        // $resp = get_json(ba_summary);
        // $resFunelAll = get_json(sale_funel.'/realtime');

        // if( ! empty($resFunelAll->data) ) {
        //     $viewData['funel_all'] = $resFunelAll->data;
        // }

        // $viewData['ba_summary'] = $resp->data;


        // $monthBefore = strtotime(str_replace('/','-','26/'.date('m/Y',strtotime('-1 month'))))*1000;
        // $now = 9999999999999;
        // // return sale_funel.'/realtime/'.$monthBefore.'/'.$now;
        // // return response()->json(get_json(sale_funel.'/realtime/'.$monthBefore.'/'.$now)->data);

        // if(date('d') > 26 || isset($_GET['testDate'])){
        //     $monthBefore = strtotime(date('d-m-Y'))*1000;
        // }
        // $viewData['funel_all']->deposit = get_json(sale_funel.'/realtime/'.$monthBefore.'/'.$now)->data->deposit;

        // if(!empty($viewData['funel_all'])){
        //     // return response()->json($viewData);
        //     if(isset($viewData['funel_all']->deposit->depositPrice) && isset($viewData['ba_summary']->target)){
        //         if($viewData['funel_all']->deposit->depositPrice == 0 && $viewData['ba_summary']->target == 0 || $viewData['ba_summary']->target == 0){
        //             // $viewData['ba_summary']->reachedCover = 0;
        //         }else{
        //             $viewData['ba_summary']->reachedCover = floor(($viewData['funel_all']->deposit->depositPrice * 100 ) / $viewData['ba_summary']->target);
        //         }
        //     }else{
        //         return response()->json($viewData);
        //     }
        // }
        // return response()->json($viewData);
        // $currentUser = \Session::get("user");
        // dd($currentUser->departmentIds[0]);
        return view('crm-dashboard.sale-pipeline')->with($viewData);
    }

    public function getDataSalePipelineByType($listingTypeId,$statusId,$fromDate,$toDate){
        // $postData = [
        //     "listUserIds" => [74, 77, 111, 112, 124, 133, 136, 134, 135, 140, 141],
        //     "departmentId" => null
        // ];
        $postData = \Request::json()->all();
        $resp = post_json("/report/ba/deals/summary-v2/$listingTypeId/$statusId/$fromDate/$toDate",$postData);//1 24
        return response()->json($resp);
    }

    public function getCardType(){
        $url = "/channel-type/44/0";
        $response = get_json($url);
        return response()->json($response);
    }

    public function defaultScreen() {
        $viewData['segment_date'] = [];
        $viewData['segment_date']['thisMonth'] = date('m/Y',strtotime('-1 month'));
        $viewData['segment_date']['threeMonth'] = date('m/Y', strtotime('-3 month'));
        $viewData['segment_date']['sixMonth'] = date('m/Y', strtotime('-6 month'));
        $viewData['segment_date']['niceMonth'] = date('m/Y', strtotime('-9 month'));
        $viewData['segment_date']['twelfthMonth'] = date('m/Y', strtotime('-12 month'));


        $segment_date = 'thisMonth';
        if(isset($_GET['date']))
            if($_GET['date'] != 'all')
                $segment_date = $_GET['date'];

        $month = explode('/',$viewData['segment_date'][$segment_date])[0];
        $year = explode('/',$viewData['segment_date'][$segment_date])[1];
        $viewData['label_defined'] = [
            'thisMonth' =>'Tháng này',
            'threeMonth' =>'3 tháng trước',
            'sixMonth' =>'6 tháng trước',
            'niceMonth' =>'9 tháng trước',
            'twelfthMonth' =>'12 tháng trước'
        ];
        $viewData['label'] = $viewData['label_defined'][$segment_date];

        $totalDayInMonth = $this->days_in_month($month, $year);
        $resp = get_json(ba_summary);
         // return response()->json($resp);
        $viewData['ba_summary'] = null;
        if( ! empty($resp->data) ) {
            // return response()->json($resp->data);
            $viewData['ba_summary'] = $resp->data;
            $viewData['ba_summary']->runrate == 'NaN' ? $viewData['ba_summary']->runrate = 0 :  $viewData['ba_summary']->runrate = $viewData['ba_summary']->runrate;

            $viewData['ba_summary']->saleFor = (object) ['value' => $viewData['ba_summary']->runrate * $totalDayInMonth,
                'label' => $viewData['label']
            ];

        }
        // return $lastDate;
        $viewData['funel_month'] = null;
        $viewData['funel_all'] = null;

        $firstDate = (int) strtotime('27-'. $month .'-'. $year);
        $firstDate = $firstDate * 1000;

        $lastDate = (int) strtotime(date('d-m-Y',strtotime('+1 day')));
        $lastDate = $lastDate * 1000;

        // return sale_funel.'/'.$firstDate.'/'.$lastDate;
        $resFunelAll = get_json(sale_funel.'/'.$firstDate.'/'.$lastDate);
        // return response()->json($funelTotal);
        $viewData['fromDate'] = $firstDate;
        $viewData['toDate'] = $lastDate;

        // $resFunelMonth = get_json(sale_funel.'/'.$firstDate.'/'.$lastDate);
        if( ! empty($resFunelMonth->data) ) {
            $viewData['funel_month'] = $resFunelMonth->data;
        }
        if( ! empty($resFunelAll->data) ) {
            if($_GET['date'] != 'all'){
                $viewData['funel_all'] = $resFunelAll->data;
            }else{
                $viewData['funel_all'] = get_json(sale_funel.'/0/99999999999999')->data;
                $viewData['label'] = 'Tất cả';
            }
            $viewData['funel_all']->funelTotal = get_json(sale_funel.'/0/99999999999999')->data;
        }

        // if($viewData['ba_summary']->target == 0){
        //     return "Chưa set target";
        // }

        if(!empty($viewData['funel_all'])){
            // return response()->json($viewData);
            if(isset($viewData['funel_all']->deposit->depositPrice) && isset($viewData['ba_summary']->target)){
                if($viewData['funel_all']->deposit->depositPrice == 0 && $viewData['ba_summary']->target == 0 || $viewData['ba_summary']->target == 0){
                    // $viewData['ba_summary']->reachedCover = 0;
                }else{
                    $viewData['ba_summary']->reachedCover = floor(($viewData['funel_all']->deposit->depositPrice * 100 ) / $viewData['ba_summary']->target);
                }
            }else{
                return response()->json($viewData);
            }
        }
        $viewData['thisMonth'] = "Run rate for ".$month."/".$year;

        $totalDealRealtime = get_json(sale_funel.'/realtime')->data;
        $totalCanculatorData = 0;
        foreach ($totalDealRealtime as $v) {
            $totalCanculatorData += (int) $v->total;
        }
        // $resp->data->closingStatusCount = $resp->data->closingStatusCount;
        $viewData['funel_all']->funelTotal->totalDeal = $totalCanculatorData;
        $viewData['funel_all']->funelTotal->totalDetalActive = $totalCanculatorData - $totalDealRealtime->pending->total;
        $currentUser = \Session::get("user");

        $viewData['funel_all']->funelTotal->totalDetalActive = get_json("deal/count-active-by-user/".$currentUser->userId)->data->totalItems;
        //return response()->json($viewData);

        // Calucate percent
        $resp->data->closingStatusCount = (array) $resp->data->closingStatusCount;
        // return response()->json($resp->data->closingStatusCount);
        $totalStatus = $viewData['funel_all']->funelTotal;

        // Metting
        $resp->data->closingStatusCount['meeting_percen'] = 0;
        if($totalStatus->meeting->total!=0 && $totalStatus->booking->total!=0){
            $resp->data->closingStatusCount['meeting_percen'] = ($totalStatus->meeting->total * 100) / $totalStatus->booking->total;
        }elseif($totalStatus->meeting->total!=0 && $totalStatus->booking->total == 0){
            $resp->data->closingStatusCount['meeting_percen'] = 100;
        }

        //Tour
        $resp->data->closingStatusCount['tour_percen'] = 0;
        if($totalStatus->tour->total!=0 && $totalStatus->meeting->total!=0){
            $resp->data->closingStatusCount['tour_percen'] = ($totalStatus->tour->total * 100) / $totalStatus->meeting->total;
        }elseif($totalStatus->tour->total!=0 && $totalStatus->meeting->total == 0){
            $resp->data->closingStatusCount['tour_percen'] = 100;
        }

        //negotiate
        $resp->data->closingStatusCount['negotiate_percen'] = 0;
        if($totalStatus->negotiate->total!=0 && $totalStatus->tour->total!=0)
        {
            $resp->data->closingStatusCount['negotiate_percen'] = ($totalStatus->negotiate->total * 100) / $totalStatus->tour->total;
        }elseif($totalStatus->negotiate->total!=0 && $totalStatus->tour->total == 0){
            $resp->data->closingStatusCount['negotiate_percen'] = 100;
        }
        //deposit
        $resp->data->closingStatusCount['deposit_percen'] = 0;
        if($totalStatus->deposit->total!=0 && $totalStatus->negotiate->total!=0)
        {
            $resp->data->closingStatusCount['deposit_percen'] = ($totalStatus->deposit->total * 100) / $totalStatus->negotiate->total;
        }elseif($totalStatus->deposit->total!=0 && $totalStatus->negotiate->total == 0){
            $resp->data->closingStatusCount['deposit_percen'] = 100;
        }
        $resp->data->closingStatusCount = (object) $resp->data->closingStatusCount;

        return view('crm-dashboard.default-screen')->with($viewData);
    }

    public static function days_in_month($month, $year) {
        // calculate number of days in a month
        return $month == 2 ? ($year % 4 ? 28 : ($year % 100 ? 29 : ($year % 400 ? 28 : 29))) : (($month - 1) % 7 % 2 ? 30 : 31);
    }

    public function doneTask($id) {
        $response = get_json(CRM_DONE_TASK . "/$id");
        return response()->json($response);
    }

    public function acceptMeeting() {
        $postData = \Request::json()->all();
        //return response()->json($postData);
        $response = post_json(CRM_ACCEPT_MEETING, $postData);
        return response()->json($response);
    }

    public function confirmMeetingRequest() {
        $postData = \Request::json()->all();
        $response = post_json(DEAL_MEETING_CONFIRM_REQUEST, $postData);
        return response()->json($response);
    }

    public function reassignMeeting() {
        $postData = \Request::json()->all();
        $response = post_json(CRM_REASSIGN_MEETING, $postData);
        return response()->json($response);
    }

    public function createTask() {
        $postData = \Request::json()->all();
        // return response()->json($postData);
        $response = post_json(TASK_CREATE, $postData);
        return response()->json($response);
    }

    /**
     * get all tasks for 3 boxes on the tm's dashboard
     * @return json
     * @author Hoàng <hoang.phan@propzy.com>
     */
    public function tasksJson() {
        $response = get_json(CRM_TASK . "-new");
        return response()->json($response);
    }

    private function showTcName($task) {
        if (empty($task->tCId) || empty($task->tCName)) {
            return "";
        }
        if ($task->tCId == 3) {
            return $task->address;
        }
        return $task->tCName;
    }

    public function taskDetail($id) {
        $returnType = !empty(\Request::input("returnType")) ? \Request::input("returnType") : null;
        $defineId = \Request::input("defineId");
        $viewId = $defineId;
        $response = get_json("crm/task/$id/$defineId");
        // return response()->json($response);
        $task = $response->data->task;
        // $dealIdForQuestion = $task->dealId;
        $task->isClosed = $response->data->isClosed;
        $task->dealId = $response->data->dealId;
        $task->leadId = $response->data->leadId;
        $task->taskName = $response->data->taskName;
        $task->tCName = $this->showTcName($task);
        $customer = null;
        $customerPhones = "";
        if (!empty($response->data->phoneNumber)) {
            $task->phoneNumber = $response->data->phoneNumber;
            $customerPhones = $task->phoneNumber;
        }

        if (!empty($response->data->request)) {
            $task->request = $response->data->request;
            $customer = $task->request->customers;

            $customerEmails = "";
            $emailIndex = 1;
            foreach ($customer->emailList as $email) {
                $customerEmails.=$email->email;
                if ($emailIndex <= count($customer->emailList) - 1) {
                    $customerEmails.=",";
                }
                $emailIndex++;
            }
            $viewData['customerEmails'] = $customerEmails;

//            $phoneIndex = 1;
//            foreach ($customer->phoneList as $phone) {
//                $customerPhones.=$phone->phone;
//                if ($phoneIndex <= count($customer->phoneList) - 1) {
//                    $customerPhones.=",";
//                }
//                $phoneIndex++;
//            }
        }

        if (!empty($response->data->reasonName)) {
            $viewData["reasonName"] = $response->data->reasonName;
        }

        $viewData['customerPhones'] = $customerPhones;
        if (!empty($response->data->infoRequest)) {
            $task->infoRequest = $response->data->infoRequest;
        }
        $viewData['task'] = $task;
        $viewData['taskId'] = $id;
        $viewData['defineId'] = $defineId;
        if (in_array($defineId, [40, 45, 44, 47])) {
            if (in_array($defineId, [108,44])) {
                $response = get_json(CRM_DONE_TASK . "/$id");
            }
            return redirect("/deal/detail/" . $task->dealId);
        }
        // $viewData['questionModalView'] = get_json(QUESTION_MODAL_VIEW.$dealIdForQuestion."/0")->data;

        if (in_array($defineId, [62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 105])) {
            $viewId = 102;
        } else if (in_array($defineId, [106, 107])) {
            $viewId = 106;
        } else if(in_array($defineId, [111,112,113,117,137,138])){
            // 111 : Listing đang yêu cầu thương lượng
            // 112 :
            // 137 : Kết quả thương lượng tạm ngưng
            // 138 : Chăm sóc thương lượng
            $task->currentPrice = number_format($task->currentPrice);
            $task->negotiationPrice = number_format($task->negotiationPrice);
            $task->taskName =$task->taskName;
            if(isset($_GET['json']) && $_GET['json'] ==true)
                return response()->json($task);
            //var_dump($task); die();
            $postData = [];
            $postData["sort"] = [
                "columnName" => "createdDate",
                "value" => "asc"
            ];
            $postData["dealId"] = !empty($task->dealId) ? $task->dealId : $task->leadId;
            $postData["filter"] = array(["columnName" =>  "source",
                                         "value" =>  'prop',
                                        ],["columnName" =>  "data.negotiationId",
                                            "value" =>$task->negotiationId
                                         ]);

            $response_historty = post_json("/histories/list/negotiation/1/100",$postData);
            $response_reason = get_json("seller/deal/negotiation/pending/reason");
            $task->data = $response_historty->data->list;
            $task->reason = $response_reason->data;
            //var_dump($task->reason); die();
            $task ->taskId = $id;
            $task ->defineId = $defineId;
            $viewData['task'] = $task;
            //var_dump($task); die();
            $viewData['defineId'] = $defineId;

            $viewId = 'negotiate';
            $viewData['list_group_question'] = get_json('deal/deposit/question-groups')->data;
        }else if(in_array($defineId, [115,118,119,120])){
            $viewId = 'deposit';
            $viewData['task'] = $task;
            if(isset($_GET['json']) && $_GET['json'] ==true)
                return response()->json($task);
            //$viewData['list_question'] = get_json('/deal/deposit/form')->data;

            $viewData['list_group_question'] = get_json('deal/deposit/question-groups')->data;
            //$viewData['list_questions'] = get_json("deal/deposit/form/1")->data;
            $viewData['list_question'] = $task->buyerAnswers;
            //var_dump($viewData['list_questions']->buyerQuestion[0]); die();

            if(!empty($task->buyerAnswers)){
                $viewData['list_question_check'] = array();
                foreach($task->buyerAnswers as $item){
                    $viewData['list_question_check'][$item->questionItemId] = $item;
                }
            }

            $postData["dealId"] = !empty($task->dealId) ? $task->dealId : $task->leadId;
            $postData["filter"] = array(["columnName" =>  "source",
                "value" =>  'prop',
            ],["columnName" =>  "data.depositId",
                "value" =>$task->depositId
            ]);
            $response_historty = post_json("/histories/list/negotiation/1/100",$postData);
            $response_reason = get_json("/deal-reasons/get-by-type/5");
            $viewData['reason_deposite'] = $response_reason->data;
            $viewData['depositId'] = $task ->depositId;
            $task->data = $response_historty->data->list;
            $task ->taskId = $id;
            //var_dump($task->buyerAnswers[2]); die();
        }else if(in_array($defineId, [116])){
            $viewId = 116;
            return redirect("/broadcast#" . $task->broadcastId);
        } else if(in_array($defineId, [33])){
            $viewData['list_group_question'] = get_json('deal/deposit/question-groups')->data;
            $viewData['defineId'] = $viewId;
            $viewData['taksID'] = $id;
            $viewId = $defineId;
        }
        if ($returnType == "json") {
            return response()->json($viewData);
        }
        View::share("callPurposes", parent::getCallPurpose());
        // dd($viewData);
        return view("crm-dashboard.task-{$viewId}")->with($viewData);
    }

    public function taskDetailJson($id) {
        $defineId = \Request::input("defineId");
        $response = get_json("crm/task/$id/$defineId");
        //return response()->json($response);
        $task = $response->data->task;
        $task->isClosed = $response->data->isClosed;
        $task->dealId = $response->data->dealId;
        $task->leadId = $response->data->leadId;
        return response()->json($task);
    }

    public function getCrmTaskDefinition() {
        $response = get_json(CRM_TASK_DEFINITIONS);
        //return response()->json($response);
        $task_definition = array();
        if ($response->result) {
            foreach ($response->data as $taskDefinition) {
                if (sizeof($taskDefinition->childsList) > 0) {
                    $task_definition[] = array('id' => $taskDefinition->defineId, 'name' => $taskDefinition->name, 'type' => 'parent');
                    foreach ($taskDefinition->childsList as $taskDefinitionChild) {
                        $task_definition[] = array('id' => $taskDefinitionChild->defineId, 'name' => $taskDefinitionChild->name, 'type' => 'child');
                    }
                }
            }
        }
        return response()->json(array('result' => true, 'data' => $task_definition));
    }

    public function saveUpdateAfterView($id) {
        $postData = \Request::json()->all();
        $response = post_json("histories/33/$id", $postData);
        return response()->json($response);
    }

    public function saveTaskForm($id, $defineId) {
        $postData = \Request::json()->all();
        $response = post_json("histories/$defineId/$id", $postData);
        return response()->json($response);
    }

    public function saveTaskFormHashMap($id) {
        $postData = \Request::json()->all();
        $response = post_json("histories/$id", $postData);
        return response()->json($response);
    }

    public function setTaskReminder() {
        $postData = \Request::json()->all();
        $response = post_json("task/set-reminder", $postData);
        return response()->json($response);
    }

    public function createCollection() {
        $postData = \Request::json()->all();
        // $postData['source'] ="kyc";
        $response = post_json("crm/basket", $postData);
        return response()->json($response);
    }

    public function quickCheckListing() {
        $postData = \Request::json()->all();
        $response = post_json("listing/quick-check-listing", $postData);
        // return response()->json($postData);
        return response()->json($response);
    }

    public function recheckListing() {
        $postData = \Request::json()->all();
        $response = post_json("listing/quick-confirm-listing", $postData);
        return response()->json($response);
    }

    public function acceptEmptyCheck() {
        $postData = \Request::json()->all();
        $response = post_json("crm/accept-request-empty-check", $postData);
        return response()->json($response);
    }

    public function rejectMeeting() {
        $postData = \Request::json()->all();
        $response = post_json("crm/reject-meeting", $postData);
        return response()->json($response);
    }

    public function quickCheckListingsResult() {
        $leadId = \Request::input("leadId");
        $response = get_json("crm/get-quick-check-listing/$leadId");
        return response()->json($response);
    }

    public function quickCheckListingsResults() {
        // $response = get_json("notification/current-user");
        $response = get_json("notification/notification-not-read/reply-empty-check");
        return response()->json($response);
    }

    public function setQuickCheckListingResultRead() {
        $postData = \Request::json()->all();
        $response = post_json("crm/update-read-quick-check-listing", $postData);
        return response()->json($response);
    }

    public function getEmergencyMeeting() {
        $response = get_json("task/get-emergency-meeting");
        return response()->json($response);
    }

    public function reportToursPerRequest(){
        return view("crm-dashboard.report");
    }

    public function exportReports(){
        $requestData = \Request::input();
        return response()->json(post_json_export("export/tour-per-request", $requestData));
    }

    public function getRequestChangeTimeFromDiy(){
        $response = get_json("crm/get-request-change-time-from-diy");
        return response()->json($response);
    }

}
