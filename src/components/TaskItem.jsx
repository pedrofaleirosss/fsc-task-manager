import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons';
import Button from './Button';

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
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
        <Button color="ghost" onClick={() => handleDeleteClick(task.id)}>
          <TrashIcon className="text-brand-text-gray h-5 w-5" />
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
