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
import { useDeleteTask } from '../hooks/data/use-delete-task';
import { useGetTask } from '../hooks/data/use-get-task';
import { useUpdateTask } from '../hooks/data/use-update-task';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);

  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success('Tarefa atualizada com sucesso!', {
          style: {
            background: 'var(--color-brand-primary)',
            color: 'var(--color-brand-white)',
          },
        });
      },
      onError: () => {
        return toast.error(
          'Occorreu um erro ao salvar a tarefa. Verifique os campos e tente novamente.',
          {
            style: {
              background: 'var(--color-brand-danger)',
              color: 'var(--color-brand-white)',
            },
          }
        );
      },
    });
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!');
        navigate('/tasks');
      },
      onError: () => {
        toast.error('Occorreu um erro ao deletar a tarefa. Tente novamente.', {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        });
      },
    });
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
              <Link className="text-brand-text-gray" to="/tasks">
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
            disabled={updateTaskIsLoading || deleteTaskIsLoading}
          >
            {deleteTaskIsLoading ? (
              <LoaderIcon className="text-brand-white h-5 w-5 animate-spin" />
            ) : (
              <>
                <TrashIcon />
                Deletar tarefa
              </>
            )}
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)} className="space-y-6">
          {/* Dados da Tarefa */}
          <div className="bg-brand-white space-y-6 rounded-xl p-6">
            <Input
              id="title"
              label="Título"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
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
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              {...register('time', { required: 'O horário é obrigatório.' })}
              errorMessage={errors?.time?.message}
            />

            <Input
              id="description"
              label="Descrição"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
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
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              size="large"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              type="submit"
            >
              {updateTaskIsLoading ? (
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
