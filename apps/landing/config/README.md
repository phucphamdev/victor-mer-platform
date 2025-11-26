# Configuration Files

This directory contains JSON configuration files for the landing page content.

## Files

### pricing.json

Contains subscription plans and license packages data.

**Structure:**
- `subscriptionPlans`: Array of monthly/yearly subscription tiers
- `licensePackages`: Array of purchasable feature packages

**Fields:**
- `id`: Unique identifier
- `name`: Display name
- `price`: Price in USD
- `features`: Array of feature descriptions
- `limits`: Resource limits (for subscription plans)
- `codeModules`: Included code modules (for license packages)

### templates.json

Contains store template metadata.

**Structure:**
- `templates`: Array of available store templates

**Fields:**
- `id`: Unique identifier
- `name`: Template name
- `description`: Template description
- `screenshot`: Path to screenshot image
- `demoUrl`: Demo store URL (merged from env variables)
- `features`: Array of template features
- `category`: Template category (fashion, electronics, food, general)
- `previewImages`: Array of preview image paths

### features.json

Contains platform features and offerings data.

**Structure:**
- `platformFeatures`: Array of platform capabilities
- `offerings`: Array of business model offerings (SaaS, License, Backend)

**Fields:**
- `id`: Unique identifier
- `title`: Feature/offering title
- `description`: Detailed description
- `icon`: Icon identifier
- `category`: Feature category

## Usage

These files are loaded by `lib/config-loader.ts` and used throughout the application.

To update content:
1. Edit the JSON files directly
2. Rebuild the application (`npm run build`)
3. Restart the server

## Validation

All configuration files are validated at build time. Ensure:
- Valid JSON syntax
- Required fields are present
- IDs are unique within each file
- Prices are positive numbers
- Arrays are not empty where required
