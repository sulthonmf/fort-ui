'use client';

import * as React from 'react';
import {
  Archive,
  Bell,
  Compass,
  Folder,
  Home,
  Lock,
  Music,
  Palette,
  Pin,
  Plus,
  Settings,
  Share,
  Smartphone,
  Trash2,
} from 'lucide-react';
import { Button } from '@/registry/web/ui/button';
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
import { Input, SearchBar } from '@/registry/web/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/web/ui/sheet';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetContent,
  ActionSheetDescription,
  ActionSheetGroup,
  ActionSheetHeader,
  ActionSheetItem,
  ActionSheetTitle,
  ActionSheetTrigger,
} from '@/registry/web/ui/action-sheet';
import { Checkbox } from '@/registry/web/ui/checkbox';
import { Slider } from '@/registry/web/ui/slider';
import { Badge } from '@/registry/web/ui/badge';
import {
  LargeTitle,
  NavBar,
  NavBarActions,
  NavBarBack,
  NavBarTitle,
} from '@/registry/web/ui/nav-bar';
import { TabBar, TabBarItem } from '@/registry/web/ui/tab-bar';
import { ToastProvider, useToast } from '@/registry/web/ui/toast';
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from '@/registry/web/ui/menu';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/registry/web/ui/popover';
import { ActivityPill } from '@/registry/web/ui/activity-pill';
import { SwipeRow } from '@/registry/web/ui/swipe-row';
import { Textarea } from '@/registry/web/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/registry/web/ui/select';
import {
  RadioGroup,
  RadioItem,
  RadioListItem,
} from '@/registry/web/ui/radio-group';
import { OTPInput } from '@/registry/web/ui/otp-input';
import { Progress, Spinner } from '@/registry/web/ui/progress';
import { Avatar, AvatarFallback } from '@/registry/web/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/web/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/web/ui/card';
import { Skeleton } from '@/registry/web/ui/skeleton';

export function ButtonDemo() {
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Button variant="filled" onClick={() => setSaved((prev) => !prev)}>
          {saved ? 'Saved' : 'Save Changes'}
        </Button>
        <Button variant="tinted">Share</Button>
        <Button variant="gray">Cancel</Button>
        <Button variant="plain">Edit</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Button variant="filled" shape="pill" size="sm">
          Follow
        </Button>
        <Button variant="destructive-tinted" size="sm">
          Remove
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    </div>
  );
}

export function SwitchDemo() {
  const [airplaneMode, setAirplaneMode] = React.useState(false);
  const [wifi, setWifi] = React.useState(true);

  return (
    <div className="w-full max-w-sm">
      <GroupedList footer="Turning on Airplane Mode disables Wi-Fi in this preview.">
        <GroupedListItem
          title="Airplane Mode"
          trailing={
            <Switch
              aria-label="Airplane Mode"
              checked={airplaneMode}
              onCheckedChange={(checked) => {
                setAirplaneMode(checked);
                if (checked) setWifi(false);
              }}
            />
          }
        />
        <GroupedListItem
          title="Wi-Fi"
          subtitle={wifi && !airplaneMode ? 'Connected to Studio' : 'Off'}
          trailing={
            <Switch
              aria-label="Wi-Fi"
              checked={wifi && !airplaneMode}
              disabled={airplaneMode}
              onCheckedChange={setWifi}
            />
          }
        />
      </GroupedList>
    </div>
  );
}

export function SegmentedControlDemo() {
  return (
    <div className="w-full max-w-sm">
      <SegmentedControl defaultValue="overview">
        <SegmentedControlList fullWidth>
          <SegmentedControlTrigger value="overview">
            Day
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="week">Week</SegmentedControlTrigger>
          <SegmentedControlTrigger value="month">Month</SegmentedControlTrigger>
        </SegmentedControlList>

        <SegmentedControlContent value="overview">
          <div className="rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4 text-[14px] text-[var(--fort-label-secondary)]">
            Showing today&apos;s schedule and reminders.
          </div>
        </SegmentedControlContent>
        <SegmentedControlContent value="week">
          <div className="rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4 text-[14px] text-[var(--fort-label-secondary)]">
            Showing 7-day focus summary.
          </div>
        </SegmentedControlContent>
        <SegmentedControlContent value="month">
          <div className="rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4 text-[14px] text-[var(--fort-label-secondary)]">
            Showing monthly overview.
          </div>
        </SegmentedControlContent>
      </SegmentedControl>
    </div>
  );
}

