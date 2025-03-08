import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import { createRef } from 'react';

// Create a navigation reference that can be used outside of React components
export const navigationRef = createRef<NavigationContainerRef<ParamListBase>>();

// Type-safe navigation functions
export function navigate(name: string, params?: object) {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.warn('Navigation ref is not set');
  }
}

export function goBack() {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  } else {
    console.warn('Navigation ref is not set');
  }
}

// Navigate to a nested screen
export function navigateNested(parent: string, screen: string, params?: object) {
  if (navigationRef.current) {
    navigationRef.current.navigate(parent, {
      screen,
      params,
    });
  } else {
    console.warn('Navigation ref is not set');
  }
}

// Reset the navigation state
export function reset(routes: { name: string; params?: object }[], index = 0) {
  if (navigationRef.current) {
    navigationRef.current.reset({
      index,
      routes,
    });
  } else {
    console.warn('Navigation ref is not set');
  }
}

// Helper to extract route params with type safety
export function getRouteParams<T extends object>(route: any, defaultParams: T): T {
  return { ...defaultParams, ...route.params };
} 