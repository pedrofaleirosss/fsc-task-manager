import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useGetTasks } from '../hooks/data/use-get-tasks';

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  // const notStartedTasks = tasks?.filter((task) => task.status === 'not_started').length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length;
  const doneTasks = tasks?.filter((task) => task.status === 'done').length;

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-10 py-16">
        <Header title="Início" subtitle="Início" />

        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={tasks.length}
            secondaryText="Tarefas disponíveis"
          />

          <DashboardCard
            icon={<TasksIcon />}
            mainText={doneTasks}
            secondaryText="Tarefas concluídas"
          />

          <DashboardCard
            icon={<LoaderIcon className="h-6 w-6" />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
          />

          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText="40%"
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
