<?php
namespace WebbyTroops\AdvancedOrderNumber\Helpers;

use Carbon\Carbon;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use Illuminate\Support\Facades\Route;
use Webkul\Sales\Models\Order;
use WebbyTroops\AdvancedOrderNumber\Generators\NumberGenerator;
use Webkul\Sales\Models\Channel;

class SequenceNumberHelper
{
    
    PUBLIC CONST COUNTER_ENTITIES = [
            [
                'entity' => SequenceNumber::ENTITY_TYPE_ORDER,
                'start_counter' => "sales.advancedOrderNumberSetting.orderNumber.advance_order_number_start_counter",
                'reset_time' => "sales.advancedOrderNumberSetting.orderNumber.advance_order_number_reset_counter",
                'counter_step' => "sales.advancedOrderNumberSetting.orderNumber.advance_order_number_counter_step"
            ],
            [
                'entity' => SequenceNumber::ENTITY_TYPE_INVOICE,
                'start_counter' => "sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_start_counter",
                'reset_time' => "sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_reset_counter",
                'counter_step' => "sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_counter_step"
            ],
            [
                'entity' => SequenceNumber::ENTITY_TYPE_SHIPMENT,
                'start_counter' => "sales.advancedOrderNumberSetting.shipmentNumber.advance_invoice_number_start_counter",
                'reset_time' => "sales.advancedOrderNumberSetting.shipmentNumber.advance_invoice_number_reset_counter",
                'counter_step' => "sales.advancedOrderNumberSetting.shipmentNumber.advance_invoice_number_counter_step"
            ],
            [
                'entity' => SequenceNumber::ENTITY_TYPE_REFUND,
                'start_counter' => "sales.advancedOrderNumberSetting.refundNumber.advance_invoice_number_start_counter",
                'reset_time' => "sales.advancedOrderNumberSetting.refundNumber.advance_invoice_number_reset_counter",
                'counter_step' => "sales.advancedOrderNumberSetting.refundNumber.advance_invoice_number_counter_step"
            ],
        ];


    /**
     * Reset Counter.
     *
     * @return void
     */
    public function resetCounter($channelId, $channelCode): void
    {
        foreach (self::COUNTER_ENTITIES as $counterEntity) {
            $resetCounterTime = core()->getConfigData($counterEntity['reset_time'], $channelCode);
            $startCounter = core()->getConfigData($counterEntity['start_counter'], $channelCode);
            $counterStep = core()->getConfigData($counterEntity['counter_step'], $channelCode);
            
            $resetCounter = false;
            switch ($resetCounterTime) {
                case SequenceNumber::EVERY_DAY:
                    $resetCounter = true;
                    break;
                case SequenceNumber::EVERY_WEEK:
                    $resetCounter = date('Y-m-d') == date('Y-m-d', strtotime('monday this week'));
                    break;
                case SequenceNumber::EVERY_MONTH:
                    $resetCounter = date('Y-m-d') == date('Y-m-01');
                    break;
                case SequenceNumber::EVERY_YEAR:
                    $resetCounter = date('Y-m-d') == date('Y-01-01');
                    break;
            }
            
            if ($resetCounter && $startCounter) {
                $sequenceNumber = SequenceNumber::query()
                        ->where('entity_type', $counterEntity['entity'])
                        ->where('channel_id', $channelId)
                        ->orderBy('id', 'desc')->limit(1)->first();
                if($sequenceNumber){
                    $sequenceNumber->sequence_number = NULL; 
                    $sequenceNumber->save();
                }
                
            }
        }
    }
    
    /**
     * Get current channel ID
     *
     * @return int
     */
    public static function getCurrentChannelCode()
    {
        $currentRouteName = Route::currentRouteName();
        if(in_array($currentRouteName, NumberGenerator::ENTITY_ROUTES)){
            
            $orderId = request()->route('order_id');
            $order = Order::find($orderId); 
            $currentChannelCode = $order->channel->code;
        } else {
            $currentChannelCode = core()->getCurrentChannelCode();
        }
        return $currentChannelCode;
    }

}
