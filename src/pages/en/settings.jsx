import HomeNavBar from "@/components/HomeNavBar";
import MobileNav from "@/components/MobileNav";

const profile = () => {
  return (
    <div className="h-screen">
      <HomeNavBar></HomeNavBar>
      <main>
        <h1>Settings</h1>
      </main>
      <MobileNav></MobileNav>
    </div>
  );
};

export default profile;
