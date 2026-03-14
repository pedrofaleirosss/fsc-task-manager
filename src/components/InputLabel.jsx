const InputLabel = ({ children, ...rest }) => {
  return (
    <label className="text-brand-dark-blue text-sm font-semibold" {...rest}>
      {children}
    </label>
  );
};

export default InputLabel;
