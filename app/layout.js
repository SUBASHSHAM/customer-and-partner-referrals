import './globals.css';

export const metadata = {
  title: 'Customer & Partner Referrals | vMeasure',
  description: 'Refer a business that could benefit from vMeasure parcel, pallet and in-motion dimensioning.',
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: browser extensions (Grammarly, translators, dark-mode tools, etc.)
    // inject attributes into <html>/<body> before React loads. This only ignores attribute
    // mismatches on these two tags; mismatches inside the page are still reported.
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
