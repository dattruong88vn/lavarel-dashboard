<?php
namespace App\Http\Services;

use Illuminate\Support\Facades\Log;

class CommonService {

	public function getCities() {
		return get_json(GET_CITY_LIST);
	}

	public function getDistricts($cityId) {
		try {
			return get_json(GET_DISTRICTS."/". $cityId)->data;
		} catch (\Exception $e) {
			return response()->json([]);
		}
	}

	public function getProperyTypes() {
		return get_json(GET_PROPERTY_TYPE_LIST);
	}

	public function getDirections() {
		return get_json(GET_DIRECTIONS)->data;
	}

	/**
	 * Get result data
	 * 
	 * @param  [type] $api         [description]
	 * @param  [type] $url         [description]
	 * @param  [type] $postData    [description]
	 * @param  [type] $requestData [description]
	 * @param  [type] $type        "datalist", "report"
	 * @return [type]              [description]
	 */
	public function getResult($api, $url, $postData, $requestData, $type) {
		$result = [];
		try {						
			$postData = $this->createPostData($postData, $requestData);		

			$page = isset($requestData['page']) ? $requestData['page'] : 1;

			$pageParams = $this->createParams($postData);			

			switch ($type) {
				case "dataList":
					$response = post_json(sprintf($api, $page, NUMBER_ITEMS), $postData);
					$result = $this->getVuetablePaging($response->data->list, $page, $pageParams, $response->data->totalItems, $url);
					break;
				case "dataListWithTotal":
					$response = post_json(sprintf($api, $page, NUMBER_ITEMS), $postData);
					$data = $response->data->list;					
					$result = $this->getVuetablePaging($data, $page, $pageParams, $response->data->totalItems, $url);
					break;
				case "report":
					$result = post_json($api, $postData);
					break;
				default: 
					$result = [];
					break;
			}
		} catch (Exception $e) {
			// Log error
			return $e->getMessage();
			Log::error($e->getMessage());
		}
		return $result;
	}	

	private function updateFieldColumns(&$data, $arrayTotals) {
		$total = [
			"districtName" => "Tổng",
			"totalCrawler" => $arrayTotals[0],
			"totalCall" => $arrayTotals[1],
			"percentCall" => "",
			"totalLso" => $arrayTotals[2],
			"percentLso" => "",
			"totalLs" => $arrayTotals[3],
			"percentLs" => "",
		];

		array_push($data, (object)$total);
	}

	/**
	 * Get pagination info
	 * 
	 * @param  [type] $data       [description]
	 * @param  [type] $page       [description]
	 * @param  [type] $pageParams [description]
	 * @param  [type] $totalItems [description]
	 * @param  [type] $url        [description]
	 * @return [type]             [description]
	 */
	private function getVuetablePaging($data, $page, $pageParams, $totalItems, $url) {
		try {
			$result = [
	          'data' => $data,
	          'current_page' => intval($page),
	          "from" => (($page - 1) * NUMBER_ITEMS) + 1,
	          "last_page" => ($totalItems % NUMBER_ITEMS > 0) ? (($totalItems - ($totalItems % NUMBER_ITEMS)) / NUMBER_ITEMS) + 1 : ($totalItems / NUMBER_ITEMS),
	          "next_page_url" => ($page < ($totalItems % NUMBER_ITEMS)) ? $url . "?page=" . ($page + 1) . $pageParams : null,
	          "path" => $url,
	          "per_page" => NUMBER_ITEMS,
	          "prev_page_url" => ($page > 1) ? $url . "?page=" . ($page - 1) . $pageParams : null,
	          "to" => ($page * NUMBER_ITEMS) - 1,
	          "total" => $totalItems
	        ];

        	return $result;
		} catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	private function createPostData($postData, $requestData) {
	  foreach ($postData as $key => $value) {
        if (isset($requestData[$key]) && !empty($requestData[$key]) && $requestData[$key] != "null") {
          $postData[$key] = (strstr($key, "Id") || strstr($key, "from") || strstr($key, "to") || strstr($key, "type")) ? intval($requestData[$key]) : $requestData[$key];
        } else if(isset($requestData[$key]) && $requestData[$key] == "0") {
        	$postData[$key] = 0;
        } else {
        	$postData[$key] = null;
        }
      }      
      return $postData;
	}

	/**
	 * [createParams description]
	 * @param  [type] $postData [description]
	 * @return [type]           [description]
	 */
	private function createParams($postData) {
		$pageParams = "";
		foreach ($postData as $key => $value) {
			$pageParams .= "&" . $key . "=" . $value;
		}
		return $pageParams;
	}
}
