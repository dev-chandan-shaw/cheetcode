/** DEVELOPMENT ENVIRONMENT PROPERTIES */
export default {
  /* Server environment - NOT CHANGEABLE */
  NODE_ENV: "Development",
  /* Current status of production server - NOT CHANGEABLE */
  PRODUCTION: false,
  /* MongoDb connection string - CHANGE WITH YOUR OWN MongoDb CONNECTION STRING */
  MONGO_DB_URL: "mongodb://localhost:27017/cheetcode",
  /* Server host IP - CHANGEABLE */
  HOST_IP: "http://127.0.0.1",
  /* Database name - CHANGEABLE */
  DB_NAME: "cheetcode",
  /* Server running port - CHANGEABLE */
  PORT: 3000,
  /* Hash encryption salt key - CHANGEABLE */
  HASH_SALT: 10,
  /* Hash encryption secret key - REMOVE THE BELOW STRING AND ENTER ANOTHER */
  SECRET_KEY: "<A string for encryption>",
  /* JSON web token expire time in second - CHANGEABLE [DEFAULT 24HRs] */
  JWT_LIFE: 86400,
  /* JSON web token encryption key - CHANGEABLE */
  JWT_KEY: 777,
  /* Gmail address - CHANGE THE BELOW TO YOUR OWN GMAIL ADDRESS */
  MAILER_ID: "<Your email address>",
  /* App password generate from gmail - CHANGE THE BELOW TO YOUR OWN GMAIL APP PASSWORD */
  MAILER_PASS: "<App password by gmail>",
  /* Password format - CHANGEABLE [DEFAULT FORMAT 1 CAPITAL LETTER, 1 SMALL LETTER, 1 NUMBER, 1 SPECIAL CHARACTER] */
  PASSWORD_FORMAT:
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
};
