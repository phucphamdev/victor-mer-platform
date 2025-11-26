'use client';

import type { LicensePackage } from '@/lib/types';

interface LicensePriceCalculatorProps {
  selectedPackages: LicensePackage[];
  onProceedToCheckout: () => void;
  onClearSelection: () => void;
}

export default function LicensePriceCalculator({
  selectedPackages,
  onProceedToCheckout,
  onClearSelection,
}: LicensePriceCalculatorProps) {
  const totalPrice = selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);

  if (selectedPackages.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Selected Packages Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  {selectedPackages.length} {selectedPackages.length === 1 ? 'package' : 'packages'} selected
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedPackages.map((pkg) => (
                    <span
                      key={pkg.id}
                      className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                    >
                      {pkg.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-2xl font-bold text-gray-900">${totalPrice.toLocaleString()}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClearSelection}
                className="px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={onProceedToCheckout}
                className="px-6 py-2 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Proceed to Purchase
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown (optional, shown on larger screens) */}
        <div className="hidden lg:block mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Package Breakdown:</h4>
              <ul className="space-y-1">
                {selectedPackages.map((pkg) => (
                  <li key={pkg.id} className="flex justify-between text-gray-600">
                    <span>{pkg.name}</span>
                    <span className="font-medium">${pkg.price.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">What's Included:</h4>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Source code for selected features
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Complete documentation
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime updates for purchased modules
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No recurring fees
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
