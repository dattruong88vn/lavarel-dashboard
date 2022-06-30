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
use Cookie;

class IndexController extends BaseController
{

    public function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
    }

    public function index(Request $request)
    {
        if (Session::has('user') && !empty(Session::get("user"))) {
            $user = Session::get("user");
            // return response()->json($user);
            $data['remainingListing'] = get_json(GET_REMAINING_LISTING);

            // Phan Minh Hoang
            $currentGroup = \Session::get('currentGroup');
            $data['currentGroup'] = $currentGroup;
            //return response()->json($currentGroup);

            if ($currentGroup['departmentId'] == 1 || $currentGroup['departmentId'] == 2) {
                $data["newestListings"] = get_json(GET_NEWEST_LISTINGS)->data;
                $data['newestBuildings'] = get_json(GET_NEWEST_BUILDING)->data;
                return view('dashboardListingService')->with($data);
            }

            if ($currentGroup['departmentId'] == 3) {
                return view('dashboards.custommer-service')->with($data);
            }

            if ($currentGroup['departmentId'] == 5) {
                $response = get_json(TASK_PARENTS);
                $crmTasks = [];
                foreach ($response->data as $taskGroups) {
                    if ('crm' == strtolower($taskGroups->label)) {
                        $crmTasks = $taskGroups->list;
                    }
                }
                //return response()->json($response);
                $data['taskGroups'] = $crmTasks;
                $data['defineId'] = \Request::input('defineId');
                $data['taskId'] = \Request::input('taskId');
                $data['action'] = \Request::input('action');
                return view('dashboards.transaction-manager')->with($data);
            }

            if (Session::get("user")->userId == 15) {
                return view('operation.dashboard')->with($data);
            }

            if ($currentGroup['departmentId'] == 12) {
                return redirect("/crm-dashboard");
            }

            // LSO
            if ($currentGroup['departmentId'] == 11) {
                return redirect("/lso");
            }

            // pfs
            if (in_array($currentGroup['departmentId'], [43, 20])) {
                return redirect("/pfs-list/overview-request");
            }

            // POS
            if (in_array($currentGroup['departmentId'], [14, 15, 16, 17, 18])) {
                $path = "";
                switch ($currentGroup['departmentId']) {
                    case 15:
                        $path = "/pos/crawler/create";
                        break;
                    case 16:
                        $path = "/pos/prescreener";
                        break;
                    case 17:
                        $path = "/pos/sa";
                        break;
                    case 18:
                        $path = "/pos/training";
                        break;
                    default:
                        $path = "/contact/mine";
                        break;
                }
                return redirect($path);
            }

            // cc dashboard
            if ($currentGroup['departmentId'] == 19) {
                return redirect("/student-survey");
            }

            return view('dashboard')->with($data);
        }
    }

    public function closeImageModal(){
        session(['openImage' => false]);
    }

    public function logout(Request $request)
    {
        $request->session()->put("user", NULL);
        $request->session()->forget('user');
        foreach (Session::all() as $key => $item) {
            if ($key != '_token') Session::forget($key);
        }
        Session::save();
        // $request->session()->flush();
        return redirect("/login");
    }

    public function login(Request $request)
    {
        $request->session()->forget('user');
        $request->session()->forget('status');
        $request->session()->flush();
        if ($request->isMethod('POST')) {
            $loginPostData = [
                'userName' => $request->input('username'),
                'password' => $request->input('password'),
                'cookie' => Cookie::get('LOGGED_IN_PROPZY') ? Cookie::get('LOGGED_IN_PROPZY') : null,
                //'isCheck' => true,
                // 'isCheck' => isMobileDev() && !isAllowedIp(\Request::ip())
                'isCheck' => false
            ];
            $response = post_json(SIGN_IN, $loginPostData);
            if ($response->result) {
                session(['openImage' => true]);
                Session::put('user', $response->data);
                $data = objectToArray($response->data);
                Session::put('currentGroup', $data['departments'][0]);
                
                if($request->has("prev")){
                    return redirect($request->input("prev"));
                }
                return redirect("/");
                /*
                  $data['remainingListing'] = get_json(GET_REMAINING_LISTING);
                  if (Session::get("user")->id == 15) {
                  return view('operation.dashboard')->with($data);
                  }
                  return view('dashboard')->with($data);
                 *
                 */
            }
            return view('login')->with(array("message" => $response->message));
        }
        return view('login');
    }

    //district
    public function create_district()
    {
        return view('district-create');
    }

    public function edit_district()
    {
        return view('district-detail');
    }

    public function list_district()
    {
        return view('district-list');
    }

    public function form_deal()
    {
        return view('form_deal');
    }

    //country
    public function create_country()
    {
        return view('country-create');
    }

    public function edit_country()
    {
        return view('country-detail');
    }

    public function list_country()
    {
        return view('country-list');
    }

    //city
    public function create_city()
    {
        return view('city-create');
    }

    public function edit_city()
    {
        return view('city-detail');
    }

    public function list_city()
    {
        return view('city-list');
    }

    public function getTaskBox()
    {
        $response = get_json(TASK_PARENTS);
        return response()->json($response);
    }

    public function testIp()
    {
        return \Request::ip();
    }
}
