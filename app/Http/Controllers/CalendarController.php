<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use View;

class CalendarController extends BaseController
{

    private $API_LIST = [
        'calendar-list' => 'task/list',
        'get-user-by-department' => 'user/account/list/%d'
    ];
    function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
        $this->API_LIST = collect($this->API_LIST);
    }

    public function export(){
        $req = \Request::all();
        $res = post_json_export('export/bonus-tour-of-cc',$req);
        return response()->json($res);
    }

    public function getTasks() {
        $request = \Request::all();
        $user = Session::get('user');
        $departmentId = null;
        if (isset($user)) {
            $departmentId = $user->departments[0]->department->id;
        }

        $defineId = isset($request['defineIds']) ? $request['defineIds'] : null;
        if(!empty($request['deparmentFlag']) && $request['deparmentFlag'] == 'cc'){
            $defineId = 9999;
        }

        $departmentSesg = (int) $request['departmentSesg'];
        $data = [
            // 'typeId' => in_array($departmentId, [12]) > 0 ? 0 : 1, // CRM 0 // pos 1
            'typeId' =>  in_array($departmentSesg, [0,1]) > 0 ? $departmentSesg : 0,
            'departmentIdList' => isset($request['departmentIdList']) ? $request['departmentIdList'] : "",
            'userIdList' => isset($request['userIdList']) ? $request['userIdList'] : null,
            'parentId' => empty($defineId) ? null : (int) $defineId,
            'isClosed' => isset($request['isClosed']) ? $request['isClosed'] : null,
            'statusIdList' => isset($request['statusCC']) ? $request['statusCC'] : null,
            'fromDate' => isset($request['fromDate']) ? $request['fromDate'] : null,
            'toDate' => isset($request['toDate']) ? $request['toDate'] : null
        ];

        if($defineId == 9999){
            $data["parentId"] = null;
            $data["defineIds"] = $defineId;
        }

        $result = post_json($this->API_LIST->get('calendar-list'), $data);
        return response()->json($result);
    }

    public function index(){
        $viewData = [];
        if(isset($_GET['deparment']) && $_GET['deparment'] == 'cc'){
            $statusCC = get_json('schedule-status-for-calendar');
            $viewData['statusCC'] = $statusCC->data;
//            return response()->json(get_json('schedule-status-for-calendar'));
        }

        $user = Session::get('user');
        $departmentId = null;
        // if (isset($user)) {
        //     $departmentId = $user->departments[0]->department->id;
        // }
        switch($_GET['deparment']){
            case 0:
                $departmentId = 12; //ba
                break;
            case 1:
                $departmentId = 17;
                break;    
            default:
                break;
        }
        $departments = $this->getDepartmentGroup($departmentId);
        $viewData['departmentId'] = $departmentId;
        $viewData['departmentIds'] = $user->departmentIds;
        $viewData['departments'] = $departments;
        return view('calendar.index')->with($viewData);
    }

    public function getUserByDepartment() {
        $request = \Request::all();
        if(isset($request['flagDepartment']) && $request['flagDepartment'] == 'cc'){
            $response = post_json(AGENT_SUGGEST_CLIENT_SERVICE, ["scheduleTime"=>null,"estimatedDate"=>null]);
            $result = ['result' => true, 'data' => []];
            $coverArr = $response->data;
            foreach ($coverArr as $user){
                $result['data'][] = ['userId'=>$user->socialUid,'name'=>$user->name];
            }
        }else{
            $departmentId = isset($request['departmentId']) ? $request['departmentId'] : null;
            $result = get_json(sprintf($this->API_LIST->get('get-user-by-department'),$departmentId ));
        }

        return response()->json($result);
    }
}