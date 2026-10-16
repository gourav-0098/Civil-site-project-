import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'Nivara Infrastructure | Heavy Civil & Infrastructure Engineering',
    template: '%s | Nivara Infrastructure'
  },
  description: 'Nivara Infrastructure delivers considered engineering and heavy civil construction solutions for highways, bridges, urban transit, and clean energy infrastructure.',
  keywords: [
    'civil construction',
    'infrastructure engineering',
    'highways and bridges',
    'transit corridors',
    'renewable energy civil',
    'water infrastructure',
    'Nivara'
  ],
  authors: [{ name: 'Nivara Infrastructure' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Nivara Infrastructure | Heavy Civil & Infrastructure Engineering',
    description: 'Engineering Infrastructure. Building Tomorrow. High-performance civil infrastructure delivery.',
    url: '/',
    siteName: 'Nivara Infrastructure',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-navy-900 selection:bg-industrial-orange selection:text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
