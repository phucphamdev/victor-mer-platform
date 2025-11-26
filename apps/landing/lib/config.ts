// Configuration loader with validation

interface DemoStore {
  name: string;
  url: string;
}

interface AppConfig {
  apiBaseUrl: string;
  docsUrl: string;
  demoStores: DemoStore[];
  backendUrl: string;
}

export const config: AppConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL || '',
  demoStores: [
    {
      name: 'Fashion Store',
      url: process.env.NEXT_PUBLIC_DEMO_STORE_1_URL || '',
    },
    {
      name: 'Electronics Store',
      url: process.env.NEXT_PUBLIC_DEMO_STORE_2_URL || '',
    },
  ],
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
};

/**
 * Validates that all required environment variables are present
 * Throws an error with clear message if any are missing
 */
export function validateConfig(): void {
  const requiredVars = [
    'NEXT_PUBLIC_API_BASE_URL',
    'NEXT_PUBLIC_DOCS_URL',
    'NEXT_PUBLIC_BACKEND_URL',
    'NEXT_PUBLIC_DEMO_STORE_1_URL',
    'NEXT_PUBLIC_DEMO_STORE_2_URL',
  ];

  const missing: string[] = [];

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n\n` +
        `Please ensure these variables are set in your .env.local file.\n` +
        `See .env.example for reference.`
    );
  }
}

/**
 * Gets a configuration value by key
 * Useful for accessing nested config values
 */
export function getConfigValue(key: keyof AppConfig): any {
  return config[key];
}
