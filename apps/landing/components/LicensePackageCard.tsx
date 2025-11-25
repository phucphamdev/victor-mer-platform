'use client';

import type { LicensePackage } from '@/lib/types';

interface LicensePackageCardProps {
  package: LicensePackage;
  isSelected: boolean;
  onToggleSelect: (packageId: string) => void;
}

export default function LicensePackageCard({
  package: pkg,
  isSelected,
  onToggleSelect,
}: LicensePackageCardProps) {
  const getSupportBadgeColor = (support: string) => {
    switch (support) {
      case 'priority':
        return 'bg-purple-100 text-purple-700';
      case 'email':
        return 'bg-blue-100 text-blue-700';
      case 'community':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl ${
        isSelected ? 'ring-2 ring-primary-600' : ''
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
          </div>
          <div className="ml-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(pkg.id)}
              className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
              aria-label={`Select ${pkg.name}`}
            />
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
            <span className="text-gray-600 ml-2">one-time</span>
          </div>
        </div>

        {/* Support Badge */}
        <div className="mb-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${getSupportBadgeColor(
              pkg.support
            )}`}
          >
            {pkg.support} Support
          </span>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Features Included:</h4>
          <ul className="space-y-2">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Code Modules */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Code Modules:</h4>
          <div className="flex flex-wrap gap-2">
            {pkg.codeModules.map((module, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {module}
              </span>
            ))}
          </div>
        </div>

        {/* Documentation */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {pkg.documentation}
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={() => onToggleSelect(pkg.id)}
          className={`w-full mt-6 py-3 px-6 rounded-lg font-medium transition-colors ${
            isSelected
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Package'}
        </button>
      </div>
    </div>
  );
}
