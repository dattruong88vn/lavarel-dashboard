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
use Carbon\Carbon;
use Response;

class CreditController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function lsAdmin() {
        $lsTargetGradingScaleResponse = get_json("user/ls/grading-scale");

        if ($lsTargetGradingScaleResponse->code == 403) {
            return redirect("/credit/ls-staff");
        }
        $viewData = array(
            'lsTargetGradingScale' => null
        );
        $currentYear = date("Y");
        $currentMonth = date("m");
        $years = array();
        for ($i = $currentYear - 1; $i <= $currentYear + 1; $i++) {
            $years[] = array(
                "isCurrent" => ($i == $currentYear),
                "value" => $i
            );
        }
        $viewData['years'] = $years;
        $viewData['currentYear'] = $currentYear;
        $viewData['currentMonth'] = $currentMonth;
        if ($lsTargetGradingScaleResponse->result) {
            $viewData['lsTargetGradingScale'] = $lsTargetGradingScaleResponse->data;
        } else {
            
        }
        //return response()->json($viewData['lsTarget']);
        return view("credit.ls-admin")->with($viewData);
    }

    public function getTargetMonths() {
        $year = \Request::input("year");
        $response = get_json("/list/target_month/$year");
        return response()->json($response);
    }

    public function saveTargetMonths() {
        $postData = \Request::json()->all();
        $response = put_json("/target_month", $postData);
        return response()->json($response);
    }

    public function saveGradingScale() {
        $postData = \Request::json()->all();
        $response = put_json("grading_scale", $postData);
        return response()->json($response);
    }

    public function saveTargetValue() {
        $postData = \Request::json()->all();
        $response = put_json("ls/target_value/update", $postData);
        return response()->json($response);
    }

    public function getLsTargetUsers() {
        $response = get_json("user/ls/target");
        return response()->json($response);
    }

    public function checkLsIsSetTarget() {
        $postData = \Request::json()->all();
        $response = post_json("user/set/target", $postData);
        return response()->json($response);
    }

    public function lsAdminView() {
        return view("credit.ls-admin-view");
    }

    public function lsStaff() {
        $lsTargetGradingScaleResponse = get_json("user/ls/target-current-date");
        $viewData = array(
            'lsTargetGradingScale' => null
        );
        if ($lsTargetGradingScaleResponse->result) {
            $viewData['lsTargetGradingScale'] = $lsTargetGradingScaleResponse->data;
        } else {
            
        }
        return view("credit.ls-staff")->with($viewData);
    }

    public function lsStaffTarget() {
        $postData = \Request::json()->all();
        $response = post_json("user/ls/staff/target", $postData);
        return response()->json($response);
    }

    public function lsTargetCurrentDate() {
        $response = get_json("user/admin/view/ls/target-current-date");
        return response()->json($response);
    }

    public function lsMyTargetCurrentDate() {
        $response = get_json("user/ls/target-current-date");
        return response()->json($response);
    }

    public function lsTargetFromTo() {
        $postData = \Request::json()->all();
        $response = post_json("user/ls/view/target", $postData);
        return response()->json($response);
    }

    public function lsAdminSearch() {
        $lsTargetGradingScaleResponse = get_json("user/ls/grading-scale");

        if ($lsTargetGradingScaleResponse->code == 403) {
            return redirect("/credit/ls-staff");
        }
        return view('credit.ls-admin-search');
    }

    public function lsAdminViewTargetResult() {
        $lsTargetGradingScaleResponse = get_json("user/ls/grading-scale");

        if ($lsTargetGradingScaleResponse->code == 403) {
            return redirect("/credit/ls-staff");
        }

        return view("credit.ls-admin-view-target-result");
    }

    public function lsTargetInMonthData() {
        $postData = \Request::json()->all();
        //return response()->json($response);
        $response = post_json("user/admin/view/ls/target-in-month", $postData);
        return response()->json($response);
    }

    public function searchLs() {
        $postData = \Request::json()->all();
        //return response()->json($response);
        $response = post_json("user/ls/search/target", $postData);
        return response()->json($response);
    }

}
