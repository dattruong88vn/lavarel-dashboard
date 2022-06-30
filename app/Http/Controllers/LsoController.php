<?php

/**
 * LSO Dashboard
 *
 * @author Huy <huy.chau@propzy.com>
 */

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
use App\Common;
use Validator;
use App\Http\Services\LsoService;
use App\Http\Services\CrawlerService;

class LsoController extends BaseController
{
    private $lsoService;
    private $crawlerService;
    private $tmpLoggedInUser;

    public function __construct(LsoService $lsoService, CrawlerService $crawlerService) {
        parent::__construct();
        $this->lsoService = $lsoService;
        $this->crawlerService = $crawlerService;
        // Logged-in user
        $this->tmpLoggedInUser = getLoggedInUserInfo();
        $tmpLoggedInUser = $this->tmpLoggedInUser;
        // Department ID
        $tmpDepartmentId = isset($tmpLoggedInUser->departments[0]->departmentId) ? $tmpLoggedInUser->departments[0]->departmentId : 0;
        View::share('tmpDepartmentId', $tmpDepartmentId);

        View::share('loggedInUser', $this->tmpLoggedInUser);
        // BASE API
        View::share('baseApiLink', BASE_UPLOAD_API);
    }

    /**
     * LSO Dashboard
     *
     * @return void
     */
    public function index() {
        return view("lso.list");
    }

    /**
     * Listing Detail
     *
     * Thông tin tin đăng
     * @return void
     */
    public function detail($id) {
        try {
            $listing = $this->lsoService->getListingDetail($id);
            // return response()->json($listing);
            if (empty($listing)) {
                return view('errors.404');
            }
            return view("lso.detail")->with(compact('listing'));
        } catch (\Exception $e) {
            abort(404);
        }
    }

    /**
     * JSON of LSO [Debug]
     * @return [type] [description]
     */
    public function detailJson($id) {
        try {
            $lso = $this->lsoService->getListingDetail($id);

            return response()->json($lso);
        } catch (\Exception $e) {
            return response()->json(['result' => ""]);
        }
    }

    public function create() {
        return view('lso.create');
    }

    public function meetings() {
        return view('lso.list-meeting');
    }

    public function listings() {
        return view('lso.listings');
    }

    public function getFullListings() {
        $result = $this->lsoService->getFullListings(null);
        return response()->json($result);
    }

    /**
     * Màn hình Report
     */
    public function reports() {
        return view('lso.reports');
    }

    /**
     * Dừng listing
     * @return [type] [description]
     */
    public function stopListing() {
      $result = $this->lsoService->stopListing();
      return response()->json($result);
    }

    /**
     * Từ chối listing
     *
     */
    public function rejectListing() {
        $result = $this->lsoService->rejectListing();
        return response()->json($result);
    }

    public function soldRentListing() {
      $result = $this->lsoService->soldRentListing();
      return response()->json($result);
    }

    public function sendRequestLs() {
      $result = $this->lsoService->sendRequestListing();
      return response()->json($result);
    }

    public function resendAccountInfo() {
      $result = $this->lsoService->resend(\Request::input('ownerId'));
      return response()->json($result);
    }

    /**
     * Danh sách màn hình cào
     *
     */
    public function crawlers() {
        return view('lso.crawlers');
    }

    /**
     * Tạo mới crawler
     *
     * Path: /crawler/
     */
    public function createCrawler() {
        return view('lso.crawler');
    }

    /**
     * Chỉnh sửa crawler
     *
     * Path: /crawler/{id}
     * @param int $id Crawler ID
     */
    public function editCrawler($id) {
        return view('lso.crawler')->with(compact('id'));

    }
    public function getCrawlers() {
        $requestData = \Request::input();
        $viewData = $this->crawlerService->getList($requestData);
        return response()->json($viewData);
    }

    /**
     * API lấy chi tiết crawler
     * @return [type] [description]
     */
    public function getCrawler() {
        $requestData = \Request::input();
        $response = $this->crawlerService->getDetail($requestData);
        return response()->json($response);
    }

