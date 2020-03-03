const util = require("util")

// ExtendError constructor
var ExtendError = function(message, statusCode, err) {
  Error.captureStackTrace(this, ExtendError)
  this.message = message
  this.statusCode = statusCode
  this.exception = err || new Error()
}

util.inherits(ExtendError, Error)
ExtendError.prototype.name = "ExtendError"
module.exports.ExtendError = ExtendError
