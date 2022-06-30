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

class ReportController extends BaseController {

//  user: cs01 (Customer Service), tm01 (Transaction manager), ls01 (Listing Service), bd01(Business Development), as01 (Agent suxpport)
//  pass 123

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return $this->show();
    }

    public function show() {
        $data['report_request_on_staff'] = get_json(GET_REPORT_REQUEST_ON_STAFF);
        return view('reports.report-request-on-staff')->with($data);
    }

    public function exportReport($linkUrl) {
        $linkUrl = str_replace("----", "|", $linkUrl);
        $linkUrl = str_replace("--", "_", $linkUrl);
        $linkUrl = str_replace("-", "/", $linkUrl);
        $linkUrl = str_replace("|", "/-", $linkUrl);
        $linkUrl = str_replace("_", "", $linkUrl);
        $requestData = \Request::input();
        if(!empty($requestData['progressQuoIDs'])){
            $requestData['progressQuoIDs'] = [$requestData['progressQuoIDs']];
        }
        if(!empty($requestData['assignedTos'])){
            $requestData['assignes'] = $requestData['assignedTos'];
        }
        if(!empty($requestData['fromDate'])){
            $requestData['fromDate'] = $requestData['fromDate'];
        }
        if(!empty($requestData['toDate'])){
            $requestData['toDate'] = $requestData['toDate'];
        }
        if(!empty($requestData['listingTypeId'])){
            $requestData['listingTypeId'] = $requestData['listingTypeId'];
        }
        if(!empty($requestData['propertyTypeId'])){
            $requestData['propertyTypeId'] = $requestData['propertyTypeId'];
        }
        if(!empty($requestData['scorecardType'])){
            $requestData['scorecardType'] = $requestData['scorecardType'];
        }
        if (count($requestData) == 0) {
            return response()->json(get_json_export(EXPORT_REPORT . "/" . $linkUrl));
        }
//         return response()->json($requestData);
        // return EXPORT_REPORT . "/" . $linkUrl;
        return response()->json(post_json_export(EXPORT_REPORT . "/" . $linkUrl, $requestData));
    }

    public function exportAgentActivities() {
        $agentIdsList = NULL;
        $userIdsList = NULL;
        $districtsList = NULL;
        $requestData = \Request::input();
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = get_current_page($requestData);

        //return response()->json($requestData);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => array()
        );

        if (isset($requestData['agents'])) {
            $agentIdsList = array();
            foreach ($requestData['agents'] as $agent) {
                $agentIdsList[] = df_int($agent);
            }
        }
        if (isset($requestData['accountManagers'])) {
            $userIdsList = array();
            foreach ($requestData['accountManagers'] as $am) {
                $userIdsList[] = df_int($am);
            }
        }

        if (isset($requestData['districts'])) {
            $districtsList = array();
            foreach ($requestData['districts'] as $district) {
                $districtsList[] = df_int($district);
            }
        }


        $fromDate = NULL;

        if (isset($requestData['fromDate']) && trim($requestData['fromDate'])) {
            $fromDate = Carbon::createFromFormat('d/m/Y', trim($requestData['fromDate']))->timestamp * 1000;
        }
        $toDate = NULL;

        if (isset($requestData['toDate']) && trim($requestData['toDate'])) {
            $toDate = Carbon::createFromFormat('d/m/Y', trim($requestData['toDate']))->timestamp * 1000;
        }

        $postData = array(
            'districtsList' => count($districtsList) > 0 ? $districtsList : NULL,
            'userIdsList' => count($userIdsList) > 0 ? $userIdsList : NULL,
            'agentIdsList' => count($agentIdsList) > 0 ? $agentIdsList : NULL,
            'fromDate' => $fromDate,
            'toDate' => $toDate
        );
        //return response()->json($postData);
        return response()->json(post_json(EXPORT_REPORT . "/agent/activities", $postData));
    }

    public function adminReport() {
        return view('reports.admin');
    }

    public function getDistricts() {
        $viewData['result'] = true;
        $viewData['data'] = get_json(GET_DISTRICTS . "/1");
        return response()->json($viewData);
    }

    public function getAMAgentDistrict() {
        $viewData = array();
        $requestData = \Request::input();
        $accountManagers = get_json(GET_ACCOUNT_LIST . '/8')->data;

        $currentAms = \Request::get('accountManagers');
        $currentAms = isset($currentAms) ? $currentAms : array();
        foreach ($currentAms as $key => $value) {
            $currentAms[$key] = df_int($value);
        }
        $viewData['currentAms'] = $currentAms;


        $currentAgents = \Request::get('agents');
        $currentAgents = isset($currentAgents) ? $currentAgents : array();
        $viewData['currentAgents'] = $currentAgents;
        $agents = post_json(GET_AGENTS_BY_AM, array(
                    'userIdsList' => $currentAms ? $currentAms : NULL,
                    'isVerify' => 1
                ))->data;
        foreach ($currentAgents as $key => $value) {
            $currentAgents[$key] = df_int($value);
        }
        $viewData['agents'] = $agents;

        $currentDistricts = \Request::get('districts');
        $currentDistricts = isset($currentDistricts) ? $currentDistricts : array();
        $viewData['currentDistricts'] = $currentDistricts;
        $districts = post_json(GET_AGENTS_DISTRICTS, array('agentIdsList' => $currentAgents ? $currentAgents : NULL))->data;
        $viewData['districts'] = $districts;
        //return response()->json($currentDistricts);
        $viewData['accountManagers'] = $accountManagers;
        $viewData['queryString'] = (\Request::getQueryString() ? (\Request::getQueryString()) : '');
        $viewData['requestData'] = $requestData;
        $viewData['all_districts'] = get_json(GET_DISTRICTS . "/1");

        return $viewData;
    }

    public function agentListingOverview() {

        return view('reports.agent-listing-overview')->with($this->getAMAgentDistrict());
    }

    public function listingCreatedByAgent($agentId, $fromDate, $toDate) {
        $viewData['queryString'] = "$agentId/$fromDate/$toDate";
        $viewData['agentId'] = $agentId;
        $viewData['fromDate'] = $fromDate;
        $viewData['toDate'] = $toDate;
        return view('reports.listing-created-by-agent')->with($viewData);
    }

    public function getListingCreatedByAgent($agentId, $fromDate, $toDate) {
        $requestData = \Request::input();

        $page = get_current_page($requestData);

        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate);

        $data = post_json(GET_LISTING_CREATED_BY_AGENT . "/" . $agentId . "/" . $page . "/10", $post_date)->data;

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $data->totalItems,
            'recordsFiltered' => $data->totalItems,
            'data' => $data->list
        );
        return response()->json($viewData);
    }

    public function getAgentListingOverview($userIdsList, $agentIdsList, $districtsList, $fromDate, $toDate) {
        if ($userIdsList === -1) {
            return array(
                'draw' => 1,
                'recordsTotal' => 0,
                'recordsFiltered' => 0,
                'data' => array()
            );
        }
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        if (strlen($userIdsList) == 0) {
            $userIdsList = null;
        } else {
            $userIdsList = explode("-", $userIdsList);
        }

        if (strlen($agentIdsList) == 0) {
            $agentIdsList = null;
        } else {
            $agentIdsList = explode("-", $agentIdsList);
        }

        if (strlen($districtsList) == 0) {
            $districtsList = null;
        } else {
            $districtsList = explode("-", $districtsList);
        }

        $post_date = array("userIdsList" => $userIdsList, "agentIdsList" => $agentIdsList, "districtsList" => $districtsList, "fromDate" => $fromDate, "toDate" => $toDate);

        $pendings = post_json(GET_AGENT_OVERVIEW . "/" . $page . "/50", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->list
        );
        return response()->json($viewData);
    }

    public function getListingQualify($userIdsList, $agentIdsList, $fromDate, $toDate) {
        if ($userIdsList === -1) {
            return array(
                'draw' => 1,
                'recordsTotal' => 0,
                'recordsFiltered' => 0,
                'data' => array()
            );
        }
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        if (strlen($userIdsList) == 0) {
            $userIdsList = null;
        } else {
            $userIdsList = explode("-", $userIdsList);
        }

        if (strlen($agentIdsList) == 0) {
            $agentIdsList = null;
        } else {
            $agentIdsList = explode("-", $agentIdsList);
        }

        $post_date = array("userIdsList" => $userIdsList, "agentIdsList" => $agentIdsList, "fromDate" => $fromDate, "toDate" => $toDate);

        $pendings = post_json(GET_LISTING_QUALIFY . "/" . $page . "/10", $post_date)->data;

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->list
        );
        return response()->json($viewData);
    }

    public function agentActivities() {
        return view('reports.agent-activities')->with($this->getAMAgentDistrict());
    }

    public function getAgentActivities() {
        $agentIdsList = NULL;
        $userIdsList = NULL;
        $districtsList = NULL;
        $requestData = \Request::input();
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = get_current_page($requestData);

        //return response()->json($requestData);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => array()
        );

        if (isset($requestData['agents'])) {
            $agentIdsList = array();
            foreach ($requestData['agents'] as $agent) {
                $agentIdsList[] = df_int($agent);
            }
        }
        if (isset($requestData['accountManagers'])) {
            $userIdsList = array();
            foreach ($requestData['accountManagers'] as $am) {
                $userIdsList[] = df_int($am);
            }
        }

        if (isset($requestData['districts'])) {
            $districtsList = array();
            foreach ($requestData['districts'] as $district) {
                $districtsList[] = df_int($district);
            }
        }


        $fromDate = NULL;

        if (isset($requestData['fromDate']) && trim($requestData['fromDate'])) {
            $fromDate = Carbon::createFromFormat('d/m/Y', trim($requestData['fromDate']))->timestamp * 1000;
        }
        $toDate = NULL;

        if (isset($requestData['toDate']) && trim($requestData['toDate'])) {
            $toDate = Carbon::createFromFormat('d/m/Y', trim($requestData['toDate']))->timestamp * 1000;
        }

        $postData = array(
            'districtsList' => count($districtsList) > 0 ? $districtsList : NULL,
            'userIdsList' => count($userIdsList) > 0 ? $userIdsList : NULL,
            'agentIdsList' => count($agentIdsList) > 0 ? $agentIdsList : NULL,
            'fromDate' => $fromDate,
            'toDate' => $toDate
        );
        //return response()->json($postData);
        //return GET_REPORT_AGENT_ACTIVITIES . '/' . $page . '/' . $numberItem;
        $response = post_json(GET_REPORT_AGENT_ACTIVITIES . '/' . $page . '/' . $numberItem, $postData);
        if ($response && $response->result) {
            //return response()->json($response);
            foreach ($response->data->list as $item) {
                $temp = array();
                $temp[] = $item->amName;
                $temp[] = $item->agentName;
                $temp[] = $item->phone;
                $temp[] = $item->email;
                $strDs = "";
                foreach ($item->districtsList as $ds) {
                    $strDs.=$ds->districtName . ',';
                }
                $temp[] = $strDs;
                $temp[] = $item->verifiedDate ? date('d/m/Y', $item->verifiedDate / 1000) : 'N/A';
                $temp[] = $item->purposeName;
                $temp[] = "<a href='/report/agent-listing-search/" . $item->socialUid . "?fromDate=" . $fromDate . "&toDate=" . $toDate . "' >" . $item->numberSeach . "</a>";
                $temp[] = "<a href='/report/agent-booking-count/" . $item->agentId . "?fromDate=" . $fromDate . "&toDate=" . $toDate . "' >" . $item->numberOfBooking . "</a>";
                $viewData['data'][] = $temp;
            }
            $recordsTotal = isset($response->data->totalItems) ? $response->data->totalItems : $numberItem;
            $viewData['recordsTotal'] = $recordsTotal;
            $viewData['recordsFiltered'] = $viewData['recordsTotal'];
        }

        return response()->json($viewData);
    }

    public function agentListingSearch($socialUid) {
        $viewData['queryString'] = '?socialUid=' . $socialUid . '&' . (\Request::getQueryString() ? (\Request::getQueryString()) : '');
        $viewData['socialUid'] = $socialUid;
        return view('reports.agent-listing-search')->with($viewData);
    }

    public function getAgentListingSearch() {
        $requestData = \Request::input();
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = get_current_page($requestData);

        //return response()->json($requestData);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => array()
        );

        $postData = array(
            'fromDate' => !empty($requestData['fromDate']) ? $requestData['fromDate'] : NULL,
            'toDate' => !empty($requestData['toDate']) ? $requestData['toDate'] : NULL
        );

        $response = post_json(GET_REPORT_AGENT_SEARCH . '/' . $requestData['socialUid'] . '/' . $page . '/' . $numberItem, $postData);
        if ($response && $response->result) {
            foreach ($response->data->list as $item) {
                $temp = array();
                $temp[] = date('d/m/Y H:i:s', $item->searchDate / 1000);
                $temp[] = $item->agentName;
                $temp[] = $item->districtName;
                $temp[] = $item->listingTypeName;
                $temp[] = $item->propertyTypeName;
                $temp[] = $item->formatPrice;
                $temp[] = $item->formatSize;
                $strDs = "";
                foreach ($item->directionList as $ds) {
                    $strDs.=$ds->directionName . ',';
                }
                $temp[] = $strDs;
                $temp[] = $item->maxBedRoom;
                $temp[] = $item->maxBathRoom;

                $viewData['data'][] = $temp;
            }
            $viewData['recordsTotal'] = $response->data->totalItems;
            $viewData['recordsFiltered'] = $response->data->totalItems;
        }
        return response()->json($viewData);
    }

    public function agentBookingCount($agentId) {
        $viewData['queryString'] = '?agentId=' . $agentId . '&' . (\Request::getQueryString() ? (\Request::getQueryString()) : '');
        $viewData['socialUid'] = $agentId;
        return view('reports.agent-booking-count')->with($viewData);
    }

    public function getAgentBookingCount() {
        $requestData = \Request::input();
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = get_current_page($requestData);

        //return response()->json($requestData);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => array()
        );

        $postData = array(
            'fromDate' => !empty($requestData['fromDate']) ? $requestData['fromDate'] : NULL,
            'toDate' => !empty($requestData['toDate']) ? $requestData['toDate'] : NULL
        );

        $response = post_json(GET_REPORT_AGENT_BOOKING_COUNT . '/' . $requestData['agentId'] . '/' . $page . '/' . $numberItem, $postData);

        if ($response && $response->result) {
            foreach ($response->data->list as $item) {
                $temp = array();
                $temp[] = date('d/m/Y', $item->bookingDate / 1000);
                $link = PRODUCT_URL . 'chi-tiet/' . str2url($item->title) . '/' . str2url($item->districtName) . '/' . $item->rlistingId;
                $temp[] = "<a href='" . $link . "' target='_blank' >" . $link . "</a>";
                $temp[] = isset($item->districtName) ? $item->districtName : "";
                $temp[] = $item->listingTypeName;
                $temp[] = $item->propertyTypeName;
                $temp[] = $item->formatPrice;
                $temp[] = $item->formatSize;
                $temp[] = $item->directionName;
                $temp[] = $item->bedRooms;
                $temp[] = $item->bathRooms;

                $viewData['data'][] = $temp;
            }
            $viewData['recordsTotal'] = $response->data->totalItems;
            $viewData['recordsFiltered'] = $response->data->totalItems;
        }
        return response()->json($viewData);
    }

    public function agentCountOverview() {
        return view('reports.agent-count-overview');
    }

    public function lsListingOverview() {
        return view('reports.ls-listing-overview');
    }

    public function listingStatusOverview() {
        $now = time();

        $data['fromDate'] = intval(strtotime(date("Y-m-d", $now) . " 00:00:00")) * 1000;
        $data['toDate'] = intval(strtotime(date("Y-m-d", $now) . " 23:59:59")) * 1000;

        return view('reports.listing-status-overview')->with($data);
    }

    public function problemAndRecommented($type, $source, $fromDate, $toDate) {

        $data['queryString'] = "$type/$source/$fromDate/$toDate";
        $data['postData'] = json_encode(array(
            "type" => $type,
            "source" => $source,
            "fromDate" => $fromDate,
            "toDate" => $toDate
        ));
        return view('reports.problem-and-recommented')->with($data);
    }

    public function rejectedListing($type, $source, $fromDate, $toDate) {

        $data['queryString'] = "$type/$source/$fromDate/$toDate";
        $data['postData'] = json_encode(array(
            "type" => $type,
            "source" => $source,
            "fromDate" => $fromDate,
            "toDate" => $toDate
        ));
        return view('reports.rejected-listing')->with($data);
    }

    public function closedDeals() {
        return view('reports.closed-deals');
    }

    public function listingQualify() {
        return view('reports.listing-qualify')->with($this->getAMAgentDistrict());
    }

    /* Listing count overview funtions */

    public function getListOverviews() {
        $requestData = \Request::json()->all();
        $response = post_json(GET_LIST_OVERVIEW, $requestData)->data;
        return response()->json($response);
    }

    public function getListOverviewsAcquired() {
        $requestData = \Request::json()->all();
        $response = post_json(GET_LIST_OVERVIEW_ACQUIRED_BUILDING, $requestData)->data;
        return response()->json($response);
    }

    public function getListOverviewsProject() {
        $requestData = \Request::json()->all();
        $response = post_json(GET_LIST_OVERVIEW_PROJECT, $requestData)->data;
        return response()->json($response);
    }

    public function getPendingCount($type, $source, $fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate, "type" => intval($type), "source" => intval($source));

        $pendings = post_json(GET_REPORT_COUNT_PENDING . "/" . $page . "/10", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->list
        );
        return response()->json($viewData);
    }

    public function getRejectedCount($type, $source, $fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate, "type" => intval($type), "source" => intval($source));

        $pendings = post_json(GET_REPORT_COUNT_REJECTED . "/" . $page . "/10", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->list
        );
        return response()->json($viewData);
    }

    /* Agent Count Overview */

    public function getAgentCountOverview($fromDate, $toDate) {
        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate);
        $response = post_json(GET_COUNT_AGENT_OVERVIEW, $post_date)->data;
        return response()->json($response);
    }

    public function getAgentCountDetail($fromDate, $toDate) {
        $requestData = \Request::input();
        $start = isset($requestData['start']) ? df_int($requestData['start']) : 0;
        $numberItem = isset($requestData['length']) ? df_int($requestData['length']) : 10;
        $page = ($start / $numberItem) + 1;


        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate);

        $response = post_json(GET_COUNT_AGENT_FOR_DATE . "/" . $page . "/100", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->totalItems,
            'recordsFiltered' => $response->totalItems,
            'data' => $response->list
        );
        return response()->json($viewData);
    }

    /* Listing Overview */

    public function getCountSaleOverview($fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);


        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate, "numberDays" => null);

        $response = post_json(GET_LISTING_SALE_OVERVIEW . "/" . $page . "/10", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->totalItems,
            'recordsFiltered' => $response->totalItems,
            'data' => $response->districtsList
        );
        return response()->json($viewData);
    }

    public function getCountRentResidential($fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);


        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate, "numberDays" => null);

        $pendings = post_json(GET_LISTING_RENT_RESIDENTAL_OVERVIEW . "/" . $page . "/10", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->districtsList
        );
        return response()->json($viewData);
    }

    public function getCountRentCommercial($fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);


        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate, "numberDays" => null);

        $pendings = post_json(GET_LISTING_RENT_COMMERCIAL_OVERVIEW . "/" . $page . "/10", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->districtsList
        );
        return response()->json($viewData);
    }

    /* Report Closed Deal */

    public function getAgentDeal($fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);


        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate);

        $pendings = post_json(GET_COUNT_DEAL . "/" . $page . "/10", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->list
        );
        return response()->json($viewData);
    }

    public function getClosedDeal($agentId, $fromDate, $toDate) {
        if ($agentId == -1) {
            return array(
                'draw' => 1,
                'recordsTotal' => 0,
                'recordsFiltered' => 0,
                'data' => array()
            );
        }
        $requestData = \Request::input();
        $page = get_current_page($requestData);


        $post_date = array("fromDate" => $fromDate, "toDate" => $toDate);

        $pendings = post_json(GET_CLOSED_DEAL . "/" . $agentId . "/" . $page . "/10", $post_date)->data;
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $pendings->totalItems,
            'recordsFiltered' => $pendings->totalItems,
            'data' => $pendings->list
        );
        return response()->json($viewData);
    }

    /* Anh Hoang */

    public function getAgents() {
        $requestData = \Request::json()->all();
        foreach ($requestData as $key => $value) {
            $requestData[$key] = df_int($value);
        }
        $postData['userIdsList'] = $requestData;
        $postData['isVerify'] = 1;
        //return response()->json($postData);
        $response = post_json(GET_AGENTS_BY_AM, $postData);
        return response()->json($response);
    }

    public function getAgentsDistricts() {
        $requestData = \Request::json()->all();
        //return response()->json($requestData);
        $response = post_json(GET_AGENTS_DISTRICTS, $requestData);

        return response()->json($response);
    }

    /* Graph Reports */

    public function agentManagementPlatform() {
        return view('reports.agent-management-platform')->with(array());
    }

    public function topAgents() {
        return view('reports.top-agents')->with(array());
    }

    public function listingsCommissionsDistribution() {
        return view('reports.listings-commissions-distribution')->with(array());
    }

    public function distributionGraph() {
        return view('reports.distribution-graph')->with(array());
    }

    public function salesFunnel() {
        return view('reports.sales-funnel')->with(array());
    }

    public function dealsToAgent() {
        return view('reports.deals-to-agent')->with(array());
    }

    /* Graph Report APIs */

    public function getRegions() {
        $response = get_json(GET_REGIONS);
        return response()->json($response);
    }

    public function getCitiesByRegions() {
        $requestData = \Request::json()->all();
        $response = post_json(GET_CITIES_BY_REGIONS, $requestData);

        return response()->json($response);
    }

    public function getDistrictsByCities() {
        $requestData = \Request::json()->all();
        $response = post_json(GET_DISTRICTS_BY_CITIES, $requestData);
        return response()->json($response);
    }

    public function reportListingByRegion() {
        $requestData = \Request::json()->all();
        $response = post_json(REPORT_LISTING_BY_REGION, $requestData);
        return response()->json($response);
    }

    public function reportListingByAgent() {
        $requestData = \Request::json()->all();
        $response = post_json(REPORT_LISTING_BY_AGENT, $requestData);
        return response()->json($response);
    }

    public function reportListingByAm() {
        $requestData = \Request::json()->all();
        $response = post_json(REPORT_LISTING_BY_AM, $requestData);
        return response()->json($response);
    }

    public function reportTopAgent() {
        $requestData = \Request::json()->all();
        $response = post_json(REPORT_TOP_AGENT, $requestData);
        return response()->json($response);
    }

    public function reportByType() {
        $requestData = \Request::json()->all();
        $response = post_json(REPORT_BY_TYPE, $requestData);
        return response()->json($response);
    }

    public function reportDistributionGraph() {
        $requestData = \Request::json()->all();
        $response = post_json(REPORT_DISTRIBUTION_GRAPH, $requestData);
        return response()->json($response);
    }

    public function reportSalesFunnel() {
        $requestData = \Request::json()->all();
        $response = post_json(REPORT_SALES_FUNNEL, $requestData);
        return response()->json($response);
    }

    public function getListUserByType($type) {

        $requestData = \Request::json()->all();
        $linkUrl = str_replace("{type}", $type, REPORT_LIST_USER_TYPE); //var_dump($requestData);exit();
        $response = post_json($linkUrl, $requestData);

        return response()->json($response);
    }

    public function getMapLayer() {
        $content = View::make('reports.kml.' . $_GET['name']);
        return Response::make($content, '200')
                        ->header('Accept-Ranges', 'bytes')
                        ->header('Content-Type', 'application/vnd.google-earth.kml')
                        ->header('Content-Disposition', 'attachment; filename="' . $_GET['name'] . '.kml"');
    }

    public function amAsLs() {

        $accountManagers = get_json(GET_ACCOUNT_LIST . '/8')->data;
        $viewData['accountManagers'] = $accountManagers;
        //return response()->json($viewData);
        return view('reports.am-as-ls')->with($viewData);
    }

    public function amAsLsData() {
        $postData = \Request::json()->all();
        $response = post_json("report/listing-for-am-as-ls", $postData);
        return response()->json($response);
    }

    public function numberOfListingForAgent() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $postData = [
            "keySearch" => !empty($requestData['keySearch']) ? $requestData['keySearch'] : null,
            "fromDate" => !empty($requestData['fromDate']) ? $requestData['fromDate'] : null,
            "toDate" => !empty($requestData['toDate']) ? $requestData['toDate'] : null,
            "statusId" => !empty($requestData['statusId']) ? $requestData['statusId'] : null,
            "agentType" => !empty($requestData['agentType']) ? $requestData['agentType'] : null,
            "listingType" => !empty($requestData['listingType']) ? $requestData['listingType'] : null
        ];
        $response = post_json("report/agents/listing/$page/10", $postData);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }

    public function pendingListing() {
        $accountManagers = get_json(GET_ACCOUNT_LIST . '/8')->data;
        $viewData['accountManagers'] = $accountManagers;
        return view('reports.pending-listing')->with($viewData);
    }

    public function pendingListingData() {
        $requestData = \Request::input();
        $postData['keySearch'] = !empty($requestData['keySearch']) ? $requestData['keySearch'] : NULL;
        $response = post_json("/report/listing/pending", $postData);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => count($response->data),
            'recordsFiltered' => count($response->data),
            'data' => $response->data
        );
        return response()->json($viewData);
    }

    public function agentsListingPending() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $postData = [
            "keySearch" => !empty($requestData["keySearch"]) ? $requestData["keySearch"] : NULL,
            "reasonType" => !empty($requestData["reasonType"]) ? $requestData["reasonType"] : NULL,
            "pendingTime" => !empty($requestData["pendingTime"]) ? $requestData["pendingTime"] : NULL
        ];
        $response = post_json("report/agents/listing/pending/$page/10", $postData);
        //return response()->json($response);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }

    public function amRejectedListing() {
        $accountManagers = get_json(GET_ACCOUNT_LIST . '/8')->data;
        $viewData['accountManagers'] = $accountManagers;
        return view('reports.am-rejected-listing')->with($viewData);
    }

    public function amRejectedListingData() {
        $requestData = \Request::input();
        $postData['keySearch'] = !empty($requestData['keySearch']) ? $requestData['keySearch'] : NULL;
        $postData['fromDate'] = !empty($requestData['fromDate']) ? $requestData['fromDate'] : NULL;
        $postData['toDate'] = !empty($requestData['toDate']) ? $requestData['toDate'] : NULL;
        $response = post_json("report/listing/rejected", $postData);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => count($response->data),
            'recordsFiltered' => count($response->data),
            'data' => $response->data
        );
        return response()->json($viewData);
    }

    public function agentsListingRejected() {
        $requestData = \Request::input();
        $page = get_current_page($requestData);
        $postData = [
            "keySearch" => !empty($requestData["keySearch"]) ? $requestData["keySearch"] : NULL,
            "reasonId" => !empty($requestData["reasonId"]) ? $requestData["reasonId"] : NULL,
            "fromDate" => !empty($requestData["fromDate"]) ? $requestData["fromDate"] : NULL,
            "toDate" => !empty($requestData["toDate"]) ? $requestData["toDate"] : NULL
        ];
        $response = post_json("report/agents/listing/rejected/$page/10", $postData);
        //return response()->json($response);
        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );
        return response()->json($viewData);
    }

    //===========================================
    public function managementReportOverview() {
        $fromdate = strtotime( date( 'Y-m-1' )) * 1000;;
        $todate = strtotime( date( 'Y-m-d' ) ." +1day") * 1000;

        $postData = array(
            "fromDate" => $fromdate,
            "toDate" => $todate 
        );

        $viewData["data"] = post_json(MANAGEMENT_REPORT_OVERVIEW, $postData)->data;
        $viewData["postData"] = $postData;
        return view('graph-reports.overview')->with($viewData);
    }

    public function getManagementReportOverview() {
        $requestData = \Request::input();
        $postData = array(
            "fromDate" => !empty($requestData["fromDate"]) ? $requestData["fromDate"] : NULL,
            "toDate" => !empty($requestData["toDate"]) ? $requestData["toDate"] : NULL
        );
        $viewData["data"] = post_json(MANAGEMENT_REPORT_OVERVIEW, $postData)->data;
        $viewData["postData"] = $postData;

        return view('graph-reports._overview_element')->with($viewData);
    }   

    // Graph report -LISTING 
    public function managementReportListing($fromDate, $toDate) {
        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate
        );

        $viewData["chart"] = post_json(MANAGEMENT_REPORT_LISTING_CHART, $postData)->data;
        $viewData["postData"] = $postData;

        $postData = array(
            "dateItems" => array(
                array(
                    "fromDate" => strtotime( date( 'Y-m-01' )) * 1000,
                    "toDate" => strtotime( date( 'Y-m-01'). " +1month" ) * 1000
                ),
                array(
                    "fromDate" => strtotime( date( 'Y-m-01' ) ." -1month") * 1000,
                    "toDate" =>strtotime( date( 'Y-m-01' )) * 1000
                )
            )
        );
      
        $viewData["colChart"] = post_json(MANAGEMENT_REPORT_LISTING_COLUMN_CHART, $postData)->data;
        return view('graph-reports.listing')->with($viewData);
    }

    public function getManagementReportListing() {
        $requestData = \Request::input();
        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate
        );
        $response = post_json(MANAGEMENT_REPORT_LISTING_CHART, $postData)->data;
        return response()->json($response);
    }   

    public function getManagementReportListingValue($type, $fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        if($type === 0) {
            return array(
                'draw' => 1,
                'recordsTotal' => 0,
                'recordsFiltered' => 0,
                'data' => array()
            );
        }

        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate,
            "type" => $type,
            "sortType" => null,
            "columnName" =>  null,
            "keySearch"=> null
        );
        if(isset($requestData['order'][0])) {
            $colIndex =  intval($requestData['order'][0]['column']);
            $postData['columnName'] = $requestData['columns'][$colIndex]['data'];
            $postData['sortType'] = $requestData['order'][0]['dir'];
        }

        if(isset($requestData['search']['value']) && strlen($requestData['search']['value']) > 0 ) {
            $postData['keySearch'] = $requestData['search']['value'];
        }

        $response = post_json(MANAGEMENT_REPORT_LISTING_VALUE."/$page/5", $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }   

    public function getManagementReportListingCommission($type, $fromDate, $toDate) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        if($type === 0) {
            return array(
                'draw' => 1,
                'recordsTotal' => 0,
                'recordsFiltered' => 0,
                'data' => array()
            );
        }

        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate,
            "type" => $type,
            "sortType" => null,
            "columnName" =>  null,
            "keySearch"=> null
        );
        if(isset($requestData['order'][0])) {
            $colIndex =  intval($requestData['order'][0]['column']);
            $postData['columnName'] = $requestData['columns'][$colIndex]['data'];
            $postData['sortType'] = $requestData['order'][0]['dir'];
        }

        if(isset($requestData['search']['value']) && strlen($requestData['search']['value']) > 0 ) {
            $postData['keySearch'] = $requestData['search']['value'];
        }

        $response = post_json(MANAGEMENT_REPORT_LISTING_COMMISSION."/$page/5", $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }  

    public function getManagementReportListingCompare() {
        $requestData = \Request::input();
        $postData = array(
            "dateItems" => !empty($requestData["dateItems"]) ? json_decode($requestData["dateItems"]) : NULL
        );
      
        $response = post_json(MANAGEMENT_REPORT_LISTING_COLUMN_CHART, $postData)->data;
        return response()->json($response);
    }  

    //========== Graph report - LEAD
    public function managementReportLead($fromDate, $toDate) {
        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate
        );

        $viewData["chart"] = post_json(MANAGEMENT_REPORT_LEAD, $postData)->data;
        $viewData["postData"] = $postData;
        $postData = array(
            "dateItems" => array(
                array(
                    "fromDate" => strtotime( date( 'Y-m-01' )) * 1000,
                    "toDate" => strtotime( date( 'Y-m-01' ). " +1month" ) * 1000
                ),
                array(
                    "fromDate" => strtotime( date( 'Y-m-01' ) ." -1month") * 1000,
                    "toDate" =>strtotime( date( 'Y-m-01' )) * 1000
                )
            )
        );
        //exit(json_encode($postData));
        $viewData["colChart"] = post_json(MANAGEMENT_REPORT_LEAD_COMPARE, $postData)->data; 

        $postData['cityId'] = 1;
        $postData['districtId'] = null;

        $viewData["distribute"] = post_json(MANAGEMENT_REPORT_LEAD_DISTRIBUTE_BY_REGION."/1/5", $postData)->data; 

        return view('graph-reports.lead')->with($viewData);
    }
    public function getManagementReportLead() {
         $requestData = \Request::input();
        $postData = array(
            "fromDate" => !empty($requestData["fromDate"]) ? $requestData["fromDate"] : NULL,
            "toDate" => !empty($requestData["toDate"]) ? $requestData["toDate"] : NULL
        );
        $response = post_json(MANAGEMENT_REPORT_LEAD, $postData)->data;
        return response()->json($response);
    }

    public function getManagementReportLeadCompare() {
        $requestData = \Request::input();
        $postData = array(
            "dateItems" => !empty($requestData["dateItems"]) ? json_decode($requestData["dateItems"]) : NULL
        );
      
        $response = post_json(MANAGEMENT_REPORT_LEAD_COMPARE, $postData)->data;
        return response()->json($response);
    }   

    public function getManagementReportLeadBySource($sourceId, $fromDate, $toDate, $position) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        if($sourceId == 0) {
            return array(
                'draw' => 1,
                'recordsTotal' => 0,
                'recordsFiltered' => 0,
                'data' => array()
            );
        }

        $requestData = \Request::input();
        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate,
            "sourceId" => $sourceId,
            "position" => $position
        );
        //echo json_encode($postData); exit();
        $response = post_json(MANAGEMENT_REPORT_LEAD_SOURCE."/$page/5", $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }   

    public function getManagementReportLeadDistributionCustomer() {
        $requestData = \Request::input(); 
        $page = get_current_page($requestData);


        $requestData = \Request::input();
        $postData = array(
            "fromDate" => isset($requestData['fromDate']) ? $requestData['fromDate'] : NULL,
            "toDate" => isset($requestData['toDate']) ? $requestData['toDate'] : NULL,
            "areaType"=> isset($requestData['areaType']) ? $requestData['areaType'] : NULL,
            "areaId"=> isset($requestData['areaId']) ? $requestData['areaId'] : NULL,
            "sortType" => null,
            "sortColumn" =>  null,
            "searchKeywords"=> null
        );

        if(isset($requestData['order'][0])) {
            $colIndex =  intval($requestData['order'][0]['column']);
            $postData['sortColumn'] = $requestData['columns'][$colIndex]['data'];
            if(empty($postData['sortColumn'])) 
                $postData['sortColumn'] = null;
            $postData['sortType'] = $requestData['order'][0]['dir'];
        }

        if(isset($requestData['search']['value']) && strlen($requestData['search']['value']) > 0 ) {
            $postData['searchKeywords'] = $requestData['search']['value'];
        }
        //echo json_encode($postData);exit();
        $response = post_json(MANAGEMENT_REPORT_LEAD_CUSTOMER_FOR_AREA."/$page/5", $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }
    public function getManagementReportLeadDistribution() {
        $requestData = \Request::input(); 
        $page = get_current_page($requestData);

        $requestData = \Request::input();
        $postData = array(
            "fromDate" => isset($requestData['fromDate']) ? $requestData['fromDate'] : NULL,
            "toDate" => isset($requestData['toDate']) ? $requestData['toDate'] : NULL,
            "regionIdsList" => isset($requestData['regionIdsList']) ? implode(",",$requestData['regionIdsList']) : NULL,
            "cityIdsList" => isset($requestData['cityIdsList']) ? implode(",",$requestData['cityIdsList']) : NULL,
            "districtIdsList" => isset($requestData['districtIdsList']) ? implode(",",$requestData['districtIdsList']) : NULL,
            "sortType" => null,
            "sortColumn" =>  null,
            "searchKeywords"=> null
        );
        //echo json_encode($postData); exit()
        if(isset($requestData['order'][0])) {
            $colIndex =  intval($requestData['order'][0]['column']);
            $postData['sortColumn'] = $requestData['columns'][$colIndex]['data'];
            if(empty($postData['sortColumn'])) 
                $postData['sortColumn'] = null;
            $postData['sortType'] = $requestData['order'][0]['dir'];
        }

        if(isset($requestData['search']['value']) && strlen($requestData['search']['value']) > 0 ) {
            $postData['searchKeywords'] = $requestData['search']['value'];
        }

        $url = MANAGEMENT_REPORT_LEAD_DISTRIBUTE_BY_REGION."/$page/" . (isset($requestData['perpage']) ? $requestData['perpage'] : 5);
        //echo json_encode($postData); exit();
        $response = post_json($url, $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }  

    // Graph report - DEAL
    public function managementReportDeal($fromDate, $toDate) {
        $viewData["propertyTypes"] = get_json(GET_PROPERTY_TYPE_LIST);
        $viewData["allAgents"] = get_json(GET_AGENT_LIST."/2")->data;
        $viewData["allSales"] = get_json(GET_AGENT_LIST."/5")->data;


        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate
        );
        $viewData["postData"] = $postData;
        $viewData["chart"] = post_json(MANAGEMENT_REPORT_DEAL, $postData)->data;

        $postData = array(
            "listingTypeIdsList" => null,
            "propertyTypeIdsList" => null,
            "dealTypeId" => null,
            "agentIdsList" => null,
            "fromDate" => $fromDate,
            "toDate" => $toDate
        );
 
        $viewData["sale_funnel"] = post_json(MANAGEMENT_REPORT_DEAL_SALE_FUNNEL, $postData)->data;

        $postData = array(
            "dateItems" => array(
                array(
                    "fromDate" => strtotime( date( 'Y-m-01' )) * 1000,
                    "toDate" => strtotime( date( 'Y-m-01'). " +1month" ) * 1000
                ),
                array(
                    "fromDate" => strtotime( date( 'Y-m-01' ) ." -1month") * 1000,
                    "toDate" =>strtotime( date( 'Y-m-01' )) * 1000
                )
            )
        );
      
        $viewData["colChart"] = post_json(MANAGEMENT_REPORT_DEAL_COMPARE, $postData)->data; 

        $postData['cityId'] = 1;
        $postData['districtId'] = null;

        $viewData["distribute"] = post_json(MANAGEMENT_REPORT_DEAL_DISTRIBUTE_BY_REGION."/1/5", $postData)->data; 

        return view('graph-reports.deal')->with($viewData);
    }
    public function getManagementReportDeal() {
         $requestData = \Request::input();
        $postData = array(
            "fromDate" => !empty($requestData["fromDate"]) ? $requestData["fromDate"] : NULL,
            "toDate" => !empty($requestData["toDate"]) ? $requestData["toDate"] : NULL
        );
        $response = post_json(MANAGEMENT_REPORT_DEAL, $postData)->data;
        return response()->json($response);
    }
    
    public function getManagementReportDealCompare() {
        $requestData = \Request::input();
        $postData = array(
            "dateItems" => !empty($requestData["dateItems"]) ? json_decode($requestData["dateItems"]) : NULL
        );
      
        $response = post_json(MANAGEMENT_REPORT_DEAL_COMPARE, $postData)->data;
        return response()->json($response);
    }   

    public function getManagementReportDealBySource($sourceId, $fromDate, $toDate, $position) {
        $requestData = \Request::input();
        $page = get_current_page($requestData);

        $requestData = \Request::input();
        $postData = array(
            "fromDate" => $fromDate,
            "toDate" => $toDate,
            "sourceId" => $sourceId,
            "position" => $position
        );
        $response = post_json(MANAGEMENT_REPORT_DEAL_SOURCE."/$page/5", $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }   

    public function getManagementReportDealDistributionCustomer() {
        $requestData = \Request::input(); 
        $page = get_current_page($requestData);


        $requestData = \Request::input();
        $postData = array(
            "fromDate" => isset($requestData['fromDate']) ? $requestData['fromDate'] : NULL,
            "toDate" => isset($requestData['toDate']) ? $requestData['toDate'] : NULL,
            "areaType"=> isset($requestData['areaType']) ? $requestData['areaType'] : NULL,
            "areaId"=> isset($requestData['areaId']) ? $requestData['areaId'] : NULL,
            "sortType" => null,
            "sortColumn" =>  null,
            "searchKeywords"=> null
        );

        if(isset($requestData['order'][0])) {
            $colIndex =  intval($requestData['order'][0]['column']);
            $postData['sortColumn'] = $requestData['columns'][$colIndex]['data'];
            if(empty($postData['sortColumn'])) 
                $postData['sortColumn'] = null;
            $postData['sortType'] = $requestData['order'][0]['dir'];
        }

        if(isset($requestData['search']['value']) && strlen($requestData['search']['value']) > 0 ) {
            $postData['searchKeywords'] = $requestData['search']['value'];
        }
        //echo json_encode($postData);exit();
        $response = post_json(MANAGEMENT_REPORT_DEAL_CUSTOMER_FOR_AREA."/$page/5", $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }
    public function getManagementReportDealDistribution() {
        $requestData = \Request::input(); 
        $page = get_current_page($requestData);

        $requestData = \Request::input();
        $postData = array(
            "fromDate" => isset($requestData['fromDate']) ? $requestData['fromDate'] : NULL,
            "toDate" => isset($requestData['toDate']) ? $requestData['toDate'] : NULL,
            "regionIdsList" => isset($requestData['regionIdsList']) ? implode(",",$requestData['regionIdsList']) : NULL,
            "cityIdsList" => isset($requestData['cityIdsList']) ? implode(",",$requestData['cityIdsList']) : NULL,
            "districtIdsList" => isset($requestData['districtIdsList']) ? implode(",",$requestData['districtIdsList']) : NULL,
            "sortType" => null,
            "sortColumn" =>  null,
            "searchKeywords"=> null
        );
        //echo json_encode($postData); exit()
        if(isset($requestData['order'][0])) {
            $colIndex =  intval($requestData['order'][0]['column']);
            $postData['sortColumn'] = $requestData['columns'][$colIndex]['data'];
            if(empty($postData['sortColumn'])) 
                $postData['sortColumn'] = null;
            $postData['sortType'] = $requestData['order'][0]['dir'];
        }

        if(isset($requestData['search']['value']) && strlen($requestData['search']['value']) > 0 ) {
            $postData['searchKeywords'] = $requestData['search']['value'];
        }

        $url = MANAGEMENT_REPORT_DEAL_DISTRIBUTE_BY_REGION."/$page/" . (isset($requestData['perpage']) ? $requestData['perpage'] : 5);
        //echo json_encode($postData); exit();
        $response = post_json($url, $postData);

        $viewData = array(
            'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
            'recordsTotal' => $response->data->totalItems,
            'recordsFiltered' => $response->data->totalItems,
            'data' => $response->data->list
        );

        return response()->json($viewData);
    }  

    public function getManagementReportDealSaleCustomer() {
            $requestData = \Request::input(); 
            $page = get_current_page($requestData);

            $requestData = \Request::input();
            $postData = array(
                "statusId" => isset($requestData['statusId']) ? $requestData['statusId'] : NULL,
                "fromDate" => isset($requestData['fromDate']) ? $requestData['fromDate'] : NULL,
                "toDate" => isset($requestData['toDate']) ? $requestData['toDate'] : NULL,
                "listingTypeIdsList" => isset($requestData['listingTypeIdsList']) ? $requestData['listingTypeIdsList'] : NULL,
                "propertyTypeIdsList" => isset($requestData['propertyTypeIdsList']) ? $requestData['propertyTypeIdsList'] : NULL,
                "dealTypeId" => isset($requestData['dealTypeId']) ? $requestData['dealTypeId'] : NULL,
                "agentIdsList" => isset($requestData['agentIdsList']) ? $requestData['agentIdsList'] : NULL,
                "sortType" => null,
                "sortColumn" =>  null,
                "searchKeywords"=> null
            );

            if(isset($requestData['order'][0])) {
                $colIndex =  intval($requestData['order'][0]['column']);
                $postData['sortColumn'] = $requestData['columns'][$colIndex]['data'];
                if(empty($postData['sortColumn'])) 
                    $postData['sortColumn'] = null;
                $postData['sortType'] = $requestData['order'][0]['dir'];
            }

            if(isset($requestData['search']['value']) && strlen($requestData['search']['value']) > 0 ) {
                $postData['searchKeywords'] = $requestData['search']['value'];
            }
            //echo json_encode($postData);exit();
            $url = MANAGEMENT_REPORT_DEAL_SALE_FUNNEL_CUSTOMER."/$page/" . (isset($requestData['perpage']) ? $requestData['perpage'] : 5);

            $response = post_json($url, $postData);

            $viewData = array(
                'draw' => isset($requestData['draw']) ? $requestData['draw'] : 1,
                'recordsTotal' => $response->data->totalItems,
                'recordsFiltered' => $response->data->totalItems,
                'data' => $response->data->list
            );

            return response()->json($viewData);
    }

    public function getManagementReportDealSaleAgent($type) {
        $response = post_json(GET_AGENT_LIST."/$type")->data;
        return response()->json($response);
    }

    public function getManagementReportDefaultTableValue() {
         return array(
            'draw' => 1,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
            'data' => array()
        );
    }

    public function managementReportSettings()
    {
        if (\Request::isMethod('post')) {
            $saleFunnel = \Request::input('saleFunnel');

            $postData = array();
            foreach ($saleFunnel as $id => $item)
                $postData[] = $item;

            $response = post_json(MANAGEMENT_REPORT_SETTINGS_SAVE_SALE_FUNNEL, array('funnelDtos' => $postData));
            return response()->json($response);
        }

        $response = get_json(MANAGEMENT_REPORT_SETTINGS_GET_SALE_FUNNEL);
        $viewData = array('itemsSaleFunnel' => $response->data);

        return view('graph-reports.settings')->with($viewData);
    }


    // reportType : 1 month, 2 quarter
    // timeOfStart : 1 current, 2 next
    public function managementReportSettingsTargetList()
    {
        $reportType = \Request::input('reportType', 1);
        $timeOfStart = \Request::input('timeOfStart');

        $timestamp = null;
        $dt = Carbon::now();
        if ($reportType == 1) {
            if ($timeOfStart == 1) {
                $timestamp = $dt->startOfMonth()->timestamp;
            } elseif ($timeOfStart == 2) {
                $timestamp = $dt->month($dt->month+1)->startOfMonth()->timestamp;
//                $nextMonth = new Carbon('first day of next month');
//                $timestamp = $nextMonth->timestamp;
            }
        } elseif ($reportType == 2) {
            if ($timeOfStart == 1) {
                $timestamp = $dt->firstOfQuarter()->timestamp;
            } elseif ($timeOfStart == 2) {
                // -- Get next Quarter --
                $timestamp = $dt->month($dt->month+3)->firstOfQuarter()->timestamp;
            }
        }
        $timestamp = $timestamp*1000;

        // -- Update --
        if (\Request::isMethod('post')) {
            $targetItems = array();
            foreach (array('txtTraffic', 'txtListing', 'txtLead', 'txtDeal') as $inputName) {
                $input = \Request::input($inputName, null);
                $temp = array(
                    'targetId' => empty($input['targetId']) ? null : $input['targetId'],
                    'targetTypeId' => $input['targetTypeId'],
                    'targetValue' => empty($input['targetValue']) ? null : $input['targetValue']
                );
                $targetItems[] = $temp;
            }

            $postData = array(
                'targetTime' => $timestamp,
                'type' => $reportType,
                'targetItems' => $targetItems
            );

            $response = post_json(MANAGEMENT_REPORT_SETTINGS_SAVE_TARGET, $postData);
            return response()->json($response);
        }

        $APIUrl = sprintf(MANAGEMENT_REPORT_SETTINGS_GET_TARGET, $reportType, $timestamp);
        $response = get_json($APIUrl);

        $viewData = array('items' => $response->data);
        $contents = View::make('graph-reports.settingsTargetList', $viewData)->render();
        $response->contentHtml = $contents;

        return response()->json($response);

    }

    public function managementReportSettingsTargetHistory()
    {
        $reportType = \Request::input('reportType', 1);
        $targetId = \Request::input('targetId');

        $APIUrl = sprintf(MANAGEMENT_REPORT_SETTINGS_GET_TARGET_HISTORY, $reportType, $targetId);
        $response = get_json($APIUrl);

        $viewData = array('items' => $response->data);
        $contents = View::make('graph-reports.settingsTargetHistory', $viewData)->render();
        $response->contentHtml = $contents;

        return response()->json($response);
    }

    public function managementReportSettingsSaleFunnelHistoryList()
    {
        $saleFunnelTypeId = \Request::input('saleFunnelTypeId', null);
        $APIUrl = sprintf(MANAGEMENT_REPORT_SETTINGS_GET_SALE_FUNNEL_HISTORY, $saleFunnelTypeId);
        $response = get_json($APIUrl);

        $viewData = array('items' => $response->data);
        $contents = View::make('graph-reports.settingsSaleFunnelHistory', $viewData)->render();
        $response->contentHtml = $contents;

        return response()->json($response);
    }

    public function importLeadsFromUrl() {
        $request = \Request::input();
        $sheetId = $request['sheetId'];
        $importGoogleSheet = get_json(IMPORT_GOOGLE_SHEET. '/' .$sheetId);
        return response()->json($importGoogleSheet);
    }

}
