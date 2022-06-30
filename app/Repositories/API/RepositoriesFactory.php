<?php

/**
 * Generate repositories
 * @author Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since CRM_SPRINT_2
 */

namespace App\Repositories\API;

class RepositoriesFactory {

    private $transactionCenterRepo = null;
    private $cityRepo = null;
    private $managerReportRepo = null;
    private $leadRepository = null;
    private static $instance = null;

    public static function getInstance() {
        if (empty(static::$instance)) {
            static::$instance = new RepositoriesFactory();
        }
        return static::$instance;
    }

    public function getTransactionCenterRepo() {
        if ($this->transactionCenterRepo == null) {
            $this->transactionCenterRepo = new TransactionCenterRepository();
        }
        return $this->transactionCenterRepo;
    }

    public function getCityRepo() {
        if ($this->cityRepo == null) {
            $this->cityRepo = new CityRepository();
        }
        return $this->cityRepo;
    }

    public function getManagerReportRepo() {
        if ($this->managerReportRepo == null) {
            $this->managerReportRepo = new ManagerReportRepository();
        }
        return $this->managerReportRepo;
    }

    public function getLeadRepo() {
        if (empty($this->leadRepository)) {
            $this->leadRepository = new LeadRepository();
        }
        return $this->leadRepository;
    }

}
