const {
  dbHost,
  dbPass,
  dbUser,
  dbName,
  dbPort,
  dbDialect = "mysql",
} = require("./");

module.exports = {
  development: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
  },
  test: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
  },
  production: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
  },
};