export function GroupedListDemo() {
  const [selectedTheme, setSelectedTheme] = React.useState('Automatic');
  const [notifMode, setNotifMode] = React.useState('Banners');
  const [passcodeOn, setPasscodeOn] = React.useState(true);
  const themes = ['Automatic', 'Light', 'Dark'];
  const notifModes = ['Banners', 'Badges', 'Muted'];

  return (
    <div className="w-full max-w-sm space-y-5">
      <GroupedList header="Preferences">
        <GroupedListItem
          leading={<Palette className="size-4" />}
          title="Appearance"
          trailing={selectedTheme}
          chevron
          onClick={() => {
            const next =
              themes[(themes.indexOf(selectedTheme) + 1) % themes.length];
            setSelectedTheme(next);
          }}
        />
        <GroupedListItem
          leading={<Bell className="size-4" />}
          title="Notifications"
          subtitle="Click a row to cycle its state"
          trailing={notifMode}
          chevron
          onClick={() => {
            const next =
              notifModes[(notifModes.indexOf(notifMode) + 1) % notifModes.length];
            setNotifMode(next);
          }}
        />
        <GroupedListItem
          leading={<Lock className="size-4" />}
          title="Passcode"
          trailing={passcodeOn ? 'On' : 'Off'}
          chevron
          onClick={() => setPasscodeOn((prev) => !prev)}
        />
      </GroupedList>

      <GroupedList footer="Every interactive row renders a real button or anchor with full keyboard focus.">
        <GroupedListItem
          leading={<Smartphone className="size-4" />}
          title="Device Name"
          trailing="Workstation"
        />
      </GroupedList>
    </div>
  );
}

export function AlertDialogDemo() {
  const [status, setStatus] = React.useState('Draft saved locally.');

  return (
    <div className="flex flex-col items-center gap-3">
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button variant="destructive-tinted">
              <Trash2 className="size-4" />
              Discard Draft
            </Button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes your unsaved changes from this session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Editing</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => setStatus('Draft discarded.')}
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="fort-ui text-[13px] text-[var(--fort-label-secondary)]">
        {status}
      </p>
    </div>
  );
}

export function InputDemo() {
  const [query, setQuery] = React.useState('');
  const [name, setName] = React.useState('');
  const items = ['Display & Brightness', 'Notifications', 'Privacy', 'Sound'];
  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full max-w-sm space-y-4 rounded-[18px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4">
      <SearchBar
        aria-label="Search settings"
        placeholder="Search settings"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
      />
      <div className="space-y-1.5">
        <label
          htmlFor="demo-device-name"
          className="fort-ui block text-[13px] font-medium text-[var(--fort-label-secondary)]"
        >
          Device Label
        </label>
        <Input
          id="demo-device-name"
          placeholder="Your device name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="fort-ui text-[13px] text-[var(--fort-label-secondary)]">
        {filtered.length > 0
          ? `Matching sections: ${filtered.join(', ')}`
          : 'No matching sections.'}
      </div>
    </div>
  );
}

