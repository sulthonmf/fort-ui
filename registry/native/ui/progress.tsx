import * as React from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export interface ProgressProps {
  value?: number | null;
  max?: number;
  label?: React.ReactNode;
  showValue?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Clean linear progress indicator matching fort-ui semantic tokens.
 */
export function Progress({
  value = 0,
  max = 100,
  label,
  showValue = false,
  style,
}: ProgressProps) {
  const theme = useFortTheme();
  const safeMax = max > 0 ? max : 100;
  const clampedPct = Math.max(
    0,
    Math.min(100, ((value ?? 0) / safeMax) * 100),
  );
  const progressAnim = React.useRef(new Animated.Value(clampedPct)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: clampedPct,
      duration: 240,
      useNativeDriver: false,
    }).start();
  }, [clampedPct, progressAnim]);

  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: safeMax, now: Math.round(value ?? 0) }}
      style={[styles.wrapper, style]}
    >
      {label || showValue ? (
        <View style={styles.header}>
          {label ? (
            <Text style={[styles.label, { color: theme.label }]}>{label}</Text>
          ) : (
            <View />
          )}
          {showValue ? (
            <Text style={[styles.value, { color: theme.labelSecondary }]}>
              {Math.round(clampedPct)}%
            </Text>
          ) : null}
        </View>
      ) : null}
      <View style={[styles.track, { backgroundColor: theme.surfaceMuted }]}>
        <Animated.View
          style={[
            styles.indicator,
            { backgroundColor: theme.tint, width },
          ]}
        />
      </View>
    </View>
  );
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Native activity indicator spinner using fort-ui labelSecondary token.
 */
export function Spinner({ size = 'md', color, style }: SpinnerProps) {
  const theme = useFortTheme();
  const nativeSize = size === 'lg' ? 'large' : 'small';

  return (
    <ActivityIndicator
      size={nativeSize}
      color={color ?? theme.labelSecondary}
      style={style}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontVariant: ['tabular-nums'],
  },
  track: {
    height: 6,
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    borderRadius: 999,
  },
});

