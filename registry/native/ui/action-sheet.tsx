import * as React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

interface ActionSheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ActionSheetContext =
  React.createContext<ActionSheetContextValue | null>(null);

function useActionSheetContext() {
  const ctx = React.useContext(ActionSheetContext);
  if (!ctx) {
    throw new Error(
      'ActionSheet subcomponents must be used within ActionSheet.',
    );
  }
  return ctx;
}

export interface ActionSheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * Stacked bottom action sheet with separated cancel card for React Native.
 */
export function ActionSheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: ActionSheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <ActionSheetContext.Provider value={{ open, setOpen }}>
      {children}
    </ActionSheetContext.Provider>
  );
}

export function ActionSheetTrigger({
  children,
}: {
  children: React.ReactElement<{ onPress?: () => void }>;
}) {
  const { setOpen } = useActionSheetContext();
  return React.cloneElement(children, {
    onPress: () => {
      children.props.onPress?.();
      setOpen(true);
    },
  });
}

export function ActionSheetContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { open, setOpen } = useActionSheetContext();

  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Close action sheet"
          onPress={() => setOpen(false)}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.stack, style]}>{children}</View>
      </View>
    </Modal>
  );
}

export function ActionSheetGroup({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useFortTheme();
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <View
      style={[
        styles.group,
        {
          backgroundColor: theme.surface,
          borderColor: theme.separator,
          borderWidth: theme.hairline,
        },
        style,
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
  );
}

export function ActionSheetHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function ActionSheetTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  const theme = useFortTheme();
  return (
    <Text style={[styles.title, { color: theme.labelSecondary }, style]}>
      {children}
    </Text>
  );
}

export function ActionSheetDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  const theme = useFortTheme();
  return (
    <Text style={[styles.description, { color: theme.labelSecondary }, style]}>
      {children}
    </Text>
  );
}

export interface ActionSheetItemProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ActionSheetItem({
  children,
  variant = 'default',
  onPress,
  style,
}: ActionSheetItemProps) {
  const theme = useFortTheme();
  const { setOpen } = useActionSheetContext();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        onPress?.();
        setOpen(false);
      }}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: pressed ? theme.surfaceMuted : 'transparent' },
        style,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          {
            color:
              variant === 'destructive'
                ? theme.destructiveText
                : theme.tintText,
          },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export function ActionSheetCancel({
  children = 'Cancel',
  onPress,
  style,
}: {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useFortTheme();
  const { setOpen } = useActionSheetContext();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        onPress?.();
        setOpen(false);
      }}
      style={({ pressed }) => [
        styles.cancelCard,
        {
          backgroundColor: pressed ? theme.surfaceMuted : theme.surface,
          borderColor: theme.separator,
          borderWidth: theme.hairline,
        },
        style,
      ]}
    >
      <Text style={[styles.cancelText, { color: theme.tintText }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  stack: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    gap: 8,
  },
  group: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    marginTop: 2,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  item: {
    minHeight: 52,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 17,
    fontWeight: '400',
  },
  cancelCard: {
    minHeight: 52,
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 17,
    fontWeight: '600',
  },
});

