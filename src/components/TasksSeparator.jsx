const TasksSeparator = ({ tittle, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
      {icon}
      <p className="text-sm font-semibold text-[#9A9C9F]">{tittle}</p>
    </div>
  );
};

export default TasksSeparator;
