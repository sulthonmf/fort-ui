import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export type InputProps = TextInputProps;

/**
 * Soft-filled native text input with subtle focus tint border.
 */
export function Input({
  style,
  placeholderTextColor,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const theme = useFortTheme();
  const [focused, setFocused] = React.useState(false);

  return (
    <TextInput
      placeholderTextColor={placeholderTextColor ?? theme.labelSecondary}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      style={[
        styles.base,
        {
          color: theme.label,
          backgroundColor: focused ? theme.surface : theme.surfaceMuted,
          borderColor: focused ? theme.tint : 'transparent',
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    height: 44,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    fontSize: 15,
  },
});
