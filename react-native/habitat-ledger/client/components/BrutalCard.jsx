import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BrutalTheme } from '../constants/brutalTheme';

/**
 * BrutalCard — Tactile Neo-Brutalist Card Container
 * - Crisp 2px jet-black border
 * - Solid 3D drop shadow (bottom-right offset)
 * - Pure white or warm tinted background
 * - Rounded modern corners
 */
export default function BrutalCard({
  children,
  style,
  contentStyle,
  noPadding = false,
  backgroundColor = BrutalTheme.colors.white,
  tilted = false,
  tiltAngle = '-1deg',
}) {
  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        tilted && { transform: [{ rotate: tiltAngle }] },
        isWeb
          ? {
              boxShadow: '3px 4px 0px #000000',
            }
          : {
              shadowColor: '#000000',
              shadowOffset: { width: 3, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 0,
              elevation: 4,
            },
        style,
      ]}
    >
      <View style={[!noPadding && styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BrutalTheme.radii.lg,
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
});
