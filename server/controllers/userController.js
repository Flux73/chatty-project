import express from "express";
import User from "../models/userModel.js";

const me = (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    user,
  });
};

const updateMe = async (req, res, next) => {
  try {
    const user = req.user;

    console.log(req.body.image);
    // user.image = req.body.image || null;
    user.birthDate = new Date(
      `${req.body.birthDate.month} ${req.body.birthDate.day} ${req.body.birthDate.year}`
    );
    user.gender = req.body.gender;

    console.log(user);
    await user.save();

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      messgae: "failed to update",
    });
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const user = req.user;
    const searchQuery = req.params.user;

    const users = await User.find({
      username: {
        $regex: `^${searchQuery}`,
        $options: "i",
        $ne: `${user.username}`,
      },
    });
    if (!users) next(new Error("No Users were found with this username"));

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export default { me, searchUsers, updateMe };
