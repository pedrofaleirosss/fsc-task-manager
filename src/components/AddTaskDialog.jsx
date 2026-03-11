import './AddTaskDialog.css';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const nodeRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle('');
      setTime('');
      setDescription('');
    }
  }, [isOpen]);

  const handleSaveClick = () => {
    const newErrors = [];

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
      return;
    }

    handleSubmit({
      id: uuidv4(),
      title,
      time,
      description,
      status: 'not_started',
    });

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
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex w-84 flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  errorMessage={titleError?.message}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  errorMessage={timeError?.message}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  errorMessage={descriptionError?.message}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                  >
                    Salvar
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

export default AddTaskDialog;
