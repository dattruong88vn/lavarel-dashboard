<?php

namespace App\Http\Controllers;

use Exception;

class CommissionConfigController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        return view('commission-config.index');
    }

    public function getList()
    {
        $data = \Request::json()->all();
        $url = 'commission/setting';
        $postData = [
            'monthPeriod' => 7,
            'yearPeriod' => 2020
        ];
        if ($data['pagination']) {
            $url .=  '/' . $data['pagination']['page'] . '/' . $data['pagination']['limit'];
        }
        if ($data['period']) {
            $postData = $data['period'];
        }
        $response = post_json($url, $postData);
        if (!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }
    public function getUserPosition()
    {
        $url = 'commission/setting/get-user-position';
        $response = get_json($url);
        if (!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }
    public function getFormData()
    {
        $data = \Request::json()->all();
        if (!isset($data['type'])) {
            throw new Exception('Không tim thấy id type !');
        }
        $url = 'commission/setting/get-commission-type/' . $data['type'];
        $response = get_json($url);
        if (!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }
    public function getDetail()
    {
        $data = \Request::json()->all();
        $url = 'commission/setting/get-commission-setting-detail/' . intval($data['id']);
        $response = get_json($url);
        if (!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }

    public function createUpdate()
    {
        $data = \Request::json()->all();
        $postData = [
            'commissionId' => $data['commissionId'] ?? null,
            'commissionName' => $data['commissionName'] ?? '',
            'positionId' => intval($data['positionId']),
            'monthPeriod' => intval($data['monthPeriod']),
            'yearPeriod' => intval($data['yearPeriod']),
            'commissionType' => intval($data['commissionType']),
            'commissionAccumulateList' => [['percent' => floatval($data['formular']['percent'])]]
        ];
        if (!$data['isFixed']) {
            $postData['commissionAccumulateList'] = [];
            foreach ($data['formular']['list'] as $formular) {
                $push = [
                    'commissionFormulaTypeId' => $formular['data'][0]['type'],
                    'percent' => floatval($formular['rate']),
                    'formulaMap' => [],
                    'formulaCommissionList' => []
                ];
                $count = 0;
                foreach ($formular['data'] as $dt) {
                    $push['formulaCommissionList'][] = [
                        'operatorId' => $dt['operator'],
                        'value' => floatval(str_replace(',', '',  $dt['value'])),
                        'currencyId' => $dt['currency']
                    ];
                    $push['formulaMap'][] = $count;
                    $push['formulaMap'][] = $count === 0 ? $formular['logicId'] : '1717';
                    $count++;
                    if (intval($formular['logicId']) === 1717) {
                        break;
                    }
                }
                $postData['commissionAccumulateList'][] = $push;
            }
        }
        $url = 'commission/setting/save-or-update-commission-detail';
        $response = post_json($url, $postData);
        if (!isset($response->data)) {
            $response->data = [];
        }
        return response()->json($response);
    }
}
