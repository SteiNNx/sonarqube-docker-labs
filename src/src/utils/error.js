class APIError {
  constructor(msg, code, statusCode) {
    this.status = 'noOk';
    this.msg = msg;
    this.code = code;
    this.statusCode = statusCode;
  }
}
module.exports = APIError;
