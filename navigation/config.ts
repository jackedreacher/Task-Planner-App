import { ComponentType } from 'react';
import { TaskListScreen } from '../features/tasks/screens/TaskListScreen';

// Define all navigation types
export type NavigatorType = 'stack' | 'drawer' | 'bottomTab' | 'topTab';

// Define a screen configuration
export interface ScreenConfig {
  name: string;
  component: ComponentType<any>;
  options?: Record<string, any>;
  icon?: string;
}

// Define a navigator configuration
export interface NavigatorConfig {
  type: NavigatorType;
  name: string;
  initialRouteName: string;
  screens: Array<ScreenConfig | NavigatorConfig>;
  options?: Record<string, any>;
  icon?: string;
}

// Task Planner app navigation config
export const navigationConfig: NavigatorConfig = {
  type: 'stack',
  name: 'Root',
  initialRouteName: 'TaskList',
  options: {
    headerShown: false,
  },
  screens: [
    {
      name: 'TaskList',
      component: TaskListScreen,
      options: { title: 'Task Planner' }
    },
  ],
}; 