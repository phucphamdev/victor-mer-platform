'use client';

export default function DomainMappingInfo() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        How Custom Domain Mapping Works
      </h2>

      {/* Introduction */}
      <div className="mb-8">
        <p className="text-gray-600 leading-relaxed">
          With our platform, you can map your own custom domain to your store. Your customers will
          see your brand's domain (like <code className="bg-gray-100 px-2 py-1 rounded text-sm">www.your-store.com</code>)
          instead of a generic subdomain. We handle all the technical setup, including SSL certificates.
        </p>
      </div>

      {/* DNS Configuration Steps */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">DNS Configuration Steps</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Purchase Your Domain</h4>
              <p className="text-gray-600 text-sm">
                Register your desired domain name with any domain registrar (e.g., GoDaddy, Namecheap, Google Domains).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Access DNS Settings</h4>
              <p className="text-gray-600 text-sm">
                Log in to your domain registrar's control panel and navigate to the DNS management section.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Add DNS Records</h4>
              <p className="text-gray-600 text-sm mb-2">
                Add the following DNS records (exact values will be provided after signup):
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                <div className="mb-2">
                  <span className="text-gray-500">Type:</span> <span className="text-gray-900">A Record</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-500">Host:</span> <span className="text-gray-900">@</span> or <span className="text-gray-900">www</span>
                </div>
                <div>
                  <span className="text-gray-500">Value:</span> <span className="text-gray-900">[provided-ip-address]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Wait for Propagation</h4>
              <p className="text-gray-600 text-sm">
                DNS changes can take 24-48 hours to propagate globally, though it's usually much faster (1-2 hours).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">SSL Certificate Activation</h4>
              <p className="text-gray-600 text-sm">
                Once DNS is configured, we'll automatically provision and install a free SSL certificate for your domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Tenancy Explanation */}
      <div className="mb-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Understanding Multi-Tenancy
        </h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          Your store runs on our shared platform infrastructure, but appears completely independent to your customers.
          Each store (tenant) has its own:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Isolated database and data storage</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Custom domain and branding</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Separate configuration and settings</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Independent customer accounts and orders</span>
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          This architecture allows us to provide enterprise-grade infrastructure at an affordable price while
          maintaining complete data isolation and security for each store.
        </p>
      </div>

      {/* Domain Examples */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Domain Configurations</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold text-gray-900">Recommended</span>
            </div>
            <code className="text-sm text-gray-700">www.example-store.com</code>
            <p className="text-xs text-gray-600 mt-1">Using www subdomain (most common)</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold text-gray-900">Also Valid</span>
            </div>
            <code className="text-sm text-gray-700">shop.example-brand.com</code>
            <p className="text-xs text-gray-600 mt-1">Using custom subdomain</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold text-gray-900">Apex Domain</span>
            </div>
            <code className="text-sm text-gray-700">example-store.com</code>
            <p className="text-xs text-gray-600 mt-1">Root domain without subdomain</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Note: These are example configurations. Actual domain names and IP addresses will be provided
          after you sign up for a plan.
        </p>
      </div>

      {/* Support Information */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Need Help with Domain Setup?
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our technical support team is available to help you configure your domain. We provide:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Step-by-step configuration guides</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Email support for DNS configuration</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Troubleshooting assistance</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>SSL certificate management</span>
          </li>
        </ul>
        <a
          href="/contact"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
