// error/index.js

const resFormat = require('../utility/format-res.utility');
const { ErrorQueryException } = require("./query.error");
const { ErrorAuthenticationException } = require("./authentication.error");
const { NotFoundError } = require("./not-found.error");
const { ErrorCodeException } = require("./code.error");
const { DuplicateDataException } = require("./duplicate-data.error");
const { ErrorModelNotFoundException } = require("./model-not-found.error");

// Middleware: URL Validation (trigger jika route tidak ditemukan)
const urlValidation = (req, res, next) => {
  throw new NotFoundError("URL tidak ditemukan");
};

// Middleware: Central Error Handler
const handleErrors = (err, req, res, next) => {
  let code = 500;
  let message = err.message || "Terjadi kesalahan internal";
  let response_code = "0001";
  let data = {};

  //  Model Tidak Ditemukan
  if (err instanceof ErrorModelNotFoundException) {
    code = 404;
    message = `Ops, ${err.message || "Data tidak ditemukan."}`;
    response_code = "5574";
  }

  //  Kesalahan Autentikasi
  else if (err instanceof ErrorAuthenticationException) {
    code = 401;
    message = err.message || "Autentikasi gagal, username atau password salah.";
    response_code = "0001";
  }

  //  Kesalahan duplicate
  else if (err instanceof DuplicateDataException) {
    code = 409;
    message = err.message || "gagal, data sudah digunakan.";
    response_code = "0001";
  }

  //  Not Found Error
  else if (err instanceof NotFoundError) {
    code = 404;
    message = err.message || "Data tidak ditemukan.";
    response_code = "0002";
  }

  //  General Code Error
  else if (err instanceof ErrorCodeException) {
    code = 500;
    message = err.message || "Terjadi kesalahan server internal.";
    response_code = "0003";
    data = err.data || {};
  }

  //  Database Query Error
  else if (err instanceof ErrorQueryException) {
    code = err.data?.metaData?.code || 500;
    message = `Ops, terjadi kesalahan query. ${err.data?.metaData?.message || ""}`;
    response_code = err.data?.metaData?.response_code || "0004";
    data = err.data?.data || {};
  }

  //  Unhandled / Unknown Error
  else {
    console.error("Unhandled Error:", err);
    code = 500;
    message = `Ops, ${err.message || "Terjadi kesalahan yang tidak diketahui."}`;
    response_code = "9999";
    data = {};
  }

  // Kirim response 
  return res.status(code).json(resFormat.error(message, code, response_code, data));
};

module.exports = {
  urlValidation,
  handleErrors,
};
