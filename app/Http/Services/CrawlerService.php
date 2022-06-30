<?php
  namespace App\Http\Services;

  class CrawlerService{

    function __construct() {

    }

    /**
     * [getList description]
     * @return [type] [description]
     */
    public function getList($requestData) {
      try {
        $page = get_current_page($requestData);
        // Prepare data
        $statusId = is_null(checkInputData($requestData['statusId'])) ? 0 : $requestData['statusId'];
        // Get data
        $response = get_json(sprintf(\Config::get('apis.crawlers.list') . "%d/%d/%d", $statusId, $page, NUMBER_ITEMS));
        $viewData = [
            'recordsTotal' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
            'recordsFiltered' => isset($response->data->totalItems) ? $response->data->totalItems : 0,
            'data' => isset($response->data->list) ? $response->data->list : [],
            'totalItems' => isset($response->data->totalItems) ? $response->data->totalItems : 0
        ];

        return $viewData;
      } catch (Exception $e) {
        return false;
      }
    }

    /**
     * [FunctionName description]
     * @param string $value [description]
     */
    public function getDetail($requestData) {
      try {
        $id = checkInputData($requestData['id']);
        $response = get_json(sprintf(\Config::get('apis.crawlers.detail') . "%d", $id));
        return $response;
      } catch (Exception $e) {
        return false;
      }
    }

    /**
     * Update crawler ngoài danh sách
     *
     * @param  Array $requestData
     * @return Array $response
     */
    public function update($requestData) {
      try {
        $response = post_json(\Config::get('apis.crawlers.update'), $requestData);
        return $response;
      } catch (Exception $e) {
        return false;
      }
    }

    /**
     * Danh sách tình trạng CRAWLER
     *
     * @return [type] [description]
     */
    public function getStatusLsoList() {
      try {
        $response = get_json(\Config::get('apis.crawlers.statuses'));
        return $response;
      } catch (Exception $e) {
        return FALSE;
      }

    }
  }
