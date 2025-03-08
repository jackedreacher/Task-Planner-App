import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from './features/tasks/TaskContext';
import { TaskListScreen } from './features/tasks/screens/TaskListScreen';
import './global.css';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <TaskListScreen />
        <StatusBar style="auto" />
      </TaskProvider>
    </GestureHandlerRootView>
  );
}
