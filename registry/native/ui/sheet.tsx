import * as React from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) {
    throw new Error('Sheet subcomponents must be used within Sheet.');
  }
  return ctx;
}

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * Swipe-to-dismiss bottom modal sheet for React Native.
 */
export function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: SheetProps) {
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
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  children,
}: {
  children: React.ReactElement<{ onPress?: () => void }>;
}) {
  const { setOpen } = useSheetContext();
  return React.cloneElement(children, {
    onPress: () => {
      children.props.onPress?.();
      setOpen(true);
    },
  });
}

export function SheetClose({
  children,
}: {
  children: React.ReactElement<{ onPress?: () => void }>;
}) {
  const { setOpen } = useSheetContext();
  return React.cloneElement(children, {
    onPress: () => {
      children.props.onPress?.();
      setOpen(false);
    },
  });
}

export interface SheetContentProps {
  children: React.ReactNode;
  showHandle?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function SheetContent({
  children,
  showHandle = true,
  style,
}: SheetContentProps) {
  const theme = useFortTheme();
  const { open, setOpen } = useSheetContext();
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (open) {
      translateY.setValue(0);
    }
  }, [open, translateY]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          gesture.dy > 6 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
        onPanResponderMove: (_, gesture) => {
          if (gesture.dy > 0) {
            translateY.setValue(gesture.dy);
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dy > 90 || gesture.vy > 0.9) {
            Animated.timing(translateY, {
              toValue: 400,
              duration: 180,
              useNativeDriver: true,
            }).start(() => setOpen(false));
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 4,
            }).start();
          }
        },
      }),
    [setOpen, translateY],
  );

  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Close sheet"
          onPress={() => setOpen(false)}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.sheet,
            {
              backgroundColor: theme.surface,
              borderColor: theme.separator,
              borderWidth: theme.hairline,
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          {showHandle ? (
            <View style={styles.handleRow}>
              <View
                style={[
                  styles.handle,
                  { backgroundColor: theme.surfacePressed },
                ]}
              />
            </View>
          ) : null}
          <View style={styles.body}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export function SheetHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function SheetTitle({
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

export function SheetDescription({
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 999,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 14,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

