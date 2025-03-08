import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigatorConfig, ScreenConfig } from './config';

// Dynamic navigator generation
export function createNavigator(config: NavigatorConfig) {
  let Navigator: any;
  
  switch (config.type) {
    case 'stack':
      Navigator = createNativeStackNavigator();
      break;
    case 'drawer':
      Navigator = createDrawerNavigator();
      break;
    case 'bottomTab':
      Navigator = createBottomTabNavigator();
      break;
    case 'topTab':
      Navigator = createMaterialTopTabNavigator();
      break;
    default:
      throw new Error(`Unknown navigator type: ${config.type}`);
  }

  return (
    <Navigator.Navigator 
      initialRouteName={config.initialRouteName}
      {...config.options}
    >
      {config.screens.map((screen) => {
        if ('type' in screen) {
          // Nested navigator
          return (
            <Navigator.Screen
              key={screen.name}
              name={screen.name}
              options={screen.options || {}}
            >
              {() => createNavigator(screen as NavigatorConfig)}
            </Navigator.Screen>
          );
        } else {
          // Regular screen
          const screenConfig = screen as ScreenConfig;
          return (
            <Navigator.Screen
              key={screenConfig.name}
              name={screenConfig.name}
              component={screenConfig.component}
              options={screenConfig.options || {}}
            />
          );
        }
      })}
    </Navigator.Navigator>
  );
} 