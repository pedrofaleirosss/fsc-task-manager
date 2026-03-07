const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5]/10 text-[#002C2E]';
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04]/10 text-[#805502]';
    }

    if (task.status === 'not_started') {
      return 'bg-[#35383E]/10 text-[#35383E]';
    }
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  );
};

export default TaskItem;