export function SheetDemo() {
  const [autoLock, setAutoLock] = React.useState(true);

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="tinted">Open Sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Quick Controls</SheetTitle>
          <SheetDescription>
            Drag down or press Escape to dismiss this sheet.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4">
          <GroupedList>
            <GroupedListItem
              title="Auto-Lock Screen"
              subtitle="Lock when idle for 1 minute"
              trailing={
                <Switch
                  aria-label="Auto-Lock Screen"
                  checked={autoLock}
                  onCheckedChange={setAutoLock}
                />
              }
            />
          </GroupedList>
          <SheetClose render={<Button fullWidth>Done</Button>} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ActionSheetDemo() {
  const [lastAction, setLastAction] = React.useState('No action chosen yet.');

  return (
    <div className="flex flex-col items-center gap-3">
      <ActionSheet>
        <ActionSheetTrigger
          render={<Button variant="gray">Photo Options</Button>}
        />
        <ActionSheetContent>
          <ActionSheetGroup>
            <ActionSheetHeader>
              <ActionSheetTitle>Manage Selected Item</ActionSheetTitle>
              <ActionSheetDescription>
                Choose how to handle this file.
              </ActionSheetDescription>
            </ActionSheetHeader>
            <ActionSheetItem
              onClick={() => setLastAction('Copied link to clipboard.')}
            >
              Copy Link
            </ActionSheetItem>
            <ActionSheetItem
              onClick={() => setLastAction('Duplicated item.')}
            >
              Duplicate
            </ActionSheetItem>
            <ActionSheetItem
              variant="destructive"
              onClick={() => setLastAction('Moved item to Trash.')}
            >
              Delete Item
            </ActionSheetItem>
          </ActionSheetGroup>
          <ActionSheetCancel />
        </ActionSheetContent>
      </ActionSheet>
      <p className="fort-ui text-[13px] text-[var(--fort-label-secondary)]">
        {lastAction}
      </p>
    </div>
  );
}

export function CheckboxDemo() {
  const [items, setItems] = React.useState({
    nearby: true,
    sync: false,
    clipboard: true,
  });

  return (
    <div className="w-full max-w-xs rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4">
      <div className="flex flex-col gap-3">
        <Checkbox
          label="Nearby Share"
          checked={items.nearby}
          onCheckedChange={(checked) =>
            setItems((prev) => ({ ...prev, nearby: checked }))
          }
        />
        <Checkbox
          label="Cross-Device Sync"
          checked={items.sync}
          onCheckedChange={(checked) =>
            setItems((prev) => ({ ...prev, sync: checked }))
          }
        />
        <Checkbox
          label="Shared Clipboard"
          checked={items.clipboard}
          onCheckedChange={(checked) =>
            setItems((prev) => ({ ...prev, clipboard: checked }))
          }
        />
      </div>
    </div>
  );
}

export function SliderDemo() {
  const [brightness, setBrightness] = React.useState(68);

  return (
    <div className="w-full max-w-sm rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4">
      <div className="fort-ui mb-1 flex items-center justify-between text-[14px]">
        <span className="font-medium text-[var(--fort-label)]">Brightness</span>
        <span className="tabular-nums text-[var(--fort-label-secondary)]">
          {brightness}%
        </span>
      </div>
      <Slider
        thumbLabel="Brightness"
        min={0}
        max={100}
        value={brightness}
        onValueChange={(next) => setBrightness(next)}
      />
    </div>
  );
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="tinted">Synced</Badge>
      <Badge variant="filled">3</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="destructive">9+</Badge>
      <Badge variant="tinted" shape="rounded">
        Mobile
      </Badge>
    </div>
  );
}

export function NavBarDemo() {
  const [view, setView] = React.useState<'albums' | 'detail'>('detail');

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[20px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]">
      <NavBar>
        <div className="w-20">
          {view === 'detail' ? (
            <NavBarBack label="Albums" onClick={() => setView('albums')} />
          ) : null}
        </div>
        <NavBarTitle>{view === 'detail' ? 'Recents' : 'Library'}</NavBarTitle>
        <NavBarActions className="w-20">
          <Button
            variant="plain"
            size="sm"
            aria-label="New album"
            onClick={() =>
              setView((prev) => (prev === 'detail' ? 'albums' : 'detail'))
            }
          >
            <Plus className="size-4" />
          </Button>
        </NavBarActions>
      </NavBar>
      {view === 'albums' ? (
        <div className="py-2">
          <LargeTitle>Albums</LargeTitle>
          <p className="fort-ui px-4 pb-4 text-[14px] text-[var(--fort-label-secondary)]">
            Tap the + button to open Recents.
          </p>
        </div>
      ) : (
        <div className="p-4">
          <p className="fort-ui text-[14px] text-[var(--fort-label-secondary)]">
            Showing Recents view. Click Albums in the bar to go back.
          </p>
        </div>
      )}
    </div>
  );
}

export function TabBarDemo() {
  const [active, setActive] = React.useState('home');

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="fort-ui rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] px-4 py-3 text-[14px] text-[var(--fort-label-secondary)]">
        Active tab: <span className="font-semibold text-[var(--fort-label)]">{active}</span>
      </div>
      <TabBar floating>
        <TabBarItem
          icon={<Home className="size-5" />}
          label="Home"
          active={active === 'home'}
          onClick={() => setActive('home')}
        />
        <TabBarItem
          icon={<Compass className="size-5" />}
          label="Explore"
          active={active === 'explore'}
          onClick={() => setActive('explore')}
        />
        <TabBarItem
          icon={<Folder className="size-5" />}
          label="Files"
          badge={2}
          active={active === 'files'}
          onClick={() => setActive('files')}
        />
        <TabBarItem
          icon={<Settings className="size-5" />}
          label="Settings"
          active={active === 'settings'}
          onClick={() => setActive('settings')}
        />
      </TabBar>
    </div>
  );
}

