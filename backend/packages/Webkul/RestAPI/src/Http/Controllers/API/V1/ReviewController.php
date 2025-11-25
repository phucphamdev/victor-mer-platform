<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Product\Repositories\ProductReviewRepository;

class ReviewController extends BaseController
{
    public function __construct(
        protected ProductReviewRepository $reviewRepository
    ) {}

    public function index(Request $request)
    {
        $reviews = $this->reviewRepository
            ->where('customer_id', $request->user()->id)
            ->with('product')
            ->paginate(15);
        
        return $this->paginated($reviews, 'Reviews retrieved successfully');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'title' => 'required|string|max:255',
            'comment' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $data['customer_id'] = $request->user()->id;
        $data['name'] = $request->user()->name;
        $data['status'] = 'pending';

        $review = $this->reviewRepository->create($data);
        
        return $this->success($review, 'Review submitted successfully', 201);
    }

    public function update(Request $request, $id)
    {
        $review = $this->reviewRepository->findOrFail($id);
        
        if ($review->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'comment' => 'sometimes|string',
            'rating' => 'sometimes|integer|min:1|max:5',
        ]);

        $review = $this->reviewRepository->update($data, $id);
        
        return $this->success($review, 'Review updated successfully');
    }

    public function destroy($id)
    {
        $review = $this->reviewRepository->findOrFail($id);
        
        if ($review->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        $this->reviewRepository->delete($id);
        
        return $this->success(null, 'Review deleted successfully');
    }
}
