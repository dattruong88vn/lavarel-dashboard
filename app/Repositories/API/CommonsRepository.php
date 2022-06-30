<?php

namespace App\Repositories\API;

/**
 * handle commons data
 * @author: Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since CRM_SPRINT_2
 */
class CommonsRepository {

    public static function getAll() {
        $items = [
            static::generateFakeObject(1, "Hồ Chí Minh")
        ];

        return $items;
    }

    public static function generateFakeObject($id, $name) {
        return (object) [
                    "cityId" => $id,
                    "cityName" => $name
        ];
    }

    public static function getPositions() {
        return [
            1 => 'Mặt tiền',
            2 => 'Hẻm'
        ];
    }
    public static function getRoadFrontageDistances() {
        return [
            0 => '<= 100m',
            100 => '100m - 200m',
            200 => '200m - 500m',
            500 => '>500m'
        ];
    }

    public static function getAlleys() {
        $alleyTypes = get_json(ALLEY_TYPE)->data;

        $returnValues = [];
        foreach ($alleyTypes as $key => $value) {
            array_push($returnValues,(object) ['alleyId' => $value->alleyId, 'alleyName' => $value->alleyName] );
        }
        return $returnValues;
    }

    public static function getAlleyTypes() {

        return [
            1 => 'Hẻm thông',
            2 => 'Hẻm cụt'
        ];
    }

    public static function getAmenitiesByListingType($listingTypeId) {
        $chanelType = $listingTypeId;
        if ($listingTypeId == 2) {
            $chanelType = 3;
        }
        $amenities = get_json("seller/channel-types/$chanelType");
        return $amenities;
    }

}
