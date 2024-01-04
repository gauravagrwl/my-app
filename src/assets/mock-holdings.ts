import { Task } from '../app/models/task1.model';

export const tasks: Task[] = [
  {
    id: 1,
    task: 'Add email validation in registration form',
    priority: 'high',
    type: 'Feature',
    startDate: new Date().toLocaleDateString(),
    targetDate: new Date().toLocaleDateString(),
    completed: true,
  },
  {
    id: 2,
    task: 'Display the adress details of a customer',
    priority: 'low',
    type: 'Feature',
    startDate: new Date().toLocaleDateString(),
    targetDate: new Date().toLocaleDateString(),
    completed: true,
  },
  {
    id: 3,
    task: 'Export to CSV is not working',
    priority: 'high',
    type: 'Bug',
    startDate: new Date().toLocaleDateString(),
    targetDate: new Date().toLocaleDateString(),
    completed: true,
  },
  {
    id: 4,
    task: 'Locale settings per user',
    priority: 'low',
    type: 'Feature',
    startDate: new Date().toLocaleDateString(),
    targetDate: new Date().toLocaleDateString(),
    completed: false,
  },
  {
    id: 5,
    task: 'Add new customer tutorial',
    priority: 'high',
    type: 'Documentation',
    startDate: new Date().toLocaleDateString(),
    targetDate: new Date().toLocaleDateString(),
    completed: false,
  },
];
