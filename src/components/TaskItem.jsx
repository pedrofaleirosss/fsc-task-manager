import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons';
import { useDeleteTask } from '../hooks/data/use-delete-task';
import Button from './Button';

const TaskItem = ({ task, handleCheckboxClick }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao deletar a tarefa. Por favor, tente novamente.', {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        });
      },
    });
  };

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary';
    }

    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process';
    }

    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue/10 text-brand-dark-blue';
    }
  };

  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-current/10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-3">
        <label
          className={`relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-md ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-8"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="text-brand-text-gray h-5 w-5 animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray h-5 w-5" />
          )}
        </Button>

        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
};

export default TaskItem;
