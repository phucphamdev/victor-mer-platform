<?php

namespace WebbyTroops\AdvancedOrderNumber\Generators;

use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use Webkul\Sales\Generators\Sequencer;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Webkul\Sales\Models\Order;
use Webkul\Core\Models\Channel;

class NumberGenerator implements \Webkul\Sales\Contracts\Sequencer
{
    public const ENTITY_ROUTES = [
        'admin.sales.invoices.store',
        'admin.sales.shipments.store',
        'admin.sales.refunds.store'
    ];
    
    /**
     * Get last id.
     *
     * @return int
     */
    public function generate(): string
    {
        $prefix = $this->getFormattedNumber(
            $this->prefix
        );
        
        $suffix = $this->getFormattedNumber(
            $this->suffix
        );
        $number = $this->fetchNumber($prefix, $suffix);
         
        session()->put('sequence_number_'.$this->entity_type, $this->lastId);
        return $number;
    }
    
    public function fetchNumber($prefix, $suffix)
    {
        $number = ($prefix) . sprintf(
                "%0{$this->length}d",
                ($this->lastId)
            ) . ($suffix);
          
        if($this->checkIfNumberIsUnique($number)){
            $this->lastId += $this->counter_step;
            return $this->fetchNumber($prefix, $suffix);
        }  
       
        return $number;
    }
    
    /**
     * Get last id.
     *
     * @return int
     */
    public function getLastId()
    {
        $channelId = Channel::query()->where('code', $this->current_channel_code)->first(['id'])->id;
        $lastNumber = SequenceNumber::query()
                ->where('entity_type', $this->entity_type)
                ->where('channel_id', $channelId)
                ->orderBy('id', 'desc')->limit(1)->first();
        if($lastNumber){
            if($lastNumber->sequence_number){
                return $lastNumber->sequence_number + $this->counter_step;
            } 
        } 
        if(empty($this->start_counter)){
            return $this->getEntityLastId() + 1;
        }
        return $this->start_counter ?? 0;
        
    }
    
    /**
     * Get Entity Last id.
     *
     * @return int
     */
    public function getEntityLastId()
    {
        $entity = "\\Webkul\\Sales\Models\\". ucfirst($this->entity_type);
        $lastOrder = $entity::query()->orderBy('id', 'desc')->limit(1)->first();

        return $lastOrder ? $lastOrder->id : 0;
    }
    
    
    private function checkIfNumberIsUnique($number)
    {
        $entity = "\\Webkul\\Sales\Models\\". ucfirst($this->entity_type);
        return $entity::query()->where('increment_id', $number)->count();
    }
    
    /**
     * Format the number by replacing it with proper values.
     *
     * @param string $number
     * @return string
     */
    private function getFormattedNumber($number)
    {
        if (empty($number)) {
            return $number;
        }
    
        preg_match_all('#\{(.*?)\}#', $number, $match);
        if (!isset($match[1])) {
            return $number;
        }
        
        $matchArray = $match[1];
        $date = new \DateTime();
        foreach ($matchArray as $value) {
            switch ($value) {
                case 'yy':
                    $number = str_replace('{' . $value . '}', $date->format('y'), $number);
                    break;

                case 'YY':
                    $number = str_replace('{' . $value . '}', $date->format('Y'), $number);
                    break;

                case 'mm':
                    $number = str_replace('{' . $value . '}', $date->format('m'), $number);
                    break;

                case 'dd':
                    $number = str_replace('{' . $value . '}', $date->format('d'), $number);
                    break;
                
                case 'hh':
                    $number = str_replace('{' . $value . '}', $date->format('h'), $number);
                    break;
                
                case 'ii':
                    $number = str_replace('{' . $value . '}', $date->format('i'), $number);
                    break;
                
                case 'ss':
                    $number = str_replace('{' . $value . '}', $date->format('s'), $number);
                    break;
                
                case 'country':
                    $countryCode = core()->getConfigData('sales.shipping.origin.country', $this->current_channel_code);
                    $number = str_replace('{' . $value . '}', $countryCode, $number);
                    break;    

                default:
            }
        }
        
        return $number;
    }
}
