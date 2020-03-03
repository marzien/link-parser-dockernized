const fs = require("fs")
const util = require("util")

const log_file = fs.createWriteStream(__dirname + "/log.txt", { flags: "a" })

module.exports = (err, req, res, next) => {
  let now = new Date()
  let logger = (err) => {
    log_file.write(
      "---------- Start of error log: " + util.format(now) + " --------\n"
    )
    log_file.write(util.format(err) + " \n")
    log_file.write(
      "\n---------------------- End of error log ----------------------\n"
    )
    log_file.write("\n")
  }
  logger(err)
  res.status(err.statusCode).json(err.message)
}
