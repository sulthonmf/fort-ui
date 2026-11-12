import * as React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

interface SegmentedControlContextValue {
  value: string;
  onChange: (nextValue: string) => void;
  values: string[];
  registerValue: (itemValue: string) => void;
}

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControlContext() {
  const ctx = React.useContext(SegmentedControlContext);
  if (!ctx) {
    throw new Error(
      'SegmentedControl subcomponents must be used within SegmentedControl.',
    );
  }
  return ctx;
}

export interface SegmentedControlProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Segmented tab switcher with an animated active indicator for React Native.
 */
export function SegmentedControl({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  children,
  style,
}: SegmentedControlProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [values, setValues] = React.useState<string[]>([]);
  const activeValue = controlledValue ?? uncontrolledValue;

  const registerValue = React.useCallback((itemValue: string) => {
    setValues((prev) => (prev.includes(itemValue) ? prev : [...prev, itemValue]));
  }, []);

  const onChange = React.useCallback(
    (nextValue: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [controlledValue, onValueChange],
  );

  return (
    <SegmentedControlContext.Provider
      value={{ value: activeValue, onChange, values, registerValue }}
    >
      <View style={[styles.root, style]}>{children}</View>
    </SegmentedControlContext.Provider>
  );
}

export interface SegmentedControlListProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControlList({
  children,
  fullWidth = true,
  style,
}: SegmentedControlListProps) {
  const theme = useFortTheme();
  const { value, values } = useSegmentedControlContext();
  const [containerWidth, setContainerWidth] = React.useState(0);
  const translateX = React.useRef(new Animated.Value(0)).current;

  const count = Math.max(values.length, React.Children.count(children), 1);
  const activeIndex = Math.max(values.indexOf(value), 0);
  const innerWidth = Math.max(containerWidth - 6, 0);
  const pillWidth = innerWidth / count;

  React.useEffect(() => {
    if (pillWidth <= 0) return;
    Animated.spring(translateX, {
      toValue: activeIndex * pillWidth,
      useNativeDriver: true,
      tension: 180,
      friction: 22,
    }).start();
  }, [activeIndex, pillWidth, translateX]);

  function handleLayout(event: LayoutChangeEvent) {
    setContainerWidth(event.nativeEvent.layout.width);
  }

  return (
    <View
      accessibilityRole="tablist"
      onLayout={handleLayout}
      style={[
        styles.list,
        { backgroundColor: theme.surfaceMuted },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {pillWidth > 0 ? (
        <Animated.View
          style={[
            styles.indicator,
            {
              width: pillWidth,
              backgroundColor: theme.surface,
              transform: [{ translateX }],
            },
          ]}
        />
      ) : null}
      {children}
    </View>
  );
}

export interface SegmentedControlTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControlTrigger({
  value,
  children,
  disabled = false,
  style,
}: SegmentedControlTriggerProps) {
  const theme = useFortTheme();
  const { value: activeValue, onChange, registerValue } =
    useSegmentedControlContext();

  React.useEffect(() => {
    registerValue(value);
  }, [registerValue, value]);

  const active = activeValue === value;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      onPress={() => onChange(value)}
      style={[styles.trigger, disabled && styles.disabled, style]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.triggerText,
          {
            color: active ? theme.label : theme.labelSecondary,
            fontWeight: active ? '600' : '500',
          },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export interface SegmentedControlContentProps {
  value: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControlContent({
  value,
  children,
  style,
}: SegmentedControlContentProps) {
  const ctx = useSegmentedControlContext();
  if (ctx.value !== value) return null;
  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    gap: 12,
  },
  list: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 3,
    alignSelf: 'flex-start',
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'stretch',
  },
  indicator: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 3,
    borderRadius: 7,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  trigger: {
    flex: 1,
    minHeight: 32,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  triggerText: {
    fontSize: 13,
  },
  disabled: {
    opacity: 0.45,
  },
});
