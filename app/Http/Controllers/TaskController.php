<?php

namespace App\Http\Controllers;

use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use View;
use \Illuminate\Support\Facades\Input;

class TaskController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        if (\Request::session()->has('user')) {
            $user = \Request::session()->get('user');
            $tasks = Task::where('user_id', '=', $user->userId)->orderBy("start_date")->get();
            $data['tasks'] = $tasks;
            return view('task.index')->with($data);
        }
    }

    public function getForm($id = 0) {
        $type = "create";
        $title = "Thêm việc cần làm";
        if ($id > 0) {
            $type = "update";
            $title = "Sửa việc cần làm";
        }
        $item = new Task();
        if ($id > 0) {
            $item = Task::find($id);
            if (!$item) {
                return redirect('/task/get-form');
            }
        }
        $data['item'] = $item;
        $data["type"] = $type;
        $data['title'] = $title;
        return View::make("task.form")->with($data);
    }

    public function insert() {
        $user = \Request::session()->get("user");
        $inputs = Input::get();
        $inputs["user_id"] = $user->userId;
        unset($inputs["id"]);
        unset($inputs["_token"]);
        $item = Task::create($inputs);
        return redirect()->action('TaskController@index');
    }

    public function update($id) {
        $inputs = Input::get();
        $item = Task::find($id);
        if ($item == NULL) {
            return redirect()->action('TaskController@getForm');
        }
        unset($inputs['id']);
        unset($inputs["_token"]);
        unset($inputs['user_id']);
        $inputs['updated_at'] = date('Y-m-d h:i:s');
        DB::table("tasks")
                ->where('id', $id)
                ->update($inputs);

        $item = Task::find($id);
        return redirect()->action('TaskController@index');
    }

    public function delete($id) {
        $status = "fail";
        $result = [];
        try {
            $item = Task::findOrFail($id);
            Task::destroy($item->id);
            $status = "success";
        } catch (\PhpSpec\Exception\Exception $ex) {
            
        }
        $result['status'] = $status;
        return response()->json($result);
    }

    public function getAjax() {
        $result = [];
        $current = Input::get('current');
        $start_date = Input::get('start_date');
        $end_date = Input::get('end_date');
        $items = [];
        if ($start_date == '') {
            if ($current) {
                $start_date = date('Y-m-d');
            }
        }
        if ($end_date == '') {
            if ($current) {
                $end_date = date('Y-m-d');
            }
        }

        if (\Request::session()->has('user')) {
            $user = \Request::session()->get('user');
            $items = Task::whereRaw("( ( DATE(start_date)>='$start_date' AND DATE(start_date)<='$end_date' ) OR ( DATE(end_date)>='$start_date' AND DATE(end_date)<='$start_date' ) )")
                            ->where("user_id", "=", $user->userId)
                            ->take(6)->get();
        }
        $result['items'] = $items;
        return response()->json($result);
    }

    public function tmBasket() {
        return view('task.tm-basket');
    }

    public function tmBasketData() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $postData = array();
        if ($requestData["filterType"]) {
            $postData["filterType"] = $requestData["filterType"];
        }
        if (isset($requestData["fromDate"])) {
            $postData["fromDate"] = $requestData["fromDate"];
        }
        if (isset($requestData["toDate"])) {
            $postData["toDate"] = $requestData["toDate"];
        }

        //return response()->json($postData);
        $response = post_json(ACTIVITY_LIST . "/" . $page . "/10", $postData);
        //return response()->json($response);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;
        $recordsTotal = 0;
        $recordsFiltered = 0;
        $data = null;
        if ($response->data != null) {
            $data = $response->data;
            $recordsTotal = $data->totalItems;
            $recordsFiltered = $data->totalItems;
        }

        $viewData = array(
            'draw' => $draw,
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => ($data != null) ? $data->list : array()
        );
        return response()->json($viewData);
    }

    public function tmBasketDone() {
        $requestData = \Request::input();
        $postData = array(
            $requestData["type"] => df_int($requestData["value"]),
            "typeId" => df_int($requestData["typeId"])
        );

        //return response()->json($postData);
        $response = post_json(ACTIVITY_DONE, $postData);
        return response()->json($response);
    }

    public function getCallDetail($id) {
        $type = \Request::input("type");
        $response = get_json("lead/reminder/$type/$id");
        return response()->json($response);
    }

    public function setDone() {
        $postData = \Request::json()->all();
        $response = post_json('/task/done-task', $postData);
        return response()->json($response);
    }

    public function create() {
        $postData = \Request::json()->all();
        $response = post_json('task', $postData);
        return response()->json($response);
    }

    public function negotiate() {
        $postData = \Request::json()->all();
        $response = post_json('task/deal/negotiate', $postData);
        return response()->json($response);
    }

    /**
     * 
     * @param type $id taskID
     * @description add note to task by taskId
     */
    public function addNote($id) {
        $postData = \Request::json()->all();
        $response = post_json('task/note', $postData);
        return response()->json($response);
    }

}
