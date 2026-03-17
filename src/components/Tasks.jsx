import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasksData = await response.json();
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks.filter((task) => task.time === 'evening');

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!', {
          style: {
            background: 'var(--color-brand-process)',
            color: 'var(--color-brand-white)',
          },
        });
        return { ...task, status: 'in_progress' };
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!', {
          style: {
            background: 'var(--color-brand-primary)',
            color: 'var(--color-brand-white)',
          },
        });
        return { ...task, status: 'done' };
      }

      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso!');
        return { ...task, status: 'not_started' };
      }

      return task;
    });

    setTasks(newTasks);
  };

  const handleTaskDeleteClick = async (taskId) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error(
        'Erro ao deletar tarefa. Por favor, tente novamente.',
        {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        }
      );
    }

    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success('Tarefa deletada com sucesso!');
  };

  const handleAddTaskSubmit = async (task) => {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      return toast.error(
        'Erro ao adicionar tarefa. Por favor, tente novamente.',
        {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        }
      );
    }

    setTasks([...tasks, task]);
    toast.success('Tarefa adicionada com sucesso!', {
      style: {
        background: 'var(--color-brand-primary)',
        color: 'var(--color-brand-white)',
      },
    });
  };

  return (
    <div className="w-full space-y-6 px-10 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator tittle="Manhã" icon={<SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator tittle="Tarde" icon={<CloudSunIcon />} />

          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator tittle="Noite" icon={<MoonIcon />} />

          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
