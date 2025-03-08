import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationConfig } from './config';
import { createNavigator } from './NavigatorFactory';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import { navigationRef } from './utils';

function NavigationContent() {
  const { theme } = useTheme();
  
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      {createNavigator(navigationConfig)}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export function Navigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
} 