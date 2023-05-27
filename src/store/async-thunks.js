import axios from "axios";
import {
  createUser,
  loginUser,
  setServerError,
  updateUserInfo,
} from "./user-slice";
import socket from "@/util/socket";

export const createUserAsync = (username, email, password, confirmPassword) => {
  return async (dispatch, getState) => {
    // const { appSlice } = getState();
    const fetchData = async () => {
      try {
        const user = await axios.post(
          "http://localhost:4000/api/v1/users/signup",
          {
            username,
            email,
            password,
            confirmPassword,
          },
          {
            withCredentials: true,
          }
        );
        console.log("WORKED");
        console.log(user);

        dispatch(createUser({ user: user.data.user }));
        dispatch(setServerError({ error: null }));
        // return Promise.resolve()
      } catch (err) {
        dispatch(setServerError({ error: err.response.data.message }));
        return Promise.reject(err);
      }
    };

    await fetchData();
  };
};

export const updateUserAsync = (img, gender, birthDate) => {
  return async (dispatch, getState) => {
    // const { appSlice } = getState();
    const fetchData = async () => {
      try {
        const user = await axios.patch(
          "http://localhost:4000/api/v1/users/me",
          {
            image: img,
            gender,
            birthDate,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("WORKED");
        console.log(user);

        dispatch(updateUserInfo({ user: user.data.user }));
        dispatch(loginUser());
        dispatch(setServerError({ error: null }));
        socket.emit("user-connected", { userId: user.data.data.user._id });

        // return Promise.resolve()
      } catch (err) {
        dispatch(setServerError({ error: err.response.data.message }));
        return Promise.reject(err);
      }
    };

    await fetchData();
  };
};

export const loginAsync = (email, password, rememberMe) => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      try {
        const user = await axios.post(
          "http://localhost:4000/api/v1/users/login",
          {
            email,
            password,
            rememberMe,
          },
          {
            withCredentials: true,
          }
        );
        console.log("WORKED");
        console.log(user);
        console.log("Socket", user.data.data.user);

        dispatch(loginUser({ user: user.data.data.user }));
        dispatch(setServerError({ error: null }));
        socket.emit("user-connected", { userId: user.data.data.user._id });
      } catch (err) {
        dispatch(setServerError({ error: err.response.data.message }));
        return Promise.reject(err);
      }
    };

    await fetchData();
  };
};
