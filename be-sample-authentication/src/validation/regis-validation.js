const Joi = require('joi');
const resFormat = require('../../utility/format-res.utility');

// Schema validasi registrasi
const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Nama wajib diisi',
      'string.min': 'Nama minimal 3 karakter',
      'string.max': 'Nama maksimal 100 karakter',
      'any.required': 'Nama wajib diisi',
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email wajib diisi',
      'string.email': 'Format email tidak valid',
      'any.required': 'Email wajib diisi',
    }),

  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_.-]{3,50}$/)
    .required()
    .messages({
      'string.empty': 'Username wajib diisi',
      'string.pattern.base': 'Username berisi 3-50 karakter: huruf, angka, -, _, .',
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
      'any.required': 'Password wajib diisi',
    }),
});

// Middleware validasi registrasi
const validateRegis = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res
      .status(400)
      .json(resFormat.error('Validasi input gagal', 400, 'AUTH_002', errorMessages));
  }

  next();
};

module.exports = validateRegis;
