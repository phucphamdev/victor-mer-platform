import { config } from './config';
import type { Template, SubscriptionPlan, LicensePackage } from './types';

// Import JSON files
import pricingData from '@/config/pricing.json';
import templatesData from '@/config/templates.json';
import featuresData from '@/config/features.json';

/**
 * Load subscription plans from configuration file
 */
export function loadSubscriptionPlans(): SubscriptionPlan[] {
  return pricingData.subscriptionPlans as SubscriptionPlan[];
}

/**
 * Load license packages from configuration file
 */
export function loadLicensePackages(): LicensePackage[] {
  return pricingData.licensePackages as LicensePackage[];
}

/**
 * Load templates from configuration file
 * Merges demo URLs from environment variables
 */
export function loadTemplates(): Template[] {
  const templates = templatesData.templates as Template[];
  
  // Map demo URLs from environment variables to templates
  return templates.map((template, index) => {
    const demoStore = config.demoStores[index];
    return {
      ...template,
      demoUrl: demoStore?.url || template.demoUrl,
    };
  });
}

/**
 * Load platform features from configuration file
 */
export function loadPlatformFeatures() {
  return featuresData.platformFeatures;
}

/**
 * Load offerings from configuration file
 */
export function loadOfferings() {
  return featuresData.offerings;
}

/**
 * Get a specific subscription plan by ID
 */
export function getSubscriptionPlanById(id: string): SubscriptionPlan | undefined {
  const plans = loadSubscriptionPlans();
  return plans.find((plan) => plan.id === id);
}

/**
 * Get a specific license package by ID
 */
export function getLicensePackageById(id: string): LicensePackage | undefined {
  const packages = loadLicensePackages();
  return packages.find((pkg) => pkg.id === id);
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  const templates = loadTemplates();
  return templates.find((template) => template.id === id);
}

/**
 * Calculate total price for selected license packages
 */
export function calculateLicenseTotal(packageIds: string[]): number {
  const packages = loadLicensePackages();
  return packageIds.reduce((total, id) => {
    const pkg = packages.find((p) => p.id === id);
    return total + (pkg?.price || 0);
  }, 0);
}
