import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/users.js";
import notificationRouter from "./routes/notifications.js";
import friendRouter from "./routes/friends.js";
import chatRouter from "./routes/chats.js";
import errorHandler from "./controllers/errorController.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use((req, res, next) => {
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/friends", friendRouter);
app.use("/api/v1/chats", chatRouter);

// Error Handling
app.use(errorHandler);

export default app;
