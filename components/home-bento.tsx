'use client';

import * as React from 'react';
import {
  Bell,
  Check,
  ChevronRight,
  Copy,
  Moon,
  QrCode,
  SlidersHorizontal,
  Wifi,
} from 'lucide-react';
import { Button } from '@/registry/web/ui/button';
import { Checkbox } from '@/registry/web/ui/checkbox';
import { SearchBar } from '@/registry/web/ui/input';
import { Slider } from '@/registry/web/ui/slider';
import { Switch } from '@/registry/web/ui/switch';
import { GroupedList, GroupedListItem } from '@/registry/web/ui/grouped-list';
import { OTPInput } from '@/registry/web/ui/otp-input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/web/ui/sheet';

const TINT_PRESETS = [
  { name: 'Cupertino Blue', color: '#0066cc', text: '#0055b3', soft: 'rgba(0, 102, 204, 0.12)' },
  { name: 'Mint Green', color: '#248a3d', text: '#1e7534', soft: 'rgba(36, 138, 61, 0.14)' },
  { name: 'Royal Indigo', color: '#5856d6', text: '#4745ab', soft: 'rgba(88, 86, 214, 0.14)' },
  { name: 'Coral Sunset', color: '#f56523', text: '#d94f11', soft: 'rgba(245, 101, 35, 0.14)' },
];