function ToastTriggerButton() {
  const toast = useToast();

  return (
    <Button
      variant="tinted"
      onClick={() =>
        toast.add({
          title: 'Changes Synced',
          description: 'Your preferences were updated.',
          actionProps: {
            children: 'Undo',
            onClick: () => {
              toast.add({
                title: 'Reverted',
                description: 'Restored previous preferences.',
              });
            },
          },
        })
      }
    >
      Show Toast Banner
    </Button>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider position="top">
      <ToastTriggerButton />
    </ToastProvider>
  );
}

export function MenuDemo() {
  const [action, setAction] = React.useState('Choose an option from the menu.');

  return (
    <div className="flex flex-col items-center gap-3">
      <Menu>
        <MenuTrigger render={<Button variant="gray">Actions</Button>} />
        <MenuContent>
          <MenuGroup>
            <MenuGroupLabel>Document</MenuGroupLabel>
            <MenuItem onClick={() => setAction('Shared document link.')}>
              <span>Share</span>
              <Share className="size-4 text-[var(--fort-label-secondary)]" />
            </MenuItem>
            <MenuItem onClick={() => setAction('Pinned to top.')}>
              <span>Pin to Top</span>
              <Pin className="size-4 text-[var(--fort-label-secondary)]" />
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem
            destructive
            onClick={() => setAction('Deleted document.')}
          >
            <span>Delete</span>
            <Trash2 className="size-4" />
          </MenuItem>
        </MenuContent>
      </Menu>
      <p className="fort-ui text-[13px] text-[var(--fort-label-secondary)]">
        {action}
      </p>
    </div>
  );
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="tinted">Sync Info</Button>} />
      <PopoverContent>
        <PopoverTitle>Automatic Sync</PopoverTitle>
        <PopoverDescription>
          Components and theme tokens stay local in your repository.
        </PopoverDescription>
        <div className="mt-3 flex justify-end">
          <PopoverClose render={<Button size="sm">Close</Button>} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ActivityPillDemo() {
  const [playing, setPlaying] = React.useState(true);

  return (
    <div className="w-full max-w-sm">
      <ActivityPill
        compact={
          <>
            <span className="flex items-center gap-2 text-[13px] font-medium">
              <Music className="size-4 text-[#4da3ff]" />
              <span>Now Playing</span>
            </span>
            <span className="text-[12px] text-white/70">
              {playing ? 'Playing' : 'Paused'}
            </span>
          </>
        }
        expanded={
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-[12px] bg-[#0a66d6]/25 text-[#4da3ff]">
                <Music className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold">
                  Ambient Focus
                </p>
                <p className="truncate text-[12px] text-white/70">
                  {playing ? 'Playing on Workstation' : 'Playback paused'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                shape="pill"
                onClick={() => setPlaying((prev) => !prev)}
              >
                {playing ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}

export function SwipeRowDemo() {
  const [pinned, setPinned] = React.useState(false);
  const [archived, setArchived] = React.useState(false);

  if (archived) {
    return (
      <div className="fort-ui flex w-full max-w-sm items-center justify-between rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] px-4 py-3">
        <span className="text-[14px] text-[var(--fort-label-secondary)]">
          Message archived.
        </span>
        <Button
          size="sm"
          variant="plain"
          onClick={() => setArchived(false)}
        >
          Undo
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <SwipeRow
        actions={[
          {
            label: pinned ? 'Unpin' : 'Pin',
            icon: <Pin className="size-4" />,
            variant: 'tinted',
            onAction: () => setPinned((prev) => !prev),
          },
          {
            label: 'Archive',
            icon: <Archive className="size-4" />,
            variant: 'destructive',
            onAction: () => setArchived(true),
          },
        ]}
      >
        <div className="flex items-center gap-2">
          <span className="truncate text-[15px] font-medium text-[var(--fort-label)]">
            Design Review Notes
          </span>
          {pinned ? <Badge variant="tinted">Pinned</Badge> : null}
        </div>
        <p className="truncate text-[13px] text-[var(--fort-label-secondary)]">
          Drag left or press the menu button for actions.
        </p>
      </SwipeRow>
    </div>
  );
}

export function TextareaDemo() {
  const [notes, setNotes] = React.useState('');

  return (
    <div className="w-full max-w-sm space-y-2 rounded-[18px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4">
      <label
        htmlFor="demo-notes"
        className="fort-ui block text-[13px] font-medium text-[var(--fort-label-secondary)]"
      >
        Release Notes
      </label>
      <Textarea
        id="demo-notes"
        placeholder="Write a short summary..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <p className="fort-ui text-right text-[12px] tabular-nums text-[var(--fort-label-secondary)]">
        {notes.length} characters
      </p>
    </div>
  );
}

export function SelectDemo() {
  const [value, setValue] = React.useState<string>('never');

  return (
    <div className="w-full max-w-xs space-y-2">
      <Select value={value} onValueChange={(next) => setValue(next ?? 'never')}>
        <SelectTrigger aria-label="Auto-Lock interval" placeholder="Choose time" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Auto-Lock</SelectLabel>
            <SelectItem value="30s">30 Seconds</SelectItem>
            <SelectItem value="1m">1 Minute</SelectItem>
            <SelectItem value="5m">5 Minutes</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function RadioGroupDemo() {
  const [ringtone, setRingtone] = React.useState('reflection');
  const [syncMode, setSyncMode] = React.useState('wifi');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="overflow-hidden rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]">
        <RadioGroup
          value={ringtone}
          onValueChange={setRingtone}
          className="gap-0 divide-y divide-[var(--fort-separator)]"
        >
          <RadioListItem value="reflection" title="Reflection" subtitle="Default" />
          <RadioListItem value="chimes" title="Chimes" />
          <RadioListItem value="radial" title="Radial" />
        </RadioGroup>
      </div>

      <RadioGroup
        value={syncMode}
        onValueChange={setSyncMode}
        className="flex-row flex-wrap gap-4 px-1"
      >
        <RadioItem value="wifi" label="Wi-Fi Only" />
        <RadioItem value="any" label="Wi-Fi & Cellular" />
      </RadioGroup>
    </div>
  );
}

export function OTPInputDemo() {
  const [code, setCode] = React.useState('');

  return (
    <div className="flex flex-col items-center gap-3">
      <OTPInput length={6} value={code} onValueChange={setCode} />
      <p className="fort-ui text-[13px] text-[var(--fort-label-secondary)]">
        {code.length === 6
          ? `Entered code: ${code}`
          : `Enter 6-digit verification code (${code.length}/6)`}
      </p>
    </div>
  );
}

export function ProgressDemo() {
  const [value, setValue] = React.useState(64);

  return (
    <div className="w-full max-w-sm space-y-4 rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4">
      <Progress label="Backup Progress" showValue value={value} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] text-[var(--fort-label-secondary)]">
          <Spinner size="sm" />
          <span>Syncing assets</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="gray"
            onClick={() => setValue((prev) => Math.max(0, prev - 20))}
          >
            -20%
          </Button>
          <Button
            size="sm"
            variant="tinted"
            onClick={() => setValue((prev) => Math.min(100, prev + 20))}
          >
            +20%
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>SF</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AccordionDemo() {
  return (
    <div className="w-full max-w-sm">
      <Accordion defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Copy-Paste Ownership</AccordionTrigger>
          <AccordionContent>
            Components are copied directly into your repository so you can edit
            markup and tokens freely.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Keyboard &amp; Focus Support</AccordionTrigger>
          <AccordionContent>
            Built on Base UI primitives for keyboard navigation, ARIA states, and
            focus restoration.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function CardDemo() {
  const [saved, setSaved] = React.useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Cloud Backup</CardTitle>
        <CardDescription>
          Encrypted snapshot stored automatically when charging.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[14px] text-[var(--fort-label-secondary)]">
          {saved ? 'Manual backup queued.' : 'Ready to run a manual snapshot.'}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          variant={saved ? 'tinted' : 'filled'}
          onClick={() => setSaved((prev) => !prev)}
        >
          {saved ? 'Queued' : 'Back Up Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SkeletonDemo() {
  return (
    <div className="w-full max-w-sm rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}
