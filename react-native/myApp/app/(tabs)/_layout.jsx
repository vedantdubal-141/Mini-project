import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ────────────────────────────────────────────────────
// Tab bar background component
// • On Web  → plain CSS blur (no photo, looks clean)
// • On iOS  → native BlurView (perfect frosted glass)
// • Android → dimezisBlurView (experimental real blur)
// ────────────────────────────────────────────────────
function TabBarBlur() {
  if (Platform.OS === 'web') {
    return (
      <View style={[StyleSheet.absoluteFill, {
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        backgroundColor: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }]} />
    );
  }

  return (
    <BlurView 
      intensity={40} 
      tint="light" 
      experimentalBlurMethod="dimezisBlurView"
      blurReductionFactor={2}
      style={[StyleSheet.absoluteFill, { 
        borderRadius: 40, 
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'rgba(255,255,255,0.15)',
      }]} 
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          height: 65,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => <TabBarBlur />,
        tabBarActiveTintColor: 'rgba(0,0,0,0.8)',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.35)',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'New Survey',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color }) => <Ionicons name="people" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
