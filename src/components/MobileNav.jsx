import Link from "next/link";
import { useRouter } from "next/router";
import {
  RiChat1Line,
  RiSearchLine,
  RiSettings3Line,
  RiUserLine,
} from "react-icons/ri";

const links = ["home", "search", "profile/me", "settings"];
const items = [
  <RiChat1Line size={27} />,
  <RiSearchLine size={27} />,
  <RiUserLine size={27} />,
  <RiSettings3Line size={27} />,
];

const MobileNav = () => {
  const router = useRouter();
  return (
    <div className="btm-nav">
      {links.map((link, i) => (
        <Link
          href={`/en/${link}`}
          className={`hover:bg-base-300  ${
            router.asPath === `/en/${link}` ? "active" : ""
          }`}
        >
          {items[i]}
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