    // TO-DO: Update crawler ngoài list (chưa có API)
    public function updateCrawler() {
        $requestData = \Request::json()->all();
        // TO-DO : Add validate
        $response = $this->crawlerService->update($requestData);
        return response()->json($response);
    }

    public function reassignLso() {
        $requestData = \Request::json()->all();
        $response = $this->lsoService->reassignLso($requestData);
        return response()->json($response);
    }

    /**
     * [API] Get listings
     *
     * @return json list
     */
    public function getListings() {
        $requestData = \Request::input();
      $viewData = $this->lsoService->getListings($requestData);
      return response()->json($viewData);
    }

    public function history($lsoId) {
        return view('lso.histories')->with(compact('lsoId'));
    }

    public function getHistories() {
        $requestData = \Request::input();
        $viewData = $this->lsoService->getHistories($requestData);
        return response()->json($viewData);
    }

    public function createListingNote() {
        $requestData = \Request::json()->all();
        $response = $this->lsoService->createListingNote($requestData);
        return response()->json($response);
    }

    public function getListingsByOwner() {
      $requestData = \Request::input();
      $viewData = $this->lsoService->getListingByOwner($requestData);
      return response()->json($viewData);
    }

    /**
     * API lấy danh sách loại trạng thái
     *
     * @return [type] [description]
     */
    public function getStatusList() {
        $response = $this->lsoService->getStatusList();
        return response()->json($response);
    }

    /**
     * API lấy danh sách loại trạng thái LSO
     *
     * @return [type] [description]
     */
    public function getStatusLsoList() {
        $response = $this->crawlerService->getStatusLsoList();
        return response()->json($response);
    }

    /**
     * API lấy loại hình BĐS
     *
     * @param  integer $typeId Bán (1) Thuê (2)
     * @return JSON
     */
    public function getPropertyTypeList($typeId = 1) {
        $response = $this->lsoService->getPropertyTypeList($typeId);
        return response()->json($response);
    }

        /**
     * API lấy loại hình BĐS
     *
     * @param  integer $typeId Bán (1) Thuê (2)
     * @param  integer $groupId Du An (1) Nha Dat (2) Toa Nha(3)
     * @return JSON
     */
    public function getPropertyTypeListV2($groupId = 1, $typeId = 1) {
        $response = $this->lsoService->getPropertyTypeListV2($groupId, $typeId);
        return response()->json($response->data);
    }
    /**
     * API lấy loại hình BĐS
     *
     * @param  integer $typeId Bán (1) Thuê (2)
     * @return JSON
     */
    public function getPropertyTypeListPrefix($typeId = 1) {
        $response = $this->lsoService->getPropertyTypeListPrefix($typeId);
        return response()->json($response);
    }
    /**
     * API lấy Nhom BĐS
     *
     */
    public function getRealEstateGroup() {
        $response = $this->lsoService->getPropertyGroupList();
        return response()->json($response->data);
    }

    /**
     * API lấy loại hình giao dịch
     *
     */
    public function getPropertyTypes() {
        return response()->json(\Config::get('constant.lso.propertyTypes'));
    }

    /**
     * API lấy danh sách nguồn
     *
     */
    public function getSourceTypes() {
        $response = $this->lsoService->getSourceTypes();
        return response()->json($response);
    }

    /**
     * API lấy danh sách giay chủ quyền
     */
    public function getRightTypes() {
        $response = $this->lsoService->getRightTypes();
        return response()->json($response);
    }

    /**
     * API lấy danh sách loại nhà
     */
    public function getHouseTypes() {
        $response = $this->lsoService->getHouseTypes();
        return response()->json($response);
    }

    /**
     * API lấy danh sách đặc điểm
     *
     * @return JSON
     */
    public function getAdvantages() {
        $response = $this->lsoService->getAdvantages();
        return response()->json($response);
    }

    /**
     * API lấy danh sách nhược điểm
     *
     * @return JSON
     */
    public function getDisadvantages() {
        $response = $this->lsoService->getDisadvantages();
        return response()->json($response);
    }


