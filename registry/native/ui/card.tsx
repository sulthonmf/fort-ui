import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type TextProps,
  type ViewProps,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

/**
 * Grouped surface container with hairline border matching fort-ui web cards.
 */
export function Card({ style, ...props }: ViewProps) {
  const theme = useFortTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.separator,
          borderWidth: theme.hairline,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function CardHeader({ style, ...props }: ViewProps) {
  return <View style={[styles.header, style]} {...props} />;
}

export function CardTitle({ style, ...props }: TextProps) {
  const theme = useFortTheme();
  return (
    <Text style={[styles.title, { color: theme.label }, style]} {...props} />
  );
}

export function CardDescription({ style, ...props }: TextProps) {
  const theme = useFortTheme();
  return (
    <Text
      style={[styles.description, { color: theme.labelSecondary }, style]}
      {...props}
    />
  );
}

export function CardContent({ style, ...props }: ViewProps) {
  return <View style={[styles.content, style]} {...props} />;
}

export function CardFooter({ style, ...props }: ViewProps) {
  const theme = useFortTheme();
  return (
    <View
      style={[
        styles.footer,
        {
          borderTopColor: theme.separator,
          borderTopWidth: theme.hairline,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
