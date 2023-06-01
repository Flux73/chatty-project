import { days, months, years } from "@/util/dates";
import { useState } from "react";
import SelectOption from "./SelectOption";
import LabelError from "./LabelError";
import GenderInput from "./GenderInput";
import FormControl from "./FormControl";
import { updateUserAsync } from "@/store/async-thunks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const SetupPhase = ({ lang }) => {
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState({
    month: null,
    day: null,
    year: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    gender: false,
    birthDate: {
      month: false,
      day: false,
      year: false,
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  // console.log(birthDate);

  const editProfileHandler = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!gender || !birthDate.month || !birthDate.day || !birthDate.year) {
        setLoading(false);
        !gender && setErrors((prev) => ({ ...prev, gender: true }));
        Object.keys(birthDate).forEach(
          (el) =>
            !birthDate[el] &&
            setErrors((prev) => ({
              ...prev,
              birthDate: { ...prev.birthDate, [el]: true },
            }))
        );

        return;
      }

      await dispatch(updateUserAsync(gender, birthDate));
      router.push("/en/home");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={editProfileHandler}
      className="form-control flex flex-col gap-6"
    >
      {/* Gender Field */}
      <FormControl labelTitle="Gender">
        <div
          className={`${
            errors.gender ? "border-error" : "border-neutral"
          } border py-1 rounded-lg`}
        >
          <div className="px-14 flex flex-row justify-between">
            <GenderInput
              title="Male"
              val="male"
              setGender={setGender}
              setError={setErrors}
            />
            <GenderInput
              title="Female"
              val="female"
              setGender={setGender}
              setError={setErrors}
            />
          </div>
        </div>
        <LabelError
          error={errors.gender}
          errorDescription={"You must choose your gender"}
        />
      </FormControl>

      {/* BirthDate Field */}
      <FormControl labelTitle="Date of birth">
        <div className="flex gap-3">
          <SelectOption
            selectTitle="Day"
            options={days}
            setValue={setBirthDate}
            val="day"
            error={errors.birthDate.day}
            setError={setErrors}
          />
          <SelectOption
            selectTitle="Month"
            options={months}
            setValue={setBirthDate}
            val="month"
            error={errors.birthDate.month}
            setError={setErrors}
          />
          <SelectOption
            selectTitle="Year"
            options={years}
            setValue={setBirthDate}
            val="year"
            error={errors.birthDate.year}
            setError={setErrors}
          />
        </div>
        <LabelError
          error={Object.values(errors.birthDate).some((el) => el)}
          errorDescription={"You must enter when you were born"}
        />
      </FormControl>
      <button className="btn btn-primary">
        {!loading ? "Set Up" : "Loading..."}
      </button>
    </form>
  );
};

export default SetupPhase;