    /**
     * API lấy danh sách loại công trình
     * @return JSON
     */
    public function getConstructionTypes() {
        $response = $this->lsoService->getConstructionTypes();
        return response()->json($response);
    }

    /**
     * API lay nhan vien LSO
     *
     * @return JSON
     */
    public function getLsoMembers() {
        $response = $this->lsoService->getLsoMembers();
        // Add them Loggedin User (mac dinh list khong co loggedIn user)
        array_push($response->data,
            (object)[
                'userId' => $this->tmpLoggedInUser->userId,
                'name'=> $this->tmpLoggedInUser->name,
                'type' => 'active'
            ]);
        return response()->json($response);
    }


    /**
     * API check trùng owner
     * @return JSON
     */
    public function checkExistsOwner() {
        $requestData = \Request::json()->all();
        $response = post_json("lso/owners/check-exists", $requestData);
        return response()->json($response);
    }

    /**
     * API check trùng tin đăng theo địa chỉ
     * type = 1 (tin dang hệ thống)
     * type = 2 (tin dang lso)
     *
     * @param JSON
     * @return JSON
     */
    public function checkDuplicatedAddress() {
        $requestData = \Request::json()->all();
        $response = post_json("lso/listings/check-exists", $requestData);
        return response()->json($response);
    }

    /**
     * API Update listing
     * @return JSON
     */
    public function updateListing() {
        $requestData = \Request::json()->all();
        $response = put_json("lso/listings", $requestData);
        return response()->json($response);
    }

    public function updateOwner() {
        $requestData = \Request::json()->all();
        $response = put_json("lso/owners", $requestData);
        return response()->json($response);
    }

    public function createRealListing() {
        $requestData = \Request::json()->all();
        $response = post_json("lso/listings/to-real-listing", $requestData);
        return response()->json($response);
    }

    public function createLso() {
        $requestData = \Request::json()->all();
        $response = post_json("lso/listings", $requestData);
        return response()->json($response);
    }

    /**
     * API dùng để hủy tin đăng lso
     *
     */
    public function deleteLso() {
        $requestData = \Request::input();
        $id = checkInputData($requestData['id']);
        $response = delete_json(sprintf("lso/listings/%d", $id));
        return response()->json($response);
    }

    public function createListingMeeting() {
        $requestData = \Request::json()->all();
        $response = post_json("lso/listings/meeting", $requestData);
        return response()->json($response);
    }

    public function getChannelTypes() {
        $response = get_json("lso/channel-types");
        return response()->json($response);
    }

    public function sendDiy() {
        $requestData = \Request::input();
        $response = get_json("lso/listings/".$requestData['id']."/send-diy");
        return response()->json($response);
    }

    public function unlock() {
        $requestData = \Request::input();
        $response = get_json("lso/listings/".$requestData['id']."/lock-unlock");
        return response()->json($response);
    }

    public function getListMeetings() {
        $requestData = \Request::input();
        $startDate = strtotime(date('d/m/Y'))*1000;
        if (checkInputData($requestData['start'])) {
            $startDate = strtotime($requestData['start'])*1000;
        }
        $endDate = strtotime("+7 day")*1000;
        if (checkInputData($requestData['end'])) {
            $endDate = strtotime($requestData['end'])*1000;
        }
        $postData = [
            "startDate" => checkInputData($startDate),
            "endDate" => checkInputData($endDate)
        ];
        $meetings = [];
        $meetingLists = $this->listingMeetingList($postData);
        foreach ($meetingLists as $meeting) {
            array_push($meetings, (object)[
                    "id" => $meeting->id,
                    "start" => date("Y-m-d\TH:i:s", $meeting->start/1000),
                    "end" => date("Y-m-d\TH:i:s", $meeting->end/1000),
                    "title" => strip_tags($meeting->title)
                ]);
        }
        return response()->json($meetings);
    }

    public function getMeetingDetail($id) {
        $response = get_json(sprintf("lso/listings/meetings/%d", $id));
        return response()->json($response);
    }

    public function listingMeetingList($postData) {
        $response = post_json("lso/listings/meeting/list", $postData);
        return $response->data;
    }

