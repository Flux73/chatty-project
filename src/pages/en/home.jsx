import isAuthenticated from "@/hoc/isAuthenticated";
import { logoutUser } from "@/store/user-slice";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const home = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users/logout", {
        withCredentials: true,
      });
      dispatch(logoutUser());
      router.push("/en/signup");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ul>
        <li>home</li>
      </ul>
      <button className="btn btn-accent" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default isAuthenticated(home);

home.requireAuth = true;
