'use client';

import { useState } from 'react'; 
import { Task } from '@/types';
import { Button } from './Button';
import { Input } from './Input'; 
import { Textarea } from './Textarea';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      alert('O título não pode ficar vazio.');
      return;
    }
    onEdit(task.id, editedTitle, editedDescription);
    setIsEditing(false); 
  };

  if (isEditing) {
    return (
      
      <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-col gap-4">
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <Textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          rows={3}
        />
        <div className="flex gap-2 self-end">
          <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        p-4 rounded-lg shadow-md transition-colors duration-300
        flex items-center justify-between
        ${task.completed ? 'bg-green-100 dark:bg-green-900/50' : 'bg-white dark:bg-gray-800'}
      `}
    >
      <div className="flex items-center gap-4 flex-grow min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
        />
        <div className="min-w-0">
          <h3
            className={`
              font-semibold text-lg truncate
              ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}
            `}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`
                text-sm truncate
                ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}
              `}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-shrink-0 ml-4">
        <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
          Editar
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
          Excluir
        </Button>
      </div>
    </div>
  );
};