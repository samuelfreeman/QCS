import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const env = process.env.NODE_ENV;

// const logDir = 'dist/server/logs';
const logDir = path.join(process.cwd(), "logs");
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new DailyRotateFile({
      colorize: true,
      filename: `${logDir}/-error.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "system-error-service" },
  transports: [
    new DailyRotateFile({
      colorize: true,
      filename: `${logDir}/-error.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

export default {
  // success: successLogger.info,
  info: logger.info.bind(logger),
  error: errorLogger.error.bind(errorLogger),
};
