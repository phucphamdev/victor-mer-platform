'use client';

import type { SubscriptionPlan } from '@/lib/types';

interface PricingTableProps {
  plans: SubscriptionPlan[];
  onSelectPlan: (planId: string) => void;
}

export default function PricingTable({ plans, onSelectPlan }: PricingTableProps) {
  const formatLimit = (limit: number | string): string => {
    if (typeof limit === 'string') return limit;
    if (limit === -1) return 'Unlimited';
    return limit.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl ${
            plan.recommended ? 'ring-2 ring-primary-600 relative' : ''
          }`}
        >
          {/* Recommended Badge */}
          {plan.recommended && (
            <div className="bg-primary-600 text-white text-center py-2 px-4 text-sm font-semibold">
              RECOMMENDED
            </div>
          )}

          {/* Plan Header */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-600 ml-2">/{plan.billingPeriod}</span>
            </div>

            {/* Resource Limits */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Resource Limits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Products:</span>
                  <span className="font-medium text-gray-900">{formatLimit(plan.limits.products)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orders/month:</span>
                  <span className="font-medium text-gray-900">{formatLimit(plan.limits.orders)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storage:</span>
                  <span className="font-medium text-gray-900">{plan.limits.storage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bandwidth:</span>
                  <span className="font-medium text-gray-900">{plan.limits.bandwidth}</span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Features</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0"
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

            {/* CTA Button */}
            <button
              onClick={() => onSelectPlan(plan.id)}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                plan.recommended
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Choose {plan.name}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
