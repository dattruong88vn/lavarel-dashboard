<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Repositories\API\RepositoriesFactory;

class ManagerReportController extends BaseController {

    private $repositoryFactory = null;
    private $managerReportRepository = null;

    /**
     * @author Phan Minh Hoàng <hoang.phan@propy.com>
     * @param RepositoriesFactory $repositoryFactory
     */
    public function __construct(RepositoriesFactory $repositoryFactory) {
        parent::__construct();
        $this->repositoryFactory = $repositoryFactory;
        $this->managerReportRepository = $this->repositoryFactory->getManagerReportRepo();
    }

    /**
     * @author Phan Minh Hoàng <hoang.phan@propy.com>
     * @return view
     */
    public function transactionCentersForCeo() {
        $viewData['cities'] = $this->repositoryFactory->getCityRepo()->getAll();
        $viewData['transactionCenters'] = $this->repositoryFactory->getTransactionCenterRepo()->getAll();
        return view("manager-report.transaction-centers-for-ceo")->with($viewData);
    }

    /**
     * @author Phan Minh Hoàng <hoang.phan@propy.com>
     * @return view
     */
    public function getLptLprByRegions() {
        $postData = \Request::json()->all();
        $response = $this->managerReportRepository->getLptLpr($postData);
        return response()->json($response);
    }

    /**
     * @author Phan Minh Hoàng <hoang.phan@propy.com>
     * @return view
     */
    public function getDealByAllStatus() {
        $postData = \Request::json()->all();
        $response = $this->managerReportRepository->getDealByAllStatus($postData);
        return response()->json($response);
    }

    /**
     * @author Phan Minh Hoàng <hoang.phan@propy.com>
     * @return view
     */
    public function reportDealByRegions() {
        $postData = \Request::json()->all();
        $response = $this->managerReportRepository->getDealByRegions($postData);
        return response()->json($response);
    }

    /**
     * @author Phan Minh Hoàng <hoang.phan@propy.com>
     * @return view
     */
    public function reportDealWithToursLastSevenDays() {
        $postData = \Request::json()->all();
        $response = $this->managerReportRepository->reportDealWithToursLastSevenDays($postData);
        return response()->json($response);
    }

    /**
     * @author Phan Minh Hoàng <hoang.phan@propy.com>
     * @return view
     */
    public function transactionCenterForCeo($id) {
        
    }

}
