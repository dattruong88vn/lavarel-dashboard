<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class CrawlerController extends CommonPosController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        return redirect('/404-not-found');
        //return //view("pos.crawler.index");
        //}
    }

    public function create()
    {
        return view("pos.crawler.create");
    }

    public function listing()
    {
        return view("pos.crawler.listingList");
    }

    /**
     * API insertCrawler
     * @date 10/11/2017
     * @return JSON
     */
    public function insertCrawler()
    {
        $requestData = \Request::json()->all();

        // Validate
        $validator = Validator::make($requestData, [
            // "name" => "required",
            "phones" => "required",
            "districtId" => "required|numeric",
            "statusId" => "required|numeric",
            "listingTypeId" => "required|numeric",
            "propertyTypeId" => "required|numeric",
        ]);

        // Validate fail
        if ($validator->fails()) {
            $response = ["result" => FALSE, "message" => "Đã Có Lỗi Xảy Ra. Vui Lòng Kiểm Tra Lại Dữ Liệu"];
        } else {
            $response = post_json("crawler/listings/", $requestData);
        }
        return response()->json($response);
    }

    public function getCrawlerListingList()
    {
        $requestData = \Request::all();

        $statusId = $requestData['statusId'];
        $numberItems = $requestData['length'];
        $page = ($requestData['start'] / $numberItems) + 1;
        if ($requestData['dateCrawler'] == "") {
            $requestData['dateCrawler'] = null;
        }

        $postData = [
            'statusId' => $statusId,
            'dateCrawler' => $requestData['dateCrawler']
        ];

        $response = post_json(sprintf(\Config::get('apis.crawlers.list') . "%d/%d", $page, $numberItems), $postData);

        $response = [
            'recordsTotal' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
            'recordsFiltered' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
            'data' => isset($response->data->list) ? $response->data->list : [],
            'postData' => $postData
        ];

        return response()->json($response);
    }

    public function getCrawlerListingStatuses()
    {
        $response = get_json(sprintf(\Config::get('apis.crawlers.statuses') . "/%d", 1));
        return response()->json($response);
    }
}
