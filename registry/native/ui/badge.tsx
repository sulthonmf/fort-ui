import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { useFortTheme, type FortThemeColors } from '@/lib/fort-tokens';

export type BadgeVariant =
  | 'neutral'
  | 'tinted'
  | 'filled'
  | 'success'
  | 'destructive';

function getVariantColors(variant: BadgeVariant, theme: FortThemeColors) {
  const map: Record<BadgeVariant, { bg: string; fg: string }> = {
    neutral: { bg: theme.surfaceMuted, fg: theme.label },
    tinted: { bg: theme.tintSoft, fg: theme.tintText },
    filled: { bg: theme.tint, fg: '#ffffff' },
    success: { bg: theme.switchOn, fg: '#ffffff' },
    destructive: { bg: theme.destructive, fg: '#ffffff' },
  };
  return map[variant];
}

export interface BadgeProps extends Omit<ViewProps, 'style'> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  shape?: 'pill' | 'rounded';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Compact status or counter badge using fort-ui native theme tokens.
 */
export function Badge({
  children,
  variant = 'tinted',
  shape = 'pill',
  style,
  textStyle,
  ...props
}: BadgeProps) {
  const theme = useFortTheme();
  const colors = getVariantColors(variant, theme);

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.bg,
          borderRadius: shape === 'pill' ? 999 : 7,
        },
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: colors.fg }, textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
