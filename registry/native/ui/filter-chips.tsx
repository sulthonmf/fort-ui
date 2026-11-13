import * as React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export interface FilterChipItem {
  id: string;
  label: string;
}

export interface FilterChipsProps {
  items: (FilterChipItem | string)[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  multiple?: boolean;
  style?: StyleProp<ViewStyle>;
  chipStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Mobile-first horizontal scrollable filter chip row for Expo and React Native.
 */
export function FilterChips({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  style,
  chipStyle,
  textStyle,
}: FilterChipsProps) {
  const theme = useFortTheme();
  const normalizedItems: FilterChipItem[] = React.useMemo(
    () =>
      items.map((item) =>
        typeof item === 'string' ? { id: item, label: item } : item,
      ),
    [items],
  );

  const initialValue = defaultValue ?? (multiple ? [] : normalizedItems[0]?.id ?? '');
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    controlledValue ?? initialValue,
  );
  const selectedValue = controlledValue ?? internalValue;

  const isSelected = (id: string) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(id);
    }
    return selectedValue === id;
  };

  const handleToggle = (id: string) => {
    if (multiple) {
      const currentList = Array.isArray(selectedValue) ? selectedValue : [];
      const nextList = currentList.includes(id)
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];

      if (controlledValue === undefined) setInternalValue(nextList);
      onValueChange?.(nextList);
    } else {
      if (controlledValue === undefined) setInternalValue(id);
      onValueChange?.(id);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {normalizedItems.map((item) => {
        const active = isSelected(item.id);
        return (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => handleToggle(item.id)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: active ? theme.tint : theme.surfaceMuted,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.96 : 1 }],
              },
              chipStyle,
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: active ? '#ffffff' : theme.label,
                  fontWeight: active ? '600' : '500',
                },
                textStyle,
              ]}
            >
              {active ? '✓ ' : ''}{item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
  },
});
