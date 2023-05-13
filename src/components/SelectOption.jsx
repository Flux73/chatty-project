const SelectOption = ({
  selectTitle,
  options,
  setValue,
  val,
  error,
  setError,
}) => {
  return (
    <select
      onChange={(e) => {
        setValue((prev) => {
          return { ...prev, [val]: e.target.value };
        });
        setError((prev) => {
          return { ...prev, birthDate: { ...prev.birthDate, [val]: false } };
        });
      }}
      className={`select select-bordered focus:select-primary grow ${
        error ? "border border-error" : ""
      }`}
    >
      <option disabled selected>
        {selectTitle}
      </option>
      {options.map((el) => (
        <option value={el}>{el}</option>
      ))}
    </select>
  );
};

export default SelectOption;
