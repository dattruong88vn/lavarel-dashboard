<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        "imageBuildingUploader","videoBuildingUploader","createBuilding", "imageListingRemover", "videoListingRemover",
        "imageListingUploader","videoListingUploader","createListing", "imageBuildingRemover", "videoBuildingRemover", 
        "editBuilding", "avatar/delete", "updateListing","create-new-account","imageProjectRemover","imageProjectUploader",
        "createProject","imageDeveloperRemover","imageDeveloperUploader","developer-post","editProject",
        "customer-service/tao-request", "listing-service/assign-request", "agent/post-update", "agent/change-status",
        "listing/search", "user/reset-password", "agent-support/quan-ly-requests", "agent/post-create", "/agent-manager/image-agent-avatar-uploader", "agent/imageAgentCompanyLogoUploader", "agent/imageAgentCompanyLogoRemover", "brokerage-firm-manager/post-brokerage-firm", "request-manager/*", "agent-manager/*",
        "transaction-manager/*", "brokerage-firm-manager/image-brokerage-firm-remover", "brokerage-firm-manager/image-brokerage-firm-uploader","update-account","checkDuplicates","seo/delete","/login","*"





    ];
}

