import PropTypes from 'prop-types';

const TasksSeparator = ({ tittle, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-[#f4f4f5] pb-1">
      {icon}
      <p className="text-brand-text-gray text-sm font-semibold">{tittle}</p>
    </div>
  );
};

TasksSeparator.propTypes = {
  tittle: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default TasksSeparator;
