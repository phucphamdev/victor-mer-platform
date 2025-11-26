<?php

namespace Webkul\VictorMer\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Webkul\VictorMer\Http\Controllers\Controller;
use Webkul\VictorMer\Helpers\SiteSettingHelper;
use Webkul\VictorMer\Models\SiteSetting;

class SiteSettingApiController extends Controller
{
    /**
     * Get all settings
     */
    public function all(): JsonResponse
    {
        $settings = SiteSettingHelper::getForFrontend();

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Get general settings
     */
    public function general(): JsonResponse
    {
        $settings = SiteSetting::getByGroup('general');

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Get SEO settings
     */
    public function seo(): JsonResponse
    {
        $settings = SiteSettingHelper::getMetaTags();

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Get contact information
     */
    public function contact(): JsonResponse
    {
        $contact = SiteSettingHelper::getContactInfo();

        return response()->json([
            'success' => true,
            'data' => $contact,
        ]);
    }

    /**
     * Get branding information
     */
    public function branding(): JsonResponse
    {
        $branding = SiteSettingHelper::getBranding();

        return response()->json([
            'success' => true,
            'data' => $branding,
        ]);
    }

    /**
     * Get tracking codes
     */
    public function tracking(): JsonResponse
    {
        $tracking = SiteSettingHelper::getTrackingCodes();

        return response()->json([
            'success' => true,
            'data' => $tracking,
        ]);
    }
}
