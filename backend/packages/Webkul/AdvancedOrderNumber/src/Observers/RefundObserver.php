<?php

namespace WebbyTroops\AdvancedOrderNumber\Observers;

use Webkul\Sales\Models\Refund;
use WebbyTroops\AdvancedOrderNumber\Generators\RefundSequencer;
use WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use WebbyTroops\AdvancedOrderNumber\Traits\Common;

class RefundObserver
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
     * Handle the Refund "creating" event.
     *
     * @param  \Webkul\Sales\Models\Refund  $shipment
     * @return void
     */
    public function creating(Refund $refund)
    {
        $refund->increment_id = $this->generateIncrementId();
    }
    
    /**
     * Generate increment id.
     *
     * @return mixed
     */
    public function generateIncrementId()
    {
        return app(RefundSequencer::class)->resolveGeneratorClass();
    }
    
    /**
     * Handle the Refund "created" event.
     *
     * @param  \Webkul\Sales\Models\Refund $refund
     * @return void
     */
    public function created(Refund $refund)
    {
        $entityType = SequenceNumber::ENTITY_TYPE_REFUND;
        $sequenceNumber = session()->get('sequence_number_'.$entityType);
        if($this->isModuleEnabled() && !empty($sequenceNumber)) {
            $payload = [
                'increment_id' => $refund->increment_id,
                'channel_id' => $refund->order->channel_id,
                'entity_type' =>  $entityType,
                'entity_id' => $refund->id,
                'sequence_number' => $sequenceNumber,
            ];
            $this->sequenceRepository->create($payload);
            session()->forget('sequence_number_'.$entityType);
        }
    }
    
}
