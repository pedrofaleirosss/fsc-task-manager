import PropTypes from 'prop-types';

const InputLabel = ({ children, ...rest }) => {
  return (
    <label className="text-brand-dark-blue text-sm font-semibold" {...rest}>
      {children}
    </label>
  );
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputLabel;
