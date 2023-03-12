import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const config = {
  secret: process.env.JWT_SECRET_KEY || 'secret_key',
};

export default config;