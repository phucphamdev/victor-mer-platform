<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Core\Repositories\{
    CurrencyRepository,
    LocaleRepository,
    CountryRepository
};

class SettingController extends BaseController
{
    public function __construct(
        protected CurrencyRepository $currencyRepository,
        protected LocaleRepository $localeRepository,
        protected CountryRepository $countryRepository
    ) {}

    public function index()
    {
        $settings = [
            'currencies' => $this->currencyRepository->all(),
            'locales' => $this->localeRepository->all(),
            'channel' => core()->getCurrentChannel(),
        ];
        
        return $this->success($settings, 'Settings retrieved successfully');
    }

    public function currencies()
    {
        $currencies = $this->currencyRepository->all();
        
        return $this->success($currencies, 'Currencies retrieved successfully');
    }

    public function locales()
    {
        $locales = $this->localeRepository->all();
        
        return $this->success($locales, 'Locales retrieved successfully');
    }

    public function countries()
    {
        $countries = $this->countryRepository->all();
        
        return $this->success($countries, 'Countries retrieved successfully');
    }

    public function adminIndex()
    {
        // Admin only
        return $this->success(null, 'Admin settings retrieved successfully');
    }

    public function update(Request $request)
    {
        // Admin only
        return $this->success(null, 'Settings updated successfully');
    }
}
