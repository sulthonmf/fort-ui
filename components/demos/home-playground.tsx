'use client';

import * as React from 'react';
import { Bell, Moon, Shield, SlidersHorizontal, Wifi } from 'lucide-react';
import { Button } from '@/registry/web/ui/button';
import { Badge } from '@/registry/web/ui/badge';
import { Checkbox } from '@/registry/web/ui/checkbox';
import { SearchBar } from '@/registry/web/ui/input';
import { Slider } from '@/registry/web/ui/slider';
import { Switch } from '@/registry/web/ui/switch';
import {
  SegmentedControl,
  SegmentedControlContent,
  SegmentedControlList,
  SegmentedControlTrigger,
} from '@/registry/web/ui/segmented-control';
import { GroupedList, GroupedListItem } from '@/registry/web/ui/grouped-list';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/registry/web/ui/alert-dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/web/ui/sheet';

/**
 * Interactive Settings-like device panel showing fort-ui components working together.
 */
export function HomePlayground() {
  const [query, setQuery] = React.useState('');
  const [wifiEnabled, setWifiEnabled] = React.useState(true);
  const [focusMode, setFocusMode] = React.useState(false);
  const [alertsEnabled, setAlertsEnabled] = React.useState(true);
  const [privacyLock, setPrivacyLock] = React.useState(true);
  const [brightness, setBrightness] = React.useState(72);
  const [trueTone, setTrueTone] = React.useState(true);
  const [resetNote, setResetNote] = React.useState<string | null>(null);

  function handleReset() {
    setQuery('');
    setWifiEnabled(true);
    setFocusMode(false);
    setAlertsEnabled(true);
    setPrivacyLock(true);
    setBrightness(72);
    setTrueTone(true);
    setResetNote('Settings restored to defaults.');
  }

  const normalizedQuery = query.trim().toLowerCase();
  const showWifi = !normalizedQuery || 'wi-fi studio network'.includes(normalizedQuery);
  const showFocus = !normalizedQuery || 'focus mode silence'.includes(normalizedQuery);
  const showNotifications = !normalizedQuery || 'notifications alerts'.includes(normalizedQuery);
  const hasMatches = showWifi || showFocus || showNotifications;

  return (
    <div className="fort-ui mx-auto w-full max-w-[400px] rounded-[28px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <p className="text-[12px] font-medium text-[var(--fort-label-secondary)]">
            Interactive Preview
          </p>
          <div className="flex items-center gap-2">
            <h2 className="text-[22px] font-bold tracking-tight text-[var(--fort-label)]">
              Settings
            </h2>
            {focusMode ? <Badge variant="tinted">Focus</Badge> : null}
          </div>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="tinted" size="sm" shape="pill">
                <SlidersHorizontal className="size-3.5" />
                Display
              </Button>
            }
          />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Display &amp; Brightness</SheetTitle>
              <SheetDescription>
                Adjust brightness and color tone for this preview.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4">
              <div className="rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-4">
                <div className="mb-1 flex items-center justify-between text-[14px]">
                  <span className="font-medium text-[var(--fort-label)]">
                    Brightness
                  </span>
                  <span className="tabular-nums text-[var(--fort-label-secondary)]">
                    {brightness}%
                  </span>
                </div>
                <Slider
                  thumbLabel="Display brightness"
                  min={10}
                  max={100}
                  value={brightness}
                  onValueChange={(next) => setBrightness(next)}
                />
              </div>

              <div className="rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-4">
                <Checkbox
                  label="Adaptive Tone"
                  checked={trueTone}
                  onCheckedChange={setTrueTone}
                />
              </div>

              <SheetClose render={<Button fullWidth>Done</Button>} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <SegmentedControl defaultValue="general">
        <SegmentedControlList fullWidth>
          <SegmentedControlTrigger value="general">
            General
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="privacy">
            Privacy
          </SegmentedControlTrigger>
        </SegmentedControlList>

        <SegmentedControlContent value="general" className="space-y-3.5 pt-1">
          <SearchBar
            aria-label="Filter settings"
            placeholder="Search settings"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
          />

          {hasMatches ? (
            <>
              {showWifi || showFocus ? (
                <GroupedList header="Connectivity">
                  {showWifi ? (
                    <GroupedListItem
                      leading={<Wifi className="size-4" />}
                      title="Wi-Fi"
                      subtitle={wifiEnabled ? 'Studio-5G' : 'Disconnected'}
                      trailing={
                        <Switch
                          aria-label="Toggle Wi-Fi"
                          checked={wifiEnabled}
                          onCheckedChange={(checked) => {
                            setWifiEnabled(checked);
                            setResetNote(null);
                          }}
                        />
                      }
                    />
                  ) : null}
                  {showFocus ? (
                    <GroupedListItem
                      leading={<Moon className="size-4" />}
                      title="Focus Mode"
                      subtitle={focusMode ? 'Silencing banners' : 'Off'}
                      trailing={
                        <Switch
                          aria-label="Toggle Focus Mode"
                          checked={focusMode}
                          onCheckedChange={(checked) => {
                            setFocusMode(checked);
                            setResetNote(null);
                          }}
                        />
                      }
                    />
                  ) : null}
                </GroupedList>
              ) : null}

              {showNotifications ? (
                <GroupedList>
                  <GroupedListItem
                    leading={<Bell className="size-4" />}
                    title="Notifications"
                    trailing={
                      <Switch
                        aria-label="Toggle Notifications"
                        checked={alertsEnabled}
                        onCheckedChange={(checked) => {
                          setAlertsEnabled(checked);
                          setResetNote(null);
                        }}
                      />
                    }
                  />
                </GroupedList>
              ) : null}
            </>
          ) : (
            <div className="rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-5 text-center">
              <p className="text-[14px] font-medium text-[var(--fort-label)]">
                No matching settings
              </p>
              <p className="mt-1 text-[12px] text-[var(--fort-label-secondary)]">
                Try &quot;Wi-Fi&quot;, &quot;Focus&quot;, or &quot;Notifications&quot;.
              </p>
              <Button
                variant="tinted"
                size="sm"
                className="mt-3"
                onClick={() => setQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </SegmentedControlContent>

        <SegmentedControlContent value="privacy" className="space-y-4 pt-1">
          <GroupedList header="Access Control">
            <GroupedListItem
              leading={<Shield className="size-4" />}
              title="Require Passcode"
              subtitle="Lock after 1 minute"
              trailing={
                <Switch
                  aria-label="Require Passcode"
                  checked={privacyLock}
                  onCheckedChange={(checked) => {
                    setPrivacyLock(checked);
                    setResetNote(null);
                  }}
                />
              }
            />
          </GroupedList>

          <div className="pt-1">
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button variant="destructive-tinted" fullWidth>
                    Reset All Preferences
                  </Button>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Preferences?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Restores Wi-Fi, Focus Mode, Notifications, Display, and
                    Passcode back to their initial state.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={handleReset}>
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SegmentedControlContent>
      </SegmentedControl>

      {resetNote ? (
        <p className="mt-3 px-1 text-center text-[12px] text-[var(--fort-label-secondary)]">
          {resetNote}
        </p>
      ) : null}
    </div>
  );
}
