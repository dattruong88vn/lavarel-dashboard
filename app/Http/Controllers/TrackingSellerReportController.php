<?php
namespace App\Http\Controllers;
use App\Http\Controllers\BaseController;
use View;
class TrackingSellerReportController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $response = get_json("/seller-report/trackings/get-bsa-list");
        $viewData = array();
        if ($response->result) {
            $viewData = $response->data;
        }
        return view("seller-report/index")->with("bsaList",$viewData);
    }
    public function getReportHistory()
    {
        $requestData = \Request::input();
        $fromDate = $requestData['fromDate'];
        $toDate = $requestData['toDate'];
        $listingId = $requestData['listingId'];
        $bsaIncharge = $requestData['bsaIncharge'];
        $status = $requestData['status'];
        $page = get_current_page($requestData) - 1;
        if ($page == 0) {
            $page = 1;
        }
        $sortColumnIndex = isset($requestData['order']) && !empty($requestData['order']) ? $requestData['order'][0]['column'] : 1;
        $sortType = isset($requestData['order']) && !empty($requestData['order']) ? $requestData['order'][0]['dir'] : "desc";
        $sortColumn = $requestData['columns'][$sortColumnIndex]['data'];
        $postData = array(
            'bsaInCharge' => $bsaIncharge,
            'fromDate' => $fromDate,
            'listingId' => $listingId,
            'status' => $status,
            'toDate' => $toDate,
            'sortColumn' => $sortColumn,
            'sortType' => $sortType
        );
        $limit = $requestData['length'];
        $response = post_json("seller-report/trackings/" . $page . "/" . $limit, $postData);
        $draw = isset($requestData['draw']) ? $requestData['draw'] : 1;

        //if (!empty($response->list)) {
        //    $isManager = count($response->list) > 0 ? $response->list[0]->bsaName : false;
        //}

        if (!empty($response)) {
            $viewData = array(
                'draw' => $draw,
                'recordsTotal' => $response->totalItems ?? 0,
                'recordsFiltered' => $response->totalItems ?? 0,
                'data' => $response->list ?? [],
                //'isManager' => $isManager ? true : true
            );
        }
        return response()->json($viewData);
    }
    public function report($id, $createdDate)
    {
        $googleKey = env("GG_KEY");
        $response = get_json_sam("v4/listings/seller-report/" . $id . "/".$createdDate);
        $data = null;
        if (!empty($response)) {
            $data = ["data" => $response->result ? $response->data : $response->message, "googleKey" => $googleKey];
        }
        return view("seller-report/report")->with($data);
    }
}
