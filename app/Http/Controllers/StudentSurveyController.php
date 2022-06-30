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

class StudentSurveyController extends BaseController {

    private $API = [
        'survey-list' => '/survey/cc/%d/%d', // {page}/{numberItem}
        'get-location-map' => '/survey/view', // {page}/{numberItem} auto page 1 10.000 location
        'get-status-survey' => '/survey/status',
        'get-student-from-cc' => '/survey/user/cc',
        'send-mail' => '/survey/send-mail',
        'get-status-reject' => '/survey/channel-types/4',
        'review-survey' => '/survey/review',
        'photos' => '/survey/photos',
        'cc-staff' => '/survey/staffs'
    ];
	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
    	return view('student-survey.index');
    }

    public function getListSurvey() {
        $request = \Request::all();
        $data = [
            "conciergeIds" => !empty($request['conciergeIds']) ? $request['conciergeIds'] : null,
            "userIds" => !empty($request['userIds']) ? $request['userIds'] : null,
            "phone" => !empty($request['phone']) ? $request['phone'] : null,
            "confirmStatusIds" => !empty($request['confirmStatusIds']) ? $request['confirmStatusIds'] : null,
            "districtId" => !empty($request['districtId']) ? $request['districtId'] : null,
            "wardId" => !empty($request['wardId']) ? $request['wardId'] : null,
            "streetId" => !empty($request['streetId']) ? $request['streetId'] : null,
            "alleyId" => !empty($request['alleyId']) ? $request['alleyId'] : null,
            "fromCreatedDate" => !empty($request['fromCreatedDate']) ? $request['fromCreatedDate'] : null,
            "toCreatedDate" => !empty($request['toCreatedDate']) ? $request['toCreatedDate'] : null,
        ];

        $numberPages = $this->numberPageFromRequest($request);
        $response = post_json(sprintf($this->API['survey-list'],$numberPages['pages'], $numberPages['items'] ), $data);
        if($response->result) {
            $response->recordsTotal = $response->data->totalItems;
            $response->recordsFiltered = $response->data->totalItems;
            $response->data = $response->data->list;
            $response->requestData = $data;
        }
        return response()->json($response);
    }

    public function getLocationMap() {
        $request = \Request::all();
        $data = [
            "surveyIds" => !empty($request['surveyIds']) ? $request['surveyIds'] : null,
            "strCriteriaId" => !empty($request['strCriteriaId']) || $request['strCriteriaId'] == "0"  ? $request['strCriteriaId'] : null,
        ];
        $response = post_json($this->API['get-location-map'], $data);
        $response->requestData = $data;
        $response->api = $this->API['get-location-map'];
        return json_encode($response);
        // return response()->json($response);
    }

    public function getStatusSurvey() {
        $response = get_json($this->API['get-status-survey']);
        return response()->json($response);
    }
    public function getCCStaff() {
        $response = get_json($this->API['cc-staff']);
        return response()->json($response);
    }
    public function getStudentsFromCC()
    {
        $request = \Request::all();
        $data = [
            "conciergeIds" => !empty($request['conciergeIds']) ? $request['conciergeIds'] : -1,
        ];
        $response = post_json($this->API['get-student-from-cc'], $data);
        $response->requestData = $data;
        return response()->json($response);
    }

    public function sendMail() {
        $postData = \Request::json()->all();
        $response = post_json($this->API['send-mail'], $postData);
        return response()->json($response);
    }

    public function getStatusRejectSurvey() {
        $response = get_json($this->API['get-status-reject']);
        return response()->json($response);
    }

    public function reviewSurvey() {
        $postData = \Request::json()->all();
        $response = post_json($this->API['review-survey'], $postData);
        return response()->json($response);
    }

    public function photos() {
        $postData = \Request::json()->all();
        // $postData['latitude'] = number_format($postData['latitude'], 0, '', '' );
        // $postData['longitude'] = number_format($postData['longitude'], 0, '', '' );
        // printf("%.0f", $data);
        // echo number_format($data, 0, '', '');
        
        // $postData = [
        //     "surveyId" => 500,
        //     "criteriaId" => 60
        // ];
        // return response()->json($postData);
        $response = post_json($this->API['photos'], $postData);
        return response()->json($response);
    }

    public function viewExamine() {
        $surveyId = \Request::input("surveyId");
        $respone = get_json("survey/view-examine/$surveyId");
        return response()->json($respone);
    }
    public function updatePhotoSurvey() {
        $postData = \Request::json()->all();
        $response = put_json($this->API['photos'], $postData);
        return response()->json($response);
    }
}