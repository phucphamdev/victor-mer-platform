<?php

namespace WebbyTroops\AdvancedOrderNumber\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Webkul\Core\Eloquent\Repository;

class SequenceNumberRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    function model(): string
    {
        return 'WebbyTroops\AdvancedOrderNumber\Contracts\SequenceNumber';
    }

    /**
     * @param  array  $data
     * @return \WebbyTroops\AdvancedOrderNumber\Contracts\SequenceNumber
     */
    public function create(array $data)
    {
        return parent::create($data);
    }
    
}