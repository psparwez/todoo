export interface dataTypes {
  id: number;
  taskName: string;
  selectedDay: string;
  selectedPriority: string;
  description: string;
  tags: [];
  avatar: string;
}

export interface Task {
  id: string;
  taskName: string;
  description: string;
  selectedDay: string | null;
  selectedPriority: string | null;
  tags: string[];
  avatar: string;
}

export interface AddNewProps {
  task?: {
    id: string;
    taskName: string;
    description: string;
    selectedDay: string;
    selectedPriority: string;
    tags: string[];
    avatar: string;
  };
}
