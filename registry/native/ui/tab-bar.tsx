import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export interface TabBarProps {
  floating?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Mobile bottom tab bar with badge counters and optional floating pill surface.
 */
export function TabBar({ floating = false, children, style }: TabBarProps) {
  const theme = useFortTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.bar,
        { backgroundColor: theme.surface, borderColor: theme.separator },
        floating
          ? [styles.floating, { borderWidth: theme.hairline }]
          : [styles.docked, { borderTopWidth: theme.hairline }],
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface TabBarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number | string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function TabBarItem({
  icon,
  label,
  active = false,
  badge,
  disabled = false,
  onPress,
  style,
}: TabBarItemProps) {
  const theme = useFortTheme();

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        {
          opacity: disabled ? 0.45 : 1,
          transform: [{ scale: pressed && !disabled ? 0.95 : 1 }],
        },
        style,
      ]}
    >
      <View style={styles.iconWrap}>
        {icon}
        {badge !== undefined && badge !== 0 ? (
          <View
            style={[styles.badge, { backgroundColor: theme.destructive }]}
          >
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          { color: active ? theme.tintText : theme.labelSecondary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  docked: {
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 10,
  },
  floating: {
    maxWidth: 420,
    alignSelf: 'center',
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  item: {
    flex: 1,
    minHeight: 48,
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconWrap: {
    position: 'relative',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 999,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});

