import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { BrutalTheme } from '../../constants/brutalTheme';
import { Ionicons } from '@expo/vector-icons';

/**
 * Custom Painted Neo-Brutalist Bottom Tab Bar
 * - White floating dock with 2px black outline & 3D shadow
 * - Active tab has a BORDERLESS organic painted yellow highlighter splash
 * - 4 core tabs: Cases, New Case, Insights, Rights Guide
 */
function BrutalTabBar({ state, descriptors, navigation }) {
  const isWeb = Platform.OS === 'web';

  const tabMeta = {
    index: { label: 'Cases', icon: 'grid-outline', activeIcon: 'grid' },
    create: { label: 'New', icon: 'add-circle-outline', activeIcon: 'add-circle' },
    insights: { label: 'Insights', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
    rights: { label: 'Rights', icon: 'shield-outline', activeIcon: 'shield-checkmark' },
  };

  return (
    <View style={styles.dockOuter}>
      <View
        style={[
          styles.dockContainer,
          isWeb && {
            boxShadow: '3px 4px 0px #000000',
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const meta = tabMeta[route.name] || {
            label: options.title || route.name,
            icon: 'apps-outline',
            activeIcon: 'apps',
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[styles.tabButton, isWeb && { cursor: 'pointer' }]}
            >
              {isFocused ? (
                /* Organic Painted Yellow Highlighter (Borderless & Hand-Drawn Splash) */
                <View style={styles.paintedYellowSplash}>
                  <Ionicons name={meta.activeIcon} size={18} color="#000000" />
                  <Text style={styles.activeTabLabel}>{meta.label}</Text>
                </View>
              ) : (
                /* Inactive Tab: Clean Black Outline Icon & Text */
                <View style={styles.inactiveTabInner}>
                  <Ionicons name={meta.icon} size={18} color="rgba(0,0,0,0.65)" />
                  <Text style={styles.inactiveTabLabel}>{meta.label}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BrutalTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Cases' }} />
      <Tabs.Screen name="create" options={{ title: 'New Case' }} />
      <Tabs.Screen name="insights" options={{ title: 'Insights' }} />
      <Tabs.Screen name="rights" options={{ title: 'Rights' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  dockOuter: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 12,
    zIndex: 99,
  },
  dockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: 32,
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: '100%',
    maxWidth: 480,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
      },
    }),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  /* Hand-drawn painted highlighter stroke (No border, pure organic yellow marker ink shape) */
  paintedYellowSplash: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFE600',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 6,
    transform: [{ rotate: '-2deg' }, { skewX: '-4deg' }],
    ...Platform.select({
      web: {
        filter: 'drop-shadow(0px 1px 2px rgba(255, 230, 0, 0.45))',
      },
      default: {},
    }),
  },
  activeTabLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.2,
    transform: [{ rotate: '1deg' }],
  },
  inactiveTabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  inactiveTabLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.65)',
  },
});
