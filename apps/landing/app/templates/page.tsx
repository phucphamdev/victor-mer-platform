'use client';

import { useState, useEffect } from 'react';
import TemplatePreview from '@/components/TemplatePreview';
import { loadTemplates } from '@/lib/config-loader';
import type { Template } from '@/lib/types';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    // Load templates on mount
    const loadedTemplates = loadTemplates();
    setTemplates(loadedTemplates);

    // Load previously selected template from localStorage
    const savedTemplateId = localStorage.getItem('selectedTemplateId');
    if (savedTemplateId) {
      setSelectedTemplateId(savedTemplateId);
    }
  }, []);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    // Persist selection to localStorage for signup flow
    localStorage.setItem('selectedTemplateId', templateId);
  };

  const filteredTemplates =
    filterCategory === 'all'
      ? templates
      : templates.filter((template) => template.category === filterCategory);

  const categories = ['all', 'fashion', 'electronics', 'food', 'general'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Store Template
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our professionally designed templates. Each template is fully customizable
              and optimized for conversions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium capitalize transition-colors ${
                  filterCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No templates found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <TemplatePreview
                  key={template.id}
                  template={template}
                  onSelect={handleSelectTemplate}
                  isSelected={selectedTemplateId === template.id}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {selectedTemplateId && (
        <section className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Template selected</p>
                <p className="font-semibold text-gray-900">
                  {templates.find((t) => t.id === selectedTemplateId)?.name}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedTemplateId(null);
                    localStorage.removeItem('selectedTemplateId');
                  }}
                  className="px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Clear
                </button>
                <a
                  href="/pricing/rental"
                  className="px-6 py-2 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Continue to Pricing
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
