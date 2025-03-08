# Task Planner App

A modern, feature-rich task management application built with React Native and Expo. This app demonstrates the implementation of various UI components and interactions to create a seamless task planning experience.

## Features

- **Task Management**: Create, edit, delete, and mark tasks as completed
- **Calendar Integration**: View and filter tasks by date with a visual calendar
- **Date & Time Selection**: Set task dates and times with intuitive pickers
- **Tags & Categories**: Organize tasks with customizable color-coded tags
- **Collaborators**: Add people to tasks for collaborative work
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **Gesture Controls**: Swipe to complete or delete tasks
- **Smooth Animations**: Custom animated modals with synchronized transitions

## Technologies Used

- **React Native**: Core framework for building the mobile application
- **Expo**: Development platform for easier building and testing
- **NativeWind**: Tailwind CSS-inspired styling for React Native
- **React Native Gesture Handler**: For swipe gestures and touch interactions
- **React Native Reanimated**: For fluid, high-performance animations
- **React Native Calendars**: For the calendar view and date selection
- **DateTimePicker**: Native date and time selection components
- **Context API**: For state management across components

## Project Structure

```
features/
└── tasks/
    ├── components/
    │   ├── TaskItem.tsx       # Individual task component with swipe actions
    │   ├── TaskForm.tsx       # Form for creating and editing tasks
    │   └── TaskCalendar.tsx   # Calendar component for date selection
    ├── screens/
    │   └── TaskListScreen.tsx # Main screen showing task list and calendar
    ├── TaskContext.tsx        # Context provider for task state management
    ├── types.ts               # TypeScript interfaces for tasks, tags, etc.
    └── mockData.ts            # Sample data for development and testing
```

## UI Components

### Task List
- Displays tasks filtered by selected date
- Shows task details including title, description, date/time, tags, and priority
- Supports swipe gestures for task completion and deletion

### Task Form
- Modal form for creating and editing tasks
- Fields for title, description, date, time, priority, tags, and invitees
- Custom animated pickers for tags and people selection

### Calendar
- Visual calendar for date selection
- Marks dates with tasks using color indicators
- Toggleable view for easy date navigation

## Implementation Highlights

### Custom Animated Modals
The app features custom-built animated modals for tag and people selection, with synchronized animations for both the background overlay and content. This creates a smooth, professional user experience where elements animate together.

```typescript
// Animation setup
const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
const backgroundOpacity = useRef(new Animated.Value(0)).current;

// Coordinated animations
Animated.parallel([
  Animated.timing(backgroundOpacity, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }),
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }),
]).start();
```

### Gesture-Based Interactions
Tasks can be managed through intuitive swipe gestures using React Native Gesture Handler:

```typescript
<Swipeable
  renderRightActions={renderRightActions}
  friction={2}
  rightThreshold={40}
>
  <TouchableOpacity onPress={() => onPress(task)}>
    {/* Task content */}
  </TouchableOpacity>
</Swipeable>
```

### Context-Based State Management
The app uses React's Context API for efficient state management across components:

```typescript
const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  // State and methods for task management
  
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/task-planner.git
   cd task-planner
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npx expo start
   ```

4. Open the app on your device using Expo Go or run on a simulator

## Future Enhancements

- Data persistence with AsyncStorage or a backend service
- Push notifications for task reminders
- Drag and drop for task reordering
- Dark mode support
- Advanced filtering and sorting options
- Task sharing capabilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo team for the excellent development tools
- React Navigation for the routing capabilities
- NativeWind for the styling approach
- The React Native community for continuous support and inspiration