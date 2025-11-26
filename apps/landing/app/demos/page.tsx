'use client';

import { useState, useEffect } from 'react';
import DemoShowcase from '@/components/DemoShowcase';
import { config } from '@/lib/config';

interface DemoStore {
  name: string;
  url: string;
  description: string;
  screenshot: string;
  features: string[];
  template: string;
}

export default function DemosPage() {
  const [demos, setDemos] = useState<DemoStore[]>([]);

  useEffect(() => {
    // Build demo stores from config with additional metadata
    const demoStores: DemoStore[] = [
      {
        name: config.demoStores[0]?.name || 'Fashion Store',
        url: config.demoStores[0]?.url || '',
        description:
          'Elegant fashion boutique showcasing clothing, accessories, and lifestyle products with a modern, clean design.',
        screenshot: '/images/demos/fashion-store-demo.jpg',
        features: [
          'Product Quick View',
          'Wishlist',
          'Size & Color Variants',
          'Instagram Feed',
          'Newsletter',
          'Multi-currency',
        ],
        template: 'Fashion Boutique',
      },
      {
        name: config.demoStores[1]?.name || 'Electronics Store',
        url: config.demoStores[1]?.url || '',
        description:
          'Professional electronics store featuring gadgets, computers, and tech products with advanced filtering and comparison.',
        screenshot: '/images/demos/electronics-store-demo.jpg',
        features: [
          'Product Comparison',
          'Advanced Filters',
          'Customer Reviews',
          'Technical Specs',
          'Live Chat',
          'Related Products',
        ],
        template: 'Electronics Store',
      },
    ];

    setDemos(demoStores);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Live Demo Stores
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our platform in action. Browse through fully functional demo stores showcasing
              different templates and features.
            </p>
          </div>
        </div>
      </section>

      {/* Demos Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {demos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demos.map((demo, index) => (
                <DemoShowcase key={index} demo={demo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No demo stores available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Can Test in Our Demos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our demo stores are fully functional. Feel free to browse products, add items to cart,
              and explore all features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shopping Experience</h3>
              <p className="text-gray-600">
                Browse products, view details, add to cart, and test the complete checkout flow.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Search & Filters</h3>
              <p className="text-gray-600">
                Test advanced search functionality and product filtering by category, price, and attributes.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Responsive</h3>
              <p className="text-gray-600">
                Try the demos on your mobile device to see how they adapt to different screen sizes.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wishlist & Compare</h3>
              <p className="text-gray-600">
                Add products to your wishlist and compare multiple items side by side.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Accounts</h3>
              <p className="text-gray-600">
                Create an account, manage your profile, and view order history.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews & Ratings</h3>
              <p className="text-gray-600">
                Read customer reviews and see product ratings to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Own Store?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Choose a template and get started with your own e-commerce store today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/templates"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Browse Templates
            </a>
            <a
              href="/pricing/rental"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-800 transition-colors border-2 border-white"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
