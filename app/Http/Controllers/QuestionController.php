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
use Storage;

class QuestionController extends BaseController
{

    private $_API = [
        'get-question-list' => '/profile/get-question-form/%d/%d',
        'add-edit-question' => 'profile/question', //questionType
    ];
    public function __construct()
    {
        parent::__construct();
        //
    }

    public function index()
    {
        return view("question.index-new");
    }

    public function getListQuestions()
    {
        $postData = \Request::json()->all();
        $type = isset($postData['type']) ? $postData['type'] : 1;
        $listingType = isset($postData['listingType']) ? $postData['listingType'] : 1;

        $response =  get_json(sprintf($this->_API['get-question-list'], $type, $listingType));
        $response->dataPost = $postData;
        return response()->json($response);
    }

    public function createQuestions()
    {
        $postData = \Request::json()->all();
        //$listingType = isset($postData['listingType']) ? $postData['listingType'] : 1;
        $response =  post_json($this->_API['add-edit-question'], $postData);
        return response()->json($response);
    }

    public function editQuestions()
    {
        $postData = \Request::json()->all();
        $response = put_json($this->_API['add-edit-question'], $postData);
        return response()->json($response);
    }


    public function setQuestionForm()
    {
        $postData = \Request::json()->all();
        $response = post_json(QUESTION_FORM, $postData);
        return response()->json($response);
    }



    public function setQuetionFormView()
    {
        $postData = \Request::json()->all();
        $typePageForQuestion = $postData['typePageForQuestion'];
        unset($postData['typePageForQuestion']);
        // return response()->json($postData); 
        $response = post_json(SET_QUESTION_MODAL_VIEW . "/" . $typePageForQuestion, $postData);
        return response()->json($response);
    }



    public function openModalInTask()
    {
        $postData = \Request::json()->all();
        $isResult = isset($postData['isResult']) ? $postData['isResult'] : true;
        if (!empty($postData['compare'])) {
            $postDataQuestion = [
                "leadId" => $postData['leadId'],
                "questionId" => 0,
                "isResult" => false
            ];
            $res = post_json(QUESTION_MODAL_VIEW, $postDataQuestion);
            if ($res->code != 200 && is_array($res->data) && !count($res->data)) {
                return response()->json($res);
            }
            $viewData['questionModalView'] = $res->data;

            $postDataQuestionView = [
                "leadId" => $postData['leadId'],
                "questionId" => 0,
                // "isResult" => true
                "source" => "history"
            ];
            $res = post_json(QUESTION_MODAL_VIEW, $postDataQuestionView);
            if ($res->code != 200 && is_array($res->data) && !count($res->data)) {
                return response()->json($res);
            }

            $viewData['questionModalViewMode'] = $res->data;
            $viewData['viewResult'] = view('deal-history.renderProfile')->with(['resultQuestion' => $viewData['questionModalViewMode']->resultQuestion])->render();
        } else {
            $postDataQuestion = [
                "leadId" => $postData['leadId'],
                "questionId" => 0,
                "isResult" => $isResult,
            ];
            $res = post_json(QUESTION_MODAL_VIEW, $postDataQuestion);
            if ($res->code != 200 && is_array($res->data) && !count($res->data)) {
                return response()->json($res);
            }
            $viewData['questionModalView'] = $res->data;
            $viewData['viewResult'] = '';
        }


        // return response()->json($viewData);
        $returnHTML = view('questionModalView')->with($viewData)->render();
        return response()->json($returnHTML);

        // return view("questionModalView")->with($viewData);
    }


    public function openModalQuestionLog()
    {
        $postData = \Request::json()->all();
        $viewData['questionModalView'] = json_decode(get_json('profile/question-log/' . $postData['logId'])->data->dataJson);
        // return response()->json($viewData['questionModalView']);
        $returnHTML = view('question.modalQuestionLog')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    public function getQuestionList()
    {
        $questionLists = [];
        $res = get_json(LIST_QUESTION_NOT_IN_FORM);
        if ($res->data) {
            $questionLists = $res->data;
        }
        $viewData['questions'] = $questionLists;

        // return response()->json($viewData);
        $returnHTML = view('question.listQuestion')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    public function getQuestionListModal()
    {
        $questionLists = [];
        $res = get_json(LIST_QUESTION_NOT_IN_FORM . '/1');
        if ($res->data) {
            $questionLists = $res->data;
        }
        $viewData['questions'] = $questionLists;

        // return response()->json($viewData);
        $returnHTML = view('question.listQuestionModal')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    public function updateQuestionChild()
    {
        $questionLists = [];
        $res = get_json(LIST_QUESTION_NOT_IN_FORM);
        if ($res->data) {
            $questionLists = $res->data;
        }
        $viewData['questions'] = $questionLists;

        // return response()->json($viewData);
        $returnHTML = view('question.questionChildModal')->with($viewData)->render();
        return response()->json($returnHTML);
    }

    public function addItemEditedToForm()
    {
        $postData = \Request::json()->all();
        $viewData['forms'] = [$postData['item']];
        // return response()->json($viewData['forms']);
        $returnHTML = view('question.itemForQuestionFormWhenEdit')->with($viewData)->render();
        return response()->json($returnHTML);
    }



    public function create()
    {
        // {
        //   "questionId": 1,
        //   "questionName": "cau hoi 1",
        //   "answerType": 1,
        //   "isPrimary": 0,
        //   "answers": [
        //     {
        //       "answersId": 1,
        //       "answersName": " cau tra loi 1"
        //     }
        //   ]
        // }

        // note:
        // answerType=1: 1luachom,
        // answerType=2: nhieuluachon,
        // answerType=3: text,

        // isPrimary=0cauhoichinh,
        // isPrimary=1cauhoiphu,


        $viewData = [];
        // $requestData = \Request::input();
        // $requestData['question'];
        return response()->json($viewData);
    }

    // public function setForm(){
    //     $viewData = {};
    //     return view("question.form")->with($viewData);
    // }


    public function delete()
    {
        $postData = \Request::json()->all();
        // return $postData['questionId'];
        $response = delete_json(QUESTION_DELETE . $postData['questionId']);
        return response()->json($response);
    }


    public function oldForm()
    {
        return view('question.oldForm');
        // return view("crm-dashboard.modal-confirm-meeting-request");
    }

    public function checkCompleteQuestionForm()
    {
        $postData = \Request::json()->all();
        // return $postData['questionId'];
        $response = get_json('lead/' . $postData['leadId'] . '/check-profile-kh');
        return response()->json($response);
    }
}
