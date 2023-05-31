import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "You must enter a username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "You must provide an email"],
  },
  // bio: {
  //   type: String,
  // }
  // contactNumber: { type: String, unique: true },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  birthDate: {
    type: Date,
  },

  bio: {
    type: String,
  },

  image: String,

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  password: {
    type: String,
    required: [true, "You must create a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    // required: [true, "You must confirm your password"],
    validate: {
      validator: function (el) {
        console.log("ANYWAY", this);
        return this.password === el;
      },
      message: "Confirm password is not the same as your password",
    },
  },

  socketId: String,
  isConnected: Boolean,
  disconnectedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  return next();
});

const User = mongoose.model("User", userSchema);
export default User;
