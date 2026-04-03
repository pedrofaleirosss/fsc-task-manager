import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import { useAddTask } from '../hooks/data/use-add-task';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate: addTask, isPending } = useAddTask();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: '',
      description: '',
    },
  });

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: uuidv4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    };

    addTask(task, {
      onSuccess: () => {
        toast.success('Tarefa adicionada com sucesso!', {
          style: {
            background: 'var(--color-brand-primary)',
            color: 'var(--color-brand-white)',
          },
        });

        handleClose();
        reset({
          title: '',
          time: '',
          description: '',
        });
      },
      onError: () => {
        toast.error('Erro ao adicionar tarefa. Por favor, tente novamente.', {
          style: {
            background: 'var(--color-brand-danger)',
            color: 'var(--color-brand-white)',
          },
        });
      },
    });
  };

  const handleCancelClick = () => {
    reset({
      title: '',
      time: '',
      description: '',
    });
    handleClose();
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-[#09090B]/12"
            ref={nodeRef}
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mt-1 mb-4 text-sm">
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-84 flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isPending}
                  {...register('title', {
                    required: 'O título é obrigatório.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio.';
                      }
                      return true;
                    },
                  })}
                />

                <TimeSelect
                  errorMessage={errors?.time?.message}
                  disabled={isPending}
                  {...register('time', {
                    required: 'O horário é obrigatório.',
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isPending}
                  {...register('description', {
                    required: 'A descrição é obrigatória.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia.';
                      }
                      return true;
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <LoaderIcon className="text-brand-white h-5 w-5 animate-spin" />
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTaskDialog;
