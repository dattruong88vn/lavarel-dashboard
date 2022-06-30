<?php

namespace App\Repositories\API;

/**
 * handle city data
 * @author: Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since CRM_SPRINT_2
 */
class CityRepository {

    public static function getAll() {
        $items = [
            static::generateFakeObject(1, "Hồ Chí Minh")
        ];

        return $items;
    }

    public static function generateFakeObject($id, $name) {
        return (object)[
            "cityId" => $id,
            "cityName" => $name
        ];
    }

}