export function HomeBento() {
  // Card 1 State
  const [hapticTouch, setHapticTouch] = React.useState(true);
  const [compactMode, setCompactMode] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState('');

  // Card 2 State
  const [wifiEnabled, setWifiEnabled] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [brightness, setBrightness] = React.useState(75);

  // Card 3 State
  const [passcode, setPasscode] = React.useState('4290');
  const [verified, setVerified] = React.useState(false);

  // Card 4 State (Theme Tint)
  const [activeTint, setActiveTint] = React.useState(TINT_PRESETS[0]);

  return (
    <div
      style={
        {
          '--fort-tint': activeTint.color,
          '--fort-tint-text': activeTint.text,
          '--fort-tint-soft': activeTint.soft,
        } as React.CSSProperties
      }
      className="fort-ui w-full transition-colors duration-300"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Touch Actions & Controls */}
        <div className="flex flex-col justify-between rounded-[24px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-5 shadow-sm transition-all duration-200 hover:border-fd-foreground/20">
          <div>
            <div className="mb-4">
              <p className="text-[11px] font-semibold tracking-wider text-[var(--fort-label-secondary)] uppercase">
                Tactile Feedback
              </p>
              <h3 className="text-[17px] font-bold tracking-tight text-[var(--fort-label)]">
                Actions &amp; Buttons
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="filled" size="sm">
                  Filled
                </Button>
                <Button variant="tinted" size="sm">
                  Tinted
                </Button>
                <Button variant="gray" size="sm">
                  Gray
                </Button>
                <Button variant="destructive-tinted" size="sm">
                  Remove
                </Button>
              </div>

              <SearchBar
                placeholder="Search..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onClear={() => setSearchVal('')}
              />

              <div className="flex items-center justify-between rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] px-3 py-2.5">
                <span className="text-[13px] font-medium text-[var(--fort-label)]">
                  Haptic Feedback
                </span>
                <Switch
                  aria-label="Toggle haptic feedback"
                  checked={hapticTouch}
                  onCheckedChange={setHapticTouch}
                />
              </div>

              <div className="px-1">
                <Checkbox
                  label="Enable sound cues on tap"
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--fort-separator)]">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="plain" size="sm" fullWidth className="justify-between">
                    <span>Try Bottom Sheet</span>
                    <ChevronRight className="size-4" />
                  </Button>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Tactile Drawer Sheet</SheetTitle>
                  <SheetDescription>
                    Swipe down on the handle or press Escape to dismiss this modal drawer.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-2 space-y-3">
                  <div className="rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-3 text-[13px] text-[var(--fort-label-secondary)]">
                    This drawer component is built on Base UI Drawer with physical drag inertia and seamless theme tokens.
                  </div>
                  <SheetClose render={<Button fullWidth>Done</Button>} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Card 2: Cupertino Inset Grouped Settings */}
        <div className="flex flex-col justify-between rounded-[24px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-5 shadow-sm transition-all duration-200 hover:border-fd-foreground/20">
          <div>
            <div className="mb-4">
              <p className="text-[11px] font-semibold tracking-wider text-[var(--fort-label-secondary)] uppercase">
                Cupertino Surfaces
              </p>
              <h3 className="text-[17px] font-bold tracking-tight text-[var(--fort-label)]">
                Grouped Settings
              </h3>
            </div>

            <GroupedList footer="Hairline dividers &amp; native touch response.">
              <GroupedListItem
                leading={<Wifi className="size-4" />}
                title="Wi-Fi"
                subtitle={wifiEnabled ? 'Studio-5G' : 'Off'}
                trailing={
                  <Switch
                    aria-label="Toggle Wi-Fi"
                    checked={wifiEnabled}
                    onCheckedChange={setWifiEnabled}
                  />
                }
              />
              <GroupedListItem
                leading={<Bell className="size-4" />}
                title="Notifications"
                trailing={
                  <Switch
                    aria-label="Toggle Notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                }
              />
              <GroupedListItem
                leading={<Moon className="size-4" />}
                title="Theme"
                trailing="System"
                chevron
                onClick={() => {}}
              />
            </GroupedList>

            <div className="mt-3 rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-3">
              <div className="mb-2 flex items-center justify-between text-[13px]">
                <span className="font-medium text-[var(--fort-label)]">Brightness</span>
                <span className="tabular-nums text-[var(--fort-label-secondary)]">
                  {brightness}%
                </span>
              </div>
              <Slider
                thumbLabel="Display brightness"
                min={20}
                max={100}
                value={brightness}
                onValueChange={setBrightness}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--fort-separator)] text-[12px] text-[var(--fort-label-secondary)] flex items-center justify-between">
            <span>Auto-synced</span>
            <span className="font-semibold text-[var(--fort-tint-text)]">Active</span>
          </div>
        </div>

        {/* Card 3: Passcode & OTP Verification */}
        <div className="flex flex-col justify-between rounded-[24px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-5 shadow-sm transition-all duration-200 hover:border-fd-foreground/20">
          <div>
            <div className="mb-4">
              <p className="text-[11px] font-semibold tracking-wider text-[var(--fort-label-secondary)] uppercase">
                Mobile Security
              </p>
              <h3 className="text-[17px] font-bold tracking-tight text-[var(--fort-label)]">
                Passcode &amp; OTP
              </h3>
            </div>

            <p className="text-[13px] leading-relaxed text-[var(--fort-label-secondary)] mb-4">
              Accessible digit input with automatic focus hopping and tactile feedback.
            </p>

            <div className="flex justify-center py-2">
              <OTPInput
                length={4}
                value={passcode}
                onValueChange={(val: string) => {
                  setPasscode(val);
                  setVerified(val === '2026');
                }}
              />
            </div>

            <p className="text-center text-[11px] text-[var(--fort-label-secondary)] mt-2">
              Type <strong className="text-[var(--fort-label)]">2026</strong> to test verification
            </p>

            <div className="mt-4">
              <Button
                variant={verified ? 'filled' : 'gray'}
                fullWidth
                size="md"
                onClick={() => setVerified(!verified)}
              >
                {verified ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="size-4" /> Device Verified
                  </span>
                ) : (
                  'Confirm Passcode'
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--fort-separator)] flex items-center justify-between text-[12px]">
            <span className="text-[var(--fort-label-secondary)]">Status</span>
            <span
              className={
                verified
                  ? 'font-semibold text-[var(--fort-tint-text)]'
                  : 'text-[var(--fort-label-secondary)]'
              }
            >
              {verified ? 'Unlocked' : 'Locked'}
            </span>
          </div>
        </div>

        {/* Card 4: Cross-Platform & Accent Tint Switcher */}
        <div className="flex flex-col justify-between rounded-[24px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-5 shadow-sm transition-all duration-200 hover:border-fd-foreground/20">
          <div>
            <div className="mb-4">
              <p className="text-[11px] font-semibold tracking-wider text-[var(--fort-label-secondary)] uppercase">
                Cross-Platform
              </p>
              <h3 className="text-[17px] font-bold tracking-tight text-[var(--fort-label)]">
                Shared Tokens &amp; Expo
              </h3>
            </div>

            <div className="rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-3 text-center mb-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-[12px] bg-[var(--fort-surface)] shadow-xs">
                <QrCode className="size-8 text-[var(--fort-label)]" />
              </div>
              <p className="mt-2 text-[12px] font-semibold text-[var(--fort-label)]">
                Scan on Mobile Device
              </p>
              <p className="text-[11px] text-[var(--fort-label-secondary)]">
                Preview fortui.my.id in Safari / Chrome
              </p>
            </div>

            <div>
              <p className="text-[12px] font-medium text-[var(--fort-label)] mb-2.5">
                Live Accent Tint
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TINT_PRESETS.map((preset) => {
                  const isSelected = activeTint.name === preset.name;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      aria-label={preset.name}
                      title={preset.name}
                      onClick={() => setActiveTint(preset)}
                      className="group flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <span
                        style={{ backgroundColor: preset.color }}
                        className={`size-8 rounded-full transition-transform duration-150 flex items-center justify-center text-white ${
                          isSelected
                            ? 'scale-110 ring-2 ring-offset-2 ring-[var(--fort-tint)]'
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {isSelected ? <Check className="size-3.5 stroke-[3]" /> : null}
                      </span>
                      <span className="text-[10px] text-[var(--fort-label-secondary)] truncate w-full text-center">
                        {preset.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--fort-separator)] flex items-center justify-between text-[12px]">
            <span className="text-[var(--fort-label-secondary)]">Active Tint</span>
            <span className="font-semibold text-[var(--fort-tint-text)]">
              {activeTint.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommandPill() {
  const [copied, setCopied] = React.useState(false);
  const command = 'npx fort-ui add button grouped-list sheet';

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3.5 py-1.5 text-xs font-mono text-fd-foreground shadow-xs transition-colors hover:border-fd-foreground/20">
      <span className="text-[var(--fort-label-secondary)]">$</span>
      <span>{command}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="ml-1 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-sans font-medium text-[var(--fort-label-secondary)] hover:text-fd-foreground hover:bg-fd-accent transition-colors"
        aria-label="Copy install command"
      >
        {copied ? (
          <>
            <Check className="size-3 text-[var(--fort-switch-on)]" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="size-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
