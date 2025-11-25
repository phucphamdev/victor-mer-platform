'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DemoStore {
  name: string;
  url: string;
  description: string;
  screenshot: string;
  features: string[];
  template: string;
}

interface DemoShowcaseProps {
  demo: DemoStore;
}

export default function DemoShowcase({ demo }: DemoShowcaseProps) {
  const [imageError, setImageError] = useState(false);

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ensure demo opens in new tab
    if (!demo.url) {
      e.preventDefault();
      alert('Demo URL not configured');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
      {/* Demo Screenshot */}
      <div className="relative h-64 bg-gray-200">
        {!imageError ? (
          <Image
            src={demo.screenshot}
            alt={`${demo.name} demo preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Preview not available</p>
            </div>
          </div>
        )}

        {/* Template Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
            {demo.template}
          </span>
        </div>

        {/* Live Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            LIVE DEMO
          </span>
        </div>
      </div>

      {/* Demo Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{demo.name}</h3>
        <p className="text-gray-600 mb-4">{demo.description}</p>

        {/* Active Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Active Features:</h4>
          <div className="flex flex-wrap gap-2">
            {demo.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={demo.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDemoClick}
          className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Visit Live Demo
          <svg className="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
