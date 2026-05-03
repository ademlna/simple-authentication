
const { loginService, getAllUsers, logoutService, getProfil , createUser} = require('../services/auth.service');
const resFormat = require('../../utility/format-res.utility')

// 1 login service 
const loginController = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userData = await loginService(res, username, password);
        return res.status(200).json(resFormat.success(userData, "login berhasil"));
    } catch (error) {
        next(error);
    }
};

// 2 logout service
const logoutController = async (req, res, next) => {
    try {
        const userData = await logoutService(req, res);
        return res.status(200).json(resFormat.success(userData, "logout berhasil"));
    } catch (error) {
        next(error);
    }
};

// 3 get profil user login
const profil = async (req, res, next) => {
    try {
        const { user_id } = req.user;
        const userData = await getProfil(user_id);
         return res.status(200).json(resFormat.success(userData, "data berhasil ditampilkan"));
    } catch (error) {
      next(error);
    }
};

// 4 get all user
const getlistUsers = async (req, res, next) => {
    try {
        const userData = await getAllUsers();
        return res.status(200).json(resFormat.success(userData, "data berhasil ditampilkan"));
    } catch (error) {
        next(error);
    }
};

// 5 Registrasi akun
const register = async (req, res, next) => {
    try {
        const userData = await createUser(req, res);
        return res.status(200).json(resFormat.success(userData, "data berhasil ditampilkan"));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginController,
    logoutController,
    profil,
    getlistUsers,
    register,
};
