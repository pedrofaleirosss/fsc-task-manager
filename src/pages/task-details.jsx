import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

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

  const handleSaveClick = async () => {
    setSaveIsLoading(true);

    const newErrors = [];

    const title = titleRef.current.value;
    const time = timeRef.current.value;
    const description = descriptionRef.current.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    });

    if (!response.ok) {
      toast.error(
        'Occorreu um erro ao salvar a tarefa. Verifique os campos e tente novamente.',
        {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        }
      );
      return setSaveIsLoading(false);
    }

    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);

    toast.success('Tarefa atualizada com sucesso!', {
      style: {
        background: 'var(--color-brand-primary)',
        color: 'var(--color-brand-white)',
      },
    });
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error(
        'Occorreu um erro ao deletar a tarefa. Tente novamente.',
        {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        }
      );
    }

    toast.success('Tarefa deletada com sucesso!');

    navigate('/');
  };

  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

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
              <Link className="text-brand-text-gray" to="/">
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* Parte da direita */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Dados da Tarefa */}
        <div className="bg-brand-white space-y-6 rounded-xl p-6">
          <Input
            id="title"
            label="Título"
            defaultValue={task?.title}
            errorMessage={titleError?.message}
            ref={titleRef}
            disabled={saveIsLoading}
            placeholder="Título da tarefa"
          />

          <TimeSelect
            defaultValue={task?.time}
            errorMessage={timeError?.message}
            ref={timeRef}
            disabled={saveIsLoading}
          />

          <Input
            id="description"
            label="Descrição"
            defaultValue={task?.description}
            errorMessage={descriptionError?.message}
            ref={descriptionRef}
            disabled={saveIsLoading}
            placeholder="Descreva a tarefa"
          />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            color="secondary"
            size="large"
            onClick={handleBackClick}
            disabled={saveIsLoading}
          >
            Cancelar
          </Button>
          <Button
            size="large"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading ? (
              <LoaderIcon className="text-brand-white h-5 w-5 animate-spin" />
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
