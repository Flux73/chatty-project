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
  const [imagePreview, setImagePreview] = useState(
    "https://images.unsplash.com/photo-1682997843688-94722786a722?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  );
  const [img, setImg] = useState(null);
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

        console.log("SENT");
        return;
      }

      await dispatch(updateUserAsync(img, gender, birthDate));

      console.log("good");
      setLoading(false);
      router.push("/en/home");
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={editProfileHandler}
      className="form-control flex flex-col gap-6"
      dir={lang === "ar" ? "rtl" : ""}
    >
      {/* Image Field */}
      <div className="flex gap-5">
        <FormControl
          labelTitle={lang === "ar" ? "صورة الحساب" : "Profile Picture"}
          optionalLabel={lang === "ar" ? "اختياري" : "optional"}
        >
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => {
              setImg(e.target.files[0]);
              const reader = new FileReader();
              reader.addEventListener("load", (e) => {
                setImagePreview(e.target.result);
              });
              reader.readAsDataURL(e.target.files[0]);
            }}
            dir="ltr"
          />
        </FormControl>
        <div className="avatar self-center">
          <div className="w-24 rounded-full">
            <img src={imagePreview} />
          </div>
        </div>
      </div>

      {/* Gender Field */}
      <FormControl labelTitle={lang === "ar" ? "الجنس" : "Gender"}>
        <div
          className={`${
            errors.gender ? "border-error" : "border-neutral"
          } border py-1 rounded-lg`}
        >
          <div className="px-14 flex flex-row justify-between">
            <GenderInput
              title={lang === "ar" ? "ذكر" : "Male"}
              val="male"
              setGender={setGender}
              setError={setErrors}
            />
            <GenderInput
              title={lang === "ar" ? "أنثى" : "Female"}
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
      <FormControl
        labelTitle={lang === "ar" ? "تاريخ الازدياد" : "Date of birth"}
      >
        <div className="flex gap-3">
          <SelectOption
            selectTitle={lang === "ar" ? "اليوم" : "Day"}
            options={days}
            setValue={setBirthDate}
            val="day"
            error={errors.birthDate.day}
            setError={setErrors}
          />
          <SelectOption
            selectTitle={lang === "ar" ? "الشهر" : "Month"}
            options={months}
            setValue={setBirthDate}
            val="month"
            error={errors.birthDate.month}
            setError={setErrors}
          />
          <SelectOption
            selectTitle={lang === "ar" ? "العام" : "Year"}
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
        {!loading ? (lang === "ar" ? "تجهيز الحساب" : "Set Up") : "Loading..."}
      </button>
    </form>
  );
};

export default SetupPhase;
