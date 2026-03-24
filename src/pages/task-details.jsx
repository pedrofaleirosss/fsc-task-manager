import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

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
      reset(data);
    };

    fetchTask();
  }, [taskId, reset]);

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    });

    if (!response.ok) {
      return toast.error(
        'Occorreu um erro ao salvar a tarefa. Verifique os campos e tente novamente.',
        {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        }
      );
    }

    const newTask = await response.json();
    setTask(newTask);

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

        <form onSubmit={handleSubmit(handleSaveClick)} className="space-y-6">
          {/* Dados da Tarefa */}
          <div className="bg-brand-white space-y-6 rounded-xl p-6">
            <Input
              id="title"
              label="Título"
              disabled={isSubmitting}
              placeholder="Título da tarefa"
              {...register('title', {
                required: 'O título é obrigatório.',
                validate: (value) => {
                  if (!value.trim()) {
                    return 'O título não pode ser vazio.';
                  }
                  return true;
                },
              })}
              errorMessage={errors?.title?.message}
            />

            <TimeSelect
              disabled={isSubmitting}
              {...register('time', { required: 'O horário é obrigatório.' })}
              errorMessage={errors?.time?.message}
            />

            <Input
              id="description"
              label="Descrição"
              disabled={isSubmitting}
              placeholder="Descreva a tarefa"
              {...register('description', {
                required: 'A descrição é obrigatória.',
                validate: (value) => {
                  if (!value.trim()) {
                    return 'A descrição não pode ser vazia.';
                  }
                  return true;
                },
              })}
              errorMessage={errors?.description?.message}
            />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button
              color="secondary"
              size="large"
              onClick={handleBackClick}
              disabled={isSubmitting}
              type="button"
            >
              Cancelar
            </Button>
            <Button size="large" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <LoaderIcon className="text-brand-white h-5 w-5 animate-spin" />
              ) : (
                'Salvar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
