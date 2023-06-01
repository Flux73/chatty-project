import Image from "next/image";
import FormControl from "@/components/FormControl";
import NavBar from "@/components/NavBar";
import TogglePasswordVisibility from "@/components/TogglePasswordVisibility";
import isAuthenticated from "@/hoc/isAuthenticated";
import { useState } from "react";
import { useSelector } from "react-redux";
import rightImg from "../../../public/imgs/signin_pic.jpg";
import Link from "next/link";
import { setServerError } from "@/store/user-slice";
import { useDispatch } from "react-redux";
import { loginAsync } from "@/store/async-thunks";
import { useRouter } from "next/router";

const Login = ({ lang }) => {
  const { theme } = useSelector((state) => state.theme);
  const { error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  const loginSubmitHandler = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!email || !password) {
        setLoading(false);
        !email && setErrors((prev) => ({ ...prev, email: true }));
        !password && setErrors((prev) => ({ ...prev, password: true }));

        return;
      }

      await dispatch(loginAsync(email, password, rememberMe));
      setLoading(false);
      router.push("/en/home");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <section className="h-screen overflow-x-hidden lg:flex">
      <div className="basis-1/2 z-10 flex flex-col gap-16">
        <NavBar lang="en"></NavBar>
        {/* Main Code Form and so on */}
        <main className="mr-auto ml-auto w-3/4 md:w-1/2">
          <h1 className="text-4xl font-bold text-center mb-7 md:text-5xl">
            Log in
          </h1>
          <p className="text-center mb-10">Log in to your account</p>
          {error ? (
            <div className="alert alert-error shadow-lg mb-2">
              <div>
                <svg
                  onClick={() => dispatch(setServerError({ error: null }))}
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

          <form
            onSubmit={loginSubmitHandler}
            className="form-control flex flex-col gap-6"
            dir={lang === "ar" ? "rtl" : ""}
          >
            <FormControl labelTitle="Email">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: false }));
                }}
                className={`input input-bordered focus:input-primary ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email ? (
                <label className="label">
                  <span className="label-text text-error">
                    You must enter your email
                  </span>
                </label>
              ) : null}
            </FormControl>
            <FormControl labelTitle="Password">
              <div
                className={`input-group ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <input
                  type={!showPassword ? "password" : "text"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: false }));
                  }}
                  className={`input input-bordered focus:input-primary grow ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                <TogglePasswordVisibility
                  showPassword={showPassword}
                  setShowPasswords={setShowPassword}
                />
              </div>
              {errors.password ? (
                <label className="label">
                  <span className="label-text text-error">
                    You must enter your password
                  </span>
                </label>
              ) : null}
            </FormControl>
            <button className="btn btn-primary">
              {!loading
                ? lang === "ar"
                  ? "إنشاء حساب"
                  : "Log in"
                : "Loading..."}
            </button>
          </form>
        </main>
      </div>
      <div className="basis-1/2 relative hidden lg:flex">
        <div
          className="bg-cover bg-[-16rem] bg-no-repeat absolute w-full h-full z-10"
          style={{
            backgroundImage: `url("/imgs/${
              theme === "light" ? "wave_light" : "wave"
            }.svg")`,
          }}
        />
        <div
          className={`absolute w-full h-full bg-gradient-to-br ${
            theme === "light"
              ? "from-sky-500 to-indigo-500"
              : "from-pink-500 to-purple-500"
          } opacity-30`}
        ></div>

        <Image
          style={{ objectFit: "cover" }}
          src={rightImg}
          alt="Woman Texting"
          // width={500}
          // height={500}
        />
      </div>
    </section>
  );
};

export default isAuthenticated(Login);
