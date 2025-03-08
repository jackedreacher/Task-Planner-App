import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Task } from '../types';
import { useTaskContext } from '../TaskContext';

interface TaskItemProps {
  task: Task;
  onPress: (task: Task) => void;
}

export const TaskItem = ({ task, onPress }: TaskItemProps) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  const swipeableRef = useRef<Swipeable>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteTask(task.id),
          style: 'destructive',
        },
      ]
    );
  };

  const renderRightActions = () => {
    return (
      <View className="flex-row">
        <TouchableOpacity
          className="bg-green-500 justify-center items-center w-20"
          onPress={() => {
            toggleTaskCompletion(task.id);
            swipeableRef.current?.close();
          }}
        >
          <Text className="text-white font-bold">
            {task.completed ? 'Undo' : 'Complete'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 justify-center items-center w-20"
          onPress={() => {
            handleDelete();
            swipeableRef.current?.close();
          }}
        >
          <Text className="text-white font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <TouchableOpacity
        className={`p-4 border-b border-gray-200 ${
          task.completed ? 'bg-gray-100' : 'bg-white'
        }`}
        onPress={() => onPress(task)}
        onLongPress={() => setMenuVisible(true)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text
              className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.title}
            </Text>
            <Text
              className={`mt-1 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
              numberOfLines={2}
            >
              {task.description}
            </Text>
            
            <View className="flex-row mt-2">
              <Text className="text-gray-500 text-sm">
                {formatDate(task.date)} at {formatTime(task.time)}
              </Text>
            </View>
            
            <View className="flex-row flex-wrap mt-2">
              {task.tags.map((tag) => (
                <View
                  key={tag.id}
                  className="rounded-full px-2 py-1 mr-1 mb-1"
                  style={{ backgroundColor: tag.color + '20' }}
                >
                  <Text
                    className="text-xs"
                    style={{ color: tag.color }}
                  >
                    {tag.name}
                  </Text>
                </View>
              ))}
            </View>
            
            {task.invitees.length > 0 && (
              <View className="flex-row mt-2 items-center">
                <Text className="text-gray-500 text-xs mr-1">With:</Text>
                <Text className="text-gray-600 text-xs">
                  {task.invitees.map((person) => person.name).join(', ')}
                </Text>
              </View>
            )}
          </View>
          
          <View className="ml-2">
            <View
              className={`rounded-full px-2 py-1 ${getPriorityColor(
                task.priority
              )}`}
            >
              <Text className="text-xs capitalize">{task.priority}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}; 