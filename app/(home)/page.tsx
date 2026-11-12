import Link from 'next/link';
import { HomePlayground } from '@/components/demos/home-playground';

const COMPONENT_LINKS = [
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
  { name: 'Grouped List', href: '/docs/components/grouped-list' },
  { name: 'Accordion', href: '/docs/components/accordion' },
  { name: 'Card', href: '/docs/components/card' },
  { name: 'Avatar', href: '/docs/components/avatar' },
  { name: 'Skeleton', href: '/docs/components/skeleton' },
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
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-12 sm:px-8 lg:py-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h1 className="fort-ui text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
            Touch-first mobile components you own in your repo.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
            fort-ui is a copy-paste component registry inspired by clean mobile
            ergonomics and Cupertino simplicity. Built for React and Tailwind
            CSS with Base UI primitives, structured around semantic tokens shared
            across React Web and Expo / React Native.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/docs/components/button"
              className="fort-ui inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--fort-tint)] px-5 text-[15px] font-semibold text-white transition-[transform,filter] duration-150 ease-[var(--fort-ease)] hover:brightness-105 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
            >
              Browse Components
            </Link>
            <Link
              href="/docs"
              className="fort-ui inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--fort-surface-muted)] px-5 text-[15px] font-semibold text-[var(--fort-label)] transition-[transform,filter] duration-150 ease-[var(--fort-ease)] hover:brightness-95 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
            >
              Installation Guide
            </Link>
          </div>

          <div className="mt-10 w-full border-t border-fd-border pt-6">
            <p className="text-xs font-medium text-fd-muted-foreground">
              Registry Web (27 Components, Free &amp; Pro)
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {COMPONENT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-[10px] border border-fd-border bg-fd-card px-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
                  >
                    <span>{item.name}</span>
                    {item.pro ? (
                      <span className="rounded-full bg-[var(--fort-tint-soft)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--fort-tint-text)] leading-none">
                        Pro
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-fd-muted-foreground">
              fort-ui is an independent project and is not affiliated with or
              endorsed by Apple Inc.
            </p>
          </div>
        </div>

        <div className="w-full">
          <HomePlayground />
        </div>
      </div>
    </main>
  );
}
