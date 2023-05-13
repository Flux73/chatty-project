import Image from "next/image";
import rightImg from "../../../public/imgs/signin_pic.jpg";
import NavBar from "@/components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import CreatePhase from "@/components/CreatePhase";
import SetupPhase from "@/components/SetupPhase";
import { useState } from "react";
import { setServerError } from "@/store/user-slice";
import isAuthenticated from "@/hoc/isAuthenticated";

const Signup = () => {
  const { theme } = useSelector((state) => state.theme);
  const { error } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  console.log("Error 2::::", error);

  return (
    <section className="h-screen overflow-x-hidden lg:flex">
      <div className="basis-1/2 z-10 flex flex-col gap-16">
        <NavBar lang="en" isSignup={true}></NavBar>
        {/* Main Code Form and so on */}
        <main className="mr-auto ml-auto w-3/4 md:w-1/2">
          <h1 className="text-4xl font-bold text-center mb-7 md:text-5xl">
            Sign up
          </h1>
          <p className="text-center mb-10">
            Sign up today and stay connected with your friends <br /> through
            our chat platform!
          </p>
          <div className="flex justify-center mb-10">
            <ul className="steps">
              {["Create", "Set Up"].map((stp, i) => (
                <li className={`step ${i + 1 <= step ? "step-primary" : ""}`}>
                  {stp}
                </li>
              ))}
            </ul>
          </div>
          {error ? (
            <div className="alert alert-error shadow-lg mb-2 max-w-sm">
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
          {step === 1 ? (
            <CreatePhase lang="en" setStep={setStep}></CreatePhase>
          ) : null}
          {step === 2 ? <SetupPhase></SetupPhase> : null}
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

export default isAuthenticated(Signup);
