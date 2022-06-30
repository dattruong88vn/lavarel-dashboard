<?php

/**
 * Generate repositories
 * @author Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since CRM_SPRINT_2
 */

namespace App\Repositories\API;

use App\Models\JsonReturn;

class ManagerReportRepository {

    /**
     * Get LPT LPR data for report.
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param object $postData data will be posted to server
     * @return fakeData
     */
    public static function getLptLpr($postData) {
        $response = new JsonReturn();
        $response->data = static::generateFakeLptLprs(24);
        return $response;
    }

    /**
     * Get data for report Deal By All Status.
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param object $postData data will be posted to server
     * @return fakeData
     */
    public static function getDealByAllStatus($postData) {
        $response = new JsonReturn();
        $response->data = static::generateFakeDealByStatus(3);
        return $response;
    }

    /**
     * Get data for report Deal By Regions.
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param object $postData data will be posted to server
     * @return fakeData
     */
    public static function getDealByRegions($postData) {
        $response = new JsonReturn();
        $response->data = static::generateFakeDealByRegions(3);
        return $response;
    }

    /**
     * Get data for report Deal With Tours in last seven days.
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param object $postData data will be posted to server
     * @return fakeData
     */
    public static function reportDealWithToursLastSevenDays() {
        $response = new JsonReturn();
        $response->data = static::generateFakeDealByRegions(10);
        return $response;
    }

    /**
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param type $districtId
     * @param type $districtName
     * @param type $lptValue
     * @param type $lprValue
     * @return 
     */
    public static function generateFakeLptLpr($districtId, $districtName, $lptValue, $lprValue) {
        $item = [
            "districtId" => $districtId,
            "districtName" => $districtName,
            "lptValue" => $lptValue,
            "lprValue" => $lprValue
        ];
        return $item;
    }

    /**
     * 
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param type $totalItems the number of items that will be generated.
     * @return $items
     */
    public static function generateFakeLptLprs($totalItems) {
        $items = [];
        for ($i = 0; $i < $totalItems; $i++) {
            $items[] = static::generateFakeLptLpr($i, "district.$i", rand(10, 20), rand(10, 20));
        }
        return $items;
    }

    /**
     * 
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param type $totalItems the number of items that will be generated.
     * @return $items
     */
    public static function generateFakeDealByStatus($totalItems) {
        $items = [];
        for ($i = 0; $i < $totalItems; $i++) {
            $items[] = [
                "statusId" => $i,
                "statusName" => "status" . ($i + 10),
                "value" => rand(50, 100)
            ];
        }
        return $items;
    }

    /**
     * 
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @param type $totalItems the number of items that will be generated.
     * @return $items
     */
    public static function generateFakeDealByRegions($totalItems) {
        $items = [];
        for ($i = 0; $i < $totalItems; $i++) {
            $items[] = [
                "districtId" => $i,
                "districtName" => "district name " . ($i + 10),
                "value" => rand(50, 100)
            ];
        }
        return $items;
    }

}
