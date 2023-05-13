import Image from "next/image";
import rightImg from "../../../public/imgs/signin_pic.jpg";
import waveDark from "../../../public/imgs/wave.svg";
import waveLight from "../../../public/imgs/wave_light.svg";
import NavBar from "@/components/NavBar";
import { useSelector } from "react-redux";
import SetupPhase from "@/components/SetupPhase";
import CreatePhase from "@/components/CreatePhase";
import { useEffect } from "react";

const Signup = () => {
  const { theme } = useSelector((state) => state.theme);

  // useEffect(() => {
  //   document.body.setAttribute("dir", "rtl");
  // }, []);

  return (
    <section className="h-screen flex justify-around flex-row-reverse">
      <div className="basis-1/2 z-10 flex flex-col gap-8">
        <NavBar lang="ar"></NavBar>
        <main className="mr-auto ml-auto">
          <h1 className="text-5xl font-bold text-center mb-7">إنشاء حساب</h1>
          <p className="text-center mb-10">
            انشئ حساب الآن وابقَ على اتصال بأصدقائك من خلال <br /> منصتنا
            للدردشة
          </p>
          <div className="flex justify-center mb-10">
            <ul className="steps">
              <li className="step step-primary">إنشاء</li>
              <li className="step">تجهيز</li>
            </ul>
          </div>
          <CreatePhase lang="ar"></CreatePhase>
          {/* <SetupPhase lang="ar"></SetupPhase> */}
        </main>
      </div>

      <div className="flex relative basis-1/2">
        <div
          className="bg-cover bg-[-16rem] bg-no-repeat absolute w-full h-full z-10 rotate-180"
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
        <Image className="object-cover" src={rightImg} alt="Woman Texting" />
        {/* <Image
          className="absolute -right-20 h-full rotate-180"
          src={theme === "light" ? waveLight : waveDark}
          alt="Wave"
        /> */}
      </div>
    </section>
  );
};

export default Signup;
