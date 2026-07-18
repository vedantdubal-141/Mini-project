import { Stack } from "expo-router";
import { Theme } from "../constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { SurveyProvider } from "../context/SurveyContext";

const TransparentTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground 
        source={require('../assets/images/custom_blur.jpg')} 
        style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }}
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <SurveyProvider>
          <ThemeProvider value={TransparentTheme}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: 'transparent',
                }
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="camera" />
              <Stack.Screen name="location" />
            </Stack>
          </ThemeProvider>
        </SurveyProvider>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}
