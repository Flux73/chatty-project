const GenderInput = ({ title, val, setGender, setError }) => {
  return (
    <label className="label gap-5 cursor-pointer">
      <span className="label-text">{title}</span>
      <input
        type="radio"
        name="gender"
        defaultValue={val}
        onChange={(e) => {
          setGender(e.target.value);
          setError((prev) => ({ ...prev, gender: false }));
        }}
        className="radio checked:bg-primary"
      />
    </label>
  );
};

export default GenderInput;
