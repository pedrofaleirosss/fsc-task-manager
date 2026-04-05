import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import Header from './Header';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time === 'evening');

  return (
    <div className="w-full space-y-6 px-10 py-16">
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />

      <div className="space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator tittle="Manhã" icon={<SunIcon />} />

          {morningTasks?.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}

          {morningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator tittle="Tarde" icon={<CloudSunIcon />} />

          {afternoonTasks?.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}

          {afternoonTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator tittle="Noite" icon={<MoonIcon />} />

          {eveningTasks?.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}

          {eveningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
