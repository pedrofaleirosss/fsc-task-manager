import { useState } from 'react';
import { toast } from 'sonner';

import { AddIcon, TrashIcon } from '../assets/icons';
import { useDeleteTasks } from '../hooks/data/use-delete-tasks';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';

const Header = ({ title, subtitle }) => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  const { mutate: deleteTasks, isPending: deleteTasksIsLoading } =
    useDeleteTasks();

  const handleDeleteTasks = () => {
    deleteTasks(undefined, {
      onSuccess: () => {
        toast.success('Todas as tarefas foram deletadas com sucesso!', {
          style: {
            background: 'var(--color-brand-primary)',
            color: 'var(--color-brand-white)',
          },
        });
      },
      onError: () => {
        toast.error('Erro ao deletar tarefas. Por favor, tente novamente.', {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        });
      },
    });
  };

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-brand-primary text-xs font-semibold">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button
          color="ghost"
          onClick={handleDeleteTasks}
          disabled={deleteTasksIsLoading}
        >
          Limpar tarefas
          <TrashIcon />
        </Button>
        <Button
          color="primary"
          onClick={() => setAddTaskDialogIsOpen(true)}
          disabled={deleteTasksIsLoading}
        >
          Nova tarefa
          <AddIcon />
        </Button>

        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          handleClose={() => setAddTaskDialogIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default Header;
