<?php

namespace Webkul\VictorMer\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Webkul\VictorMer\Repositories\VictorMerRepository;
use Webkul\Core\Repositories\CoreConfigRepository;

class VictorMerController extends Controller
{
    public function __construct(
        protected VictorMerRepository $victorMerRepository,
        protected CoreConfigRepository $coreConfigRepository
    ) {}

    /**
     * Display main index page with cards
     */
    public function index(): View
    {
        if (
            request()->route('slug')
            && request()->route('slug2')
        ) {
            return view('victor_mer::edit');
        }

        return view('victor_mer::index');
    }

    /**
     * Store configuration
     */
    public function store(): RedirectResponse
    {
        $data = request()->all();

        foreach ($data as $group => $settings) {
            if (is_array($settings)) {
                foreach ($settings as $key => $value) {
                    $this->victorMerRepository->updateSettings([$key => $value], $group);
                }
            }
        }

        session()->flash('success', trans('victor_mer::app.update-success'));

        return redirect()->back();
    }

    /**
     * Get dashboard statistics (API)
     */
    public function statistics(): JsonResponse
    {
        $statistics = $this->victorMerRepository->getStatistics();

        return response()->json([
            'success' => true,
            'data' => $statistics,
        ]);
    }
}
