import { createUserAsync } from "@/store/async-thunks";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import TogglePasswordVisibility from "./TogglePasswordVisibility";

const CreatePhase = ({ lang, setStep }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState([false, false]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();

  console.log(showPasswords);

  const createUserHandler = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!username || !email || !password || !confirmPassword) {
        setLoading(false);
        !username && setErrors((prev) => ({ ...prev, username: true }));
        !email && setErrors((prev) => ({ ...prev, email: true }));
        !password && setErrors((prev) => ({ ...prev, password: true }));
        !confirmPassword &&
          setErrors((prev) => ({ ...prev, confirmPassword: true }));

        console.log("SENT");
        return;
      }

      await dispatch(
        createUserAsync(username, email, password, confirmPassword)
      );
      setLoading(false);
      setStep(2);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // setStep(2);
  };

  return (
    <>
      <form
        onSubmit={createUserHandler}
        className="form-control flex flex-col gap-6"
        dir={lang === "ar" ? "rtl" : ""}
      >
        <div className="form-control">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: false }));
            }}
            className={`input input-bordered focus:input-primary ${
              errors.username ? "input-error" : ""
            }`}
            type="text"
            placeholder={lang === "ar" ? "اسم المستخدم" : "Username"}
          />
          {errors.username ? (
            <label className="label">
              <span className="label-text text-error">
                You must provide a username
              </span>
            </label>
          ) : null}
        </div>
        <div className="form-control">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: false }));
            }}
            className={`input input-bordered focus:input-primary ${
              errors.email ? "input-error" : ""
            }`}
            type="text"
            placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"}
          />
          {errors.email ? (
            <label className="label">
              <span className="label-text text-error">
                You must provide an email
              </span>
            </label>
          ) : null}
        </div>
        <div className="form-control">
          <div
            className={`input-group ${lang === "ar" ? "flex-row-reverse" : ""}`}
          >
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: false }));
              }}
              className={`input input-bordered focus:input-primary grow ${
                errors.password ? "input-error" : ""
              }`}
              type={showPasswords[0] === false ? "password" : "text"}
              placeholder={lang === "ar" ? "كلمة المرور" : "Password"}
            />
            <TogglePasswordVisibility
              id={0}
              showPassword={showPasswords[0]}
              setShowPasswords={setShowPasswords}
            />
          </div>
          {errors.password ? (
            <label className="label">
              <span className="label-text text-error">
                You must provide a password
              </span>
            </label>
          ) : null}
        </div>
        <div className="form-control">
          <div
            className={`input-group ${lang === "ar" ? "flex-row-reverse" : ""}`}
          >
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: false }));
              }}
              className={`input input-bordered focus:input-primary grow ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              type={showPasswords[1] === false ? "password" : "text"}
              placeholder={
                lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"
              }
            />
            <TogglePasswordVisibility
              id={1}
              showPassword={showPasswords[1]}
              setShowPasswords={setShowPasswords}
            />
          </div>
          {errors.confirmPassword ? (
            <label className="label">
              <span className="label-text text-error">
                You must confirm your password
              </span>
            </label>
          ) : null}
        </div>
        <button className="btn btn-primary">
          {!loading ? (lang === "ar" ? "إنشاء حساب" : "Sign Up") : "Loading..."}
        </button>
      </form>
    </>
  );
};

export default CreatePhase;
