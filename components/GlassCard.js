import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

export default function GlassCard({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {/* 
        On iOS: BlurView works perfectly out of the box.
        On Android: We need experimentalBlurMethod="dimezisBlurView" for REAL blur.
        On Web: We skip BlurView and use CSS backdropFilter instead.
      */}
      {Platform.OS !== 'web' && (
        <BlurView 
          intensity={40} 
          tint="light" 
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={2}
          style={StyleSheet.absoluteFill} 
        />
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: Platform.OS === 'web' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    } : {})
  },
  content: {
    padding: 24,
  },
});
