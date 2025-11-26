<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;

class DashboardController extends BaseController
{
    public function index(Request $request)
    {
        $customer = $request->user();
        
        $dashboard = [
            'orders_count' => $customer->orders()->count(),
            'wishlist_count' => $customer->wishlist()->count(),
            'addresses_count' => $customer->addresses()->count(),
            'recent_orders' => $customer->orders()->latest()->limit(5)->get(),
        ];
        
        return $this->success($dashboard, 'Dashboard data retrieved successfully');
    }

    public function stats(Request $request)
    {
        $customer = $request->user();
        
        $stats = [
            'total_orders' => $customer->orders()->count(),
            'total_spent' => $customer->orders()->sum('grand_total'),
            'pending_orders' => $customer->orders()->where('status', 'pending')->count(),
            'completed_orders' => $customer->orders()->where('status', 'completed')->count(),
        ];
        
        return $this->success($stats, 'Statistics retrieved successfully');
    }

    public function overview()
    {
        // Admin only
        return $this->success(null, 'Overview retrieved successfully');
    }

    public function sales()
    {
        // Admin only
        return $this->success(null, 'Sales data retrieved successfully');
    }

    public function customers()
    {
        // Admin only
        return $this->success(null, 'Customer data retrieved successfully');
    }

    public function products()
    {
        // Admin only
        return $this->success(null, 'Product data retrieved successfully');
    }
}
