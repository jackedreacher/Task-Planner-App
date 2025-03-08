import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useTaskContext } from '../TaskContext';

interface TaskCalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

export const TaskCalendar = ({
  onDateSelect,
  selectedDate,
}: TaskCalendarProps) => {
  const { tasks } = useTaskContext();
  
  // Format date to YYYY-MM-DD for the calendar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Get all dates with tasks
  const getMarkedDates = () => {
    const markedDates: Record<string, any> = {};
    
    // Mark all dates with tasks
    tasks.forEach((task) => {
      const formattedDate = formatDate(task.date);
      
      if (!markedDates[formattedDate]) {
        markedDates[formattedDate] = {
          marked: true,
          dotColor: task.completed ? '#10B981' : '#3B82F6',
        };
      }
    });
    
    // Mark the selected date
    if (selectedDate) {
      const formattedSelectedDate = formatDate(selectedDate);
      markedDates[formattedSelectedDate] = {
        ...markedDates[formattedSelectedDate],
        selected: true,
        selectedColor: '#3B82F6',
      };
    }
    
    return markedDates;
  };

  const handleDateSelect = (date: DateData) => {
    onDateSelect(new Date(date.dateString).toISOString());
  };

  return (
    <SafeAreaView>
      <View className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={getMarkedDates()}
          theme={{
            todayTextColor: '#3B82F6',
            arrowColor: '#3B82F6',
            dotColor: '#3B82F6',
            selectedDayBackgroundColor: '#3B82F6',
          }}
        />
      </View>
    </SafeAreaView>
  );
}; 