export const metadata = {
  title: 'Terms of Service & Property Disclaimers | Nivara Infrastructure',
  description: 'Terms of service, website use, and property marketing disclaimers for Nivara Infrastructure web services.'
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-steel-200 pb-6">
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
            Legal Terms & Regulatory Disclaimers
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
            Terms of Service
          </h1>
          <p className="text-xs text-steel-500 font-mono">
            Effective Date: January 1, 2026 • Document Version 2.0 (Real Estate Marketing)
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-steel-700 text-sm leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              1. Business Identity & Nature of Services
            </h2>
            <p>
              Nivara Infrastructure is a real estate marketing and property sales consultancy. Nivara Infrastructure markets properties developed and constructed by other builders and developers and assists prospective customers with property discovery, site visits, and purchase facilitation.
            </p>
            <p>
              Unless explicitly stated in writing for a specific property, Nivara Infrastructure is not the builder, developer, civil engineering contractor, or architect of the properties presented on this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              2. Accuracy of Property Information & Independent Verification
            </h2>
            <p>
              All property descriptions, visual images, floor plans, dimensions, pricing estimates, amenities, and possession timelines published on this website are provided for informational and marketing purposes based on data supplied by respective developers.
            </p>
            <p>
              Nothing on this website constitutes a binding offer to sell or a financial guarantee of return or capital appreciation. Prospective buyers are strongly advised to independently verify all project parameters, statutory approvals, and applicable RERA registrations directly with the relevant developer prior to entering into any agreement or making financial commitments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              3. Demonstration Property Listings
            </h2>
            <p>
              Certain property listings displayed during initial platform previews are designated as representative demonstration listings to illustrate architectural categories, layout presentation, and advisory features. These listings do not represent live inventory commitments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              4. Intellectual Property
            </h2>
            <p>
              Brand wordmarks, logos, original editorial content, and software architecture are the intellectual property of Nivara Infrastructure. Property visual assets and project renderings are credited to their respective developers or used under appropriate license. Unauthorized copying or automated scraping of website content is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India. Any legal dispute or proceeding arising out of or related to this website shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
