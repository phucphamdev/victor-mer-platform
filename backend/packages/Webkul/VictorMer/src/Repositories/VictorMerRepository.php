<?php

namespace Webkul\VictorMer\Repositories;

use Webkul\Core\Eloquent\Repository;
use Webkul\VictorMer\Models\VictorMerSetting;

class VictorMerRepository extends Repository
{
    /**
     * Specify Model class name
     */
    public function model(): string
    {
        return VictorMerSetting::class;
    }

    /**
     * Get all settings grouped by group
     */
    public function getAllGrouped(): array
    {
        $settings = $this->all();
        $grouped = [];

        foreach ($settings as $setting) {
            $grouped[$setting->group][$setting->key] = $setting->value;
        }

        return $grouped;
    }

    /**
     * Update multiple settings
     */
    public function updateSettings(array $settings, string $group): void
    {
        foreach ($settings as $key => $value) {
            VictorMerSetting::set($key, $value, $group);
        }
    }

    /**
     * Get statistics for dashboard
     */
    public function getStatistics(): array
    {
        return [
            'total_settings' => $this->count(),
            'general_settings' => $this->where('group', 'general')->count(),
            'seo_settings' => $this->where('group', 'seo')->count(),
        ];
    }
}
