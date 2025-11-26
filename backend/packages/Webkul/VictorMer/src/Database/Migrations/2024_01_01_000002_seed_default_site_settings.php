<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $settings = [
            // General Settings
            ['key' => 'site_name', 'value' => 'My Store', 'group' => 'general'],
            ['key' => 'site_email', 'value' => 'info@example.com', 'group' => 'general'],
            ['key' => 'site_phone', 'value' => '+84 123 456 789', 'group' => 'general'],
            ['key' => 'site_address', 'value' => '', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => '', 'group' => 'general'],
            ['key' => 'site_favicon', 'value' => '', 'group' => 'general'],
            
            // SEO Settings
            ['key' => 'seo_title', 'value' => 'My Store', 'group' => 'seo'],
            ['key' => 'seo_description', 'value' => '', 'group' => 'seo'],
            ['key' => 'seo_keywords', 'value' => '', 'group' => 'seo'],
            ['key' => 'seo_og_title', 'value' => '', 'group' => 'seo'],
            ['key' => 'seo_og_description', 'value' => '', 'group' => 'seo'],
            ['key' => 'seo_og_image', 'value' => '', 'group' => 'seo'],
            ['key' => 'google_analytics', 'value' => '', 'group' => 'seo'],
            ['key' => 'google_tag_manager', 'value' => '', 'group' => 'seo'],
            ['key' => 'facebook_pixel', 'value' => '', 'group' => 'seo'],
        ];

        foreach ($settings as $setting) {
            DB::table('site_settings')->insert(array_merge($setting, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('site_settings')->truncate();
    }
};
