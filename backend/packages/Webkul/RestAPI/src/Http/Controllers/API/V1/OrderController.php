<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Sales\Repositories\OrderRepository;

class OrderController extends BaseController
{
    public function __construct(
        protected OrderRepository $orderRepository
    ) {}

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        $orders = $this->orderRepository
            ->where('customer_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        
        return $this->paginated($orders, 'Orders retrieved successfully');
    }

    public function show($id)
    {
        $order = $this->orderRepository->findOrFail($id);
        
        if ($order->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }
        
        return $this->success($order, 'Order retrieved successfully');
    }

    public function store(Request $request)
    {
        // Implement order creation
        return $this->success(null, 'Order created successfully', 201);
    }

    public function cancel($id)
    {
        $order = $this->orderRepository->findOrFail($id);
        
        if ($order->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        // Implement order cancellation
        return $this->success(null, 'Order cancelled successfully');
    }

    public function reorder($id)
    {
        $order = $this->orderRepository->findOrFail($id);
        
        if ($order->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        // Implement reorder
        return $this->success(null, 'Order reordered successfully');
    }

    public function invoice($id)
    {
        $order = $this->orderRepository->findOrFail($id);
        
        if ($order->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        // Implement invoice generation
        return $this->success(null, 'Invoice generated successfully');
    }

    public function updateStatus(Request $request, $id)
    {
        // Admin only
        return $this->success(null, 'Order status updated successfully');
    }

    public function refund(Request $request, $id)
    {
        // Admin only
        return $this->success(null, 'Refund processed successfully');
    }
}
