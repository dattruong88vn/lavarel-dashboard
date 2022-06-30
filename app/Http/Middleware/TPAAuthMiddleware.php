<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Requests;
use View;

class TPAAuthMiddleware {

    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {

        $currentGroup = \Session::get('currentGroup');
        //dd($currentGroup);
        if(empty($currentGroup) || $currentGroup["departmentId"] != 18) {
            return redirect('/403-forbidden');
        }
        return $next($request);
    }

}
