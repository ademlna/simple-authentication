// routes/login.route.js
const express = require('express');
const router = express.Router();
const { loginController,getlistUsers, logoutController ,profil,  register } = require('../controllers/auth.controller');
const validateRegis = require('../validation/regis-validation');
const { authMiddleware } = require('../middlewares/auth.middleware');
const validateLogin = require('../validation/login.validation');

const GroupAuth = "auth";
const GroupUser = "user";
const pathVersion = "v1";

router.post(`/${GroupAuth}/${pathVersion}/login`,validateLogin, loginController);
router.post(`/${GroupAuth}/${pathVersion}/logout`, authMiddleware, logoutController);
router.get(`/${GroupAuth}/${pathVersion}/profil`, authMiddleware, profil);

router.get(`/${GroupUser}/${pathVersion}/list`, authMiddleware, getlistUsers);
router.post(`/${GroupUser}/${pathVersion}/register`,validateRegis, register);

module.exports = router;
