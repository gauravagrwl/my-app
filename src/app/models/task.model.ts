export interface Task {
  id: number;
  task: string;
  priority: 'low' | 'medium' | 'high';
  type: string;
  completed: Boolean;
  startDate?: string;
  targetDate?: string;
}
