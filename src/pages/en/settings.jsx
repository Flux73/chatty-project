import ChangePassword from "@/components/ChangePassword";
import FormControl from "@/components/FormControl";
import GenderInput from "@/components/GenderInput";
import HomeNavBar from "@/components/HomeNavBar";
import LabelError from "@/components/LabelError";
import SelectOption from "@/components/SelectOption";
import useFetchMe from "@/hooks/useFetchMe";
import { loginUser } from "@/store/user-slice";
import { days, months, years } from "@/util/dates";
import axios from "axios";
// import MobileNav from "@/components/MobileNav";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DynamicMobileNav = dynamic(() => import("@/components/MobileNav"), {
  ssr: false,
});

const profile = () => {
  const { user } = useSelector((state) => state.user);
  const [gender, setGender] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [bio, setBio] = useState(null);
  const [birthDate, setBirthDate] = useState({
    month: null,
    day: null,
    year: null,
  });
  const [errors, setErrors] = useState({
    gender: false,
    birthDate: {
      month: false,
      day: false,
      year: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useFetchMe();

  useEffect(() => {
    if (!user) return;

    setEmail(user.email);
    setUsername(user.username);
    setGender(user.gender);
    setBirthDate((prev) => ({
      ...prev,
      year: new Date(user.birthDate).getFullYear(),
      day: new Date(user.birthDate).getDate(),
      month: months[new Date(user.birthDate).getMonth()],
    }));
    setBio(user.bio);
  }, [user]);

  const updateUserHandler = async () => {
    try {
      setLoading(true);
      const user = await axios.patch(
        "http://localhost:4000/api/v1/users/me",
        {
          username,
          email,
          birthDate,
          gender,
          bio,
        },
        { withCredentials: true }
      );

      console.log("UpdatedUser", user);
      dispatch(loginUser({ user: user.data.user }));
      setLoading(false);
      router.push("/en/home");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  console.log(user);

  return (
    <div className="h-screen flex flex-col">
      <HomeNavBar></HomeNavBar>
      <main className="px-7 grow overflow-y-scroll py-2">
        <div className="max-w-2xl mr-auto ml-auto">
          <div className="mb-7 flex items-center">
            <h1 className="text-2xl font-semibold mr-auto">Edit Profile</h1>
            <button
              className={`btn btn-secondary ${loading ? "loading" : null}`}
              onClick={updateUserHandler}
            >
              Save
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered focus:input-primary"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered focus:input-primary"
              />
            </div>
            <div className="form-control">
              <label htmlFor="bio" className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                id="bio"
                cols="30"
                rows="10"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                className="textarea textarea-bordered focus:textarea-primary"
                placeholder="Tell us a bit about yourself..."
              ></textarea>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-5">
            <FormControl labelTitle={"Gender"}>
              <div className={`border border-opacity-20 py-1 rounded-lg`}>
                <div className="px-14 flex flex-row justify-between">
                  <GenderInput
                    title={"Male"}
                    val="male"
                    setGender={setGender}
                    setError={setErrors}
                    isChecked={gender === "male"}
                  />
                  <GenderInput
                    title={"Female"}
                    val="female"
                    setGender={setGender}
                    setError={setErrors}
                    isChecked={gender === "female"}
                  />
                </div>
              </div>
              {/* <LabelError
              error={errors.gender}
              errorDescription={"You must choose your gender"}
            /> */}
            </FormControl>
            <FormControl labelTitle={"Date of birth"}>
              <div className="flex gap-3">
                <SelectOption
                  selectTitle={"Day"}
                  options={days}
                  setValue={setBirthDate}
                  val="day"
                  value={birthDate.day}
                  error={errors.birthDate.day}
                  setError={setErrors}
                />
                <SelectOption
                  selectTitle={"Month"}
                  options={months}
                  setValue={setBirthDate}
                  val="month"
                  value={birthDate.month}
                  error={errors.birthDate.month}
                  setError={setErrors}
                />
                <SelectOption
                  selectTitle={"Year"}
                  options={years}
                  setValue={setBirthDate}
                  val="year"
                  value={birthDate.year}
                  error={errors.birthDate.year}
                  setError={setErrors}
                />
              </div>
              {/* <LabelError
          error={Object.values(errors.birthDate).some((el) => el)}
          errorDescription={"You must enter when you were born"}
        /> */}
            </FormControl>
          </div>
          <div className="divider"></div>
          <ChangePassword />
        </div>
      </main>
      <DynamicMobileNav></DynamicMobileNav>
    </div>
  );
};

export default profile;
