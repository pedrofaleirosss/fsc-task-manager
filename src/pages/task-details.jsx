import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import InputLabel from '../components/InputLabel';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-10 py-8">
        {/* Barra no topo */}
        <div className="flex justify-between">
          {/* Parte da esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="bg-brand-primary mb-3 flex h-8 w-8 items-center justify-center rounded-full"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <a className="text-brand-text-gray" href="/">
                Minhas Tarefas
              </a>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* Parte da direita */}
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Dados da Tarefa */}
        <div className="bg-brand-white space-y-6 rounded-xl p-6">
          <Input id="title" label="Título" value={task?.title} />

          <TimeSelect value={task?.time} />

          <Input id="description" label="Descrição" value={task?.description} />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button size="large">Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
