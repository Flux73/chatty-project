import Link from "next/link";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import {
  RiChat1Line,
  RiSearchLine,
  RiSettings3Line,
  RiUserLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import SearchFriends from "./SearchFriends";
import { useEffect } from "react";

const MobileNav = ({ disable }) => {
  const { unseenMessages: unSeens } = useSelector((state) => state.chat);
  const router = useRouter();
  return (
    <div className="btm-nav">
      <Link
        href={"/en/home"}
        className={`hover:bg-base-300 indicator  ${
          router.asPath === "/en/home" ? "active" : ""
        }`}
      >
        <div className="grid w-32 h-32  place-items-center indicator">
          {unSeens.length === 0 ? null : (
            <span className="indicator-item indicator-center badge badge-primary">
              {unSeens.length}
            </span>
          )}
          <RiChat1Line size={27} />
        </div>
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
      {/* <SearchFriends></SearchFriends> */}
      {createPortal(<SearchFriends></SearchFriends>, document.body)}
      {/* <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div> */}
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
