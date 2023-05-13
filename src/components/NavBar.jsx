import Link from "next/link";
import Image from "next/image";
import logoDark from "../../public/imgs/Asset 3.svg";
import logoLight from "../../public/imgs/Asset 1.svg";
import arabicPic from "../../public/imgs/arabic_pic.png";
import englishPic from "../../public/imgs/english_pic.png";
import {
  RiArrowLeftLine,
  RiArrowLeftSLine,
  RiMenu2Line,
  RiMoonLine,
  RiSunLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setTheme as setThemeState } from "@/store/theme-slice";
import { useState } from "react";

const NavBar = ({ lang, isSignup }) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  console.log(isHovered);

  return (
    <nav className="px-8 py-8 lg:px-16">
      <ul
        className={`flex items-center gap-6 ${
          lang === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <li className={lang === "ar" ? "ml-auto" : "mr-auto"}>
          <Image
            src={theme === "dracula" ? logoDark : logoLight}
            alt="Logo"
            width={140}
            height={140}
            className="md:w-44"
          />
        </li>
        <li className="hidden sm:flex">
          <Link
            href={`/en/${isSignup ? "login" : "signup"}`}
            className="link link-hover"
          >
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </li>
        <li className="flex">
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost rounded-btn">
              <Image
                src={lang === "ar" ? arabicPic : englishPic}
                alt="Language Flag"
                width={25}
                height={25}
              />
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={`../${lang === "en" ? "ar" : "en"}/signup`}>
                  {lang === "ar" ? "English" : "العربية"}
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="hidden sm:flex justify-center items-center">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={() => {
                dispatch(
                  setThemeState({
                    theme: theme === "dracula" ? "light" : "dracula",
                  })
                );
              }}
            />
            <RiSunLine className={`swap-on fill-current`} size={27} />
            <RiMoonLine className={`swap-off fill-current`} size={27} />
          </label>
        </li>
        <li className="sm:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost rounded-btn">
              <RiMenu2Line size={27} />
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <li>
                <Link
                  href={`/en/${isSignup ? "login" : "signup"}`}
                  className="link link-hover text-center inline-block"
                >
                  {isSignup ? "Log in" : "Sign up"}
                </Link>
              </li>
              <li>
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    onChange={() => {
                      dispatch(
                        setThemeState({
                          theme: theme === "dracula" ? "light" : "dracula",
                        })
                      );
                    }}
                  />
                  <RiSunLine className={`swap-on fill-current`} size={27} />
                  <RiMoonLine className={`swap-off fill-current`} size={27} />
                </label>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
