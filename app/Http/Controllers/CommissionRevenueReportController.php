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
use Carbon\Carbon;

/**
 * Commission deal
 * Date: 2020/07/14
 * Author: thu.tran@propzy.com
 */
class CommissionRevenueReportController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index(){
        return view("commission-revenue-report.index");
    }

    public function getZones() {
        $user = \Request::session()->get('user');
        $permissions = $user->permissions;
        $permissionId = null;
        foreach($permissions as $key => $permission) {
            if($permission->entityId === 76 && $permission->actionId === 7) {
                $permissionId = $permission->permissionId;
            }
        }
        $url = 'departments/get-list-zone/revenue_report/list/' . $permissionId;
        $obj = \GuzzleHttp\json_decode('{}');
        $result = post_json($url, $obj);
        return response()->json($result);
    }

    public function getTeams() {
        $user = \Request::session()->get('user');
        $permissions = $user->permissions;
        $permissionId = null;
        foreach($permissions as $key => $permission) {
            if($permission->entityId === 76 && $permission->actionId === 7) {
                $permissionId = $permission->permissionId;
            }
        }
        $url = 'departments/get-list-team/revenue_report/list/' . $permissionId;
        $obj = \Request::all();
        if(empty($obj)) {
            $obj = \GuzzleHttp\json_decode('{}');
        }
        $result = post_json($url, $obj);
        return response()->json($result);
    }

    // 

    public function getDealStatuses() {
        $url = 'commission/deal-status';
        $result = get_json($url);
        return response()->json($result);
    }

    public function getCollectedStatuses() {
        $result = get_json_test('commission_collected_statuses');
        return response()->json($result);
    }

    public function getTransactionTypes() {
        $result = get_json_test('commission_transaction_types');
        return response()->json($result);
    }

    public function getPaymentMethods() {
        $url = 'commission/collect-type';
        $result = get_json($url);
        return response()->json($result);
    }

    /**
     * Get list of revenue reports
     */
    public function getRevenueReports() {
        $obj = \Request::all();

        $page = $obj['page'];
        unset($obj['page']);

        $numberItem = $obj['limit'];
        unset($obj['limit']);
        
        $url = 'commission/price-report/' . $page . '/' . $numberItem;
        $result = post_json($url, $obj);
        return response()->json($result);
    }

    /**
     * Get commission details of a deal
     * @param dealID
     */
    public function getCommissionBrokerageDetails() {
        $dealId = \Request::input('dealId');
        $url = 'commission/deal/' . $dealId;
        $result = get_json($url);
        return response()->json($result);
    }

    /**
     * Get commission history of a user
     * @param dealFinId
     * @param userId
     */
    public function getCommissionUser() {
        $userId = \Request::input('userId');
        $dealFinId = \Request::input('dealFinId');
        $url = 'commission/deal/' .$dealFinId . '/' . $userId;
        $result = get_json($url);
        return response()->json($result);
    }

    /**
     * Get commission history review
     */
    public function getCommissionHistoryReview() {
        $postData = \Request::all();
        $page = 1;
        $numberItem = 1000;
        $url = 'histories/deal-fin/list/' . $page . '/' . $numberItem;
        $result = post_json($url, $postData);
        return response() ->json($result);
    }

    /**
     * Export revenue report to excel
     */
    public function exportCommissionReport() {
        $postData = \Request::all();
        $url = '/commission/export';
        $result = post_json($url, $postData);
        return response() ->json($result);
    }

}
