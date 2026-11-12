import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'fort-ui',
    template: '%s | fort-ui',
  },
  description:
    'Touch-first Cupertino-inspired copy-paste UI components for React, Tailwind CSS, and Base UI.',
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
