'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PricingTable from '@/components/PricingTable';
import FeatureComparison from '@/components/FeatureComparison';
import DomainMappingInfo from '@/components/DomainMappingInfo';
import { loadSubscriptionPlans } from '@/lib/config-loader';
import type { SubscriptionPlan } from '@/lib/types';

export default function RentalPricingPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    // Load subscription plans
    const loadedPlans = loadSubscriptionPlans();
    setPlans(loadedPlans);
  }, []);

  const handleSelectPlan = (planId: string) => {
    // Store selected plan in localStorage
    localStorage.setItem('selectedPlanId', planId);

    // Get previously selected template if any
    const selectedTemplateId = localStorage.getItem('selectedTemplateId');

    // Navigate to signup page with plan and template
    const params = new URLSearchParams();
    params.set('plan', planId);
    if (selectedTemplateId) {
      params.set('template', selectedTemplateId);
    }

    // For now, just show an alert (signup page will be implemented later)
    alert(`Plan selected: ${planId}\nTemplate: ${selectedTemplateId || 'None'}\n\nSignup page coming soon!`);
    // router.push(`/signup?${params.toString()}`);
  };

  const filteredPlans = plans.filter((plan) => plan.billingPeriod === billingPeriod);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Subscription Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start with a fully-managed e-commerce store. All plans include custom domain mapping,
              SSL certificates, and 24/7 support.
            </p>

            {/* Billing Period Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs text-primary-600 font-semibold">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPlans.length > 0 ? (
            <PricingTable plans={filteredPlans} onSelectPlan={handleSelectPlan} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No plans available for {billingPeriod} billing.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Toggle */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            {showComparison ? 'Hide' : 'Show'} Detailed Comparison
            <svg
              className={`w-5 h-5 transition-transform ${showComparison ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Feature Comparison Table */}
      {showComparison && filteredPlans.length > 0 && (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Compare All Features
            </h2>
            <FeatureComparison plans={filteredPlans} />
          </div>
        </section>
      )}

      {/* Domain Mapping Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DomainMappingInfo />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect immediately, and
                downgrades take effect at the start of your next billing cycle.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my resource limits?
              </h3>
              <p className="text-gray-600">
                We'll notify you when you're approaching your limits. You can upgrade to a higher
                plan or purchase additional resources as needed.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! All plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does custom domain mapping work?
              </h3>
              <p className="text-gray-600">
                After signing up, you'll receive DNS configuration instructions. Simply point your
                domain to our servers, and we'll handle the rest including SSL certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Our team is here to help you choose the right plan for your business.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </section>
    </div>
  );
}
