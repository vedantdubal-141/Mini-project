import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

/**
 * GlassCard — Frosted Glassmorphism card container.
 * - On iOS: Native BlurView.
 * - On Android: dimezisBlurView real blur.
 * - On Web: CSS backdrop-filter blur with milk-glass opacity for crisp readability.
 */
export default function GlassCard({ children, style, contentStyle, noPadding = false }) {
  return (
    <View style={[styles.container, style]}>
      {Platform.OS !== 'web' && (
        <BlurView
          intensity={50}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={2}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[!noPadding && styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: Platform.OS === 'web' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.45)',
    ...(Platform.OS === 'web'
      ? {
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 3,
        }),
  },
  content: {
    padding: 18,
  },
});
