"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import {
  RiChat1Line,
  RiSearchLine,
  RiSettings3Line,
  RiUserLine,
} from "react-icons/ri";
import SearchFriends from "./SearchFriends";

const MobileNav = ({ disable }) => {
  const router = useRouter();
  return (
    <div className="btm-nav static">
      <Link
        href={"/en/home"}
        className={`hover:bg-base-300 indicator  ${
          router.asPath === "/en/home" ? "active" : ""
        }`}
      >
        <RiChat1Line size={27} />
      </Link>
      <label
        htmlFor={`${!disable ? "my-modal" : null}`}
        className="hover:bg-base-300"
      >
        <RiSearchLine
          size={27}
          className={`${disable ? "opacity-20" : null}`}
        />
      </label>
      {createPortal(<SearchFriends></SearchFriends>, document.body)}

      <Link
        href={"/en/profile/me"}
        className={`hover:bg-base-300  ${
          router.asPath === "/en/profile/me" ? "active" : ""
        }`}
      >
        <RiUserLine size={27} />
      </Link>

      <Link
        href={"/en/settings"}
        className={`hover:bg-base-300  ${
          router.asPath === "/en/settings" ? "active" : ""
        }`}
      >
        <RiSettings3Line size={27} />
      </Link>
    </div>
  );
};

export default MobileNav;
