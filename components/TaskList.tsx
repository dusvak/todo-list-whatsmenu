'use client';

import { Task } from '@/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
        <p>Nenhuma tarefa na lista. Adicione uma acima!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
};