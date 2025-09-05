'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useState } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { TaskList } from '@/components/TaskList';
import { Task } from '@/types';
import { FilterControls, type FilterType } from '@/components/FilterControls'; 

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');  
  const isClient = useIsClient();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === '') {
      alert('O título da tarefa não pode estar vazio!');
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTitle,
      description: newDescription,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewDescription('');
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleEditTask = (id: string, newTitle: string, newDescription?: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'active') {
      return !task.completed;
    }
    if (activeFilter === 'completed') {
      return task.completed;
    }
    return true;
  });


  return (
    <main className="relative flex min-h-screen flex-col items-center gap-8 p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-50 dark:bg-gray-900">
      
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          TODO List
        </h1>

        <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Nova Tarefa</h2>
          <form onSubmit={handleAddTask} className="flex flex-col gap-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título da tarefa"
              required
            />
            <Textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              rows={3}
            />
            <Button type="submit" fullWidth>
              Adicionar Tarefa
            </Button>
          </form>
        </div>

        <FilterControls activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <div className="mt-2 space-y-4">
          {isClient ? (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <p>Carregando tarefas...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}