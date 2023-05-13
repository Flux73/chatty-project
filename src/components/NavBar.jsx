import Link from "next/link";
import Image from "next/image";
import logoDark from "../../public/imgs/Asset 3.svg";
import logoLight from "../../public/imgs/Asset 1.svg";
import arabicPic from "../../public/imgs/arabic_pic.png";
import englishPic from "../../public/imgs/english_pic.png";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setTheme as setThemeState } from "@/store/theme-slice";

const NavBar = ({ lang, isSignup }) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <nav className="px-16 py-8">
      <ul
        className={`flex items-center gap-6 ${
          lang === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <li className={lang === "ar" ? "ml-auto" : "mr-auto"}>
          <Image
            src={theme === "dracula" ? logoDark : logoLight}
            alt="Logo"
            width={180}
            height={180}
          />
        </li>
        <li>
          <Link
            href={`/en/${isSignup ? "login" : "signup"}`}
            className="link link-hover"
          >
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </li>
        <li>
          <div className="dropdown">
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
        <li className="flex justify-center items-center">
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
    </nav>
  );
};

export default NavBar;
