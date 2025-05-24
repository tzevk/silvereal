// This is a root layout for a Next.js application.
// It sets up the HTML structure and includes global styles.
// The layout is used to wrap all pages in the application.
// It imports the necessary modules and styles, and defines the metadata for the application.

import '../styles/landing.css';

export const metadata = {
  title: 'SilverReal',
  description: 'Luxury eCommerce – SilverReal',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}