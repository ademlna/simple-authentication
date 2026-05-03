const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");
const dotenv = require("dotenv");
const dbConfig = require("../config/db.config");

dotenv.config();

// Ambil konfigurasi MySQL dari file db.config.js
const {
  HOST,
  PORT,
  USERNAME,
  PASSWORD,
  DB,
  DIALECT,
  OPTIONS,
  LOGGING,
} = dbConfig.mysql;

// Buat instance Sequelize
const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
  pool: OPTIONS,
  logging: LOGGING,
});

// Tes koneksi database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database connected successfully");
  } catch (error) {
    console.error(" Unable to connect to the database:", error.message);
  }
};

// Buat objek db
const db = {
  sequelize,
  Sequelize,
  DataTypes,
  Op,
  QueryTypes,
};

// Import semua model dari folder src/models
const modelsFolder = path.join(__dirname, "../src/models");

fs.readdirSync(modelsFolder)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(modelsFolder, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Setup relasi antar model (jika ada)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Jalankan tes koneksi
connectDB();

module.exports = db;
