import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ChangePassword = () => {
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const changePasswordHandler = async () => {
    try {
      setLoading(true);

      if (!newPassword || !password || !confirmPassword) {
        setLoading(false);
        !password && setErrors((prev) => ({ ...prev, password: true }));
        !newPassword && setErrors((prev) => ({ ...prev, newPassword: true }));
        !confirmPassword &&
          setErrors((prev) => ({ ...prev, confirmPassword: true }));

        return;
      }

      const req = await axios.patch(
        "http://localhost:4000/api/v1/users/changePassword",
        {
          password,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );

      console.log(req);

      setLoading(false);
      router.push("/en/home");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-5">Change Password</h3>
      {error ? (
        <div className="alert alert-error shadow-lg mb-2">
          <div>
            <svg
              onClick={() => setError(null)}
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col gap-5">
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: false }));
            }}
            className={`input input-bordered focus:input-primary ${
              errors.password ? "input-error" : ""
            }`}
          />
          {errors.password ? (
            <label className="label">
              <span className="label-text text-error">
                You must enter your password
              </span>
            </label>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="newPassword" className="label">
            <span className="label-text">New password</span>
          </label>
          <input
            id="newPassword"
            type="password"
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrors((prev) => ({ ...prev, newPassword: false }));
            }}
            className={`input input-bordered focus:input-primary ${
              errors.newPassword ? "input-error" : ""
            }`}
          />
          {errors.newPassword ? (
            <label className="label">
              <span className="label-text text-error">
                You must enter a new password
              </span>
            </label>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="confirmNewPassword" className="label">
            <span className="label-text">Confirm new password</span>
          </label>
          <input
            id="confirmNewPassword"
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: false }));
            }}
            className={`input input-bordered focus:input-primary ${
              errors.confirmPassword ? "input-error" : ""
            }`}
          />
          {errors.confirmPassword ? (
            <label className="label">
              <span className="label-text text-error">
                You must confirm your new password
              </span>
            </label>
          ) : null}
        </div>
        <button
          className={`btn btn-secondary ${loading ? "loading" : ""}`}
          onClick={changePasswordHandler}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
