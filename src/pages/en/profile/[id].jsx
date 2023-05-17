import { useRouter } from "next/router";
import Link from "next/link";
import HomeNavBar from "@/components/HomeNavBar";
import MobileNav from "@/components/MobileNav";
import useFetchMe from "@/hooks/useFetchMe";
import Image from "next/image";
import { useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  useFetchMe();

  return (
    <div className="h-screen">
      <HomeNavBar></HomeNavBar>
      <main>
        <div className="px-8">
          <header className="flex gap-4 flex-wrap">
            <div class="avatar">
              <div class="mask mask-squircle">
                <Image src="/imgs/profile.jpg" width={100} height={100} />
              </div>
            </div>
            <div className="flex flex-col gap-3 mr-auto">
              <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold text-neutral-content">
                  {user.username}
                </h1>
                <div className="badge">{`${String(
                  user.gender
                )[0].toUpperCase()}${String(user.gender).slice(1)}`}</div>
              </div>
              <p className="self-baseline text-neutral-content">
                <span className="text-lg font-semibold">
                  {new Date().getFullYear() -
                    new Date(user.birthDate).getFullYear()}
                </span>{" "}
                years old
              </p>
            </div>
            {router.query.id !== "me" ? (
              <form className="basis-full sm:basis-auto">
                <button
                  href="/en/settings"
                  className="btn btn-primary btn-block"
                >
                  Add Friend
                </button>
              </form>
            ) : (
              <div className="basis-full sm:basis-auto">
                <Link
                  href="/en/settings"
                  className="btn btn-secondary btn-block"
                >
                  Edit
                </Link>
              </div>
            )}
          </header>
          <div className="divider"></div>
          <div>
            <h2 className="text-2xl font-bold mb-5">Bio 🔥</h2>
            <p className="text-neutral-content font-medium text-lg text-opacity-70 leading-relaxed">
              Hey there! I'm Samantha Hayes, a travel-loving, game-playing
              developer. I'm all about exploring the world and immersing myself
              in exciting gaming adventures. As a software developer, I enjoy
              the challenge of creating innovative solutions through coding.
              When I'm not working, you'll find me planning my next travel
              escapade or diving into captivating virtual worlds. I believe in
              the power of technology to enhance our lives, and I embrace the
              joy of both travel and gaming. Let's embark on amazing journeys
              together, whether it's through lines of code or across
              breathtaking landscapes!
            </p>
          </div>
        </div>
      </main>
      <MobileNav></MobileNav>
    </div>
  );
};

export default page;
