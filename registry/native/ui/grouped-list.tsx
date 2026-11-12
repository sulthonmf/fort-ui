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

export interface GroupedListProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Inset grouped settings container with hairline dividers for React Native.
 */
export function GroupedList({
  header,
  footer,
  children,
  style,
}: GroupedListProps) {
  const theme = useFortTheme();
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <View style={style}>
      {header ? (
        <Text style={[styles.header, { color: theme.labelSecondary }]}>
          {header}
        </Text>
      ) : null}
      <View
        style={[
          styles.group,
          {
            backgroundColor: theme.surface,
            borderColor: theme.separator,
            borderWidth: theme.hairline,
          },
        ]}
      >
        {items.map((child, index) => (
          <React.Fragment key={index}>
            {index > 0 ? (
              <View
                style={{
                  height: theme.hairline,
                  backgroundColor: theme.separator,
                }}
              />
            ) : null}
            {child}
          </React.Fragment>
        ))}
      </View>
      {footer ? (
        <Text style={[styles.footer, { color: theme.labelSecondary }]}>
          {footer}
        </Text>
      ) : null}
    </View>
  );
}

export interface GroupedListItemProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  chevron?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function GroupedListItem({
  title,
  subtitle,
  leading,
  trailing,
  chevron = false,
  destructive = false,
  disabled = false,
  onPress,
  style,
}: GroupedListItemProps) {
  const theme = useFortTheme();

  const inner = (
    <>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.body}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: destructive ? theme.destructiveText : theme.label },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={[styles.subtitle, { color: theme.labelSecondary }]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ? (
        <View style={styles.trailing}>
          {typeof trailing === 'string' || typeof trailing === 'number' ? (
            <Text style={[styles.trailingText, { color: theme.labelSecondary }]}>
              {trailing}
            </Text>
          ) : (
            trailing
          )}
        </View>
      ) : null}
      {chevron ? (
        <Text style={[styles.chevron, { color: theme.labelSecondary }]}>›</Text>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.row,
          {
            backgroundColor: pressed ? theme.surfaceMuted : 'transparent',
            opacity: disabled ? 0.45 : 1,
          },
          style,
        ]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View style={[styles.row, { opacity: disabled ? 0.45 : 1 }, style]}>
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 6,
    fontSize: 13,
    fontWeight: '500',
  },
  group: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 6,
    fontSize: 12,
    lineHeight: 16,
  },
  row: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailingText: {
    fontSize: 14,
  },
  chevron: {
    fontSize: 20,
    lineHeight: 22,
    marginLeft: 2,
  },
});
