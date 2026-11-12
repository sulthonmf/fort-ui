import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from '@/components/component-preview';
import { DonateButton } from '@/components/donate-button';
import { ProCallout } from '@/components/pro-callout';
import {
  AccordionDemo,
  ActionSheetDemo,
  ActivityPillDemo,
  AlertDialogDemo,
  AvatarDemo,
  BadgeDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  GroupedListDemo,
  InputDemo,
  MenuDemo,
  NavBarDemo,
  OTPInputDemo,
  PopoverDemo,
  ProgressDemo,
  RadioGroupDemo,
  SegmentedControlDemo,
  SelectDemo,
  SheetDemo,
  SkeletonDemo,
  SliderDemo,
  SwipeRowDemo,
  SwitchDemo,
  TabBarDemo,
  TextareaDemo,
  ToastDemo,
} from '@/components/demos/component-demos';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    DonateButton,
    ProCallout,
    ButtonDemo,
    SwitchDemo,
    SegmentedControlDemo,
    GroupedListDemo,
    ActivityPillDemo,
  AlertDialogDemo,
    InputDemo,
    SheetDemo,
    ActionSheetDemo,
    CheckboxDemo,
    SliderDemo,
    BadgeDemo,
    NavBarDemo,
    TabBarDemo,
    ToastDemo,
    MenuDemo,
    PopoverDemo,
    SwipeRowDemo,
    TextareaDemo,
    SelectDemo,
    RadioGroupDemo,
    OTPInputDemo,
    ProgressDemo,
    AvatarDemo,
    AccordionDemo,
    CardDemo,
    SkeletonDemo,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
