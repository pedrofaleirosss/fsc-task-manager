import DashboardCards from '../components/DashboardCards';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskItem from '../components/TaskItem';
import { useGetTasks } from '../hooks/data/use-get-tasks';

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-10 py-16">
        <Header title="Início" subtitle="Início" />
        <DashboardCards />

        <div className="grid grid-cols-[1.5fr_1fr] gap-6">
          <div className="bg-brand-white space-y-6 rounded-[10px] p-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-brand-dark-gray text-sm">
                Resumo das tarefas disponíveis
              </span>
            </div>

            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div className="bg-brand-white flex items-center justify-center space-y-6 rounded-[10px] p-20">
            <p className="text-brand-dark-gray">
              Cada pequena ação de hoje te aproxima das grandes conquistas de
              amanhã. Faça o que precisa ser feito!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
