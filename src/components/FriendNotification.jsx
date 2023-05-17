import Image from "next/image";

const FriendNotification = () => {
  return (
    <div className="flex">
      <div tabindex="0" className="avatar">
        <div className="mask mask-squircle cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src="/imgs/profile.jpg"
            width={50}
            height={50}
            alt="Profile Picture"
          ></Image>
        </div>
      </div>
      <div className="flex flex-col mr-auto">
        <span className="font-bold">Salah Moumni</span>
        <p className="">
          Sent you a friend request <span className="opacity-70">1h ago</span>
        </p>
      </div>
      <button className="btn btn-primary btn-sm">Add friend</button>
    </div>
  );
};

export default FriendNotification;
