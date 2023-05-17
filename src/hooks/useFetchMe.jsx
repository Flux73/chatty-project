import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import socket from "@/util/socket";
import { loginUser } from "@/store/user-slice";

const useFetchMe = () => {
  const {
    user: { id },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserMe = async () => {
      if (id) return;
      const user = await axios.get("http://localhost:4000/api/v1/users/me", {
        withCredentials: true,
      });

      dispatch(loginUser({ user: user.data.user }));
      socket.emit("user-connected", { userId: user.data.user._id });
    };

    fetchUserMe();
  }, []);

  return null;
};

export default useFetchMe;
