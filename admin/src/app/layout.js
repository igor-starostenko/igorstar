import './globals.css';

export const metadata = {
  title: 'igorstar admin',
  description: 'Localhost-only Contentful admin portal for igorstar.com',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
