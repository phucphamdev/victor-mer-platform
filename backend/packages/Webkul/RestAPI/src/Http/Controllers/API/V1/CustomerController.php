<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Customer\Repositories\CustomerRepository;

class CustomerController extends BaseController
{
    public function __construct(
        protected CustomerRepository $customerRepository
    ) {}

    public function profile(Request $request)
    {
        return $this->success($request->user(), 'Profile retrieved successfully');
    }

    public function updateProfile(Request $request)
    {
        $customer = $this->customerRepository->update(
            $request->only(['first_name', 'last_name', 'phone', 'date_of_birth', 'gender']),
            $request->user()->id
        );
        
        return $this->success($customer, 'Profile updated successfully');
    }

    public function orders(Request $request)
    {
        $orders = $request->user()->orders()->orderBy('created_at', 'desc')->paginate(15);
        
        return $this->paginated($orders, 'Orders retrieved successfully');
    }

    public function addresses(Request $request)
    {
        $addresses = $request->user()->addresses;
        
        return $this->success($addresses, 'Addresses retrieved successfully');
    }

    public function index(Request $request)
    {
        // Admin only
        $perPage = $request->get('per_page', 15);
        $customers = $this->customerRepository->paginate($perPage);
        
        return $this->paginated($customers, 'Customers retrieved successfully');
    }

    public function suspend($id)
    {
        // Admin only
        return $this->success(null, 'Customer suspended successfully');
    }

    public function activate($id)
    {
        // Admin only
        return $this->success(null, 'Customer activated successfully');
    }
}
