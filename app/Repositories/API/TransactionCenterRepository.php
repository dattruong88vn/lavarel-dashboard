<?php

namespace App\Repositories\API;

/**
 * handle transaction center data
 * @author: Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since CRM_SPRINT_2
 */
class TransactionCenterRepository {

    public static function getAll() {
        $items = [
            static::generateFakeObject(1, "Nguyễn văn trỗi")
        ];
        return $items;
    }

    public static function generateFakeObject($id, $name) {
        $item = new \stdClass();
        $item->id = $id;
        $item->name = $name;
        return $item;
    }

}
