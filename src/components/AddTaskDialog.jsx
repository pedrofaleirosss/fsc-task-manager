import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nodeRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const handleSaveClick = async () => {
    setIsLoading(true);

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
      return setIsLoading(false);
    }

    const task = {
      id: uuidv4(),
      title,
      time,
      description,
      status: 'not_started',
    };

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      setIsLoading(false);
      return onSubmitError();
    }

    onSubmitSuccess(task);
    setIsLoading(false);
    handleClose();
  };

  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

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

              <div className="flex w-84 flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={isLoading}
                />

                <TimeSelect
                  errorMessage={timeError?.message}
                  ref={timeRef}
                  disabled={isLoading}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                  disabled={isLoading}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoaderIcon className="text-brand-white h-5 w-5 animate-spin" />
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                </div>
              </div>
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
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
};

export default AddTaskDialog;
