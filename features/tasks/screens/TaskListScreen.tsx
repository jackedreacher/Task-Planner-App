import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTaskContext } from '../TaskContext';
import { TaskItem } from '../components/TaskItem';
import { TaskForm } from '../components/TaskForm';
import { TaskCalendar } from '../components/TaskCalendar';
import { Task } from '../types';

export const TaskListScreen = () => {
  const { tasks } = useTaskContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setIsFormVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedTask(undefined);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Filter tasks by selected date
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date).toDateString();
    const selectedDateObj = new Date(selectedDate).toDateString();
    return taskDate === selectedDateObj;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskItem task={item} onPress={handleEditTask} />
    ),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <View className="bg-white p-4 border-b border-gray-200">
          <Text className="text-2xl font-bold">Task Planner</Text>
          <TouchableOpacity
            className="mt-2 flex-row items-center"
            onPress={toggleCalendar}
          >
            <Text className="text-blue-500 text-lg">
              {formatDate(selectedDate)}
            </Text>
            <Text className="text-blue-500 ml-2">
              {isCalendarVisible ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
        </View>

        {isCalendarVisible && (
          <TaskCalendar
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        )}

        <View className="flex-1">
          {filteredTasks.length === 0 ? (
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-gray-500 text-lg text-center">
                No tasks for this day. Tap the + button to add a task.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredTasks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          )}
        </View>

        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full justify-center items-center shadow-lg"
          onPress={handleAddTask}
        >
          <Text className="text-white text-3xl">+</Text>
        </TouchableOpacity>
      </View>

      <TaskForm
        task={selectedTask}
        isVisible={isFormVisible}
        onClose={handleCloseForm}
      />
    </SafeAreaView>
  );
}; 