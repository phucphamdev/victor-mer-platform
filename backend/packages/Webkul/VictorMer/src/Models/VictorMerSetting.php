<?php

namespace Webkul\VictorMer\Models;

use Illuminate\Database\Eloquent\Model;
use Webkul\VictorMer\Contracts\VictorMerSetting as VictorMerSettingContract;

class VictorMerSetting extends Model implements VictorMerSettingContract
{
    protected $table = 'victor_mer_settings';

    protected $fillable = [
        'key',
        'value',
        'group',
    ];

    /**
     * Get setting by key
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();

        return $setting ? $setting->value : $default;
    }

    /**
     * Set setting value
     */
    public static function set(string $key, $value, string $group = 'general'): void
    {
        static::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group]
        );
    }

    /**
     * Get all settings by group
     */
    public static function getByGroup(string $group): array
    {
        return static::where('group', $group)
            ->pluck('value', 'key')
            ->toArray();
    }
}
