export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Person {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  time: string; // ISO string
  completed: boolean;
  tags: Tag[];
  invitees: Person[];
  priority: 'low' | 'medium' | 'high';
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
} 