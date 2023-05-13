const LabelError = ({ error, errorDescription }) => {
  return error ? (
    <label className="label">
      <span className="label-text text-error">{errorDescription}</span>
    </label>
  ) : null;
};

export default LabelError;
