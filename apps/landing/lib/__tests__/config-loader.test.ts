import {
  loadSubscriptionPlans,
  loadLicensePackages,
  loadTemplates,
  calculateLicenseTotal,
  getSubscriptionPlanById,
  getLicensePackageById,
  getTemplateById,
} from '../config-loader';

describe('Config Loader', () => {
  describe('loadSubscriptionPlans', () => {
    it('should load subscription plans from config', () => {
      const plans = loadSubscriptionPlans();
      expect(plans).toBeDefined();
      expect(Array.isArray(plans)).toBe(true);
      expect(plans.length).toBeGreaterThan(0);
    });

    it('should have required fields in each plan', () => {
      const plans = loadSubscriptionPlans();
      plans.forEach((plan) => {
        expect(plan.id).toBeDefined();
        expect(plan.name).toBeDefined();
        expect(plan.price).toBeDefined();
        expect(plan.billingPeriod).toBeDefined();
        expect(plan.features).toBeDefined();
        expect(plan.limits).toBeDefined();
      });
    });
  });

  describe('loadLicensePackages', () => {
    it('should load license packages from config', () => {
      const packages = loadLicensePackages();
      expect(packages).toBeDefined();
      expect(Array.isArray(packages)).toBe(true);
      expect(packages.length).toBeGreaterThan(0);
    });

    it('should have required fields in each package', () => {
      const packages = loadLicensePackages();
      packages.forEach((pkg) => {
        expect(pkg.id).toBeDefined();
        expect(pkg.name).toBeDefined();
        expect(pkg.price).toBeDefined();
        expect(pkg.features).toBeDefined();
        expect(pkg.codeModules).toBeDefined();
      });
    });
  });

  describe('loadTemplates', () => {
    it('should load templates from config', () => {
      const templates = loadTemplates();
      expect(templates).toBeDefined();
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should have required fields in each template', () => {
      const templates = loadTemplates();
      templates.forEach((template) => {
        expect(template.id).toBeDefined();
        expect(template.name).toBeDefined();
        expect(template.description).toBeDefined();
        expect(template.features).toBeDefined();
      });
    });
  });

  describe('calculateLicenseTotal', () => {
    it('should calculate correct total for selected packages', () => {
      const packages = loadLicensePackages();
      const packageIds = packages.slice(0, 2).map((p) => p.id);
      const expectedTotal = packages.slice(0, 2).reduce((sum, p) => sum + p.price, 0);
      
      const total = calculateLicenseTotal(packageIds);
      expect(total).toBe(expectedTotal);
    });

    it('should return 0 for empty package list', () => {
      const total = calculateLicenseTotal([]);
      expect(total).toBe(0);
    });

    it('should ignore invalid package IDs', () => {
      const total = calculateLicenseTotal(['invalid-id']);
      expect(total).toBe(0);
    });
  });

  describe('getSubscriptionPlanById', () => {
    it('should return plan when ID exists', () => {
      const plans = loadSubscriptionPlans();
      const firstPlan = plans[0];
      const result = getSubscriptionPlanById(firstPlan.id);
      expect(result).toEqual(firstPlan);
    });

    it('should return undefined when ID does not exist', () => {
      const result = getSubscriptionPlanById('non-existent-id');
      expect(result).toBeUndefined();
    });
  });

  describe('getLicensePackageById', () => {
    it('should return package when ID exists', () => {
      const packages = loadLicensePackages();
      const firstPackage = packages[0];
      const result = getLicensePackageById(firstPackage.id);
      expect(result).toEqual(firstPackage);
    });

    it('should return undefined when ID does not exist', () => {
      const result = getLicensePackageById('non-existent-id');
      expect(result).toBeUndefined();
    });
  });

  describe('getTemplateById', () => {
    it('should return template when ID exists', () => {
      const templates = loadTemplates();
      const firstTemplate = templates[0];
      const result = getTemplateById(firstTemplate.id);
      expect(result?.id).toBe(firstTemplate.id);
    });

    it('should return undefined when ID does not exist', () => {
      const result = getTemplateById('non-existent-id');
      expect(result).toBeUndefined();
    });
  });
});
