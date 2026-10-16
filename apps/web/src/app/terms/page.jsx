export const metadata = {
  title: 'Terms of Engagement | Nivara Infrastructure',
  description: 'Terms of engagement, portal use, and demonstration guidelines for Nivara Infrastructure web services.'
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-steel-200 pb-6">
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-wider">
            Legal Terms & Conditions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
            Terms of Engagement
          </h1>
          <p className="text-xs text-steel-500 font-mono">
            Effective Date: January 1, 2026 • Document Version 1.1
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-steel-700 text-sm leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              1. Website & Portal Utilization
            </h2>
            <p>
              By accessing and using this web portal, you agree to comply with and be bound by these Terms of Engagement. All technical specifications, drawings, project archetypes, and documentation published on this portal are provided for informational and preliminary commercial evaluation purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              2. Demonstration Archetypes & Portfolio Content
            </h2>
            <p>
              Certain project case studies displayed across the public directory are marked as demonstration case studies and archetypes for illustrating engineering capabilities, structural methodologies, and equipment deployment. Binding contractual commitments are governed strictly by executed engineering, procurement, and construction (EPC) contracts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              3. Intellectual Property Rights
            </h2>
            <p>
              All proprietary brand wordmarks, engineering text, structural layouts, and software architectures contained herein are the property of Nivara Infrastructure or used under legal license. Unauthorized reproduction or scraping of content without written permission is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-900 font-display">
              4. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India. Any legal disputes arising out of the use of this portal shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
