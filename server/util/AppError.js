export default class AppError extends Error {
  constructor(args) {
    super(args);
    this.message = "Error";
  }
}
