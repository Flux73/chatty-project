import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const TogglePasswordVisibility = ({ showPassword, setShowPasswords, id }) => {
  return (
    <button
      onClick={() =>
        id !== undefined
          ? setShowPasswords((prev) => {
              const arr = [...prev];
              arr[id] = !arr[id];
              return arr;
            })
          : setShowPasswords((prev) => !prev)
      }
      className="btn btn-square"
      type="button"
      tabIndex="-1"
    >
      {showPassword === false ? (
        <RiEyeCloseLine size={20}></RiEyeCloseLine>
      ) : (
        <RiEyeLine size={20}></RiEyeLine>
      )}
    </button>
  );
};

export default TogglePasswordVisibility;
