<?php

namespace App\Http\Services;

class SeoService {

	public function getSeo($slug) {
		try {
			return get_json(GET_SEO_PROPERTY . "/" . $slug)->data;
		} catch (\Exception $e) {
			return get_json([]);
		}
	}
}
