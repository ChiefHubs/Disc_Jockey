const fs = require("fs");
const path = require("path");
const logFile = path.join(__dirname, "../log/node_error.log");

var errorlog = {};

errorlog.write = function (error) {
  fs.appendFile(
    logFile,
    JSON.stringify(error, Object.getOwnPropertyNames(error)) + "\n",
    function (err) {}
  );
};

errorlog.writeMessage = function (message) {
  fs.appendFile(logFile, message + "\n", function (err) {});
};

module.exports = errorlog;
