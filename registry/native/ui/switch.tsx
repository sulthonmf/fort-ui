import * as React from 'react';
import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export type SwitchProps = RNSwitchProps;

/**
 * Native toggle switch pre-wired with fort-ui semantic track colors.
 */
export function Switch({ trackColor, thumbColor, ...props }: SwitchProps) {
  const theme = useFortTheme();

  return (
    <RNSwitch
      trackColor={
        trackColor ?? {
          false: theme.switchOff,
          true: theme.switchOn,
        }
      }
      thumbColor={thumbColor ?? '#ffffff'}
      ios_backgroundColor={theme.switchOff}
      {...props}
    />
  );
}
