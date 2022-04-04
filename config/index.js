require("dotenv").config();

module.exports = {
  dbHost: process.env.DATABASE_HOST,
  dbUser: process.env.DATABASE_USER,
  dbPass: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  rajaOngkirKey: process.env.RAJA_ONGKIR_KEY,
  rajaOngkirOrigin: process.env.RAJA_ONGKIR_ORIGIN,
  baseUrl: process.env.APP_BASE_URL,
};
