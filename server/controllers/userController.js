import express from "express";
import User from "../models/userModel.js";
import mongoose from "mongoose";

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

    user.birthDate = req.body.birthDate
      ? new Date(
          `${req.body.birthDate.month} ${req.body.birthDate.day} ${req.body.birthDate.year}`
        )
      : user.birthDate;
    user.gender = req.body.gender ? req.body.gender : user.gender;
    user.username = req.body.username ? req.body.username : user.username;
    user.email = req.body.email ? req.body.email : user.email;
    user.bio = req.body.bio;

    await user.save();
    console.log("-------------", user);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to update",
    });
  }
};

const setUpUpdate = async (req, res, next) => {
  try {
    const user = req.user;

    console.log(user.birthDate);
    user.birthDate = new Date(
      `${req.body.birthDate.month} ${req.body.birthDate.day} ${req.body.birthDate.year}`
    );
    user.gender = req.body.gender;

    await user.save();

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to update",
    });
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const user = req.user;
    const searchQuery = req.params.search;

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

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.user);

    if (!user) next(new Error("No Users were found with this username"));

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default { me, searchUsers, updateMe, getUser, setUpUpdate };
