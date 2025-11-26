# Landing Page

The primary marketing and onboarding website for the Bagisto SaaS e-commerce platform.

## Features

- **Three Business Models**: SaaS rental, license sales, and ready backend
- **Template Showcase**: Browse and select store templates
- **Pricing Plans**: Subscription and license package options
- **Demo Stores**: Live examples of platform capabilities
- **Contact Forms**: Lead generation and customer inquiries

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Configuration**: Environment variables and JSON files

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Environment variables configured

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your configuration
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Required environment variables (see `.env.example`):

- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NEXT_PUBLIC_BACKEND_URL` - Backend admin URL
- `NEXT_PUBLIC_DOCS_URL` - API documentation site URL
- `NEXT_PUBLIC_DEMO_STORE_1_URL` - First demo store URL
- `NEXT_PUBLIC_DEMO_STORE_2_URL` - Second demo store URL

## Project Structure

```
apps/landing/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── templates/         # Template showcase
│   ├── pricing/           # Pricing pages
│   ├── demos/             # Demo showcase
│   └── contact/           # Contact form
├── components/            # React components
├── lib/                   # Utilities and helpers
│   ├── config.ts         # Configuration loader
│   ├── api.ts            # API client
│   └── types.ts          # TypeScript types
├── config/               # Configuration files
│   ├── pricing.json      # Pricing data
│   ├── templates.json    # Template metadata
│   └── features.json     # Feature descriptions
└── public/               # Static assets
    └── images/           # Images and screenshots
```

## Configuration

All URLs and external configuration are managed through:

1. **Environment Variables** (`.env.local`) - For URLs and API endpoints
2. **JSON Configuration Files** (`config/*.json`) - For content and pricing data

This approach ensures no hardcoded values and easy environment switching.

## Development Guidelines

- Use TypeScript for all new files
- Follow the component structure in the design document
- Ensure all external URLs come from environment variables
- Load pricing and content data from JSON configuration files
- Write tests for new functionality

## Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Docker

Build and run with Docker:

```bash
# Build image
docker build -t landing-page .

# Run container
docker run -p 3000:3000 --env-file .env.local landing-page
```

## License

Proprietary - All rights reserved
