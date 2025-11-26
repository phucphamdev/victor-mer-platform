'use client';

import type { SubscriptionPlan } from '@/lib/types';

interface FeatureComparisonProps {
  plans: SubscriptionPlan[];
}

export default function FeatureComparison({ plans }: FeatureComparisonProps) {
  // Extract all unique features from all plans
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features))
  );

  const formatLimit = (limit: number | string): string => {
    if (typeof limit === 'string') return limit;
    if (limit === -1) return 'Unlimited';
    return limit.toLocaleString();
  };

  const hasFeature = (plan: SubscriptionPlan, feature: string): boolean => {
    return plan.features.includes(feature);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Features
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                className={`px-6 py-4 text-center text-sm font-semibold ${
                  plan.recommended ? 'text-primary-600' : 'text-gray-900'
                }`}
              >
                <div>{plan.name}</div>
                <div className="text-2xl font-bold mt-2">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-600">/{plan.billingPeriod}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Resource Limits Section */}
          <tr className="bg-gray-50">
            <td colSpan={plans.length + 1} className="px-6 py-3 text-sm font-semibold text-gray-700">
              Resource Limits
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-600">Products</td>
            {plans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-900">
                {formatLimit(plan.limits.products)}
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-600">Orders per month</td>
            {plans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-900">
                {formatLimit(plan.limits.orders)}
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-600">Storage</td>
            {plans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-900">
                {plan.limits.storage}
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-600">Bandwidth</td>
            {plans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-900">
                {plan.limits.bandwidth}
              </td>
            ))}
          </tr>

          {/* Features Section */}
          <tr className="bg-gray-50">
            <td colSpan={plans.length + 1} className="px-6 py-3 text-sm font-semibold text-gray-700">
              Features
            </td>
          </tr>
          {allFeatures.map((feature, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-600">{feature}</td>
              {plans.map((plan) => (
                <td key={plan.id} className="px-6 py-4 text-center">
                  {hasFeature(plan, feature) ? (
                    <svg
                      className="w-5 h-5 text-primary-600 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-300 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
