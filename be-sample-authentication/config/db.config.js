require("dotenv").config();

module.exports = {

  mysql: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT || 3306,
    USERNAME: process.env.DB_USER || "laravel_user",
    PASSWORD: process.env.DB_PASSWORD || "password123",
    DB: process.env.DB_NAME || "autentikasi",
    DIALECT: "mysql",
    OPTIONS: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    LOGGING: process.env.NODE_ENV === "development" ? console.log : false,
  },
};
