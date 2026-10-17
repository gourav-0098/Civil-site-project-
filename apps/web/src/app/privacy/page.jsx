export const metadata = {
  title: 'Privacy Policy | Nivara Infrastructure',
  description: 'Privacy policy and data governance practices for Nivara Infrastructure property marketing and buyer advisory services.'
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-steel-200 pb-6">
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
            Data Governance & Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
            Privacy Policy
          </h1>
          <p className="text-xs text-steel-500 font-mono">
            Effective Date: January 1, 2026 • Document Version 2.0 (Real Estate Marketing)
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-steel-700 text-sm leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              1. Overview & Information Collection
            </h2>
            <p>
              Nivara Infrastructure (&quot;Nivara&quot;, &quot;we&quot;, &quot;us&quot;) respects the privacy of prospective homebuyers, commercial property seekers, and developer partners. This Privacy Policy outlines how we collect, store, and process information submitted through our public website, property inquiry forms, and viewing appointment requests.
            </p>
            <p>
              We collect information provided directly by you when submitting an inquiry or scheduling a property site visit, including your name, email address, telephone contact number, preferred location, and property interests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              2. Purpose of Data Processing
            </h2>
            <p>
              Information submitted to Nivara Infrastructure is used exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Coordinating personalized property walkthroughs, sample flat inspections, and developer meetings.</li>
              <li>Providing requested property brochures, price ranges, and floor plan documentation.</li>
              <li>Internal operational record-keeping, customer support, and advisory communication.</li>
              <li>Protecting our services from automated spam, abuse, and fraudulent inquiries.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              3. Data Retention, Security & Non-Disclosure
            </h2>
            <p>
              We implement industry-standard encryption, strict access controls, and server-side authorization boundaries to protect your contact details. We never sell, rent, or trade customer contact details to third-party telemarketers or external advertising networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              4. Direct Contact Regarding Privacy
            </h2>
            <p>
              Inquiries regarding data correction, deletion, or privacy governance may be directed to our compliance desk at{' '}
              <a href="mailto:privacy@nivarainfra.com" className="text-industrial-orange underline font-mono">
                privacy@nivarainfra.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
