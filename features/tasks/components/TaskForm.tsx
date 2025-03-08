import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  SafeAreaView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Task, Tag, Person } from '../types';
import { useTaskContext } from '../TaskContext';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
  isVisible: boolean;
}

export const TaskForm = ({ task, onClose, isVisible }: TaskFormProps) => {
  const { addTask, updateTask, tags, people } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [showPeoplePicker, setShowPeoplePicker] = useState(false);
  
  // Animation values
  const tagSlideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const peopleSlideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const tagBackgroundOpacity = useRef(new Animated.Value(0)).current;
  const peopleBackgroundOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(new Date(task.date));
      setTime(new Date(task.time));
      setPriority(task.priority);
      setSelectedTags(task.tags);
      setSelectedPeople(task.invitees);
    } else {
      resetForm();
    }
  }, [task, isVisible]);

  // Handle tag picker animation
  useEffect(() => {
    if (showTagPicker) {
      // Reset position before animation starts
      tagSlideAnim.setValue(Dimensions.get('window').height);
      tagBackgroundOpacity.setValue(0);
      
      // Animate both background and content together
      Animated.parallel([
        Animated.timing(tagBackgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(tagSlideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(tagBackgroundOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(tagSlideAnim, {
          toValue: Dimensions.get('window').height,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showTagPicker]);

  // Handle people picker animation
  useEffect(() => {
    if (showPeoplePicker) {
      // Reset position before animation starts
      peopleSlideAnim.setValue(Dimensions.get('window').height);
      peopleBackgroundOpacity.setValue(0);
      
      // Animate both background and content together
      Animated.parallel([
        Animated.timing(peopleBackgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(peopleSlideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(peopleBackgroundOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(peopleSlideAnim, {
          toValue: Dimensions.get('window').height,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showPeoplePicker]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(new Date());
    setTime(new Date());
    setPriority('medium');
    setSelectedTags([]);
    setSelectedPeople([]);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const taskData = {
      title,
      description,
      date: date.toISOString(),
      time: time.toISOString(),
      priority,
      tags: selectedTags,
      invitees: selectedPeople,
      completed: task ? task.completed : false,
    };

    if (task) {
      updateTask({ ...task, ...taskData });
    } else {
      addTask(taskData as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    }

    resetForm();
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const toggleTag = (tag: Tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const togglePerson = (person: Person) => {
    if (selectedPeople.some((p) => p.id === person.id)) {
      setSelectedPeople(selectedPeople.filter((p) => p.id !== person.id));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const closeTagPicker = () => {
    setShowTagPicker(false);
  };

  const closePeoplePicker = () => {
    setShowPeoplePicker(false);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
          <Text className="text-xl font-bold">
            {task ? 'Edit Task' : 'Add Task'}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-500 text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="mb-4">
            <Text className="text-gray-700 mb-1 font-medium">Title</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2"
              value={title}
              onChangeText={setTitle}
              placeholder="Task title"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1 font-medium">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2"
              value={description}
              onChangeText={setDescription}
              placeholder="Task description"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1 font-medium">Date</Text>
            <TouchableOpacity
              className="border border-gray-300 rounded-md p-2"
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{formatDate(date)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1 font-medium">Time</Text>
            <TouchableOpacity
              className="border border-gray-300 rounded-md p-2"
              onPress={() => setShowTimePicker(true)}
            >
              <Text>{formatTime(time)}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1 font-medium">Priority</Text>
            <View className="border border-gray-300 rounded-md">
              <Picker
                selectedValue={priority}
                onValueChange={(itemValue) =>
                  setPriority(itemValue as 'low' | 'medium' | 'high')
                }
              >
                <Picker.Item label="Low" value="low" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="High" value="high" />
              </Picker>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1 font-medium">Tags</Text>
            <TouchableOpacity
              className="border border-gray-300 rounded-md p-2"
              onPress={() => setShowTagPicker(true)}
            >
              <Text>
                {selectedTags.length > 0
                  ? selectedTags.map((tag) => tag.name).join(', ')
                  : 'Select tags'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1 font-medium">Invitees</Text>
            <TouchableOpacity
              className="border border-gray-300 rounded-md p-2"
              onPress={() => setShowPeoplePicker(true)}
            >
              <Text>
                {selectedPeople.length > 0
                  ? selectedPeople.map((person) => person.name).join(', ')
                  : 'Select people'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View className="p-4 border-t border-gray-200">
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-md"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-bold">
              {task ? 'Update Task' : 'Add Task'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tag Picker - Custom Animated Modal */}
        {showTagPicker && (
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <Animated.View 
              style={[
                styles.modalOverlay,
                { opacity: tagBackgroundOpacity }
              ]}
              pointerEvents="box-none"
            >
              <TouchableOpacity 
                style={StyleSheet.absoluteFill} 
                activeOpacity={1}
                onPress={closeTagPicker}
              />
              <Animated.View 
                style={[
                  styles.modalContainer,
                  { transform: [{ translateY: tagSlideAnim }] }
                ]}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Tags</Text>
                  <TouchableOpacity onPress={closeTagPicker}>
                    <Text style={styles.doneButton}>Done</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalList}>
                  {tags.map((tag) => (
                    <TouchableOpacity
                      key={tag.id}
                      style={[
                        styles.tagItem,
                        selectedTags.some((t) => t.id === tag.id) && styles.selectedItem
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <View style={styles.tagRow}>
                        <View 
                          style={[
                            styles.tagColor,
                            { backgroundColor: tag.color }
                          ]} 
                        />
                        <Text style={styles.tagName}>{tag.name}</Text>
                      </View>
                      {selectedTags.some((t) => t.id === tag.id) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            </Animated.View>
          </View>
        )}

        {/* People Picker - Custom Animated Modal */}
        {showPeoplePicker && (
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <Animated.View 
              style={[
                styles.modalOverlay,
                { opacity: peopleBackgroundOpacity }
              ]}
              pointerEvents="box-none"
            >
              <TouchableOpacity 
                style={StyleSheet.absoluteFill} 
                activeOpacity={1}
                onPress={closePeoplePicker}
              />
              <Animated.View 
                style={[
                  styles.modalContainer,
                  { transform: [{ translateY: peopleSlideAnim }] }
                ]}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select People</Text>
                  <TouchableOpacity onPress={closePeoplePicker}>
                    <Text style={styles.doneButton}>Done</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalList}>
                  {people.map((person) => (
                    <TouchableOpacity
                      key={person.id}
                      style={[
                        styles.tagItem,
                        selectedPeople.some((p) => p.id === person.id) && styles.selectedItem
                      ]}
                      onPress={() => togglePerson(person)}
                    >
                      <Text style={styles.tagName}>{person.name}</Text>
                      {selectedPeople.some((p) => p.id === person.id) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            </Animated.View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    color: '#3b82f6',
    fontSize: 16,
  },
  modalList: {
    maxHeight: 300,
  },
  tagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  selectedItem: {
    backgroundColor: '#eff6ff',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  tagName: {
    fontSize: 16,
  },
  checkmark: {
    color: '#3b82f6',
    fontSize: 16,
  },
}); 