import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import DashboardCard from './DashboardCard';

const DashboardCards = () => {
  const { data: tasks } = useGetTasks();

  const notStartedTasks = tasks?.filter(
    (task) => task.status === 'not_started'
  ).length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length;
  const doneTasks = tasks?.filter((task) => task.status === 'done').length;

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="Tarefas totais"
      />

      <DashboardCard
        icon={<GlassWaterIcon />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />

      <DashboardCard
        icon={<LoaderIcon className="h-6 w-6" />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />

      <DashboardCard
        icon={<TasksIcon />}
        mainText={doneTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  );
};

export default DashboardCards;
