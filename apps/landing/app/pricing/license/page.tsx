'use client';

import { useState, useEffect } from 'react';
import LicensePackageCard from '@/components/LicensePackageCard';
import LicensePriceCalculator from '@/components/LicensePriceCalculator';
import { loadLicensePackages, calculateLicenseTotal } from '@/lib/config-loader';
import type { LicensePackage } from '@/lib/types';

export default function LicensePricingPage() {
  const [packages, setPackages] = useState<LicensePackage[]>([]);
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);

  useEffect(() => {
    // Load license packages
    const loadedPackages = loadLicensePackages();
    setPackages(loadedPackages);

    // Load previously selected packages from localStorage
    const savedSelection = localStorage.getItem('selectedLicensePackages');
    if (savedSelection) {
      try {
        const parsed = JSON.parse(savedSelection);
        setSelectedPackageIds(parsed);
      } catch (e) {
        console.error('Failed to parse saved license selection', e);
      }
    }
  }, []);

  const handleToggleSelect = (packageId: string) => {
    setSelectedPackageIds((prev) => {
      const newSelection = prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId];

      // Persist to localStorage
      localStorage.setItem('selectedLicensePackages', JSON.stringify(newSelection));

      return newSelection;
    });
  };

  const handleClearSelection = () => {
    setSelectedPackageIds([]);
    localStorage.removeItem('selectedLicensePackages');
  };

  const handleProceedToCheckout = () => {
    const total = calculateLicenseTotal(selectedPackageIds);
    const selectedPackages = packages.filter((pkg) => selectedPackageIds.includes(pkg.id));

    // For now, just show an alert (checkout page will be implemented later)
    alert(
      `Proceeding to purchase:\n\n${selectedPackages.map((pkg) => `- ${pkg.name} ($${pkg.price})`).join('\n')}\n\nTotal: $${total}\n\nCheckout page coming soon!`
    );
    // router.push('/checkout/license');
  };

  const selectedPackages = packages.filter((pkg) => selectedPackageIds.includes(pkg.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Purchase Feature Licenses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Buy only the features you need. Get the source code, documentation, and lifetime updates
              for your selected modules.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <strong>Note:</strong> You receive source code for selected features only, not the entire codebase.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <LicensePackageCard
                  key={pkg.id}
                  package={pkg}
                  isSelected={selectedPackageIds.includes(pkg.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No license packages available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Purchase Licenses?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Source Code</h3>
              <p className="text-gray-600">Get complete access to the source code for your selected features.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">One-Time Payment</h3>
              <p className="text-gray-600">No recurring fees. Pay once and own the code forever.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifetime Updates</h3>
              <p className="text-gray-600">Receive updates and improvements for your purchased modules.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Commercial License</h3>
              <p className="text-gray-600">Use in unlimited commercial projects without restrictions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do I get the entire codebase?
              </h3>
              <p className="text-gray-600">
                No, you receive source code only for the features you purchase. This allows you to pay
                only for what you need while keeping your codebase lean.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I purchase multiple packages?
              </h3>
              <p className="text-gray-600">
                Yes! Select as many packages as you need. The total price is calculated automatically.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What kind of support is included?
              </h3>
              <p className="text-gray-600">
                Support level varies by package. Community support includes forum access, email support
                includes direct email assistance, and priority support includes dedicated help with faster
                response times.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I customize the code?
              </h3>
              <p className="text-gray-600">
                Absolutely! Once you purchase a license, you have full rights to modify and customize
                the code for your projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator (Sticky Bottom Bar) */}
      <LicensePriceCalculator
        selectedPackages={selectedPackages}
        onProceedToCheckout={handleProceedToCheckout}
        onClearSelection={handleClearSelection}
      />

      {/* Add padding at bottom to prevent content from being hidden by sticky calculator */}
      {selectedPackages.length > 0 && <div className="h-32 lg:h-48" />}
    </div>
  );
}
