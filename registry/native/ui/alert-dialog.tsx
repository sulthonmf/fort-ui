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

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialogContext =
  React.createContext<AlertDialogContextValue | null>(null);

function useAlertDialogContext() {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) {
    throw new Error(
      'AlertDialog subcomponents must be used within AlertDialog.',
    );
  }
  return ctx;
}

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * Centered confirmation alert dialog with hairline action dividers for React Native.
 */
export function AlertDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) {
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
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export interface AlertDialogTriggerProps {
  children: React.ReactElement<{ onPress?: () => void }>;
}

export function AlertDialogTrigger({ children }: AlertDialogTriggerProps) {
  const { setOpen } = useAlertDialogContext();
  return React.cloneElement(children, {
    onPress: () => {
      children.props.onPress?.();
      setOpen(true);
    },
  });
}

export interface AlertDialogContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AlertDialogContent({ children, style }: AlertDialogContentProps) {
  const theme = useFortTheme();
  const { open, setOpen } = useAlertDialogContext();

  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: theme.surface,
              borderColor: theme.separator,
              borderWidth: theme.hairline,
            },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

export function AlertDialogHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function AlertDialogTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  const theme = useFortTheme();
  return (
    <Text style={[styles.title, { color: theme.label }, style]}>
      {children}
    </Text>
  );
}

export function AlertDialogDescription({
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

export function AlertDialogFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useFortTheme();
  const items = React.Children.toArray(children).filter(Boolean);
  const stacked = items.length > 2;

  return (
    <View
      style={[
        styles.footer,
        {
          flexDirection: stacked ? 'column' : 'row',
          borderTopColor: theme.separator,
          borderTopWidth: theme.hairline,
        },
        style,
      ]}
    >
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 ? (
            <View
              style={
                stacked
                  ? { height: theme.hairline, backgroundColor: theme.separator }
                  : { width: theme.hairline, backgroundColor: theme.separator }
              }
            />
          ) : null}
          <View style={stacked ? undefined : styles.actionSlot}>{child}</View>
        </React.Fragment>
      ))}
    </View>
  );
}

export interface AlertDialogActionProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AlertDialogAction({
  children,
  variant = 'default',
  onPress,
  style,
}: AlertDialogActionProps) {
  const theme = useFortTheme();
  const { setOpen } = useAlertDialogContext();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        onPress?.();
        setOpen(false);
      }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? theme.surfaceMuted : 'transparent' },
        style,
      ]}
    >
      <Text
        style={[
          styles.actionText,
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

export function AlertDialogCancel({
  children = 'Cancel',
  onPress,
  style,
}: {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useFortTheme();
  const { setOpen } = useAlertDialogContext();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        onPress?.();
        setOpen(false);
      }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? theme.surfaceMuted : 'transparent' },
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    width: '100%',
  },
  actionSlot: {
    flex: 1,
  },
  button: {
    minHeight: 46,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

