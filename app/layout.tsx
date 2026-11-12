import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { appName, gitConfig, siteDescription, siteUrl } from '@/lib/shared';
import './global.css';

const defaultTitle =
  'fort-ui: Touch-first React, Tailwind CSS & Expo UI Components';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | fort-ui',
  },
  description: siteDescription,
  applicationName: appName,
  keywords: [
    'fort-ui',
    'fort ui',
    'fortui',
    'react ui components',
    'tailwind css components',
    'base ui components',
    'expo ui components',
    'react native ui components',
    'mobile ui registry',
    'copy paste ui components',
  ],
  authors: [
    {
      name: gitConfig.user,
      url: `https://github.com/${gitConfig.user}`,
    },
  ],
  creator: gitConfig.user,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: appName,
    title: defaultTitle,
    description: siteDescription,
    images: [
      {
        url: '/images/hero-light.png',
        width: 2560,
        height: 1640,
        alt: 'fort-ui interactive component showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteDescription,
    images: ['/images/hero-light.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="fort-ui" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
