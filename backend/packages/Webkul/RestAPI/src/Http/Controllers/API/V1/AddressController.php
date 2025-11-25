<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Customer\Repositories\CustomerAddressRepository;

class AddressController extends BaseController
{
    public function __construct(
        protected CustomerAddressRepository $addressRepository
    ) {}

    public function index(Request $request)
    {
        $addresses = $this->addressRepository
            ->where('customer_id', $request->user()->id)
            ->get();
        
        return $this->success($addresses, 'Addresses retrieved successfully');
    }

    public function show($id)
    {
        $address = $this->addressRepository->findOrFail($id);
        
        if ($address->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }
        
        return $this->success($address, 'Address retrieved successfully');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'nullable|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address1' => 'required|string',
            'address2' => 'nullable|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'postcode' => 'required|string',
            'phone' => 'required|string',
            'default_address' => 'boolean',
        ]);

        $data['customer_id'] = $request->user()->id;

        $address = $this->addressRepository->create($data);
        
        return $this->success($address, 'Address created successfully', 201);
    }

    public function update(Request $request, $id)
    {
        $address = $this->addressRepository->findOrFail($id);
        
        if ($address->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        $data = $request->validate([
            'company_name' => 'nullable|string',
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'address1' => 'sometimes|string',
            'address2' => 'nullable|string',
            'city' => 'sometimes|string',
            'state' => 'sometimes|string',
            'country' => 'sometimes|string',
            'postcode' => 'sometimes|string',
            'phone' => 'sometimes|string',
        ]);

        $address = $this->addressRepository->update($data, $id);
        
        return $this->success($address, 'Address updated successfully');
    }

    public function destroy($id)
    {
        $address = $this->addressRepository->findOrFail($id);
        
        if ($address->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        $this->addressRepository->delete($id);
        
        return $this->success(null, 'Address deleted successfully');
    }

    public function setDefault($id)
    {
        $address = $this->addressRepository->findOrFail($id);
        
        if ($address->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        // Reset all addresses
        $this->addressRepository
            ->where('customer_id', auth()->user()->id)
            ->update(['default_address' => 0]);

        // Set this as default
        $address = $this->addressRepository->update(['default_address' => 1], $id);
        
        return $this->success($address, 'Default address set successfully');
    }
}
