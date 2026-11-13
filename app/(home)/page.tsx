import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HomeBento, CommandPill } from '@/components/home-bento';
import { DonateButton } from '@/components/donate-button';
import { appName, gitConfig, siteDescription, siteUrl } from '@/lib/shared';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: appName,
      alternateName: ['fort ui', 'fortui'],
      url: siteUrl,
      description: siteDescription,
    },
    {
      '@type': 'SoftwareApplication',
      name: appName,
      alternateName: 'fort ui',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web, React Native, Expo',
      url: siteUrl,
      description: siteDescription,
      codeRepository: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    },
  ],
};

const COMPONENT_CATEGORIES = [
  {
    title: 'Inputs & Actions',
    components: [
      { name: 'Button', href: '/docs/components/button' },
      { name: 'Badge', href: '/docs/components/badge' },
      { name: 'Checkbox', href: '/docs/components/checkbox' },
      { name: 'Input', href: '/docs/components/input' },
      { name: 'Textarea', href: '/docs/components/textarea' },
      { name: 'Select', href: '/docs/components/select' },
      { name: 'Radio Group', href: '/docs/components/radio-group' },
      { name: 'OTP Input', href: '/docs/components/otp-input' },
      { name: 'Slider', href: '/docs/components/slider' },
      { name: 'Switch', href: '/docs/components/switch' },
      { name: 'Progress', href: '/docs/components/progress' },
      { name: 'Segmented Control', href: '/docs/components/segmented-control' },
      { name: 'Wheel Picker', href: '/docs/components/wheel-picker' },
      { name: 'Numpad', href: '/docs/components/numpad' },
      { name: 'Filter Chips', href: '/docs/components/filter-chips' },
    ],
  },
  {
    title: 'Surfaces & Display',
    components: [
      { name: 'Grouped List', href: '/docs/components/grouped-list' },
      { name: 'Accordion', href: '/docs/components/accordion' },
      { name: 'Card', href: '/docs/components/card' },
      { name: 'Avatar', href: '/docs/components/avatar' },
      { name: 'Skeleton', href: '/docs/components/skeleton' },
    ],
  },
  {
    title: 'Navigation & Overlays',
    components: [
      { name: 'Nav Bar', href: '/docs/components/nav-bar' },
      { name: 'Tab Bar', href: '/docs/components/tab-bar' },
      { name: 'Toast', href: '/docs/components/toast' },
      { name: 'Menu', href: '/docs/components/menu' },
      { name: 'Popover', href: '/docs/components/popover' },
      { name: 'Alert Dialog', href: '/docs/components/alert-dialog' },
      { name: 'Sheet', href: '/docs/components/sheet' },
      { name: 'Action Sheet', href: '/docs/components/action-sheet' },
      { name: 'Activity Pill', href: '/docs/components/activity-pill', pro: true },
      { name: 'Swipe Row', href: '/docs/components/swipe-row', pro: true },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-12 sm:px-8 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSON_LD).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero Header Section */}
      <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Top Announcement Pill */}
        <Link
          href="/docs/expo"
          className="group inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-xs font-medium text-fd-foreground shadow-xs transition-colors hover:border-fd-foreground/20 hover:bg-fd-accent"
        >
          <Sparkles className="size-3.5 text-[var(--fort-tint-text)]" />
          <span>v0.1.1 on npm · Web &amp; Expo React Native Ready</span>
          <ArrowRight className="size-3 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Display Headline */}
        <h1 className="fort-ui mt-6 text-4xl font-extrabold tracking-tight text-fd-foreground sm:text-6xl sm:leading-[1.1]">
          The Touch-First Foundation for Mobile &amp; Web
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
          Cupertino ergonomics and tactile defaults for React and Tailwind CSS.
          Built on accessible Base UI primitives with shared semantic tokens for Next.js, Vite, and Expo.
        </p>

        {/* CTA Buttons & Quick Install */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/components/button"
            className="fort-ui inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--fort-tint)] px-6 text-[15px] font-semibold text-white shadow-xs transition-[transform,filter] duration-150 ease-[var(--fort-ease)] hover:brightness-105 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
          >
            Browse Components
          </Link>
          <Link
            href="/docs"
            className="fort-ui inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--fort-surface-muted)] px-6 text-[15px] font-semibold text-[var(--fort-label)] transition-[transform,filter] duration-150 ease-[var(--fort-ease)] hover:brightness-95 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
          >
            Documentation
          </Link>
        </div>

        {/* Command Pill */}
        <div className="mt-5">
          <CommandPill />
        </div>
      </section>

      {/* Bento Showcase Grid */}
      <section className="mt-14 w-full">
        <HomeBento />
      </section>

      {/* Component Directory Catalog */}
      <section className="mt-16 border-t border-fd-border pt-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-fd-foreground sm:text-2xl">
              Component Catalog
            </h2>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              30 Web components (28 Free + 2 Pro) and 17 Expo Native components.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs/expo"
              className="text-xs font-semibold text-[var(--fort-tint-text)] hover:underline"
            >
              Expo / React Native Guide →
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {COMPONENT_CATEGORIES.map((category) => (
            <div key={category.title} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.components.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-[10px] border border-fd-border bg-fd-card px-2.5 py-1 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
                    >
                      <span>{item.name}</span>
                      {item.pro ? (
                        <span className="rounded-full bg-[var(--fort-tint-soft)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--fort-tint-text)] leading-none">
                          Pro
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Support Banner */}
      <section className="mt-16 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-fd-border bg-fd-card p-6 text-center sm:flex-row sm:text-left">
        <div>
          <h4 className="text-sm font-semibold text-fd-foreground">
            Support fort-ui Development
          </h4>
          <p className="mt-1 text-xs text-fd-muted-foreground">
            Independent open source project. You can support continued component releases via Saweria.
          </p>
        </div>
        <div className="shrink-0">
          <DonateButton size="sm" variant="tinted" />
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-fd-muted-foreground">
        fort-ui is an independent project and is not affiliated with or endorsed by Apple Inc.
      </p>
    </main>
  );
}
