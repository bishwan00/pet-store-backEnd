export default class customError extends Error {
  constructor(message, code) {
    super(message);
    this.status = code;
  }
}
