'use client';

import { useState } from 'react';

const initialFormData = {
  fullName: '',
  workEmail: '',
  companyName: '',
  contactName: '',
  businessEmail: '',
  referralCompanyName: '',
  solution: '',
  additionalInfo: '',
};

const features = [
  {
    title: 'Parcel Dimensioning',
    description: 'From individual parcels to high-volume shipping operations, vMeasure helps capture accurate dimensions, weight, and images in seconds, making parcel processing and billing more efficient.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    ),
  },
  {
    title: 'Pallet Dimensioning',
    description: 'For warehouses, manufacturers, and freight operators looking to improve pallet measurement, vMeasure provides accurate dimensional data to support freight planning, billing, and dispatch operations.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5M6 6v12m12-12v12" />
    ),
  },
  // {
  //   title: 'In-Motion Dimensioning',
  //   description: 'Dimension items on moving conveyors without slowing throughput.',
  //   icon: (
  //     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  //   ),
  // },
];

const solutions = ['Parcel Dimensioning', 'Pallet Dimensioning', 'In-Motion Dimensioning', 'Not Sure'];

export default function Home() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Thank you! Your referral has been submitted successfully.' });
        setFormData(initialFormData);
      } else {
        setMessage({ type: 'error', text: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to submit your referral. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white text-ink shadow-[0_4px_12px_-2px_rgba(51,53,68,0.18)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="https://vmeasure.ai/" target="_blank" rel="noopener noreferrer" className="block">
            {/* The logo image has white padding built in; negative margins offset it */}
            <img
              src="/vmeasure-logo.png"
              alt="vMeasure, built by VisAI Labs"
              width={1750}
              height={630}
              className="-mx-2 -my-2 h-16 w-auto sm:h-20"
            />
          </a>
          <a
            href="https://vmeasure.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-ink transition-colors hover:text-primary-500"
          >
            Visit vMeasure.ai &rarr;
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 bg-primary-500">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          {/* Left: Info */}
          <section className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit rounded-full bg-accent-500/15 px-4 py-1.5 text-xs font-bold tracking-widest text-accent-500 ring-1 ring-accent-500/40">
              Good Experiences Are Worth Sharing
            </span>
            <h1 className="section-title mb-6">
              Know Someone Who Could Benefit from <span className="text-accent-500">vMeasure</span>?
            </h1>
            <p className="section-subtitle mb-4">
              Whether they're planning to invest in a new dimensioner, replace an existing system, or find a better way to manage parcel and pallet measurements, your introduction could help them make the right choice.
            </p>
            <p className="section-subtitle mb-6">
              Share a contact from your network, and we'll take it forward from there.
            </p>

            <h2 className="mb-5 text-xl font-bold tracking-tight text-white md:text-2xl">
              What vMeasure Has to Offer
            </h2>

            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-5 transition-colors hover:bg-white/15"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ink">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                      {feature.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-500">{feature.title}</h3>
                    <p className="text-sm text-white">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Form */}
          <section className="rounded-xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-gray-900">Refer a Business</h2>
            {/* <p className="mt-1 text-sm text-gray-600">Fields marked * are required.</p> */}

            {message && (
              <div
                role="status"
                className={`mt-4 rounded-lg border px-4 py-3 text-sm font-medium ${
                  message.type === 'success'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-8">
              {/* Your Information */}
              <fieldset className="space-y-4">
                <legend className="mb-4 border-b border-gray-200 pb-2 text-sm font-bold tracking-wider text-primary-600">
                  YOUR INFORMATION
                </legend>
                <div>
                  <label htmlFor="fullName" className="label-text">Full Name *</label>
                  <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="input-field" placeholder="Jane Smith" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="workEmail" className="label-text">Work Email *</label>
                    <input id="workEmail" name="workEmail" type="email" required value={formData.workEmail} onChange={handleChange} className="input-field" placeholder="jane@company.com" />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="label-text">Company Name</label>
                    <input id="companyName" name="companyName" type="text" value={formData.companyName} onChange={handleChange} className="input-field" placeholder="Your company" />
                  </div>
                </div>
              </fieldset>

              {/* Who would you like to refer? */}
              <fieldset className="space-y-4">
                <legend className="mb-4 border-b border-gray-200 pb-2 text-sm font-bold tracking-wider text-primary-600">
                  WHO WOULD YOU LIKE TO REFER?
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contactName" className="label-text">Contact Name *</label>
                    <input id="contactName" name="contactName" type="text" required value={formData.contactName} onChange={handleChange} className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="businessEmail" className="label-text">Business Email *</label>
                    <input id="businessEmail" name="businessEmail" type="email" required value={formData.businessEmail} onChange={handleChange} className="input-field" placeholder="john@business.com" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="referralCompanyName" className="label-text">Company Name *</label>
                    <input id="referralCompanyName" name="referralCompanyName" type="text" required value={formData.referralCompanyName} onChange={handleChange} className="input-field" placeholder="Their company" />
                  </div>
                  <div>
                    <label htmlFor="solution" className="label-text">Solution</label>
                    <select id="solution" name="solution" value={formData.solution} onChange={handleChange} className="input-field">
                      <option value="">Select a solution</option>
                      {solutions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="additionalInfo" className="label-text">Anything Else?</label>
                  <textarea id="additionalInfo" name="additionalInfo" rows={4} value={formData.additionalInfo} onChange={handleChange} className="input-field resize-y" placeholder="Tell us about their business or needs..." />
                </div>
              </fieldset>

              {/* Submit */}
              <div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Submitting...' : '🚀 Refer a Business'}
                </button>
                <p className="mt-3 text-center text-xs text-gray-600">
                  We respect your privacy. Your information and your referral&apos;s details will only be used to
                  follow up on this referral and will never be shared with third parties.
                </p>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-ink py-6 text-center text-sm text-white">
        © 2026 vMeasure. All rights reserved.
      </footer>
    </div>
  );
}
