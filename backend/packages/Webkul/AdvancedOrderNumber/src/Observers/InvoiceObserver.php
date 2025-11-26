<?php

namespace WebbyTroops\AdvancedOrderNumber\Observers;

use Webkul\Sales\Models\Invoice;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository;
use WebbyTroops\AdvancedOrderNumber\Traits\Common;

class InvoiceObserver
{
    use Common;
    /**
     * Create a new controller instance.
     *
     * @param  \WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository  $sequenceRepository
     * @return void
     */
    public function __construct(protected SequenceNumberRepository $sequenceRepository)
    {
       
    }

    
    /**
     * Handle the Invoice "created" event.
     *
     * @param  \Webkul\Sales\Models\Invoice $invoice
     * @return void
     */
    public function created(Invoice $invoice)
    {
        $entityType = SequenceNumber::ENTITY_TYPE_INVOICE;
        $sequenceNumber = session()->get('sequence_number_'.$entityType);
        if($this->isModuleEnabled() && !empty($sequenceNumber)) {
            $payload = [
                'increment_id' => $invoice->increment_id,
                'channel_id' => $invoice->order->channel_id,
                'entity_type' =>  $entityType,
                'entity_id' => $invoice->id,
                'sequence_number' => $sequenceNumber,
            ];
            $this->sequenceRepository->create($payload);
            session()->forget('sequence_number_'.$entityType);
        }
    }
}
