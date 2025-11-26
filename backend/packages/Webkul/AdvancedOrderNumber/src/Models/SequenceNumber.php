<?php

namespace WebbyTroops\AdvancedOrderNumber\Models;

use Illuminate\Database\Eloquent\Model;
use WebbyTroops\AdvancedOrderNumber\Contracts\SequenceNumber as SequenceNumberContract;

class SequenceNumber extends Model implements SequenceNumberContract
{
    CONST ENTITY_TYPE_ORDER = 'order';
    CONST ENTITY_TYPE_INVOICE = 'invoice';
    CONST ENTITY_TYPE_SHIPMENT = 'shipment';
    CONST ENTITY_TYPE_REFUND = 'refund';
    
    public const NEVER = 'never';
    public const EVERY_DAY = 'every_day';
    public const EVERY_WEEK = 'every_week';
    public const EVERY_MONTH = 'every_month';
    public const EVERY_YEAR = 'every_year';
    
    protected $fillable = ['increment_id', 'entity_type', 'entity_id', 'sequence_number', 'channel_id'];

}