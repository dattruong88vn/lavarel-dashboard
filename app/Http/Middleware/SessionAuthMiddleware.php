<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Requests;
use View;

class SessionAuthMiddleware {

    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
//        $clientIp = \Request::ip();
//        $allowedIps = [
//            '127.0.0.1',
//            '210.245.34.13',
//            '115.79.24.198'
//        ];
//
//        if (!in_array($clientIp, $allowedIps)) {
//            echo '<h2>Not found<h2>';
//            die();
//        }

        //var_dump("expression"); die();

        if (!$this->isPathExluded($request) && !Session::get('user')) {
            return redirect("/login?prev=".$request->url());
        }
        $currentUser = \Session::get("user");
        $currentGroup = \Session::get('currentGroup');
        //var_dump($currentGroup);
        View::share("currentGroup", $currentGroup);
        if (isset($currentUser)) {
            View::share("myUserId", $currentUser->userId);
            View::share("currentUser", $currentUser);
        } else {
            View::share("currentUser", null);
        }
        return $next($request);
    }
    
    private function isPathExluded($request){
        $result=FALSE;
        $path = $request->path();
        $excludePaths = array(
            "is-session-alive",
            "check-listings",
            "districts",
            "logout",
            "login",
            "forgot-pws",
            "change-password",
            "store-reset",
            "active-user",
            "user/do-create-password",
            "health-check"
        );
        foreach ($excludePaths as $ex){
            if(strpos($path, $ex)!==FALSE){
                $result = TRUE;
                break;
            }
        }
        return $result;
    }

}
