import { StyleSheet, useColorScheme } from 'react-native';

export interface FortThemeColors {
  bg: string;
  surface: string;
  surfaceMuted: string;
  surfacePressed: string;
  label: string;
  labelSecondary: string;
  separator: string;
  tint: string;
  tintText: string;
  tintSoft: string;
  destructive: string;
  destructiveText: string;
  destructiveSoft: string;
  switchOn: string;
  switchOff: string;
  hairline: number;
}

export const fortTokens: Record<'light' | 'dark', FortThemeColors> = {
  light: {
    bg: '#f2f2f7',
    surface: '#ffffff',
    surfaceMuted: '#e5e5ea',
    surfacePressed: '#d1d1d6',
    label: '#111113',
    labelSecondary: '#52525b',
    separator: 'rgba(60, 60, 67, 0.14)',
    tint: '#0066cc',
    tintText: '#0055b3',
    tintSoft: 'rgba(0, 102, 204, 0.12)',
    destructive: '#d70015',
    destructiveText: '#c20013',
    destructiveSoft: 'rgba(215, 0, 21, 0.11)',
    switchOn: '#248a3d',
    switchOff: 'rgba(120, 120, 128, 0.28)',
    hairline: StyleSheet.hairlineWidth,
  },
  dark: {
    bg: '#000000',
    surface: '#1c1c1e',
    surfaceMuted: '#2c2c2e',
    surfacePressed: '#3a3a3c',
    label: '#f5f5f7',
    labelSecondary: '#a1a1aa',
    separator: 'rgba(255, 255, 255, 0.14)',
    tint: '#0a66d6',
    tintText: '#4da3ff',
    tintSoft: 'rgba(77, 163, 255, 0.16)',
    destructive: '#d70015',
    destructiveText: '#ff6961',
    destructiveSoft: 'rgba(255, 105, 97, 0.16)',
    switchOn: '#289e47',
    switchOff: 'rgba(120, 120, 128, 0.38)',
    hairline: StyleSheet.hairlineWidth,
  },
};

export function useFortTheme(): FortThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? fortTokens.dark : fortTokens.light;
}
