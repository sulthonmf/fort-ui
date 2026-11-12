import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useFortTheme, type FortThemeColors } from '@/lib/fort-tokens';

export type ButtonVariant =
  | 'filled'
  | 'tinted'
  | 'gray'
  | 'plain'
  | 'destructive'
  | 'destructive-tinted';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rounded' | 'pill';

const SIZE_MAP: Record<ButtonSize, { height: number; px: number; fontSize: number; radius: number }> = {
  sm: { height: 36, px: 14, fontSize: 14, radius: 10 },
  md: { height: 44, px: 16, fontSize: 15, radius: 12 },
  lg: { height: 48, px: 20, fontSize: 16, radius: 14 },
};

function getVariantColors(variant: ButtonVariant, theme: FortThemeColors) {
  const map: Record<ButtonVariant, { bg: string; fg: string }> = {
    filled: { bg: theme.tint, fg: '#ffffff' },
    tinted: { bg: theme.tintSoft, fg: theme.tintText },
    gray: { bg: theme.surfaceMuted, fg: theme.label },
    plain: { bg: 'transparent', fg: theme.tintText },
    destructive: { bg: theme.destructive, fg: '#ffffff' },
    'destructive-tinted': { bg: theme.destructiveSoft, fg: theme.destructiveText },
  };
  return map[variant];
}

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Touch-first native action button with tactile press scale and semantic theme tokens.
 */
export function Button({
  children,
  variant = 'filled',
  size = 'md',
  shape = 'rounded',
  fullWidth = false,
  disabled = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const theme = useFortTheme();
  const colors = getVariantColors(variant, theme);
  const metrics = SIZE_MAP[size];
  const borderRadius = shape === 'pill' ? 999 : metrics.radius;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          height: metrics.height,
          paddingHorizontal: metrics.px,
          borderRadius,
          backgroundColor: colors.bg,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
          transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text
          style={[
            styles.label,
            { color: colors.fg, fontSize: metrics.fontSize },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
  },
});
