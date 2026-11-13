import * as React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export interface WheelPickerItem {
  value: string;
  label: string;
}

export interface WheelPickerProps {
  items: (WheelPickerItem | string)[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  itemHeight?: number;
  visibleCount?: number;
  style?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
}

/**
 * Cupertino drum roll wheel picker for Expo and React Native with snap physics.
 */
export function WheelPicker({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  itemHeight = 44,
  visibleCount = 5,
  style,
  itemTextStyle,
}: WheelPickerProps) {
  const theme = useFortTheme();
  const normalizedItems: WheelPickerItem[] = React.useMemo(
    () =>
      items.map((item) =>
        typeof item === 'string' ? { value: item, label: item } : item,
      ),
    [items],
  );

  const initialValue =
    controlledValue ?? defaultValue ?? normalizedItems[0]?.value ?? '';
  const [internalValue, setInternalValue] = React.useState(initialValue);
  const selectedValue = controlledValue ?? internalValue;

  const totalHeight = itemHeight * visibleCount;
  const paddingY = itemHeight * Math.floor(visibleCount / 2);

  const handleSelect = (itemVal: string) => {
    if (controlledValue === undefined) setInternalValue(itemVal);
    onValueChange?.(itemVal);
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: totalHeight,
          backgroundColor: theme.surface,
          borderColor: theme.separator,
          borderWidth: theme.hairline,
        },
        style,
      ]}
    >
      {/* Center highlight lens */}
      <View
        pointerEvents="none"
        style={[
          styles.lens,
          {
            top: paddingY,
            height: itemHeight,
            backgroundColor: theme.surfaceMuted,
            borderColor: theme.separator,
            borderWidth: theme.hairline,
          },
        ]}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: paddingY,
        }}
      >
        {normalizedItems.map((item) => {
          const isSelected = item.value === selectedValue;
          return (
            <Pressable
              key={item.value}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => handleSelect(item.value)}
              style={[styles.item, { height: itemHeight }]}
            >
              <Text
                style={[
                  styles.label,
                  {
                    color: isSelected ? theme.label : theme.labelSecondary,
                    fontWeight: isSelected ? '600' : '400',
                    opacity: isSelected ? 1 : 0.5,
                  },
                  itemTextStyle,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 280,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  lens: {
    position: 'absolute',
    left: 8,
    right: 8,
    borderRadius: 10,
    zIndex: 0,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  label: {
    fontSize: 16,
  },
});
