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

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

/**
 * Circular touch-first checkbox toggle for React Native.
 */
export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  onCheckedChange,
  disabled = false,
  label,
  style,
  labelStyle,
}: CheckboxProps) {
  const theme = useFortTheme();
  const [uncontrolledChecked, setUncontrolledChecked] =
    React.useState(defaultChecked);
  const isChecked = controlledChecked ?? uncontrolledChecked;
  const active = isChecked || indeterminate;

  function toggle() {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) {
      setUncontrolledChecked(next);
    }
    onCheckedChange?.(next);
  }

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: indeterminate ? 'mixed' : isChecked,
        disabled,
      }}
      hitSlop={10}
      disabled={disabled}
      onPress={toggle}
      style={({ pressed }) => [
        styles.row,
        { opacity: disabled ? 0.45 : pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <View
        style={[
          styles.circle,
          {
            borderColor: active ? theme.tint : theme.labelSecondary,
            backgroundColor: active ? theme.tint : 'transparent',
          },
        ]}
      >
        {active ? (
          <Text style={styles.mark}>{indeterminate ? '−' : '✓'}</Text>
        ) : null}
      </View>
      {label ? (
        typeof label === 'string' || typeof label === 'number' ? (
          <Text style={[styles.label, { color: theme.label }, labelStyle]}>
            {label}
          </Text>
        ) : (
          label
        )
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 32,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
  },
  label: {
    fontSize: 15,
  },
});

