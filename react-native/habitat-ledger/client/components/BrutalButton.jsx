import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, Platform } from 'react-native';
import { BrutalTheme } from '../constants/brutalTheme';

/**
 * BrutalButton — Tactile 3D Pop Button
 * - 2px solid black border all around
 * - Hard 3D offset shadow on bottom and right
 * - Physically depresses on press (shifts down-right and collapses shadow)
 * - Optional tilted / playful angle
 */
export default function BrutalButton({
  children,
  onPress,
  variant = 'yellow', // 'yellow' | 'white' | 'coral' | 'green' | 'black'
  style,
  textStyle,
  tilted = false,
  tiltAngle = '-1.5deg',
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
}) {
  const [pressed, setPressed] = useState(false);

  const getBackgroundColor = () => {
    switch (variant) {
      case 'white':
        return BrutalTheme.colors.white;
      case 'coral':
        return BrutalTheme.colors.coral;
      case 'green':
        return BrutalTheme.colors.green;
      case 'black':
        return BrutalTheme.colors.black;
      case 'yellow':
      default:
        return BrutalTheme.colors.yellow;
    }
  };

  const getTextColor = () => {
    if (variant === 'black') return '#FFFFFF';
    return '#000000';
  };

  const isWeb = Platform.OS === 'web';

  const shadowOffset = pressed ? 0 : 3;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.base,
        styles[size],
        {
          backgroundColor: getBackgroundColor(),
          transform: [
            ...(tilted ? [{ rotate: tiltAngle }] : []),
            ...(pressed ? [{ translateX: 2 }, { translateY: 2 }] : []),
          ],
        },
        isWeb
          ? {
              boxShadow: pressed
                ? '0px 0px 0px #000000'
                : '3px 4px 0px #000000',
              cursor: disabled ? 'default' : 'pointer',
              userSelect: 'none',
              transition: 'transform 0.08s ease, box-shadow 0.08s ease',
            }
          : {
              shadowColor: '#000000',
              shadowOffset: { width: shadowOffset, height: shadowOffset },
              shadowOpacity: pressed ? 0 : 1,
              shadowRadius: 0,
              elevation: pressed ? 0 : 3,
            },
        disabled && styles.disabled,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: BrutalTheme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  lg: {
    paddingVertical: 15,
    paddingHorizontal: 26,
    borderRadius: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  disabled: {
    opacity: 0.5,
  },
});
