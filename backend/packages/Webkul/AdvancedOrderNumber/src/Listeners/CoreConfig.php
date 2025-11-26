<?php

namespace WebbyTroops\AdvancedOrderNumber\Listeners;

use WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use WebbyTroops\AdvancedOrderNumber\Helpers\SequenceNumberHelper;
use Webkul\Core\Models\Channel;

class CoreConfig
{
    
    /**
     * Create a new controller instance.
     *
     * @param  \WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository  $sequenceRepository
     * @return void
     */
    public function __construct(
        protected SequenceNumberRepository $sequenceRepository,
        protected Request $request
)
    {
       
    }

    /**
     * Save sequence number after place order
     *
     * @return void
     */
    public function executeBefore()
    {
        $requestData = $this->request->all();
        if(isset($requestData['sales']['advancedOrderNumberSetting'])){
            $requestData = $this->flattenArray($requestData);
            
            foreach(SequenceNumberHelper::COUNTER_ENTITIES as $entity){
                if(isset($requestData['advance_'.$entity['entity'].'_number_start_counter'])){
                    $requestStartCounter = $requestData['advance_order_number_start_counter'];
                    $currentStartCounter = core()->getConfigData($entity['start_counter'], $requestData['channel']);
                    if($requestStartCounter != $currentStartCounter){
                        session()->put('updated_'.$entity['entity'].'_start_counter', $requestStartCounter);
                    }
                }
            }
          
        }
    }
    
    /**
     * Save sequence number after place order
     *
     * @return void
     */
    public function executeAfter()
    {
        $requestData = $this->request->all();
        foreach(SequenceNumberHelper::COUNTER_ENTITIES as $entity){
            $updatedStartCounter = session()->get('updated_'.$entity['entity'].'_start_counter');
            if($updatedStartCounter){
                $this->updateSequenceNumber($updatedStartCounter, $entity['entity'], $requestData['channel']);
            }
        }
    }
    
    private function flattenArray($array)
    {
        $result = array();
        foreach ($array as $key => $value)
        {
            if (is_array($value)) {
                $result = array_merge($result, $this->flattenArray($value));
            } else {
                $result[$key] = $value;
            }
        }
        return $result;
    }
    
    private function updateSequenceNumber($startCounter, $entityType, $channel)
    {
        //echo $entityType; exit;
        $channelId = Channel::query()->where('code', $channel)->first(['id'])->id;
        $lastNumber = SequenceNumber::query()
                ->where('entity_type', $entityType)
                ->where('channel_id', $channelId)
                ->orderBy('id', 'desc')->limit(1)->first();
       // echo "<pre>";print_r($lastNumber->toArray());exit;
        if($lastNumber){
            $lastNumber->sequence_number = NULL; 
            $lastNumber->save();
        }
        
    }
}