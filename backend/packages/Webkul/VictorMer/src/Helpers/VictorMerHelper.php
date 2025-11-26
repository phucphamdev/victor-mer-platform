<?php

namespace Webkul\VictorMer\Helpers;

use Webkul\VictorMer\Models\VictorMerSetting;

class VictorMerHelper
{
    /**
     * Get all settings for frontend
     */
    public static function getForFrontend(): array
    {
        $general = VictorMerSetting::getByGroup('general');
        $seo = VictorMerSetting::getByGroup('seo');

        return [
            'general' => $general,
            'seo' => $seo,
        ];
    }

    /**
     * Get meta tags for SEO
     */
    public static function getMetaTags(): array
    {
        $seo = VictorMerSetting::getByGroup('seo');

        return [
            'title' => $seo['seo_title'] ?? '',
            'description' => $seo['seo_description'] ?? '',
            'keywords' => $seo['seo_keywords'] ?? '',
            'og_title' => $seo['seo_og_title'] ?? '',
            'og_description' => $seo['seo_og_description'] ?? '',
            'og_image' => $seo['seo_og_image'] ?? '',
        ];
    }

    /**
     * Get tracking codes
     */
    public static function getTrackingCodes(): array
    {
        $seo = VictorMerSetting::getByGroup('seo');

        return [
            'google_analytics' => $seo['google_analytics'] ?? '',
            'google_tag_manager' => $seo['google_tag_manager'] ?? '',
            'facebook_pixel' => $seo['facebook_pixel'] ?? '',
        ];
    }

    /**
     * Get contact information
     */
    public static function getContactInfo(): array
    {
        $general = VictorMerSetting::getByGroup('general');

        return [
            'name' => $general['site_name'] ?? '',
            'email' => $general['site_email'] ?? '',
            'phone' => $general['site_phone'] ?? '',
            'address' => $general['site_address'] ?? '',
        ];
    }

    /**
     * Get site branding
     */
    public static function getBranding(): array
    {
        $general = VictorMerSetting::getByGroup('general');

        return [
            'logo' => $general['site_logo'] ?? '',
            'favicon' => $general['site_favicon'] ?? '',
            'name' => $general['site_name'] ?? '',
        ];
    }
}
