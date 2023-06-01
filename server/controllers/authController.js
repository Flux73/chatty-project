import bcrypt from "bcrypt";
import { promisify } from "util";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import emaill from "../util/email.js";

export const signup = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      confirmPassword: req.body.confirmPassword,
    });

    user.password = undefined;

    const token = jwt.sign(
      { _id: user._id },
      "i-am-the-one-that-will-becoming-"
    );

    res.cookie("jwt", token, {
      maxAge: 2592000000,
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) return next(new Error("Email Or Password is Invalid"));

    if (!(await bcrypt.compare(req.body.password, user.password)))
      return next(new Error("Email Or Password is Invalid"));

    const token = jwt.sign(
      { _id: user._id },
      "i-am-the-one-that-will-becoming-"
    );

    res.cookie("jwt", token, {
      // expires: new Date(Date.now() + 30000),
      maxAge: 2592000000,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({
      status: "success",
      data: { user },
      message: "Logged In successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      error: err,
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    console.log("WORKED");
    res.cookie("jwt", "loggingOut", {
      // expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      data: { user: req.user },
      message: "Logged Out successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;

    if (authorization?.startsWith("Bearer")) {
      // console.log();
      token = authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      next(new Error("Token Not Found"));
      return;
    }

    const decoded = await promisify(jwt.verify)(
      token,
      "i-am-the-one-that-will-becoming-"
    );

    const user = await User.findById(decoded._id).select("+password");

    if (!user) {
      next(new Error("User Is Not Avaible Anymore"));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    next(new Error("User Was Not Found"));
    return;
  }

  const token = jwt.sign(
    { _id: user._id },
    "i-am-the-one-that-will-becoming-",
    {
      expiresIn: "1h",
    }
  );

  const text = `This is your token for resetting your password \n
  "http://localhost:3000/api/v1/users/resetPassword/${token}" \n
  If u didnt request a reset password, ignore this email!
  `;

  await emaill(user.email, text);

  res.status(200).json({
    status: "success",
    token,
  });
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    next(new Error("Token Is Not Found"));
    return;
  }

  const decoded = jwt.verify(token, "i-am-the-one-that-will-becoming-");

  const user = await User.findById(decoded._id);
  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    user,
    message: "Password Has Been Reseted",
  });
};

export const changePassword = async (req, res, next) => {
  try {
    const user = req.user;

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return next(new Error("Password is incorrect"));
    }

    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();
    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
      // token: newToken,
    });
  } catch (err) {
    next(new Error(err));
  }
};

export default {
  signup,
  login,
  logout,
  protect,
  forgetPassword,
  resetPassword,
  changePassword,
};
