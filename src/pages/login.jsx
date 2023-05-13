import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import socket from "@/util/socket";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const getUsernameHanlder = (e) => {
    setUsername(e.target.value);
  };
  const getPasswordHanlder = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        {
          email: username,
          password: password,
        },
        { withCredentials: true }
      );

      socket.emit("user-connected", { userId: req.data.data.user._id });
      router.push("/me");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <form className="form-control" onSubmit={loginHandler}>
        <label htmlFor="username" className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          onChange={getUsernameHanlder}
          id="username"
          type="text"
          className="input input-primary"
        />
        <label htmlFor="password" className="label">
          <span className="label-text">password</span>
        </label>
        <input
          onChange={getPasswordHanlder}
          id="password"
          type="password"
          className="input input-primary"
        />
        <button className="btn btn-primary">submit</button>
      </form>
    </section>
  );
};

export default Login;
