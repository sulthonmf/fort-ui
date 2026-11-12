import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageProps,
  type ImageSourcePropType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useFortTheme } from '@/lib/fort-tokens';

export type AvatarSize = 'sm' | 'md' | 'lg';

const AVATAR_METRICS: Record<AvatarSize, { size: number; fontSize: number }> = {
  sm: { size: 32, fontSize: 12 },
  md: { size: 40, fontSize: 14 },
  lg: { size: 56, fontSize: 18 },
};

interface AvatarContextValue {
  size: AvatarSize;
  imageFailed: boolean;
  hasImage: boolean;
  setImageFailed: (failed: boolean) => void;
  setHasImage: (loaded: boolean) => void;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

export interface AvatarProps {
  size?: AvatarSize;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Circular user avatar container with hairline border and automatic fallback support.
 */
export function Avatar({ size = 'md', children, style }: AvatarProps) {
  const theme = useFortTheme();
  const metrics = AVATAR_METRICS[size];
  const [imageFailed, setImageFailed] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);

  return (
    <AvatarContext.Provider
      value={{ size, imageFailed, hasImage, setImageFailed, setHasImage }}
    >
      <View
        style={[
          styles.root,
          {
            width: metrics.size,
            height: metrics.size,
            borderRadius: metrics.size / 2,
            backgroundColor: theme.surfaceMuted,
            borderColor: theme.separator,
            borderWidth: theme.hairline,
          },
          style,
        ]}
      >
        {children}
      </View>
    </AvatarContext.Provider>
  );
}

export interface AvatarImageProps extends Omit<ImageProps, 'source'> {
  src?: string;
  source?: ImageSourcePropType;
}

export function AvatarImage({
  src,
  source,
  style,
  onError,
  ...props
}: AvatarImageProps) {
  const ctx = React.useContext(AvatarContext);
  const setHasImage = ctx?.setHasImage;
  const setImageFailed = ctx?.setImageFailed;
  const resolvedSource = React.useMemo(
    () => source ?? (src ? { uri: src } : undefined),
    [source, src],
  );

  React.useEffect(() => {
    setHasImage?.(Boolean(resolvedSource));
    setImageFailed?.(false);
  }, [resolvedSource, setHasImage, setImageFailed]);

  if (!resolvedSource || ctx?.imageFailed) {
    return null;
  }

  return (
    <Image
      source={resolvedSource}
      resizeMode="cover"
      onError={(event) => {
        setImageFailed?.(true);
        onError?.(event);
      }}
      style={[styles.image, style]}
      {...props}
    />
  );
}

export interface AvatarFallbackProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function AvatarFallback({
  children,
  style,
  textStyle,
}: AvatarFallbackProps) {
  const theme = useFortTheme();
  const ctx = React.useContext(AvatarContext);
  const metrics = AVATAR_METRICS[ctx?.size ?? 'md'];

  if (ctx?.hasImage && !ctx.imageFailed) {
    return null;
  }

  return (
    <View
      style={[
        styles.fallback,
        { backgroundColor: theme.tintSoft },
        style,
      ]}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text
          style={[
            styles.fallbackText,
            { color: theme.tintText, fontSize: metrics.fontSize },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontWeight: '600',
  },
});
