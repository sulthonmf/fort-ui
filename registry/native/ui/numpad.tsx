import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export interface NumpadKey {
  value: string;
  sub?: string;
}

const DEFAULT_KEYS: NumpadKey[] = [
  { value: '1', sub: '' },
  { value: '2', sub: 'ABC' },
  { value: '3', sub: 'DEF' },
  { value: '4', sub: 'GHI' },
  { value: '5', sub: 'JKL' },
  { value: '6', sub: 'MNO' },
  { value: '7', sub: 'PQRS' },
  { value: '8', sub: 'TUV' },
  { value: '9', sub: 'WXYZ' },
];

export interface NumpadProps {
  onKeyPress?: (key: string) => void;
  onDelete?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  keyStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Mobile-first 3x4 numeric keypad for Expo and React Native with semantic theme colors.
 */
export function Numpad({
  onKeyPress,
  onDelete,
  leftAction,
  rightAction,
  disabled = false,
  style,
  keyStyle,
  textStyle,
}: NumpadProps) {
  const theme = useFortTheme();

  return (
    <View style={[styles.container, style]}>
      {/* 1 through 9 */}
      {DEFAULT_KEYS.map((key) => (
        <Pressable
          key={key.value}
          accessibilityRole="button"
          accessibilityLabel={key.value}
          disabled={disabled}
          onPress={() => onKeyPress?.(key.value)}
          style={({ pressed }) => [
            styles.key,
            {
              backgroundColor: theme.surfaceMuted,
              opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
              transform: [{ scale: pressed && !disabled ? 0.92 : 1 }],
            },
            keyStyle,
          ]}
        >
          <Text style={[styles.number, { color: theme.label }, textStyle]}>
            {key.value}
          </Text>
          {key.sub ? (
            <Text
              style={[
                styles.sub,
                { color: theme.labelSecondary },
              ]}
            >
              {key.sub}
            </Text>
          ) : null}
        </Pressable>
      ))}

      {/* Row 4: Left Action */}
      <View style={styles.actionCell}>{leftAction ?? null}</View>

      {/* Row 4: 0 Key */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="0"
        disabled={disabled}
        onPress={() => onKeyPress?.('0')}
        style={({ pressed }) => [
          styles.key,
          {
            backgroundColor: theme.surfaceMuted,
            opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
            transform: [{ scale: pressed && !disabled ? 0.92 : 1 }],
          },
          keyStyle,
        ]}
      >
        <Text style={[styles.number, { color: theme.label }, textStyle]}>0</Text>
      </Pressable>

      {/* Row 4: Right Action */}
      <View style={styles.actionCell}>
        {rightAction !== undefined ? (
          rightAction
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Delete"
            disabled={disabled}
            onPress={() => onDelete?.()}
            style={({ pressed }) => [
              styles.actionButton,
              { opacity: disabled ? 0.45 : pressed ? 0.6 : 1 },
            ]}
          >
            <Text style={[styles.actionText, { color: theme.label }]}>⌫</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 280,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignSelf: 'center',
    rowGap: 14,
  },
  key: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 26,
    fontWeight: '500',
    lineHeight: 28,
  },
  sub: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  actionCell: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 24,
    fontWeight: '500',
  },
});

