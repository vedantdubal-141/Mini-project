import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { IssueProvider } from '../context/IssueContext';
import { BrutalTheme } from '../constants/brutalTheme';

const BrutalNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: BrutalTheme.colors.canvas,
    card: BrutalTheme.colors.white,
    text: BrutalTheme.colors.black,
    border: BrutalTheme.colors.border,
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.canvasBackground}>
        <StatusBar style="dark" />
        <IssueProvider>
          <ThemeProvider value={BrutalNavigationTheme}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: BrutalTheme.colors.canvas,
                },
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="issue/[id]"
                options={{
                  presentation: 'card',
                  animation: 'slide_from_right',
                }}
              />
            </Stack>
          </ThemeProvider>
        </IssueProvider>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrutalTheme.colors.canvas,
  },
  canvasBackground: {
    flex: 1,
    backgroundColor: BrutalTheme.colors.canvas,
  },
});
