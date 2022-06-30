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

class DashboardController extends Controller {

    public function __construct() {

        $currentUser = \Session::get("user");
        if (!\Request::ajax() && !empty($currentUser)) {
            View::share('propertyTypeList', get_json(GET_PROPERTY_TYPE_LIST));
        }
    }

    /**
     * get all tasks for 3 boxes on the tm's dashboard
     * @return json
     * @author Hoàng <hoang.phan@propzy.com>
     */
    public function getTaskBox() {
        $response = get_json(TASK_PARENTS);
        return response()->json($response);
    }

    /**
     * 
     * @param int $id parent's id to get all sub tasks from
     * @author hoang <hoang.phan@propzy.com>
     */
    public function subTasks($priority, $id) {
        $user =\Request::session()->get('user');
        //return response()->json($user);
        $viewData['parentId'] = $id;
        $viewData['userId'] = $user->userId;
        $response = get_json(SUB_TASKS . "/$priority/$id/1/1");
        $viewData['parentName'] = $response->data->parentName;
        $viewData['priority'] = $priority;
        return view('dashboards.sub-tasks')->with($viewData);
    }

    public function subTasksData($priority, $id) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $response = get_json(SUB_TASKS . "/$priority/$id/$page/10");

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }

}
