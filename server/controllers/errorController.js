export default (err, req, res, next) => {
  console.log(err.message);
  console.log({ ...err });
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };

  if (err.code === 11000) {
    return res.status(400).json({
      status: "fail",
      message: "Username and email must be unique",
      err,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(404).json({
      status: "fail",
      message: "Token Invalid",
      err,
    });
  }

  res.status(500).json({
    status: "fail",
    message: err.message,
    err,
  });
};
