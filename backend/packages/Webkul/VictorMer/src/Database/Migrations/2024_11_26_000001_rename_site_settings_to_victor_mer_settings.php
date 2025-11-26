<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('site_settings')) {
            Schema::rename('site_settings', 'victor_mer_settings');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('victor_mer_settings')) {
            Schema::rename('victor_mer_settings', 'site_settings');
        }
    }
};
