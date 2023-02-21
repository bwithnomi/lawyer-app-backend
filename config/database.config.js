import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const config = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 27017,
  env: process.env.NODE_ENV || "development",
  database: process.env.DB_NAME || "logs",
  viewEngine: process.env.VIEW_ENGINE || "html"
};

export default config;
