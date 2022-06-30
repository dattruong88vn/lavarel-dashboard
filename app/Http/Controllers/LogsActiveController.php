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
use Illuminate\Support\Facades\Response;
use App\Http\Services\DealService;
use App\Repositories\API\RepositoriesFactory;
use App\Repositories\API\LeadRepository;
use App\Repositories\API\CommonsRepository;
use App\Propzylibs\PropzyPagination;

class LogsActiveController extends BaseController
{
    function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
    }

    function index($id){
        $current_page = isset($_GET['page']) ? $_GET['page'] : 1;
        $limit = 10;
        $typeLRListing = empty($_GET['typeLRListing']) ? '' : $_GET['typeLRListing'];
        $url = empty($_GET['typeLRListing']) ? "histories/get-tracking-direction-schedule-view/$current_page/$limit" : "histories/get-tracking-direction-create-listing/$current_page/$limit";
        $resp = post_json($url,[
            'leadId' => empty($_GET['typeLRListing']) ? $id : null,
            'typeLRListing' => empty($_GET['typeLRListing']) ? null : $_GET['typeLRListing'],
            'lRListingID' => empty($_GET['typeLRListing']) ? null : $id
            ]);
        if (in_array($resp->code, [401, 403])) {
            abort($resp->code);
        }
        $data = $resp->data->list;
        $total = isset($resp->data->totalItems) ? $resp->data->totalItems : 1;

        $config = array(
            'current_page'  => $current_page, // Trang hi?n t?i
            'total_record'  => $total, // T?ng s? record
            'limit'         => $limit,// limit
            'link_full'     => '/logs-active/index/'.$id.'?page={page}&typeLRListing='.$typeLRListing,
            'link_first'    => '/logs-active/index/'.$id . '?typeLRListing='.$typeLRListing,
            'range'         => 9 // S? button trang b?n mu?n hi?n th?
        );
        $paging = new PropzyPagination();
        $paging->init($config);

//        return \response()->json($resp);
        $viewData = ['logs' => $data,'paging'=>$paging->html()];
        return view('logs-active.index')->with($viewData);
    }
}