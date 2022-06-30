<?php
/**
 * user: cs01 (Customer Service), tm01 (Transaction manager), ls01 (Listing Service), bd01(Business Development), as01 (Agent support)
 * pass 123
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use App\Http\Services\SeoService;
use App\Http\Services\CommonService;

class SeoController extends BaseController
{
    protected $seoService;
    protected $commonService;
    private $API = [
        'list' => 'seo/property/list/%d/%d',
        'seo' => 'seo/property',
        'del-sel' => 'seo/property'
    ];

    public function __construct(SeoService $seoService, CommonService $commonService)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        parent::__construct();
        $this->seoService = $seoService;
        $this->commonService = $commonService;
    }

    public function index() {
        return $this->show();
    }

    public function showCreatePage() {
        $data = [
            'pageType' => 'CREATE',
            'seoDetail' => json_encode([])
        ];
        return view('seo.seo-detail')->with($data);
    }
    public function showEditPage($slug) {
        $response =  get_json($this->API['seo'] . "/" . $slug);
        if (empty($response->result) && count($response->data) === 0) {
            return abort(404);
        }
        $data = [
            'pageType' => 'EDIT',
            'seoDetail' =>  json_encode($response->data[0])
        ];
        return view('seo.seo-detail')->with($data);
    }

    public function show()
    {
        return view('seo.list');
    }

    public function getSeoList() {
        $requestData = \Request::all();
        $numberPage = $this->numberPageFromRequest($requestData);
        $dataPost = [
            'keyword' => isset($requestData['keyword']) ? $requestData['keyword'] : null,
            'sortValue' => isset($requestData['sortValue']) ? $requestData['sortValue'] : 'desc',
            'sortColumnName' => isset($requestData['sortColumnName']) ? $requestData['sortColumnName'] : 'createdDate',
        ];

        $results = [
            'data' => [],
            'totalItems' => 0,
            'recordsTotal' => 0,
            'recordsFiltered' => 0,
        ];
        $response = post_json(sprintf($this->API['list'], $numberPage['pages'], $numberPage['items']), $dataPost);
        // echo "<pre>"; print_r(json_encode($dataPost)); die;
        try {

            if ($response->result && isset($response->data)) {
                $results['data'] = $response->data->list;
                $results['totalItems'] = $response->data->totalItems;
                $results['recordsTotal'] = $response->data->totalItems;
                $results['recordsFiltered'] = $response->data->totalItems;
            }
        } catch (\Exception $e) {

        }

        return response()->json($results);
    }

    public function getDirections()
    {
        return $this->commonService->getDirections();
    }

    public function postPage($type)
    {
        $requestData = \Request::json()->all();

        $postData = [];
        foreach ($requestData as $key => $value) {
            $postData[$key] = $value;
        }

        if ($type == "post") {
            $response = post_json(POST_SEO_PROPERTY, $postData);
        } else {
            $response = put_json(POST_SEO_PROPERTY, $postData);
        }
        return response()->json($response);
    }

    public function deletePage(Request $request)
    {
        $data = $request->json()->all();

        $response = post_json(DELETE_SEO_PROPERTY, $data);
        return json_encode($response);
    }
}
