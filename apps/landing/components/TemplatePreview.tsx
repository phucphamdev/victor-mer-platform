'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Template } from '@/lib/types';

interface TemplatePreviewProps {
  template: Template;
  onSelect: (templateId: string) => void;
  isSelected: boolean;
}

export default function TemplatePreview({ template, onSelect, isSelected }: TemplatePreviewProps) {
  const [imageError, setImageError] = useState(false);

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ensure demo opens in new tab
    if (!template.demoUrl) {
      e.preventDefault();
      alert('Demo URL not configured for this template');
    }
  };

  const handleSelectClick = () => {
    onSelect(template.id);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl ${
        isSelected ? 'ring-2 ring-primary-600' : ''
      }`}
    >
      {/* Template Screenshot */}
      <div className="relative h-64 bg-gray-200">
        {!imageError ? (
          <Image
            src={template.screenshot}
            alt={`${template.name} template preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm capitalize">
            {template.category}
          </span>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
        <p className="text-gray-600 mb-4">{template.description}</p>

        {/* Features List */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
          <ul className="space-y-1">
            {template.features.slice(0, 4).map((feature, index) => (
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
            {template.features.length > 4 && (
              <li className="text-sm text-gray-500 italic">
                +{template.features.length - 4} more features
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDemoClick}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
          >
            View Demo
          </a>
          <button
            onClick={handleSelectClick}
            className={`flex-1 px-4 py-2 rounded-lg text-center font-medium transition-colors ${
              isSelected
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
}
