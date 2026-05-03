// middleware/validateLogin.js
const Joi = require('joi');
const resFormat = require('../../utility/format-res.utility');

// Schema validasi untuk login
const loginSchema = Joi.object({
 
    username: Joi.string()
        .required()
        .custom((value, helper) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const usernamePattern = /^[a-zA-Z0-9_.-]{3,50}$/;

            if (emailPattern.test(value)) {
            return value; // valid email
            }

            if (usernamePattern.test(value)) {
            return value; // valid username
            }

            // jika mengandung '@' tapi bukan email valid → pesan email
            if (value.includes('@')) {
            return helper.message('Format email tidak valid');
            }

            // selain itu → pesan username
            return helper.message('Username berisi 3-50 karakter: huruf, angka, -, _, .');
        })
        .messages({
            'string.empty': 'Username wajib diisi',
            'any.required': 'Username wajib diisi',
        }),


  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Password wajib diisi',
      'string.min': 'Password minimal 6 karakter',
      'string.max': 'Password maksimal 100 karakter',
    }),
});

// Middleware validasi login
const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    // Ambil semua pesan error
    const errorMessages = error.details.map((detail) => detail.message);

    // Kembalikan response menggunakan resFormat.error
    return res.status(400).json(
      resFormat.error(`${errorMessages}`, 400, "0001", { })
    );
  }

  next();
};

module.exports = validateLogin;
