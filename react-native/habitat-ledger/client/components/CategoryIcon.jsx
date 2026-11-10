import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';

/**
 * CategoryIcon — Uniform Black Vector Line-Art Icon
 * Renders consistent black stroke icons matching the Neo-Brutalist design language.
 */
export default function CategoryIcon({
  categoryId,
  size = 18,
  color = '#000000',
  style,
}) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const iconName = cat?.vectorIcon || 'alert-circle';

  return (
    <View style={[styles.container, style]}>
      <Ionicons name={iconName} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
