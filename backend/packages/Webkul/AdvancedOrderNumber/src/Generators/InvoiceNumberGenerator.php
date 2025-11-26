<?php

namespace WebbyTroops\AdvancedOrderNumber\Generators;

use Webkul\Sales\Models\Order;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use Webkul\Sales\Generators\Sequencer;
use Illuminate\Support\Facades\Log;
use WebbyTroops\AdvancedOrderNumber\Helpers\SequenceNumberHelper;

class InvoiceNumberGenerator extends NumberGenerator
{
    
    public string $entity_type;
    public string $prefix;
    public mixed $length;
    public string $suffix;
    public mixed $start_counter;
    public int $last_id;
    
    /**
     * Create order sequencer instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->current_channel_code = SequenceNumberHelper::getCurrentChannelCode();
        
        $this->prefix = core()->getConfigData('sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_prefix', $this->current_channel_code);

        $this->length = core()->getConfigData('sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_length', $this->current_channel_code);

        $this->suffix = core()->getConfigData('sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_suffix', $this->current_channel_code);
        
        $this->start_counter = core()->getConfigData('sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_start_counter', $this->current_channel_code);
        
        $this->counter_step = core()->getConfigData('sales.advancedOrderNumberSetting.invoiceNumber.advance_invoice_number_counter_step', $this->current_channel_code);
        
        $this->entity_type = SequenceNumber::ENTITY_TYPE_INVOICE;
        
        $this->lastId = $this->getLastId();
        
        
    }

       
    
    
    
}
