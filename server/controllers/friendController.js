import User from "../models/userModel.js";

const addFriend = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend } = req.params;

    console.log(friend, user, "LLLL");

    await User.findOneAndUpdate(
      { _id: user.id },
      { $push: { friends: friend } },
      {
        new: true,
      }
    );
    await User.findOneAndUpdate(
      { _id: friend },
      { $push: { friends: user.id } },
      {
        new: true,
      }
    );

    res.status(201).json({
      status: "success",
      message: "Friend Has been added",
    });
  } catch (err) {
    next(err);
  }
};

const getFriends = async (req, res, next) => {
  try {
    const user = req.user;
    const { friends } = await User.findOne({ _id: user.id }).populate({
      path: "friends",
      select: "-friends",
    });

    res.status(200).json({
      status: "success",
      data: {
        friends,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getFriend = async (req, res, next) => {
  try {
    const user = req.user;
    const searchQuery = req.params.friend;
    const { friends } = await user.populate({
      path: "friends",
      select: "-friends",
    });

    if (!friends) next(new Error("No friend was found with this username"));

    const results = friends.filter((result) =>
      result.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch (err) {
    next(err);
  }
};

export default { addFriend, getFriends, getFriend };