    /**
     * TO-DO : Add validate inside function
     *
     * @return [type] [description]
     */
    public function insertCrawler() {
        $requestData = \Request::json()->all();

        // Validate
        $validator = Validator::make($requestData, [
                // "name" => "required",
                "phone" => "required",
                "districtId" => "required|numeric",
                "wardId" => "required|numeric",
                "streetId" => "required|numeric",
                "price" => "required|numeric",
                "link" => "required"
            ]);

        // Validate fail
        if ($validator->fails()) {
            $response = ["result" => FALSE, "message" => "Error"];
        } else {
            $response = post_json("crawler/listings", $requestData);
        }
        return response()->json($response);
    }

    /**
     * Reminder
     */
    public function getReminderWorkTypes() {
        $response = get_json('lso/reminders/work-type');
        return response()->json($response);
    }

    public function getReminderStatus() {
        $response = get_json('lso/reminders/status');
        return response()->json($response);
    }

    public function getReminderMeeting() {
        $response = get_json('lso/listings/meetings/reminder');
        return response()->json($response);
    }

    public function createReminder() {
        $requestData = \Request::json()->all();
        $response = post_json('lso/reminders', $requestData);
        return response()->json($response);
    }

    /**
     * Popup
     */
    // Meeting Popup
    public function meetingPopupReminder() {
        $response = get_json("lso/listings/meetings/popup-reminder");
        return response()->json($response);
    }
    public function meetingClosedPopupReminder($id) {
        $response = get_json(sprintf('lso/listings/meetings/closed-popup/%d', $id));
        return response()->json($response);
    }
    public function reminderPopup() {
        $response = get_json('lso/reminders/popup');
        return response()->json($response);
    }
    public function reminderClosedPopup($id) {
        $response = get_json(sprintf('lso/reminders/closed-popup/%d', $id));
        return response()->json($response);
    }

    /**
     * Danh sách yêu cầu nội bộ (LSO)
     */
    public function getInternalListings() {
        $requestData = \Request::input();
        $viewData = $this->lsoService->getInternalListings($requestData);
        return response()->json($viewData);
    }

    public function createRequestInternal() {
        $viewData = $this->lsoService->createRequestInternal();
        return response()->json($viewData);
    }

    /**
     * Get LSO services
     */
    public function getLsoServices() {
        $viewData = $this->lsoService->getLsoServices();
        return response()->json($viewData);
    }

    public function delayLsoServices() {
        $viewData = $this->lsoService->delayLsoServices();
        return response()->json($viewData);
    }

    public function doneLsoServices() {
        $viewData = $this->lsoService->doneLsoServices();
        return response()->json($viewData);
    }

    public function getSentLsoServices() {
        $viewData = $this->lsoService->getSentLsoServices();
        return response()->json($viewData);
    }

    public function sentLsoServices() {
        $viewData = $this->lsoService->sentLsoServices();
        return response()->json($viewData);
    }

    public function getTotalPsServices() {
        $viewData = $this->lsoService->getTotalPsServices();
        return response()->json($viewData);
    }

    /**
     * Evaluation
     */
    public function getValuationOfRealEstate() {
        $viewData = $this->lsoService->getValuationOfRealEstate();
        return response()->json($viewData);
    }

    /**
     * Process image
     *
     * @return json list uploaded images
     */
    public function processImage() {
        $images = Common::uploadImage();
        return response()->json($images);
    }

    public function getReportCombined() {
        $result = $this->lsoService->getReportCombined(null);
        return response()->json($result);
    }

    public function getReportResultWork() {
        $result = $this->lsoService->getReportResultWork(null);
        return response()->json($result);
    }

    public function exportExcelResult() {
        $result = $this->lsoService->getExportExcelResultWork(null);
        return response()->json($result);
    }

    public function createStreet() {
        $result = $this->lsoService->createStreet();
        return response()->json($result);
    }    

    public function getProfileDetail() {
        $result = $this->lsoService->getProfileDetail();
        return response()->json($result);
    }

    public function updateProfile() {
        $result = $this->lsoService->updateProfile();
        return response()->json($result);
    }
}
